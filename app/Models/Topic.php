<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;

    protected $table = 'tbl_material_page';

    public function quizzes()
    {
        return $this->hasMany(TopicQuiz::class , 'topic_id', 'id');
    }

    public function lesson()
    {
        return $this->hasOne(Lesson::class , 'id', 'material_header_id');
    }    
}