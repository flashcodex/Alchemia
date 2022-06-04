<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\UserProgress;
use App\Models\Lesson;
use App\Models\UserModule;
use App\Models\Topic;
use App\Models\TopicQuiz;
use App\Models\UserTopic;

use Log;

class UserController extends Controller
{
    public function emailExist(Request $request)
    {
        $email_exist = User::where('email', $request->email)->first();

        $message = '';
        $success = true;

        if($email_exist)
        {
            $success = false;
            $message = 'Email is already used.';
        }

        return response()->json(['success' => $success , 'message' => $message]);
    }

    public function setupUser(Request $request)
    {
        Log::alert("SEUP USEER");
        Log::alert($request);

        $modules = [1,2];

        $user_id = $request->user_id;

        foreach($modules as $module)
        {
            $data = UserModule::where('user_id', $request->user_id)->where('module', $module)->first();

            Log::alert($module);

            if(!$data)
            {
                $next_lesson = Lesson::where('module', $module)->where('status', 1)->orderBy('number', 'asc')->first();

                Log::alert($next_lesson);

                $lesson = new UserModule();
                $lesson->module = $module;
                $lesson->topic_id = $next_lesson->id;
                $lesson->user_id = $request->user_id;
                $lesson->status = 0;
                $lesson->save();

                $next_topic = Topic::where('material_header_id', $lesson->topic_id)
                                        ->orderBy('number', 'asc')
                                        ->first();
                                        
                $topic = UserTopic::where('user_id', $request->user_id)->where('topic_id', $next_topic->id)->first();
                if(!$topic)
                {
                    $topic = new UserTopic();
                    $topic->user_id = $request->user_id;
                    $topic->module_id = $next_topic->material_header_id;            
                    $topic->topic_id = $next_topic->id;
                    $topic->status = 1;
                    $topic->save();
                }

                $user_progress = UserProgress::where('user_id', $user_id)->where('module_id', $module)->first();

                if(!$user_progress)
                {
                    $user_progress = new UserProgress();
                    $user_progress->user_id = $user_id;
                    $user_progress->module_id = $module;
                    $user_progress->lesson_id = $next_topic->material_header_id;
                    $user_progress->topic_id = $next_topic->id;
                    $user_progress->save();
                }
            }
        } 
    }
}
