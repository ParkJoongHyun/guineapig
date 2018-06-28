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
else if($action=='kakao'){
    $sqlQuery = "select * from kakaoMember where id = '".$_GET['id']."'";
    $res = mysqli_query($conn, $sqlQuery);
    
    $rowsCount = mysqli_num_rows($res);
    $result = 0;
    if($rowsCount>0){
        $result = 1; 
    }
    else{
        $sqlQuery = "insert into kakaoMember(id, nickname,token) values('";
        $sqlQuery .= $_GET['id']."','".$_GET['nickname']."','".$_GET['token']."')"; 
        echo mysqli_query($conn, $sqlQuery);  
    }
    echo  $result;     
}
else if($action=='key'){
    $sqlQuery = "select * from kakaoKey"; 
    $res = mysqli_query($conn, $sqlQuery);
    $rowsCount = mysqli_num_rows($res);
    if($rowsCount>0){
        while ($row = mysqli_fetch_array($res)) {
            echo $row['key'];
        }
    }
    else{
        echo "false";
    }
} 
else{
    echo "잘못된 접근입니다.";
}
mysqli_close($conn);
?>
