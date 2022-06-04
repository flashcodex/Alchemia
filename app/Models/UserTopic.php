<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserTopic extends Model
{
    use HasFactory;

    protected $table = 'tbl_user_topics';

    public function topic()
    {
        return $this->hasOne(Topic::class , 'id', 'topic_id');
    }    
}