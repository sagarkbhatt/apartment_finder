 <?php

     $target_dir = "../upload/";
     $name = $_POST['name'];
     $id =$_POST['id'];
     $errors = array();
$data = array();
     //print_r($_FILES);
     $target_file = $target_dir . basename($_FILES["file"]["name"]);

   if( move_uploaded_file($_FILES["file"]["tmp_name"], $target_file)){

    
       $data['msg']='uploaded';
    
    require_once 'connection.php';
    $conn=new mysqli($localhost,$user,$password,$db);

     if ($conn->connect_error) {
     $data['con']="Connection failed: " . $conn->connect_error;
     }

     $sql = "INSERT INTO flatimage (id,name,path) VALUES (".$id.",'".$name."','".basename($_FILES["file"]["name"])."')";

     if ($conn->query($sql) === TRUE) {
         $data['db']='Data inserted'; // new file uploaded
     } else {
        $errors['db']="Can't insert data";
     }

     $conn->close(); 
   
   }else{

       $errors['upload']="upload error";
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