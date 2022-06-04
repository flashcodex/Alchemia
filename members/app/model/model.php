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
	private function User_Data($type){
	   $usercookie = json_decode($this->customcrypt->getDecrypt($_COOKIE[$this->config->cookie_user()]), true);
       if($usercookie){ 
       	 return $usercookie[$type];
       }else{
         return "";
       }
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
	public function convertNumberToWord($num = false)
	{
	    $num = str_replace(array(',', ' '), '' , trim($num));
	    if(! $num) {
	        return false;
	    }
	    $num = (int) $num;
	    $words = array();
	    $list1 = array('', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven',
	        'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
	    );
	    $list2 = array('', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety', 'hundred');
	    $list3 = array('', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion',
	        'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quattuordecillion',
	        'quindecillion', 'sexdecillion', 'septendecillion', 'octodecillion', 'novemdecillion', 'vigintillion'
	    );
	    $num_length = strlen($num);
	    $levels = (int) (($num_length + 2) / 3);
	    $max_length = $levels * 3;
	    $num = substr('00' . $num, -$max_length);
	    $num_levels = str_split($num, 3);
	    for ($i = 0; $i < count($num_levels); $i++) {
	        $levels--;
	        $hundreds = (int) ($num_levels[$i] / 100);
	        $hundreds = ($hundreds ? ' ' . $list1[$hundreds] . ' hundred' . ' ' : '');
	        $tens = (int) ($num_levels[$i] % 100);
	        $singles = '';
	        if ( $tens < 20 ) {
	            $tens = ($tens ? ' ' . $list1[$tens] . ' ' : '' );
	        } else {
	            $tens = (int)($tens / 10);
	            $tens = ' ' . $list2[$tens] . ' ';
	            $singles = (int) ($num_levels[$i] % 10);
	            $singles = ' ' . $list1[$singles] . ' ';
	        }
	        $words[] = $hundreds . $tens . $singles . ( ( $levels && ( int ) ( $num_levels[$i] ) ) ? ' ' . $list3[$levels] . ' ' : '' );
	    } //end for loop
	    $commas = count($words);
	    if ($commas > 1) {
	        $commas = $commas - 1;
	    }
	    return implode(' ', $words);
	}
	public function imagettftextSp($image, $size, $angle, $x, $y, $color, $font, $text, $spacing = 0)
	{        
	  if ($spacing == 0){
	  	imagettftext($image, $size, $angle, $x, $y, $color, $font, $text);
	  }else{
			$temp_x = $x;
			$temp_y = $y;
			for ($i = 0; $i < strlen($text); $i++){
				imagettftext($image, $size, $angle, $temp_x, $temp_y, $color, $font, $text[$i]);
				$bbox = imagettfbbox($size, 0, $font, $text[$i]);
				$temp_x += cos(deg2rad($angle)) * ($spacing + ($bbox[2] - $bbox[0]));
				$temp_y -= sin(deg2rad($angle)) * ($spacing + ($bbox[2] - $bbox[0]));	
			}
		}
	}
	private function _error($type,$description,$username){
       $sql="INSERT INTO tbl_error_execution (type,description,username) VALUES('$type','$description','$username')";
       $result=$this->crud->execute($sql);
       return true;
	} 
	private function Check_Username()
	{
		$check=true;
		while ($check){
			$username='8'.substr(time(),3).rand(10,99);
	        $sql="SELECT username FROM tbl_user WHERE username='$username'";
			if($this->crud->countRows($sql) >= 1){ 
	        	$check=true;
		    }else{
	        	$check=false;
	        }
    	}
    	return $username;
	}
	private function get_string_between($string, $start, $end){
	    $string = ' ' . $string;
	    $ini = strpos($string, $start);
	    if ($ini == 0) return '';
	    $ini += strlen($start);
	    $len = strpos($string, $end, $ini) - $ini;
	    return substr($string, $ini, $len);
	}
	private function Check_Address($region,$province,$city,$brgy)
	{
		$sql="SELECT * FROM refbrgy WHERE brgyCode='$brgy' AND regCode='$region' AND provCode='$province' AND citymunCode='$city'";
		if($this->crud->fetchSingleRow($sql)){
			return true;
		}else{
			return false;
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
	     	'region' => $row["regDesc"],
	     	'code' => $row["regCode"]
		    );
			}
		}
			return $data;
	}
	private function Get_Province($region)
	{
		$sql="SELECT * FROM refprovince WHERE regCode='$region'";
		$result=$this->crud->getData($sql);
		if(!$result){
		}else{
			foreach ($result as $row) {
		    $data['province'][] = array(
	     	'province' => $row["provDesc"],
	     	'code' => $row["provCode"]
		    );
			}
		}
			return $data;
	}
	private function Get_City($region,$province)
	{
		$sql="SELECT * FROM refcitymun WHERE regCode='$region' AND provCode='$province'";
		$result=$this->crud->getData($sql);
		if(!$result){
		}else{
			foreach ($result as $row) {
		    $data['city'][] = array(
	     	'city' => $row["citymunDesc"],
	     	'code' => $row["citymunCode"]
		    );
			}
		}
			return $data;
	}
	private function Get_Barangay($region,$province,$city)
	{
		$sql="SELECT * FROM refbrgy WHERE regCode='$region' AND provCode='$province' AND citymunCode='$city'";
		$result=$this->crud->getData($sql);
		if(!$result){
		}else{
			foreach ($result as $row) {
		    $data['brgy'][] = array(
	     	'brgy' => $row["brgyDesc"],
	     	'code' => $row["brgyCode"]
		    );
			}
		}
			return $data;
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
	private function Address_Availability($addr_region,$addr_province,$addr_city,$addr_barangay,$region_id,$province_id,$city_id,$brgy_id,$product)
	{
		if(!$region_id){
			return true;
		}else{
			$arr_region=explode(',',$region_id);
			if(!in_array($addr_region,$arr_region)){
				return 'This package ('.$product.') is not availble to your region';
			}else{
				if(!$province_id){
					return true;
				}else{
					$sql="SELECT * FROM refprovince WHERE provCode IN (".$province_id.") AND regCode='$addr_region'";
					$result=$this->crud->fetchSingleRow($sql);
					if(!$result){
						return true;
					}else{
						$arr_province=explode(',',$province_id);
						if(!in_array($addr_province,$arr_province)){
							return 'This package ('.$product.') is not availble to your province';
						}else{
							if(!$city_id){
								return true;
							}else{
								$sql="SELECT * FROM refcitymun WHERE citymunCode IN (".$city_id.") AND provCode='$addr_province'";
								$result=$this->crud->fetchSingleRow($sql);
								if(!$result){
									return true;
								}else{
									$arr_city=explode(',',$city_id);
									if(!in_array($addr_city,$arr_city)){
										return 'This package ('.$product.') is not availble to your city';
									}else{
										if(!$brgy_id){
											return true;
										}else{
											$sql="SELECT * FROM refbrgy WHERE brgyCode IN (".$brgy_id.") AND citymunCode='$addr_city'";
											$result=$this->crud->fetchSingleRow($sql);
											if(!$result){
												return true;
											}else{
												$arr_brgy=explode(',',$brgy_id);
												if(!in_array($addr_barangay,$arr_brgy)){
													return 'This package ('.$product.') is not availble to your barangay';
												}else{
													return true;
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	private function Address_Name($type,$street,$postal,$addr_region,$addr_province,$addr_city,$addr_barangay)
	{
		$sql="SELECT CONCAT('$street',', ',(SELECT brgyDesc FROM refbrgy WHERE brgyCode='$addr_barangay'),', ',(SELECT citymunDesc FROM refcitymun WHERE citymunCode='$addr_city'),', ',(SELECT provDesc FROM refprovince WHERE provCode='$addr_province'),', ',regDesc,', ','$postal',' - ','$type') AS address FROM refregion WHERE regCode='$addr_region'";
		$result=$this->crud->fetchSingleRow($sql);
		if(!$result){
			return false;
		}else{
			return $result['address'];
		}
	}
	public function User_Profile($type,$image,$tmp,$avatar,$imgtype){
		$type=$this->crud->escape_string($type);
		$avatar=$this->crud->escape_string($avatar);
  		$imgtype=$this->crud->escape_string($imgtype);
		$username=$this->User_Data('user_name');
		$userid=$this->User_Data('user_id');
		$data_country=array();
		$data_response=array();
		$data_avatar=array();
		switch ($type) {
			case 'profile':{
				$sql="SELECT u.*,b.*,IFNULL(u.mobile,'') AS mobile,IFNULL(u.city,'') AS city,IFNULL(u.lname,'') AS lname,CASE WHEN u.city IS NULL OR u.city='' THEN c.country_name ELSE CONCAT_WS(', ',u.city,c.country_name) END AS address FROM tbl_user u RIGHT JOIN tbl_country c ON u.country=c.iso RIGHT JOIN tbl_user_bank_info b ON b.user_id=u.id WHERE u.id='$userid'";
				$result=$this->crud->fetchSingleRow($sql);
				if(!$result){
					return false;
					break;
				}else{
					$data_response['profile']=$result;
					$path = "../../../images/avatars";
					if($path){
						$files = scandir($path);
						if($files){
					    foreach ($files as $value) {
					    	if($value == '.' || $value == '..'){
					    	}else{
					      		$data_avatar['avatar'][]=array('value'=>$value);
					    	}
					    }
						}
					}
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
					// $sql="SELECT * FROM tbl_payout_option WHERE status=1";
					// $result=$this->crud->getData($sql);
					// if(!$result){
					// }else{
					// 	foreach ($result as $row) {
	    //           $data_bank['bank'][] = array(
	    //           'mop_code' => $row["mop_code"],
	    //           'description' => $row["description"]
	    //           );
	    //       }
	    //     }
				}
				return array_merge($data_response,$data_country,$data_avatar,$this->Get_Region());
				break;
			}
			case 'save_profile_image':{
				$sql = "SELECT image FROM tbl_user WHERE id='$userid'";
				$result = $this->crud->fetchSingleRow($sql);
				if(!$result){
					$data_response = array(
						'result' => false,
						'type' => 'error',
						'message' => 'Failed to upload image'        
					);
				}else{
					$arr = explode('-', $result['image']);
					if($result['image'] != 'default.png' && $arr[0] != 'avatar'){
						unlink("../../../images/user_images/".$result['image']);
					}
					if($imgtype == "avatar"){
						$sql="UPDATE tbl_user set image = '$avatar' WHERE id='$userid'";
			            $result=$this->crud->update($sql);
			            if(!$result){
			            	$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'Nothing changes'        
							);
			            }else{
			            	$data=array();
						    $sql="SELECT * FROM tbl_user WHERE id='$userid'";
						    $result = $this->crud->fetchSingleRow($sql);
						    if($result){
						         $data = array(
							        'user_id' => $result['id'], 
							        'user_name' => $result['username'], 
							        'user_email' => $result['email'], 
							        'user_fname' =>  $result['fname'], 
							        'user_mname' =>  $result['mname'], 
							        'user_lname' => $result['lname'], 
							        'user_mobile' => $result['mobile'], 
							        'user_image' => $result['image'],
                	    //'user_sponsor' => $result['sponsor_id']
							    );
						        //setcookie($this->config->cookie_user(), $this->customcrypt->getEncrypt(json_encode($data)), time() + (86400 * intval($_SESSION['user_days_to_remember'])), "/", $this->config->CookieDomainConfig(), 1);
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
									'image' => $avatar           
								);
						    }
			            }
					}else{
						$sql = "SELECT image FROM tbl_user WHERE id='$userid'";
						$result = $this->crud->fetchSingleRow($sql);
						$newimage=$this->Get_Image_Code('tbl_user', 'image', 'IMAGE', 14, $image);
						if($this->Move_To_Folder1($newimage, $tmp)){
				            $sql="UPDATE tbl_user set image = '$newimage' WHERE id='$userid'";
				            $result=$this->crud->update($sql);
				            if(!$result){
				            	$data_response = array(
									'result' => false,
									'type' => 'info',
									'message' => 'Nothing changes'        
								);
				            }else{
				            	$data=array();
						        $sql = "SELECT * FROM tbl_user WHERE id='$userid'";
						        $result = $this->crud->fetchSingleRow($sql);
						        if($result){
						            $data = array(
							        'user_id' => $result['id'], 
							        'user_name' => $result['username'], 
							        'user_email' => $result['email'], 
							        'user_fname' =>  $result['fname'], 
							        'user_mname' =>  $result['mname'], 
							        'user_lname' => $result['lname'], 
							        'user_mobile' => $result['mobile'], 
							        'user_image' => $result['image'],
                	   				//'user_sponsor' => $result['sponsor_id']
							    );
						        //setcookie($this->config->cookie_user(), $this->customcrypt->getEncrypt(json_encode($data)), time() + (86400 * intval($_SESSION['user_days_to_remember'])), "/", $this->config->CookieDomainConfig(), 1);
						            $data_response = array(
										'result' => true,
										'type' => 'success',
										'message' => 'Save changes',
										'image' => $newimage            
									);
						        }else{
						            $data_response = array(
										'result' => true,
										'type' => 'success',
										'message' => 'Save changes',
										'image' => $newimage            
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

	public function User_Verify($type,$val,$pin)
	{
		
		$type = $this->crud->escape_string($type);
		$val = $this->crud->escape_string($val);
		$pin = $this->crud->escape_string($pin);
		$userid = $this->User_Data('user_id');
		$fname = $this->User_Data('user_fname');
		$username = $this->User_Data('user_name');
		switch ($type) {
			case 'verify_email':{
				$sql="SELECT * FROM tbl_user WHERE email='$val' AND email_verified=1";
				$result=$this->crud->fetchSingleRow($sql);
				if($result){
					return $val.' is not available. Please try again with different email address.';
				}else{
					$pin = random_int(100000, 999999);
					// $_SESSION['signup_pin'] = 111111;
					$sql="UPDATE tbl_user_verification SET pin='$pin',date_requested=NOW(),date_expired=DATE_ADD(NOW(), INTERVAL 10 MINUTE) WHERE user_id='$userid' AND status=0 AND type='email'";
					if(!$this->crud->update($sql)){
						$sql="INSERT INTO tbl_user_verification (user_id,type,pin,date_requested,date_expired) VALUES('$userid','email','$pin',NOW(),DATE_ADD(NOW(), INTERVAL 1000 MINUTE))";
						if(!$this->crud->execute($sql)){
							return 'Sorry, looks like there are some errors detected. Please try again.';
						}
					}
					try{
						$notify=$this->email->notify_user("get_code", $pin, strtolower($val),  $fname);
						return 'verify';
					}catch(Exception $e){
						return 'Sorry, looks like there are some errors detected. Please try again.';
					}
				}
				break;
			}
			case 'verify_code_email':{
				$sql="SELECT * FROM tbl_user WHERE email='$val' AND email_verified=1";
				$result=$this->crud->fetchSingleRow($sql);
				if($result){
					return $val.' is not available. Please try again with different email address.';
				}else{
					$sql="SELECT * FROM tbl_user_verification WHERE user_id='$userid' AND type='email' AND status=0";
					$result=$this->crud->fetchSingleRow($sql);
					if(!$result){
						return 'Sorry, looks like there are some errors detected. Please request PIN again.';
					}else{
						date_default_timezone_set('Asia/Manila');
						if($result['date_expired'] < $this->TODAY()){
	                        return "This PIN is already expired.";
		    			}else{
							if($pin!=$result['pin']){
								return 'Incorrect PIN. Please try again';
							}else{
								$sql="UPDATE tbl_user u,tbl_user_verification v SET u.email='$val',u.email_verified=1,v.status=1 WHERE u.id='$userid' AND v.user_id='$userid' AND v.type='email'";
								if($this->crud->update($sql)){
									return true;
								}else{
									return 'Sorry, looks like there are some errors detected. Please request PIN again.(-1)';
								}
							}
		    			}
					}
				}
				break;
			}
			// case 'verify_mobile':{
			// 	$sql="SELECT * FROM tbl_user WHERE mobile='$val' AND mobile_verified=1";
			// 	$result=$this->crud->fetchSingleRow($sql);
			// 	if($result){
			// 		return '+63 '.$val.' is not available. Please try again with different mobile number.';
			// 	}else{
			// 		$pin = random_int(100000, 999999);
			// 		// $_SESSION['signup_pin'] = 111111;
			// 		$sql="UPDATE tbl_user_verification SET pin='$pin',date_requested=now(),date_expired=DATE_ADD(NOW(), INTERVAL 5 MINUTE) WHERE user_id='$userid' AND status=0 AND type='mobile'";
			// 		if(!$this->crud->update($sql)){
			// 			$sql="INSERT INTO tbl_user_verification (user_id,type,pin,date_expired) VALUES('$userid','mobile','$pin',DATE_ADD(NOW(), INTERVAL 5 MINUTE))";
			// 			if(!$this->crud->execute($sql)){
			// 				return 'Sorry, looks like there are some errors detected. Please try again.';
			// 			}
			// 		}
			// 		$result = require_once "../otp/send_otp.php";
			// 		if(!$result){
			// 			return 'Sorry, looks like there are some errors detected. Make sure your mobile number is correct.';
			// 		}else{
			// 			return 'verify';
			// 		}
			// 	}
			// 	break;
			// }
			// case 'verify_code_mobile':{
			// 	$sql="SELECT * FROM tbl_user WHERE mobile='$val' AND mobile_verified=1";
			// 	$result=$this->crud->fetchSingleRow($sql);
			// 	if($result){
			// 		return '+63 '.$val.' is not available. Please try again with different mobile number.';
			// 	}else{
			// 		$sql="SELECT * FROM tbl_user_verification WHERE user_id='$userid' AND type='mobile' AND status=0";
			// 		$result=$this->crud->fetchSingleRow($sql);
			// 		if(!$result){
			// 			return 'Sorry, looks like there are some errors detected. Please request OTP again.';
			// 		}else{
			// 			if($result['date_expired'] < $this->TODAY()){
	  //                       return "This OTP is already expired.";
		 //    			}else{
			// 				if($pin!=$result['pin']){
			// 					return 'Incorrect OTP. Please try again';
			// 				}else{
			// 					$sql="UPDATE tbl_user u,tbl_user_verification v SET u.mobile='$val',u.mobile_verified=1,v.status=1 WHERE u.id='$userid' AND v.user_id='$userid' AND v.type='mobile'";
			// 					if($this->crud->update($sql)){
			// 						$sql="UPDATE tbl_user SET mobile_verified=1 WHERE gold_tag='$username'";
			// 						if(!$this->crud->update($sql)){
			// 							//do nothing;
			// 						}
			// 						return true;
			// 					}else{
			// 						return 'Sorry, looks like there are some errors detected. Please request OTP again.(-1)';
			// 					}
			// 				}
		 //    			}
			// 		}
			// 	}
			// 	break;
			// }
			default:
				return false;
				break;
		}
	}
	public function Fetch_Options($type,$option)
	{
		$type = $this->crud->escape_string($type);
		$option = $this->crud->escape_string($option);
		$userid=  $this->User_Data('user_id');
		$month = $this->TODAY_DATE("month");
		$monthname = $this->TODAY_DATE("monthname");
		$year = $this->TODAY_DATE("year");
		$data_gensale=array();
		$data_cart=array();
		$data_default['default']=$year;
     	switch($type)
            {
                case 'all_options': { 
                    $sql="SELECT YEAR(date_created) as year FROM tbl_user_gensales WHERE owner='$userid' AND product_type!='package' GROUP BY YEAR(date_created) ORDER BY YEAR(date_created) DESC";
                    $result = $this->crud->getData($sql);
                    if($result){
                      	foreach ($result as $row) {
						   	$data_gensale['gensale'][] =array(  
						        'year' => $row['year'],
						    );	
						}
                    }  
                    $sql="SELECT YEAR(date_confirmed) as year FROM tbl_cart_header WHERE user_id='$userid' AND product_type!='package' GROUP BY YEAR(date_confirmed) ORDER BY YEAR(date_confirmed) DESC";
                    $result = $this->crud->getData($sql);
                    if($result){
                      foreach ($result as $row) {
						   	$data_cart['cart'][] =array(  
						        'year' => $row['year'],
						    );	
						}
                    }
                    return array_merge($data_cart,$data_gensale,$data_default);
                    break; 
                }
                case 'chart5_options': { 
 					if($option =='DAY'){
                    		$sql="SELECT YEAR(date_created) as year, MONTHNAME(date_created) as `monthname`, MONTH(date_created) as `month` FROM tbl_user_gensales WHERE date_created IS NOT NULL AND owner='$userid' GROUP BY MONTH(date_created),YEAR(date_created) ORDER BY DATE(date_created) DESC";
                    }else{
                    		$sql="SELECT YEAR(date_created) as year FROM tbl_user_gensales WHERE  owner='$userid' GROUP BY YEAR(date_created) ORDER BY YEAR(date_created), MONTH(date_created) DESC";
                    }
                    $result = $this->crud->getData($sql);
                    if($result){
                      	return $result;
                    }else{
                    	if($option =='DAY'){
                    		$data_default['default']=array(
                    			'month'=>$month,
                    			'monthname'=>$monthname,
                    			'year'=>$year
                    		);
                    		return $data_default;
                    	}else{
                    		return $data_default; 
                    	}
                    }   
                    break; 
               }
                case 'chart6_options': { 
 					if($option =='DAY'){
                    		$sql="SELECT YEAR(date_confirmed) as year, MONTHNAME(date_confirmed) as `monthname`, MONTH(date_confirmed) as `month` FROM tbl_cart_header WHERE date_confirmed IS NOT NULL AND user_id='$userid' GROUP BY YEAR(date_confirmed), MONTH(date_confirmed) ORDER BY DATE(date_confirmed) DESC";
                    }else{
                    		$sql="SELECT YEAR(date_confirmed) as year FROM tbl_cart_header WHERE  user_id='$userid' GROUP BY YEAR(date_confirmed) ORDER BY YEAR(date_confirmed), MONTH(date_confirmed) DESC";
                    }
                    $result = $this->crud->getData($sql);
                    if($result){
                      return $result;
                    }else{
                    	if($option =='DAY'){
                    		$data_default['default']=array(
                    			'month'=>$month,
                    			'monthname'=>$monthname,
                    			'year'=>$year
                    		);
                    		return $data_default;
                    	}else{
                    		return $data_default; 
                    	}
                    }
                }
          }
 	}

      public function Fetch_Reseller($type,$option,$search)
      {
      	$type = $this->crud->escape_string($type);
      	$option = $this->crud->escape_string($option);
      	$search = $this->crud->escape_string($search);
        switch ($type) {
        	case 'fetch_reseller':
        			if($search == 'all_options')
        			{
        				$sql ="SELECT * FROM tbl_marketing_tools WHERE type='$option' AND status=1 ORDER BY date_created DESC";
        			}else
        			{
        				$sql ="SELECT * FROM tbl_marketing_tools WHERE type='$option' AND status=1 AND tags LIKE '%".$search."%' ORDER BY date_created DESC";
        			}
        		  	
				  $result = $this->crud->getData($sql);
				  if($result){ 
	                    return $result;    
	                	break; 
	               }else{
	                   return false;    
	                   break; 
	               }
        	
        	default:
        		return false;
        		break;
        }
      }
      public function Fetch_Reseller_Options($type,$option,$selected)
      {
      	$type = $this->crud->escape_string($type);
      	$option = $this->crud->escape_string($option);
      	$selected = $this->crud->escape_string($selected);
        switch ($type) {
        	case 'fetch_reseller':
        		  $sql ="SELECT * FROM tbl_marketing_tools WHERE type='$option' AND status=1";
				  $result = $this->crud->getData($sql);
				  if($result){ 
	                    return $result;    
	                	break; 
	               }else{
	                   return false;    
	                   break; 
	               }
        	
        	default:
        		return false;
        		break;
        }
      }
	public function Save_User_Profile($type,$fname,$lname,$mname,$city,$country,$phonecode,$mobile,$email,$bday,$c_password,$n_password,$v_password,$acc_name,$acc_number,$mop,$acc_mobile)
	{
	    $type = $this->crud->escape_string($type);
	    $fname = $this->crud->escape_string($fname);
	    $lname = $this->crud->escape_string($lname);
	    $mname = $this->crud->escape_string($mname);
	    $mobile = $this->crud->escape_string($mobile);
	    $country = $this->crud->escape_string($country);
	    $email = $this->crud->escape_string($email);
	    $city = $this->crud->escape_string($city);
	    $phonecode = $this->crud->escape_string($phonecode);
	    $bday = $this->crud->escape_string($bday);
	    $c_password = $this->crud->escape_string($c_password);
        $n_password = $this->crud->escape_string($n_password);
        $v_password = $this->crud->escape_string($v_password);
        $acc_name = $this->crud->escape_string($acc_name);
	    $acc_number = $this->crud->escape_string($acc_number);
	    $mop = $this->crud->escape_string($mop);
	    $acc_mobile = $this->crud->escape_string($acc_mobile);

	    $username = $this->User_Data('user_name');
	    $userid=  $this->User_Data('user_id');
	    $data_response=array();
	    switch ($type) {
	    	case 'save_personal_info':{
	    		$sql="UPDATE tbl_user SET fname=TRIM('$fname'),lname=TRIM('$lname'),mname=TRIM('$mname') WHERE id='$userid' AND status=1";
	    		break;
	    	}
	    	case 'save_contact_info':{
	    		$sql="UPDATE tbl_user SET country='$country',city='$city' WHERE id='$userid' AND status=1";
	    		break;
	    		// ,phone_code='$phonecode',mobile='$mobile'
	    	}
	    	case 'save_account_info':{
	    		$sql="UPDATE tbl_user SET birthday='$bday' WHERE id='$userid' AND status=1";
	    		break;
	    	}
	    	case 'save_bank_info':{
	    		$sql="UPDATE tbl_user_bank_info SET acc_name='$acc_name',acc_number='$acc_number',acc_mobile='$acc_mobile',mop='$mop',date_update=now() WHERE user_id='$userid'";
	    		$result=$this->crud->update($sql);
	    		if(!$result){
		    		return false;
		    	}else{
		    		return true;
		    	}
	    		break;
	    	}
	    	case 'save_change_pass':{
	    		$sql = "SELECT password FROM tbl_user WHERE id='$userid' AND status=1";
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
							$sql="UPDATE tbl_user SET password='$v_password' WHERE id='$userid' AND status=1";
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
			$sql = "SELECT * FROM tbl_user WHERE id='$userid'";
			$result = $this->crud->fetchSingleRow($sql);
			if($result){
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
				//setcookie($this->config->cookie_user(), $this->customcrypt->getEncrypt(json_encode($data)), time() + (86400 * intval($_SESSION['user_days_to_remember'])), "/", $this->config->CookieDomainConfig(), 1);
			return true;
		    }else{
		    return true;
		    }
    	}
	}
	public function Dashboard($type,$val,$search)
	{
		$type = $this->crud->escape_string($type);
		$search = $this->crud->escape_string($search);
		$val = $this->crud->escape_string($val);
		$userid=  $this->User_Data('user_id');
		switch ($type) {
			case 'fetch_material_header':{
				// $sql="SELECT * FROM tbl_material_header WHERE module='$val' ORDER BY CAST(SUBSTRING(name,LOCATE(' ',name)+1) AS SIGNED)";


					// SELECT `modules`.* , `user_modules`.`status` 
					// , (SELECT count(id) FROM `tbl_material_page` as `tmp` WHERE `modules`.id = `tmp`.material_header_id) as `module_topics` 
					// , (SELECT count(id) FROM `tbl_user_topics` as `tut` WHERE `modules`.id = `tut`.`module_id`  AND `tut`.`user_id` = 44) as `user_module_topics` 
					// FROM `tbl_material_header` as `modules` 
					// LEFT JOIN `tbl_user_modules` AS `user_modules` ON `user_modules`.`module` = `modules`.`id` AND `user_modules`.`user_id` = 44 
					// ORDER BY `number` ASC

				// print_r($userid);

				// $sql="SELECT `modules`.* , `user_modules`.`status` as `user_status` 
				// , (SELECT count(id) FROM `tbl_material_page` as `tmp` WHERE `modules`.id = `tmp`.material_header_id) as `topics` 
				// , (SELECT count(id) FROM `tbl_user_topics` as `tut` WHERE `modules`.id = `tut`.`module_id`  AND `tut`.`user_id` = 44) as `user_topics` 
				// FROM `tbl_material_header` as `modules` 
				// LEFT JOIN `tbl_user_modules` AS `user_modules` ON `user_modules`.`module` = `modules`.`id` AND `user_modules`.`user_id` = 44 
				// ORDER BY `number` ASC";

				$group_modules = ' GROUP BY modules.id ';

				if($search)
				{
					$group_modules = '';
				}

				$sql="SELECT `modules`.* , `user_modules`.`status`  as `user_status` , `tbl_topics`.`name` as topic_name
					, (SELECT count(id) FROM `tbl_material_page` as `tmp` WHERE `modules`.id = `tmp`.material_header_id) as `topics` 
					, (SELECT count(id) FROM `tbl_user_topics` as `tut` WHERE `modules`.id = `tut`.`module_id`  AND `tut`.`user_id` = $userid) as `user_topics`
					 FROM `tbl_material_header` as `modules`
					 LEFT JOIN `tbl_material_page` AS  `tbl_topics` ON `modules`.`id` = `tbl_topics`.`material_header_id` 
					 LEFT JOIN `tbl_user_modules` AS `user_modules` ON `user_modules`.`topic_id` = `modules`.`id` AND `user_modules`.`user_id` = $userid
					 WHERE `modules`.`module`='$val' AND `modules`.`status` = 1 AND (`modules`.`name` LIKE '%$search%' OR `tbl_topics`.`name` LIKE '%$search%')
					--  GROUP BY modules.id
					$group_modules
					 ORDER BY number ASC";

				if($this->crud->countRows($sql) >= 1){
					$result=$this->crud->getData($sql);
					
						if(!$result){
							return false;
						}else{
							foreach ($result as $row) {
								$lessons=" ";
								$id = $row["id"];
								$sql="Select tbl_material_page.name from tbl_material_page where material_header_id =$id";
										$result2=$this->crud->getData($sql);
								foreach ($result2 as $srow) {
								$lessons .= "- ".$srow["name"]."<br>";
								}
								$data_response[] = array(
								'user_status' => $row["user_status"],
								'topics' => $row["topics"],
								'user_topics' => $row["user_topics"],
						     	'name' => $row["name"],
								'topic_name' => $row["topic_name"],
						     	'status' => $row["status"],
						     	'date_created' => $row["date_created"],
						     	'id' => $row["id"],
								'lessons' => $lessons
							    );
								
							}
							return $data_response;
							break;
						}
				}else{
					$data_response = array(
						'result' => false, // ito yung false.
						'type' => 'info',
						'message' => 'No module published available'    
					);
					return $data_response;
					break;
				
				}
				
			}
				
			
			default:
				return false;
				break;
		}
	}
	public function Material($type,$id){
		$type = $this->crud->escape_string($type);
		$userid=  $this->User_Data('user_id');
		$id=  $this->crud->escape_string($id);

		switch ($type) {
			case 'material_name':{
				$sql="SELECT * FROM tbl_material_header WHERE id='$id'";
				$result = $this->crud->fetchSingleRow($sql);
					if($result){
						return $result;
				  }else{
				    return false;
				  }
				break;
			}
			case'material_list':{
				$sql="SELECT * FROM tbl_material_page WHERE material_header_id='$id' ORDER BY number ASC";
				$result=$this->crud->getData($sql);
				if(!$result){
					return false;
				}else{
					foreach ($result as $row) {
						$data_response[] = array(
						'with_quiz' => $row["with_quiz"],
				     	'name' => $row["name"],
				     	'id' => $row["id"]
					    );
					}
					return $data_response;
					break;
				}
			}
			case'material_details':{
				$sql="SELECT d.*,(SELECT p.setting FROM tbl_material_page p WHERE p.id='$id') AS p_setting FROM tbl_material_detail d WHERE d.material_page_id='$id' ORDER BY d.data_arrange ASC";
						$result = $this->crud->getData($sql);
						if($result){
							foreach($result as $row){
					    		$data_response[] = array(
					    		  'data_type' => $row['type'],
					    		  'data_arrange' => $row['data_arrange'],
					    		  'content' => $row['content'],
					    		  'setting' => $row['setting'],
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
							return $data_response;
							break;
						}
			}
				
			
			default:
				return false;
				break;
		}
	}

	public function Quiz($type,$id,$quiz_item){
		$type = $this->crud->escape_string($type);
		$userid=  $this->User_Data('user_id');
		$id=  $this->crud->escape_string($id);
		$quiz_item = $this->crud->escape_string($quiz_item);

		$quiz=array();
		date_default_timezone_set('Asia/Manila');

		$sql="SELECT h.*,(SELECT COUNT(p.id) FROM tbl_material_page p WHERE p.material_header_id=h.id) AS page FROM tbl_material_header h WHERE id='$id'";
		$result = $this->crud->fetchSingleRow($sql);
		$header=$result['name'];
		$quiz_items1=$result['quiz_item'];
		$quiz_items=$result['quiz_item']*$result['page'];

			switch ($type) {
				case 'quiz_fetch':{
					 $sql="SELECT id FROM tbl_quiz_record WHERE material_id='$id' AND user_id='$userid' AND type!='passed' AND type='taking' ORDER BY id DESC";
							if($this->crud->countRows($sql) >= 1){

								$sql="SELECT * FROM tbl_quiz_record WHERE material_id='$id' AND user_id='$userid' AND type!='passed' ORDER BY id DESC";
								$result = $this->crud->fetchSingleRow($sql);
								if($result['date_limit'] < $this->TODAY() && $result['type']=="taking"){
									$sql="UPDATE tbl_quiz_record SET score='0',grade='0',type='failed_complete' WHERE id=".$result['id']." ORDER BY id DESC ";
									if($this->crud->execute($sql)){
										$data_response = array(
											'result' => false,
											'type' => 'info',
											'message' => 'Failed to complete,this will be recorded.',
											'id'=> $id
										);
										return $data_response;
										break;
									}else{
										$data_response = array(
											'result' => false,
											'type' => 'info',
											'message' => 'Failed to update.Server error',
											'id'=> $id
										);
										return $data_response;
										break;
									}
								}else{
									$q_items=count((explode(",",$result['quiz_item'])));
									$data_response = array(
										'result' => false,
										'type' => 'info',
										'message' => 'Please provide answer to the quiz',
										'quiz_item' => $result['quiz_item'],
										'header' => $header,
										'count_qi' => $q_items,
										'date_limit' => $result['date_limit'],
										'id'=> $id
									);
									return $data_response;
									break;
								}

				        	
					    }else{
					    	if($result['quiz_item']==0){
					    		$data_response = array(
										'result' => false,
										'type' => 'info',
										'message' => 'No quizes provide yet',
										'id'=> $id
									);
									return $data_response;
									break;
					    	}else{
					    		//$sql="SELECT * FROM tbl_quiz  WHERE material_header_id='$id' ORDER BY RAND() LIMIT ".($result['quiz_item']*$result['page']);

					    		$sql="SELECT q.* FROM tbl_quiz q WHERE q.material_header_id='$id' GROUP BY q.material_page_id";
									$result = $this->crud->getData($sql);
									if($result){
										foreach($result as $row){
												$sql1 ="SELECT * FROM tbl_quiz WHERE material_header_id='$id' AND material_page_id=".$row['material_page_id']." AND type != 'mci' ORDER BY RAND() LIMIT ".$quiz_items1;
												$result1 = $this->crud->getData($sql1);
												foreach($result1 as $row1){
													$quiz[] = array(
									    		   $row1['id'],
												  );
												}
										}
										$data_response = array(
											'result' => true,
											'type' => 'success',
											'message' => 'No quizes provide yet',
											'id'=> $id,
											'quiz_item'=> $quiz
										);
										return $data_response;
										break;
									}
					    	}		
						}
				}
				case'quiz_fetch_add':{
				$sql="SELECT id FROM tbl_quiz_record WHERE user_id='$userid' AND type='taking' ORDER BY id DESC";
					if($this->crud->countRows($sql) >= 1){
						$sql="SELECT * FROM tbl_quiz_record WHERE user_id='$userid' AND type='taking' ORDER BY id DESC";
								$result = $this->crud->fetchSingleRow($sql);
								if($result){
									$data_response = array(
											'result' => false,
											'type' => 'info',
											'message' => 'Redirecting to current quiz',
											'id'=> $result['material_id']
										);
										return $data_response;
					    			break;
								}else{
									$data_response = array(
											'result' => false,
											'type' => 'info',
											'message' => 'Failed to retrieve',
										);
										return $data_response;
					    			break;
								}
					}else{
						$sql="INSERT INTO tbl_quiz_record (user_id,material_id,quiz_item,type,date_created,date_limit)VALUES('$userid','$id','$quiz_item','taking',now(),DATE_ADD(NOW(), INTERVAL 1440 MINUTE))";
									$result=$this->crud->execute($sql);
						    		if(!$result){
						    			$data_response = array(
												'result' => false,
												'type' => 'info',
												'message' => 'Cant add quiz',
												'id'=> $id
											);
											return $data_response;
						    			break;
						    		}else{
						    			$data_response = array(
												'result' => true,
												'type' => 'success',
												'message' => 'Successfully create new quiz,please answer correctly',
												'id'=> $id
											);
						    			return $data_response;
						    			break;
						    		}
					}
							
				}
				case'quiz_fetch_data':{
						$sql="SELECT q.*,(SELECT name FROM tbl_material_page p WHERE p.id=q.material_page_id) AS page FROM tbl_quiz q WHERE q.id='$quiz_item'";
						$result = $this->crud->fetchSingleRow($sql);
						if($result){
								if($result['page']=="main_page"){
									$page="main_page";
								}else{
									$page=$result['page'];
								}
								$data_response = array(
												'id' => $result['id'],
												'page' => $result['page'],
												'type' => $result['type'],
												'question' => $result['question'],
												'choices' => $result['choices'],
												'answer'=> $result['answer']
											);
		    			return $data_response;
		    			break;
						}else{
		    			$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'server error'.$quiz_item
							);
		    			return $data_response;
		    			break;
		    		}
				}
				
				
				default:
					return false;
					break;
			}
	}
	public function Quiz_Check($type,$header,$score,$data_id){
		$userid=  $this->User_Data('user_id');
		$type = $this->crud->escape_string($type);
		$header=  $this->crud->escape_string($header);
		$score = $this->crud->escape_string($score);
		$data_id = $this->crud->escape_string($data_id);
		$quiz_count = $this->crud->escape_string($data_id);
		
		date_default_timezone_set('Asia/Manila');

		$sql="SELECT h.*,(SELECT COUNT(p.id) FROM tbl_material_page p WHERE p.material_header_id=h.id) AS page FROM tbl_material_header h WHERE id='$header'";
		$result = $this->crud->fetchSingleRow($sql);
		$header_name=$result['name'];
		$quiz_items=$result['quiz_item']*$result['page'];
		$passing=$result['passing_grade'];
		

		switch ($type) {
			case 'quiz_checked':{
					$sql="SELECT * FROM tbl_quiz_record WHERE material_id='$header' AND user_id='$userid' AND type='taking'";
					$result = $this->crud->fetchSingleRow($sql);
					if($result)
					{
						$server_url = $_SERVER['HTTP_HOST'];

						$postdata = array(
							'lesson_id' => $header,
							'user_id' => $userid,
							'quiz_id' => $result['id'],
							'question_id' => $data_id,
							// 'answer' => $result['answer'],
							'type' => 'correct',
						);										

						if (strpos($server_url, 'localhost') !== false) 
						{
							$url = "http://localhost/public/api/quiz/record";
						}
						else
						{
							$url = "https://pamantasanalchemia.com/public/api/quiz/record";
						}

						$curl = curl_init($url);
						curl_setopt($curl, CURLOPT_HEADER, false);
						curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
						curl_setopt($curl, CURLOPT_POST, true);
						curl_setopt($curl, CURLOPT_POSTFIELDS, $postdata);

						$json_response = curl_exec($curl);
						$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
						curl_close($curl);

						if($result['quiz_item_passed']=="")
						{
							$sql="UPDATE tbl_quiz_record SET score='$score',quiz_item_passed='$data_id' WHERE material_id='$header' AND user_id='$userid' AND type='taking'";
							$this->crud->execute($sql);
						}
						else
						{
							$sql="UPDATE tbl_quiz_record SET score='$score',quiz_item_passed='".$result['quiz_item_passed'].",".$data_id."' WHERE material_id='$header' AND user_id='$userid' AND type='taking'";
							$this->crud->execute($sql);
						}
						
						return true;
						break;
					}
					else
					{
		    			$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'server error failed to retrieve'
							);
		    			return $data_response;
		    			break;
		    		}
				break;
			}
			case 'quiz_failed':{
				$sql="SELECT * FROM tbl_quiz_record WHERE material_id='$header' AND user_id='$userid' AND type='taking'";
				$result = $this->crud->fetchSingleRow($sql);
					if($result)
					{
						$server_url = $_SERVER['HTTP_HOST'];

						$postdata = array(
							'lesson_id' => $header,
							'user_id' => $userid,
							'quiz_id' => $result['id'],
							'question_id' => $data_id,
							// 'answer' => $result['answer'],
							'type' => 'wrong',							
						);										

						if (strpos($server_url, 'localhost') !== false) 
						{
							$url = "http://localhost/public/api/quiz/record";
						}
						else
						{
							$url = "https://pamantasanalchemia.com/public/api/quiz/record";
						}
						
						$curl = curl_init($url);
						curl_setopt($curl, CURLOPT_HEADER, false);
						curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
						curl_setopt($curl, CURLOPT_POST, true);
						curl_setopt($curl, CURLOPT_POSTFIELDS, $postdata);

						$json_response = curl_exec($curl);
						$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
						curl_close($curl);

						if($result['quiz_item_failed']=="")
						{
								$sql="UPDATE tbl_quiz_record SET  quiz_item_failed='$data_id' WHERE material_id='$header' AND user_id='$userid' AND type='taking'";
								$this->crud->execute($sql);
						}
						else
						{
								$sql="UPDATE tbl_quiz_record SET  quiz_item_failed='".$result['quiz_item_failed'].",".$data_id."' WHERE material_id='$header' AND user_id='$userid' AND type='taking'";
								$this->crud->execute($sql);
						}
						return true;
						break;
					}
					else
					{
		    			$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'server error failed to retrieve'
							);
		    			return $data_response;
		    			break;
		    		}

				break;
			}
			case 'quiz_checking':{
					$sql="SELECT * FROM tbl_quiz_record WHERE material_id='$header' AND user_id='$userid' AND type='taking'";
					$result = $this->crud->fetchSingleRow($sql);
					if($result){

						// $q_items=count((explode(",",$result['quiz_item'])));

						// $test_type=($result['score']/$q_items)*100;

						$test_type=($score/$quiz_count)*100;

						if($test_type >= $passing)
						{
							$type="passed";
						}
						else
						{
							$type="failed";
						}
								$sql="UPDATE tbl_quiz_record SET score='$score',type='$type',grade='".round($test_type)."' WHERE material_id='$header' AND user_id='$userid' AND type='taking'";
								if($this->crud->execute($sql))
								{
									$server_url = $_SERVER['HTTP_HOST'];

									if($type == "passed")
									{
										$postdata = array(
											'lesson_id' => $header,
											'user_id' => $userid,
										);										

										if (strpos($server_url, 'localhost') !== false) 
										{
											$url = "http://localhost/public/api/unlock-module";
										}
										else
										{
											$url = "https://pamantasanalchemia.com/public/api/unlock-module";
										}

										// $url = "http://localhost/public/api/unlock-module";

										$curl = curl_init($url);
										curl_setopt($curl, CURLOPT_HEADER, false);
										curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
										curl_setopt($curl, CURLOPT_POST, true);
										curl_setopt($curl, CURLOPT_POSTFIELDS, $postdata);

										$json_response = curl_exec($curl);
										$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
										curl_close($curl);
									}

									$data_response = array(
											'result' => true,
											'type' => 'success',
											'message' => 'Redirecting to result',
											'id' => $result['id'],
											// 'data' => $data
										);
					    			return $data_response;
					    			break;
								}else{
				    			$data_response = array(
										'result' => false,
										'type' => 'info',
										'message' => 'server error failed to retrieve',
									);
				    			return $data_response;
				    			break;
				    		}

					}else{
		    			$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'server error failed to retrieve'
							);
		    			return $data_response;
		    			break;
		    		}
			}
				
			
			default:
				return false;
				break;
		}

	}
	public function Report($type){
		$userid=$this->User_Data('user_id');
		$type = $this->crud->escape_string($type);
		switch($type){
			case'report_quiz':{
				$sql="SELECT r.*,(SELECT h.name FROM tbl_material_header h WHERE h.id=r.material_id) AS name,(SELECT h.quiz_item FROM tbl_material_header h WHERE h.id=r.material_id) AS page FROM tbl_quiz_record r WHERE r.user_id='$userid'";
				$result=$this->crud->getData($sql);
				if(!$result){
					return 'false';
				}else{
					
					foreach ($result as $row) {
						$q_items=count((explode(",",$row['quiz_item'])));

						//$quiz_items=$row['quiz_item']*$row['page'];
						$data_response[] = array(
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

	public function Viewresult($type,$val){
		$type = $this->crud->escape_string($type);
		$val = $this->crud->escape_string($val);
		$userid=$this->User_Data('user_id');
		$sql="SELECT r.*,(SELECT h.name FROM tbl_material_header h WHERE h.id=r.material_id) AS name FROM tbl_quiz_record r WHERE id='$val' AND user_id='$userid'";
		$result = $this->crud->fetchSingleRow($sql);
		if($result){
			$q_items=count((explode(",",$result['quiz_item'])));
				$data_response = array(
				     	'name' => $result["name"],
				     	'score' => $result["score"]."/".$q_items,
				     	'grade' => $result["grade"],
				     	'quiz_item' => $result["quiz_item"],
				     	'quiz_item_passed' => $result["quiz_item_passed"],
				     	'quiz_item_failed' => $result["quiz_item_failed"],
				     	'type' => $result["type"],
				     	'date_created' => $result["date_created"],
				     	'id' => $result["id"]
					    );
						return $data_response;
		}else{
							$data_response = array(
								'result' => false,
								'type' => 'info',
								'message' => 'server error failed to retrieve'
							);
		    			return $data_response;
		}
	}
	public function Viewresult_Append($type,$val,$qi){
		$type = $this->crud->escape_string($type);
		$val = $this->crud->escape_string($val);
		$userid=$this->User_Data('user_id');

		switch ($type) {
			case 'viewresult_append':{
				$sql="SELECT q.*,(SELECT h.name FROM tbl_material_header h WHERE h.id=q.material_header_id) AS material_name,(SELECT p.name FROM tbl_material_page p WHERE p.id=q.material_page_id) AS page_name FROM tbl_quiz q WHERE q.id='$qi'";
				$result = $this->crud->fetchSingleRow($sql);
				if($result){

									if($result['page_name']=="main_page"){
											$page="Main Page";
										}else{
											$page=$result['page_name'];
										}
					
						$data_response = array(
						     	'question' => $result["question"],
						     	'material_name' => $result["material_name"],
						     	'material_header_id' => $result["material_header_id"],
						     	'page_name' => $result["page_name"],
						     	'material_page_id' => $result["material_page_id"],
						     	'id' => $result["id"],
							    );
								return $data_response;
				}else{
									$data_response = array(
										'result' => false,
										'type' => 'info',
										'message' => 'server error failed to retrieve'
									);
				    			return $data_response;
				}
				// code...
				break;
			}
			case 'viewresult_append_passed':{
				$sql="SELECT q.*,(SELECT h.name FROM tbl_material_header h WHERE h.id=q.material_header_id) AS material_name,(SELECT p.name FROM tbl_material_page p WHERE p.id=q.material_page_id) AS page_name FROM tbl_quiz q WHERE q.id='$qi'";
				$result = $this->crud->fetchSingleRow($sql);
				if($result){

									if($result['page_name']=="main_page"){
											$page="Main Page";
										}else{
											$page=$result['page_name'];
										}
					
						$data_response = array(
						     	'question' => $result["question"],
						     	'material_name' => $result["material_name"],
						     	'material_header_id' => $result["material_header_id"],
						     	'page_name' => $result["page_name"],
						     	'material_page_id' => $result["material_page_id"],
						     	'id' => $result["id"],
							    );
								return $data_response;
				}else{
									$data_response = array(
										'result' => false,
										'type' => 'info',
										'message' => 'server error failed to retrieve'
									);
				    			return $data_response;
				}
				// code...
				break;
			}
				
			
			default:
				// code...
				break;
		}

	}
	public function Flashcard($type,$val){
		$type = $this->crud->escape_string($type);
		$val = $this->crud->escape_string($val);
		switch ($type) {
			case 'flashcard_view':{
				$sql="SELECT p.* FROM tbl_material_page p WHERE p.material_header_id='$val'";
				$result=$this->crud->getData($sql);
				if(!$result){
					return 'false';
				}else{
					foreach ($result as $row) {
						$page_id=$row['id'];
						$sql1="SELECT d.* FROM tbl_quiz d WHERE d.material_page_id='$page_id' AND type='idnf'";
						$result1=$this->crud->getData($sql1);
						if(!$result){
							$data_response='false';
							break;
						}else{
							foreach ($result1 as $row1) {
								$data_response[] = array(
						     	'content' => $row1["question"],
						     	'ans' => $row1["answer"],
							    );
							}
						}
					}

					return $data_response;
					break;
				}
				break;
			}
				
			
			default:
				return 'false';
				break;
		}
	}

	private function Move_To_Folder1($newimage, $tmp)
    {
        $target_dir = "../../../images/user_images/";
        $target_file = $target_dir . basename($newimage);
        return move_uploaded_file($tmp, $target_file);
    }
    private function Move_To_Folder2($newimage, $tmp)
    {
        $target_dir = "../../../images/kyc-id/";
        $target_file = $target_dir . basename($newimage);
        return move_uploaded_file($tmp, $target_file);
    }
    private function Move_To_Folder3($newimage, $tmp, $type)
    {
        $target_dir = "../../../images/payment/".$type."/";
        if(!file_exists($target_dir)){
					mkdir($target_dir);
				}
        $target_file = $target_dir . basename($newimage);
        return move_uploaded_file($tmp, $target_file);
    }
}
?>



