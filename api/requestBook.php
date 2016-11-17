<?php

$errors = array();
$data = array();
// Getting posted data and decodeing json
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);

$owner=$request->owner;
$client=$request->client;
$isbn=$request->isbn;
//userId is owner of book
//$qry="insert into inquiry('clientId','userId','isbn')values ('$client','$owner','$isbn')";

$qry="INSERT INTO `inquiry`(`clientId`, `userId`, `isbn`) VALUES ('$client','$owner','$isbn')";

require_once 'connection.php';
$mysqli=new mysqli($localhost,$user,$password,$db);

if($mysqli->connect_error > 0){
	
	$errors['con'] ='Connection error';
	
}
else{
    
    $result=$mysqli->query($qry);
    
    if($result == true ){

        
        $mysqli->commit();

        $data['message'] = 'Request sent successfully';
            
    }else{
        
        $errors['message'] ='OOPS, something went wrong';
            
         //throw new Exception($mysqli->error);
    }
    $mysqli->close();
}


if (empty($errors)) {
     $data['success'] = true;
//    $data['message'] = 'Form data is going well';
  
} else {
    $data['success'] = false;
    $data['errors']  = $errors;
   
}

echo json_encode($data);
?>