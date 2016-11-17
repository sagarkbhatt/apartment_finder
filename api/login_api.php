<?php
$errors = array();
$data = array();
// Getting posted data and decodeing json
$postdata = file_get_contents('php://input');
$request = json_decode($postdata);

$username=$request->username;
$u_pwd=$request->pwd;

$qry="select username,pwd from registration where username='$username' and pwd='$u_pwd'";
require_once 'connection.php';
$mysqli=new mysqli($localhost,$user,$password,$db);

if($mysqli->connect_error > 0){
	
	$errors['con'] ='Connection error';
	
}else{


try{

    $result=$mysqli->query($qry);
    
    if($result == true){
        $row=NULL;
        $row=$result->fetch_array();
        $db_user=$row['username'];
        $db_pwd=$row['pwd'];

            if( (strcmp($db_user,$username)==0) and (strcmp($db_pwd,$u_pwd)===0)){
                

                $data['message'] ='Logged in successfully';
                
            }
            else{

                $data['message'] ='Please check username or password ';
            }

        

    }else{
    
      throw new Exception($mysqli->error);
        }
    }catch(Exception $e){

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