<?php 
@session_start();
(strpos(getcwd(),'controller'))? $dir='../':$dir='';
  require_once $dir."classes/Crud.php";

Class ADMIN {
	     

	private $crud;

	public function __construct() {
		$this->crud = new Crud();
    $this->config = new Config();

	}
  public function Admin_Restrictions($page)
  {
    if(!isset($_SESSION[$this->config->Web_Name().'_AdSTATUS'],$_SESSION[$this->config->Web_Name().'_TYPE']) && $_SESSION[$this->config->Web_Name().'_AdSTATUS'] != md5('active')
      && $_SESSION[$this->config->Web_Name().'_TYPE'] != md5('admin')) {
        echo '<script>location.replace("login");</script>';
    }else{
      $id = $_SESSION[$this->config->Web_Name().'_UID'];
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
          return false;
        }
      }
    }
  }
}