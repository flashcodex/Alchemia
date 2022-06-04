<?php
// ini_set('display_errors', 1); 
// ini_set('display_startup_errors', 1); 
// error_reporting(E_ALL);

// $from='BOOSTING';
// $mobile='639055119299';
// $otp=1234;
$mobile='63'.$val;
$message='Verify your mobile number with this Trans4m OTP: '.$pin.'. Use within 5 mins.';

/*Sender Profile BOOSTING*/
$app_id='20828';
$app_token='e7R6OJhWbmCo3gVm0ev8rexvbsvCaB78YJAcewCuU69RKeFaIY';
$body= array(
	"application_id" => $app_id,
	"application_token" => $app_token,
	"number" => $mobile,
	"unicode" => false,
	"flash" => false,
	"text" => $message,
	"sender_id" => 8022,
	"sender_id_value" => "BOOSTING",
	"duplicates_check" => "off"
);

/*Sender Profile LYBTXT*/
// $app_id='19964';
// $app_token='xknITB0AHcVJli4igGdNxUbs8jOrOVmmpz3IAHLyhmfBSmfWH3';
// $body= array(
// 	"application_id" => $app_id,
// 	"application_token" => $app_token,
// 	"number" => $mobile,
// 	"unicode" => false,
// 	"flash" => false,
// 	"text" => "[BOOSTING] ".$message,
// 	"sender_id" => 8021,
// 	"sender_id_value" => "BOOSTING",
// 	"schedule" => "Now",
// 	"duplicates_check" => "off"
// );

/*gText TopInfo*/
// $app_id='19964';
// $app_token='xknITB0AHcVJli4igGdNxUbs8jOrOVmmpz3IAHLyhmfBSmfWH3';
// $body= array(
// 	"application_id" => $app_id,
// 	"application_token" => $app_token,
// 	"number" => $mobile,
// 	"unicode" => false,
// 	"flash" => false,
// 	"text" => "[BOOSTING] ".$message,
// 	"sender_id" => "gText",
// 	"sender_id_value" => "BOOSTING",
// 	"schedule" => "Now",
// 	"duplicates_check" => "off"
// );

$url="https://portal.bulkgate.com/api/1.0/advanced/transactional";
$curl = curl_init();
curl_setopt($curl, CURLOPT_FRESH_CONNECT, TRUE);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($body));
$result = curl_exec($curl);
$obj = json_decode($result, true);


if($obj['data']['status'] == "accepted")
{
    return $obj['data']['part_id'][0];
}
else
{
    return false;
}
?>