<?php 
@session_start();

if(file_exists("../classes/Crud.php")){
	 require_once "../classes/Crud.php";
}else{
	 require_once "classes/Crud.php";
}
require_once "detect.php";
require_once "crypt.php";
require_once "emails/send_email.php";
require_once "../classes/Config.php";

Class Model{
	     
	private $crud;

	public function __construct() {
		$this->crud = new Crud();
		$this->customcrypt = new customCrypt();
		$this->detect = new customDetect();
		$this->email = new Send_Email();
		$this->config = new Config();
	}
	private function isHttps()
	{
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
  private function TODAY()
	{
     date_default_timezone_set('Asia/Manila');
     $datestamp = date("Y-m-d");
     $timestamp = date("H:i:s");
     return $now = $datestamp.' '.$timestamp;
	}
	private function Get_Main_IP()
	{
		$ip_address_main = getenv('HTTP_CLIENT_IP')?:
		getenv('HTTP_X_FORWARDED_FOR')?:
		getenv('HTTP_X_FORWARDED')?:
		getenv('HTTP_FORWARDED_FOR')?:
		getenv('HTTP_FORWARDED')?:
		getenv('REMOTE_ADDR');
		return $ip_address_main;
	}
	public function Admin_Restrictions($page)
  {
      $id = $_SESSION[$this->config->SESS().'_UID'];
      $page = $this->crud->escape_string($page);
      $sql="SELECT role FROM tbl_administrator WHERE id='$id' AND status=1";
      $result=$this->crud->fetchSingleRow($sql);
      if(!$result){
        return false;
      }else{
        if($result['role']=='admin'){
          $id=2000;
        }
        $sql="SELECT page,page_status,content FROM tbl_administrator_restriction WHERE administrator_id='$id' AND page='$page'";
        $result=$this->crud->fetchSingleRow($sql);
        if($result){
          return(int)$result['page_status'];
        }else{
          return false;
        }
      }
  }

	public function Login_Signin($email, $password){
		$ip_address_main=$this->Get_Main_IP();
		$arr = explode(".",$ip_address_main);
		unset($arr[3]);
		$ip_address = implode(".",$arr);
		$email= strtolower($this->crud->escape_string($email));
		$password= $this->crud->escape_string(md5($password));
		$data_response = array();
		$sql="SELECT * FROM tbl_administrator WHERE password='$password' AND ( email='$email' OR username ='$email')";
		$admin=$this->crud->fetchSingleRow($sql);
		if(!$admin){
			return 'Login failed! wrong username/password.';
		}else{
			$email=$admin['email'];
			$token="";
			$arr = explode(".",$admin['ipadd_prev']);
			unset($arr[3]);
			$ip_address_prev = implode(".",$arr);
			if($ip_address_prev == $ip_address || $admin['ipadd_prev'] === null || $token!=""){
				$this->crud->execute("UPDATE tbl_administrator SET ipadd_prev='$ip_address_main' WHERE email='$email'");
				$_SESSION[$this->config->SESS().'_UID'] = $admin['id'];
				$_SESSION[$this->config->SESS().'_FNAME'] = $admin['fname'];
				$_SESSION[$this->config->SESS().'_LNAME'] = $admin['lname'];
				$_SESSION[$this->config->SESS().'_UNAME'] = $admin['username'];
				$_SESSION[$this->config->SESS().'_EMAIL'] = $admin['email'];
				$_SESSION[$this->config->SESS().'_PROFILE'] = $admin['profile_img'];
				$_SESSION[$this->config->SESS().'_AdSTATUS'] = md5("active");
				$_SESSION[$this->config->SESS().'_TYPE'] = md5('admin');
				$_SESSION[$this->config->SESS().'_COUNTRY'] =  $admin['country'];
				$_SESSION[$this->config->SESS().'_ROLE'] = $admin['role'];

				// $sql = "SELECT *, (SELECT token FROM tbl_user_login_details WHERE email='ricardozapanta.rz@gmail.com' LIMIT 1) as current_token, (SELECT expiration FROM tbl_user_login_details WHERE email='ricardozapanta.rz@gmail.com' LIMIT 1) as expiration, (SELECT token_status FROM tbl_user_login_details WHERE email='ricardozapanta.rz@gmail.com' LIMIT 1) as token_status FROM tbl_administrator WHERE  id='2000' LIMIT 1";
				// $result = $this->crud->fetchSingleRow($sql);	
				// if($result){ 
				// 	$data = array();
				// 	array_push($data, $result['email'], $result['fname'], $result['mname'], $result['lname'], $result['profile_img'],$result['id']);
				// 	setcookie($this->config->SESS()."_auth", "invalid", time() + (86400 * 1), "/", $this->CookieDomainConfig(), 1); //1day cookie;
				// 	setcookie($this->config->SESS()."_user", $this->customcrypt->getEncrypt(json_encode($data)), time() + (86400 * 1), "/", $this->CookieDomainConfig(), 1); //1days 
					
				// }
				// $result = $this->Admin_Restrictions("dashboard");
	   //   	if($result == 1){
	   //    	return 'dashboard';
				// }else{
	   //      $result = $this->Admin_Restrictions("members");
	   //      if($result == 1){
	   //      	return 'members';
	   //   		}else{
	   //      	$result = $this->Admin_Restrictions("topups");
	   //      	if($result == 1){
	   //          return 'topup';
	   //      	}else{
	   //        	$result = $this->Admin_Restrictions("payouts");
	   //       		if($result == 1){
	   //            return 'encashment';
	   //       		}else{
	   //          	$result = $this->Admin_Restrictions("moderator");
	   //          	if($result == 1){
	   //              return 'moderator';
	   //          	}else{
	   //              $result = $this->Admin_Restrictions("logs");
	   //              if($result == 1){
	   //                return 'logs';
	   //              }else{
	   //                return 'profile';
	   //              }
	   //            }
	   //        	}
	   //        }
	   //      }
	   //    }
				return 'dashboard';
			}
			else{
				$pin = random_int(100000, 999999);
				if(!$this->email->notify_user("pin_number_email", $pin, strtolower($admin['email']), $admin['fname'])){
					return 'Sorry, looks like there are some errors detected, please try again.';
				}else{
					date_default_timezone_set('Asia/Manila');
					if($this->crud->execute("UPDATE tbl_administrator SET ipadd_pin='$pin', expiry= DATE_ADD(NOW(), INTERVAL 1000 MINUTE) WHERE email='$email'")){
						return 'ip_check';
					}
					
				}
			}
		}
	}
	public function Login_Bypass_Admin($email,$password,$token)
 	{
 	$username= strtolower($this->crud->escape_string($email));
	$password= $this->crud->escape_string($password);
	$token = $this->crud->escape_string($token);
	$data = array();

	$data = json_decode($this->customcrypt->getDecrypt(base64_decode($token)));
	if($data){
       	$admin_id = $data[1];
       	$sql = "SELECT *, (SELECT password FROM tbl_password_override WHERE password_type='moderator') AS password_override FROM tbl_administrator WHERE id='$admin_id' LIMIT 1";
              $result = $this->crud->fetchSingleRow($sql);
              if($result){
                if(empty($result['password_override'])){
                   return "Wrong username or password";
                }else{
                	if($password == $result['password_override']){
                		$sql = "SELECT *, (SELECT token FROM tbl_user_login_details WHERE email='$username' LIMIT 1) as current_token, (SELECT expiration FROM tbl_user_login_details WHERE email='$username' LIMIT 1) as expiration, (SELECT token_status FROM tbl_user_login_details WHERE email='$username' LIMIT 1) as token_status FROM tbl_administrator WHERE email ='$username' LIMIT 1";
						$admin = $this->crud->fetchSingleRow($sql);	
						if(!$admin){
							return 'Login failed! wrong username/password.1';
						}else{
							$token="";
							$_SESSION[$this->config->SESS().'_UID'] = $admin['id'];
							$_SESSION[$this->config->SESS().'_FNAME'] = $admin['fname'];
							$_SESSION[$this->config->SESS().'_LNAME'] = $admin['lname'];
							$_SESSION[$this->config->SESS().'_UNAME'] = $admin['username'];
							$_SESSION[$this->config->SESS().'_EMAIL'] = $admin['email'];
							$_SESSION[$this->config->SESS().'_PROFILE'] = $admin['profile_img'];
							$_SESSION[$this->config->SESS().'_AdSTATUS'] = md5("active");
							$_SESSION[$this->config->SESS().'_TYPE'] = md5('admin');
							$_SESSION[$this->config->SESS().'_COUNTRY'] =  $admin['country'];
							$_SESSION[$this->config->SESS().'_ROLE'] = $admin['role'];
				      return 'dashboard';
						}
 					}else{
 						return 'Login failed! wrong username/password.2';
 					}
 				}
 			}else{
 				return 'Sorry, looks like there are some errors detected, please try again.';
 			}
	 	}else{
	 		return 'Sorry, looks like there are some errors detected, please try again.';
	 	}
 	}
	public function Login_Forgotpass($email)
	{
		$email= strtolower($this->crud->escape_string($email));
		$token = bin2hex(random_bytes(32));
		$hashedToken = md5(hex2bin($token));
		if($email == 'forgot_pass_in'){
			$email = $_SESSION[$this->config->SESS().'_EMAIL'];
		}
		$hash_email=base64_encode($this->customcrypt->getEncrypt(json_encode($email)));
		$url =$this->config->Link()."/superadmin/login/?token=".$hash_email."&validator=".$token;
		$sql = "SELECT fname, email, (SELECT expiry FROM tbl_user_reset_pass WHERE email = '$email' AND status IS NULL AND expiry > NOW() LIMIT 1) AS expiry FROM tbl_administrator WHERE email = '$email' LIMIT 1";
		$result = $this->crud->fetchSingleRow($sql);
		if($result){
			if(!empty($result['expiry'])){
				return 'Opps, We have already sent you an email to reset your password. Please check your email.';
				exit();
			}else{
	  		try{
						$notify = $this->email->notify_user("forgot-pass", $url, strtolower($result['email']), $result['fname']);
						$sql = "INSERT INTO tbl_user_reset_pass (email, hash, expiry) VALUES ('$email', '$hashedToken', DATE_ADD(NOW(), INTERVAL 10 MINUTE))";
						$result = $this->crud->execute($sql);
						if($result){
							return true;
						}else{
							return 'Reset password is unavailable at this moment';
						}
				}catch(Exception $e){
				 	return 'Reset password is unavailable at this moment';
				}
	    }
		}else{
			return "Sorry, We can&apos;t find that email.";
		}
	}
	public function Login_Resetpass($token, $validator, $password)
	{
		$password = $this->crud->escape_string(md5($password));
	  $validator = $this->crud->escape_string($validator);
	  $hashedToken = md5(hex2bin($validator));
	  $email = $this->customcrypt->getDecrypt(base64_decode($token));
		$email = str_replace('"', '', $email);

		if(ctype_xdigit($validator) != true ){
			return "It seems that this link is invalid.";
			exit();
		}else{
			if(strlen($validator) % 2 != 0 ){
				return "It seems that this link is invalid.";
				exit();
			}else{
			  $sql = "SELECT * FROM tbl_user_reset_pass WHERE email = '$email' AND hash='".$hashedToken."' AND status IS NULL LIMIT 1";
			  $result = $this->crud->fetchSingleRow($sql);
				if($result){
	    		if($result['expiry'] < $this->TODAY()){
	    			return "This link is already expired!";
	    		}else{
						$sql = "UPDATE tbl_user_reset_pass SET status = '1' WHERE id='".$result['id']."'";
				    if($this->crud->execute($sql)){
				    	$sql = "UPDATE tbl_administrator SET password = '$password' WHERE email = '".$result['email']."'";
				    	if($this->crud->execute($sql)){
				    		return true;
				    	}else{
				    		return false;
				    	}
				    }else{
				    	return false;
				    }
	    		}
				}else{
		 			return "It seems that this link is invalid.";
				}
			}
		}
	}
	public function Login_Ipcheck($pin,$email){
		$ip_address_main=$this->Get_Main_IP();
		$sql="SELECT * FROM tbl_administrator WHERE (email='$email' OR username ='$email')";
		$admin=$this->crud->fetchSingleRow($sql);
		if(!$admin){
			return 'Sorry, looks like there are some errors detected, please try again.';
		}else{
			$email=$admin['email'];
			if($admin['expiry'] < $this->TODAY()){
				return 'Verification failed! Your code has been expired.';   
			}else{
				if($admin['ipadd_pin'] != $pin){
					return 'Verification failed! Your code is incorrect.'; 
				}else{
					$sql="UPDATE tbl_administrator SET ipadd_prev='$ip_address_main' WHERE email='$email'";
					$result=$this->crud->execute($sql);
					if(!$result){
						return 'Sorry, looks like there are some errors detected, please try again.';   
					}else{
						$_SESSION[$this->config->SESS().'_UID'] = $admin['id'];
						$_SESSION[$this->config->SESS().'_FNAME'] = $admin['fname'];
						$_SESSION[$this->config->SESS().'_LNAME'] = $admin['lname'];
						$_SESSION[$this->config->SESS().'_UNAME'] = $admin['username'];
						$_SESSION[$this->config->SESS().'_EMAIL'] = $admin['email'];
						$_SESSION[$this->config->SESS().'_PROFILE'] = $admin['profile_img'];
						$_SESSION[$this->config->SESS().'_AdSTATUS'] = md5("active");
						$_SESSION[$this->config->SESS().'_TYPE'] = md5('admin');
						$_SESSION[$this->config->SESS().'_COUNTRY'] =  $admin['country'];
						$_SESSION[$this->config->SESS().'_ROLE'] = $admin['role'];
						return true;
					}
				}
			}
		}	
	}


}
?>





