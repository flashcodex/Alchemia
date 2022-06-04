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

	private function _error($type,$description,$username){
       $sql="INSERT INTO tbl_error_execution (type,description,username) VALUES('$type','$description','$username')";
       $result=$this->crud->execute($sql);
       return true;
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

	public function User_Signup($fname,$lname,$mobile,$username,$email,$cpassword,$pin,$agree)
	{

       	$fname=ucwords($this->crud->escape_string($fname));
       	$lname=ucwords($this->crud->escape_string($lname));
       	$phonecode='63';
       	$mobile=$this->crud->escape_string($mobile);
       	$username=$this->crud->escape_string($username);
       	$email=strtolower($this->crud->escape_string($email));
       	$password=md5($this->crud->escape_string($cpassword));
       	// $sponsor_id=$this->crud->escape_string($sponsor_id);
       	$pin=$this->crud->escape_string($pin);
       	$agree=($this->crud->escape_string($agree)=='on')? 1:0;
		
		
		$sql="SELECT phonecode FROM tbl_country WHERE phonecode='$phonecode'";
					if(!$this->crud->fetchSingleRow($sql)){
						return "Phone code is not valid, Please select valid phone code";
					}else{
						$sql="SELECT email FROM tbl_user WHERE email = '$email'";
						if($this->crud->countRows($sql) != 0){
							return "Email is already registered!";
						}else{
							$sql="SELECT username FROM tbl_user WHERE username = '$username'";
							if($this->crud->countRows($sql) != 0){
								return "User ID is not available!";
							}else{
								// if($pin=='no_pin'){
								// 	$_SESSION['signup_pin'] = random_int(100000, 999999);
								// 	// $_SESSION['signup_pin'] = 111111;
								// 	return 'verify';
							 // 	   	try{
								// 		$notify=$this->email->notify_user("get_code", $_SESSION['signup_pin'], strtolower($email),  $fname);
								// 	}catch(Exception $e){
								// 		return 'Sorry, looks like there are some errors detected, please try again.';
								// 	}
								// }else{
									

										$sql="INSERT INTO tbl_user (username, password, fname, lname, email, email_verified, phone_code, mobile, agreement) VALUES ('$username', '$password', TRIM('$fname'), TRIM('$lname'), '$email', 0, '$phonecode', '$mobile',  '2')";
										$new_user=$this->crud->executeReturnLastexactID($sql);
										if($new_user==false){
											$this->_error('insert','insert new user','system');
											return 'Sign-up failed!(-1)';
										}else{
											$notify=$this->email->notify_user("welcome_email", $username, strtolower($email),  $fname);
											return true;
											}
										}
									}
								}
	}
	public function Find_Sponsor($sponsor)
	{
        $sponsor = $this->crud->escape_string($sponsor);
		$sql="SELECT id FROM tbl_user WHERE username='$sponsor'";
	    $result = $this->crud->fetchSingleRow($sql);
        if($result){
        	return $result['id'];
        }else{
          	return false;
        }
    }
    public function User_Verifyplacement($sponsor,$val)
    {
    	$val=strtolower($this->crud->escape_string($val));
    	$sponsor=strtolower($this->crud->escape_string($sponsor));
    	$sql="SELECT * FROM tbl_user WHERE username='$sponsor'";
    	$result=$this->crud->fetchSingleRow($sql);
    	if(!$result){
    		return "Sponsor does't not exist";
    	}else{
    		$arr=json_decode($result['placement_list'],true);
    		$sponsor_id=$result['id'];
    		$sql="SELECT * FROM tbl_user WHERE sponsor_id='$sponsor_id' OR placement_id='$sponsor_id'";
    		$result=$this->crud->getData($sql);
    		$new_arr=array();
    		if($result){
    			foreach ($result as $row) {
    				$new_arr = array_merge($new_arr,json_decode($row['placement_list'],true));
    			}
    		}
    		// return $new_arr;
    		$arr = array_unique(array_merge($arr,$new_arr));
    		$sql="SELECT id,IFNULL(my_left,'') AS my_left,IFNULL(my_right,'') AS my_right FROM tbl_user WHERE username='$val'";
    		$result=$this->crud->fetchSingleRow($sql);
    		if(!$result){
    			return "Placement does't not exist";
    		}else{
	    		if(array_search($result['id'],$arr)===false){
	    			return 'Placement you entered is not under your sponsor';
	    		}else{
	    			$data = array(
	    				'result'=>true,
	    				'R'=>$result['my_right'],
	    				'L'=>$result['my_left'],
	    			);
	    			return $data;
	    		}
    		}
    	}
    }
    private function Gold_Mechanics($sponsor,$sponsor_id,$fname,$lname,$phonecode,$mobile,$username,$password,$package,$pkg_max_pair)
    {
    	$count=0;
    	// $lg_username='8'.substr(time(),3).rand(10,99);//'lg'.$username;
    	$lg_username=$this->Check_Username();
    	$position="L";
    	$gold_tag='underL@'.$username;
    	//$lg_username=strtolower($this->Get_CODE('tbl_user', 'username', $lg_username, 5));
    	$sql="INSERT INTO tbl_user (username, password, fname, lname, email, email_verified, phone_code, mobile, agreement, max_pair, gold_tag) VALUES ('$lg_username','$password', TRIM('$fname'), TRIM('$lname'),'$gold_tag', 0, '$phonecode', '$mobile', 1, '$pkg_max_pair','$username')";
		$lg_user=$this->crud->executeReturnLastexactID($sql);
		if($lg_user==false){
			$this->_error('insert','insert new L-user(gold)',$lg_user);
			return 'Sign-up failed!(-1)';
		}else{
			$sql="SELECT * FROM tbl_user WHERE username='$sponsor'";
			$result=$this->crud->fetchSingleRow($sql);
			if(!$result){
				return "Placement does't not exist(-3)";
			}else{
				$placement_id=$result['id'];
				$uni_level_pl=json_decode($result['uni_level'],true);
				$lineup=json_decode($result['my_upper_lineup'],true);
				$q_lineup=array();//added
				foreach ($lineup as $row) {
					$sql="SELECT * FROM tbl_user WHERE id='$row'";
					$result=$this->crud->fetchSingleRow($sql);
					$pl_list_placement=json_decode($result['placement_list'],true);
					array_push($pl_list_placement,$lg_user);
					if($result['placement_id']!=0) //added
					{ array_push($q_lineup,$result['position'].$result['placement_id']); } //added 
					$sql="UPDATE tbl_user SET placement_list='".json_encode($pl_list_placement)."' WHERE id='$row'";
					if(!$this->crud->update($sql)){
						return 'Update Placement failed!(-4)';
					}
				}
				array_unshift($lineup,$lg_user);
				array_unshift($q_lineup,$position.$placement_id);//added
				array_unshift($uni_level_pl,$lg_user);
				$sql="UPDATE tbl_user SET my_left='$lg_user' WHERE username='$sponsor' AND my_left IS NULL";
				if(!$this->crud->update($sql)){
					$this->_error('update','update placement placement list',$sponsor);
					return 'Sign-up failed!(-33)';
				}else{
					$sql="UPDATE tbl_user SET sponsor_id='$sponsor_id',my_upper_lineup='".json_encode($lineup)."',uni_level='".json_encode($uni_level_pl)."',placement_id='$placement_id',position='L',placement_list='[".$lg_user."]',package='$package' WHERE id='$lg_user'";
					if(!$this->crud->update($sql)){
								$this->_error('update','update new user',$lg_user);
								return 'Sign-up failed(-5)!';
					}else{
							$kyc_id=$this->Get_CODE('tbl_kyc_details', 'kyc_id', "kyc", 7);
							$sql="INSERT INTO tbl_kyc_details (kyc_id,user_id) VALUES('$kyc_id','$lg_user')";
							if(!$this->crud->execute($sql)){
								$this->_error('insert','insert new kyc',$lg_user);
							}
							++$count;
					}
				}
			}
		}
		// $rg_username='8'.substr(time(),3).rand(10,99); //'rg'.$username;
		$rg_username=$this->Check_Username();
		$position="R";
		$gold_tag='underR@'.$username;
		//$rg_username=strtolower($this->Get_CODE('tbl_user', 'username', $rg_username, 5));
    	$sql="INSERT INTO tbl_user (username, password, fname, lname, email, email_verified, phone_code, mobile, agreement, max_pair, gold_tag) VALUES ('$rg_username','$password', TRIM('$fname'), TRIM('$lname'),'$gold_tag', 0, '$phonecode', '$mobile', 1, '$pkg_max_pair','$username')";
		$rg_user=$this->crud->executeReturnLastexactID($sql);
		if($rg_user==false){
			$this->_error('insert','insert new R-user(gold)',$rg_user);
			return 'Sign-up failed!(-1)';
		}else{
			$sql="SELECT * FROM tbl_user WHERE username='$sponsor'";
			$result=$this->crud->fetchSingleRow($sql);
			if(!$result){
				return "Placement does't not exist(-3)";
			}else{
				$placement_id=$result['id'];
				$uni_level_pl=json_decode($result['uni_level'],true);
				$lineup=json_decode($result['my_upper_lineup'],true);
				$q_lineup=array();//added
				foreach ($lineup as $row) {
					$sql="SELECT * FROM tbl_user WHERE id='$row'";
					$result=$this->crud->fetchSingleRow($sql);
					$pl_list_placement=json_decode($result['placement_list'],true);
					array_push($pl_list_placement,$rg_user);
					if($result['placement_id']!=0) //added
					{ array_push($q_lineup,$result['position'].$result['placement_id']); } //added 
					$sql="UPDATE tbl_user SET placement_list='".json_encode($pl_list_placement)."' WHERE id='$row'";
					if(!$this->crud->update($sql)){
						return 'Update Placement failed!(-4)';
					}
				}
				array_unshift($lineup,$rg_user);
				array_unshift($q_lineup,$position.$placement_id);//added
				array_unshift($uni_level_pl,$rg_user);
				$sql="UPDATE tbl_user SET my_right='$rg_user' WHERE username='$sponsor' AND my_right IS NULL";
				if(!$this->crud->update($sql)){
					$this->_error('update','update placement placement list',$sponsor);
					return 'Sign-up failed!(-33)';
				}else{
					$sql="UPDATE tbl_user SET sponsor_id='$sponsor_id',my_upper_lineup='".json_encode($lineup)."',uni_level='".json_encode($uni_level_pl)."',placement_id='$placement_id',position='R',placement_list='[".$rg_user."]',package='$package' WHERE id='$rg_user'";
					if(!$this->crud->update($sql)){
								$this->_error('update','update new user',$rg_user);
								return 'Sign-up failed(-5)!';
					}else{
							$kyc_id=$this->Get_CODE('tbl_kyc_details', 'kyc_id', "kyc", 7);
							$sql="INSERT INTO tbl_kyc_details (kyc_id,user_id) VALUES('$kyc_id','$rg_user')";
							if(!$this->crud->execute($sql)){
								$this->_error('insert','insert new kyc',$rg_user);
							}
							++$count;
					}
				}
			}
		}
		if($count!=2){
			return false;
		}else{
			return true;
		}
    }
 }
?>





