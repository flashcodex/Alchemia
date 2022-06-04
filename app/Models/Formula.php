<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Formula extends Model
{
    use HasFactory;

    public function outcome()
    {
        return $this->hasOne(Outcome::class , 'id', 'outcome_id');
    }

    public function elements()
    {
        return $this->hasOne(Element::class , 'number', 'element_id');
    }    
}
