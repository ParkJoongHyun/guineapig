<?php
$host = "localhost";
$user = "";
$password = "";
$DB_name = "";
$conn = mysqli_connect($host, $user, $password, $DB_name);
mysqli_set_charset($conn, 'utf8'); 
$action = $_GET['action']; 
if($action=='login'){
    $sqlQuery = "select * from calMember where id = '".$_GET['id']; 
    $sqlQuery .= "' and pw = '".$_GET['pw']."'";  
    $res = mysqli_query($conn, $sqlQuery); 
    
    $rowsCount = mysqli_num_rows($res);
    $result = FALSE;
    if($rowsCount>0){
        $result = TRUE;
    }
    echo  $result;    
}
else{
    echo "잘못된 접근입니다.";
}
mysqli_close($conn);
?>
