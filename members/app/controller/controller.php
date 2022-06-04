 <?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
@session_start();
// include_once "../classes/Crud.php";	
require "../model/model.php";
if(!isset($_COOKIE['trans4m_auth'])){
     header("location:../login/");
     exit();
 }
	// //LOAD PAGE
	if(isset($_POST['page'])){
		$page = explode('_', strtolower($_POST['page']))[0];
		if(file_exists("../view/".$page.".php")){
			include "../view/".$page.".php";
		}else{
			include '../view/not_found.php';
		}
  }
	else if(isset($_POST['data1']))
	{
	   	$controller = new Model();
		$action = strtolower($_POST['data1']);
		$data = array();

		if($action === "user_profile"){ 
		    $type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		    $image = (isset($_FILES['data3']['name'])) ? $_FILES['data3']['name'] : 'undefined';
			$tmp = (isset($_FILES['data3']['tmp_name'])) ? $_FILES['data3']['tmp_name'] : 'undefined';
			$avatar = (isset($_POST['data4'])) ? $_POST['data4'] : 'undefined';
			$imgtype = (isset($_POST['data5'])) ? $_POST['data5'] : 'undefined';
            $model_response = $controller->User_Profile($type,$image,$tmp,$avatar,$imgtype);
            if($model_response != false){
		       	$data = array(
					'status' => 'success',
					'message' => 'request accepted',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			else{
				$data = array(
					'status' => 'error',
					'message' => 'Something went wrong, Please try again later 44.',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}
		else if($action === "user_verify"){
			$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
			$val = (isset($_POST['data3'])) ? $_POST['data3'] : false;
			$pin = (isset($_POST['data4'])) ? $_POST['data4'] : false;
			if($type=='verify_email'){
				$val = (!empty($_POST['data3'])) ? $_POST['data3'] : _invalidMissing_Input("Email is required");
              		$val = (!filter_var($val, FILTER_VALIDATE_EMAIL)) ? _invalidMissing_Input("Email is not a valid email address") : $val;
            		$model_response = $controller->User_Verify($type,$val,$pin,$val);
			}else if($type=='verify_mobile'){
				$val = (!empty($_POST['data3'])) ? $_POST['data3'] : _invalidMissing_Input("Mobile number is required");
				$val = (!is_numeric($_POST['data3'])) ? _invalidMissing_Input("Mobile number can contain digits only"):$val;
				$val = (strlen($_POST['data3'])!=10) ? _invalidMissing_Input("Mobile number is not valid"):$val;
            		$model_response = $controller->User_Verify($type,$val,$pin);
              	}else{
              		$model_response = $controller->User_Verify($type,$val,$pin);
              	}
            	if($model_response != false){
		       	$data = array(
					'status' => 'success',
					'message' => 'request accepted',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			else{
				$data = array(
					'status' => 'error',
					'message' => 'Something went wrong, Please try again later 76.',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}else if($action === "user_address"){ 
		    $type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		    $val = (isset($_POST['data3'])) ? $_POST['data3'] : false;
            $model_response = $controller->User_Address($type,$val);
		    $data = array(
				'status' => 'success',
				'message' => 'request accepted',
				'payload' => base64_encode(json_encode($model_response))
			);
			echo json_encode($data);
		}
		else if($action === "dashboard"){ 
		   	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		   	$val = (isset($_POST['data3'])) ? $_POST['data3'] : _invalidMissing_Input("Missing request type");
		    $search = (isset($_POST['data4'])) ? $_POST['data4'] : false;
            	$model_response = $controller->Dashboard($type,$val,$search);
            
           	if($model_response != false){
		       	$data = array(
					'status' => 'success',
					'message' => 'request accepted',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			else{
				$data = array(
					'status' => 'error',
					'message' => 'Something went wrong, Please try again later 108.',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}
		else if($action === "material"){ 
		   	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		   	$id = (isset($_POST['data3'])) ? $_POST['data3'] : _invalidMissing_Input("Missing request type");
            	$model_response = $controller->Material($type,$id);
            
           	if($model_response != false){
		       	$data = array(
					'status' => 'success',
					'message' => 'request accepted',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			else{
				$data = array(
					'status' => 'error',
					'message' => 'Something went wrong, Please try again later 129.',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}

		else if($action === "quiz"){ 
		   	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		   	$id = (isset($_POST['data3'])) ? $_POST['data3'] : _invalidMissing_Input("Missing request type");
		   	$quiz_item = (isset($_POST['data4'])) ? $_POST['data4'] : false;
            	$model_response = $controller->Quiz($type,$id,$quiz_item);
            
           	if($model_response != false){
		       	$data = array(
					'status' => 'success',
					'message' => 'request accepted',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			else{
				$data = array(
					'status' => 'error',
					'message' => 'Something went wrong, Please try again later 152.',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}
		else if($action === "quiz_check"){ 
		   	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		   	$header = (isset($_POST['data3'])) ? $_POST['data3'] : _invalidMissing_Input("Missing request type");
		   	$score = (isset($_POST['data4'])) ? $_POST['data4'] : false;
		   	$data_id = (isset($_POST['data5'])) ? $_POST['data5'] : false;
            	$model_response = $controller->Quiz_Check($type,$header,$score,$data_id);
            
           	if($model_response != false){
		       	$data = array(
					'status' => 'success',
					'message' => 'request accepted',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			else{
				$data = array(
					'status' => 'error',
					'message' => 'Something went wrong, Please try again later 175.',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}
		else if($action === "report"){ 
		   	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
            	$model_response = $controller->Report($type);
           	if($model_response != false){
		       	$data = array(
					'status' => 'success',
					'message' => 'request accepted',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			else{
				$data = array(
					'status' => 'error',
					'message' => 'Something went wrong, Please try again later 194.',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}
		else if($action === "viewresult"){ 
		   	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		   	$val = (isset($_POST['data3'])) ? $_POST['data3'] : '';
            	$model_response = $controller->Viewresult($type,$val);
           	if($model_response != false){
		       	$data = array(
					'status' => 'success',
					'message' => 'request accepted',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			else{
				$data = array(
					'status' => 'error',
					'message' => 'Something went wrong, Please try again later 214.',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}
		else if($action === "viewresult_append"){ 
		   	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		   	$val = (isset($_POST['data3'])) ? $_POST['data3'] : '';
		   	$qi = (isset($_POST['data4'])) ? $_POST['data4'] : '';
            	$model_response = $controller->Viewresult_Append($type,$val,$qi);
           	if($model_response != false){
		       	$data = array(
					'status' => 'success',
					'message' => 'request accepted',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			else{
				$data = array(
					'status' => 'error',
					'message' => 'Something went wrong, Please try again later 235.',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}
		else if($action === "flashcard"){ 
		   	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		   	$val = (isset($_POST['data3'])) ? $_POST['data3'] : '';
            	$model_response = $controller->Flashcard($type,$val);
           	if($model_response != false){
		       	$data = array(
					'status' => 'success',
					'message' => 'request accepted',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			else{
				$data = array(
					'status' => 'error',
					'message' => 'Something went wrong, Please try again later 256.',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}
		else{
			$data = array(
				'status' => 'failed',
				'message' => "Action not found",
				'payload' => ''
	        );
		    echo json_encode($data);
		    exit();
		}
	}else if(isset($_POST['action']))
	{
		$controller = new Model();
		$action = base64_decode($_POST['action']);
		$data = array();
		 if($action === "save_user_profile"){ 
			$type = (isset($_POST['type'])) ? $_POST['type'] : _invalidMissing_Input("Missing request type");
			if($type=="save_personal_info"){
				$fname = (isset($_POST['fname'])) ? $_POST['fname'] : _invalidMissing_Input("First name is required");
				$fname = (strlen($fname) > 20) ? _invalidMissing_Input("First name can contain maximum of 20 characters"):$fname;
				$fname = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $fname)) ? _invalidMissing_Input("First name can only consist of alphabetical characters"):$fname;
				$lname = (isset($_POST['lname'])) ? $_POST['lname'] : _invalidMissing_Input("Last name is required");
				$lname = (strlen($lname) > 20) ? _invalidMissing_Input("Last name can contain maximum of 20 characters"):$lname;
				$lname = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $lname)) ? _invalidMissing_Input("Last name can only consist of alphabetical characters"):$lname;
				$mname = (strlen($_POST['mname']) > 20) ? _invalidMissing_Input("Middle name can contain maximum of 20 characters"):$_POST['mname'];
				$mname = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $mname)) ? _invalidMissing_Input("Middle name can only consist of alphabetical characters"):$mname;
				$model_response = $controller->Save_User_Profile($type,$fname,$lname,$mname,false,false,false,false,false,false,false,false,false,false,false,false,false);
			}else if($type=="save_contact_info"){
				$country = (isset($_POST['country'])) ? $_POST['country'] : 'PH';
				$phonecode = (isset($_POST['phonecode'])) ? $_POST['phonecode'] : '63';
				$mobile='';
				$email='';
				// if(!empty($_POST['new_mobile'])){
				// 	$mobile = (!is_numeric($_POST['new_mobile'])) ? _invalidMissing_Input("Mobile number can contain digits only"):$_POST['new_mobile'];
				// 	$mobile = (strlen($_POST['new_mobile'])!=10) ? _invalidMissing_Input("Mobile number is not valid"):$_POST['new_mobile'];
				// }
				// $email = (isset($_POST['email'])) ? $_POST['email'] : _invalidMissing_Input("Email is required");
    //           		$email = (!filter_var($email, FILTER_VALIDATE_EMAIL)) ? _invalidMissing_Input("Email is not a valid email address") : $email;
				$city = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $_POST['city'])) ? _invalidMissing_Input("City can only consist of alphabetical characters"):$_POST['city'];
				$city = (strlen($city) > 20) ? _invalidMissing_Input("City can contain maximum of 20 characters"):$city;
				$model_response = $controller->Save_User_Profile($type,false,false,false,$city,$country,$phonecode,$mobile,$email,false,false,false,false,false,false,false,false);
			}else if($type=="save_account_info"){
				$bday = (isset($_POST['bday'])) ? $_POST['bday'] : _invalidMissing_Input("Birthday is required");
				$model_response = $controller->Save_User_Profile($type,false,false,false,false,false,false,false,false,$bday,false,false,false,false,false,false,false);
			}else if($type=="save_change_pass"){
				$c_password = (isset($_POST['c_password'])) ? $_POST['c_password'] : _invalidMissing_Input("Current Password is required");
				$n_password = (isset($_POST['n_password'])) ? $_POST['n_password'] : _invalidMissing_Input("Password is required");
				$n_password = (strlen($n_password) < 8 || strlen($n_password) > 20) ? _invalidMissing_Input("Password must atleast 8 characters long") : $n_password;
				$v_password = (isset($_POST['v_password'])) ? $_POST['v_password'] : _invalidMissing_Input("Confirm password is required");
				$v_password = (strlen($v_password) < 8 || strlen($v_password) > 20) ? _invalidMissing_Input("Password must atleast 8 characters long") : $v_password;
				$v_password = (strcasecmp($n_password, $v_password ) != 0) ? _invalidMissing_Input("Password doesn't match!") : $v_password;
				$model_response = $controller->Save_User_Profile($type,false,false,false,false,false,false,false,false,false,$c_password,$n_password,$v_password,false,false,false,false);
			}else if($type=="save_bank_info"){
				$acc_name = (isset($_POST['acc_name'])) ? $_POST['acc_name'] : _invalidMissing_Input("Account name is required");
				$acc_name = (strlen($acc_name) > 45) ? _invalidMissing_Input("Account name can contain maximum of 45 characters"):$acc_name;
				$acc_name = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $acc_name)) ? _invalidMissing_Input("Account name can only consist of alphabetical characters"):$acc_name;
				$acc_number = (isset($_POST['acc_number'])) ? $_POST['acc_number'] : _invalidMissing_Input("Account number is required");
				$acc_number = (!is_numeric($_POST['acc_number'])) ? _invalidMissing_Input("Account number can contain digits only"):$acc_number;
				$acc_number = (strlen($_POST['acc_number'])>17 || strlen($_POST['acc_number'])<4) ? _invalidMissing_Input("Account number is not valid"):$acc_number;
				$mop = (isset($_POST['mop'])) ? $_POST['mop'] : _invalidMissing_Input("Mode of payment is required");
				$acc_mobile = (isset($_POST['acc_mobile'])) ? $_POST['acc_mobile'] : _invalidMissing_Input("Mobile number is required");
				$acc_mobile = (!is_numeric($_POST['acc_mobile'])) ? _invalidMissing_Input("Mobile number can contain digits only"):$acc_mobile;
				$acc_mobile = (strlen($_POST['acc_mobile'])!=11) ? _invalidMissing_Input("Mobile number is not valid"):$acc_mobile;
				$model_response = $controller->Save_User_Profile($type,false,false,false,false,false,false,false,false,false,false,false,false,$acc_name,$acc_number,$mop,$acc_mobile);
			}
          	// if($model_response != false){
		        $data = array(
			        'status' => 'success',
			        'message' => 'request accepted',
			        'payload' => base64_encode(json_encode($model_response))
		        );
			// }else{
			//    	$data = array(
			// 	   	'status' => 'error',
			// 	   	'message' => 'Something went wrong, Please try again later.',
			// 	   	'payload' => base64_encode(json_encode($model_response))
			// 	);
			// }
			echo json_encode($data);
		}
		else{
			$data = array(
				'status' => 'failed',
				'message' => "Action not found",
				'payload' => ''
			);
			echo json_encode($data);
		}
	}
	else{
		$data = array(
			'status' => 'failed',
			'message' => "Request not found",
			'payload' => ''
		);
		echo json_encode($data);
		exit();
	}
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

?>