 <?php 
  @session_start();
 ini_set('display_errors', 1);
 ini_set('display_startup_errors', 1);
 error_reporting(E_ALL);

   	$data = array();
	if(isset($_POST['action'])){
		require "../login-model/model.php";
	   	$controller = new Model();
		$action = base64_decode($_POST['action']);
		if($action === "sign-in"){ 
			$email = (isset($_POST['email'])) ? $_POST['email'] : _invalidMissing_Input("Email/Username is required");
			$password = (isset($_POST['password'])) ? $_POST['password'] : _invalidMissing_Input("Password is required");
			if(isset($_POST['admin_token'])){
		    	$token = (isset($_POST['admin_token'])) ? $_POST['admin_token'] : _invalidMissing_Input("Token is required");
		     	$model_response = $controller->Login_Bypass_Admin($email,$password,$token);
		    }else{
            	$model_response = $controller->Login_Signin($email,$password);
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
	   }else if($action === "forgot-pass"){
         	$email = (isset($_POST['email'])) ? $_POST['email'] : _invalidMissing_Input("Email is required");
	        $model_response = $controller->Login_Forgotpass($email);
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
			$model_response = $controller->Login_Resetpass($token, $validator, $cpassword);
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
			$email = (isset($_POST['email'])) ? $_POST['email'] : _invalidMissing_Input("Email is required");
			$model_response = $controller->Login_Ipcheck($pin,$email);
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
			   'message' => "Action not found",
			   'payload' => ''
		   );
			echo json_encode($data);
			exit();
		}
	}else{
		$data = array(
			'status' => 'failed',
			'message' => "Request not found",
			'payload' => ''
	   );
		echo json_encode($data);
		exit();
	}

function _invalidMissing_Input($message){
	 $data = array(
        'status' => 'failed',
        'message' => $message,
        'payload' => ''
     );
     echo json_encode($data);
     exit();
}
?>