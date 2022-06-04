<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Lesson;
use App\Models\UserModule;
use App\Models\Topic;
use App\Models\TopicQuiz;
use App\Models\UserTopic;
use App\Models\QuizAnswer;

use Log;

class LessonController extends Controller
{
    public function updateTopicOrder(Request $request)
    {
        $id = $request->module;
        $orders = $request->number;

        $number = 1;

        foreach($orders as $order)
        {
            $order = intval( $order );

            $topic = Topic::
                                where('id', $order)
                                // where('material_header_id', $id)
                                // ->orderBy('number', 'asc')
                                ->first();

            $topic->number = $number;
            $topic->timestamps = false;
            $topic->save();

            $number = $number + 1;
        }

        return response()->json(['success' => true]);
    }   

    public function updateModuleNumber(Request $request)
    {
        $id = $request->module;
        $lesson = Lesson::where('id', $id)->first();
        $lesson->number = $request->number;
        $lesson->timestamps = false;
        $lesson->save();

        return response()->json(['success' => true]);
    }    

    public function moduleLesson(Request $request)
    {
        $lessons = Lesson::where('module', $request->module)->orderBy('number','asc')->get();

        return response()->json(['success' => true , 'data' => $lessons]);
    }

    public function recordQuiz(Request $request)
    {        
        Log::info("RECORD QUIZ");

        $user_id = $request->user_id;
        $quiz_id = $request->quiz_id;
        $lesson_id = $request->lesson_id;
        $question_id = $request->question_id;
        $type = $request->type;
        $answer = $request->answer;

        $quiz_answer = new QuizAnswer();
        $quiz_answer->user_id = $user_id;
        $quiz_answer->quiz_id = $quiz_id;
        $quiz_answer->question_id = $question_id;
        $quiz_answer->lesson_id = $lesson_id;        
        $quiz_answer->type = $type;
        $quiz_answer->answer = $answer;
        $quiz_answer->save();

        return response()->json(['success' => true]);
    }

    public function userModules(Request $request)
    {
        Log::info("USER MODULES");

        $module = $request->module;
        // $module = 1;

        $data = UserModule::with(['moduleInfo'])
                            ->whereHas('moduleInfo', function($q) use ($module) {
                                $q->where('module', $module);
                            })
                            ->where('user_id', $request->user_id)
                            ->get();

        return response()->json(['success' => true , 'data' => $data]);
    }

    public function unlockModule(Request $request)
    {
        Log::alert("UNLOCk");
        Log::info($request);

        $lesson = Lesson::where('id' , $request->lesson_id)->first();

        Log::info("LESSON");
        Log::info($lesson);

        $next_lesson = Lesson::where('module', $lesson->module)->where('number', '>' , $lesson->number)->where('status', 1)->orderBy('number', 'asc')->first();

        Log::info($next_lesson);

        $data = UserModule::where('topic_id', $lesson->id)->where('user_id', $request->user_id)->first();
        $data->status = 2;
        $data->save();

        Log::alert($data);

        if($next_lesson)
        {
            $data = UserModule::where('user_id', $request->user_id)->where('module', $lesson->module)->where('topic_id', $next_lesson->id)->first();
            if(!$data)
            {
                $data = new UserModule();
                $data->user_id = $request->user_id;
                $data->module = $next_lesson->module;
                $data->topic_id = $next_lesson->id;
                $data->status = 0;
                $data->save();
            }

            Log::info("user module");
            Log::info($data);

            $next_topic = Topic::where('material_header_id', $next_lesson->id)
                                ->orderBy('number', 'asc')
                                ->first();

            Log::info("next_topic");
            Log::info($next_topic);

            $data = UserTopic::where('user_id', $request->user_id)->where('topic_id', $next_topic->id)->first();
            $data = $data ? $data : new UserTopic();
            $data->user_id = $request->user_id;
            $data->module_id = $next_topic->material_header_id;            
            $data->topic_id = $next_topic->id;
            $data->status = 1;
            $data->save();
        }

        Log::alert("SUCCESS");

        return response()->json(['success' => true]);
    }

    public function fetchTopic(Request $request)
    {
        $topic_id = $request->id;

        $topic = Topic::with(['quizzes'])->where('id', $topic_id)->first();

        return response()->json(['success' => true , 'data' => $topic]);
    }

    public function saveTopic(Request $request)
    {
        $action = $request->action;
        $topic_id = $request->topic_id;
        $id = $request->id;
        $question = $request->question;
        $type = $request->type;
        $choices = $request->choices;
        $answer = $request->answer;

        if($action == 'ADD')
        {
            $topic = new TopicQuiz();
        }
        else
        {
            $topic = TopicQuiz::where('id', $id)->first();
            // $topic = $topic ? $topic : new TopicQuiz();
        }
        
        $topic->topic_id = $topic_id;
        $topic->type = $type;
        $topic->question = $question;
        $topic->choices = $choices;
        $topic->answer = $answer;
        $topic->save();

        return response()->json(['success' => true , 'data' => $topic]);
    }

    public function removeTopic(Request $request)
    {
        $topic = TopicQuiz::where('id', $request->id)->first();

        if($topic) $topic->delete();

        return response()->json(['success' => true]);
    }

    public function updateTopicSetting(Request $request)
    {
        Log::info("EDIT TOPIC SETTING");

        $topic_id = $request->id;
        $quiz_item = $request->quiz_item;
        $passing_grade = $request->passing_grade;

        $topic = Topic::where('id', $request->id)->first();

        if($topic)
        {
            Log::info($request);

            $topic->quiz_item = $request->quiz_item ? $request->quiz_item : null;
            $topic->passing_grade = $request->passing_grade ? $request->passing_grade : 50;
            $topic->timestamps = false;
            $topic->save();
        }

        return response()->json(['success' => true]);
    }

    public function publishTopic(Request $request)
    {
        $topic = Topic::where('id', $request->id)->first();

        if($topic)
        {
            $topic->with_quiz = $request->with_quiz;
            $topic->timestamps = false;
            $topic->save();
        }

        return response()->json(['success' => true]);
    }

    public function userTopic(Request $request)
    {
        $user_id = $request->user_id;
        $topic_id = $request->id;

        $user_topics = UserTopic::where('user_id', $user_id)
                    //    ->where('topic_id', $topic_id)
                       ->get();

        return response()->json(['success' => true , 'data' => $user_topics]);
    }

    public function __construct(){
        $this->ciphering = 'AES-128-CBC';
        $this->options = 0;
        $this->encryption_iv = '1234567891011121';
        $this->decryption_iv = '1234567891011121';
        $this->encryption_key = 'tba_custom_encrytion_key';
        $this->decryption_key = 'tba_custom_encrytion_key';
    }

    public function getEncrypt($string)
    {
        $newstring = $string."||".rand();
        $encryption = openssl_encrypt($newstring, $this->ciphering, $this->encryption_key, $this->options, $this->encryption_iv); 

        return $encryption;
    }

    public function getDecrypt($encryptedstring)
    {
        
        $decryption = openssl_decrypt($encryptedstring, $this->ciphering, $this->decryption_key, $this->options, $this->decryption_iv);
        $data = explode('||', $decryption);

        return $data[0];
    }    
}
