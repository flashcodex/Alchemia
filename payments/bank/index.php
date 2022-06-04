<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include '../../trans4mersadminv12021/classes/DbConfig.php';
require_once "../../trans4mersadminv12021/classes/Crud.php";
require_once "../../trans4mersadminv12021/login/login-model/crypt.php";


require_once "../../trans4mersadminv12021/classes/Config.php";
$crud = new Crud();
$config = new Config();
$customcrypt = new customCrypt();

if(!isset($_COOKIE[$config->cookie_user()])){
    header("location:../../members/login/");
    exit();
}

    $payment_title='BANK';
    $payment_logo='../../images/transaction/banks.png';
$amount=0;
$page_title='Payment';
$logo='../../trans4mersadminv12021/assets/media/bg/bg-3.jpg';


$data = array();
$sql="SELECT * FROM tbl_transaction_option WHERE mop_code !='GCSH' AND status='1'";
$result = $crud->getData($sql);




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
                <div class="mt-2"><img src="<?=$payment_logo;?>" height="100"></div>
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
                                                Bank Details
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
            		                <div class="col-xl-12 col-xxl-9">
                                        <!--begin: Wizard Form-->
                                        <div class="alert alert-custom alert-light-primary fade show mb-5" role="alert">
                                            <div class="alert-icon"><i class="flaticon-warning"></i></div>
                                            <div class="alert-text">
                                                <div class="row">
                                                    <div class="col-xl-6">
                                                        Security Bank - Savings Account<br><b>Rafael de Andres </b><br><i>0000026964681</i>
                                                    </div>
                                                    <div class="col-xl-6">
                                                        Unionbank Savings Account<br><b>Rafael de Andres</b><br><i>1096 5395 4207</i>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <div class="alert-close">
                                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                                    <span aria-hidden="true"><i class="ki ki-close"></i></span>
                                                </button>
                                            </div>
                                        </div>
                                        <form class="form mt-0 mt-lg-10" id="kt_form_bank"  enctype="multipart/form-data">
                                            
                                            <!--begin: Wizard Step 1-->
                                            <div class="pb-5" >
                                                <!-- <h4>Cart# <?//=$cart_number;?></h4>
                                                <h2>Php <?=number_format($amount,2);?></h2>      -->                                    
                                                <div class="mb-10 font-weight-bold text-dark mt-5">Enter your Details</div>
                                                <div class="row">
                                                    <div class="col-md-4">
                                                        
                                                        <div class="form-group">
                                                            <label>Fullname :</label>
                                                            <input  type="text" class="form-control form-control-solid form-control-lg" name="fullname" placeholder="John H. Doe"/>
                                                            <span class="form-text text-muted">Please enter your Full Name.</span>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>Bank Name :</label>
                                                            <select  type="text" class="form-control form-control-solid form-control-lg" name="type" placeholder="John H. Doe"/>
                                                                <option></option>
                                                                <?php
                                                                if(!$result){
                                                                    return $data;
                                                                }else{
                                                                    $count=0;
                                                                    foreach ($result as $row) {
                                                                        
                                                                        $data[]=array(
                                                                            'mop_code' => $row['mop_code'],
                                                                            'description' => $row['description']
                                                                          );
                                                                        echo"<option value='".$data[$count]['mop_code']."'>".$data[$count]['description']."</option>";
                                                                        ++$count;
                                                                     } 
                                                                     
                                                                }
                                                                ?>
                                                            </select>
                                                            <span class="form-text text-muted">Please enter your Full Name.</span>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>Transaction #:</label>
                                                            <input  type="text" class="form-control form-control-solid form-control-lg" name="txn_number" placeholder="000000000000"/>
                                                            <span class="form-text text-muted"></span>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>Amount:</label>
                                                            <input  type="text" class="form-control form-control-solid form-control-lg" name="t_amount" placeholder="Ex: 10000.00"/>
                                                            <span class="form-text text-muted"></span>
                                                        </div>
                                                    </div>
                                                    <div class="col-md-8">
                                                        <div class="form-group">
                                                            <label>File Upload :</label>
                                                            <div class="image-input image-input-outline" id="kt_gcash_image" style="width: 100%;height:300px ;">
                                                            <img src="../../images/transaction/TRANS4M-CHEQUE-avatar.png" class="temp_img image-input-wrapper" style="width: 100%;height:300px ;">
                                                            <label class="btn btn-xs btn-icon btn-circle btn-white btn-hover-text-primary btn-shadow" data-action="change" data-toggle="tooltip" title="" data-original-title="Change File">
                                                                <i class="fa fa-pen icon-sm text-muted"></i>
                                                                <input type="file" id="gcash_image" name="gcash_image" accept=".png, .jpg, .jpeg" />
                                                                <input type="hidden" name="gcash_image_remove" />
                                                            </label>
                                                        </div>
                                                    </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                            <!--end: Wizard Step 1-->

                                            <div id="kt_msgX" class="text-center"></div>
                                            <!--begin: Wizard Actions-->
                                            <div class="d-flex justify-content-between border-top mt-5 pt-8">
                                                <div><img src="<?=$payment_logo;?>" height="35"></div>
                                                <div>
                                                    <button id="kt_btnX" type="submit" class="btn btn-danger font-weight-bold text-uppercase px-9 py-4" >
                                                        PAY NOW
                                                    </button>
                                                </div>
                                            </div>

                                            <input type="hidden" name="cartnumber" value="<?=$cart_number;?>">
                                            <input type="hidden" name="amount" value="<?=$amount;?>">
                                            <input type="hidden" name="ecd" value="<?=$encrypted_cart_details;?>">
                                        </form>
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
                            <script src="../../trans4mersadminv12021/assets/js/pages/crud/forms/validation/form-controls.js"></script>
                        <!--end::Page Scripts-->

<script>

gcash_image.onchange = evt => {
  const [file] = gcash_image.files;
  if (file) {
    $('.temp_img').attr('src', URL.createObjectURL(file));
  }
}

KTFormControls.init();
</script>
</body>
<!--end::Body-->
</html>