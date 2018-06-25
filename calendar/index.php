<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="include/css/common.css" rel="stylesheet">  
<link href="include/css/slideMenu.css" rel="stylesheet">    
<title>TO-DO LIST</title> 
</head>
<body onload="nowCalendar()"style="overflow-x: hidden;">
	<div id="myModal" class="modal">  
      <div class="modal-content"> 
        <div style="margin-bottom: 20px">
        	<span id="nowYearMonthDateInModal" style="float: none;"></span>     
        	<span class="close" style="float: right; margin-top: -19px">&times;</span>
        	<img id="add" src="include/add.png">   
        </div>
        <div id="registrationDiv" style="margin-bottom: 30px; display: none;">  
        	<span>일정 등록</span> 
        	<div class="inputbox" style="margin-top: 20px">  
	        	<input id="registrationContent" type="text" placeholder="내용을 입력해주세요."  onkeydown="doRegistrationUsingEnterKeyEvent()"/>      
	        	<img class="registration" id="registration"src="include/registration.png">        
        	</div>
        </div> 
        <span>완료</span> 
        <div id="completed" style="margin-bottom: 20px; margin-top: 13px"> 
        </div>
        <span>예정</span>
        <div id="notyet" style="margin-top: 13px"> 
        </div>
      </div>  
    </div>
    <div id="myModifyModal" class="modal">
      <div class="modal-content" style="overflow: hidden; overflow: hidden;"> 
        <div style="margin-bottom: 30px">
        	<span id="modifyTitle" style="float: none;">일정 수정</span>     
        	<span class="close" style="float: right; margin-top: -19px">&times;</span> 
        </div>
        <div id="modifyDoneDiv" style="margin-bottom: 30px;">  
        	<div class="inputbox" style="margin-top: 20px">    
	        	<input id="modifyDoneContent" type="text" placeholder="내용을 입력해주세요." onkeydown="doModifyUsingEnterKeyEvent()"/>      
	        	<img class="modifyDone" id="modifyDone"src="include/registration.png">            
        	</div>
        </div>  
      </div> 
    </div>
    <!-------------------------------------------------------- 메모 등록 -------------------------------------------------------->
    <div id="sideMenuRegister" class="modal">
      <div class="modal-content" style="overflow: hidden; height: 11.5%"> 
        <div style="margin-bottom: 30px">  
        	<span id="modifyTitle" style="float: none;">메모 등록</span>     
        	<span class="close" style="float: right; margin-top: -19px">&times;</span>  
        </div>
        <div id="slideMenuRegisterDiv" style="margin-bottom: 30px;">   
        	<div class="inputbox" style="margin-top: 20px">     
	        	<input id="slideMenuRegisterContent" type="text" placeholder="내용을 입력해주세요." onkeydown="memoRegisterEnterKeyEvetn()"/>      
	        	<img class="slideMenuRegisgerDone" id="slideMenuRegisgerDone"src="include/registration.png">            
        	</div> 
        </div>  
      </div> 
    </div> 
    <!-------------------------------------------------------- 메모 등록 -------------------------------------------------------->
	<div class="parentDiv"> 
		<div class="nowYearMonthDiv">
			<span id="nowYearMonth" class="nowYearMonth"></span>
			<div>
				<img id="prev" src="include/prev.png">
				<img id="next" src="include/next.png"> 
			</div>    
		</div>
		<!--------------------------------------------- 사이드메뉴 ---------------------------------------------->
		<div id="check-menu"> 
			<input id="toggle" type="checkbox">
     		<label for="toggle">&equiv;</label>
      		<div class="slide-menu" style="left: unset; top: 0px; overflow: scroll; overflow-x: hidden; position: fixed;">     
      			<div style="margin:14px;margin-bottom: 30px">
      				<span class="slideMenuTitle">메모</span> 
      				<img class="slideMenuAdd" id="slideMenuIndex"src="include/memoadd.gif">    
      			</div> 
      			<div class="slideMenuDiv">  
      			</div> 
        	</div>   
        </div>
        <!--------------------------------------------- 사이드메뉴 ---------------------------------------------->
		<div class="weekDiv">
			<div class="dayOfTheWeek"><span style="width: 100%; color: red">일</span></div>
			<div class="dayOfTheWeek"><span style="width: 100%;">월</span></div>
			<div class="dayOfTheWeek"><span style="width: 100%;">화</span></div>
			<div class="dayOfTheWeek"><span style="width: 100%;">수</span></div>
			<div class="dayOfTheWeek"><span style="width: 100%;">목</span></div>
			<div class="dayOfTheWeek"><span style="width: 100%;">금</span></div>
			<div class="dayOfTheWeek"><span style="width: 100%; color: red">토</span></div>  
		</div>
		<div class="weekDiv">   
			<div class="oneDay" id="weekend"><span class="oneDay" id="0" style="width: 96%; color: red"></span><div class='contentDiv'></div></div>
			<div class="oneDay"><span class="oneDay" id="1" style="width: 96%"></span><div class='contentDiv'></div></div>
			<div class="oneDay"><span class="oneDay" id="2" style="width: 96%"></span><div class='contentDiv'></div></div>
			<div class="oneDay"><span class="oneDay" id="3" style="width: 96%"></span><div class='contentDiv'></div></div>
			<div class="oneDay"><span class="oneDay" id="4" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="5" style="width: 96%"></span><div class='contentDiv'></div></div>
			<div class="oneDay" id="weekend"><span class="oneDay" id="6" style="width: 96%; color: red"></span><div class='contentDiv'></div></div>     
		</div>                                               
		<div class="weekDiv">                               
			<div class="oneDay" id="weekend"><span class="oneDay" id="7" style="width: 96%; color: red"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="8" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="9" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="10" style="width: 96%;"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="11" style="width: 96%"></span><div class='contentDiv'></div></div>  
			<div class="oneDay"><span class="oneDay" id="12" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay" id="weekend"><span class="oneDay" id="13" style="width: 96%; color: red"></span><div class='contentDiv'></div></div>  
		</div>                         
		<div class="weekDiv">                                
			<div class="oneDay" id="weekend"><span class="oneDay" id="14" style="width: 96%; color: red"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="15" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="16" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="17" style="width: 96%"></span><div class='contentDiv'></div></div>  
			<div class="oneDay"><span class="oneDay" id="18" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="19" style="width: 96%"></span><div class='contentDiv'></div></div>  
			<div class="oneDay" id="weekend"><span class="oneDay" id="20" style="width: 96%; color: red"></span><div class='contentDiv'></div></div>  
		</div>                                             
		<div class="weekDiv">                                       
			<div class="oneDay" id="weekend"><span class="oneDay" id="21" style="width: 96%; color: red"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="22" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="23" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="24" style="width: 96%"></span><div class='contentDiv'></div></div>     
			<div class="oneDay"><span class="oneDay" id="25" style="width: 96%"></span><div class='contentDiv'></div></div>  
			<div class="oneDay"><span class="oneDay" id="26" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay" id="weekend"><span class="oneDay" id="27" style="width: 96%; color: red"></span><div class='contentDiv'></div></div>  
		</div>                                            
		<div class="weekDiv">                                   
			<div class="oneDay" id="weekend"><span class="oneDay" id="28" style="width: 96%; color: red"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="29" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="30" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="31" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="32" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="33" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay" id="weekend"><span class="oneDay" id="34" style="width: 96%; color: red"></span><div class='contentDiv'></div></div>    
		</div>                                              
		<div class="weekDiv">                                   
			<div class="oneDay" id="weekend"><span class="oneDay" id="35" style="width: 96%; color: red"></span><div class='contentDiv'></div></div>    
			<div class="oneDay"><span class="oneDay" id="36" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="37" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="38" style="width: 96%"></span><div class='contentDiv'></div></div>  
			<div class="oneDay"><span class="oneDay" id="39" style="width: 96%"></span><div class='contentDiv'></div></div> 
			<div class="oneDay"><span class="oneDay" id="40" style="width: 96%"></span><div class='contentDiv'></div></div>  
			<div class="oneDay" id="weekend"><span class="oneDay" id="41" style="width: 96%; color: red"></span><div class='contentDiv'></div></div>    
		</div>
	</div>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
	<script src="include/js/common_function.js"></script> 
	<script src="include/js/slide.js"></script> 
</body>
</html>