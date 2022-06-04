
<?php
    @session_start();
    if (class_exists('Crud')) {
	    $crud = new Crud();
		}else{
			include_once "classes/Crud.php";
			$crud = new Crud();
		}
		if (class_exists('Config')) {
	    $config = new Config();
		}else{
			require_once "classes/Config.php";
			$config = new Config();
		}
    if(isset($_COOKIE[$config->cookie_auth()])){
      $sql = "UPDATE tbl_user_login_details SET token_status='0' WHERE token = '".$_COOKIE[$config->cookie_auth()]."'";
      $crud->execute($sql); 
    }
	
	if(isset($_SESSION[$config->SESS().'_AdSTATUS'])){ 
	  setcookie($config->cookie_auth(), "", time() - 86400, "/", $config->CookieDomainConfig(), 1); 
	  setcookie($config->cookie_user(), "", time() - 86400, "/", $config->CookieDomainConfig(), 1); 
      unset($_COOKIE[$config->cookie_auth()], $_COOKIE[$config->cookie_user()], $_SESSION['user_active']);  
	}else{
	  setcookie($config->cookie_auth(), "", time() - 86400, "/", $config->CookieDomainConfig(), 1); 
	  setcookie($config->cookie_user(), "", time() - 86400, "/", $config->CookieDomainConfig(), 1);
      unset($_COOKIE[$config->cookie_auth()], $_COOKIE[$config->cookie_user()], $_SESSION['user_active']);
      session_destroy();
	}
	echo '<script>location.replace("../login/");</script>';
?>