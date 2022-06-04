
<?php
@session_start();
require_once "classes/Config.php";
require_once "login-model/crypt.php";
$customcrypt = new customCrypt();
$config = new Config();

$email = "";
$sponsor = "";
$fname = "";
$validator="";
$email="";


$account="";
if(isset($_COOKIE[$config->cookie_user()]) && !isset($_GET['token']) && !isset($_GET['validator'])){
	$usercookie = json_decode($customcrypt->getDecrypt($_COOKIE[$config->cookie_user()]), true);
	// if($usercookie['user_terms']!==2){
	// 	header("location:../app/agreement");
	//    exit();
	// }else{
	   header("location:../app/dashboard");
	   exit();
	// }
}
if (isset($_GET['sponsor'])) {
	$sponsor = $_GET['sponsor'];
}
if (isset($_GET['token']) && isset($_GET['validator'])) {
	$validator = $_GET['validator'];
	$email = $_GET['token'];
}
if (isset($_GET['account'])) {
	$account = $_GET['account'];
}



?>

<!DOCTYPE html>
<html lang="en">
	<!--begin::Head-->
	<head>
		<meta charset="utf-8" />
		<title>Alchemia | Login</title>
		<meta name="description" content="Login page" />
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
		<link rel="canonical" href="https://pamantasanalchemia.com/" />
		<!--begin::Fonts-->
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700" />
		<!--end::Fonts-->
		<!--begin::Page Custom Styles(used by this page)-->
		<link href="assets/css/pages/login/classic/login-4.css" rel="stylesheet" type="text/css" />
		<!--end::Page Custom Styles-->
		<!--begin::Global Theme Styles(used by all pages)-->
		<link href="assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
		<link href="assets/plugins/custom/prismjs/prismjs.bundle.css" rel="stylesheet" type="text/css" />
		<link href="assets/css/style.bundle.css" rel="stylesheet" type="text/css" />
		<link href="assets/plugins/custom/bootstrap-pincode-input-master/css/bootstrap-pincode-input.css" rel="stylesheet">
		<script src="assets/js/jquery.min.js"></script>
		<!-- <link href="assets/css/pages/error/error-3.css" rel="stylesheet" type="text/css" /> -->
		<!--end::Global Theme Styles-->
		<!--begin::Layout Themes(used by all pages)-->
		<!--end::Layout Themes-->
		<link rel="shortcut icon" href="<?php echo $config->icon()?>" />
	</head>
	<!--end::Head-->
	<!--begin::Body-->
<body id="kt_body" class="header-fixed header-mobile-fixed subheader-enabled page-loading">
		<!--begin::Main-->

		<div class="d-flex flex-column flex-root">
			<!--begin::Login-->
			<div class="login login-4 login-signin-on d-flex flex-row-fluid" id="kt_login">
				<div class="d-flex flex-center flex-row-fluid bgi-size-cover bgi-position-top bgi-no-repeat" style="background-image: url(<?php echo $config->login_bg()?>);">
					<div class="login-form text-center p-7 position-relative overflow-hidden">
						<!--begin::Login Header-->
						<div class="d-flex flex-center mb-15">
							<a href="<?php echo $config->Link()?>">
								<img  class="max-h-80px" alt="" src="<?php echo $config->login_logo()?>"/>
							</a>
						</div>
						<?php 
					     if (isset($_GET['token']) && isset($_GET['validator'])) {
					    	echo '<div class="login-passReset">
					                <div class="mb-20">
					                    <h3 class="text-dark">Create New Password</h3>
					                    <p class="opacity-60 font-weight-bold text-dark">Fill the form below to change your password</p>
					                </div>
					                <form class="form" id="kt_login_passReset_form">
					                        
					                    <div class="form-group">
					                        <!-- <input type="hidden" name="selector" value="<?php echo $selector; ?>"> -->
					                        <input type="hidden" name="reset_validator" value="'.$validator.'">
					                        <input type="hidden" id="email" name="reset_token" value="'.$email.'">
					                        <input type="hidden" name="action" value="'.md5('tba_user_passReset').'"/>
					                        <input type="hidden" id="direct_login" name="direct_login" value="'.md5('tba_user_direct_login').'"/>
					                        <input class="form-control h-auto form-control-solid py-4 px-8" id="password" type="password" placeholder="Enter new password" name="password"/>
					                    </div>
					                    
					                    <div class="form-group">
					                        <input class="form-control h-auto form-control-solid py-4 px-8" id="cpassword" type="password" placeholder="Confirm Password" name="cpassword"/>
					                    </div>


					                    <div class="form-group text-center mt-10">
					                        <button id="kt_login_passReset_submit" class="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4">Confirm</button>
					                    </div>
					                </form>
					            </div>';
					    }else if (isset($_GET['account'])) {
					    	echo '<div class="login-passReset">
					                <div class="mb-20">
					                    <h2 class="font-weight-bolder text-primary mb-7" id="verify-message"></h2>
					                </div>
					            </div>';
					    }else{
						echo '
						<div class="login-signin">
							<div class="mb-20">
								<h3>Members Login</h3>
								<div class="text-muted font-weight-bold">Enter your details to login to your account:</div>
							</div>
							<form class="form" id="kt_login_signin_form">
							 <input type="hidden" name="action" value="'.md5('tba_user_login').'"/>
							 ';
							 if(isset($_GET['admin_token'])){
								    echo '<input type="hidden" name="admin_token" value="'.$_GET['admin_token'].'"/>';
								}	
							 echo '
								<div class="form-group mb-5">
									<input class="form-control h-auto form-control-solid py-4 px-8" type="text" placeholder="Email/User ID" name="email" autocomplete="off"  value="';
									if(isset($_GET['user_email'])){echo $_GET['user_email'];} echo '" />
								</div>
								<div class="form-group mb-5">
									<input class="form-control h-auto form-control-solid py-4 px-8" type="password" placeholder="Password" name="password" value="'; 
									if(isset($_GET['n'])){echo $_GET['n'];} echo '" />
								</div>
								<div class="form-group d-flex flex-wrap justify-content-between align-items-center">
									<div class="checkbox-inline">
										<label class="checkbox m-0 text-muted">
										';
										 if(isset($_GET['admin_token'])){
		                                     echo '<input type="checkbox" name="remember" disabled/>';
		                                   }else{
		                                     echo '<input type="checkbox" name="remember"/>';
		                                   }
										echo '
										<span></span>Remember me</label>
									</div>
									<a href="javascript:;" id="kt_login_forgot" class="text-muted text-hover-primary">Forget Password ?</a>
								</div>
								<button id="kt_login_signin_submit" class="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-4">Sign In</button>
							</form>
							<div class="mt-10">
								<span class="opacity-70 mr-4">Don&apos;t have an account yet?</span>
								<a href="../signup" class="text-muted text-hover-primary font-weight-bold">Sign Up!</a>
							</div>
						</div>
						<!--end::Login Sign in form-->
						<!--begin::Login forgot password form-->
						<div class="login-forgot">
							<div class="mb-20">
								<h3>Forgotten Password ?</h3>
								<div class="text-muted font-weight-bold">Enter your email to reset your password</div>
							</div>
							<form class="form" id="kt_login_forgot_form">
							 	<input type="hidden" name="action" value="'.md5('tba_user_forgot').'"/>
                        		<input type="hidden" name="case" value="'.'forgot_pass'.'"/>
								<div class="form-group mb-10">
									<input class="form-control form-control-solid h-auto py-4 px-8" type="text" placeholder="Email" required="true" name="email" autocomplete="off" />
								</div>
								<div class="form-group d-flex flex-wrap flex-center mt-10">
									<button id="kt_login_forgot_submit" class="btn btn-primary font-weight-bold px-9 py-4 my-3 mx-2">Request</button>
									<button id="kt_login_forgot_cancel" class="btn btn-secondary font-weight-bold px-9 py-4 my-3 mx-2">Cancel</button>
								</div>
							</form>
						</div>';
					}
						?>
						<!--end::Login forgot password form-->
					</div>
				</div>
			</div>
			<!--end::Login-->
		</div>
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
                                        <button type="click" id="verify" class="btn btn-primary font-weight-bold" >Verify</button>
                                    </div>
                                </div>
                            </div>
                        </div>
		<!--end::Main-->
		<script>var HOST_URL = "https://preview.keenthemes.com/metronic/theme/html/tools/preview";</script>
		<!--begin::Global Config(global config for global JS scripts)-->
		<script>var KTAppSettings = { "breakpoints": { "sm": 576, "md": 768, "lg": 992, "xl": 1200, "xxl": 1200 }, "colors": { "theme": { "base": { "white": "#ffffff", "primary": "#0BB783", "secondary": "#E5EAEE", "success": "#1BC5BD", "info": "#8950FC", "warning": "#FFA800", "danger": "#F64E60", "light": "#F3F6F9", "dark": "#212121" }, "light": { "white": "#ffffff", "primary": "#D7F9EF", "secondary": "#ECF0F3", "success": "#C9F7F5", "info": "#EEE5FF", "warning": "#FFF4DE", "danger": "#FFE2E5", "light": "#F3F6F9", "dark": "#D6D6E0" }, "inverse": { "white": "#ffffff", "primary": "#ffffff", "secondary": "#212121", "success": "#ffffff", "info": "#ffffff", "warning": "#ffffff", "danger": "#ffffff", "light": "#464E5F", "dark": "#ffffff" } }, "gray": { "gray-100": "#F3F6F9", "gray-200": "#ECF0F3", "gray-300": "#E5EAEE", "gray-400": "#D6D6E0", "gray-500": "#B5B5C3", "gray-600": "#80808F", "gray-700": "#464E5F", "gray-800": "#1B283F", "gray-900": "#212121" } }, "font-family": "Poppins" };</script>
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
</html>

