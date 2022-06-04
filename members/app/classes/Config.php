<?php

Class Config {


//LOGOs
	public function login_bg(){
		return $value = "assets/media/bg/bg-3.jpg";
	}
	public function login_logo(){
		return $value = "../../images/logo/logo/logo-icon.png";
	}
	public function icon(){
		return $value = "../../images/logo/logo/logo-icon.png";
	}


//LOGOs
	public function app_logo(){
		return $value = "../../images/logo/logo/logo-icon.png";
	}
	
//COOKIE
	public function cookie_auth(){
		return $value = "trans4m_auth";
	}
	public function cookie_user(){
		return $value = "pamantasanalchemia_user";
	}
	public function CookieDomainConfig(){
	    if ($this->isHttps()) {
	     return "pamantasanalchemia.com";
	    }else{
	     return "localhost";
	    }
	}
	public function SESS(){
		return $value = "pamantasanalchemia";
	}

//DOMAIN
	public function Link(){
	    if ($this->isHttps()) {
	     return "https://pamantasanalchemia.com";
	    }else{
	     return "http://localhost/pamantasanalchemia";
	    }
	}
	public function Link2(){
	    if ($this->isHttps()) {
	     return "pamantasanalchemia.com.ph";
	    }else{
	     return "pamantasanalchemia";
	    }
	}
	public function Domain($type){
	    if($type == "domain"){
        	return $this->Link2()."/members/app/";
	    }else{
	        return $this->Link()."/members/app/";
	    }
	}
	public function get_string_between($string, $start, $end){
	    $string = ' ' . $string;
	    $ini = strpos($string, $start);
	    if ($ini == 0) return '';
	    $ini += strlen($start);
	    $len = strpos($string, $end, $ini) - $ini;
	    return substr($string, $ini, $len);
	}


	private function isHttps(){
	    if (array_key_exists("HTTPS", $_SERVER) && 'on' === $_SERVER["HTTPS"]) {
	        return true;
	    }
	    if (array_key_exists("SERVER_PORT", $_SERVER) && 443 === (int)$_SERVER["SERVER_PORT"]) {
	        return true;
	    }
	    if (array_key_exists("HTTP_X_FORWARDED_SSL", $_SERVER) && 'on' === $_SERVER["HTTP_X_FORWARDED_SSL"]) {
	        return true;
	    }
	    if (array_key_exists("HTTP_X_FORWARDED_PROTO", $_SERVER) && 'https' === $_SERVER["HTTP_X_FORWARDED_PROTO"]) {
	        return true;
	    }
	    return false;
	}
}
?>