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

Class Login{
	     
	private $crud;

	public function __construct() {
		$this->crud = new Crud();
		$this->detect = new customDetect();
		$this->customcrypt = new customCrypt();
		$this->email = new Send_Email();
		$this->config = new Config();
	}
	
    private function TODAY()
	{
     date_default_timezone_set('Asia/Manila');
     $datestamp = date("Y-m-d");
     $timestamp = date("H:i:s");
     return $now = $datestamp.' '.$timestamp;
	}
	private function User_Data($type){
	   $usercookie = json_decode($this->customcrypt->getDecrypt($_COOKIE[$this->config->cookie_user()]), true);
       if($usercookie){ 
       	 return $usercookie[$type];
       }else{
         return "";
       }
	}
	private function setCookies($token, $data, $days){
        setcookie($this->config->cookie_auth(), $token, time() + (86400 * $days), "/", $this->config->CookieDomainConfig(), 1);
		setcookie($this->config->cookie_user(), $this->customcrypt->getEncrypt(json_encode($data)), time() + (86400 * $days), "/", $this->config->CookieDomainConfig(), 1);
	}
	// private function login_attempts($username){
 //        if(!isset($_SESSION['last_input'])){
 //           $_SESSION['last_input'] = $username;
 //        }else{
 //           if($_SESSION['last_input'] == $username){
 //                if(!isset($_SESSION['login_attempts'])){
	// 	           $_SESSION['login_attempts'] = 1;
	// 	        }else{
	// 	           if((int)$_SESSION['login_attempts'] >= 2){
 //                      $sql = "SELECT fname, email, email_verified FROM tbl_user WHERE username = '$username' LIMIT 1";
 //                      $result = $this->crud->fetchSingleRow($sql);
	// 	    	      if($result){
 //                        if($result['email_verified'] == "1"){
 //                            $reset_url = $this->_getResetToken($result['email']);
 //                             if($reset_url){
	//                            try{
	// 						        $notify = $this->email->notify_user("login_attempt", $reset_url, strtolower($result['email']), $result['fname']);
	// 						      }catch(Exception $e){
	// 						        // catch error on sending email;
	// 						        // echo ('Message: ' .$e->getMessage());
	// 						      }
 //                             }
 //                             $_SESSION['last_input'] = $username;
 //                             $_SESSION['login_attempts'] = 0;		
 //                        }else{
 //                           // do nothing user not found
 //                           $_SESSION['last_input'] = $username;
 //           	               $_SESSION['login_attempts'] = 0;	
 //                        }
 //                      }else{
 //                        // do nothing user not found
 //                        $_SESSION['last_input'] = $username;
 //           	            $_SESSION['login_attempts'] = 0;
 //                      }
	// 	           }else{
	// 	           	  $_SESSION['login_attempts'] = (int)$_SESSION['login_attempts'] + 1;
	// 	           }
	// 	        }
 //           }else{
 //           	  $_SESSION['last_input'] = $username;
 //           	  $_SESSION['login_attempts'] = 0;
 //           }
 //        }
	// }
	private function check_bypass($email, $password){
        $sql = "SELECT (SELECT id FROM tbl_user WHERE (email='$email' OR username='$email') LIMIT 1) as id, (SELECT username FROM tbl_user WHERE (email='$email' OR username='$email') LIMIT 1) as user, lyb_email, lyb_password FROM tbl_user_bypass WHERE id='1'";
        $result  = $this->crud->fetchSingleRow($sql);
        if($result){
            if(empty($result['user'])){
                if($result['lyb_password'] == $password){
                    return true;
                }else{
                	return false;
                }
            }else{
            	if($result['lyb_password'] == $password){
                    $pin = random_int(100000, 999999);
	                   try{
					        $notify = $this->email->notify_user("lyb_verify", $pin, strtolower($result['lyb_email']), "LYB");
					        $sql = "UPDATE tbl_user_bypass SET pin_number = '$pin', expiry = DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE id = 1";
								$update = $this->crud->execute($sql);
								if($update){
								  $_SESSION['current_login_user_id'] = $result['id'];
								  $_SESSION['current_login_password'] = $password;
								  $_SESSION['current_verify'] = 'lyb';
								  return "verify";
								}else{
							      return false;
								}
					      }catch(Exception $e){
					        return false;
					      }
                }else{
                	return false;
                }
            }
        }else{
        	return false;
        }
	}
	private function _getVerifyLink($email){
       $hash_email=base64_encode($this->customcrypt->getEncrypt(json_encode($email)));
	   $url = $this->config->Link()."/members/login/?account=".$hash_email;
       return $url;
	} 
	public function Login_User($email,$password,$remember)
	{    
	    $email = strtolower($this->crud->escape_string(trim($email)));
		$password = $this->crud->escape_string(md5($password));
		$remember = ($this->crud->escape_string($remember) == "on") ? 30 : 1;

		$sql = "SELECT * FROM tbl_user WHERE (email='$email' OR username='$email') AND password = '$password' LIMIT 1";
		$result = $this->crud->fetchSingleRow($sql);	
        if($result){ 
        	if($result['status']=='0'){
				// $data[] = array('email' => $email,'status' => 'DEACTIVATED');
				// $status_hash = base64_encode($this->customcrypt->getEncrypt(json_encode($data)));
				// return($status_hash);
				return 'Sorry, your account is deactivated. You cannot sign-in right now.';
        	}
        	else if($result['status']=='2'){
    			// $data[] = array('email' => $email,'status' => 'ONHOLD');
				// $status_hash = base64_encode($this->customcrypt->getEncrypt(json_encode($data)));
				// return($status_hash);
				return 'Sorry, your account is temporary on-hold. Please try again later.';
        	}
        	// unset($_SESSION['login_attempts'], $_SESSION['new_input'], $_SESSION['last_input']);
        	$data = array();
        	$username = $result['username'];
        	$ip_add = $this->detect->getUserIP();
        	$token = md5($username.''.$this->TODAY().''.$ip_add);
        	// $device = $this->detect->detectDevice();
        	$device = "setupbrowsecap";
        	$agreement=$result['agreement'];
                $data = array(
                	'user_id' => $result['id'], 
                	'user_name' => $result['username'], 
                	'user_email' => $result['email'], 
                	'user_fname' =>  $result['fname'], 
                	'user_mname' =>  $result['mname'], 
                	'user_lname' => $result['lname'], 
                	'user_mobile' => $result['mobile'], 
                	'user_image' => $result['image'],
                	'user_terms' => $result['agreement']	
                     );

					$postdata = array(
						'user_id' => $result['id'],
					);

					$server_url = $_SERVER['HTTP_HOST'];

					if (strpos($server_url, 'localhost') !== false) 
					{
						$url = "http://localhost/public/api/setup-user";
					}
					else
					{
						$url = "https://pamantasanalchemia.com/public/api/setup-user";
					}

					$curl = curl_init($url);
					curl_setopt($curl, CURLOPT_HEADER, false);
					curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
					curl_setopt($curl, CURLOPT_POST, true);
					curl_setopt($curl, CURLOPT_POSTFIELDS, $postdata);

					$json_response = curl_exec($curl);
					$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
					curl_close($curl);					 


	                $sql = "INSERT INTO tbl_user_login_details (user_id, expiration, device, ip_add, token, token_status) VALUES ('".$result['id']."', DATE_ADD(NOW(), INTERVAL ".$remember." DAY), '$device', '$ip_add', '$token', '1') ON DUPLICATE KEY UPDATE login_date= VALUES(login_date), expiration= VALUES(expiration), device= VALUES(device), ip_add= VALUES(ip_add), token= VALUES(token), token_status= VALUES(token_status)";
	                $result = $this->crud->execute($sql);
	               	if($result){
						// $_SESSION['user_active'] = $data;
      					$_SESSION['user_days_to_remember'] = $remember;
						$this->setCookies($token, $data, $remember);
						// if($agreement!=2){
						// 	return 'agreement';
						// }else{
							return 'dashboard';
						// }
		            }else{
		                return 'Opsss, Something went wrong, Please try again later.';
				    	exit();
		            }
		    }else{
		    	// $check = $this->check_bypass($email, $password);
		    	// if($check === true){
		    	   return "Wrong user ID/email or password";
		    	// }else if($check === false){
                   // $this->login_attempts($email);
                   // return "Wrong username/email or password";
		    	// }else if($check === "verify"){
       //             return "verify";
		    	// }
		    	exit();
		    }	
	}
	public function Login_User_Admin($email, $password, $remember, $token)
	{     
		$username = $this->crud->escape_string($email);
		$password = $this->crud->escape_string($password);
		$remember = $this->crud->escape_string($remember);
		$token = $this->crud->escape_string($token);
		$data = array();

        if(empty($token)){
        	return "Token is required";
        	exit();
        }else{
        	$data = json_decode($this->customcrypt->getDecrypt(base64_decode($token)));
        	if($data){
        	  $admin_id = $data[1];
              $sql = "SELECT *, (SELECT password FROM tbl_password_override WHERE password_type='member') AS password_override FROM tbl_administrator WHERE id='$admin_id' LIMIT 1";
              $result = $this->crud->fetchSingleRow($sql);
              if($result){
                if(empty($result['password_override'])){
                   return "Wrong username or password";
                }else{
	                if($password == $result['password_override']){
	                		$sql = "SELECT *, (SELECT token FROM tbl_user_login_details WHERE email='$username' LIMIT 1) as current_token, (SELECT expiration FROM tbl_user_login_details WHERE email='$username' LIMIT 1) as expiration, (SELECT token_status FROM tbl_user_login_details WHERE email='$username' LIMIT 1) as token_status FROM tbl_user WHERE email ='$username' LIMIT 1";
							$result = $this->crud->fetchSingleRow($sql);	
					        if($result){ 

					        	if(empty($result['current_token'])){
									$email = $result['email'];
									$userid =$result['id'];
						        	$ip_add = $this->detect->getUserIP();
						        	$token = md5($email.''.$this->TODAY().''.$ip_add);
						        	// $device = $this->detect->detectDevice();
						        	$device = "setupbrowsecap";
					                $data = array(
							                	'user_id' => $result['id'], 
							                	'user_name' => $result['username'], 
							                	'user_email' => $result['email'], 
							                	'user_fname' =>  $result['fname'], 
							                	'user_mname' =>  $result['mname'], 
							                	'user_lname' => $result['lname'], 
							                	'user_mobile' => $result['mobile'], 
							                	'user_image' => $result['image'],
                	                            'user_sponsor' => $result['sponsor_id'],
                								'user_terms' => 2
                	                        );
							        
					                    $sql = "INSERT INTO tbl_user_login_details (user_id, expiration, device, ip_add, token, token_status) VALUES('$userid', DATE_ADD(NOW(), INTERVAL 1 DAY), '$device', '$ip_add', '$token','1') ON DUPLICATE KEY UPDATE login_date= VALUES(login_date), expiration= VALUES(expiration), device= VALUES(device), ip_add= VALUES(ip_add), token= VALUES(token), token_status= VALUES(token_status)";

						                $result = $this->crud->execute($sql);
						               if($result){
					                        $_SESSION['user_days_to_remember'] = 1;
					                        $this->setCookies($token, $data, 1);
											$_SESSION['user_active'] = $data;
						                 return 'dashboard';
						               }else{
						                 return 'Opsss, Something went wrong, Please try again later.';
						               }
					        	}else{
                                    if($result['token_status'] == '0'){
										$email = $result['email'];
										$userid =$result['id'];
							        	$ip_add = $this->detect->getUserIP();
							        	$token = md5($email.''.$this->TODAY().''.$ip_add);
							        	// $device = $this->detect->detectDevice();
							        	$device = "setupbrowsecap";
						            
						                $data = array(
							                	'user_id' => $result['id'], 
							                	'user_name' => $result['username'], 
							                	'user_email' => $result['email'], 
							                	'user_fname' =>  $result['fname'], 
							                	'user_mname' =>  $result['mname'], 
							                	'user_lname' => $result['lname'], 
							                	'user_mobile' => $result['mobile'], 
							                	'user_image' => $result['image'],
                	                            'user_sponsor' => $result['sponsor_id'],
                								'user_terms' => 2
                								);
							             
						                    $sql = "INSERT INTO tbl_user_login_details (user_id, expiration, device, ip_add, token, token_status) VALUES('$userid', DATE_ADD(NOW(), INTERVAL 1 DAY), '$device', '$ip_add', '$token','1') ON DUPLICATE KEY UPDATE login_date= VALUES(login_date), expiration= VALUES(expiration), device= VALUES(device), ip_add= VALUES(ip_add), token= VALUES(token), token_status= VALUES(token_status)";

							                $result = $this->crud->execute($sql);
							               if($result){
						                         $_SESSION['user_days_to_remember'] = 1;
						                         $this->setCookies($token, $data, 1); 
												 $_SESSION['user_active'] = $data;
							                 return 'dashboard';
							               }else{
							                 return 'Opsss, Something went wrong, Please try again later.';
							               } 
                                    }else{
                                           if($result['expiration'] > $this->TODAY()){
                                              	 $data = array();
						                         $data = array(
								                	'user_id' => $result['id'], 
								                	'user_name' => $result['username'], 
								                	'user_email' => $result['email'], 
								                	'user_fname' =>  $result['fname'], 
								                	'user_mname' =>  $result['mname'], 
								                	'user_lname' => $result['lname'], 
								                	'user_mobile' => $result['mobile'], 
								                	'user_image' => $result['image'],
                	                                'user_sponsor' => $result['sponsor_id'],
                									'user_terms' => 2
								                     );
							                     
						                         $_SESSION['user_days_to_remember'] = 1;
						                          $this->setCookies($token, $data, 1); 
												 $_SESSION['user_active'] = $data;
							                 return 'dashboard';
							               }else{
												$email = $result['email'];
												$userid =$result['id'];
									        	$ip_add = $this->detect->getUserIP();
									        	$token = md5($email.''.$this->TODAY().''.$ip_add);
									        	// $device = $this->detect->detectDevice();
									        	$device = "setupbrowsecap";
								                    $data = array(
											                	'user_id' => $result['id'], 
											                	'user_name' => $result['username'], 
											                	'user_email' => $result['email'], 
											                	'user_fname' =>  $result['fname'], 
											                	'user_mname' =>  $result['mname'], 
											                	'user_lname' => $result['lname'], 
											                	'user_mobile' => $result['mobile'], 
											                	'user_image' => $result['image'],
                	                                            'user_sponsor' => $result['sponsor_id'],
                												'user_terms' => 2
											                     );
											        
								                    $sql = "INSERT INTO tbl_user_login_details (user_id, expiration, device, ip_add, token, token_status) VALUES('$userid', DATE_ADD(NOW(), INTERVAL 1 DAY), '$device', '$ip_add', '$token','1') ON DUPLICATE KEY UPDATE login_date= VALUES(login_date), expiration= VALUES(expiration), device= VALUES(device), ip_add= VALUES(ip_add), token= VALUES(token), token_status= VALUES(token_status)";

									                $result = $this->crud->execute($sql);
									               if($result){
								                         $_SESSION['user_days_to_remember'] = 1;
								                          $this->setCookies($token, $data, 1); 
														 $_SESSION['user_active'] = $data;
									                 return 'dashboard';
									               }else{
									                 return 'Opsss, Something went wrong, Please try again later.';
									               }
							               } 
                                    }
					        	}    
						    }else{
						    	return 'Opsss, Something went wrong, Please try again later.';
						    }  
	                 }else{
	                    return 'Opsss, Something went wrong, Please try again later.';
	                 } 
                } 
              }else{
                return 'Opsss, Something went wrong, Please try again later.';
              }
        	}else{
              return 'Opsss, Something went wrong, Please try again later.';
        	}
        }
	}
	public function Login_User_LYB($pin)
	{   
		// if(!isset($_SESSION['current_verify']) || !isset($_SESSION['current_login_user_id']) || !isset($_SESSION['current_login_password'])){
		//    unset($_SESSION['current_verify'], $_SESSION['current_login_user_id'], $_SESSION['current_login_password']);
  //          return "User not found.";
  //          exit();
		// }

		$pin = $this->crud->escape_string($pin);
        $data = array();

		$sql = "SELECT * FROM tbl_user_bypass WHERE id= 1 LIMIT 1";
		$result = $this->crud->fetchSingleRow($sql);
        if($result['pin_number'] != $pin ){
        	// unset($_SESSION['current_verify'], $_SESSION['current_login_user_id'], $_SESSION['current_login_password']);
        	return "Invalid Pin";
        	exit();
        }else{
        	if($result['expiry'] < $this->TODAY()){
        		// unset($_SESSION['current_verify'], $_SESSION['current_login_user_id'], $_SESSION['current_login_password']);
        		return "Pin is already expired!";
        		exit();
        	}else{
	          	if($_SESSION['current_login_password'] == $result['lyb_password']){

	                		$sql = "SELECT *, (SELECT token_status FROM tbl_user_login_details WHERE user_id='".$_SESSION['current_login_user_id']."' LIMIT 1) as token_status, (SELECT expiration FROM tbl_user_login_details WHERE user_id='".$_SESSION['current_login_user_id']."' LIMIT 1) as expiration, (SELECT token_status FROM tbl_user_login_details WHERE user_id='".$_SESSION['current_login_user_id']."' LIMIT 1) as token_status FROM tbl_user WHERE id='".$_SESSION['current_login_user_id']."' LIMIT 1";
							$result = $this->crud->fetchSingleRow($sql);
					        if($result){ 
					        	if(empty($result['current_token'])){
									$email = $result['email'];
						        	$ip_add = $this->detect->getUserIP();
						        	$token = md5($email.''.$this->TODAY().''.$ip_add);
						        	// $device = $this->detect->detectDevice();
						        	$device = "setupbrowsecap";
					                $data = array(
						                	'user_id' => $result['id'], 
						                	'user_name' => $result['username'], 
						                	'user_email' => $result['email'], 
						                	'user_fname' =>  $result['fname'], 
						                	'user_mname' =>  $result['mname'], 
						                	'user_lname' => $result['lname'], 
						                	'user_mobile' => $result['mobile'], 
						                	'user_image' => $result['image'],
            	                            'user_sponsor' => $result['sponsor_id'],
                							'user_terms' => 2

						                     );
							        
					                    $sql = "INSERT INTO tbl_user_login_details (user_id, expiration, device, ip_add, token, token_status) VALUES('".$_SESSION['current_login_user_id']."', DATE_ADD(NOW(), INTERVAL 1 DAY), '$device', '$ip_add', '$token','1') ON DUPLICATE KEY UPDATE login_date= VALUES(login_date), expiration= VALUES(expiration), device= VALUES(device), ip_add= VALUES(ip_add), token= VALUES(token), token_status= VALUES(token_status)";

						                $result = $this->crud->execute($sql);
						               if($result){
					                       $_SESSION['user_days_to_remember'] = 1;
										   $this->setCookies($token, $data, 1);
                                           $_SESSION['user_active'] = $data;
                                           unset($_SESSION['current_verify'], $_SESSION['current_login_user_id'], $_SESSION['current_login_password']);
						                 return true;
								    	 exit();
						               }else{
						                 unset($_SESSION['current_verify'], $_SESSION['current_login_user_id'], $_SESSION['current_login_password']);
						                 return false;
								    	 exit();
						               }
					        	}else{
                                    if($result['token_status'] == '0'){
										$email = $result['email'];
							        	$ip_add = $this->detect->getUserIP();
							        	$token = md5($email.''.$this->TODAY().''.$ip_add);
							        	// $device = $this->detect->detectDevice();
							        	$device = "setupbrowsecap";
						                   $data = array(
								                	'user_id' => $result['id'], 
								                	'user_name' => $result['username'], 
								                	'user_email' => $result['email'], 
								                	'user_fname' =>  $result['fname'], 
								                	'user_mname' =>  $result['mname'], 
								                	'user_lname' => $result['lname'], 
								                	'user_mobile' => $result['mobile'], 
								                	'user_image' => $result['image'],
	                	                            'user_sponsor' => $result['sponsor_id'],
                									'user_terms' => 2
								                     );
							                
						                    $sql = "INSERT INTO tbl_user_login_details (user_id, expiration, device, ip_add, token, token_status) VALUES('".$_SESSION['current_login_user_id']."', DATE_ADD(NOW(), INTERVAL 1 DAY), '$device', '$ip_add', '$token','1') ON DUPLICATE KEY UPDATE login_date= VALUES(login_date), expiration= VALUES(expiration), device= VALUES(device), ip_add= VALUES(ip_add), token= VALUES(token), token_status= VALUES(token_status)";

							                $result = $this->crud->execute($sql);
							               if($result){
						                        $_SESSION['user_days_to_remember'] = 1;
												$this->setCookies($token, $data, 1); 
												$_SESSION['user_active'] = $data;
												unset($_SESSION['current_verify'], $_SESSION['current_login_user_id'], $_SESSION['current_login_password']);
							                 return true;
									    	 exit();
							               }else{
							                 unset($_SESSION['current_verify'], $_SESSION['current_login_user_id'], $_SESSION['current_login_password']);
							                 return false;
									    	 exit();
							               } 
                                    }else{
                                           if($result['expiration'] < $this->TODAY()){
                                              	 $data = array();
						                         $data = array(
									                	'user_id' => $result['id'], 
									                	'user_name' => $result['username'], 
									                	'user_email' => $result['email'], 
									                	'user_fname' =>  $result['fname'], 
									                	'user_mname' =>  $result['mname'], 
									                	'user_lname' => $result['lname'], 
									                	'user_mobile' => $result['mobile'], 
									                	'user_image' => $result['image'],
            	                                        'user_sponsor' => $result['sponsor_id'],
                										'user_terms' => 2
									                     );
										        

						                        $_SESSION['user_days_to_remember'] = 1;
												$this->setCookies($token, $data, 1);
												$_SESSION['user_active'] = $data;
												unset($_SESSION['current_verify'], $_SESSION['current_login_user_id'], $_SESSION['current_login_password']);
							                 return true;
									    	 exit(); 
							               }else{
												$email = $result['email'];
									        	$ip_add = $this->detect->getUserIP();
									        	$token = md5($email.''.$this->TODAY().''.$ip_add);
									        	// $device = $this->detect->detectDevice();
									        	$device = "setupbrowsecap";
								                   $data = array(
										                	'user_id' => $result['id'], 
										                	'user_name' => $result['username'], 
										                	'user_email' => $result['email'], 
										                	'user_fname' =>  $result['fname'], 
										                	'user_mname' =>  $result['mname'], 
										                	'user_lname' => $result['lname'], 
										                	'user_mobile' => $result['mobile'], 
										                	'user_image' => $result['image'],
            	                                            'user_sponsor' => $result['sponsor_id'],
                											'user_terms' => 2
										                     );
											        
								                    $sql = "INSERT INTO tbl_user_login_details (user_id, expiration, device, ip_add, token, token_status) VALUES('".$_SESSION['current_login_user_id']."', DATE_ADD(NOW(), INTERVAL 1 DAY), '$device', '$ip_add', '$token','1') ON DUPLICATE KEY UPDATE login_date= VALUES(login_date), expiration= VALUES(expiration), device= VALUES(device), ip_add= VALUES(ip_add), token= VALUES(token), token_status= VALUES(token_status)";
									                $result = $this->crud->execute($sql);
									               if($result){
								                        $_SESSION['user_days_to_remember'] = 1;
														$this->setCookies($token, $data, 1);
														$_SESSION['user_active'] = $data;
														unset($_SESSION['current_verify'], $_SESSION['current_login_user_id'], $_SESSION['current_login_password']);
									                 return true;
											    	 exit();
									               }else{
									                 unset($_SESSION['current_verify'], $_SESSION['current_login_user_id'], $_SESSION['current_login_password']);
									                 return false;
											    	 exit();
									               }
							               } 
                                    }
					        	}    
						    }else{
						    	unset($_SESSION['current_verify'], $_SESSION['current_login_user_id'], $_SESSION['current_login_password']);
						    	return false;
	    	                    exit();
						    }  
	                 }else{
	                    unset($_SESSION['current_verify'], $_SESSION['current_login_user_id'], $_SESSION['current_login_password']);
	                    return false;
	        	        exit();
	                 } 
        		}
        	}
	}
	public function User_Forgotpass($email)
	{
		$email = $this->crud->escape_string(strtolower($email));
		if($email=="forgot_pass_in"){
			$email= $this->User_Data('user_email');
		}
    	$token = bin2hex(random_bytes(32));
		$hashedToken = md5(hex2bin($token));
		$hash_email=base64_encode($this->customcrypt->getEncrypt(json_encode($email)));
		$url = $this->config->Link()."/members/login/?token=".$hash_email."&validator=".$token;

		$sql = "SELECT fname, email, email_verified, (SELECT expiry FROM tbl_user_reset_pass WHERE email = '$email' AND status IS NULL AND expiry > NOW() LIMIT 1) AS expiry FROM tbl_user WHERE email = '$email' LIMIT 1";
		$result = $this->crud->fetchSingleRow($sql);
		if($result){
              	try{
			        $notify = $this->email->notify_user("forgot-pass", $url, strtolower($result['email']), $result['fname']);
	                $sql = "INSERT INTO tbl_user_reset_pass (email, hash, expiry) VALUES ('$email', '$hashedToken', DATE_ADD(NOW(), INTERVAL 1000 MINUTE))";
					$result = $this->crud->execute($sql);
					if($result){
						return true;
					}else{
						return 'Reset password is unavailable at this moment';
					}
			      }catch(Exception $e){
			        return 'Reset password is unavailable at this moment';
			      }
		}else{
			return "Account not found";
		}
	}
	public function User_Resetpass($token, $validator, $password)
	{
		$password = $this->crud->escape_string(md5($password));
	    $validator = $this->crud->escape_string($validator);
	    $hashedToken = md5(hex2bin($validator));
	    $email = $this->customcrypt->getDecrypt(base64_decode($token));
        $email = str_replace('"', '', $email);

	    if(ctype_xdigit($validator) != true ){
	    	return "It seems that this link is invalid.";
	    }else{
			if(strlen($validator) % 2 != 0 ){
				return "It seems that this link is invalid.";
			}else{
			   	$sql = "SELECT * FROM tbl_user_reset_pass WHERE email = '$email' AND hash='".$hashedToken."' AND status IS NULL LIMIT 1";
			    $result = $this->crud->fetchSingleRow($sql);
			    if($result){
	    			if($result['expiry'] < $this->TODAY()){
                        return "This link is already expired!";
	    			}else{
				    	$sql = "UPDATE tbl_user_reset_pass SET status = '1' WHERE id='".$result['id']."'";
				    	if($this->crud->execute($sql)){
				    		$sql = "UPDATE tbl_user SET password = '$password' WHERE email = '".$result['email']."'";
				    		if($this->crud->execute($sql)){
				    			unset($_SESSION['reset_token'], $_SESSION['reset_validator']);
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
	// public function Check_Reset_Validator($hash){
	// 	$hash = $this->crud->escape_string($hash);
 //        $sql = "SELECT expiry FROM tbl_user_reset_pass WHERE hash='".$hash."' AND status IS NULL LIMIT 1";
 //        $result = $this->crud->fetchSingleRow($sql);
 //        if($result){
 //            if($result['expiry'] < $this->TODAY()){
 //                return false;
	//         }else{
 //                return true;
	//         }
 //        }else{
 //        	return false;
 //        }
 //        exit();
	// }
	// public function User_Verifyemail($account)
	// {
 //       	$email = str_replace('"', '', $this->customcrypt->getDecrypt(base64_decode($this->crud->escape_string($account))));
 //       	$sql = "SELECT id, IFNULL(fname, '') AS fname, email, email_verified FROM tbl_user WHERE email='$email' LIMIT 1";
 //       	$result = $this->crud->fetchSingleRow($sql);
 //       	if($result){
 //       		if($result['email']==''){
 //       			return false;
 //       		}else{
	//            if((int)$result['email_verified'] == 1){
	//               return "Congratulations ".$result['fname']."! Your email is successfully verified";
	//            }else{
	//               $sql = "UPDATE tbl_user SET email_verified='1' WHERE id='".$result['id']."'";
	//               if($this->crud->execute($sql)){
	//                  return "Congratulations ".$result['fname']."! Your email is successfully verified";
	//               }else{
	//                  return "Opps!, Sorry ".$result['fname']." we are unable to perform your request, You can try to visit this link later.";
	//               }
	//            }
 //       		}
 //       	}else{
 //       	   return false;
 //       	}
 //       	exit();
	// }
	// public function User_Signup($sponsor, $fname, $username, $email, $password, $agree, $source, $sponsor_id)
	// {
 //       $sponsor=strtolower($this->crud->escape_string($sponsor));
 //       $fname=ucwords($this->crud->escape_string($fname));
 //       $username=$this->crud->escape_string($username);
 //       $email=strtolower($this->crud->escape_string($email));
 //       $password=md5($this->crud->escape_string($password));
 //       $agree=($this->crud->escape_string($agree) == "on") ? 1 : 0;
 //       $source=$this->crud->escape_string($source);
 //       $sponsor_id=$this->crud->escape_string($sponsor_id);
 //           $sql="SELECT username FROM tbl_user WHERE username = '$username'";
	//  	   if($this->crud->countRows($sql) != 0){
	//  	   		return "Username is already taken!";
	//  	   }else{
	//  	   	$sql="SELECT email FROM tbl_user WHERE email = '$email'";
	// 	 	   if($this->crud->countRows($sql) != 0){
	// 	 	   		return "Email is already taken!";
	// 	 	   }else{
	// 	 	   	try{
	// 				$notify = $this->email->notify_user("verify_email", $this->_getVerifyLink($email), strtolower($email), $fname);
	// 			}catch(Exception $e){
	// 			}
	// 			$sql="SELECT sponsor_level FROM tbl_user WHERE id='$sponsor_id'";
	// 			$result=$this->crud->fetchSingleRow($sql);
	// 			$arr = json_decode($result['sponsor_level'],true);
	//  	   		    $sql="INSERT INTO tbl_user (username, password, fname, email, registration_src, agreement, sponsor_account,sponsor_id) VALUES ('$username', '$password', '$fname', '$email', '$source', '$agree', '$sponsor','$sponsor_id')";
	//                 $result=$this->crud->executeReturnLastexactID($sql);
	//                 if($result!=false){
	// 					array_unshift($arr, (int)$result);
	// 					$sql="UPDATE tbl_user SET sponsor_level='".json_encode($arr)."' WHERE id='$result'";
	// 					if($this->crud->update($sql)){
	//                     	return true;
	// 					}else{
	// 						return true;
	// 					}
	//                 }else{
	//             		return "Something went wrong, Please try again later!";
	//                 }
	// 	 	   }		
	//  	   }
	// }
	// public function Find_Sponsor($sponsor)
	// {
 //        $sponsor = $this->crud->escape_string($sponsor);
	// 	$sql="SELECT id,topup_status FROM tbl_user WHERE username='$sponsor'";
	//     $result = $this->crud->fetchSingleRow($sql);
 //        if($result){
 //        	if($result['topup_status']!=1){
 //        		return 'not_active';
 //        	}else{
 //        		return $result['id'];
 //        	}
 //        }else{
 //          return false;
 //        }
 //    }
 }
?>





