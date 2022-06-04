<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include '../../trans4mersadminv12021/classes/DbConfig.php';
require_once "../../trans4mersadminv12021/classes/Crud.php";
require_once "../../trans4mersadminv12021/login/login-model/crypt.php";
$crud = new Crud();
$agent = new customCrypt();

$cart_number=$crud->escape_string($_POST['cartnumber']);
$encrypted_cart_details=$crud->escape_string($_POST['ecd']);
if($encrypted_cart_details=='cancel')
{
  $result=$crud->update("UPDATE tbl_cart_header SET `status` = NULL WHERE id='$cart_number' AND `status`='PENDING'");
  $result=$crud->update("UPDATE tbl_cart_details SET `status` = NULL WHERE cart_id='$cart_number' AND `status`='PENDING'");
  echo'<script>location.replace("https://trans4m.com.ph/");</script>';
  exit;
}
else
{
  //tag cart_number to pending mode immediately
  $q=mysqli_query($con,"UPDATE tbl_cart_header SET status='PENDING', date_checkout='$timestamp' WHERE id='$cart_number'");
  $q=mysqli_query($con,"UPDATE tbl_cart_details SET status='PENDING' WHERE cart_id='$cart_number'");
}

$encrypted_cart_details=$crud->escape_string($_POST['ecd']);
$price=$crud->escape_string($_POST['amount']);

//check price change
$result=$crud->fetchSingleRow("SELECT id,total_price FROM tbl_cart_header WHERE id='$cart_number' AND status='P'");
if($result) { $total_price=$result['total_price']; }
if($price!=$total_price)
{
  echo'<div class="alert alert-danger text-center">Your cart has an update. <a href="https://trans4m.com.ph/" style="color:#fff;text-decoration:underline;">Click here to go back to checkout page and review your orders.</a></div>';
  exit;
}

$ccname=$crud->escape_string($_POST['ccname']);
$ccnumber=$crud->escape_string($_POST['ccnumber']);
$ccmonth=$crud->escape_string($_POST['ccmonth']);
$ccyear=$crud->escape_string($_POST['ccyear']);
$cvv=$crud->escape_string($_POST['cccvv']);

// $line1=$crud->escape_string($_POST['address1']);
// $line2=$crud->escape_string($_POST['address2']);
// $city=$crud->escape_string($_POST['city']);
// $state=$crud->escape_string($_POST['state']);
// $country=$crud->escape_string($_POST['country']);
// $postcode=$crud->escape_string($_POST['postcode']);
$email=$crud->escape_string($_POST['email']);
$phone=$crud->escape_string($_POST['phone']);

$error='';
$amount=$price*100;
$description=$cart_number.' '.$ccname.' '.$email;
$descriptor='TBA_PAY';
include  'pm_key.php';

// echo'<br />',$cart_number;
// echo'<br />',$price;
// echo'<br />',$amount;
// echo'<br />',$ccname;
// echo'<br />',$ccnumber;
// echo'<br />',$ccmonth;
// echo'<br />',$ccyear;
// echo'<br />',$cvv;
// exit;

$body = array(
  "data" => array(
    "attributes" => array(
      "amount" => $amount,
      "payment_method_allowed" => array("card"),
      "payment_method_options" => array(
        "card" => array("request_three_d_secure" => "automatic")
      ),
      "currency" => "PHP",
      "statement_descriptor" => $descriptor,
      "description" => $description
    )
  )
);

$url="https://api.paymongo.com/v1/payment_intents";
$curl = curl_init();
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/json","Authorization: Basic ".$skey));
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($body));
$result = curl_exec($curl);
$obj = json_decode($result, true);

if(isset($obj['errors'])) { $error=$error.' '.$obj['errors'][0]['detail']; }

$pi=$obj['data']['id'];
$ck=trim(str_replace($pi."_","",$obj['data']['attributes']['client_key']));

$result=$crud->update("UPDATE tbl_cart_header SET txnid='$pi' WHERE id='$cart_number'");
// /$result=$crud->update("UPDATE my_cart_details SET txnid='$pi' WHERE cart_number='$cart_number'");

$body = array(
  "data" => array(
    "attributes" => array(
          "details" => array(
            "card_number" => $ccnumber, 
            "exp_month" => (int)$ccmonth, 
            "exp_year" => (int)$ccyear, 
            "cvc" => $cvv
          ),
          "billing" => array(
            "email" => $email,
            "name" => $ccname,
            "phone" => $phone
          ),
          "type" => 'card'
        )
    )
);

//init
$pi_result=''; 
$status='';

$url="https://api.paymongo.com/v1/payment_methods";
$curl = curl_init();
curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($curl, CURLOPT_POST, 1);
curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/json","Authorization: Basic ".$skey));
curl_setopt($curl, CURLOPT_URL, $url);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($body));
$result = curl_exec($curl);
$obj = json_decode($result, true);
if(isset($obj['errors'])) { $error=$error.' '.$obj['errors'][0]['detail']; }

if(isset($obj['data']['id'])) 
{ 
  $pm=$obj['data']['id'];

  $webhook_check_status='https://trans4m.com.ph/visa-mastercard/payments/visa-mastercard/webhook_check.php?_='.$encrypted_cart_details.'&token='.$pi;
  $body = array(
    "data" => array(
      "attributes" => array (
        "payment_method" => $pm,
        "client_key" => $ck,
        "return_url" => $webhook_check_status
      )
    )
  );

  $url="https://api.paymongo.com/v1/payment_intents/".$pi."/attach";
  $curl = curl_init();
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($curl, CURLOPT_POST, 1);
  curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/json","Authorization: Basic ".$skey));
  curl_setopt($curl, CURLOPT_URL, $url);
  curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($body));
  $result = curl_exec($curl);
  $obj = json_decode($result, true);
  if(isset($obj['errors'])) { $error=$error.' '.$obj['errors'][0]['detail']; }

  if(isset($obj['data']['attributes']['status'])) $status=$obj['data']['attributes']['status'];

  // if($obj['data']['attributes']['livemode'] == false) $livemode='false'; //false?
  // else $livemode='true';

  if(isset($obj['data']['attributes']['payments'][0]['id']))
  {
    $pay=$obj['data']['attributes']['payments'][0]['id'];
  }

  if(isset($obj['data']['id'])) $pi_result=$obj['data']['id'];
  
}

// echo'<br />status: ',$status;
// echo'<br />pay: ',$pay;
// echo'<br />status: ',$status;
// echo'<br />error: ',$error;
// echo'<br />amount: ',$amount;
// exit;

//double check
date_default_timezone_set('Asia/Manila');
$now=date("Y-m-d H:i:s");
if($pi == $pi_result)
{
  if($status=='succeeded') 
  {
    //post on webhook
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
  else if($status=='awaiting_next_action') 
  {
    $redirect_3dsecure=$obj['data']['attributes']['next_action']['redirect']['url'];
    echo'<script>location.replace("'.$redirect_3dsecure.'");</script>';
    exit;
  }
  else
  {
    echo'<div class="alert alert-danger text-center">'.$error.'</div><script>$("#kt_btnX").show(500);</script>';
    exit;
    // $err=explode(".",trim($error));
    // if($err[0]=='billing') $error=$err[1];
    // else $error=$err[0];
    // echo'<div class="alert alert-danger text-center">'.$error.'</div><script>$("#kt_btnX").show(500);$("#kt_btnP").show(500);$("#kt_btnN").show(500);</script>'
    // exit;
  }

}
else
{
  echo'<div class="alert alert-danger text-center">'.$error.'</div><script>$("#kt_btnX").show(500);</script>';
  exit;
}

?>