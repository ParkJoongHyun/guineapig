<!DOCTYPE html>
<html>
<head>
<meta charset="EUC-KR">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="include/css/login.css" rel="stylesheet">   
<title>LOGIN</title> 
</head> 
<body style="overflow-x: hidden;">
<div class="loginDiv"> 
     <p class="loginIcon">
     	<img class="logoinlogin" id="modifyDone"src="include/cal.png"> 
     </p>
     
     <div class="loginInput">
     	<input class="loginRequestId" type="text" placeholder="ID" onkeydown="loginValidation()"/>        
     </div> 
     <div class="loginValidation" id="validationId">  
     	<span>아이디를 입력해주세요.</span>
     </div>
     	
     <div class="loginInput">
     	<input class="loginRequestPw"  type="password" placeholder="PW" onkeydown="loginValidation()"/>   
     </div>
     
     <div class="loginValidation" id="validationPw">  
     	<span>비밀번호를 입력해주세요.</span>
     </div>
     <div class="loginInput"> 
     	<input type="text" class="login" value="로 그 인" readonly="readonly"/>   
     </div>
</div>
	<script src="//cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.10.0/js/md5.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="include/js/login.js"></script> 
</body>
</html>