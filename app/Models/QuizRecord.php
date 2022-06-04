<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class QuizRecord extends Model
{
    use HasFactory;

    protected $table = 'tbl_quiz_record';

    protected $appends = ['x', 'y'];

    public function getXAttribute()
    {
        // return Carbon::parse($this->date_created)->format('M, d Y h:i');
        return Carbon::parse($this->date_created)
                       ->setTimezone('Asia/Manila')
                       ->format('M, d Y h:i' , 'Asia/Manila');
    }

    public function getYAttribute()
    {
        return strtoupper("{$this->grade}");
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)
                       ->setTimezone('Asia/Manila')
                       ->format('M, d Y h:i:s' , 'Asia/Manila');

        // return Carbon::parse($value)->format('M, d Y h:i:s');
    }    
}
