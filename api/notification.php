<?php
$isbn=array();
$clientId=array();
$errors = array();
$data = array();
// Getting posted data and decodeing json
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);

$user=$request->username;
//userId is owner of book
//$qry="insert into inquiry('clientId','userId','isbn')values ('$client','$owner','$isbn')";

$qry="select clientId,isbn from inquiry where userId='$user'";

require_once 'connection.php';
$mysqli=new mysqli($localhost,$user,$password,$db);

if($mysqli->connect_error > 0){
	
	$errors['con'] ='Connection error';
	
}
else{
    
    $result=$mysqli->query($qry);
    
    if($result == true ){

        
        $row=null;
        while($row=$result->fetch_array(MYSQLI_NUM)){

            
            //$data[]=$row[0];
            $isbn[]=$row[1];
            $clientId[]=$row[0];
        
        }

        $data['message'] = 'Data fetched successfully';
            
    }else{
        
        $errors['message'] ='OOPS, something went wrong';
            
         //throw new Exception($mysqli->error);
    }
    $mysqli->close();
}


if (empty($errors)) {
    $data['isbn']=$isbn;
    $data['user']=$clientId;
    $data['success'] = true;
//    $data['message'] = 'Form data is going well';
  
} else {
    $data['success'] = false;
    $data['errors']  = $errors;
   
}

echo json_encode($data);
?>