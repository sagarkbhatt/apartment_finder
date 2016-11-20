<?php
$errors = array();
$data = array();
// Getting posted data and decodeing json
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);
if(isset($_GET['user'])){
$name= $_GET['user'];
$qry="select * from flatinfo where username = '$name'";
}else{
$qry="select * from flatinfo";
}
require_once 'connection.php';
$id=[];
$userid= [];
$add=[];
$lat=[];
$lon=[];
$tag=[];
$rad=[];
$img=[];


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
            $id[]=$row[0];
            $userid[]=$row[1];
            $add[]=$row[2];
            $lat[]=$row[3];
            $lon[]=$row[4];
            $tag[]=$row[5];
            
            $rad[]=$row[6];
            $temp = $row[0];
            $qry2 = "select * from flatimage where id = $temp";
            $tempimg=[];
            $result2 = $mysqli->query($qry2);
             while($temp=$result2->fetch_array(MYSQLI_ASSOC)){
             $tempimg[]=$temp;
             }
             $img[]=$tempimg;
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
    $data['id']=$id;
     $data['user']=$userid;
     $data['lon']=$lon;
     $data['lat']=$lat;
     $data['tag']=$tag;
     $data['rad']=$rad;
     $data['add']=$add; 
     $data['img']=$img;
     $data['success'] = true;
    //$data['message'] = $db_pwd.' '.$u_pwd;
  
} else {
    $data['success'] = false;
    $data['errors']  = $errors;
   
}

echo json_encode($data);



?>