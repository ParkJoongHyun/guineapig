function makeSearchOptionInChart() {
	makeYearOption(".selectYearInChart");
	makeMonthOption(".selectMonthInChart");
	makeYearOption(".selectYearInChart2");
	makeYearOption(".selectYearInChart3");
}
function makeYearOption(param) {
	for(var i = 2000; i <= returnNowYear(); i ++){
		var yearOptionHTML = "<option value='"+i+"'";
		if(i==returnNowYear())
			yearOptionHTML += " selected='selected'";  
		yearOptionHTML += ">"+i+"</option>"; 
		$(param).append(yearOptionHTML); 
	}
}
function makeMonthOption(param) {
	for(var i = 1; i < 13; i ++){
		var monthOptionHTML = "<option value='"+i+"'";
		if(i==returnNowMonth())
			monthOptionHTML +=  " selected='selected'";
		monthOptionHTML += ">"+i+"</option>";
		$(param).append(monthOptionHTML);  
	} 
}
function returnNowYear() {
	var today = new Date();
	return today.getFullYear();
}
function returnNowMonth() {
	var today = new Date();  
	return today.getMonth()+1; 
}
function enterKeyEvent() {
	if(event.keyCode == 13)
		requestInputOutputMoneyInModal();
}
function moveToCal() {
	location.href = "index.php";
}
function moveToHouseKeeping() {
	location.href = "housekeeping.php";
}
function insertDataInChart() {
	google.charts.load("current", {packages:["corechart"]});
    google.charts.setOnLoadCallback(drawChart); 
}
function drawChart() {   
	var year = $('.selectYearInChart').val();
	var month = $('.selectMonthInChart').val(); 
	jQuery.ajax({ 
	    type:"GET", 
	    url:"./hbServer.php?action=go&year="+year+"&month="+month,   
	    success : function(dataParam) {     
	    	var jObj = JSON.parse(dataParam);  
	    	if(jObj[0].result=='true'){
	    		data = new google.visualization.DataTable(dataParam);
	    		data.addColumn('string', 'title');
	    		data.addColumn('number', 'money');
	    		data.addRows(Object.keys(jObj).length); 
	    		for(var i = 0; i<Object.keys(jObj).length; i++){
	    			for(var b = 0; b<2; b++){
	    				if(b==0)
	    					data.setCell(i,b,jObj[i].name+" : "+jObj[i].desc);
	    				else
	    					data.setCell(i,b,jObj[i].output);   
	    			}
	    		} 
                var options = {
                        title: 'A Month Expenditure',   
                        subtitle: 'This chart shows the expenditure of all items.',
                        is3D: true,  
                        sliceVisibilityThreshold:0, 
                        animation: {
                        	duration: 1500,
                        	easing: 'inAndOut',
                        	startup: true
                        },
                        backgroundColor: 'transparent',
                        bar: {
                        	groupWidth: '85%'
                        },
                        chartArea: {
                        	backgroundColor: 'transparent',
                        	height: '100%',
                        	left: 30,
                        	top: 24,
                        	width: '100%'
                        },
                        hAxis: {
                        	slantedText: false,
                        	textStyle: {
                        		color: '#616161',
                        		fontSize: 9 
                        	}
                        },
                        height: '100%',
                        //legend: 'none',
                        tooltip: {
                        	isHtml: true,
                        	trigger: 'both'  
                        },
                        vAxis: {
                        	format: 'long',
                        	gridlines: {
                        		count: -1
                        	},
                        	textStyle: {
                        		color: '#616161'
                        	},
                        	viewWindow: {
                        		max: 24000000,
                        		min: 16000000
                        	}
                        },
                        width: 1000,
	    				height: 400
                };
                var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
                chart.draw(data, options); 
            }
	    	else
	    		alert("해당 데이터가 존재하지 않습니다.");
	    },
	    error : function(xhr, status, error) {      
	    	alert("HTTP REQUEST ERROR");
	    } 
	}); 
}
function insertDataInMonthToMonthChart() {
	google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawMonthToMonthChart);
}
function drawMonthToMonthChart() {  
	var themeList = new Array(); 
	var data;
	var searchWhatYear = $('.selectYearInChart2').val();
	jQuery.ajax({ 
	    type:"GET", 
	    url:"./chartServer.php?action=theme",   
	    async: false,
	    success : function(dataParam) {      
	    	var jObj = JSON.parse(dataParam);
	    	for(var i = 0; i<Object.keys(jObj).length; i++){
	    		if(jObj[i].result=='true'){   
	    			themeList.push(jObj[i].name); 
	    		}
	    	}
	    },
	    error : function(xhr, status, error) {      
	    	alert("HTTP REQUEST ERROR");
	    }
	});
	jQuery.ajax({ 
	    type:"GET", 
	    url:"./chartServer.php?action=go&year="+searchWhatYear, 
	    success : function(dataParam) {       
	    	var jObj = JSON.parse(dataParam);   
	    	if(jObj[0].result=='true'){
	    		data = new google.visualization.DataTable(dataParam); 
	    		data.addColumn('number', 'Monthly Expenses'); 
	    		for(var i = 0; i < themeList.length; i++){
	    			data.addColumn('number', themeList[i]);  
	    		}
	    		data.addRows(1000);  
	    		for(var i = 0; i<Object.keys(jObj).length; i++){ 
	    			var rowsArray = new Array();
	    			rowsArray.push(parseInt(jObj[i].month));
	    			rowsArray.push(parseInt(jObj[i].one));
	    			rowsArray.push(parseInt(jObj[i].two));
	    			rowsArray.push(parseInt(jObj[i].three));
	    			rowsArray.push(parseInt(jObj[i].four));
	    			rowsArray.push(parseInt(jObj[i].five));
	    			rowsArray.push(parseInt(jObj[i].six));
	    			rowsArray.push(parseInt(jObj[i].seven)); 
	    			rowsArray.push(parseInt(jObj[i].eight));
	    			rowsArray.push(parseInt(jObj[i].nine));
	    			rowsArray.push(parseInt(jObj[i].ten));
	    			rowsArray.push(parseInt(jObj[i].eleven));
	    			rowsArray.push(parseInt(jObj[i].twelve));
	    			rowsArray.push(parseInt(jObj[i].thirteen));
	    			rowsArray.push(parseInt(jObj[i].fourteen));
	    			data.addRows([rowsArray]); 
	    		} 
	    		var options = {
	    				chart: {
	    					title: 'Monthly Expenses By Type',
	    					subtitle: 'This chart shows the expenditure of all items.'
	    				},
	    				width: 900,
	    				height: 600
	    		};
	    		var chart = new google.charts.Line(document.getElementById('chartMonthToMonth')); 
	    		chart.draw(data, google.charts.Line.convertOptions(options));
            }
	    	else
	    		alert("해당 데이터가 존재하지 않습니다.");
	    },
	    error : function(xhr, status, error) {      
	    	alert("HTTP REQUEST ERROR");
	    } 
	});
}
function searchDataInChart2() {
	insertDataInMonthToMonthChart();
}
function insertDataInTotalOutputChart() {
	google.charts.load('current', {'packages':['line']});
    google.charts.setOnLoadCallback(drawTotalOutputChart);
}
function drawTotalOutputChart() {  
	var themeList = new Array(); 
	var data;
	var searchWhatYear = $('.selectYearInChart3').val();
	jQuery.ajax({ 
	    type:"GET", 
	    url:"./chartServer.php?action=totalOutput&year="+searchWhatYear, 
	    success : function(dataParam) {       
	    	var jObj = JSON.parse(dataParam);   
	    	if(jObj[0].result=='true'){
	    		data = new google.visualization.DataTable(dataParam);  
	    		data.addColumn('number', 'Total Expenses'); 
	    		data.addColumn('number', 'Expenses');
	    		data.addRows(100);
	    		for(var i = 0; i<Object.keys(jObj).length; i++){    
	    			var rowsArray = new Array();
	    			rowsArray.push(parseInt(jObj[i].month)); 
	    			rowsArray.push(parseInt(jObj[i].output)); 
	    			data.addRows([rowsArray]);  
	    		} 
	    		var options = {
	    				chart: {
	    					title: 'Total Expenses Of Month',
	    					subtitle: 'This chart shows the Monthly total expenditure.'
	    				},
	    				width: 900,
	    				height: 600
	    		};
	    		var chart = new google.charts.Line(document.getElementById('chartAllOutput')); 
	    		chart.draw(data, google.charts.Line.convertOptions(options));
            }
	    	else
	    		alert("해당 데이터가 존재하지 않습니다.");
	    },
	    error : function(xhr, status, error) {      
	    	alert("HTTP REQUEST ERROR");
	    } 
	});
}
$(document).ready(function(){  
	makeSearchOptionInChart();
	insertDataInChart();  
	insertDataInMonthToMonthChart();
	insertDataInTotalOutputChart();
	$('.calicon').click(function(){     
		moveToCal(); 
	});
	$('.housekeeping').click(function(){   
		moveToHouseKeeping(); 
	});
	$('.search').click(function(){   
		insertDataInChart();   
	});
	$('.searchYear').click(function(){    
		searchDataInChart2();   
	});
	$('.searchYear3').click(function(){    
		insertDataInTotalOutputChart();   
	});
});