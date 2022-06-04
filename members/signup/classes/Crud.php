<?php
include_once 'DbConfig.php';
 
class Crud extends DbConfig
{
    public function __construct()
    {
        parent::__construct();
    }
    
    public function getData($query)
    {        
        $result = $this->connection->query($query);
        
        if ($result == false) {
            return false;
        } 
        
        $rows = array();
        
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        
        return $rows;
    }   
    public function execute($query) 
    {
        $result = $this->connection->query($query);
        
        if ($result == false) {
            //echo 'Error: cannot execute the command';
            echo die(mysqli_error($this->connection));
            return false;
        } else {
            return true;
        }        
    }
       public function update($query) 
    {
        $result = $this->connection->query($query);
        
        if ($result == false) {
            //echo 'Error: cannot execute the command';
            echo die(mysqli_error($this->connection));
            return false;
        } else {
            if($this->connection->affected_rows > 0){
              return true;
            }else{
              return false;
            }
        }        
    }
    public function executeReturnLastID($query) 
    {
        if($this->connection->query($query)){
           $result = $this->connection->query("SELECT last_insert_id() AS last_id"); 
        }; 
        
        if ($result == false) {
            //echo 'Error: cannot execute the command';
            echo die(mysqli_error($this->connection));
            return false;
        } else {
            return $result->fetch_assoc();
        }        
    }
    public function executeReturnLastexactID($query) 
    {
        $mysqli = $this->connection;
        if($mysqli -> connect_errno){
          echo die(mysqli_error($this->connection));
          return false;
        }else{
          $mysqli -> query($query);
          return $mysqli -> insert_id;  
        }     
    }
    public function insert($table, $data)
    {
        $query = "INSERT INTO $table (";

        $i = 0;
        foreach($data as $key => $value) {
            $query .= $key;
            if($i < (count($data) - 1))
                $query .= ', ';
            
            $i++;
        }
        $query .= ") VALUES ( ";
        $x = 0;
        foreach($data as $row => $value) {
            $query .= "'$value'";
            if($x < (count($data) - 1))
                $query .= ', ';

            $x++;
        }

        $query .= ")";

        if(!$this->connection->query($query))
            return $this->connection->error;
        else
            return true;
    }
    public function delete($id, $table) 
    { 
        $query = "DELETE FROM $table WHERE id = $id";
        
        $result = $this->connection->query($query);
    
        if ($result == false) {
            echo 'Error: cannot delete id ' . $id . ' from table ' . $table;
            return false;
        } else {
            return true;
        }
    }
    public function escape_string($value)
    {
        return $this->connection->real_escape_string($value);
    }
    public function fetchSingleRow($query)
    {        
        $result = $this->connection->query($query);
        
        if ($result == false) {
            return false;
        } 
        return $result->fetch_assoc();
    }
    public function countRows($query)
    {        
        $result = $this->connection->query($query);
        
        if ($result == false) {
            return false;
        } 
        return mysqli_num_rows($result);
    }
}
?>