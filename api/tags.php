<?php
$errors = array();
$data = array();
$qry="select tags from tags";
require_once 'connection.php';
$mysqli=new mysqli($localhost,$user,$password,$db);
$tags = [];
if($mysqli->connect_error > 0){
	
	$errors['con'] ='Connection error';
	
}else{


    $result=$mysqli->query($qry);
    
    if($result == true){
        
         $row=null;
        while($row=$result->fetch_array(MYSQLI_NUM)){

            
            //$data[]=$row[0];
            $tags[]=$row[0];
        
        }


         $data['message'] = 'Data fetched successfully';
       

    }else{
    
        $errors['exception']='Database error';
    }
    
   // $result->free();
    $mysqli->close();

}

if (empty($errors)) {
     $data['success'] = true;
    $data['tags'] = $tags ;
  
} else {
    $data['success'] = false;
    $data['errors']  = $errors;
   
}

echo json_encode($data);



?>