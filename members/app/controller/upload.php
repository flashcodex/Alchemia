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
    
    if(isset($_POST['kyc_id'])){
        if(!empty($_FILES))
        {   
            $files = $_FILES['files'];
            $controller = new Model();
            $tmp =$files['tmp_name'][0];
            $image = str_replace(array('-',' '),"",$_POST['name']);
            echo json_encode($controller->Upload_KYC_Image($_POST['kyc_id'],$_POST['count'], $image, $tmp));
            exit();
        }else{
            echo json_encode("No image uploaded.");
            exit();
        }
      }else{
         echo json_encode(false);
         exit();
      }
?>