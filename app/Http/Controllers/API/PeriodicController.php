<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Maatwebsite\Excel\Facades\Excel;
use App\Imports\OutcomeImport;
use App\Models\Topic;
use App\Models\Outcome;
use App\Models\Formula;
use App\Models\Element;
use Log;
use DB;

class PeriodicController extends Controller
{
    public function save(Request $request)
    {
        $id = $request->id;
        $type = $request->type;

        $elements = $request->elements;

        if(count($elements) > 0) sort($elements);

        $elements=implode(",",$elements);

        if($type == 'EDIT')
        {
            $outcome = Outcome::where('id', $request->id)->first();
        }
        else
        {
            $outcome = new Outcome();
        }
               
        $outcome->title = $request->title;
        $outcome->name = $request->name;
        $outcome->elements = $elements;
        $outcome->save();

        Formula::where('outcome_id', $outcome->id)->delete();

        foreach($request->elements as $element)
        {
            $formula = new Formula();
            $formula->outcome_id = $outcome->id;
            $formula->element_id = $element;
            $formula->save();
        }        

        return response()->json(['success' => true]);
    }

    public function remove(Request $request)
    {
        $outcome = Outcome::where('id', $request->id)->delete();

        return response()->json(['success' => true]);
    }

    public function periodicTableList(Request $request)
    {        
        $query = Element::query()
                        ->get();

        return response()->json(['success' => true , 'data' => $query]);
    }

    public function all(Request $request)
    {        
        $query = Outcome::query()->orderBy('updated_at', 'desc')->get();

        return response()->json(['success' => true , 'data' => $query]);
    }

    public function endProduct(Request $request){
        Log::info($request);
        $search = $request->search;
        $endProductSearch = '%'.$search.'%';
        //$endProductSearch = '%oxide%';
        
        if($request == ''){$outcomes = []; }
        else{
            $outcomes = DB::table("outcomes")
            ->select("id", "elements", "title", "name")
            ->where("title", "like",  $endProductSearch)
            ->get();
        }

        return response()->json(['success' => true , 'data' => $outcomes]);
    }

    public function combineElements(Request $request)
    {
        Log::info($request);

        $elements = $request->elements;
        
        if($elements && count($elements) > 0)
        {
            sort($elements);

            $element_count = count($elements);

            // Log::info($elements);
            // $elements = implode(",",$elements);

            // $outcomes = Outcome::query()
            //             ->where('elements', 'LIKE', '%'. $elements .'%')
            //             ->get();
            $element_query = '';
            $i = 0;

            foreach($elements as $element)
            {
                // $q->orwhere('element_id', $element);
                $element_query .= " or element_id=". $element;
            } 

            // $element_query = substr(strstr($element_query, " or"), 0);
            $element_query = substr($element_query, 3);

            $outcomes = DB::table('formulas as f')
                        ->join('outcomes as o', 'f.outcome_id', '=', 'o.id')
                        ->select(DB::raw('o.id,elements,title,name ,count(o.id) as ct'))
                        ->whereRaw($element_query)
                        ->groupBy('o.id','elements','title','name')
                        ->having(DB::raw('count(o.id)'), $element_count)
                        ->get();

            // $outcomes = Formula::query()
            //             ->with(['elements','outcome'])
            //             ->whereIn('element_id', [1,4])
            //             // ->groupBy('outcome_id')
            //             ->get();

            // $outcomes = Outcome::query()
            //     ->with(['formulas.elements'])
            //     ->whereHas('formulas', function($q) use ($elements) {
            //         $q->whereIn('element_id', $elements);
            //     })                
            //     // ->whereIn('element_id', [1,4])
            //     // ->groupBy('outcome_id')
            //     ->orderBy('title', 'asc')
            //     ->get();
        }
        else
        {
            $outcomes = [];
        }

        return response()->json(['success' => true , 'data' => $outcomes]);
    }

    public function populateOutcomes(Request $request)
    {
        $path = "excel/compound.csv";
        $data = \Excel::toArray('', $path, null, \Maatwebsite\Excel\Excel::CSV)[0];

        // Log::info($data);

        $outcomes = Outcome::where('id', '!=', 0)->delete();
        $formulas = Formula::where('id', '!=', 0)->delete();

        foreach($data as $row)
        {
            Log::info($row[1]);
            Log::info($row[2]);
            Log::info($row[3]);
            
            $array = explode(',', $row[1]);

            Log::info($row[1]);

            $elements = $row[1];
            $name = $row[2] ? $row[2] : '';
            $title = $row[3] ? $row[3] : $row[2];
            
            $outcome = Outcome::where('name', $name)->first();
            $outcome = $outcome ? $outcome : new Outcome();
            $outcome->name = $name;
            $outcome->title = $title;
            $outcome->elements = $elements;
            $outcome->save();        

            Formula::where('outcome_id', $outcome->id)->delete();

            foreach($array as $combination)
            {
                Log::info("Save to formula" . $combination);

                $formula = new Formula();

                Log::alert("start");
                $formula->outcome_id = $outcome->id;

                Log::alert("end");
                $formula->element_id = $combination;
                $formula->save();
            }
        }

        // $array = (new OutcomeImport)->import("excel/compound.csv", 'local', \Maatwebsite\Excel\Excel::CSV);
        // // $array = (new OutcomeImport)->toArray("excel/compound.csv");

        // Log::info($array);

        // $excelFile = file_get_contents("excel/compound.csv");
        // return Excel::load($excelFile, function($doc) {

        //     $sheet = $doc->getSheetByName('1100-compound-final'); // sheet with name data, but you can also use sheet indexes.

        //     $sheet->getCell('A1');
        //     $sheet->getCellByColumnAndRow(0,0);

        //     Log::info($sheet);
        // });
        return response()->json(['success' => true]);
    }    
}
