<?php
$errors = array();
$data = array();
// Getting posted data and decodeing json
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);

$user = $request -> username;
$qry="select flatinfo.username ,flatinfo.address ,verify.verfied,verify.flatid from flatinfo ,verify WHERE flatinfo.id = verify.flatid and flatinfo.username='$user' ";
require_once 'connection.php';
$flat=[];
$userid=[];
$add=[];
$verify=[];


$mysqli=new mysqli($localhost,$user,$password,$db);

if($mysqli->connect_error > 0){
	
	$errors['con'] ='Connection error';
	
}else{


    $result=$mysqli->query($qry);
    
    if($result == true){
        
    $row=null;
        while($row=$result->fetch_array(MYSQLI_NUM)){

            if($row){
            //$data[]=$row[0];
            
            $userid[]=$row[0];
            $add[]=$row[1];
            $verify[] =$row[2];
            $flat[]=$row[3];
            
            }
        }

    

    $data['message'] ='Data fetched';
        
        

    }else{
    
    
        $errors['exception']='Database error';
    }
    
   // $result->free();
    $mysqli->close();
}


if (empty($errors)) {

     $data['user']=$userid;
     $data['add']=$add;
     $data['verify']=$verify;
     $data['flat']=$flat;
     $data['success'] = true;
    //$data['message'] = $db_pwd.' '.$u_pwd;
  
} else {
    $data['success'] = false;
    $data['errors']  = $errors;
   
}

echo json_encode($data);



?>