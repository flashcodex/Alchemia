<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lesson extends Model
{
    use HasFactory;

    protected $table = 'tbl_material_header';

    public function topics()
    {
        return $this->hasMany(Topic::class, 'material_header_id', 'id');
    }

    public function scopeNumberOrder($query)
    {
        return $query->select('number')->whereColumn('tbl_material_page.material_header_id', 'tbl_material_header.id');
    }
}
