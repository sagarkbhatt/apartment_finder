<?php

$sname = array();
$fname = array();
$response=array();
$errors=array();
  include_once './config.php';

  //header('Content-Type: application/json');
  
  $post = json_decode(file_get_contents("php://input"),true);
  $rollno=$post["rollno"];
  
   
  //if (!empty($post)) {
  if (empty($post['rollno'])  ) {
 
          $response["success"] = 0;
          $errors["message"] = "rollno is empty .";
          
          die(json_encode($response));
      }
  $query = " SELECT dept,sem FROM account WHERE rollno = '$rollno' ";
      
     $sql1=mysqli_query($conn,$query);
  $row = mysqli_num_rows($sql1);
  if ($sql1 == true)
	  
  {
		 $result=$sql1->fetch_array();
			  $dept=$result['dept'];
			  $sem=$result['sem'];
		 
		$query1 = " SELECT fname,sname FROM subject WHERE dept = '$dept' AND sem='$sem'";
		$sql2=mysqli_query($conn,$query1);
		

		if($sql2 == true){
        
        $result1=null;
        while($result1=$sql2->fetch_array(MYSQLI_NUM)){

            
            //$data[]=$row[0];
            $sname[]=$row[0];
            $fname[]=$row[1];
        
        }
		
		//	$response["success"] = 1;
          //$response["message"] = "Password changed successfully";
          //mysqli_free_result($sql1);
         //die(json_encode($response));
		}else{
			
		$response["success"] = 0;
          $errors["message"] = "Something went wrong";
		}
		$response["success"] = 0;
          $errors["message"] = "Something went wrong";
  }
  
	if (empty($errors)) {
     $response['success'] = true;
	 $response['fname'] =$fname;
	 $response['sname']=$sname;
    //$data['message'] = $db_pwd.' '.$u_pwd;
  
} else {
    $response['success'] = false;
    $response['errors']  = $errors;
   
}

// mysql_close();
	echo json_encode($response);

 
  ?>



