<?php

namespace App\Imports;

use App\Models\Outcome;
use App\Models\Formula;
use App\Models\Element;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\ToModel;

class OutcomeImport implements ToModel
{
    public function model(array $row)
    {
        return new Outcome([
           'elements'     => $row[1],
           'title'    => $row[2], 
           'name' => $row[3],
        ]);
    }

    // public function collection(Collection $collection)
    // {
    //     //
    // }
}
