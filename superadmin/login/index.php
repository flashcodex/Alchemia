<?php  
@session_start();
ini_set('display_errors', 1); 
ini_set('display_startup_errors', 1); 
error_reporting(E_ALL);


require_once "classes/Config.php";
$config = new Config();
$validator="";
$email="";   


if (isset($_GET['token']) && isset($_GET['validator'])) {
        $validator = $_GET['validator'];
	    $token = $_GET['token'];
}
else if(isset($_SESSION[$config->SESS().'_AdSTATUS'],$_SESSION[$config->SESS().'_TYPE']) && $_SESSION[$config->SESS().'_AdSTATUS'] == md5('active')
      && $_SESSION[$config->SESS().'_TYPE'] == md5('admin')) {
        header("Location: ../dashboard");
}

?>

<!DOCTYPE html>
<html lang="en" >
    <!--begin::Head-->
    <head><base href="">
                <meta charset="utf-8"/>
        <title>Alchemia | Login</title>
        <meta name="description" content="Login page example"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>

        <!--begin::Fonts-->
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700"/>        <!--end::Fonts-->
		<!--begin::Page Custom Styles(used by this page)-->
        <link href="assets/css/pages/login/classic/login-5.css" rel="stylesheet" type="text/css"/>
        <!--end::Page Custom Styles-->

        <!--begin::Global Theme Styles(used by all pages)-->
        <link href="assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css"/>
        <link href="assets/plugins/custom/prismjs/prismjs.bundle.css" rel="stylesheet" type="text/css"/>
        <link href="assets/css/style.bundle.css" rel="stylesheet" type="text/css"/>
        <script src="assets/js/jquery.min.js"></script>
		<link href="assets/plugins/custom/bootstrap-pincode-input-master/css/bootstrap-pincode-input.css" rel="stylesheet">
        <!--end::Global Theme Styles-->
        <link rel="shortcut icon" href="<?php echo $config->icon() ?>"/>

            </head>
    <!--end::Head-->

    <!--begin::Body-->
    <body  id="kt_body"  class="header-fixed header-mobile-fixed subheader-enabled subheader-fixed aside-enabled aside-fixed page-loading"  >

    	<!--begin::Main-->
	<div class="d-flex flex-column flex-root">
		<!--begin::Login-->
<div class="login login-5 login-signin-on d-flex flex-row-fluid" id="kt_login">
	<div class="d-flex flex-center bgi-size-cover bgi-no-repeat flex-row-fluid" style="background-image: url(<?php echo $config->login_bg() ?>);">
		<div class="login-form text-center text-white p-7 position-relative overflow-hidden">
			<!--begin::Login Header-->
			<div class="d-flex flex-center mb-15">
				<a href="javascript:;">
					<img src="<?php echo $config->login_logo() ?>"  class="max-h-80px" alt="" />
				</a>
			</div>
			<!--end::Login Header-->
			<?php
			if (isset($_GET['token']) && isset($_GET['validator'])) {
					    	echo '<div class="login-passReset">
					                <div class="mb-20">
					                    <h3 class="opacity-40 font-weight-normal">Create New Password</h3>
					                    <p class="opacity-40">Fill the form below to change your password</p>
					                </div>
					                <form class="form" id="kt_login_passReset_form">
					                        
					                    <div class="form-group">
					                        <!-- <input type="hidden" name="selector" value="<?php echo $selector; ?>"> -->
					                        <input type="hidden" name="reset_validator" value="'.$validator.'">
					                        <input type="hidden" id="reset_token" name="reset_token" value="'.$token.'">
					                        <input class="form-control h-auto text-white bg-white-o-5 rounded-pill border-0 py-4 px-8" type="password" placeholder="Enter new password" name="password"/>
					                    </div>
					                    
					                    <div class="form-group">
					                        <input class="form-control h-auto text-white bg-white-o-5 rounded-pill border-0 py-4 px-8" type="password" placeholder="Confirm Password" name="cpassword"/>
					                    </div>


					                    <div class="form-group text-center mt-10">
					                        <button id="kt_login_passReset_submit" class="btn btn-pill btn-primary opacity-90 px-15 py-3">Confirm</button>
					                    </div>
					                </form>
					            </div>';
					    }else{
						echo '
							<!--begin::Login Sign in form-->
							<div class="login-signin">
								<div class="mb-20">
									<h3 class="opacity-40 font-weight-normal">Sign In To SuperAdmin</h3>
									<p class="opacity-40">Enter your details to login to your account:</p>
								</div>
								<form class="form" id="kt_login_signin_form">
                                ';
                             if(isset($_GET['admin_token'])){
                                    echo '<input type="hidden" name="admin_token" value="'.$_GET['admin_token'].'"/>';
                                }   
                             echo '
									<div class="form-group">
										<input class="form-control h-auto text-white bg-white-o-5 rounded-pill border-0 py-4 px-8" type="text" placeholder="Email" name="email" autocomplete="off" value="';
                                    if(isset($_GET['user_email'])){echo $_GET['user_email'];} echo '"/>
									</div>
									<div class="form-group">
										<input class="form-control h-auto text-white bg-white-o-5 rounded-pill border-0 py-4 px-8" type="password" placeholder="Password" name="password" value="'; 
                                    if(isset($_GET['n'])){echo $_GET['n'];} echo '"/>
									</div>
									<div class="form-group d-flex flex-wrap justify-content-between align-items-center px-8 opacity-60">
										<a href="javascript:;" id="kt_login_forgot" class="text-white font-weight-bold">Forget Password ?</a>
									</div>
									<div class="form-group text-center mt-10">
										<button id="kt_login_signin_submit" class="btn btn-pill btn-success opacity-90 px-15 py-3">Sign In</button>
									</div>
								</form>
							</div>
							<!--end::Login Sign in form-->

							<!--begin::Login forgot password form-->
							<div class="login-forgot">
								<div class="mb-20">
									<h3 class="opacity-40 font-weight-normal">Forgotten Password ?</h3>
									<p class="opacity-40">Enter your email to reset your password</p>
								</div>
								<form class="form" id="kt_login_forgot_form">
									<div class="form-group mb-10">
										<input class="form-control h-auto text-white bg-white-o-5 rounded-pill border-0 py-4 px-8" type="text" placeholder="Email" name="email" autocomplete="off"/>
									</div>
									<div class="form-group">
										<button id="kt_login_forgot_submit" class="btn btn-pill btn-success opacity-90 px-15 py-3 m-2">Request</button>
										<button id="kt_login_forgot_cancel" class="btn btn-pill btn-outline-white opacity-70 px-15 py-3 m-2">Cancel</button>
									</div>
								</form>
							</div>
							<!--end::Login forgot password form-->';
						}
						?>
		</div>
	</div>
</div>
<!--end::Login-->
	</div>
<!--end::Main-->
 <div class="modal" id="pin_code_modal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdrop" aria-hidden="true" >
                            <div class="modal-dialog modal-dialog-centered" role="document">
                                <div class="modal-content">
                                    <div class="modal-header  text-center">
                                        <h5 class="modal-title" id="exampleModalLabel">Enter 6-Digits Verification Code</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <i aria-hidden="true" class="ki ki-close"></i>
                                        </button>
                                    </div>
                                    <div class="modal-body  text-center">
                                        <p>You will receive the 6-digits verification code to your email.</p>
                                        <br /><br />
                                        
                                        <div class="w-60">
                                            <input type="text" id="pincode-input7" >
                                      
                                            <!-- <a href="javascript:void(0);" onclick="resendPin()"  class="font-weight-bold font-size-sm ">Resend Verification code?</a>  style="color: #6993ff !important;" -->
                                            <button id="resendPin" class="btn btn-link font-weight-bold font-size-sm text-decoration-none">Resend Verification code?</button>
                                        </div>
                                        <br />
                                    </div>
                                    <div class="modal-footer text-center">
                                        <button id="cancel" data-dismiss="modal" class="btn btn-light-primary font-weight-bold">Cancel</button>
                                        <button type="submit" id="verify" class="btn btn-primary font-weight-bold" >Verify</button>
                                    </div>
                                </div>
                            </div>
                        </div>


        <script>var HOST_URL = "https://preview.keenthemes.com/metronic/theme/html/tools/preview";</script>
        <!--begin::Global Config(global config for global JS scripts)-->
        <script>
            var KTAppSettings = {
    "breakpoints": {
        "sm": 576,
        "md": 768,
        "lg": 992,
        "xl": 1200,
        "xxl": 1400
    },
    "colors": {
        "theme": {
            "base": {
                "white": "#ffffff",
                "primary": "#3699FF",
                "secondary": "#E5EAEE",
                "success": "#1BC5BD",
                "info": "#8950FC",
                "warning": "#FFA800",
                "danger": "#F64E60",
                "light": "#E4E6EF",
                "dark": "#181C32"
            },
            "light": {
                "white": "#ffffff",
                "primary": "#E1F0FF",
                "secondary": "#EBEDF3",
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
                "secondary": "#3F4254",
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
            "gray-200": "#EBEDF3",
            "gray-300": "#E4E6EF",
            "gray-400": "#D1D3E0",
            "gray-500": "#B5B5C3",
            "gray-600": "#7E8299",
            "gray-700": "#5E6278",
            "gray-800": "#3F4254",
            "gray-900": "#181C32"
        }
    },
    "font-family": "Poppins"
};
        </script>
        <!--end::Global Config-->

    	<!--begin::Global Theme Bundle(used by all pages)-->
    	    	   <script src="assets/plugins/global/plugins.bundle.js"></script>
		    	   <script src="assets/plugins/custom/prismjs/prismjs.bundle.js"></script>
		    	   <script src="assets/js/scripts.bundle.js"></script>
				<!--end::Global Theme Bundle-->


                    <!--begin::Page Scripts(used by this page)-->
                        <script src="assets/js/pages/custom/login/login-general.js"></script>
						<script src="assets/plugins/custom/bootstrap-pincode-input-master/js/bootstrap-pincode-input.js"></script>
                        <!--end::Page Scripts-->
            </body>
    <!--end::Body-->
</html>