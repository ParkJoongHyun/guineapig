<?php
$host = "localhost";
$user = "";
$password = "";
$DB_name = "";
$conn = mysqli_connect($host, $user, $password, $DB_name);
mysqli_set_charset($conn, 'utf8');
$action = $_GET['action']; 
if($action=='go'){  
    $sqlQuery = "SELECT b.no, b.member, t.name, t.desc, t.color, sum(b.input) as input, sum(b.output) as output FROM hb_breakdown b, hb_theme t where b.theme_no = t.no and b.member = 1 and b.year = '".$_GET['year']."' and b.month = '".$_GET['month']."' group by b.theme_no order by b.date";
    $res = mysqli_query($conn, $sqlQuery);
    $rowsCount = mysqli_num_rows($res);  
    $json = "";
    $result = array();
    if($rowsCount>0){
        while ($row = mysqli_fetch_array($res)) { 
            $row_array['result'] = 'true';
            $row_array['no'] = $row['no'];
            $row_array['member'] = $row['member'];
            $row_array['name'] = $row['name'];  
            $row_array['desc'] = $row['desc']; 
            $row_array['color'] = $row['color'];
            $row_array['input'] = $row['input'];
            $row_array['output'] = $row['output'];  
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
else if($action=='theme'){
    $sqlQuery = "SELECT * FROM hb_theme order by 1"; 
    $res = mysqli_query($conn, $sqlQuery);
    $rowsCount = mysqli_num_rows($res);
    $json = "";
    $result = array();
    if($rowsCount>0){
        while ($row = mysqli_fetch_array($res)) {
            $row_array['result'] = 'true';
            $row_array['no'] = $row['no'];
            $row_array['name'] = $row['name'];
            $row_array['desc'] = $row['desc'];
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
else if($action=='hbRegister'){ 
    //year,month,type,theme,howmuch
    $inputMoney = 0;
    $outputMoney = 0;
    if($_GET['type']=='input'){
        $inputMoney = $_GET['howmuch'];
    }
    else if($_GET['type']=='output'){
        $outputMoney = $_GET['howmuch']; 
    }
    $sqlQuery = "insert into hb_breakdown(theme_no,input,output,year,month,date) values('";
    $sqlQuery .= $_GET['theme']."','".$inputMoney."','".$outputMoney."','".$_GET['year']."','".$_GET['month']."','".$_GET['date']; 
    $sqlQuery .= "')";
    echo mysqli_query($conn, $sqlQuery);     
}
else{
    echo "잘못된 접근입니다.";
}
mysqli_close($conn);
?>
