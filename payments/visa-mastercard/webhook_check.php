<?php
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);

include '../../trans4mersadminv12021/classes/DbConfig.php';
require_once "../../trans4mersadminv12021/classes/Crud.php";
require_once "../../trans4mersadminv12021/login/login-model/crypt.php";
$crud  = new Crud();
$agent = new customCrypt();

$encrypted_cart_details = $crud->escape_string(trim($_GET['_']));
$cart_details = json_decode($agent->getDecrypt(base64_decode($encrypted_cart_details)), true);
$cart_number = $cart_details[0]['cart_number'];
$pi=$crud->escape_string($_GET['token']);

//check for not success only
// $sql="SELECT txnid,status FROM my_cart_header WHERE txnid='$txnid' AND status='P'";
// $result=$crud->fetchSingleRow($sql);
// if($result)
// {
	// $pi=$result['txnid'];
	// $ck=$result['ck'];
	// $pm=$result['pm'];

	include  'pm_key.php';
	$url="https://api.paymongo.com/v1/payment_intents/".$pi;
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/json","Authorization: Basic ".$skey));
	curl_setopt($curl, CURLOPT_URL, $url);
	$result = curl_exec($curl);
	$obj = json_decode($result, true);

	$status=$obj['data']['attributes']['status'];
	$pi_result=$obj['data']['id'];

	if($obj['data']['attributes']['livemode'] == false) $livemode='false'; //false?
	else $livemode='true';

	if(isset($obj['data']['attributes']['last_payment_error']['failed_message']))
	{
		$error=$obj['data']['attributes']['last_payment_error']['failed_message'];
	}
	// else
	// {
		
		
	// }	

	// date_default_timezone_set('Asia/Manila');
	// $now=date("Y-m-d H:i:s",$updated_at);

	// echo $result;
	// echo'<br />';
	// echo'<br />',$status;
	// echo'<br />',$pi;
	// echo'<br />',$pi_result;
	// echo'<br />',$pay;
	// echo'<br />',$updated_at;
	// echo'<br />',$now;
	// echo'<br />',$last4;
	// echo'<br />',$result;
	// exit;

	
	// $err=explode(".",trim($error));

	// if(isset($error))
	// {
	// 	if($err[0]=='billing') $error=$err[1];
	// 	else $error=$err[0];
	// }

	if($pi == $pi_result)
	{
		if($status=='succeeded') //success
		{
			//post on webhook
		    $pay=$obj['data']['attributes']['payments'][0]['id'];
			$updated_at=$obj['data']['attributes']['payments'][0]['attributes']['updated_at'];
			$last4=$obj['data']['attributes']['payments'][0]['attributes']['source']['last4'];

		    $curl = curl_init();
		    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
		    curl_setopt($curl, CURLOPT_POST, 1);
		    curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
		    curl_setopt($curl, CURLOPT_URL, "https://trans4m.com.ph/visa-mastercard/payments/visa-mastercard/webhook.php");
		    curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode(array(
		      "status" => $status,
		      "txnid" => $pi,
		      "refno" => $pay,
		      "cart_number" => $cart_number
		    )));
		    curl_exec($curl);

		    echo'<script>location.replace("https://trans4m.com.ph/visa-mastercard/payments/thankyou/?_='.$encrypted_cart_details.'");</script>';
		    exit;
		}
		else if($status=='awaiting_payment_method')
		{
			$result=$crud->update("UPDATE tbl_cart_header SET `status` = NULL WHERE id='$cart_number' AND `status`='PENDING'");
  			$result=$crud->update("UPDATE tbl_cart_details SET `status` = NULL WHERE cart_id='$cart_number' AND `status`='PENDING'");
			echo'<script>location.replace("https://trans4m.com.ph/visa-mastercard/payments/thankyou/failed.php?_='.$encrypted_cart_details.'");</script>';
		    exit;
		}
		else
		{
			$result=$crud->update("UPDATE tbl_cart_header SET `status` = NULL WHERE id='$cart_number' AND `status`='PENDING'");
  			$result=$crud->update("UPDATE tbl_cart_details SET `status` = NULL WHERE cart_id='$cart_number' AND `status`='PENDING'");
			echo'<script>location.replace("https://trans4m.com.ph/visa-mastercard/payments/thankyou/failed.php?_='.$encrypted_cart_details.'");</script>';
		    exit;
		}
	}

// }
?>