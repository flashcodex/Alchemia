<?php
@session_start();
include '../lib/class-list-util.php';
require_once "../../classes/Crud.php";
require_once "../../model/crypt.php";
require_once "../../classes/Config.php";
Class SERVER_Model{
	private $crud;

	public function __construct() {
		$this->crud = new Crud();
		$this->config = new Config;
		$this->customcrypt = new customCrypt();
	}
    public function Fetch_Members()
    {     
         $data = array();
		 if(isset($_SESSION[$this->config->Web_Name().'_AdSTATUS']) && $_SESSION[$this->config->Web_Name().'_AdSTATUS'] == md5("active")) {
	        $sql="SELECT id, image, IFNULL(fname, '') AS fname, IFNULL(mname, '') AS mname, IFNULL(lname, '') AS lname, IFNULL(username, '') AS username, username, email, IFNULL(mobile, '') AS mobile, DATE_FORMAT(date_registration, '%m/%d/%Y') AS date_registered, sponsor_account, status FROM tbl_user ORDER BY date_registration DESC";
			$result = $this->crud->getData($sql);
			if($result){
				$count=0;
				foreach ($result as $row) {
					++$count;
	             	$data[]=array(
	             		'count' => $count,
	             		'user' => $row['image'],
	             		'name' => $row['fname'].' '.$row['lname'],
	             		'uname' => $row['username'],
	             		'email' => $row['email'],
	             		'mobile' => $row['mobile'],
	             		'date_reg' => $row['date_registered'],
	             		'sponsor' => $row['sponsor_account'],
	             		'status' => $row['status'],
	             		'action'=>base64_encode($this->customcrypt->getEncrypt($row["id"]))
	             	  );
	             } 
	            return $data;
			}else{
				return $data;
			}
		 }else{
	        return $data;
	     }
	}
}


$connect = new SERVER_Model();	


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
	// echo $filter;
	// echo '<script>alert('.$filter.')</script>';
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
	'user'				=> true,
	'name'				=> true,
	'uname'             => true,
	'email'				=> true,
	'mobile'			=> true,
	'date_reg'	        => true,
	'sponsor'		    => true,
	'status'			=> true,
	'action'			=> true,
];


if ( isset( $_REQUEST['columnsDef'] ) && is_array( $_REQUEST['columnsDef'] ) ) {
	$columnsDefault = [];
	foreach ( $_REQUEST['columnsDef'] as $field ) {
		$columnsDefault[ $field ] = true;
	}
}

// get all raw data
 $alldata = $connect->Fetch_Members();
  // $alldata = $connect->Fetch_Codes();

// echo "<script>alert('".$alldata."')</script>";

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
