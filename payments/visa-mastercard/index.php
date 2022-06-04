<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include '../../trans4mersadminv12021/classes/DbConfig.php';
require_once "../../trans4mersadminv12021/classes/Crud.php";
require_once "../../trans4mersadminv12021/login/login-model/crypt.php";
$crud = new Crud();
$agent = new customCrypt();

// $encrypted_cart_details = $crud->escape_string(trim($_GET['_']));
// $cart_details = json_decode($agent->getDecrypt(base64_decode($encrypted_cart_details)), true);
// $cart_number = $cart_details[0]['cart_number'];
// $description=(string)$cart_number;
// $requestReferenceNumber=(string)$cart_number;

// //tag pending
// $result=$crud->update("UPDATE tbl_cart_header SET status='PENDING' WHERE id='$cart_number' AND status IS NULL");
// $result=$crud->update("UPDATE tbl_cart_details SET status='PENDING' WHERE cart_id='$cart_number' AND status IS NULL");

$pm = $crud->escape_string(trim($_GET['pm']));
if($pm=='VM') {
    $payment_title='Visa | Mastercard';
    $payment_logo='../../images/transaction/visamastercard.png';
}
if($pm=='GC') {
    $payment_title='GCASH';
    $payment_logo='../../images/transaction/visamastercard.png';
}

//get amount
$amount=0;
// $result=$crud->fetchSingleRow("SELECT id,total_price FROM tbl_cart_header WHERE id='$cart_number'");
// if($result) { $amount=$result['total_price']; }
// else { echo'Error: Something went wrong. Please try again later'; exit; }

// echo'<br />*CM ',$cart_number;
// echo'<br />*pm ',$pm;
// echo'<br />*amt ',$amount;
// exit;

$page_title='TBA Payment';
$logo='../../trans4mersadminv12021/assets/media/bg/bg-11.jpg';
?>

<!DOCTYPE html>

<html lang="en" >
<head>
    <meta charset="utf-8"/>
    <title><?=$payment_title;?> | <?=$page_title;?></title>
    <meta name="description" content="Wizard examples"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700"/>        
    <link href="../../trans4mersadminv12021/assets/css/pages/wizard/wizard-4.css" rel="stylesheet" type="text/css"/>
        
    <link href="../../trans4mersadminv12021/assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css"/>
    <link href="../../trans4mersadminv12021/assets/plugins/custom/prismjs/prismjs.bundle.css" rel="stylesheet" type="text/css"/>
    <link href="../../trans4mersadminv12021/assets/css/style.bundle.css" rel="stylesheet" type="text/css"/>

    <link rel="shortcut icon" href="../../images/logo/Trans4M Logo (Brand Color).png"/>

</head>

<body  id="kt_body" style="background-image: url(<?=$logo;?>)"  class="quick-panel-right demo-panel-right offcanvas-right header-fixed subheader-enabled page-loading"  >

<!--begin::Main-->
<div class="d-flex flex-column flex-root">
	<!--begin::Page-->
	<div class="d-flex flex-row flex-column-fluid page">
		<!--begin::Wrapper-->
		<div class="d-flex flex-column flex-row-fluid wrapper" id="kt_wrapper">

            <div class="text-center p-10">
                <!-- <div><img src="../../images/logo/Trans4M Logo (Brand Color).png" style="width: 250px;"></div> -->
                <div class="mt-2"><img src="<?=$payment_logo;?>" height="50"></div>
            </div>

	<!--begin::Entry-->
	<div class="d-flex flex-column-fluid" style="padding-bottom: 20px;">
		<!--begin::Container-->
		<div class=" container ">
			<div class="card card-custom card-transparent">
                <div class="card-body p-0">
                    <!--begin: Wizard-->
                    <div class="wizard wizard-4" id="kt_wizard_v4" data-wizard-state="step-first" data-wizard-clickable="true">
                        <!--begin: Wizard Nav-->
                        <div class="wizard-nav">
                            <div class="wizard-steps">

                                <!--begin::Wizard Step 1 Nav-->
                                <div class="wizard-step" data-wizard-type="step">
                                    <div class="wizard-wrapper">
                                        <div class="wizard-number">
                                            1
                                        </div>
                                        <div class="wizard-label">
                                            <div class="wizard-title">
                                                Card Details
                                            </div>
                                            <div class="wizard-desc">
                                               
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--end::Wizard Step 3 Nav-->

                            </div>
                        </div>
                        <!--end: Wizard Nav-->

                        <!--begin: Wizard Body-->
                        <div class="card card-custom card-shadowless rounded-top-0">
                            <div class="card-body p-0">
            					<div class="row justify-content-center py-8 px-8 py-lg-15 px-lg-10">
            		                <div class="col-xl-12 col-xxl-7">
                                        <!--begin: Wizard Form-->
                                        <form class="form mt-0 mt-lg-10" id="kt_form">
                                            
                                            <!--begin: Wizard Step 1-->
                                            <div class="pb-5" >
                                                <h4>Cart# <?//=$cart_number;?></h4>
                                                <h2>Php <?=number_format($amount,2);?></h2>                                         
                                                <div class="mb-10 font-weight-bold text-dark mt-5">Enter your Card Details</div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <!--begin::Input-->
                                                        <div class="form-group">
                                                            <label>Name on Card</label>
                                                            <input required type="text" class="form-control form-control-solid form-control-lg" name="ccname" placeholder="Card Name"/>
                                                            <span class="form-text text-muted">Please enter your Card Name.</span>
                                                        </div>
                                                        <!--end::Input-->
                                                    </div>
                                                    <div class="col-md-6">
                                                        <!--begin::Input-->
                                                        <div class="form-group">
                                                            <label>Card Number</label>
                                                            <input required type="text" class="form-control form-control-solid form-control-lg" name="ccnumber" placeholder="0000 0000 0000 0000"/>
                                                            <span class="form-text text-muted">16 digits</span>
                                                        </div>
                                                        <!--end::Input-->
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        <!--begin::Input-->
                                                        <div class="form-group">
                                                            <label>Card Expiry Month</label>
                                                            <input required type="number" class="form-control form-control-solid form-control-lg" name="ccmonth" placeholder="00" />
                                                            <span class="form-text text-muted">Ex. 08</span>
                                                        </div>
                                                        <!--end::Input-->
                                                    </div>
                                                    <div class="col-md-4">
                                                        <!--begin::Input-->
                                                        <div class="form-group">
                                                            <label>Card Expiry Year</label>
                                                            <input required type="number" class="form-control form-control-solid form-control-lg" name="ccyear" placeholder="0000" />
                                                            <span class="form-text text-muted">Ex. 2026</span>
                                                        </div>
                                                        <!--end::Input-->
                                                    </div>
                                                    <div class="col-md-4">
                                                        <!--begin::Input-->
                                                        <div class="form-group">
                                                            <label>Card CVV Number</label>
                                                            <input required type="password" class="form-control form-control-solid form-control-lg" name="cccvv" placeholder="000" />
                                                            <span class="form-text text-muted">Ex. 123</span>
                                                        </div>
                                                        <!--end::Input-->
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-6">
                                                        <!--begin::Input-->
                                                        <div class="form-group">
                                                            <label>Email</label>
                                                            <input required type="email" class="form-control form-control-solid form-control-lg" name="email" />
                                                            <span class="form-text text-muted">Please enter your Email.</span>
                                                        </div>
                                                        <!--end::Input-->
                                                    </div>
                                                    <div class="col-md-6">
                                                        <!--begin::Input-->
                                                        <div class="form-group">
                                                            <label>Mobile Number</label>
                                                            <input required type="integer" class="form-control form-control-solid form-control-lg" name="phone" />
                                                            <span class="form-text text-muted">Please enter your Mobile.</span>
                                                        </div>
                                                        <!--end::Input-->
                                                    </div>
                                                </div>
                                            </div>
                                            <!--end: Wizard Step 1-->

                                            <div id="kt_msgX" class="text-center"></div>
                                            <!--begin: Wizard Actions-->
                                            <div class="d-flex justify-content-between border-top mt-5 pt-8">
                                                <div><img src="<?=$payment_logo;?>" height="35"></div>
                                                <div>
                                                    <button id="kt_btnX" type="submit" class="btn btn-danger font-weight-bold text-uppercase px-9 py-4" data-wizard-type="action-submit">
                                                        PAY NOW
                                                    </button>
                                                </div>
                                            </div>

                                            <input type="hidden" name="cartnumber" value="<?=$cart_number;?>">
                                            <input type="hidden" name="amount" value="<?=$amount;?>">
                                            <input type="hidden" name="ecd" value="<?=$encrypted_cart_details;?>">
                                            <!--end: Wizard Actions-->
                                        </form>
                                        <div class="d-flex justify-content-center border-top mt-5 pt-8">
                                                <form id="form_cancel">
                                                    <input type="hidden" name="cartnumber" value="<?=$cart_number;?>">
                                                    <input type="hidden" name="ecd" value="cancel">
                                                    <button id="btn_cancel" type="submit" class="btn btn-small btn-warning">CANCEL</button>
                                                </form>
                                                &nbsp;&nbsp;
                                                <form id="form_back">
                                                    <input type="hidden" name="cartnumber" value="<?=$cart_number;?>">
                                                    <input type="hidden" name="ecd" value="cancel">
                                                    <button id="btn_back" type="submit" class="btn btn-small btn-info">BACK TO CART</button>
                                                </form>
                                        </div>
                                        <!--end: Wizard Form-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--end: Wizard Bpdy-->
                    </div>
                    <!--end: Wizard-->
                </div>
            </div>
		</div>
		<!--end::Container-->
	</div>
    <!--end::Entry-->
				
<!--begin::Footer-->
<div class="footer bg-white py-4 d-flex flex-lg-column " id="kt_footer" >
	<!--begin::Container-->
	<div class=" container  d-flex flex-column flex-md-row align-items-center justify-content-between">
		<!--begin::Copyright-->
		<div class="text-dark order-2 order-md-1">
			<span class="text-muted font-weight-bold mr-2">&copy; 2021</span>
			<a href="#!" target="_blank" class="text-dark-75 text-hover-primary">Trans4m </a>
            <span class="text-muted">| Powered By </span><a href="https://lybitsolutions.ph" target="_NEW" class="text-muted text-hover-primary">LYB I.T. Solutions</a>
		</div>
		<!--end::Copyright-->

		<!--begin::Nav-->
		<!-- <div class="nav nav-dark order-1 order-md-2">
			<a href="http://keenthemes.com/metronic" target="_blank" class="nav-link pr-3 pl-0">About</a>
			<a href="http://keenthemes.com/metronic" target="_blank" class="nav-link px-3">Team</a>
			<a href="http://keenthemes.com/metronic" target="_blank" class="nav-link pl-3 pr-0">Contact</a>
		</div> -->
		<!--end::Nav-->
	</div>
	<!--end::Container-->
</div>
<!--end::Footer-->


		</div>
		<!--end::Wrapper-->
	</div>
	<!--end::Page-->
</div>
<!--end::Main-->

<script>
var KTAppSettings = {
    "breakpoints": {
        "sm": 576,
        "md": 768,
        "lg": 992,
        "xl": 1200,
        "xxl": 1200
    },
    "colors": {
        "theme": {
            "base": {
                "white": "#ffffff",
                "primary": "#6993FF",
                "secondary": "#E5EAEE",
                "success": "#1BC5BD",
                "info": "#8950FC",
                "warning": "#FFA800",
                "danger": "#F64E60",
                "light": "#F3F6F9",
                "dark": "#212121"
            },
            "light": {
                "white": "#ffffff",
                "primary": "#E1E9FF",
                "secondary": "#ECF0F3",
                "success": "#C9F7F5",
                "info": "#EEE5FF",
                "warning": "#FFF4DE",
                "danger": "#FFE2E5",
                "light": "#F3F6F9",
                "dark": "#D6D6E0"
            },
            "inverse": {
                "white": "#ffffff",
                "primary": "#ffffff",
                "secondary": "#212121",
                "success": "#ffffff",
                "info": "#ffffff",
                "warning": "#ffffff",
                "danger": "#ffffff",
                "light": "#464E5F",
                "dark": "#ffffff"
            }
        },
        "gray": {
            "gray-100": "#F3F6F9",
            "gray-200": "#ECF0F3",
            "gray-300": "#E5EAEE",
            "gray-400": "#D6D6E0",
            "gray-500": "#B5B5C3",
            "gray-600": "#80808F",
            "gray-700": "#464E5F",
            "gray-800": "#1B283F",
            "gray-900": "#212121"
        }
    },
    "font-family": "Poppins"
};
</script>
<!--end::Global Config-->

    	<!--begin::Global Theme Bundle(used by all pages)-->
    	    	   <script src="../../trans4mersadminv12021/assets/plugins/global/plugins.bundle.js"></script>
		    	   <script src="../../trans4mersadminv12021/assets/plugins/custom/prismjs/prismjs.bundle.js"></script>
		    	   <script src="../../trans4mersadminv12021/assets/js/scripts.bundle.js"></script>
				<!--end::Global Theme Bundle-->


                    <!--begin::Page Scripts(used by this page)-->
                            <script src="../../trans4mersadminv12021/assets/js/pages/custom/wizard/wizard-4.js"></script>
                        <!--end::Page Scripts-->

<script>
$(document).ready(function () {
   document.getElementById("kt_form").reset(); 
});

// $("input[name='ccname']").change(function(){
//   var ccna=$("input[name='ccname']").val();
//   $(".nam").text(ccna);
// }); 
// $("input[name='ccnumber']").change(function(){
//   var ccnu=$("input[name='ccnumber']").val();
//   var lastfour = ccnu.substr(ccnu.length - 4);
//   $("#last4").text(lastfour);
// });
// $("input[name='ccmonth']").change(function(){
//   var mo=$("input[name='ccmonth']").val();
//   $("#mo").text(mo);
// }); 
// $("input[name='ccyear']").change(function(){
//   var yr=$("input[name='ccyear']").val();
//    $("#yr").text(yr);
// }); 

// $("input[name='address1']").change(function(){
//   var add1=$("input[name='address1']").val();
//   $("#line1").text(add1);
// }); 
// $("input[name='address2']").change(function(){
//   var add2=$("input[name='address2']").val();
//   $("#line2").text(add2);
// }); 
// $("input[name='city']").change(function(){
//   var cit=$("input[name='city']").val();
//   $("#cit").text(cit);
// }); 
// $("input[name='state']").change(function(){
//   var sta=$("input[name='state']").val();
//   $("#sta").text(sta);
// }); 
// $("select[name='country']").change(function(){
//   var cou=$("select[name='country']").val();
//   $("#cou").text(cou);
// }); 
// $("input[name='postcode']").change(function(){
//   var pos=$("input[name='postcode']").val();
//   $("#pos").text(pos);
// }); 
// $("input[name='email']").change(function(){
//   var ema=$("input[name='email']").val();
//   $("#ema").text(ema);
// }); 
// $("input[name='phone']").change(function(){
//   var pho=$("input[name='phone']").val();
//   $("#pho").text(pho);
// }); 
// $("#kt_btnX").click(function(){
//   $("#kt_btnP").hide();$("#kt_btnN").hide();
// }); 
</script>

<?php  
    // postform('kt_form','kt_msgX','Processing, please wait...','kt_btnX','processing.php');
    // postform('form_cancel','kt_msgX','Cancelling, please wait...','btn_cancel','processing.php');
    // postform('form_back','kt_msgX','Loading cart...','btn_back','processing.php');
?>

</body>
<!--end::Body-->
</html>