<?php
Class customCrypt {  


      public function __construct(){
            $this->ciphering = 'AES-128-CBC';
            $this->options = 0;
            $this->encryption_iv = '1234567891011121';
            $this->decryption_iv = '1234567891011121';
            $this->encryption_key = 'tba_custom_encrytion_key';
            $this->decryption_key = 'tba_custom_encrytion_key';
        }
      public function getEncrypt($string)
      {
         $newstring = $string."||".rand();
         $encryption = openssl_encrypt($newstring, $this->ciphering, $this->encryption_key, $this->options, $this->encryption_iv); 
 
          return $encryption;
      }
      public function getDecrypt($encryptedstring)
      {
         
          $decryption = openssl_decrypt($encryptedstring, $this->ciphering, $this->decryption_key, $this->options, $this->decryption_iv);
          $data = explode('||', $decryption);

          return $data[0];
      }
}



class TransGen {
  private $length;
  private $prefix;
  
  public function __construct($prefix, $length) {
    $this->prefix = $prefix;
    $this->length = $length;
   
  }
   public function get_code() {

    return  $this->prefix.$this->Ac_Code($this->length);
    
  }
  
  private function Ac_Code($codelength) 
  { 
    $random="";srand((double)microtime()*1000000);
    $data = "ABCDEFGHJKLMNPQRSTUVWXYZ"; 
    $data .= "123456789"; 
    $data .= "54321ABCXVXV6789";
    
    for($i = 0; $i < $codelength; $i++) {

      $random .= substr($data, (rand()%(strlen($data))), 1);
    }
    return $random; 
  }

}

?>