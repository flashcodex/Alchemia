<?php
@session_start();
require_once "classes/Config.php";
$config = new Config();

if(!isset($_SESSION[$config->SESS().'_AdSTATUS']) || !isset($_SESSION[$config->SESS().'_TYPE']) || $_SESSION[$config->SESS().'_AdSTATUS'] != md5('active')
      || $_SESSION[$config->SESS().'_TYPE'] != md5('admin')) {
        header("Location: login");
}else{
    $_SESSION['domain'] = $config->Domain("basehref");
    $url=$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI'];
    if(substr($url, -1) != '/') $url=$url.'/';

    $subdir = str_replace('/', '', $config->get_string_between($url, $config->Domain("domain"), '/'));
    $new_url=str_replace('/superadmin','',$_SERVER['REQUEST_URI']);
    $dir='';
    for($i=0;$i<substr_count($new_url, "/")-2;$i++){
        $dir.='../';
    }

    $_SESSION['dir']=$dir;
    
    switch(explode('_', $subdir)[0])
    {   
        case "": $_SESSION['view']='view/dashboard.php'; include 'home.php'; break;
        case "dashboard": $_SESSION['view']='view/dashboard.php'; include 'home.php'; break;
        case "periodic": $_SESSION['view']='view/periodic.php'; include 'home.php'; break;
        case "useraccount": $_SESSION['view']='view/useraccount.php'; include 'home.php'; break;
        case "adminprofile": $_SESSION['view']='view/adminprofile.php'; include 'home.php'; break;
        case "learningmaterial": $_SESSION['view']='view/learningmaterial.php'; include 'home.php'; break;
        case "edit_material": $_SESSION['view']='view/edit_material.php'; include 'home.php'; break;
        case "report": $_SESSION['view']='view/report.php'; include 'home.php'; break;
        case "quiz": $_SESSION['view']='view/quiz.php'; include 'home.php'; break;
        case "topicquiz": $_SESSION['view']='view/topicquiz.php'; include 'home.php'; break;
        // case "data": $_SESSION['view']='view/data.php'; include 'home.php'; break;
        default: $_SESSION['view']='view/not_found.php'; include 'home.php'; break;
    }
}
?>
<script type="text/javascript"> var baseUrl = '/public';</script>

<input type="hidden" id="user_id" value="<?php echo $id = $_SESSION[$config->SESS().'_UID']; ?>">