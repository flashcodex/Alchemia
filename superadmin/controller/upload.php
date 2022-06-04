<?php
@session_start();
require "../model/model.php";
require_once "../classes/Config.php";
$config = new Config();
	if(!isset($_SESSION[$config->SESS().'_AdSTATUS']) || !isset($_SESSION[$config->SESS().'_TYPE']) || $_SESSION[$config->SESS().'_AdSTATUS'] != md5('active')
	      || $_SESSION[$config->SESS().'_TYPE'] != md5('admin')) {
	        header("Location: login");
	}else{
		
      if(isset($_POST['product_id'])){
        if(!empty($_FILES))
        {   
        	$files = $_FILES['files'];
            $controller = new Model();
            $tmp =$files['tmp_name'][0];
            $image = str_replace(array('-',' '),"",$_POST['name']);;
            // $image_dim = getimagesize($_FILES["file"]["tmp_name"]);
            // $image_width = $image_dim[0];
            // $image_height = $image_dim[1];
            // $imageType = $image_dim[2];
            // if($image_width>1020 ||  $image_width<700){
            //     echo json_encode('image_width');
            // }else if($image_height>1020 ||  $image_height<700){
            //     echo json_encode('image_height');
            // }else{
            echo json_encode($controller->Update_Product_Image($_POST['product_id'], $image, $tmp));
			exit();
            // }
        }else{
        	echo json_encode("No image uploaded.");
			exit();
        }
      }else{
         echo json_encode(false);
         exit();
      }
   }



?>