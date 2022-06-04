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
		require "../signup-model/model.php";
	       $controller = new Login();
		$action = base64_decode($_POST['action']);
              $data = array();
              if($action === "sign-up"){
              	$pin='no_pin';
              	if(isset($_SESSION['signup_pin'])){
              		if(isset($_POST['pin'])){
	              		if($_POST['pin']==$_SESSION['signup_pin']){
	              			$pin='correct_pin';
	              		}else{
	              			_invalidMissing_Input("Incorrect pin, Please try again");
	              		}
              		}else{
              			unset($_SESSION['signup_pin']);
              		}
              	}
              	$fname = (isset($_POST['fname'])) ? $_POST['fname'] : _invalidMissing_Input("First name is required");
              	$fname = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $fname)) ? _invalidMissing_Input("First name can only consist of alphabetical characters and numbers"):$fname;
              	$fname = (strlen($fname) > 20) ? _invalidMissing_Input("You have reached your maximum limit of characters allowed in first name") : $fname;
              	$lname = (isset($_POST['lname'])) ? $_POST['lname'] : _invalidMissing_Input("Last name is required");
              	$lname = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $lname)) ? _invalidMissing_Input("Last name can only consist of alphabetical characters and numbers"):$lname;
              	$lname = (strlen($lname) > 20) ? _invalidMissing_Input("You have reached your maximum limit of characters allowed in last name") : $lname;
              	// $phonecode = (isset($_POST['phonecode'])) ? $_POST['phonecode'] : _invalidMissing_Input("Phone code is required");
              	// $phonecode = (strlen($phonecode) > 4 || !is_numeric($phonecode)) ? _invalidMissing_Input("Phone code in not valid") : $phonecode;
              	$mobile = (isset($_POST['new_mobile'])) ? $_POST['new_mobile'] : _invalidMissing_Input("Mobile number is required");
				$mobile = (!is_numeric($_POST['new_mobile'])) ? _invalidMissing_Input("Mobile number can contain digits only"):$mobile;
				$mobile = (strlen($_POST['new_mobile'])!=10 ) ? _invalidMissing_Input("Mobile number is not valid"):$mobile;
              	$username = (isset($_POST['userid'])) ? $_POST['userid'] : _invalidMissing_Input("Username is required");
              	$username = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $username)) ? _invalidMissing_Input("Username can only consist of alphabetical characters and numbers"):$username;
              	$username = (strlen($username) <3 || strlen($username) > 20) ? _invalidMissing_Input("Username must have atleast 3 to 20 characters long") : $username;
              	$email = (isset($_POST['email'])) ? $_POST['email'] : _invalidMissing_Input("Email is required");
              	$email = (!filter_var($email, FILTER_VALIDATE_EMAIL)) ? _invalidMissing_Input("Email is not a valid email address") : $email;
              	$password = (isset($_POST['password'])) ? $_POST['password'] : _invalidMissing_Input("Password is required");
              	$password = (strlen($password) <8) ? _invalidMissing_Input("Password must have atleast 8 characters") : $password;
              	$cpassword = (isset($_POST['cpassword'])) ? $_POST['cpassword'] : _invalidMissing_Input("Password is required");
              	$cpassword = (strcasecmp($password, $cpassword ) != 0) ? _invalidMissing_Input("Password doesn't match!") : $cpassword;
              	$agree = 'on';
              	$model_response = $controller->User_Signup($fname,$lname,$mobile,$username,$email,$cpassword,$pin,$agree);
              	// if($model_response != false){
		            	$data = array(
		              	'status' => 'success',
		              	'message' => 'request accepted',
		              	'payload' => base64_encode(json_encode($model_response))
		            	);
				// }else{
			 //              $data = array(
				//        	'status' => 'error',
				//        	'message' => 'Something went wrong, Please try again later.',
				//        	'payload' => base64_encode(json_encode($model_response))
				//        );
				// }
				echo json_encode($data);
			}else if($action === "verify-email"){ 
				$sponsor = (!empty($_POST['sponsor'])) ? $_POST['sponsor'] : _invalidMissing_Input("Please enter sponsor.");
				$sponsor = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $sponsor)) ? _invalidMissing_Input("Sponsor can only consist of alphabetical characters and numbers"):$sponsor;
				$sponsor = (strlen($sponsor) <3 || strlen($sponsor) > 20) ? _invalidMissing_Input("Sponsor must have atleast 3 to 20 characters long") : $sponsor;
				$val = (!empty($_POST['val'])) ? $_POST['val'] : _invalidMissing_Input("Please enter placement.");
				$val = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $val)) ? _invalidMissing_Input("Placement can only consist of alphabetical characters and numbers"):$val;
				$val = (strlen($val) <3 || strlen($val) > 20) ? _invalidMissing_Input("Placement must have atleast 3 to 20 characters long") : $val;
				$pin = (isset($_POST['pin'])) ? $_POST['pin'] : _invalidMissing_Input("Pin is required");
				$model_response = $controller->Verify_Email($pin,$sponsor,$val);
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
			}else if($action === "verify-replacement"){ 
				$sponsor = (!empty($_POST['sponsor'])) ? $_POST['sponsor'] : _invalidMissing_Input("Please enter sponsor.");
				$sponsor = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬-]+$/', $sponsor)) ? _invalidMissing_Input("Sponsor can only consist of alphabetical characters and numbers"):$sponsor;
				$sponsor = (strlen($sponsor) <3 || strlen($sponsor) > 20) ? _invalidMissing_Input("Sponsor must have atleast 3 to 20 characters long") : $sponsor;
				$val = (!empty($_POST['val'])) ? $_POST['val'] : _invalidMissing_Input("Please enter placement.");
				$val = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬-]+$/', $val)) ? _invalidMissing_Input("Placement can only consist of alphabetical characters and numbers"):$val;
				$val = (strlen($val) <3 || strlen($val) > 20) ? _invalidMissing_Input("Placement must have atleast 3 to 20 characters long") : $val;
				$model_response = $controller->User_Verifyplacement($sponsor,$val);
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
			}else if($action === "remove-pin"){
				unset($_SESSION['signup_pin']);
				echo true;
				exit();
			}else{
				$data = array(
		            'status' => 'failed',
		            'message' => "Action not found",
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