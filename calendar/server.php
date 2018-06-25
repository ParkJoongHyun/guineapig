<?php
$host = "localhost";
$user = ""
$password = ""
$DB_name = ""
$conn = mysqli_connect($host, $user, $password, $DB_name);
mysqli_set_charset($conn, 'utf8');
$action = $_GET['action']; 
if($action=='go'){  
    $sqlQuery = "select * from calendar where member = '1' and year = '".$_GET['year']."' and month = '".$_GET['month'];
    if($_GET['date']!=NULL){
        $sqlQuery .= "' and date = '".$_GET['date'];    
    }
    $sqlQuery .= "' order by 1";
    $res = mysqli_query($conn, $sqlQuery);
    $rowsCount = mysqli_num_rows($res);
    $json = "";
    $result = array();
    if($rowsCount>0){
        while ($row = mysqli_fetch_array($res)) { 
            $row_array['result'] = 'true';
            $row_array['no'] = $row['no'];
            $row_array['member'] = $row['member'];
            $row_array['year'] = $row['year']; 
            $row_array['month'] = $row['month']; 
            $row_array['date'] = $row['date'];
            $row_array['time'] = $row['time'];
            $row_array['content'] = $row['content'];
            $row_array['state'] = $row['state'];
            array_push($result, $row_array);
        }
        $json = json_encode($result, JSON_UNESCAPED_UNICODE);
    }
    else{
        $row_array['result'] = 'false'; 
        array_push($result, $row_array);
        $json = json_encode($result, JSON_UNESCAPED_UNICODE);
    }
    echo $json;  
} 
else if($action=='register'){
    $sqlQuery = "insert into calendar(member, year, month, date, content) values('1','";
    $sqlQuery .= $_GET['year']."','".$_GET['month']."','".$_GET['date']."','".$_GET['msg'];   
    $sqlQuery .= "')"; 
    echo mysqli_query($conn, $sqlQuery);     
}
else if($action=="delete"){
    $sqlQuery = "delete from calendar where no = '".$_GET['key'];  
    $sqlQuery .= "'";
    echo mysqli_query($conn, $sqlQuery);      
}
else if($action=="modify"){ 
    $sqlQuery = "update calendar set content = '".$_GET['msg']."' where no = '".$_GET['key'];
    $sqlQuery .= "'"; 
    echo mysqli_query($conn, $sqlQuery);      
}
else if($action=="done"){
    $sqlQuery = "update calendar set state = 'Y' where no = '".$_GET['key']; 
    $sqlQuery .= "'"; 
    echo mysqli_query($conn, $sqlQuery);       
}
else if($action=="memodelete"){
    $sqlQuery = "delete from memo where no = '".$_GET['key'];
    $sqlQuery .= "'";  
    echo mysqli_query($conn, $sqlQuery); 
}
else if($action=='memoAdd'){
    $sqlQuery = "insert into memo(content, member) values('"; 
    $sqlQuery .= $_GET['msg']."','1";  
    $sqlQuery .= "')";
    echo mysqli_query($conn, $sqlQuery);  
}
else if($action=='memoList'){
    $sqlQuery = "select * from memo where member = '".$_GET['member']."'"; 
    $sqlQuery .= " order by 1";
    $res = mysqli_query($conn, $sqlQuery);
    $rowsCount = mysqli_num_rows($res);
    $json = "";
    $result = array(); 
    if($rowsCount>0){
        while ($row = mysqli_fetch_array($res)) { 
            $row_array['result'] = 'true';
            $row_array['no'] = $row['no'];
            $row_array['content'] = $row['content'];
            $row_array['member'] = $row['member'];
            array_push($result, $row_array);
        }
        $json = json_encode($result, JSON_UNESCAPED_UNICODE);
    }
    else{
        $row_array['result'] = 'false';
        array_push($result, $row_array);
        $json = json_encode($result, JSON_UNESCAPED_UNICODE);
    }
    echo $json;  
}
else if($action=='holiday'){
    $sqlQuery = "select * from holiday where month = '".$_GET['month']; 
    $sqlQuery .= "' order by 1"; 
    $res = mysqli_query($conn, $sqlQuery); 
    
    $rowsCount = mysqli_num_rows($res);
    $json = "";
    $result = array(); 
    if($rowsCount>0){
        while ($row = mysqli_fetch_array($res)) {
            $row_array['result'] = 'true';
            $row_array['no'] = $row['no'];
            $row_array['month'] = $row['month'];
            $row_array['date'] = $row['date']; 
            $row_array['title'] = $row['title']; 
            array_push($result, $row_array);
        }
        $json = json_encode($result, JSON_UNESCAPED_UNICODE); 
    }
    else{
        $row_array['result'] = 'false';
        array_push($result, $row_array);
        $json = json_encode($result, JSON_UNESCAPED_UNICODE);
    }
    echo  $json;   
}
else{
    echo "잘못된 접근입니다.";
}
mysqli_close($conn);
?>
