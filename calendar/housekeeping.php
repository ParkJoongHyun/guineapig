<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="include/css/housekeeping.css" rel="stylesheet">    
<link href="include/css/common.css" rel="stylesheet">  
<link href="include/css/slideMenu.css" rel="stylesheet">     
<title>HouseKeeping Book</title> 
</head> 
<body style="overflow-x: hidden;">
	<div id="hbRegisterModal" class="modal">   
      <div class="hbmodal_content">  
        <div style="margin-bottom: 20px">
        	<span id="hbModalTitle" style="float: none;">HouseKeeping Book Register</span>      
        	<span class="closeHBModal" style="float: right; margin-top: -19px">&times;</span>
        </div>
        <div class="selectBoxInHBRegister"> 
        	<select class="selectYearRegister">
			</select>
			<select class="selectMonthRegister">    
			</select>
			<select class="selectDateRegister">     
			</select>
			<select class="hbRegisterType" style="padding-top: 5px;">
				<option value="output">지출</option>
				<option value="input">수입</option>      
			</select>
			<select class="hbRegisterTheme">       
			</select> 
			<input type="number" class="howMuch" placeholder="Price" onkeydown="enterKeyEvent()"/>          
			<img class="hbRegisterRequestBtn" id="hbRegisterRequestBtn"src="include/registration.png" > 
        </div>
      </div>  
    </div>   
	<div class="parentDiv"> 
		<div class="housekeppingTitleDiv">
			<span id="housekeppingTitle" class="housekeppingTitle">HouseKeeping Book</span>  
		</div> 
		<div id="check-menu">  
			<input id="toggle" type="checkbox">
			<img class="logoutImg" id="slideMenuIndex"src="include/logout.png" style="right: 43px; top: 12px;">      
			<img class="calicon" id="slideMenuIndex"src="include/cal.png" style="right: 50px; top: 11px;">         
			<img class="charticon" id="slideMenuIndex"src="include/img/charticon.png" style="right: 93px; top: 11px;">           
        </div> 
	</div> 
	<div class="hbTableParentDiv">
		<div class="selectYearMonth" style="margin-bottom: 15px;"> 
			<select class="selectYear">
			</select>
			<select class="selectMonth">    
			</select>
			<img class="search" id="search"src="include/img/search.png" > 
			<img class="hbRegister" id="hbRegister"src="include/registration.png" >
		</div> 
		<div class="hbTableDiv">
			<table class="hbTable">  
				<colgroup>
					<col width="20%"/>
					<col width="40%"/>
					<col width="20%"/>
					<col width="20%"/>
				</colgroup>
				<thead>
					<tr>
						<th class="hbTableTitle">데이터</th> 
						<th class="hbTableTitle">설명</th> 
						<th class="hbTableTitle">수입</th> 
						<th class="hbTableTitle">지출</th>
					</tr>
				</thead>
				<tbody class="breakdown" id="breakdown">   
				</tbody>
				<tr class="result">
						<td class="data">계</td>
						<td class="desc">전체 수입, 지출 합계</td> 
						<td class="input" id="allInput"></td>
						<td class="output" id="allOutput"></td>   
					</tr>
					<tr class="result">
						<td class="data" >잔액</td>
						<td class="desc">전체수입 - 전체지출</td>  
						<td class="input" id="all" colspan="2"></td> 
					</tr>
        	</table>
        </div>
    </div>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> 
	<script src="include/js/housekeeping.js"></script> 
	<script src="include/js/common.js"></script> 
</body>
</html>