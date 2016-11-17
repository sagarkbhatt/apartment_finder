<?php
$errors = array();
$data = array();
// Getting posted data and decodeing json
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);

$lat=$request->lat;
$lon=$request->lon;
$tagsString=$request->tag;
$add=$request->add;
$radius=$request->radius;
$username=$request->username ;

$qry="INSERT INTO flatinfo ( `username`, `address`, `lat`, `lon`, `tags`, `rad`) VALUES ('$username','$add','$lat','$lon','$tagsString','$radius')";
require_once 'connection.php';
$mysqli=new mysqli($localhost,$user,$password,$db);

if($mysqli->connect_error > 0){
	
	$errors['con'] ='Connection error';
	
}else{


    $result=$mysqli->query($qry);
    
    if($result == true){
        
    $data['message'] ='Data inserted';
        
        

    }else{
    
    
        $errors['exception']='Database error';
    }
    
   // $result->free();
    $mysqli->close();
}


if (empty($errors)) {
     $data['success'] = true;
    //$data['message'] = $db_pwd.' '.$u_pwd;
  
} else {
    $data['success'] = false;
    $data['errors']  = $errors;
   
}

echo json_encode($data);



?>