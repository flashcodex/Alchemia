<?php
	@session_start();
	$config = new Config();
		session_destroy();
		// setcookie("tba_auth", "", time() - 86400, "/", "ride2success.ph", 1); 
	    // setcookie("tba_user", "", time() - 86400, "/", "ride2success.ph", 1); 
	    setcookie($config->SESS()."_auth", "", time() - 86400, "/"); 
	    setcookie($config->SESS()."_user", "", time() - 86400, "/"); 
        unset($_COOKIE[$config->SESS().'_auth'], $_COOKIE[$config->SESS().'_user']); 
	
	// echo '<script>localStorage.removeItem("instructors");location.replace("login");</script>';
        echo '<script>location.replace("login");</script>';
?>	
