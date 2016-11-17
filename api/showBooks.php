<?php

$errors = array();
$data = array();
$useIdr= array();
$isbn=array();
require_once 'connection.php';

$qry="select * from bookdetail";

$mysqli=new mysqli($localhost,$user,$password,$db);

if($mysqli->connect_error > 0){
	
	$errors['con'] ='Connection error';
	
}else{
    
    
    $result=$mysqli->query($qry);
    
    if($result == true){
        
        $row=null;
        while($row=$result->fetch_array(MYSQLI_NUM)){

            if($row)
            //$data[]=$row[0];
            $isbn[]=$row[1];
            $userId[]=$row[0];
        
        }


    
    }else{
    
        $errors['error']='database error';
    
    }
    
    $mysqli->close();
}

$data['isbn']=$isbn;
$data['user']=$userId;
echo json_encode($data);
?>