<?php
Class Email_Curl {  
	  private $apikey;
      public function __construct(){
            //$this->apikey = 'api-93B5E008142211EB8729F23C91C88F4E';
            $this->apikey = 'api-CC15E9C810B811EC8FEEF23C91C88F4E';
        }
	  public function send_email($to, $sender, $html_body, $subject){
	        $curl = curl_init();
	        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
	        curl_setopt($curl, CURLOPT_POST, 1);
	        curl_setopt($curl, CURLOPT_HTTPHEADER, array("Content-Type: application/json"));
	        curl_setopt($curl, CURLOPT_URL, "https://api.smtp2go.com/v3/email/send");
	        curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode(array(

	            "api_key" => $this->apikey,
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