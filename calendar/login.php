<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="X-UA-Compatible" content="IE=edge"/> 
<meta name="viewport" content="user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width"/>
<link href="include/css/login.css" rel="stylesheet">   
<title>LOGIN</title> 
<script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
</head> 
<body style="overflow-x: hidden;">
	<div id="calmenumodal" class="modal">    
		<div class="calmenu_content">  
        	<div style="margin-bottom: 20px">
        		<span id="hbModalTitle" style="float: none; padding-left: 5px;">Menu</span>       
        		<span class="closeMenuModal" style="float: right; margin-top: -19px">&times;</span>
        	</div>
        	<div class="loginModalDiv" id="loginModalDiv1"> 
        		<div class="loginModalSubDiv">
        			<span>Calendar</span>
        		</div>
        	</div>
        	<div class="loginModalDiv" id="loginModalDiv2">
        		<div class="loginModalSubDiv">
        			<span>HouseKeeping Book</span>
        		</div>
        	</div>
        	<div class="loginModalDiv" id="loginModalDiv3">
        		<div class="loginModalSubDiv">
        			<span>Chart</span>
        		</div>
        	</div>
      	</div>   
     </div>   
    
<div class="loginDiv"> 
     <p class="loginIcon">
     	<img class="logoinlogin" id="modifyDone"src="include/cal.png"> 
     </p>
     
     <div class="loginInput">
     	<input class="loginRequestId" type="text" placeholder="ID" onkeydown="loginValidation()" value="guineapig"/>        
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
     <div id="kakao-login-btn" style="text-align: center;">
     	<!-- <a id="kakao-login-btn"></a> -->
     	<a id="kakao-logout-btn" href="http://developers.kakao.com/logout"></a>
     </div>
</div>
	<script src="//cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.10.0/js/md5.min.js"></script>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="include/js/login.js"></script> 
</body>
</html>