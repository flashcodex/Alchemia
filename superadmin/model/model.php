<?php
@session_start();
require_once "../classes/Crud.php";
require_once "detect.php";
require_once "crypt.php";
require_once "../classes/Config.php";
require_once "emails/send_email.php";
Class Model {
	     
	private $crud;
	public function __construct() {
		$this->crud = new Crud();
		$this->detect = new customDetect();
		$this->customcrypt = new customCrypt();
		$this->config = new Config();
		$this->email = new Send_Email();
	}
    private function TODAY()
	{
       date_default_timezone_set('Asia/Manila');
       return date("Y-m-d").' '.date("H:i:s");	
	}
	public function TODAY_DATE($get)
    {
     date_default_timezone_set('Asia/Manila');
     if($get == "date"){$now = date("Y-m-d");}
     else if($get == "time"){$now = date("H:i");}
     else if($get == "month"){$now = date("m");}
     else if($get == "monthname"){$now = date("F");}
     else if($get == "year"){$now = date("Y");}
     else if($get == "day"){$now = date("D");}
     else if($get == "thisdate"){$now = date("m/d/Y");}
     return $now;

    }
	private function customTODAY($type)
	{
	     date_default_timezone_set('Asia/Manila');
	     if($type == "date"){
	         return $datestamp = date("Y-m-d");
	     }else if($type == "month"){
	         return $datestamp = date("m");
	     }else{
	     	 return date("Y-m-d").' '.date("H:i:s");
	     }
	}
	private function Get_CODE($table, $column, $key, $length){
		   $gen_code = new TransGen($key, $length);
	  	   $code = $gen_code->get_code();

	       if($code){
	           $check = $this->Check_Code($table, $column, $code);
	            while ($check){
				    $code = $gen_code->get_code();
				    if($code){
				   	  $check = $this->Check_Code($table, $column, $code);
				    }else{
		              return false;
		            }
				}
	        }else{
	        	return false;
	        }
	        return $code;
	}
	private function Check_Quarter(){
		date_default_timezone_set('Asia/Manila');
		$now = new Datetime("now");
		$begin_qtr=array('00:00','06:01','12:01','18:01');
		$end_qtr=array('06:00','12:00','18:00','23:59');
		for ($i=0; $i < 4; $i++) { 
		    $begin = new Datetime($begin_qtr[$i]);
		    $end = new Datetime($end_qtr[$i]);
			if($now <= $end && $now >= $begin){
				return $i+1;
			}
		}
		return false;
	}
	private function Check_Code($table, $column, $code)
	{
		$code = $this->crud->escape_string($code);
        $sql="SELECT ".$column." FROM ".$table." WHERE ".$column."='$code'";
		if($this->crud->countRows($sql) >= 1){ 
        	return true;
	    }else{
        	return false;
        }
	}
	private function Generate_Random_Code($length,$type,$delimeter)
	{
		$length = $this->crud->escape_string($length);
		$type = $this->crud->escape_string($type);
		$delimeter = $this->crud->escape_string($delimeter);
		$keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$str = '';
		$max = mb_strlen($keyspace, '8bit') - 1;
		if ($max < 1) {
		    throw new Exception('error');
		}
		for ($i = 0; $i < $length; ++$i) {
		    $str .= $keyspace[random_int(0, $max)];
		}
		return $type.$delimeter.$str;
	}
	private function Get_Image_Code($table, $column, $key, $length, $image){
			$gen_code = new TransGen($key, $length);
	  	   	$code = $gen_code->get_code();

			if($code){
				$arr_image = explode('.', $image);
				$newimage = $code."-".str_replace(' ', '', $arr_image[0]).".". $arr_image[1];
				$check = $this->Check_Code($table, $column, $newimage);
				while ($check){
					$code = $profile_trans->get_code();
					if($code){
						$arr_image = explode('.', $image);
						$newimage = $code."-".str_replace(' ', '', $arr_image[0]).".". $arr_image[1];
						$check = $this->Check_Code($table, $column, $newimage);
					}else{
						return false;
					}
				}
			}else{
				return false;
			}
			return $newimage;
	}
	private function formatMoney($number, $cents = 1) { // cents: 0=never, 1=if needed, 2=always
		  if (is_numeric($number)) { // a number
		    if (!$number) { // zero
		      $money = ($cents == 2 ? '0.00' : '0'); // output zero
		    } else { // value
		      if (floor($number) == $number) { // whole number
		        $money = number_format($number, ($cents == 2 ? 2 : 0)); // format
		      } else { // cents
		        $money = number_format(round($number, 2), ($cents == 0 ? 0 : 2)); // format
		      } // integer or decimal
		    } // value
		    return '₱ '.$money;
		  } // numeric
		} // formatMoney
	public function Admin_Restrictions($page)
	  {
	    if(!isset($_SESSION[$this->config->SESS().'_AdSTATUS'],$_SESSION[$this->config->SESS().'_TYPE']) && $_SESSION[$this->config->SESS().'_AdSTATUS'] != md5('active')
	      && $_SESSION[$this->config->SESS().'_TYPE'] != md5('admin')) {
	        echo '<script>location.replace("login");</script>';
	    }else{
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
	          return $result;
	        }else{
	          return 1;
	        }
	      }
	    }
	}
	
	private function Get_Region()
	{
		$data=array();
		$sql="SELECT * FROM refregion";
		$result=$this->crud->getData($sql);
		if(!$result){
		}else{
			foreach ($result as $row) {
		    $data['region'][] = array(
	     	'location' => $row["regDesc"],
	     	'code' => $row["regCode"]
		    );
			}
		}
			return $data;
	}
	private function Get_Province($region)
	{
		$sql="SELECT * FROM refprovince WHERE regCode IN ($region)";
		$result=$this->crud->getData($sql);
		if(!$result){
		}else{
			foreach ($result as $row) {
		    $data['province'][] = array(
	     	'location' => $row["provDesc"],
	     	'code' => $row["provCode"]
		    );
			}
		}
			return $data;
	}
	private function Get_City($province)
	{
		$sql="SELECT * FROM refcitymun WHERE provCode IN ($province)";
		$result=$this->crud->getData($sql);
		if(!$result){
		}else{
			foreach ($result as $row) {
		    $data['city'][] = array(
	     	'location' => $row["citymunDesc"],
	     	'code' => $row["citymunCode"]
		    );
			}
		}
			return $data;
	}
	private function Get_Barangay($city)
	{
		$sql="SELECT * FROM refbrgy WHERE citymunCode IN ($city)";
		$result=$this->crud->getData($sql);
		if(!$result){
		}else{
			foreach ($result as $row) {
		    $data['brgy'][] = array(
	     	'location' => $row["brgyDesc"],
	     	'code' => $row["brgyCode"]
		    );
			}
		}
			return $data;
	}
	public function Profile($type,$image,$tmp,$avatar,$imgtype){
		$type=$this->crud->escape_string($type);
		$id = $_SESSION[$this->config->SESS().'_UID'];
		$avatar=$this->crud->escape_string($avatar);
  		$imgtype=$this->crud->escape_string($imgtype);
		$data_country=array();
		$data_response=array();
		$data_avatar=array();
		switch ($type) {
			case 'profile':{
				$sql="SELECT * FROM tbl_administrator WHERE id='$id'";
				$result=$this->crud->fetchSingleRow($sql);
				if(!$result){
					return false;
					break;
				}else{
					$data_response['profile']=$result;
					//Select Country
					$sql = "SELECT *  FROM tbl_country";
					$result = $this->crud->getData($sql);
					if(!$result){
					}else{
						foreach ($result as $row) {
	          	$data_country['country'][]=array(
	          		'iso' => $row['iso'],
	          		'name' => $row['name'],
	          		'country_name' => $row['country_name'],
	          		'phonecode' => $row['phonecode']
	          	  );
	         	} 
			  }		
	        }
			
				return array_merge($data_response,$data_country,$data_avatar);
				break;
			}
			case 'save_profile_image':{
				$sql = "SELECT * FROM tbl_administrator WHERE id='$id'";
				$result = $this->crud->fetchSingleRow($sql);
				if(!$result){
					$data_response = array(
						'result' => false,
						'type' => 'error',
						'message' => 'Failed to upload image'        
					);
				}else{
					$arr = explode('-', $result['profile_img']);
					if($result['profile_img'] != 'default.png' && $arr[0] != 'avatar'){
						unlink("../../images/admin_images/".$result['profile_img']);
					}
					if($imgtype == "avatar"){
						$sql="UPDATE tbl_administrator set profile_img = '$avatar' WHERE id='$id'";
			            $result=$this->crud->update($sql);
			            if(!$result){
			            	$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'Nothing changes'        
							);
			            }else{
			            	$data=array();
						    $sql="SELECT * FROM tbl_administrator WHERE id='$id'";
						    $result = $this->crud->fetchSingleRow($sql);
						    if($result){
						         $data = array(
							        'fname' =>  $result['fname'], 
							        'mname' =>  $result['mname'], 
							        'lname' => $result['lname'], 
							        'mobile' => $result['mobile'], 
							        'profile_img' => $result['profile_img']
							    );
						        // setcookie($this->config->cookie_user(), $this->customcrypt->getEncrypt(json_encode($data)), time() + (86400 * intval($_SESSION['user_days_to_remember'])), "/", $this->config->CookieDomainConfig(), 1);
						        $data_response = array(
									'result' => true,
									'type' => 'success',
									'message' => 'Save changes',
									'image' => $avatar        
								);
						    }else{
						        $data_response = array(
									'result' => true,
									'type' => 'success',
									'message' => 'Save changes',
									'profile_img' => $avatar           
								);
						    }
			            }
					}else{
						$sql = "SELECT * FROM tbl_administrator WHERE id='$id'";
						$result = $this->crud->fetchSingleRow($sql);
						$newimage=$this->Get_Image_Code('tbl_administrator', 'profile_img', 'IMAGE', 14, $image);
						if($this->Move_To_Folder1($newimage, $tmp)){
				            $sql="UPDATE tbl_administrator set profile_img = '$newimage' WHERE id='$id'";
				            $result=$this->crud->update($sql);
				            if(!$result){
				            	$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Nothing changes'        
								);
				            }else{
				            	$data=array();
						        $sql = "SELECT * FROM tbl_administrator WHERE id='$id'";
						        $result = $this->crud->fetchSingleRow($sql);
						        if($result){
						            $data = array(
							        'fname' =>  $result['fname'], 
							        'mname' =>  $result['mname'], 
							        'lname' => $result['lname'], 
							        'mobile' => $result['phone'], 
							        'profile_img' => $result['profile_img']
							    );
						        // setcookie($this->config->cookie_user(), $this->customcrypt->getEncrypt(json_encode($data)), time() + (86400 * intval($_SESSION['user_days_to_remember'])), "/", $this->config->CookieDomainConfig(), 1);
						            $data_response = array(
										'result' => true,
										'type' => 'success',
										'message' => 'Save changes',
										'profile_img' => $newimage            
									);
						        }else{
						            $data_response = array(
										'result' => true,
										'type' => 'success',
										'message' => 'Save changes',
										'profile_img' => $newimage            
									);
						        }
				            }
				        }else{
				        	$data_response = array(
								'result' => false,
								'type' => 'error',
								'message' => 'Failed to move upload image'        
							);
				        }
					}

				}
				return $data_response;
				break;
					
			}
			
			default:
				return false;
				break;
		}
	}
	public function Save_User_Profile($type,$fname,$lname,$mname,$city,$country,$phonecode,$mobile,$c_password,$n_password,$v_password)
	{
	    $type = $this->crud->escape_string($type);
	    $fname = $this->crud->escape_string($fname);
	    $lname = $this->crud->escape_string($lname);
	    $mname = $this->crud->escape_string($mname);
	    $mobile = $this->crud->escape_string($mobile);
	    $country = $this->crud->escape_string($country);
	    $city = $this->crud->escape_string($city);
	    $phonecode = $this->crud->escape_string($phonecode);
	    $c_password = $this->crud->escape_string($c_password);
        $n_password = $this->crud->escape_string($n_password);
        $v_password = $this->crud->escape_string($v_password);
	    // $username = $this->User_Data('user_name');
	    $id = $_SESSION[$this->config->SESS().'_UID'];
	    $data_response=array();
	    switch ($type) {
	    	case 'save_personal_info':{
	    		$sql="UPDATE tbl_administrator SET fname=TRIM('$fname'),lname=TRIM('$lname'),mname=TRIM('$mname') WHERE id='$id'";
	    		break;
	    	}
	    	case 'save_contact_info':{
	    		$sql="UPDATE tbl_administrator SET country='$country',city='$city',phone_code='$phonecode',phone='$mobile' WHERE id='$id'";
	    		break;
	    	}

	    	case 'save_change_pass':{
	    		$sql = "SELECT * FROM tbl_administrator WHERE id='$id'";
				$result = $this->crud->fetchSingleRow($sql);
				if(!$result){
					return false;
					break;
				}else{
					if($result['password'] != md5($c_password)){
						return 'incorrect_pass';
						break;
					}else{
				   		if(md5($n_password)!= md5($v_password)){
				   			return false;
				   			break;
				   		}else{
					   		$v_password = md5($v_password);
							$sql="UPDATE tbl_administrator SET password='$v_password' WHERE id='$id'";
							$result=$this->crud->execute($sql);
				    		if(!$result){
				    			return false;
				    			break;
				    		}else{
				    			return true;
				    			break;
				    		}
				   		}
				   	}
				}
	    	}
	    		
	    	default:
	    		return false;
	    		break;
	    }
	    $result=$this->crud->update($sql);
    	if(!$result){
    		return false;
    	}else{
	    	$data=array();
			$sql = "SELECT * FROM tbl_administrator WHERE id='$id'";
			$result = $this->crud->fetchSingleRow($sql);
			if($result){
	    		$data = array(
				  'fname' =>  $result['fname'], 
				  'mname' =>  $result['mname'], 
				  'lname' => $result['lname'], 
				  'phone' => $result['phone'], 
				  'profile_img' => $result['profile_img']
				);
				// setcookie($this->config->cookie_user(), $this->customcrypt->getEncrypt(json_encode($data)), time() + (86400 * intval($_SESSION['user_days_to_remember'])), "/", $this->config->CookieDomainConfig(), 1);
			return $data;
		    }else{
		    return true;
		    }
    	}
	}
	
	public function Useraccount($type){
		//return true;
		$type = $this->crud->escape_string($type);
		$data=array();
		switch ($type) {
			case 'users':{


			$sql = "SELECT CONCAT_WS(' ',fname,mname,lname) as fullname, IFNULL(CONCAT('+',phone_code,mobile),'---') as mobile,image,email,username,status,id FROM tbl_user";
			$result = $this->crud->getData($sql);
			if($result){

					
				foreach($result as $row){
		    		$data_response[] = array(
					  'fullname' => $row['fullname'], 
					  'mobile' => $row['mobile'], 
					  'image' => '<div class="symbol symbol-50 symbol-sm "><img class="tba_image border border-dark" src="../images/user_images/'.$row['image'].'" alt=""></div>',
					  'email' => $row['email'],
					  'username' => $row['username'],
					  'status' => $row['status'],
					  'id' => base64_encode($this->customcrypt->getEncrypt($row["id"]))
					);
				}
			return $data_response;
		    	}else{
		    return false;
		    	}


			}

		}
		

	}
	public function Admin($type,$id){
		//return true;
		$type = $this->crud->escape_string($type);
		$id = $this->customcrypt->getDecrypt(base64_decode($id));
		$data=array();
		switch ($type) {
			case 'usersadmin':{
			$sql = "SELECT CONCAT_WS(' ',fname,mname,lname) as fullname, IFNULL(CONCAT('+',phone_code,phone),'---') as phone,profile_img,email,username,status,role,id FROM tbl_administrator";
			$result = $this->crud->getData($sql);
			if($result){
				foreach($result as $row){
		    		$data_response[] = array(
					  'fullname' => $row['fullname'], 
					  'mobile' => $row['phone'], 
					  'image' => '<div class="symbol symbol-50 symbol-sm "><img class="tba_image border border-dark" src="../images/admin_images/'.$row['profile_img'].'" alt=""></div>',
					  'email' => $row['email'],
					  'username' => $row['username'],
					  'status' => $row['status'],
					  'role' => $row['role'],
					  'id' => base64_encode($this->customcrypt->getEncrypt($row["id"]))
					);
				}
				return $data_response;
		    	}else{
		   			return false;
		    	}

		    	break;
			}
			case'usersadmin_account':{
				$sql = "SELECT * FROM tbl_administrator WHERE id='$id'";
				$result = $this->crud->fetchSingleRow($sql);
				if($result){
						         $data = array(
						         	'id' =>  base64_encode($this->customcrypt->getEncrypt($result["id"])),
							        'fname' =>  $result['fname'], 
							        'mname' =>  $result['mname'], 
							        'lname' => $result['lname'], 
							        'phone' => $result['phone'],
							        'email' => $result['email'],
							        'status' => $result['status'],
							        'role' => $result['role'],
							        'username' => $result['username'],
							        'profile_img' => '../images/admin_images/'.$result['profile_img']
							    );
					return $data;
		    	}else{
		   			return false;
		    	}
		    }
		    case'usersadmin_remove':{

		    	if($id=="2000"){
		    		$data = array(
			         	'result' => false,
						'type' => 'warning',
						'message' => 'Default admin cant remove'
				    );
		    	}else{
		    		$sql = "DELETE FROM tbl_administrator WHERE id='$id'";
					$result = $this->crud->execute($sql);
					if($result){
							         $data = array(
							         	'result' => true,
										'type' => 'success',
										'message' => 'Admin account removed'
								    );
						
			    	}else{
			   						$data = array(
							         	'result' => false,
										'type' => 'info',
										'message' => 'Server, account cant remove'
								    );
			    	}
		    	}
				
		    	return $data;
		    	break;
			}
			default:
			return false;
			break;
			
		}
	}
	public function Save_Admin_Info($type,$fname,$lname,$mname,$email,$country,$phonecode,$phone,$image,$tmp,$status,$role,$username,$id,$data_id){
		$type = $this->crud->escape_string($type);
		$fname = $this->crud->escape_string($fname);
		$lname = $this->crud->escape_string($lname);
		$mname = $this->crud->escape_string($mname);
		$email = $this->crud->escape_string($email);
		$country = $this->crud->escape_string($country);
		$phonecode = $this->crud->escape_string($phonecode);
		$phone = $this->crud->escape_string($phone);
		$image = $this->crud->escape_string($image);
		$status = $this->crud->escape_string($status);
		$role = $this->crud->escape_string($role);
		$username = $this->crud->escape_string($username);
		$password= "3e2959dcb5ae9022f356b64db796bd76";
		$id = $this->customcrypt->getDecrypt(base64_decode($id));
		$data_id = $this->crud->escape_string($data_id);

		if($data_id==""){
			$sql="SELECT email,phone,username FROM tbl_administrator WHERE email='$email' OR phone='$phone' OR username='$username' ";
			if($this->crud->countRows($sql) >= 1){ 
	        	$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'Account Existed'        
					);
		    }else{
	        	if($image!=""){
	        		$newimage=$this->Get_Image_Code('tbl_administrator', 'profile_img', 'IMAGE', 14, $image);
	        	}else{
	        		$newimage="default.png";
	        	}
				$sql="INSERT INTO tbl_administrator(fname,lname,mname,email,country,phone_code,phone,profile_img,status,role,username,password,date_registration) VALUES('$fname','$lname','$mname','$email','$country','$phonecode','$phone','$newimage','$status','$role','$username','$password',now())";
					$result=$this->crud->execute($sql);

		    		if(!$result){
		    			$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Server error, Failed to add'        
						);
		    		}else{

		    			if($image!=""){
			        			if($this->Move_To_Folder1($newimage, $tmp)){
		    				$data_response = array(
									'result' => true,
									'type' => 'success',
									'message' => 'New admin has been successfully added'        
								);
			    			}else{
			    				$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Server error, Failed to upload image'        
								);
			    			}
			        	}else{
			        		$data_response = array(
									'result' => true,
									'type' => 'success',
									'message' => 'New admin has been successfully added'        
								);
			        	}
		    			
		    		}
	        }
			

		}else{
			if($id=="2000"){
		    		$data_response = array(
			         	'result' => false,
						'type' => 'info',
						'message' => 'Default admin cant update'
				    );
		    	}else{
		    		$sql="UPDATE tbl_administrator SET fname='$fname',lname='$lname',mname='$mname',email='$email',country='$country',phone_code='$phonecode',phone='$phone',status='$status',role='$role',username='$username' WHERE id='$id'";
					$result=$this->crud->execute($sql);

						if(!$result){
			    			$data_response = array(
										'result' => false,
										'type' => 'info',
										'message' => 'Server error, Failed to update'        
							);
			    		}else{
			    			$data_response = array(
										'result' => true,
										'type' => 'success',
										'message' => 'Update admin successfully'        
									);
			    		}
		    	}
			
		}
		return $data_response;

	}

	public function Profile_Admin($type,$image,$tmp,$id){
		$type = $this->crud->escape_string($type);
		$image = $this->crud->escape_string($image);
		$id = $this->customcrypt->getDecrypt(base64_decode($id));

		$newimage=$this->Get_Image_Code('tbl_administrator', 'profile_img', 'IMAGE', 14, $image);

		$sql = "SELECT * FROM tbl_administrator WHERE id='$id'";
				$result = $this->crud->fetchSingleRow($sql);
				if(!$result){
					$data_response = array(
						'result' => false,
						'type' => 'error',
						'message' => 'Failed to upload image'        
					);
				}else{
					$arr = explode('-', $result['profile_img']);
					if($result['profile_img'] != 'default.png' && $arr[0] != 'avatar'){
						unlink("../../images/admin_images/".$result['profile_img']);
					}
					if($this->Move_To_Folder1($newimage, $tmp)){
			            $sql="UPDATE tbl_administrator set profile_img = '$newimage' WHERE id='$id'";
			            $result=$this->crud->update($sql);
			            if(!$result){
			            	$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'Nothing changes'        
							);

			            }else{
			            	$data_response = array(
								'result' => true,
								'type' => 'success',
								'message' => 'Profile image updated'        
							);
			            }
			        }else{
			        	$data_response = array(
							'result' => false,
							'type' => 'error',
							'message' => 'Failed to move upload image'        
						);
				    }
				}

		return $data_response;
	}

	public function Learning_Material_Form($title_name,$module,$number){
	$title_name = $this->crud->escape_string($title_name);
	$number = $this->crud->escape_string($number);
	$module = $this->crud->escape_string($module);
	$id = $_SESSION[$this->config->SESS().'_UID'];
	$sql="SELECT name FROM tbl_material_header WHERE name='$title_name' or number='$number' ";
		if($this->crud->countRows($sql) >= 1){ 
	    	$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Material name or number existed'        
				);
	    }else{
	    	$sql="INSERT INTO  tbl_material_header(module,name,setting,requisite,date_created,admin_create_id,status,number) VALUES('$module','$title_name','color: #363636;','0',now(),'$id','2', '$number')";
	    	if($this->crud->execute($sql)){ 
		    	$data_response = array(
								'result' => true,
								'type' => 'success',
								'message' => 'New material created'        
					);
	    	}else{
	    		$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Server Error, failed to create'        
				);
	    	}
	    }
		return $data_response;
	}

	public function Learningmaterial($type,$id,$search){
		$type = $this->crud->escape_string($type);
		$id = $this->customcrypt->getDecrypt(base64_decode($id));
		$search = $this->crud->escape_string($search);

		switch ($type) {
			case 'all_material':{
				$sql="SELECT id FROM tbl_material_header ";
				if($this->crud->countRows($sql) <= 0){ 
			    	$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Learning Material name existed'        
						);
			    }else{
			    	$sql="SELECT h.*,(SELECT COUNT(p.id) FROM tbl_material_page p WHERE p.material_header_id=h.id AND p.name !='main_page') AS pages FROM tbl_material_header h WHERE h.name LIKE '%$search%' ORDER BY CAST(SUBSTRING(name,LOCATE(' ',name)+1) AS SIGNED)";
			    	$result = $this->crud->getData($sql);
						if($result){
							foreach($result as $row){
					    		$data_response[] = array(
					    		  //'type' => 'success',
								  'number' => $row['number'],
								  'name' => $row['name'],
								  'pages' => $row['pages'],
								  'date_created' => $row['date_created'],
								  'status' => $row['status'],
								  'setting' => $row['setting'],
								  'id' => base64_encode($this->customcrypt->getEncrypt($row["id"]))
								);
							}
							return $data_response;
							break;
				    	}else{
				   			$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'Server error cant retrieve'      
							);
				    	}
					
			    }
			    return $data_response;
				break;
			}
			case 'publish_material':{
				$sql="UPDATE tbl_material_header SET status='1' WHERE id='$id'";
		    	if($this->crud->execute($sql)){ 
			    	$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Learning Material has published'        
						);
		    	}else{
		    		$data_response = array(
						'result' => false,
						'type' => 'info',
						'message' => 'Server error failed to update'      
					);
		    	}
				return $data_response;
				break;
			}
			case 'unpublish_material':{
				$sql="UPDATE tbl_material_header SET status='2' WHERE id='$id'";
		    	if($this->crud->execute($sql)){ 
			    	$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Learning Material has unpublished'        
						);
		    	}else{
		    		$data_response = array(
						'result' => false,
						'type' => 'info',
						'message' => 'Server error failed to update'      
					);
		    	}
				return $data_response;
				break;
			}
			case 'remove_material':{
				$sql="DELETE FROM tbl_material_header WHERE id='$id'";
		    	if($this->crud->execute($sql)){ 
			    	$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Learning Material has remove'        
						);
		    	}else{
		    		$data_response = array(
						'result' => false,
						'type' => 'info',
						'message' => 'Server error failed to remove'      
					);
		    	}
				return $data_response;
				break;
			}
			default:
				return false;
				break;
		}
	}

	public function Learningmaterial_Edit($type,$id,$page){
		$type = $this->crud->escape_string($type);
		$id = $this->customcrypt->getDecrypt(base64_decode($id));
		$page = $this->crud->escape_string($page);
		switch ($type) {
			case 'retrieve_material':{
				$sql="SELECT * FROM tbl_material_header WHERE id='$id'";
				$result = $this->crud->fetchSingleRow($sql);
				if(!$result){
					$data_response = array(
						'result' => false,
						'type' => 'info',
						'message' => 'Failed to retrieve'        
					);
				}else{
					$data_response = array(
						'result' => true,
						'type' => 'success',
						'message' => 'Success retrieve',
						'name' => $result['name'],
						'number' => $result['number'],
						'id' => $result['id'],
					);
				}
				return $data_response;
				break;
			}
			case 'retrieve_pages':{
				$sql="SELECT * FROM tbl_material_page WHERE material_header_id='$id' ORDER BY `number` ASC";
				$result = $this->crud->getData($sql);
					if($result){
						foreach($result as $row){
				    		$data_response[] = array(
				    		  'type' => 'success',
							  'name' => $row['name'],
							  'date_created' => $row['date_created'],
							  'status' => $row['status'],
							  'page_id' => $row["id"],
							  'number' => $row["number"]
							);
						}
						return $data_response;
						break;
			    	}else{
			   			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Server error cant retrieve'    
						);
			    	}
				return $data_response;
				break;
			}
			case 'retrieve_detail':{

				$sql="SELECT * FROM tbl_material_page WHERE material_header_id='$id'";
				$result = $this->crud->fetchSingleRow($sql);
					if($result){
						
						if($page=="main_page"){
							$page_id=$result['id'];
						}else{
							$page_id=$page;
						}

						$sql="SELECT d.*,(SELECT h.setting FROM tbl_material_header h WHERE h.id='$id') AS h_setting,(SELECT p.setting FROM tbl_material_page p WHERE p.id='$page_id') AS p_setting FROM tbl_material_detail d WHERE d.material_page_id='$page_id' ORDER BY d.data_arrange ASC";
						$result = $this->crud->getData($sql);
						if($result){
							foreach($result as $row){
					    		$data_response[] = array(
					    		  'data_type' => $row['type'],
					    		  'data_arrange' => $row['data_arrange'],
					    		  'content' => $row['content'],
					    		  'setting' => $row['setting'],
					    		  'h_setting' => $row['h_setting'],
					    		  'p_setting' => $row['p_setting'],
								  'data_id' => $row["id"],
								  'data_ans' => $row["ans"]
								);
							}
							return $data_response;
							break;
						}else{
							$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'Server error cant retrieve'    
							);
						}
			    	}else{
			   			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Server error cant retrieve'    
						);
			    	}
				return $data_response;
				break;
			}
				
			
			default:
				return false;
				break;
		}
	}

	public function Save_Material_Page($type,$id,$name,$page,$color){
		$type = $this->crud->escape_string($type);
		$id = $this->customcrypt->getDecrypt(base64_decode($id));
		$name = $this->crud->escape_string($name);
		$page = $this->crud->escape_string($page);
		$color = $this->crud->escape_string($color);

		switch ($type) {
			case 'save_main_page':{

					$sql="UPDATE tbl_material_header SET name='$name' WHERE id='$id'";
					if($this->crud->execute($sql)){
						$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Update complete'
						);
					}else{
			   			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Server error cant retrieve'      
						);
			    	}
			    	return $data_response;
			    	break;
				}
			case 'retrieve_main_page_img':{
					$sql="SELECT * FROM tbl_img WHERE type='material' ORDER BY id DESC";
					$result = $this->crud->getData($sql);
					if($result){
						foreach($result as $row){
				    		$data_response[] = array(
				    		  'type' => 'success',
							  'img_name' => $row['img_name'],
							  'date_upload' => $row['date_upload'],
							  'img_id' => base64_encode($this->customcrypt->getEncrypt($row["id"]))
							);
						}
						return $data_response;
						break;
			    	}else{
			   			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Server error cant retrieve'      
						);
			    	}
				return $data_response;
				break;
			}
			case 'retrieve_quiz_img':{
					$sql="SELECT * FROM tbl_img WHERE type='quiz' ORDER BY id DESC";
					$result = $this->crud->getData($sql);
					if($result){
						foreach($result as $row){
				    		$data_response[] = array(
				    		  'type' => 'success',
							  'img_name' => $row['img_name'],
							  'date_upload' => $row['date_upload'],
							  'img_id' => base64_encode($this->customcrypt->getEncrypt($row["id"]))
							);
						}
						return $data_response;
						break;
			    	}else{
			   			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Server error cant retrieve'      
						);
			    	}
				return $data_response;
				break;
			}
			case 'retrieve_quiz_pages':{
					$sql="SELECT * FROM tbl_material_page WHERE material_header_id='$id'";
					$result = $this->crud->getData($sql);
					if($result){
						foreach($result as $row){
							if($row['name']=="main_page"){
								$page_name="Cover page";
							}else{
								$page_name=$row['name'];
							}
				    		$data_response[] = array(
							  'name' => $page_name,
							  'id' => $row["id"],
							  'page_id' => $name
							);
						}
						return $data_response;
						break;
			    	}else{
			   			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Server error cant retrieve'.$id      
						);
			    	}
				return $data_response;
				break;
			}
			case 'save_bg_img':{
				$url='url("../images/packages/'.$name.'")';
				if($page=="main_page"){
					$sql="UPDATE tbl_material_header SET setting='color: $color;background-image: $url;background-position: center;background-repeat: no-repeat;background-size: cover; ' WHERE id='$id'";
				}else{
					$sql="UPDATE tbl_material_page SET setting='color: $color;background-image: $url;background-position: center;background-repeat: no-repeat;background-size: cover; ' WHERE id='$page'";
				}
					
					if($this->crud->execute($sql)){
						$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Update complete'
						);
					}else{
			   			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Server error cant retrieve'      
						);
			    	}
			    	return $data_response;
			    	break;
				}
			case 'save_scheme':{
				if($page=="main_page"){
					$sql="UPDATE tbl_material_header SET setting='color:$color;background-color: $name; ' WHERE id='$id'";
				}else{
					$sql="UPDATE tbl_material_page SET setting='color:$color;background-color: $name; ' WHERE id='$page'";
				}
					
					if($this->crud->execute($sql)){
						$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Update complete'
						);
					}else{
			   			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Server error cant retrieve'      
						);
			    	}
			    	return $data_response;
			    	break;
				}
			
			default:
				return false;
				break;
		}
	}
	public function Add_Img($type,$image,$tmp){
		$type = $this->crud->escape_string($type);
		$image = $this->crud->escape_string($image);
		$id = $_SESSION[$this->config->SESS().'_UID'];
		switch ($type) {
			case 'add_img_material':{
						$newimage=$this->Get_Image_Code('tbl_img', 'img_file_name', 'IMAGE', 14, $image);
						if($this->Move_To_Folder5($newimage, $tmp)){
							$sql="INSERT INTO tbl_img(img_name,admin_create_id,date_upload,type) VALUES('$newimage','$id',now(),'material')";
							if($this->crud->execute($sql)){
								$data_response = array(
									'result' => true,
									'type' => 'success',
									'message' => 'Update complete'      
								);
							}else{
								$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to add'
									); 
								}
						}else{
							$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Failed to upload' 
							);
						}
			    	return $data_response;
			    	break;
				}
			case 'add_img_quiz':{
						$newimage=$this->Get_Image_Code('tbl_img', 'img_file_name', 'IMAGE', 14, $image);
						if($this->Move_To_Folder5($newimage, $tmp)){
							$sql="INSERT INTO tbl_img(img_name,admin_create_id,date_upload,type) VALUES('$newimage','$id',now(),'quiz')";
							if($this->crud->execute($sql)){
								$data_response = array(
									'result' => true,
									'type' => 'success',
									'message' => 'Update complete'      
								);
							}else{
								$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to add'
									); 
								}
						}else{
							$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Failed to upload' 
							);
						}
			    	return $data_response;
			    	break;
				}
				
			
			default:
				return false;
				break;
		}
	}

	public function Edit_Setting_Main($type,$id,$page){
		$type = $this->crud->escape_string($type);
		$id = $this->customcrypt->getDecrypt(base64_decode($id));
		$page = $this->crud->escape_string($page);
		switch ($type) {
			case 'retrieving_setting_main':{
				if($page=="main_page"){
					$sql="SELECT * FROM tbl_material_header WHERE id='$id'";
				}else{
					$sql="SELECT * FROM tbl_material_page WHERE id='$page'";
				}
				
				$result = $this->crud->fetchSingleRow($sql);
				if(!$result){
					$data_response = array(
						'result' => false,
						'type' => 'info',
						'message' => 'Failed to retrieve'        
					);
				}else{
					$data_response = array(
						'result' => true,
						'type' => 'success',
						'message' => 'Success retrieve',
						'setting' => $result['setting']     
					);
				}
				return $data_response;
				break;
			}
			default:
				return false;
				break;
		}
	}
	public function Add_Material_Details($type,$id,$data_arrange,$page){
		$type = $this->crud->escape_string($type);
		$id = $this->customcrypt->getDecrypt(base64_decode($id));
		$data_arrange = $this->crud->escape_string($data_arrange);
		$admin_id = $_SESSION[$this->config->SESS().'_UID'];
		$page = $this->crud->escape_string($page);
		switch ($type) {
			case 'spacer':
			case 'phrase':
			case 'image':
			case 'video':
			case 'audio':
			case 'identify':
			case 'tof':
			case 'mc':
			case 'heading':{
				//, (SELECT content FROM tbl_material_detail d WHERE p.material_page_id=p.id) AS content FROM tbl_material_page p
				$sql="SELECT p.* FROM tbl_material_page p WHERE p.material_header_id='$id'";
				$result = $this->crud->fetchSingleRow($sql);
				if(!$result){
					$sql="INSERT INTO tbl_material_page(material_header_id,name,admin_create_id,date_created)VALUES('$id','main_page','$admin_id',now())";
					if($this->crud->execute($sql)){
						$sql="SELECT * FROM tbl_material_page WHERE material_header_id='$id'";
						$result = $this->crud->fetchSingleRow($sql);
						if($result){
							$page_id=$result['id'];
							$sql="INSERT INTO tbl_material_detail(data_arrange,material_page_id,type,admin_create_id,date_created)VALUES('$data_arrange','$page_id','$type','$admin_id',now())";
							if($this->crud->execute($sql)){
								$data_response = array(
									'result' => true,
									'type' => 'success',
									'message' => 'Success Add',
									'data_arrange' => $data_arrange,
									'data_type' => $type,
									'data_id' => $result['id'], 
								);
							}else{
								$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'Failed to Add'
								); 
							}
						}else{
							$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'Failed to retrieve'
								); 
							}
					}else{
						$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Failed to add'
							); 
						}
					// $data_response = array(
					// 			'result' => false,
					// 			'type' => 'info',
					// 			'message' => 'Failed to retrieve'
					// 			); 
				}else{

						if($page=="main_page"){
							$page_id=$result['id'];
						}else{
							$page_id=$page;
						}

					$sql="INSERT INTO tbl_material_detail(data_arrange,material_page_id,type,admin_create_id,date_created)VALUES('$data_arrange','$page_id','$type','$admin_id',now())";
						if($this->crud->execute($sql)){
							$sql="SELECT * FROM tbl_material_detail  WHERE material_page_id='$page_id' AND data_arrange='$data_arrange' AND type='$type'";
							$result = $this->crud->fetchSingleRow($sql);

							if($result){
								$data_response = array(
									'result' => true,
									'type' => 'success',
									'message' => 'Success Add', 
									'data_arrange' => $data_arrange,
									'data_type' => $type,
									'data_id' => $result['id'],
								);
							}else{
								$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'Failed to retrieve'
								); 
							}
						}else{
							$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Failed to Add'
							); 
						}
				}

				return $data_response;
				break;
			}
			default:
				return false;
				break;
		}
	}
	public function Update_Heading($type,$data_id,$content,$size,$indent){
		$type = $this->crud->escape_string($type);
		$data_id = $this->crud->escape_string($data_id);
		$content = $this->crud->escape_string($content);
		$size = $this->crud->escape_string($size);
		$indent = $this->crud->escape_string($indent);

		switch ($type) {
			case 'heading':{
				$sql="UPDATE tbl_material_detail SET content='$content', setting='$size\,$indent' WHERE id='$data_id'";
				if($this->crud->execute($sql)){
					$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Successfully Update'
						);
				}else{
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update'
					); 
				}
				return $data_response;
				break;
			}
			case 'spacer':{
				$sql="UPDATE tbl_material_detail SET setting='$size' WHERE id='$data_id'";
				if($this->crud->execute($sql)){
					$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Successfully Update'
						);
				}else{
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update'
					); 
				}
				return $data_response;
				break;
			}
			case 'phrase':{
				$sql="UPDATE tbl_material_detail SET  content='$content', setting='$indent' WHERE id='$data_id'";
				if($this->crud->execute($sql)){
					$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Successfully Update'
						);
				}else{
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update'
					); 
				}
				return $data_response;
				break;
			}
			case 'audio':{
				$sql="UPDATE tbl_material_detail SET  content='$content', setting='$indent' WHERE id='$data_id'";
				if($this->crud->execute($sql)){
					$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Successfully Update'
						);
				}else{
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update'
					); 
				}
				return $data_response;
				break;
			}
			case 'image':{
				$sql="UPDATE tbl_material_detail SET  content='$content' WHERE id='$data_id'";
				if($this->crud->execute($sql)){
					$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Successfully Update'
						);
				}else{
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update'
					); 
				}
				return $data_response;
				break;
			}
			case 'video':{
				$sql="UPDATE tbl_material_detail SET  content='$content' WHERE id='$data_id'";
				if($this->crud->execute($sql)){
					$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Successfully Update'
						);
				}else{
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update'
					); 
				}
				return $data_response;
				break;
			}
			case 'identify':{
				$sql="UPDATE tbl_material_detail SET  content='$content', ans='$indent' WHERE id='$data_id'";
				if($this->crud->execute($sql)){
					$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Successfully Update'
						);
				}else{
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update'
					); 
				}
				return $data_response;
				break;
			}
			case 'tof':{
				$sql="UPDATE tbl_material_detail SET  content='$content', ans='$indent' WHERE id='$data_id'";
				if($this->crud->execute($sql)){
					$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Successfully Update'
						);
				}else{
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update'
					); 
				}
				return $data_response;
				break;
			}
			case 'mc':{
				$sql="UPDATE tbl_material_detail SET  content='$content', ans='$indent', setting='$size' WHERE id='$data_id'";
				if($this->crud->execute($sql)){
					$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Successfully Update'
						);
				}else{
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update'
					); 
				}
				return $data_response;
				break;
			}
			default:
				// code...
				break;
		}

		
		
	}

	public function Add_New_Page($type,$id,$name){
		$type = $this->crud->escape_string($type);
		$id = $this->customcrypt->getDecrypt(base64_decode($id));
		$name = $this->crud->escape_string($name);
		$admin_id = $_SESSION[$this->config->SESS().'_UID'];

		$sql="INSERT INTO tbl_material_page (material_header_id,name,admin_create_id,date_created) VALUES('$id','$name','$admin_id',now())";
		if($this->crud->execute($sql)){
			$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Successfully Create'
							); 
		}else{
			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Failed to Add'
							); 
		}
		return $data_response;
	}
	public function Rearrange_Material_Details($type,$id,$data_arrange,$page,$data_id){
		$type = $this->crud->escape_string($type);
		$id = $this->customcrypt->getDecrypt(base64_decode($id));
		$data_arrange = $this->crud->escape_string($data_arrange);
		$page = $this->crud->escape_string($page);
		$data_id = $this->crud->escape_string($data_id);

		$sql="SELECT p.* FROM tbl_material_page p WHERE p.material_header_id='$id'";
				$result = $this->crud->fetchSingleRow($sql);
		if($result){
				if($page=="main_page"){
					$page_id=$result['id'];
				}else{
					$page_id=$page;
				}
			$sql="UPDATE tbl_material_detail SET data_arrange='$data_arrange' WHERE id='$data_id'";
			if($this->crud->execute($sql)){
				$sql="SELECT * FROM tbl_material_detail  WHERE material_page_id='$page_id' AND  id='$data_id' ORDER BY data_arrange ASC";
				$result = $this->crud->fetchSingleRow($sql);

				if($result){
					$data_response = array(
						'result' => true,
						'type' => 'success',
						'message' => 'Update Complete', 
						'data_arrange' => $data_arrange,
						'data_type' => $type,
						'data_id' => $result['id'],
					);
				}else{
					$data_response = array(
					'result' => false,
					'type' => 'info',
					'message' => 'Failed to retrieve'
					); 
				}
			}else{
				$data_response = array(
				'result' => false,
				'type' => 'info',
				'message' => 'Failed to update'
				); 
			}
			return $data_response;
		}

		
	}

	public function Delete_Material($type,$id,$form){
		$type = $this->crud->escape_string($type);
		$id = $this->crud->escape_string($id);
		$form = $this->crud->escape_string($form);

		$sql="DELETE FROM tbl_material_detail WHERE id='$id' ";
		if($this->crud->execute($sql)){
			$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Successfully deleted',
							'form' => $form
							); 
		}else{
			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Failed to delete'
							); 
		}
		return $data_response;
	}
	public function All_Material_Header($type){
		$type = $this->crud->escape_string($type);

		$sql="SELECT * FROM  tbl_material_header ";
		$result=$this->crud->getData($sql);
		if($result){
			foreach($result as $row){
		    		$data_response[] = array(
					  'name' => $row['name'],
					  'id' => base64_encode($this->customcrypt->getEncrypt($row["id"]))
					);
				}
		}else{
			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Failed to retrieve'
							); 
		}
		return $data_response;
	}
	public function Add_Type_Quiz($type,$quiz_type,$material_id,$material_page){
		$type = $this->crud->escape_string($type);
		$quiz_type = $this->crud->escape_string($quiz_type);
		$material_id = $this->customcrypt->getDecrypt(base64_decode($material_id));
		$material_page = $this->crud->escape_string($material_page);
		$admin_id = $_SESSION[$this->config->SESS().'_UID'];

		$sql="INSERT INTO tbl_quiz (type,material_header_id,material_page_id,admin_create_id,date_created) VALUES('$quiz_type','$material_id','$material_page','$admin_id',now())";
		if($this->crud->execute($sql)){
			$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Successfully Create'
							); 
		}else{
			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Failed to Add'
							); 
		}
		return $data_response;
	}

	
	public function All_Quiz($type){
		$type = $this->crud->escape_string($type);

		$sql="SELECT q.*,(SELECT h.name FROM tbl_material_header h WHERE h.id=q.material_header_id) AS name,(SELECT p.name FROM tbl_material_page p WHERE p.id=q.material_page_id) AS page_name FROM  tbl_quiz q ORDER BY date_created DESC";
		$result=$this->crud->getData($sql);
		if($result){
			foreach($result as $row){
				if($row['page_name']=="main_page"){
					$name="Cover page";
				}else{
					$name=$row['page_name'];
				}
		    		$data_response[] = array(
		    		  'name' => $row['name'],
		    		  'page_name' => $name,
					  'data_type' => $row['type'],
					  'question' => $row['question'],
					  'choices' => $row['choices'],
					  'answer' => $row['answer'],
					  'date_created' => $row['date_created'],
					  'id' => $row["id"]."|".$row['page_name']."|".$row['type']."|".$row['question']."|".$row['answer']."|".base64_encode($this->customcrypt->getEncrypt($row['material_header_id']))."|".$row['material_page_id']."|".$row['choices'],
					);
				}
		}else{
			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Failed to retrieve'
							); 
		}
		return $data_response;
	}

	public function Update_Quiz($type,$ans,$question,$data_id,$class_type,$choices,$material_page){
		$ans = $this->crud->escape_string($ans);
		$question = $this->crud->escape_string($question);
		$data_id = $this->crud->escape_string($data_id);
		$class_type = $this->crud->escape_string($class_type);
		$choices = $this->crud->escape_string($choices);
		$material_page = $this->crud->escape_string($material_page);
		$admin_id = $_SESSION[$this->config->SESS().'_UID'];

		switch ($type) {
			case 'tof':{
				$sql="UPDATE tbl_quiz SET answer='$ans', question='$question',material_page_id='$material_page', admin_update_id='$admin_id', date_update=now() WHERE id='$data_id'";
				if($this->crud->execute($sql)){
					$data_response = array(
									'result' => true,
									'type' => 'success',
									'message' => 'Successfully Update'
									); 
				}else{
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update'
									); 
				}
				return $data_response;
				break;
			}
			case 'idnf':{
				$sql="UPDATE tbl_quiz SET answer='$ans', question='$question',material_page_id='$material_page', admin_update_id='$admin_id', date_update=now() WHERE id='$data_id'";
				if($this->crud->execute($sql)){
					$data_response = array(
									'result' => true,
									'type' => 'success',
									'message' => 'Successfully Update'
									); 
				}else{
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update'
									); 
				}
				return $data_response;
				break;
			}
			case 'mc':{
				$sql="UPDATE tbl_quiz SET answer='$ans', question='$question',material_page_id='$material_page', admin_update_id='$admin_id', choices='$choices', date_update=now() WHERE id='$data_id'";
				if($this->crud->execute($sql)){
					$data_response = array(
									'result' => true,
									'type' => 'success',
									'message' => 'Successfully Update'
									); 
				}else{
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update'
									); 
				}
				return $data_response;
				break;
			}
			case 'mci':{
				$sql="UPDATE tbl_quiz SET answer='$ans', question='$question',material_page_id='$material_page', admin_update_id='$admin_id', choices='$choices', date_update=now() WHERE id='$data_id'";
				if($this->crud->execute($sql)){
					$data_response = array(
									'result' => true,
									'type' => 'success',
									'message' => 'Successfully Update'
									); 
				}else{
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update'
									); 
				}
				return $data_response;
				break;
			}
				
			
			default:
				return false;
				break;
		}

		
	}
	public function Delete_Quiz($type,$data_id){
		$type = $this->crud->escape_string($type);
		$data_id = $this->crud->escape_string($data_id);

		$sql="DELETE FROM tbl_quiz WHERE id='$data_id'";
		if($this->crud->execute($sql)){
			$data_response = array(
							'result' => true,
							'type' => 'success',
							'message' => 'Successfully Deleted'
							); 
		}else{
			$data_response = array(
							'result' => false,
							'type' => 'info',
							'message' => 'Failed to delete'
							); 
		}
		return $data_response;
	}

	public function Retrieve_Setting($type,$id){
		$type = $this->crud->escape_string($type);
		$id =$this->customcrypt->getDecrypt(base64_decode($id));

		switch ($type) {
			case 'requisite_quiz':{
				$sql="SELECT * FROM tbl_material_header WHERE id !='$id' ";
				$result=$this->crud->getData($sql);
				if($result){
					foreach($result as $row){
				    		$data_response[] = array(
				    		  'name' => $row['name'],
				    		  'id' => $row['id'],
							);
						}
				}else{
					$data_response = array(
						'result' => false,
						'type' => 'info',
						'message' => 'Failed to delete'
						); 
				}
				return $data_response;
				break;
			}
			case 'requisite_prop':{
				$sql="SELECT * FROM tbl_material_header WHERE id ='$id' ";
				$result=$this->crud->fetchSingleRow($sql);
				if($result){
					$data_response = array(
								'result' => true,
								'type' => 'info',
								'message' => 'Success retrieve',
				    		  'requisite' => $result['requisite'],
				    		  'quiz_item' => $result['quiz_item'],
				    		  'passing_grade' => $result['passing_grade'],
				    		  'id' => $result['id'],
							);
				}else{
					$data_response = array(
						'result' => false,
						'type' => 'info',
						'message' => 'Failed to delete'
						); 
				}
				return $data_response;
				break;
			}
				
			
			default:
				return false;
				break;
		}

		
	}
	public function Save_Setting($type,$id,$header_id,$quiz_item,$passing_grade){
		$type = $this->crud->escape_string($type);
		$id =$this->customcrypt->getDecrypt(base64_decode($id));
		$requisite = $this->crud->escape_string($header_id);
		$quiz_item = $this->crud->escape_string($quiz_item);
		$passing_grade = $this->crud->escape_string($passing_grade);

		switch ($type) {
			case 'save_setting_requisite':{
				$sql="SELECT id FROM tbl_quiz WHERE material_header_id='$id'";
				if($this->crud->countRows($sql) > $quiz_item){ 
		        	$sql="UPDATE tbl_material_header SET requisite='$requisite', quiz_item='$quiz_item', passing_grade='$passing_grade' WHERE id='$id'";
					if($this->crud->execute($sql)){
					$data_response = array(
									'result' => true,
									'type' => 'success',
									'message' => 'Successfully Update'
									); 
					return $data_response;
					break;
					}else{
						$data_response = array(
										'result' => false,
										'type' => 'info',
										'message' => 'Failed to update'
										);
					return $data_response;
					break;
					}
			    }else{
			        
					$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Failed to update, too many quizes'
									);
					return $data_response;
					break;
		        }

				
				
			}
				
			
			default:
				// code...
				break;
		}

	}

		
	public function Report($type){
		$type = $this->crud->escape_string($type);
		switch($type){
			case'report_quiz':{
				$sql="SELECT r.*,(SELECT CONCAT_WS(' ',u.fname,u.mname,u.lname) FROM tbl_user u WHERE u.id=r.user_id) AS stud_name,(SELECT h.name FROM tbl_material_header h WHERE h.id=r.material_id) AS name,(SELECT h.quiz_item FROM tbl_material_header h WHERE h.id=r.material_id) AS page FROM tbl_quiz_record r ORDER BY id DESC";
				$result=$this->crud->getData($sql);
				if(!$result){
					return 'false';
				}else{
					
					foreach ($result as $row) {
						$q_items=count((explode(",",$row['quiz_item'])));

						//$quiz_items=$row['quiz_item']*$row['page'];
						$data_response[] = array(
						'stud_name' => $row["stud_name"],
				     	'name' => $row["name"],
				     	'score' => $row["score"]."/".$q_items,
				     	'grade' => $row["grade"],
				     	'type' => $row["type"],
				     	'date_created' => $row["date_created"],
				     	'id' => $row["id"]
					    );
						
					}
					return $data_response;
					break;
				}
			}
			default:
			return false;
			break;
		}
	}

	public function Dashboard($type){
	$type = $this->crud->escape_string($type);
		switch($type){
			case'dashboard_count':{
				$sql="SELECT COUNT(id) AS admin,(SELECT COUNT(id) FROM tbl_user) AS user,(SELECT COUNT(id) FROM tbl_quiz) AS quiz,(SELECT COUNT(id) FROM tbl_quiz_record) AS record FROM tbl_administrator ";
				$result=$this->crud->fetchSingleRow($sql);
				if($result){
					$data_response = array(
				    		  'admin' => $result['admin'],
				    		  'user' => $result['user'],
				    		  'quiz' => $result['quiz'],
				    		  'record' => $result['record'],
							);
				}else{
					$data_response = array(
						'result' => false,
						'type' => 'info',
						'message' => 'Failed to delete'
						); 
				}
				return $data_response;
				break;
			}

			default:
			return false;
			break;
		}
	}

	private function Move_To_Folder1($newimage, $tmp)
    {
        $target_dir = "../../images/admin_images/";
        $target_file = $target_dir . basename($newimage);
        return move_uploaded_file($tmp, $target_file);
    }
    private function Move_To_Folder2($newimage, $tmp)
    {
        $target_dir = "../../images/user_images/";
        $target_file = $target_dir . basename($newimage);
        return move_uploaded_file($tmp, $target_file);
    }
    private function Move_To_Folder3($newimage, $tmp, $type)
    {
        $target_dir = "../../images/marketing-tools/".$type."/";
        $target_file = $target_dir . basename($newimage);
        return move_uploaded_file($tmp, $target_file);
    }
    private function Move_To_Folder4($newimage, $tmp)
    {
        $target_dir = "../files/docs/";
        $target_file = $target_dir . basename($newimage);
        return move_uploaded_file($tmp, $target_file);
    }
    private function Move_To_Folder5($newimage, $tmp)
    {
        $target_dir = "../../images/packages/";
        $target_file = $target_dir . basename($newimage);
        return move_uploaded_file($tmp, $target_file);
    }
    private function Move_To_Folder6($newimage, $tmp)
	{
		$target_dir = "../../images/product/product-960x960/";
		$target_file = $target_dir . basename($newimage);
	    return move_uploaded_file($tmp, $target_file);
	}
	private function Move_To_Folder7($newimage, $tmp)
	{
		$target_dir = "../../images/product/featured/";
		$target_file = $target_dir . basename($newimage);
	    return move_uploaded_file($tmp, $target_file);
	}
	private function Move_To_Folder8($newimage, $tmp)
	{
		$target_dir = "../../images/supplier/";
		$target_file = $target_dir . basename($newimage);
	    return move_uploaded_file($tmp, $target_file);
	}
	private function Move_To_Folder9($newimage, $tmp)
	{
		$target_dir = "../../images/product/category/";
		$target_file = $target_dir . basename($newimage);
	    return move_uploaded_file($tmp, $target_file);
	}
	private function Move_To_Folder10($newimage, $tmp)
	{
		$target_dir = "../../images/product/sub-category/";
		$target_file = $target_dir . basename($newimage);
	    return move_uploaded_file($tmp, $target_file);
	}
	

	public function Send_Credentials_Moderator($email, $role ,$fname, $password, $url)
    {
        $logo = 'https://trans4m.com.ph/hotlink-ok/trans4m_color.png';
        $apikey = 'api-93B5E008142211EB8729F23C91C88F4E';

        $to=$email;

        $sender='Trans4m Support Team<support@trans4m.com.ph>';

        $subject='T4M: Moderator Credentials.';

        $html_body='
<div style="background-color:#f2f3f5;padding:20px">
    <div style="max-width:600px;margin:0 auto"> 
        <div style="background:#fff;font:14px sans-serif;color:#686f7a;border-top:4px solid #42B9D3;margin-bottom:20px">        
            <div style="border-bottom:1px solid #f2f3f5;">        
                <img width="200" style="max-width:200px;display:block;margin-left:auto; margin-right:auto; " tabindex="0" src="'.$logo.'">        
            </div>
            <div style="padding:0px 30px">        
                <div style="font-size:16px;line-height:1.5em;border-bottom:1px solid #f2f3f5;padding-bottom:10px;margin-bottom:20px">        
                    <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a>Greetings '.ucfirst($role).' '.ucfirst($fname).',</p>        
                    <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a>Thank you for the support and being part of the Big Boss Marketing. Review and update your '.ucfirst($role).' profile. You can sign-in to the admin portal using the sign-in credentials below. Reminder that your password is temporary, please secure your account password and verify your email address.</p> 
                    <p style="text-align:center; margin: 0;"><a style="text-decoration:none;color:#000"></a>email: '.$email.'<br />password: '.$password.'</p>

                    <a  href = "'.$url.'" style="background-color:#42B9D3; border:none; color:white; padding:10px 15px; text-align:center; text-decoration:none;font-size:12px;display:block;margin-left:auto;margin-right:auto;max-width:150px;border-radius:5px;" target="_blank">Login</a>     
                      
                    <p style="text-align:center; margin: 0;"><a style="text-decoration:none;color:#000;"></a>or click the link below.</p>       
                    <a style="word-wrap:break-word;font-size:12px;word-break: break-all;"  href = "'.$url.'" >'.$url.'</a>          
                    <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a>If you believe this email was sent to you by mistake, please ingnore this email.</p>             
                    <p style="text-align:center;"><a style="text-decoration:none;color:#000"></a>See you inside!<br /><b>T4M Support Team</b></p>        
                </div>
                <div style="font:11px sans-serif;color:#686f7a">
                <p style="margin: 0;">© 2021. Trans4m Inc.</p>        
                </div>        
            </div>  
        </div>
    </div>
</div>
     ';
        
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($curl, CURLOPT_POST, 1);
        curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
        curl_setopt($curl, CURLOPT_URL, "https://api.smtp2go.com/v3/email/send");
        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode(array(

            "api_key" => $apikey,
            "to" => array(0 => $to),
            "sender" => $sender,
            "subject" => $subject,
            "html_body" => $html_body,
            "text_body" => $subject

        )));

        $result = curl_exec($curl);
        $object = json_decode($result, true);
	    if($object['data']['succeeded'] >= 1){
	     return true;
	    }else{
	     return false;
	    }
    }
}
?>





