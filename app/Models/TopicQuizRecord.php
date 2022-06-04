<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class TopicQuizRecord extends Model
{
    use HasFactory;

    protected $appends = ['remarks','x', 'y'];

    public function getRemarksAttribute()
    {
        return strtoupper("{$this->score} / {$this->total_questions}");
    }

    public function getXAttribute()
    {
         return Carbon::parse($this->updated_at)->format('M, d Y h:i');
    }

    public function getYAttribute()
    {
        return strtoupper("{$this->grade}");
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('M, d Y h:i:s');
    }     

    // public function getUpdatedAtAttribute($value)
    // {
    //     return Carbon::parse($value)->format('M, d Y h:i:s');
    // } 

    public function user()
    {
        return $this->hasOne(User::class , 'id', 'user_id');
    }
    
    public function topic()
    {
        return $this->hasOne(Topic::class , 'id', 'topic_id');
    }       
}
