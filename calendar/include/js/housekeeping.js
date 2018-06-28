function makeSearchOption() {
	makeYearOption(".selectYear");
	makeMonthOption(".selectMonth");
	makeYearOption(".selectYearRegister");
	makeMonthOption(".selectMonthRegister");   
	makeDateOption();
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
function makeDateOption() { 
	//selectDateRegister
	for(var i = 1; i < 32; i ++){
		var monthOptionHTML = "<option value='"+i+"'";
		if(i==returnNowDate()) 
			monthOptionHTML +=  " selected='selected'";
		monthOptionHTML += ">"+i+"</option>";   
		$('.selectDateRegister').append(monthOptionHTML);  
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
function returnNowDate() {
	var today = new Date();  
	return today.getDate();
}
function requestInputOutputBreakDown() {
	var year = $('.selectYear').val();
	var month = $('.selectMonth').val();
	jQuery.ajax({
	    type:"GET", 
	    url:"./hbServer.php?action=go&year="+year+"&month="+month,   
	    success : function(data) {   
	    	var jObj = JSON.parse(data);  
	    	breakdownMakeEmpty();
	    	if(jObj[0].result=='false'){
	    		fillInTheBreakDownEmpty(); 
	    		return; 
	    	}
	        for(var i = 0; i<Object.keys(jObj).length; i++){     
	            if(jObj[i].result=='true'){ 
	            	var no = jObj[i].no; 
	                var member = jObj[i].member;
	                var name = jObj[i].name; 
	                var desc = jObj[i].desc;  
	                var color = jObj[i].color; 
	                var input = jObj[i].input ;
	                var output = jObj[i].output;     
	                fillInTheBreakDown(no,member,name,desc,color,input,output); 
	            }
	        }
	        addSameTypeMoney(); 
	    },
	    error : function(xhr, status, error) {     
	          alert("HTTP REQUEST ERROR");    
	    }
	});
}
function fillInTheBreakDown(no,member,name,desc,color,input,output) {
	var childOfBreakDownTr = "<tr class='breakdownData'><td class='data'>"+name+"</td>"; 
	childOfBreakDownTr += "<td class='desc'>"+desc+"</td>";  
	childOfBreakDownTr += "<td class='input' id='input'>"+moneyComma(input)+"</td>";
	childOfBreakDownTr += "<td class='output' id='output'>"+moneyComma(output)+"</td></tr>";   
	$('.breakdown').append(childOfBreakDownTr); 
}
function fillInTheBreakDownEmpty() {
	var childOfBreakDownTr = "<tr><td class='data' colspan='4' style='text-align: center'>데이터가 없습니다.</td></tr>";  
	$('.breakdown').append(childOfBreakDownTr); 
	allInOutputResetToZero(); 
}
function allInOutputResetToZero() {
	$('#all').text("0"); 
	$('#allInput').text("0");
	$('#allOutput').text("0");  
}
function breakdownMakeEmpty() { 
	$('.breakdown').empty();
}
function moneyComma(num) {
	return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
String.prototype.replaceAll = function(org, dest) {
    return this.split(org).join(dest);
}
function addSameTypeMoney() {  
	var totalOutputSum = 0;
	var totalInputSum = 0;
	var breakDownSize = $('.breakdownData').size(); 
	for(var i = 0; i < breakDownSize; i++){
		totalOutputSum +=  parseInt($('.breakdownData').eq(i).children().eq(3).text().replaceAll(",","")); 
		totalInputSum += parseInt($('.breakdownData').eq(i).children().eq(2).text().replaceAll(",","")); 
	} 
	$('#allInput').text(moneyComma(totalInputSum)); 
	$('#allOutput').text(moneyComma(totalOutputSum));     
	$('#all').text(moneyComma((totalInputSum-totalOutputSum)));
}
function openModalForhouseKeepingBookRegister() {
	var modal = document.getElementById('hbRegisterModal');
	var span = document.getElementsByClassName("closeHBModal")[0];  
	modal.style.display = "block";
	window.onclick = function(event) {   
	    if (event.target == modal) {
	        modal.style.display = "none";    
	    }
	} 
	span.onclick = function() {
        modal.style.display = "none";
    }
	$('.howMuch').focus();
}
function closeHBRegisterModal() {
	var modal = document.getElementById('hbRegisterModal');
	modal.style.display = "none";
}
function requestRegisterTheme() {
	jQuery.ajax({
	    type:"GET", 
	    url:"./hbServer.php?action=theme",     
	    success : function(data) {   
	    	var jObj = JSON.parse(data);   
	        for(var i = 0; i<Object.keys(jObj).length; i++){     
	            if(jObj[i].result=='true'){ 
	            	var no = jObj[i].no; 
	                var name = jObj[i].name;   
	                var desc = jObj[i].desc;  
	                addRegisterThemeInSelectBox(no,name,desc);  
	            }
	        }
	    },
	    error : function(xhr, status, error) {     
	          alert("HTTP REQUEST ERROR");    
	    }
	});
}
function addRegisterThemeInSelectBox(no,name,desc) { 
	var yearOptionHTML = "<option value='"+no+"'"; 
	yearOptionHTML += ">"+name+" - "+ desc+"</option>";  
	$('.hbRegisterTheme').append(yearOptionHTML);  
}
function requestInputOutputMoneyInModal() {
	var hbYear = $('.selectYearRegister').val();
	var hbMonth = $('.selectMonthRegister').val();
	var hbDate = $('.selectDateRegister').val(); 
	var hbRegisterType = $('.hbRegisterType').val();
	var hbTheme = $('.hbRegisterTheme').val();
	var hbHowMuch = $('.howMuch').val(); 
	if(hbHowMuch==""){ 
		alert("금액을 입력해주세요.");  
	}
	else{
		hbInOutputInsertRequest(hbYear,hbMonth,hbRegisterType,hbTheme,hbHowMuch,hbDate); 
	}
}
function hbInOutputInsertRequest(year,month,type,theme,howmuch,date) {
	jQuery.ajax({
	    type:"GET", 
	    url:"./hbServer.php?action=hbRegister&year="+year+"&month="+month+"&type="+type+"&theme="+theme+"&howmuch="+howmuch+"&date="+date,     
	    success : function(data) {    
	    	if(data>0){
	    		closeHBRegisterModal();
	    		$('.howMuch').val(""); 
	    		requestInputOutputBreakDown();
	    	}
	    	else{
	    		alert("등록에 실패하였습니다. 다시 시도해주세요.");
	    	}
	    },
	    error : function(xhr, status, error) {      
	          alert("HTTP REQUEST ERROR");    
	    }
	});
}
function enterKeyEvent() {
	if(event.keyCode == 13)
		requestInputOutputMoneyInModal();
}
function moveToCal() {
	location.href = "index.php";
}
function moveToChart() {
	location.href = "chart.php";
}
$(document).ready(function(){ 
	requestRegisterTheme();
	makeSearchOption(); 
	requestInputOutputBreakDown();  
	$('.search').click(function(){  
		requestInputOutputBreakDown();
	});
	$('.hbRegister').click(function(){  
		openModalForhouseKeepingBookRegister();   
	});
	$('.hbRegisterRequestBtn').click(function(){   
		requestInputOutputMoneyInModal();
	});
	$('.calicon').click(function(){   
		moveToCal();
	});
	$('.charticon').click(function(){   
		moveToChart(); 
	});
});