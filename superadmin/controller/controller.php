<?php 
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
@session_start();
// include_once "../classes/Crud.php";	
require "../model/model.php";
require_once "../classes/Config.php";
$config = new Config();
	// //LOAD PAGE
if(!isset($_SESSION[$config->SESS().'_AdSTATUS']) || !isset($_SESSION[$config->SESS().'_TYPE']) || $_SESSION[$config->SESS().'_AdSTATUS'] != md5('active')
      || $_SESSION[$config->SESS().'_TYPE'] != md5('admin')) {
        header("Location: login");
}else{
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

		if($action === "profile"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  $image = (isset($_FILES['data3']['name'])) ? $_FILES['data3']['name'] : 'undefined';
			$tmp = (isset($_FILES['data3']['tmp_name'])) ? $_FILES['data3']['tmp_name'] : 'undefined';
			$avatar = (isset($_POST['data4'])) ? $_POST['data4'] : 'undefined';
			$imgtype = (isset($_POST['data5'])) ? $_POST['data5'] : 'undefined';
            $model_response = $controller->profile($type,$image,$tmp,$avatar,$imgtype);
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
		}else if($action === "useraccount"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	
            $model_response = $controller->Useraccount($type);
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
		}else if($action === "admin"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	$id = (isset($_POST['data3'])) ? $_POST['data3'] : false;
            $model_response = $controller->Admin($type,$id);
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
		}else if($action === "learningmaterial"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	$id = (isset($_POST['data3'])) ? $_POST['data3'] : false;
		  	$search = (isset($_POST['data4'])) ? $_POST['data4'] : false;
            $model_response = $controller->Learningmaterial($type,$id,$search);
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
		}else if($action === "profile_admin"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	$image = (isset($_FILES['data3']['name'])) ? $_FILES['data3']['name'] : 'undefined';
				$tmp = (isset($_FILES['data3']['tmp_name'])) ? $_FILES['data3']['tmp_name'] : 'undefined';
		  	$id = (isset($_POST['data4'])) ? $_POST['data4'] : false;
            $model_response = $controller->Profile_Admin($type,$image,$tmp,$id);
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
		}else if($action === "learningmaterial_edit"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	$id = (isset($_POST['data3'])) ? $_POST['data3'] : _invalidMissing_Input("Missing request type");
		  	$page = (isset($_POST['data4'])) ? $_POST['data4'] : false;
        $model_response = $controller->Learningmaterial_Edit($type,$id,$page);
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
		}else if($action === "edit_setting_main"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	$id = (isset($_POST['data3'])) ? $_POST['data3'] : _invalidMissing_Input("Missing request type");
		  	$page = (isset($_POST['data4'])) ? $_POST['data4'] : _invalidMissing_Input("Missing request type");
        $model_response = $controller->Edit_Setting_Main($type,$id,$page);
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
		}else if($action === "save_material_page"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	$id = (isset($_POST['data3'])) ? $_POST['data3'] : false;
		  	$name = (isset($_POST['data4'])) ? $_POST['data4'] : false;
		  	$page = (isset($_POST['data5'])) ? $_POST['data5'] : false;
		  	$color = (isset($_POST['data6'])) ? $_POST['data6'] : '';
        $model_response = $controller->Save_Material_Page($type,$id,$name,$page,$color);
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
		}else if($action === "add_material_details"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	$id = (isset($_POST['data3'])) ? $_POST['data3'] : false;
		  	$data_arrange = (isset($_POST['data4'])) ? $_POST['data4'] : false;
		  	$page = (isset($_POST['data5'])) ? $_POST['data5'] : false;
        $model_response = $controller->Add_Material_Details($type,$id,$data_arrange,$page);
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
		}else if($action === "rearrange_material_details"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	$id = (isset($_POST['data3'])) ? $_POST['data3'] : false;
		  	$data_arrange = (isset($_POST['data4'])) ? $_POST['data4'] : false;
		  	$page = (isset($_POST['data5'])) ? $_POST['data5'] : false;
		  	$data_id = (isset($_POST['data6'])) ? $_POST['data6'] : false;
        $model_response = $controller->Rearrange_Material_Details($type,$id,$data_arrange,$page,$data_id);
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
		}else if($action === "add_new_page"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	$id = (isset($_POST['data3'])) ? $_POST['data3'] : false;
		  	$name = (isset($_POST['data4'])) ? $_POST['data4'] : false;
        $model_response = $controller->Add_New_Page($type,$id,$name);
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
		}else if($action === "all_material_header"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
        $model_response = $controller->All_Material_Header($type);
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
		}else if($action === "all_quiz"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
        $model_response = $controller->All_Quiz($type);
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
		}else if($action === "delete_material"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	$id = (isset($_POST['data3'])) ? $_POST['data3'] : false;
		  	$form = (isset($_POST['data4'])) ? $_POST['data4'] : false;
        $model_response = $controller->Delete_Material($type,$id,$form);
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
		}else if($action === "retrieve_setting"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	$id = (isset($_POST['data3'])) ? $_POST['data3'] : false;
        $model_response = $controller->Retrieve_Setting($type,$id);
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
		}else if($action === "delete_quiz"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	$data_id = (isset($_POST['data3'])) ? $_POST['data3'] : false;
        $model_response = $controller->Delete_Quiz($type,$data_id);
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
		}else if($action === "save_setting"){ 
		  	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
		  	$id = (isset($_POST['data3'])) ? $_POST['data3'] : false;
		  	$header_id = (isset($_POST['data4'])) ? $_POST['data4'] : false;
		  	$quiz_item = (isset($_POST['data5'])) ? $_POST['data5'] : false;
		  	$passing_grade = (isset($_POST['data6'])) ? $_POST['data6'] : false;
        $model_response = $controller->Save_Setting($type,$id,$header_id,$quiz_item,$passing_grade);
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
					'message' => 'Something went wrong, Please try again later.',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}
		else if($action === "dashboard"){ 
		   	$type = (isset($_POST['data2'])) ? $_POST['data2'] : _invalidMissing_Input("Missing request type");
            	$model_response = $controller->Dashboard($type);
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
					'message' => 'Something went wrong, Please try again later.',
					'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}else{
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
		if($action === "learning_material_form"){
			$title_name = (isset($_POST['title_name'])) ? $_POST['title_name'] : _invalidMissing_Input("Missing request type");
			$module = (isset($_POST['module'])) ? $_POST['module'] : _invalidMissing_Input("Missing request type");
			$number = (isset($_POST['number'])) ? $_POST['number'] : _invalidMissing_Input("Missing request type");
			$model_response = $controller->Learning_Material_Form($title_name,$module,$number);
			if($model_response != false){
		        $data = array(
			        'status' => 'success',
			        'message' => 'request accepted',
			        'payload' => base64_encode(json_encode($model_response))
		        );
			}else{
			   	$data = array(
				   	'status' => 'info',
				   	'message' => 'No changes .',
				   	'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);

		}else if($action === "save_user_profile"){ 
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
				$model_response = $controller->Save_User_Profile($type,$fname,$lname,$mname,false,false,false,false,false,false,false,false,false,false,false,false);
			}else if($type=="save_contact_info"){
				$country = (isset($_POST['country'])) ? $_POST['country'] : 'PH';
				$phonecode = (isset($_POST['phonecode'])) ? $_POST['phonecode'] : '63';
				$mobile = (isset($_POST['mobile'])) ? $_POST['mobile'] : _invalidMissing_Input("Mobile number is required");
				$mobile = (!is_numeric($_POST['mobile'])) ? _invalidMissing_Input("Mobile number can contain digits only"):$mobile;
				$mobile = (strlen($_POST['mobile'])>10 || strlen($_POST['mobile'])<6 ) ? _invalidMissing_Input("Mobile number is not valid"):$mobile;
				$city = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $_POST['city'])) ? _invalidMissing_Input("City can only consist of alphabetical characters"):$_POST['city'];
				$city = (strlen($city) > 20) ? _invalidMissing_Input("City can contain maximum of 20 characters"):$city;
				$model_response = $controller->Save_User_Profile($type,false,false,false,$city,$country,$phonecode,$mobile,false,false,false,false,false,false,false,false);
			}else if($type=="save_change_pass"){
				$c_password = (isset($_POST['c_password'])) ? $_POST['c_password'] : _invalidMissing_Input("Current Password is required");
				$n_password = (isset($_POST['n_password'])) ? $_POST['n_password'] : _invalidMissing_Input("Password is required");
				$n_password = (strlen($n_password) < 8 || strlen($n_password) > 20) ? _invalidMissing_Input("Password must atleast 8 characters long") : $n_password;
				$v_password = (isset($_POST['v_password'])) ? $_POST['v_password'] : _invalidMissing_Input("Confirm password is required");
				$v_password = (strlen($v_password) < 8 || strlen($v_password) > 20) ? _invalidMissing_Input("Password must atleast 8 characters long") : $v_password;
				$v_password = (strcasecmp($n_password, $v_password ) != 0) ? _invalidMissing_Input("Password doesn't match!") : $v_password;
				$model_response = $controller->Save_User_Profile($type,false,false,false,false,false,false,false,$c_password,$n_password,$v_password,false,false,false,false);
			}
      if($model_response != false){
		        $data = array(
			        'status' => 'success',
			        'message' => 'request accepted',
			        'payload' => base64_encode(json_encode($model_response))
		        );
			}else{
			   	$data = array(
				   	'status' => 'info',
				   	'message' => 'No changes .',
				   	'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}else if($action === "save_admin_profile"){
			$type = (isset($_POST['type'])) ? $_POST['type'] : _invalidMissing_Input("Missing request type");
			if($type=="save_admin_info"){
				$fname = (isset($_POST['fname'])) ? $_POST['fname'] : _invalidMissing_Input("First name is required");
				$fname = (strlen($fname) > 20) ? _invalidMissing_Input("First name can contain maximum of 20 characters"):$fname;
				$fname = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $fname)) ? _invalidMissing_Input("First name can only consist of alphabetical characters"):$fname;
				$lname = (isset($_POST['lname'])) ? $_POST['lname'] : _invalidMissing_Input("Last name is required");
				$lname = (strlen($lname) > 20) ? _invalidMissing_Input("Last name can contain maximum of 20 characters"):$lname;
				$lname = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $lname)) ? _invalidMissing_Input("Last name can only consist of alphabetical characters"):$lname;
				$mname = (strlen($_POST['mname']) > 20) ? _invalidMissing_Input("Middle name can contain maximum of 20 characters"):$_POST['mname'];
				$mname = (preg_match('/^[\'^£$%&*()}{@#~?<>,|=+¬]+$/', $mname)) ? _invalidMissing_Input("Middle name can only consist of alphabetical characters"):$mname;
				$email = (isset($_POST['email'])) ? $_POST['email'] : 'undefined';
				$country = (isset($_POST['country'])) ? $_POST['country'] : 'PH';
				$phonecode = (isset($_POST['phonecode'])) ? $_POST['phonecode'] : '63';
				$phone = (isset($_POST['phone'])) ? $_POST['phone'] : _invalidMissing_Input("Mobile number is required");
				$phone = (!is_numeric($_POST['phone'])) ? _invalidMissing_Input("Mobile number can contain digits only"):$phone;
				$phone = (strlen($_POST['phone'])>10 || strlen($_POST['phone'])<6 ) ? _invalidMissing_Input("Mobile number is not valid"):$phone;
				$image = (isset($_FILES['profile_avatar']['name'])) ? $_FILES['profile_avatar']['name'] : 'undefined';
				$tmp = (isset($_FILES['profile_avatar']['tmp_name'])) ? $_FILES['profile_avatar']['tmp_name'] : 'undefined';
				$status = (isset($_POST['status'])) ? $_POST['status'] : 0;
				$role = (isset($_POST['role'])) ? $_POST['role'] : 'undefined';
				$username = (isset($_POST['username'])) ? $_POST['username'] : _invalidMissing_Input("First name is required");
				$id = (isset($_POST['id'])) ? $_POST['id'] : '';
				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : '';

				$model_response = $controller->Save_Admin_Info($type,$fname,$lname,$mname,$email,$country,$phonecode,$phone,$image,$tmp,$status,$role,$username,$id,$data_id);
			}
			if($model_response != false){
		        $data = array(
			        'status' => 'success',
			        'message' => 'request accepted',
			        'payload' => base64_encode(json_encode($model_response))
		        );
			}else{
			   	$data = array(
				   	'status' => 'info',
				   	'message' => 'No changes .',
				   	'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}else if($action === "add_img"){
			$type = (isset($_POST['type'])) ? $_POST['type'] : _invalidMissing_Input("Missing request type");
			if($type=="add_img_material"){
				$image = (isset($_FILES['img']['name'])) ? $_FILES['img']['name'] : 'undefined';
				$tmp = (isset($_FILES['img']['tmp_name'])) ? $_FILES['img']['tmp_name'] : 'undefined';

				$model_response = $controller->Add_Img($type,$image,$tmp);
			}
			else if($type=="add_img_quiz"){
				$image = (isset($_FILES['img']['name'])) ? $_FILES['img']['name'] : 'undefined';
				$tmp = (isset($_FILES['img']['tmp_name'])) ? $_FILES['img']['tmp_name'] : 'undefined';

				$model_response = $controller->Add_Img($type,$image,$tmp);
			}
			if($model_response != false){
		        $data = array(
			        'status' => 'success',
			        'message' => 'request accepted',
			        'payload' => base64_encode(json_encode($model_response))
		        );
			}else{
			   	$data = array(
				   	'status' => 'info',
				   	'message' => 'No changes .',
				   	'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}else if($action === "add_quiz"){
			$type = (isset($_POST['type'])) ? $_POST['type'] : _invalidMissing_Input("Missing request type");
			if($type=="add_type"){
				$quiz_type = (isset($_POST['quiz_type'])) ? $_POST['quiz_type'] : false;
				$material_id = (isset($_POST['material_id'])) ? $_POST['material_id'] : false;
				$material_page = (isset($_POST['material_page'])) ? $_POST['material_page'] : false;
				$model_response = $controller->Add_Type_Quiz($type,$quiz_type,$material_id,$material_page);
			}
			if($model_response != false){
		        $data = array(
			        'status' => 'success',
			        'message' => 'request accepted',
			        'payload' => base64_encode(json_encode($model_response))
		        );
			}else{
			   	$data = array(
				   	'status' => 'info',
				   	'message' => 'No changes .',
				   	'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}else if($action === "update_quiz"){
			$type = (isset($_POST['type'])) ? $_POST['type'] : _invalidMissing_Input("Missing request type");
			if($type=="tof"){
				$ans = (isset($_POST['ans'])) ? $_POST['ans'] : false;
				$question = (isset($_POST['question'])) ? $_POST['question'] : false;
				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : false;
				$class_type = (isset($_POST['class_type'])) ? $_POST['class_type'] : false;
				$material_page = (isset($_POST['material_page'])) ? $_POST['material_page'] : false;
				$model_response = $controller->Update_Quiz($type,$ans,$question,$data_id,$class_type,false,$material_page);
			}
			if($type=="idnf"){
				$ans = (isset($_POST['ans'])) ? $_POST['ans'] : false;
				$question = (isset($_POST['question'])) ? $_POST['question'] : false;
				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : false;
				$class_type = (isset($_POST['class_type'])) ? $_POST['class_type'] : false;
				$material_page = (isset($_POST['material_page'])) ? $_POST['material_page'] : false;
				$model_response = $controller->Update_Quiz($type,$ans,$question,$data_id,$class_type,false,$material_page);
			}
			if($type=="mc"){
				$ans = (isset($_POST['ans'])) ? $_POST['ans'] : false;
				$question = (isset($_POST['question'])) ? $_POST['question'] : false;
				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : false;
				$class_type = (isset($_POST['class_type'])) ? $_POST['class_type'] : false;
				$choices = (isset($_POST['choices'])) ? $_POST['choices'] : false;
				$material_page = (isset($_POST['material_page'])) ? $_POST['material_page'] : false;
				$model_response = $controller->Update_Quiz($type,$ans,$question,$data_id,$class_type,$choices,$material_page);
			}
			if($type=="mci"){
				$ans = (isset($_POST['ans'])) ? $_POST['ans'] : false;
				$question = (isset($_POST['question'])) ? $_POST['question'] : false;
				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : false;
				$class_type = (isset($_POST['class_type'])) ? $_POST['class_type'] : false;
				$choices = (isset($_POST['choices'])) ? $_POST['choices'] : false;
				$material_page = (isset($_POST['material_page'])) ? $_POST['material_page'] : false;
				$model_response = $controller->Update_Quiz($type,$ans,$question,$data_id,$class_type,$choices,$material_page);
			}
			if($model_response != false){
		        $data = array(
			        'status' => 'success',
			        'message' => 'request accepted',
			        'payload' => base64_encode(json_encode($model_response))
		        );
			}else{
			   	$data = array(
				   	'status' => 'info',
				   	'message' => 'No changes .',
				   	'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}else if($action === "update_material"){
			$type = (isset($_POST['type'])) ? $_POST['type'] : _invalidMissing_Input("Missing request type");
			if($type=="heading"){

				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : '';
				$content = (isset($_POST['content'])) ? $_POST['content'] : '';
				$size = (isset($_POST['size'])) ? $_POST['size'] : '';
				$indent = (isset($_POST['indent'])) ? $_POST['indent'] : '';

				$model_response = $controller->Update_Heading($type,$data_id,$content,$size,$indent);
			}else if($type=="spacer"){

				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : '';
				$content = (isset($_POST['content'])) ? $_POST['content'] : '';
				$size = (isset($_POST['size'])) ? $_POST['size'] : '';
				$indent = (isset($_POST['indent'])) ? $_POST['indent'] : '';

				$model_response = $controller->Update_Heading($type,$data_id,false,$size,false);
			}
			else if($type=="phrase"){

				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : 'false';
				$content = (isset($_POST['code'])) ? $_POST['code'] : '';
				$size = (isset($_POST['size'])) ? $_POST['size'] : '';
				$indent = (isset($_POST['indent'])) ? $_POST['indent'] : '';

				$model_response = $controller->Update_Heading($type,$data_id,$content,false,$indent);
			}
			else if($type=="audio"){

				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : 'false';
				$content = (isset($_POST['code'])) ? $_POST['code'] : '';
				$size = (isset($_POST['size'])) ? $_POST['size'] : '';
				$indent = (isset($_POST['indent'])) ? $_POST['indent'] : '';

				$model_response = $controller->Update_Heading($type,$data_id,$content,false,$indent);
			}
			else if($type=="image"){

				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : 'false';
				$content = (isset($_POST['content'])) ? $_POST['content'] : '';
				$size = (isset($_POST['size'])) ? $_POST['size'] : '';
				$indent = (isset($_POST['indent'])) ? $_POST['indent'] : '';

				$model_response = $controller->Update_Heading($type,$data_id,$content,false,false);
			}
			else if($type=="video"){

				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : 'false';
				$content = (isset($_POST['content'])) ? $_POST['content'] : '';
				$size = (isset($_POST['size'])) ? $_POST['size'] : '';
				$indent = (isset($_POST['indent'])) ? $_POST['indent'] : '';

				$model_response = $controller->Update_Heading($type,$data_id,$content,false,false);
			}
			else if($type=="audio"){

				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : 'false';
				$content = (isset($_POST['content'])) ? $_POST['content'] : '';
				$size = (isset($_POST['size'])) ? $_POST['size'] : '';
				$indent = (isset($_POST['indent'])) ? $_POST['indent'] : '';

				$model_response = $controller->Update_Heading($type,$data_id,$content,false,false);
			}
			else if($type=="identify"){

				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : 'false';
				$content = (isset($_POST['content'])) ? $_POST['content'] : '';
				$size = (isset($_POST['size'])) ? $_POST['size'] : '';
				$ans = (isset($_POST['ans'])) ? $_POST['ans'] : '';

				$model_response = $controller->Update_Heading($type,$data_id,$content,false,$ans);
			}
			else if($type=="tof"){

				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : 'false';
				$content = (isset($_POST['content'])) ? $_POST['content'] : '';
				$size = (isset($_POST['size'])) ? $_POST['size'] : '';
				$ans = (isset($_POST['ans'])) ? $_POST['ans'] : '';

				$model_response = $controller->Update_Heading($type,$data_id,$content,false,$ans);
			}
			else if($type=="mc"){

				$data_id = (isset($_POST['data_id'])) ? $_POST['data_id'] : 'false';
				$content = (isset($_POST['content'])) ? $_POST['content'] : '';
				$size = (isset($_POST['size'])) ? $_POST['size'] : '';
				$ans = (isset($_POST['ans'])) ? $_POST['ans'] : '';

				$model_response = $controller->Update_Heading($type,$data_id,$content,$size,$ans);
			}
			if($model_response != false){
		        $data = array(
			        'status' => 'success',
			        'message' => 'request accepted',
			        'payload' => base64_encode(json_encode($model_response))
		        );
			}else{
			   	$data = array(
				   	'status' => 'info',
				   	'message' => 'No changes .',
				   	'payload' => base64_encode(json_encode($model_response))
				);
			}
			echo json_encode($data);
		}else{
			$data = array(
				'status' => 'failed',
				'message' => "Action not found",
				'payload' => ''
			);
			echo json_encode($data);
		}

	}else if(isset($_POST['search']))
	{
		require "../model/search.php";
		$controller = new Search();
		$search = $_POST['search'];
		if($search==='search_product'){
			$query = $_POST['query'];
	    $data = $controller->Search_Product($query);
		 	echo json_encode($data);
		}else{
			echo json_encode('awit');
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
}
function _invalidMissing_Input($message){
	 $data = array(
        'status' => 'failed',
        'message' => $message,
        'payload' => ''
     );
     //return the invalid message
     echo json_encode($data);
     //terminate process when input is invalid
     exit();
}

?>
