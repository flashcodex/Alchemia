<?php
include_once 'email_curl.php';
Class Send_Email {
	private $email;
	public function __construct() {
		$this->email_curl= new Email_Curl();
	}
	public function notify_user($type, $url, $email, $fname)
    {
    	switch ($type) {
    		case 'login_attempt':
                $result = $this->email_curl->send_email($email, $this->email_setup("sender"), $this->email_content($type, $fname, $url), $this->email_setup($type));
                if($result){
                	return true;
                }else{
                	throw new Exception("Failed sending email.");
                }
    			break;
        case 'forgot-pass':
                $result = $this->email_curl->send_email($email, $this->email_setup("sender"), $this->email_content($type, $fname, $url), $this->email_setup($type));
                if($result){
                  return true;
                }else{
                  throw new Exception("Failed sending email.");
                }
          break;
        case 'pin_number_email': 
                $result = $this->email_curl->send_email($email, $this->email_setup("sender"), $this->email_content($type, $fname, $url), $this->email_setup($type));
                if($result){
                  return true;
                }else{
                  throw new Exception("Failed sending email.");
                }
          break;
        case 'verify_email': 
                $result = $this->email_curl->send_email($email, $this->email_setup("sender"), $this->email_content($type, $fname, $url), $this->email_setup($type));
                if($result){
                  return true;
                }else{
                  throw new Exception("Failed sending email.");
                }
          break;
    		default:
    			throw new Exception("Undefined Action!");
    			break;
    	}
    }
	private function email_setup($type){
      switch ($type) {
      case 'email_logo':
          return 'https://pamantasanalchemia.com/images/logo/logo/logo-icon-alchemia.png';
          break;
      case 'sender':
          return 'Alchemia Support Team<support@pamantasanalchemia.com>';
          break;
  		case 'login_attempt':
  		    return 'Alchemia: Suspicious login attempt!';
  		    break;
      case 'pin_number_email':
          return 'Alchemia Admin: Admin PIN';
          break;
      case 'verify_email':
          return 'Alchemia: Confirm Account Email';
          break;
      case 'forgot-pass':
          return 'Alchemia: Account Reset Password';
          break;
      	default:
      		return '';
      		break;
      }
	}
    private function email_content($type, $fname, $url){
        switch ($type) {
        	case 'login_attempt':
        		return '<div style="background-color:#f2f3f5;padding:20px">
							    <div style="max-width:600px;margin:0 auto"> 
							        <div style="background:#fff;font:14px sans-serif;color:#686f7a;border-top:4px solid #42B9D3;margin-bottom:20px">        
							            <div style="border-bottom:1px solid #f2f3f5;">        
							                <img width="200" style="max-width:200px;display:block;margin-left:auto; margin-right:auto; " tabindex="0" src="'.$this->email_setup("email_logo").'">        
							            </div>
							            <div style="padding:0px 30px">        
							                <div style="font-size:16px;line-height:1.5em;border-bottom:1px solid #f2f3f5;padding-bottom:10px;margin-bottom:20px">        
							                    <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a> Hi '.ucfirst($fname).',</p>        
							                    <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a>We have detected a suspicious login attempt on your account. Hurry up '.ucfirst($fname).'!, Secure your account!.</p>        
							                    <a href = "'.$url.'" style="background-color:#42B9D3; border:none; color:white; padding:10px 15px; text-align:center; text-decoration:none;font-size:12px;display:block;margin-left:auto;margin-right:auto;max-width:150px;border-radius:5px;" target="_blank">Secure Account</a>       
							                    <p style="text-align:center; margin: 0;"><a style="text-decoration:none;color:#000;"></a>or click the link below.</p>       
							                    <a style="word-wrap:break-word;font-size:12px;word-break: break-all;"  href = "'.$url.'" >'.$url.'</a>          
							                    <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a>If you are having problems with the button above, copy and paste the link above in your browser.</p>             
							                    <p style="text-align:center;"><a style="text-decoration:none;color:#000"></a><b>Alchemia Support Team</b></p>        
							                </div>
							                <div style="font:11px sans-serif;color:#686f7a">
							                <p style="margin: 0;">© 2021. Alchemia Inc.</p>        
							                </div>        
							            </div>  
							        </div>
							    </div>
							</div>';
        		break;
          case 'pin_number_email':
            return '<div style="background-color:#f2f3f5;padding:20px">
                    <div style="max-width:600px;margin:0 auto"> 
                      <div style="background:#fff;font:14px sans-serif;color:#686f7a;border-top:4px solid #42B9D3;margin-bottom:20px">    
                        <div style="border-bottom:1px solid #f2f3f5;">        
                          <img width="200" style="max-width:200px;display:block;margin-left:auto; margin-right:auto; " tabindex="0" src="'.$this->email_setup("email_logo").'">        
                        </div>
                            <div style="padding:0px 30px">        
                          <div style="font-size:16px;line-height:1.5em;border-bottom:1px solid #f2f3f5;padding-bottom:10px;margin-bottom:20px">        
                            <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a> Hi '.ucfirst($fname).',</p>        
                            <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a>Your request has already been processed. The PIN below is only valid for 5 minutes. To proceed in your request please enter this Identification Number (PIN): </p>        
                            <h1 style="text-align:center;letter-spacing: 10px;">'.$url.'</h1>    
                            <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a>If you did not request this code, it is possible that someone else is trying to access your account.<b> Do not forward or give this code to anyone</b>. The code will expire in 5 Minutes.</p>             
                            <p style="text-align:center; margin: 0;"><a style="text-decoration:none;color:#000"></a>See you inside!<br /><b>Alchemia Support Team</b></p>        
                          </div>
                              <div style="font:11px sans-serif;color:#686f7a">
                          <p style="margin: 0;">© 2021. Alchemia Inc.</p>    
                          </div>        
                        </div>  
                      </div>
                    </div>
                  </div>';
            break;
          case 'verify_email':
            return '<div style="background-color:#f2f3f5;padding:20px">
                  <div style="max-width:600px;margin:0 auto"> 
                      <div style="background:#fff;font:14px sans-serif;color:#686f7a;border-top:4px solid #42B9D3;margin-bottom:20px">        
                          <div style="border-bottom:1px solid #f2f3f5;">        
                              <img width="200" style="max-width:200px;display:block;margin-left:auto; margin-right:auto; " tabindex="0" src="'.$this->email_setup("email_logo").'">        
                          </div>
                          <div style="padding:0px 30px">        
                              <div style="font-size:16px;line-height:1.5em;border-bottom:1px solid #f2f3f5;padding-bottom:10px;margin-bottom:20px">        
                                  <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a> Hi '.ucfirst($fname).',</p>        
                                  <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a>Account Created Successfully! You can also confirm your account email by visiting the link below.</p>        
                                  <a href = "'.$url.'" style="background-color:#42B9D3; border:none; color:white; padding:10px 15px; text-align:center; text-decoration:none;font-size:12px;display:block;margin-left:auto;margin-right:auto;max-width:150px;border-radius:5px;" target="_blank">Confirm Account</a>       
                                  <p style="text-align:center; margin: 0;"><a style="text-decoration:none;color:#000;"></a>or click the link below.</p>       
                                  <a style="word-wrap:break-word;font-size:12px;word-break: break-all;"  href = "'.$url.'" >'.$url.'</a>          
                                  <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a>If you are having problems with the button above, copy and paste the link above in your browser.</p>             
                                  <p style="text-align:center;"><a style="text-decoration:none;color:#000"></a><b>Alchemia Support Team</b></p>        
                              </div>
                              <div style="font:11px sans-serif;color:#686f7a">
                              <p style="margin: 0;">© 2021. Alchemia Inc.</p>        
                              </div>        
                          </div>  
                      </div>
                  </div>
              </div>';
            break;
           case 'forgot-pass':
            return '<div style="background-color:#f2f3f5;padding:20px">
                  <div style="max-width:600px;margin:0 auto"> 
                      <div style="background:#fff;font:14px sans-serif;color:#686f7a;border-top:4px solid #F64E60;margin-bottom:20px">        
                          <div style="border-bottom:1px solid #f2f3f5;">        
                              <img width="200" style="max-width:200px;display:block;margin-left:auto; margin-right:auto; " tabindex="0" src="'.$this->email_setup("email_logo").'">        
                          </div>
                          <div style="padding:0px 30px">        
                              <div style="font-size:16px;line-height:1.5em;border-bottom:1px solid #f2f3f5;padding-bottom:10px;margin-bottom:20px">        
                                  <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a> Hi '.ucfirst($fname).',</p>        
                                  <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a>You reset your account password by clicking the button below, The button and link is valid only for 10 minutes.</p>        
                                  <a href = "'.$url.'" style="background-color:#F64E60; border:none; color:white; padding:10px 15px; text-align:center; text-decoration:none;font-size:12px;display:block;margin-left:auto;margin-right:auto;max-width:150px;border-radius:5px;" target="_blank">Reset Password</a>       
                                  <p style="text-align:center; margin: 0;"><a style="text-decoration:none;color:#000;"></a>or click the link below.</p>       
                                  <a style="word-wrap:break-word;font-size:12px;word-break: break-all;"  href = "'.$url.'" >'.$url.'</a>          
                                  <p style="margin: 0;"><a style="text-decoration:none;color:#000"></a>If you are having problems with the button above, copy and paste the link above in your browser.</p>             
                                  <p style="text-align:center;"><a style="text-decoration:none;color:#000"></a><b>Alchemia Support Team</b></p>        
                              </div>
                              <div style="font:11px sans-serif;color:#686f7a">
                              <p style="margin: 0;">© 2021. Alchemia Inc.</p>        
                              </div>        
                          </div>  
                      </div>
                  </div>
              </div>';
            break;
        	default:
        		return '';
        		break;
        }
	}
}
?>