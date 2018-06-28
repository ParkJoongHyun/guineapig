<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<link href="include/css/housekeeping.css" rel="stylesheet">    
<link href="include/css/common.css" rel="stylesheet">  
<link href="include/css/slideMenu.css" rel="stylesheet">      
<link href="include/css/chart.css" rel="stylesheet">      
<title>Chart</title> 
</head> 
<body style="overflow-x: hidden;">
	<div class="parentDiv"> 
		<div class="housekeppingTitleDiv">
			<span id="housekeppingTitle" class="housekeppingTitle">HouseKeeping Book Chart</span>  
		</div> 
		<div id="check-menu">  
			<input id="toggle" type="checkbox">
			<img class="logoutImg" id="slideMenuIndex"src="include/logout.png" style="right: 43px; top: 12px;">      
			<img class="calicon" id="slideMenuIndex"src="include/cal.png" style="right: 50px; top: 11px;">          
			<img class="housekeeping" id="slideMenuIndex"src="include/img/hb_logo.png" style="right: 93px; top: 11px;">            
        </div> 
	</div>  
	<div class="hbTableParentDiv">
		<div class="selectYearMonth" style="margin-bottom: -37px;">
			<select class="selectYearInChart">  
			</select>
			<select class="selectMonthInChart">    
			</select>
			<img class="search" id="search"src="include/img/search.png" >
		</div>  
		<div class="selectYearMonth" style="float: left; text-align: left;">
			<div id="chart_div"></div>
		</div>
		<div class="selectYearMonth" style="float: left; text-align: left; width: 100%; height: 659px; margin-left: 26px; margin-bottom: -8px;">
			<div class="searchDivInChart2"> 
				<select class="selectYearInChart2">   
				</select>
				<img class="searchYear" id="searchYear"src="include/img/search.png" >
			</div>
			<div id="chartMonthToMonth"></div>
		</div>
		<div class="selectYearMonth" style="float: left; text-align: left; width: 100%; height: 560px; margin-left: 26px; margin-bottom: 70px; padding-bottom: 100px;">
			<div class="searchDivInChart3"> 
				<select class="selectYearInChart3">    
				</select>
				<img class="searchYear3" id="searchYear3"src="include/img/search.png" >
			</div>
			<div id="chartAllOutput"></div> 
		</div>
    </div>
	<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script> 
	<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
	<script src="include/js/chart.js"></script>  
	<script src="include/js/common.js"></script>   
</body>
</html>