<?php

Class customDetect {
 public $ipaddress;
 public $device;

  function getUserIP()
    {
        $ipaddress = 'UNKNOWN';
        $keys=array('HTTP_CLIENT_IP','HTTP_X_FORWARDED_FOR','HTTP_X_FORWARDED','HTTP_FORWARDED_FOR','HTTP_FORWARDED','REMOTE_ADDR');
        foreach($keys as $k)
        {
            if (isset($_SERVER[$k]) && !empty($_SERVER[$k]) && filter_var($_SERVER[$k], FILTER_VALIDATE_IP))
            {
                $ipaddress = $_SERVER[$k];
                break;
            }
        }
        return $ipaddress;
    }

function detectDevice(){
      $ua = get_browser($_SERVER['HTTP_USER_AGENT'], true);
      return $ua['browser'] . " on " .$ua['device_type']. " - " .$ua['platform'];
  }
    
}
  




?>