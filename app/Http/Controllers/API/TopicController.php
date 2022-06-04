<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseException;

use App\Models\Lesson;
use App\Models\UserModule;
use App\Models\Topic;
use App\Models\TopicQuiz;
use App\Models\UserTopic;
use App\Models\TopicQuizRecord;
use App\Models\TopicQuizAnswer;
use App\Models\UserProgress;

use Log;

class TopicController extends Controller
{
    public function topicQuizRecords(Request $request)
    {        
        $query = TopicQuizRecord::query()
                        ->with(['topic','user'])
                        ->get();

        return response()->json(['success' => true , 'data' => $query]);
    }

    public function topicQuiz(Request $request)
    {
        $topic_setting = Topic::select('quiz_item', 'passing_grade')->where('id', $request->topic_id)->first();

        $request->quiz_item = $topic_setting->quiz_item;

        $query = Topic::query()
                        // ->with(['quizzes' => function($query) use ($request) { $query->model($request); }])
                        ->with(['quizzes' => function($query) use ($request , $topic_setting){
                            // if($request->random_order) $query->inRandomOrder();
                            // $query->model($request)->when($topic_setting->quiz_item > 0, fn($q) => $q->limit($topic_setting->quiz_item));
                            $query->model($request);
                        }])
                        ->where('id', $request->topic_id)
                        ->first();
        
        $user_topic_quiz = TopicQuizRecord::where('user_id', $request->user_id)->where('topic_id', $request->topic_id)->where('type', 'taking')->first();

        if(!$user_topic_quiz)
        {
            $user_topic_quiz = new TopicQuizRecord();
            $user_topic_quiz->user_id = $request->user_id;
            $user_topic_quiz->topic_id = $request->topic_id;
            $user_topic_quiz->type = 'taking';
            $user_topic_quiz->save();
        } 

        return response()->json(['success' => true , 'data' => $query , 'quiz' => $user_topic_quiz]);
    }

    public function computeQuiz(Request $request)
    {
        $questions = $request->question;
        $total_questions = count($request->question);
        $quiz_id = $request->quiz_id;
        $user_id = $request->user_id;

        Log::alert($request);

        $score = 0;

        foreach($questions as $question => $value)
        {
            // Log::info($question);
            $topic_question = TopicQuiz::where('id', $question)->first();

            if($topic_question)
            {
                $topic_quiz_answer = new TopicQuizAnswer();                
                $topic_quiz_answer->quiz_id = $quiz_id;
                $topic_quiz_answer->question_id = $question;
                $topic_quiz_answer->user_id = $user_id;
                $topic_quiz_answer->topic_id = $request->topic_id;
                $topic_quiz_answer->answer = $value;                

                // 
                if(strtolower($topic_question->answer) == strtolower($value))
                {
                    $score++;
                    $topic_quiz_answer->type = 'correct';
                }
                else
                {
                    $topic_quiz_answer->type = 'wrong';
                }

                $topic_quiz_answer->save();
            }
        }
        
        $topic = Topic::where('id' , $request->topic_id)->first();

        Log::info("Topic Setting ". $topic);

        $passing_grade = $topic ? $topic->passing_grade : 50;
        
        $grade = $score == 0 ? 0 : ($score / $total_questions * 100);
        $type = $this->computePercentage($score , $total_questions , $passing_grade) ? 'passed' : 'failed';                
        
        // $user_topic_quiz = new TopicQuizRecord();
        $user_topic_quiz = TopicQuizRecord::where('user_id', $request->user_id)->where('topic_id', $request->topic_id)->where('type', 'taking')->first();
        $user_topic_quiz->user_id = $request->user_id;
        $user_topic_quiz->topic_id = $request->topic_id;
        $user_topic_quiz->score = $score;
        $user_topic_quiz->total_questions = $total_questions;
        $user_topic_quiz->grade = $grade;
        $user_topic_quiz->type = $type;
        $user_topic_quiz->save();

        Log::info("PASSED");

        if($type == 'passed')
        {
            $this->nextTopic($request , $type , $score , $total_questions);
        }

        return response()->json(['success' => true , 'move' => 'module' , 'type' => $type , 'module' => $topic->material_header_id , "score" => $score , "total_questions" => $total_questions]);
    }

    public function nextTopic(Request $request , $type = 'passed' , $score = 0 , $total_questions = 0)
    {
        Log::info("NEXT TOPIC FUNCTIONS");

        $topic = Topic::where('id' , $request->topic_id)->first();

        Log::info($request);
        Log::info($topic);

        if($topic)
        {
            $next_topic = Topic::where('material_header_id', $topic->material_header_id)->where('number', '>' , $topic->number)
                                // ->where('with_quiz', 1)
                                ->orderBy('number', 'asc')
                                ->first();

            $data = UserTopic::where('topic_id', $topic->id)->where('user_id', $request->user_id)->first();
            $data->status = 1;
            $data->save();

            if($next_topic)
            {
                Log::info("NEXT TOPIC");

                $data = UserTopic::where('user_id', $request->user_id)->where('topic_id', $next_topic->id)->first();
                $data = $data ? $data : new UserTopic();
                $data->user_id = $request->user_id;
                $data->topic_id = $next_topic->id;
                $data->module_id = $next_topic->material_header_id;
                $data->status = 1;
                $data->save();

                Log::info($data);

                $lesson = Lesson::where('id', $next_topic->material_header_id)->first();

                $user_progress = UserProgress::where('user_id', $request->user_id)->where('module_id', $lesson->module)->first();
                $user_progress->user_id = $request->user_id;
                $user_progress->module_id = $lesson->module;
                $user_progress->lesson_id = $next_topic->material_header_id;
                $user_progress->topic_id = $next_topic->id;
                $user_progress->save();

                // return response()->json(['success' => true , 'module' => $next_topic->module]);
                throw new HttpResponseException(response()->json(['success' => true , 'move' => 'module' , 'topic' => $next_topic->id , 'module' => $next_topic->material_header_id , "score" => $score , "total_questions" => $total_questions , 'type' => $type]));
            }
            else
            {
                // Log::info($topic);

                Log::info("NEXT MODULE");

                $lesson = Lesson::where('id', $topic->material_header_id)->first();

                $data = UserModule::where('topic_id', $topic->material_header_id)->where('user_id', $request->user_id)->first();
                $data->status = 2;
                $data->save();

                Log::info($lesson);

                // return response()->json(['success' => true , 'module' => $data->module]);
                throw new HttpResponseException(response()->json(['success' => true , 'move' => 'material' , 'material' => $lesson->module , 'module' => $lesson->module , "score" => $score , "total_questions" => $total_questions , 'type' => $type]));
            }        
        }
        else
        {
            $default_topic = UserTopic::with(['topic'])->where('user_id', $request->user_id)->where('module_id', $request->module)->orderBy('id', 'desc')->first();

            Log::info($default_topic);

            $next_topic = Topic::where('material_header_id', $default_topic->module_id)
                                ->where('number', '>' , $default_topic->topic->number)
                                // ->where('id', $default_topic->topic_id)
                                // ->orderBy('number', 'asc')
                                ->orderBy('number', 'asc')
                                ->first();

            Log::info($next_topic);

            if($next_topic)
            {
                Log::info("NEXT TOPIC 1");

                $data = UserTopic::where('user_id', $request->user_id)->where('topic_id', $next_topic->id)->first();
                $data = $data ? $data : new UserTopic();
                $data->user_id = $request->user_id;
                $data->topic_id = $next_topic->id;
                $data->module_id = $next_topic->material_header_id;
                $data->status = 1;
                $data->save();

                Log::info($data);

                $lesson = Lesson::where('id', $next_topic->material_header_id)->first();

                $user_progress = UserProgress::where('user_id', $request->user_id)->where('module_id', $lesson->module)->first();
                $user_progress->user_id = $request->user_id;
                $user_progress->module_id = $lesson->module;
                $user_progress->lesson_id = $next_topic->material_header_id;
                $user_progress->topic_id = $next_topic->id;
                $user_progress->save();

                // return response()->json(['success' => true , 'module' => $next_topic->module]);
                throw new HttpResponseException(response()->json(['success' => true , 'move' => 'material' , 'material' => $lesson->module , 'module' => $next_topic->material_header_id , "score" => $score , "total_questions" => $total_questions , 'type' => $type]));
            }

            throw new HttpResponseException(response()->json(['success' => true , 'move' => 'topic' , 'module' => $default_topic->module_id]));
        }
    }

    public function computePercentage($score, $total_questions , $passing_grade = 50)
    {
        if($score == 0) return false;

        return (($score / $total_questions * 100) >= $passing_grade) ? true : false;
    }    
}
