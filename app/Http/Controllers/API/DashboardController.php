<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lesson;
use App\Models\User;
use App\Models\UserProgress;
use App\Models\UserModule;
use App\Models\Topic;
use App\Models\TopicQuiz;
use App\Models\UserTopic;
use App\Models\TopicQuizRecord;
use App\Models\TopicQuizAnswer;
use App\Models\QuizRecord;
use App\Models\QuizAnswer;
use Carbon\Carbon;
use DB;
use Illuminate\Support\Str;
use Illuminate\Support\Arr;

use Log;

class DashboardController extends Controller
{
    public function all(Request $request)
    {
        $topic_quizzes = QuizRecord::query()->get();
        $passed_topic_quizzes = QuizRecord::query()->where('type', 'passed')->get();
        $failed_topic_quizzes = QuizRecord::query()->where('type', 'failed')->get();
        $taking_topic_quizzes = QuizRecord::query()->where('type', 'taking')->get();

        $quiz = QuizRecord::whereIn('type', ['passed','failed'])->orderBy('material_id')->groupBy('material_id')->get();

        // $user_progress = UserProgress::groupBy('lesson_id')
        // ->join('tbl_material_header', 'tbl_material_header.id', '=', 'user_progress.lesson_id')
        // ->selectRaw('count(lesson_id) as total, count(lesson_id) as y,  lesson_id , tbl_material_header.name , tbl_material_header.name as x')
        // ->orderBy('module', 'asc')->orderBy('number', 'asc')
        // ->get();        

        // $start_of_month = Carbon::parse($now)->startOfMonth()->toDateString();
        // $end_of_month = Carbon::parse($now)->endOfMonth()->toDateString();
        // $start_two_month = Carbon::parse($now)->startOfMonth()->subMonths(2)->toDateString();
        // $start_three_month = Carbon::parse($now)->startOfMonth()->subMonths(3)->toDateString();


        $now = Carbon::now();
        $year = $now->format('Y');
        $date = Carbon::now();
        $startOfYear = $date->startOfYear();
        $date = Carbon::now();
        $endOfYear   = $date->endOfYear();

        Log::info($startOfYear);
        Log::info($endOfYear);

        $users = User::query()
                    ->whereBetween(DB::raw('date(date_registration)') , array($startOfYear, $endOfYear))
                    ->get();

        $month_registered_users = [];

        Log::info($users);

        foreach($users as $user)
        {
            Log::alert($user);

            $date_registration = Carbon::parse($user->date_registration);
            $user_month = $date_registration->format('m');
            $month_label = $date_registration->format('F');

            if(array_key_exists($user_month, $month_registered_users))
            {
                $month_registered_users[$user_month]['total'] += 1;
                $month_registered_users[$user_month]['y'] += 1;
            }
            else
            {
                $month_registered_users[$user_month]['total'] = 1;
                $month_registered_users[$user_month]['label'] = $month_label;
                $month_registered_users[$user_month]['x'] = $month_label;
                $month_registered_users[$user_month]['y'] = 1;                
            }            
        }

        $months = [];
        $i = 0;

        foreach($month_registered_users as $data)
        {
            // unset($data[$i]);
            array_push($months, $data);
            // $i++;
        }


        $user_progress = UserProgress::groupBy('lesson_id')
        ->join('tbl_material_header', 'tbl_material_header.id', '=', 'user_progress.lesson_id')
        ->selectRaw('count(lesson_id) as total, count(lesson_id) as y,  lesson_id , tbl_material_header.name , tbl_material_header.name as x')
        ->orderBy('module', 'asc')->orderBy('number', 'asc')
        ->get();

        return response()->json(['success' => true , 
                                'quiz' => $quiz,
                                'topic_quizzes' => $topic_quizzes, 'passed_topic_quizzes' => $passed_topic_quizzes, 'failed_topic_quizzes' => $failed_topic_quizzes, 'taking_topic_quizzes' => $taking_topic_quizzes,
                                'year' => $year , 'month_registered_users' => $months,
                                'user_progress' => $user_progress,
                                ]);
    }

    public function filterType(Request $request)
    {
        $type = $request->type ? $request->type : 'all';
        $content = $request->content ? $request->content : '';
        $page = $request->page ? $request->page : '';

        if($type == 'all')
        {
            log::alert("type all trigger");
            $quiz_records = QuizRecord::select(DB::raw('MIN(id) as id, material_id , user_id, type'))->groupBy('user_id')->get();

// module lang 
            // $top_students = QuizRecord::query()
            //                 ->leftjoin('tbl_user', 'tbl_user.id', '=', 'tbl_quiz_record.user_id')
            //                 //->select(DB::raw('MIN(tbl_quiz_record.id) as id, material_id , user_id, grade , fname , lname'))
            //                 ->select(DB::raw('(tbl_quiz_record.id) as id, material_id , user_id, AVG(grade) as grade , fname , lname'))
            //                 ->where('grade', '!=', null)
            //                 ->groupBy('user_id')
            //                 ->orderBy('grade', 'desc')
            //                 ->limit(5)
            //                 ->get();

            $top_students = DB::table('tbl_user as student')
                            ->leftjoin('tbl_quiz_record as mQuiz', 'mQuiz.user_id', '=', 'student.id')
                            ->leftjoin('topic_quiz_records as tQuiz', 'tQuiz.user_id', '=', 'student.id')
                            ->select(DB::raw('student.id, student.fname, student.lname, ((AVG(mQuiz.grade)+AVG(tQuiz.grade))/2) AS grade, AVG(mQuiz.grade) AS moduleQuizGrade, AVG(tQuiz.grade) AS topicQuizGrade'))
                            //->where('grade', '!=', null)
                            ->groupBy('student.id')
                            ->orderBy('grade', 'desc')
                            ->limit(5)
                            ->get();

            $top_questions = QuizAnswer::query()
                            ->join('tbl_quiz', 'tbl_quiz.id', '=', 'quiz_answers.question_id')
                            ->select(DB::raw('count(quiz_answers.question_id) as total, question'))                            
                            ->where('quiz_answers.type', 'wrong')
                            ->groupBy('quiz_answers.question_id')
                            ->orderBy('total','desc')
                            ->limit(5)
                            ->get();

                            // log::alert("top_students");
                            // log::alert($top_students);
                            // log::alert("top_questions");
                            // log::alert($top_questions);
                            // log::alert("uiz_records");
                            // log::alert($quiz_records);

                            return response()->json([
                                'success' => true ,
                                'top_students' => $top_students,
                                'top_questions' => $top_questions,
                                'quiz_records' => $quiz_records,
                                ]);
                            
            
        }

        else if ($type == 'module'){
            log::alert("type module trigger");
            $query = Lesson::query()
            ->where(function($q) use ($content) {
                if($content) $q->where('id', $content);
            })
            ->where('status', 1)
            ->orderBy('number','asc')
            ->get();
        }

        else
        {
            log::alert("type else trigger");
            if($request->module && $request->module > 0) $content = $request->module;
            if($request->topic && $request->topic > 0) $content = $request->topic;

            Log::alert($content);

            $topics = Topic::orderBy(Lesson::numberOrder() , 'asc')->orderBy('number', 'asc')->pluck('id');
    
            // sort the applicant lessons using the order of the lessons fetched on the pluck
            $rawOrder = DB::raw(sprintf('FIELD(id, %s)', implode(',', $topics->toArray())));

            $query = Topic::query()
                            ->with('lesson')
                            ->where('name' , '!=', 'main_page')
                            ->whereHas('lesson')
                            ->where(function($q) use ($content , $page) {
                                if($content && $page) $q->where('material_header_id', $content);
                                if($content && !$page) $q->where('id', $content);
                            })
                            // ->where('status', 1)
                            // ->when($page == 'dashboard', fn($query) => $query->where('with_quiz', 1))
                            ->where('with_quiz', 1)
                            ->orderByRaw($rawOrder)
                            ->orderBy('number','asc')
                            ->get();
        }

        return response()->json([
                                'success' => true , 'data' => $query
                                ]);        
    }

    public function filterContent(Request $request)
    {
        $data_type = $request->data_type ? $request->data_type : '';
        $type = $request->type ? $request->type : 'module';
        $content = $request->content;

        if($data_type == 'taking')
        {
            // $user_progress = UserProgress::query()
            // ->when($type == 'module', fn($query) => $query->with(['lesson','topic']))            
            // // ->when($type == 'topic', fn($query) => $query->with(['lesson','topic']))
            // // ->where('topic_id', $content)
            // ->when($type == 'module', fn($query) => $query->groupBy('lesson_id'))
            // ->get();

            $user_progress = UserProgress::groupBy('lesson_id')
            ->join('tbl_material_header', 'tbl_material_header.id', '=', 'user_progress.lesson_id')
            ->selectRaw('count(lesson_id) as total, count(lesson_id) as y,  lesson_id , tbl_material_header.name , tbl_material_header.name as x')
            ->get();

            return response()->json([
                                    'success' => true ,
                                    'user_progress' => $user_progress,
                                    ]);
        }
        else if($data_type == 'report')
        {
            $quiz_records = QuizRecord::select(DB::raw('MIN(id) as id, material_id , user_id, type'))->where('material_id', $request->report)->groupBy('user_id')->get();

            return response()->json([
                        'success' => true ,
                        'quiz_records' => $quiz_records,
                        ]);
        }
        else
        {
            
            if($type == 'module')
            {
                $quiz_records = QuizRecord::select(DB::raw('MIN(id) as id, material_id , user_id, type'))->where('material_id', $request->content)->groupBy('user_id')->get();

                $top_students = QuizRecord::query()
                                ->join('tbl_user', 'tbl_user.id', '=', 'tbl_quiz_record.user_id')
                                //->select(DB::raw('MIN(tbl_quiz_record.id) as id, material_id , user_id, grade , fname , lname'))
                                ->select(DB::raw('(tbl_quiz_record.id) as id, material_id , user_id, AVG(grade) as grade , fname , lname'))
                                //kukunin yung data sa tbl quiz record at tbl user important data for computation grade , material id, user id
                                //kukunin yung average grade ng same userid at same moduleid
                                ->where('material_id', $request->content)
                                //kukunin yung data na same ng material id sa dropdow box
                                ->where('grade', '!=', null)
                                ->groupBy('user_id')
                                ->orderBy('grade', 'desc')
                                ->limit(5)
                                ->get();

                                log::alert("Module_top_students");
                                log::alert($top_students);
                    

                $top_questions = QuizAnswer::query()
                                ->join('tbl_quiz', 'tbl_quiz.id', '=', 'quiz_answers.question_id')
                                ->select(DB::raw('count(quiz_answers.question_id) as total, question'))                            
                                ->where('lesson_id', $request->content)
                                ->where('quiz_answers.type', 'wrong')
                                ->groupBy('quiz_answers.question_id')
                                ->orderBy('total','desc')
                                ->limit(5)
                                ->get();
            }
            else
            {
                $quiz_records = TopicQuizRecord::query()
                                ->select(DB::raw('MIN(id) as id, topic_quiz_records.topic_id , user_id, type'))
                                ->where('topic_quiz_records.topic_id', $request->content)
                                ->groupBy('user_id')
                                ->get();

                $top_students = TopicQuizRecord::query()
                                ->join('tbl_user', 'tbl_user.id', '=', 'topic_quiz_records.user_id')
                                //->select(DB::raw('MIN(topic_quiz_records.id) as id, topic_quiz_records.topic_id , user_id, grade , fname , lname')) 
                                ->select(DB::raw('(topic_quiz_records.id) as id, topic_quiz_records.topic_id , user_id, AVG(grade) as grade , fname , lname'))                           
                                ->where('topic_quiz_records.topic_id', $request->content)
                                ->groupBy('user_id')
                                ->orderBy('grade', 'desc')
                                ->limit(5)
                                ->get();

                                log::alert("topic_top_students");
                                log::alert($top_students);

                $top_questions = TopicQuizAnswer::query()
                                ->join('topic_quizzes', 'topic_quizzes.id', '=', 'topic_quiz_answers.question_id')
                                ->select(DB::raw('count(topic_quiz_answers.question_id) as total, question'))                            
                                ->where('topic_quiz_answers.topic_id', $request->content)
                                ->where('topic_quiz_answers.type', 'wrong')
                                ->groupBy('topic_quiz_answers.question_id')
                                ->orderBy('total','desc')
                                ->limit(5)
                                ->get();
            }
            return response()->json([
                        'success' => true ,
                        'top_students' => $top_students,
                        'top_questions' => $top_questions,
                        'quiz_records' => $quiz_records,
                        ]);
        }
    }

    public function quizGraph(Request $request)
    {
        $data_type = $request->data_type ? $request->data_type : '';
        $type = $request->type ? $request->type : 'module';
        $content = $request->content;
        $user_id = $request->user_id;
        $module = $request->module;
        $topic = $request->topic;

        if($type == 'module')
        {
            // Lesson::query()->('number', 'asc')->pluck('id');
            $lessons = Lesson::orderBy('number', 'asc')->pluck('id');
            // sort the applicant lessons using the order of the lessons fetched on the pluck
            $rawOrder = DB::raw(sprintf('FIELD(topic_id, %s)', implode(',', $lessons->toArray())));

            $modules = UserModule::with(['moduleInfo'])->where('user_id', $user_id)->orderBy('module','asc')
                                ->when($module > 0, fn($query) => $query->where('topic_id', $module))
                                ->orderByRaw($rawOrder)
                                ->get();

            $module_quizzes = [];

            foreach($modules as $module)
            {
                $quiz_records = QuizRecord::where('user_id', $user_id)->where('material_id', $module->topic_id)->get();

                $quiz_obj = array('content' => $module , 'data' => $quiz_records);

                array_push($module_quizzes , $quiz_obj);
            }
        }
        else
        {
            $modules = UserTopic::with(['topic'])->where('user_id', $user_id)
                                ->whereHas('topic', function($q) {
                                    $q->where('with_quiz', 1);
                                })
                                ->orderBy('module_id','asc')
                                ->when($topic > 0, fn($query) => $query->where('topic_id', $topic))
                                ->when($module > 0 && $topic == 0, fn($query) => $query->where('module_id', $module))
                                ->get();

            $module_quizzes = [];

            foreach($modules as $module)
            {
                $quiz_records = TopicQuizRecord::where('user_id', $user_id)->where('topic_id', $module->topic_id)->get();

                $quiz_obj = array('content' => $module , 'data' => $quiz_records);

                array_push($module_quizzes , $quiz_obj);
            }
        }

        return response()->json([
            'success' => true ,
            'data' => $module_quizzes,
            ]);
    }
}
