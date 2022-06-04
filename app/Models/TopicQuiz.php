<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use Log;
use DB;
use Storage;

class TopicQuiz extends Model
{
    use HasFactory;

    protected $table = 'topic_quizzes';

    public function scopeModel($query , $request)
    {   
        $topic_id = $request->topic_id;
        $random_order = $request->random_order;
        $quiz_item = $request->quiz_item;

        return $query
                ->when($random_order, fn($query) => $query->inRandomOrder())
                ->when($topic_id, fn($query) => $query->where('topic_id', $topic_id))
                ->when($quiz_item > 0, fn($query) => $query->limit($quiz_item))
                ->get()
                ;
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)
                       ->setTimezone('Asia/Manila')
                       ->format('M, d Y h:i:s' , 'Asia/Manila');

        // return Carbon::parse($value)->format('M, d Y h:i:s');
    } 

    public function getUpdatedAtAttribute($value)
    {
        return Carbon::parse($value)
                       ->setTimezone('Asia/Manila')
                       ->format('M, d Y h:i:s' , 'Asia/Manila');
    }    
}
