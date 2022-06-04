<?php
@session_start();
require_once "model/crypt.php";
require_once "classes/Config.php";
$config = new Config();
$customcrypt = new customCrypt();

$usercookie = json_decode($customcrypt->getDecrypt($_COOKIE[$config->cookie_user()]), true);

$_SESSION['apppage'] = 'active';
$_SESSION['domain'] = $config->Domain('basehref');
$url=$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];

$clean_url= $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
if(substr($url, -1) != '/') $url=$url.'/';

// echo $clean_url . "<br>";
// echo $url . "<br>";

$subdir = str_replace('/', '', $config->get_string_between($url, $config->Domain('domain'), '/'));
$new_url=str_replace('/pamantasanalchemia','',$_SERVER['REQUEST_URI']);

$arr = explode('app/', $url);
$subdir = str_replace('/', '', $arr[1]);

if (strpos($subdir, 'material') !== false) {
    $subdir = 'material';
}

// echo $subdir . "<br>";
// echo "new url ". $new_url . "<br>";

$dir='';
for($i=0;$i<substr_count($new_url, "/")-1;$i++){
    $dir.='../';
}

// echo "Dir : ". $dir . "<br>";

if(!isset($_COOKIE[$config->cookie_user()])){
    header("location:../login/");
    exit();
}else if($usercookie['user_terms']!=2){
   $subdir="agreement";
}else if($usercookie['user_terms']==2 AND $subdir=='agreement'){
    $subdir="dashboard";
}
   // header("location: ".$subdir);
?>

<input type="hidden" id="user_id" value="<?php echo $usercookie['user_id'] ?>">
<?php

$_SESSION['dir']=$dir;
// echo $_SESSION['view'] ."<br>";
// echo $_SESSION['dir'] ."<br>";
// $subdir = "material";
// echo "SUBDIR : ". $subdir;
switch($subdir)
{   
    case "": $_SESSION['view']='view/dashboard.php'; include 'home.php';  break;
    case "logout": $_SESSION['view']='view/logout.php'; include 'view/logout.php'; break;
    case "dashboard": $_SESSION['view']='view/dashboard.php'; include 'home.php'; break;
    case "material": $_SESSION['view']='view/material.php'; include 'home.php'; break;
    case "module": $_SESSION['view']='view/module.php'; include 'home.php'; break;
    case "quiz": $_SESSION['view']='view/quiz.php'; include 'home.php'; break;
    case "topic": $_SESSION['view']='view/topic.php'; include 'home.php'; break;
    case "viewresult": $_SESSION['view']='view/viewresult.php'; include 'home.php'; break;
    case "profile": $_SESSION['view']='view/profile.php'; include 'home.php'; break;
    // case "table": $_SESSION['view']='view/table.php'; include 'home'; break;
    case "agreement": include 'view/agreement.php'; break;
    default: $_SESSION['view']='view/not_found.php'; include 'home.php'; break;
}
?>
