<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserModule extends Model
{
    use HasFactory;

    protected $table = 'tbl_user_modules';

    public function moduleInfo()
    {
        return $this->hasOne(Lesson::class , 'id', 'topic_id');
    }    
}
