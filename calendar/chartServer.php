<?php
$host = "localhost";
$user = "";
$password = "";
$DB_name = "";
$conn = mysqli_connect($host, $user, $password, $DB_name);
mysqli_set_charset($conn, 'utf8');
$action = $_GET['action']; 
if($action=='go'){  
    $sqlQuery = "select month, sum(A) as one, sum(B) as two,sum(C) as three,sum(D) as four,sum(E) as five,sum(F) as six,sum(G) as seven,sum(H) as eight,sum(I) as nine,
    sum(J) as ten,
    sum(K) as eleven,
    sum(L) as twelve,
    sum(M) as thirteen,
    sum(N) as fourteen FROM (select case when name = '고정비' then sum(b.output) END AS A,
    case when name = '수입' then sum(b.output) END AS B,
    case when name = '공금' then sum(b.output) END AS C,
    case when name = '교통' then sum(b.output) END AS D,
    case when name = '생활비' then sum(b.output) END AS E,
    case when name = '외식' then sum(b.output) END AS F,
    case when name = '이벤트' then sum(b.output) END AS G,
    case when name = '경조비' then  sum(b.output) END AS H,
    case when name = '자기계발' then sum(b.output) END AS I,
    case when name = '여가' then sum(b.output) END AS J,
    case when name = '의료' then sum(b.output) END AS K,
    case when name = '업무' then sum(b.output) END AS L,
    case when name = '기타' then sum(b.output) END AS M, 
    case when name = '담배' then sum(b.output) END AS N, 
    t.desc, sum(b.output) as output, b.month from hb_theme t, hb_breakdown b where t.no = b.theme_no and b.year = '".$_GET['year']."' group by b.year, b.month, t.no order by b.month) as AB group by AB.month";
    //$sqlQuery = "select t.name, t.desc, sum(b.output) as output, b.month from hb_theme t, hb_breakdown b where t.no = b.theme_no and b.year = '".$_GET['year']."' group by b.year, b.month, t.no order by b.month";  
    $res = mysqli_query($conn, $sqlQuery);
    $rowsCount = mysqli_num_rows($res);   
    $json = "";
    $result = array();
    if($rowsCount>0){
        while ($row = mysqli_fetch_array($res)) {  
            $row_array['result'] = 'true';
            $row_array['month'] = $row['month']; 
            $row_array['one'] = $row['one'];  
            $row_array['two'] = $row['two']; 
            $row_array['three'] = $row['three'];  
            $row_array['four'] = $row['four'];
            $row_array['five'] = $row['five'];
            $row_array['six'] = $row['six'];  
            $row_array['seven'] = $row['seven'];
            $row_array['eight'] = $row['eight'];
            $row_array['nine'] = $row['nine'];  
            $row_array['ten'] = $row['ten'];
            $row_array['eleven'] = $row['eleven'];
            $row_array['twelve'] = $row['twelve'];
            $row_array['thirteen'] = $row['thirteen'];
            $row_array['fourteen'] = $row['fourteen']; 
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
    $sqlQuery = "SELECT name FROM hb_theme";
    $res = mysqli_query($conn, $sqlQuery);
    $rowsCount = mysqli_num_rows($res);
    $json = "";
    $result = array();
    if($rowsCount>0){
        while ($row = mysqli_fetch_array($res)) {
            $row_array['result'] = 'true';
            $row_array['name'] = $row['name'];
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
else{
    echo "잘못된 접근입니다.";
}
mysqli_close($conn);
?>
