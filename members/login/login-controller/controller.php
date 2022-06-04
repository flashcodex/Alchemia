 <?php 
 @session_start();
 ini_set('display_errors', 1);
 ini_set('display_startup_errors', 1);
 error_reporting(E_ALL);

// if(!isset($_SESSION['apppage'])){
//        http_response_code(404);
// }else{
	//LOAD PAGE
	if(isset($_POST['action'])){
		require "../login-model/model.php";
	       $controller = new Login();
		$action = base64_decode($_POST['action']);
              $data = array();
              if($action === "sign-in"){
              	$email = (isset($_POST['email'])) ? $_POST['email'] : _invalidMissing_Input("Email is required");
              	$password = (isset($_POST['password'])) ? $_POST['password'] : _invalidMissing_Input("Password is required");
		       	$remember = (isset($_POST['remember'])) ? $_POST['remember'] : 'off';
		       	if(isset($_POST['admin_token'])){
		       		$token = (isset($_POST['admin_token'])) ? $_POST['admin_token'] : _invalidMissing_Input("Token is required");
		       		$model_response = $controller->Login_User_Admin($email,$password,$remember,$token);
		       	}else{
              		$model_response = $controller->Login_User($email,$password,$remember);
		       	}
              	if($model_response != false){
		            	$data = array(
		              	'status' => 'success',
		              	'message' => 'request accepted',
		              	'payload' => base64_encode(json_encode($model_response))
		            	);
				}else{
			              $data = array(
				       	'status' => 'error',
				       	'message' => 'Something went wrong, Please try again later.',
				       	'payload' => base64_encode(json_encode($model_response))
				       );
				}
				echo json_encode($data);
              }else if($action === "sign-up"){
              	$sponsor = (isset($_POST['sponsor'])) ? $_POST['sponsor'] : _invalidMissing_Input("Sponsor is required");
              	$sponsor = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $sponsor)) ? _invalidMissing_Input("Sponsor can only consist of alphabetical characters and numbers"):$sponsor;
              	$sponsor = (strlen($sponsor) <3 || strlen($sponsor) > 20) ? _invalidMissing_Input("Sponsor must have atleast 3 to 20 characters long") : $sponsor;
              	$sponsor_id=$controller->Find_Sponsor($sponsor);
              	if(!$sponsor_id){
		          	_invalidMissing_Input("Sponsor not found!");
		       	}else if($sponsor_id=='not_active'){
		       		_invalidMissing_Input("Invalid sponsor! Make sure your sponsor has already topped-up");
		       	}
              	$fname = (isset($_POST['fname'])) ? $_POST['fname'] : _invalidMissing_Input("First name is required");
              	$fname = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $fname)) ? _invalidMissing_Input("First name can only consist of alphabetical characters and numbers"):$fname;
              	$fname = (strlen($fname) > 20) ? _invalidMissing_Input("You have reached your maximum limit of characters allowed") : $fname;
              	$username = (isset($_POST['username'])) ? $_POST['username'] : _invalidMissing_Input("Username is required");
              	$username = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $username)) ? _invalidMissing_Input("Username can only consist of alphabetical characters and numbers"):$username;
              	$username = (strlen($username) <3 || strlen($username) > 20) ? _invalidMissing_Input("Username must have atleast 3 to 20 characters long") : $username;
              	$email = (isset($_POST['email'])) ? $_POST['email'] : _invalidMissing_Input("Password is required");
              	$email = (!filter_var($email, FILTER_VALIDATE_EMAIL)) ? _invalidMissing_Input("Email is not a valid email address") : $email;
              	$password = (isset($_POST['password'])) ? $_POST['password'] : _invalidMissing_Input("Password is required");
              	$password = (strlen($password) <8) ? _invalidMissing_Input("Password must have atleast 8 characters") : $password;
              	$cpassword = (isset($_POST['cpassword'])) ? $_POST['cpassword'] : _invalidMissing_Input("Password is required");
              	$cpassword = (strcasecmp($password, $cpassword ) != 0) ? _invalidMissing_Input("Password doesn't match!") : $cpassword;
              	$agree = (isset($_POST['agree'])) ? $_POST['agree'] : _invalidMissing_Input("You must agree to the terms and conditions");
              	$source = (isset($_POST['source'])) ? $_POST['source'] : "organic";
              	$model_response = $controller->User_Signup($sponsor,$fname,$username,$email,$password,$agree,$source,$sponsor_id);
              	if($model_response != false){
		            	$data = array(
		              	'status' => 'success',
		              	'message' => 'request accepted',
		              	'payload' => base64_encode(json_encode($model_response))
		            	);
				}else{
			              $data = array(
				       	'status' => 'error',
				       	'message' => 'Something went wrong, Please try again later.',
				       	'payload' => base64_encode(json_encode($model_response))
				       );
				}
				echo json_encode($data);
            }else if($action === "forgot-pass"){
            	$email = (isset($_POST['email'])) ? $_POST['email'] : _invalidMissing_Input("Email is required");
              	$model_response = $controller->User_Forgotpass($email);
              	if($model_response != false){
		            	$data = array(
		              	'status' => 'success',
		              	'message' => 'request accepted',
		              	'payload' => base64_encode(json_encode($model_response))
		            	);
				}else{
			              $data = array(
				       	'status' => 'error',
				       	'message' => 'Something went wrong, Please try again later.',
				       	'payload' => base64_encode(json_encode($model_response))
				       );
				}
				echo json_encode($data);
            }else if($action === "reset-pass"){ 
				$password = (isset($_POST['password'])) ? $_POST['password'] : _invalidMissing_Input("Password is required");
				$password = (strlen($password) < 8 )? _invalidMissing_Input("Password must atleast 8 characters long") : $password;
				$cpassword = (isset($_POST['cpassword'])) ? $_POST['cpassword'] : _invalidMissing_Input("Confirm password is required");
				$cpassword = (strlen($cpassword) < 8 )? _invalidMissing_Input("Password must atleast 8 characters long") : $cpassword;
				$cpassword = (strcasecmp($password, $cpassword ) != 0) ? _invalidMissing_Input("Password doesn't match!") : $cpassword;
				$token = (isset($_POST['reset_token'])) ? $_POST['reset_token'] : _invalidMissing_Input("Opps!, It seems that this link is invalid.");
			    $validator = (isset($_POST['reset_validator'])) ? $_POST['reset_validator'] : _invalidMissing_Input("Opps!, It seems that this link is invalid.");
				$model_response = $controller->User_Resetpass($token, $validator, $cpassword);
				if($model_response){
		            $response = array(
		                'status' => 'success',
		                'message' => 'Request successful',
		                'payload' => base64_encode(json_encode($model_response))
		            );
				}else{
	                $response = array(
		                'status' => 'error',
		                'message' => 'Internal server error',
		                'payload' => base64_encode(json_encode($model_response))
		            );
				}
				echo json_encode($response);
			}else if($action === "verify-user"){ 
				$pin = (isset($_POST['pin'])) ? $_POST['pin'] : _invalidMissing_Input("Pin is required");
				$model_response = $controller->Login_User_LYB($pin);
				if($model_response){
		            $response = array(
		                'status' => 'success',
		                'message' => 'Request successful',
		                'payload' => base64_encode(json_encode($model_response))
		            );
				}else{
	                $response = array(
		                'status' => 'error',
		                'message' => 'Internal server error',
		                'payload' => base64_encode(json_encode($model_response))
		            );
				}
				echo json_encode($response);
			}else if($action === "verify-email"){ 
				$account = (isset($_POST['account'])) ? $_POST['account'] : _invalidMissing_Input("Opps!, It seems that this link is invalid.");
				$model_response = $controller->User_Verifyemail($account);
				if($model_response){
		            $response = array(
		                'status' => 'success',
		                'message' => 'Request successful',
		                'payload' => base64_encode(json_encode($model_response))
		            );
				}else{
	                $response = array(
		                'status' => 'error',
		                'message' => 'Internal server error',
		                'payload' => base64_encode(json_encode($model_response))
		            );
				}
				echo json_encode($response);
			}else{
			$data = array(
		            'status' => 'failed',
		            'message' => "Request not found",
		            'payload' => ''
	         	);
		       echo json_encode($data);
		       exit();
		}
	}else{
		$data = array(
		       'status' => 'not_found',
		       'message' => "Request not found",
		       'payload' => ''
		);
		echo json_encode($data);
		exit();
	}

// }

function _invalidMissing_Input($message){
	 $response = array(
        'status' => 'failed',
        'message' => $message,
        'payload' => ''
     );
     //return the invalid message
     echo json_encode($response);
     //terminate process when input is invalid
     exit();
}


// $fname = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $fname)) ? _invalidMissing_Input("First name can only consist of alphabetical characters"):$fname;
// $n_password = (isset($_POST['n_password'])) ? $_POST['n_password'] : _invalidMissing_Input("Password is required");
// (strlen($n_password) < 8 || strlen($n_password) > 20) ? _invalidMissing_Input("Password must atleast 8 characters long") : $n_password;
// (strcasecmp($n_password, $v_password ) != 0) ? _invalidMissing_Input("Password doesn't match!") : $v_password;
// (strlen($_POST['mobile'])!=11) ? _invalidMissing_Input("Mobile number is not valid"):$mobile;