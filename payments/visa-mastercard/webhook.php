<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

$webhook_string=file_get_contents('php://input');
$data = json_decode($webhook_string);

$pm_status=$data->status;
$txnid=$data->txnid;
$refno=$data->refno;
$cart_number=$data->cart_number;
$essage=$data->message;
$payment_method='PAYMONGO';

// if(substr($cart_number,0,4) == 'TBAC') //txn prefix for coaching
// {
// 	if($pm_status=='PAYMENT_SUCCESS' || $pm_status=='CHECKOUT_SUCCESS') 
// 	{
// 		$status='S';$refno=$txnid;
// 		include '../postback_process_coaching.php';
// 	}	
// }
// else
// {
	if($pm_status=='succeeded') 
	{
		$status='S';

		//include '../email_notif_error.php';
		
		include '../postback_process.php';
	}
	// if($pm_status!='PAYMENT_SUCCESS' && $pm_status!='CHECKOUT_SUCCESS') 
	// {
	// 	include '../email_notif_error.php';	
	// }
// }	
?>
