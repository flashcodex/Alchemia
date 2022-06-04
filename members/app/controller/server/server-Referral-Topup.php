


<?php
@session_start();
include '../lib/class-list-util.php';
include_once "../../classes/Crud.php";
include_once "../../model/crypt.php";

Class UserCODE {
	     

	private $crud;

	public function __construct() {
		$this->crud = new Crud();
		$this->customcrypt = new customCrypt();

	}
   public function Fetch_Data($id)
    {
    	$id=$this->customcrypt->getDecrypt(base64_decode($id));
		$data = array();
		// date_default_timezone_set('Asia/Manila');
		// $now=date("Y-m-d H:i:s");
		$sql = "SELECT amount,DATE_FORMAT(date_update,'%M %d, %Y %h:%i %p') AS date_topup,(25-days_count) AS days_left,DATE_FORMAT(ADDDATE(date_update, INTERVAL 25 DAY),'%M %d, %Y %h:%i %p') AS date_end,ADDDATE(date_update, INTERVAL 25 DAY) AS date_expired FROM tbl_topup_details WHERE user_id='$id' AND status='S' ORDER BY date_update DESC";
				$result=$this->crud->getData($sql);
				if(!$result){
					return $data;
				}else{
					$count=0;
					foreach ($result as $row) {
						++$count;
						$status=1;
						if($row['days_left']==0){
							$status=0;
							$row['days_left']='<span class="text-danger">EXPIRED</span>';
						}else{
							$row['days_left']='<p class="font-weight-bold">'.$row['days_left'].' Days</p>';
						}
                     	$data[]=array(
                     		'count' => $count,
                     		'date_topup' => $row['date_topup'],
                     		'date_expired' => $row['days_left'],
                     		'amount' => number_format($row['amount']),
                     		'status' => $status,
                     	  );

                     } 
                     return $data;
				}
				// <div class="col symbol symbol-50 symbol-sm flex-shrink-0"><img class="" src="../images/transaction-slip/img-12.jpg" alt="slip"></div>
                     			// <div class="col symbol symbol-50 symbol-sm flex-shrink-0"><img class="" src="../images/transaction-slip/img-12.jpg" alt="slip"></div>
	}
}


$connect = new UserCODE();	

function filterArray( $array, $allowed = [] ) {
	return array_filter(
		$array,
		function ( $val, $key ) use ( $allowed ) { // N.b. $val, $key not $key, $val
			return isset( $allowed[ $key ] ) && ( $allowed[ $key ] === true || $allowed[ $key ] === $val );
		},
		ARRAY_FILTER_USE_BOTH
	);
}

function filterKeyword( $data, $search, $field = '' ) {
	$filter = '';
	if ( isset( $search['value'] ) ) {
		$filter = $search['value'];
	}
	if ( ! empty( $filter ) ) {
		if ( ! empty( $field ) ) {
			if ( strpos( strtolower( $field ), 'date' ) !== false ) {
				// filter by date range
				$data = filterByDateRange( $data, $filter, $field );
			} else {
				// filter by column
				$data = array_filter( $data, function ( $a ) use ( $field, $filter ) {
					return (boolean) preg_match( "/$filter/i", $a[ $field ] );
				} );
			}

		} else {
			// general filter
			$data = array_filter( $data, function ( $a ) use ( $filter ) {
				return (boolean) preg_grep( "/$filter/i", (array) $a );
			} );
		}
	}

	return $data;
}

function filterByDateRange( $data, $filter, $field ) {
	// filter by range
	if ( ! empty( $range = array_filter( explode( '|', $filter ) ) ) ) {
		$filter = $range;
	}

	if ( is_array( $filter ) ) {
		foreach ( $filter as &$date ) {
			// hardcoded date format
			$date = date_create_from_format( 'm/d/Y', stripcslashes( $date ) );
		}
		// filter by date range
		$data = array_filter( $data, function ( $a ) use ( $field, $filter ) {
			// hardcoded date format
			$current = date_create_from_format( 'm/d/Y', $a[ $field ] );
			$from    = $filter[0];
			$to      = $filter[1];
			if ( $from <= $current && $to >= $current ) {
				return true;
			}

			return false;
		} );
	}

	return $data;
}
$columnsDefault = [
	'count'				=> true,
	'date_topup'		=> true,
	'date_expired'		=> true,
	'amount'			=> true,
	'status'			=> true,
];

if ( isset( $_REQUEST['columnsDef'] ) && is_array( $_REQUEST['columnsDef'] ) ) {
	$columnsDefault = [];
	foreach ( $_REQUEST['columnsDef'] as $field ) {
		$columnsDefault[ $field ] = true;
	}
}

// // get all raw data
 $alldata = $connect->Fetch_Data($_POST['id']);

$data = [];
// internal use; filter selected columns only from raw data
foreach ( $alldata as $d ) {
	$data[] = filterArray( $d, $columnsDefault );
}

// count data
$totalRecords = $totalDisplay = count($data);

// filter by general search keyword
if ( isset( $_REQUEST['search'] ) ) {
	$data         = filterKeyword( $data, $_REQUEST['search'] );
	$totalDisplay = count( $data );
}

if ( isset( $_REQUEST['columns'] ) && is_array( $_REQUEST['columns'] ) ) {
	foreach ( $_REQUEST['columns'] as $column ) {
		if ( isset( $column['search'] ) ) {
			$data         = filterKeyword( $data, $column['search'], $column['data'] );
			$totalDisplay = count( $data );
		}
	}
}

// sort
if ( isset( $_REQUEST['order'][0]['column'] ) && $_REQUEST['order'][0]['dir'] ) {
	$column = $_REQUEST['order'][0]['column'];
	$dir    = $_REQUEST['order'][0]['dir'];
	usort( $data, function ( $a, $b ) use ( $column, $dir ) {
		$a = array_slice( $a, $column, 1 );
		$b = array_slice( $b, $column, 1 );
		$a = array_pop( $a );
		$b = array_pop( $b );

		if ( $dir === 'asc' ) {
			return $a > $b ? true : false;
		}

		return $a < $b ? true : false;
	} );
}

// pagination length
if ( isset( $_REQUEST['length'] ) ) {
	$data = array_splice( $data, $_REQUEST['start'], $_REQUEST['length'] );
}

// return array values only without the keys
if ( isset( $_REQUEST['array_values'] ) && $_REQUEST['array_values'] ) {
	$tmp  = $data;
	$data = [];
	foreach ( $tmp as $d ) {
		$data[] = array_values( $d );
	}
}

$secho = 0;
if ( isset( $_REQUEST['sEcho'] ) ) {
	$secho = intval( $_REQUEST['sEcho'] );
}

$result = [
	'recordsTotal'        => $totalRecords,
	'recordsFiltered' => $totalDisplay,
	'data'               => $data,
];

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Content-Range, Content-Disposition, Content-Description');

echo json_encode( $result, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
