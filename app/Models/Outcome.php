<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Library\Helper;
use Log;
use Storage;

class Outcome extends Model
{
    use HasFactory;

    public function formulas()
    {
        return $this->hasMany(Formula::class , 'outcome_id', 'id');
    }

    public function getCreatedAtAttribute($value)
    {
        return Carbon::parse($value)->format('M, d Y h:m:s');
    }    
}
