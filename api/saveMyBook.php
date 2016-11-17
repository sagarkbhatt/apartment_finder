<?php
$errors = array();
$data = array();
// Getting posted data and decodeing json
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);

$username=$request->username;
$isbn=$request->isbn;

require_once 'connection.php';

$qry="insert into bookdetail values('$username','$isbn')";

$mysqli=new mysqli($localhost,$user,$password,$db);

if($mysqli->connect_error > 0){
	
	$errors['con'] ='Connection error';
	
}else{

    try{
    $result=$mysqli->query($qry);
    
        if($result == true){

        $data['message']="Successfully added";
        }else{

        $data['message']="OOps, something went wrong";
        }

    }catch(Exception $e){
    
        $errors['exception'] = 'Database, error '. $e->getMessage();
    
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