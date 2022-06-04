<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProgress extends Model
{
    use HasFactory;

    // public function module()
    // {
    //     return $this->hasOne(Lesson::class , 'id', 'module_id');
    // }

    public function lesson()
    {
        return $this->hasOne(Lesson::class , 'id', 'lesson_id');
    }

    public function topic()
    {
        return $this->hasOne(Topic::class , 'id', 'topic_id');
    }        
}
