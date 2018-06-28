/**
 * Created by Administrator on 2018-06-20.
 */

var clickedDatePreviousMonthOrNextMonth;
var clickedDate = 0;
var subToday = new Date();  
var today = new Date(); 
var lastDayOfTheWeek = 0;
var nowFirstDateOfMonth = 0;
var dateStartingPointForShowPreviousDate = 0;  
var year, month, nowDate,previousYear,previousMonth,nextYear,nextMonth;
var previousAddContentDate = 0;
var scheduleDatailKeyOfDababase;
function prevCalendar(){
	today = new Date(today.getFullYear(), today.getMonth(),today.getDate());  
	buildCalendar();
}
function nextCalendar(){ 
	today = new Date(today.getFullYear(), today.getMonth()+2,today.getDate()); 
	buildCalendar(); 
}
function nowCalendar() {
	today = new Date(today.getFullYear(), today.getMonth(),today.getDate());  
	buildCalendar();
} 
function lastDay(year, month){
	var lastDate = new Date(year, month, "");
	return lastDate.getDate(); 
}
function getDayOfTheWeekFirstOfMonth() { 
	return new Date(today.getFullYear()+"-"+(today.getMonth()+1)+"-01").getDay();
}
function buildCalendar(){
	lastDayOfTheWeek = 0;
	calendarClassNameInitialize();
	document.getElementById('nowYearMonth').innerHTML = today.getFullYear()+"년"+(today.getMonth()+1)+"월";
	year = today.getFullYear(); 
	month = (today.getMonth()+1); 
	dateStartingPointForShowPreviousDate = 0; 
	if(getDayOfTheWeekFirstOfMonth()==0) 
		dateStartingPointForShowPreviousDate = 7;     
	else
		dateStartingPointForShowPreviousDate = 0; 
	for(var i = 0; i < lastDay(today.getYear(),today.getMonth()+1);i++){   
		var fisrtDayOfMonthIndex = (i+dateStartingPointForShowPreviousDate+getDayOfTheWeekFirstOfMonth()); 
		document.getElementById(fisrtDayOfMonthIndex).innerHTML = i+1; 
		lastDayOfTheWeek = i+dateStartingPointForShowPreviousDate+getDayOfTheWeekFirstOfMonth();     
	}
	prevMonthDate();    
	nextMonthDate();   
	InitializationTodayDateColorful();   
	showTodayDateColorful();  
	ajaxRequest(); 
	clickedPreviousMonthOrNextMonthForSetColorful();  
	previousMonthOrNextMonthDateSetColorful();  
	
	requestPreviousMonthSchedulList(); 
	requestNextMonthSchedulList();
	
	resetHoliday();
	setMonthHoliday("oneDay");
	setMonthHoliday("previousMonth");
	setMonthHoliday("nextMonth"); 
}
function prevMonthDate() { 
	nowFirstDateOfMonth = getDayOfTheWeekFirstOfMonth(); 
	if(getDayOfTheWeekFirstOfMonth()==0){ 
		nowFirstDateOfMonth = 7;
	}
	today = new Date(today.getFullYear(), today.getMonth()-1,today.getDate());
	var lastDateOfPrevMonth = lastDay(today.getFullYear(),(today.getMonth()+1)); 
	for(var i = (nowFirstDateOfMonth-1); i>=0; i--){  
		var fisrtDayOfMonthIndex = i;
		document.getElementById(fisrtDayOfMonthIndex).innerHTML = lastDateOfPrevMonth--; 
		document.getElementById(fisrtDayOfMonthIndex).className = "previousMonth";   
		setBackGround(i);  
	}   
}
function nextMonthDate() {  
	var nextMonthDateInCalendar = 1; 
	for(var i = (lastDayOfTheWeek+1); i <= 41; i++){
		var fisrtDayOfMonthIndex = i;
		document.getElementById(fisrtDayOfMonthIndex).innerHTML = nextMonthDateInCalendar++; 
		document.getElementById(fisrtDayOfMonthIndex).className = "nextMonth";   
		setBackGround(i);  
	}
}
function setBackGround(param) {
	var selecter = "#"+param+"";
	$(selecter).parent().css("background","lightgray");    
}
function calendarClassNameInitialize() {  
	for(var i = 0; i <= 41; i++)
		document.getElementById(i).className = "oneDay";    
}
function checkPreviousMonthDateOrNextMontDate(param) { 
	var result = 1;
	if(param=="previousMonth"){  
		result = 0;
	}
	else if(param=="nextMonth"){ 
		result = 2;
	}
	return result;
}
function showTodayDateColorful() {
	if((today.getMonth()+2)==(subToday.getMonth()+1)){
		InitializationTodayDateColorful();
		for(var i = 0; i <= 41; i++){ 
			var selecter = "#"+i+"";
			if(($(selecter).text())==today.getDate()){ 
				$(selecter).parent().css("background","gold");  
				clickedDate = i; 
				break;
			} 
		} 
	} 
}
function InitializationTodayDateColorful() { 
	for(var i = 0; i <= 41; i++){
		var checkOnlyClassNameOneDay = document.getElementById(i).className;   
		var selecter = "#"+i+"";  
		if(checkOnlyClassNameOneDay=="oneDay"){  
			$(selecter).parent().css("background","none");   
		}
		else{
			$(selecter).parent().css("background","lightgray");    
		}
	}  
}
function clickedPreviousMonthOrNextMonthForSetColorful() {   
	for(var i = 0; i <= 41; i++){ 
		var selecter = "#"+i+"";
		var checkOnlyClassNameOneDay = document.getElementById(i).className;  
		if((($(selecter).text())==clickedDatePreviousMonthOrNextMonth)&&(checkOnlyClassNameOneDay=="oneDay")){  
			$(selecter).parent().css("background","gold");   
			selecter = "#"+clickedDate+""; 
			$(selecter).parent().css("background","none");         
			clickedDate = i; 
			break;
		}  
	} 
}
function previousMonthOrNextMonthDateSetColorful() { 
	for(var i = 0; i <= 41; i++){
		var selecter = "#"+i+"";
		var checkOnlyClassNameOneDay = document.getElementById(i).className;  
		if(checkOnlyClassNameOneDay!="oneDay")
			$(selecter).parent().css("background","lightgray");        
	}
}
function contentInfoRemove() {
	$('div#contentInfo').parent().empty();    
} 
function ajaxRequest(){
	jQuery.ajax({
	    type:"GET", 
	    url:"./server.php?action=go&year="+year+"&month="+month, 
	    success : function(data) { 
	    	contentInfoRemove();
	    	var jObj = JSON.parse(data); 
	        for(var i = 0; i<Object.keys(jObj).length; i++){      
	            if(jObj[i].result=='true'){ 
	            	var no = jObj[i].no; 
	                var member = jObj[i].member;
	                var subyear = jObj[i].year; 
	                var submonth = jObj[i].month; 
	                var date = jObj[i].date; 
	                var content = jObj[i].content;  
	                var state = jObj[i].state;     
	                addContentInCalendar(no,member,subyear,submonth,date,content,state); 
	            }
	        }
	    },
	    error : function(xhr, status, error) {  
	          alert("HTTP REQUEST ERROR");    
	    }
	});
} 
function addContentInCalendar(no, member, subyear, submonth, date, content, state) {  
	for(var i =0; i <= 41; i++){
		var calendarClassName = document.getElementById(i).className;  
		var selecter = "#"+i+"";
		var comparisionText = $(selecter).text(); 
		if((calendarClassName=="oneDay")&&(comparisionText==date)){    
			var contentHTML = "<div id='contentInfo' style='background-color: transparent'><nobr>";
			if(state=="Y")
				contentHTML += "<img id='completed' src='include/completed.jpg' style='height: 15px; margin-left: -1px'>"; 
			else
				contentHTML += "<img id='completed' src='include/notyet.jpg' style='height: 13px'>";
			contentHTML += "<span>"+content+"</span>";   
			contentHTML += "</div>";  
			$(selecter).next().append(contentHTML);         
		}  
	} 
}
function openModalContainDetailSchedule() { 
	$('#registrationDiv').css("display","none"); 
	$('#nowYearMonthDateInModal').text(year + "년 "+month+"월 "+nowDate+"일");  
	var modal = document.getElementById('myModal');
	var btn = document.getElementById("myBtn");
	var span = document.getElementsByClassName("close")[0];
	modal.style.display = "block";
	window.onclick = function(event) {   
	    if (event.target == modal) {
	        modal.style.display = "none";    
	    }
	}
	span.onclick = function() {
        modal.style.display = "none";
    }
	setInitializeInScheduleDetailList();  
}
function openScheduleModifyModal() { 
	var modal = document.getElementById('myModifyModal'); 
	var span = document.getElementsByClassName("close")[1];       
	modal.style.display = "block";  
	window.onclick = function(event) {     
	    if (event.target == modal) {
	        modal.style.display = "none";     
	    }
	}
	span.onclick = function() {
        modal.style.display = "none"; 
        closeModifyScheduleModal();
    }
	$('#modifyDoneContent').focus();
}
function requestDetailSchedule() {
	jQuery.ajax({
	    type:"GET",
	    url:"./server.php?action=go&year="+year+"&month="+month+"&date="+nowDate,  
	    success : function(data) {
	    	var jObj = JSON.parse(data);  
	    	checkEmptySchedule(jObj);  
	        for(var i = 0; i<Object.keys(jObj).length; i++){     
	            if(jObj[i].result=='true'){ 
	            	var no = jObj[i].no; 
	                var member = jObj[i].member;
	                var subyear = jObj[i].year; 
	                var submonth = jObj[i].month;  
	                var date = jObj[i].date; 
	                var time = jObj[i].time ;
	                var content = jObj[i].content;    
	                var state = jObj[i].state;     
	                fillInTheModalContainDetailScheduleAfterCheckCompletedOrNotYet(no,member,subyear,submonth,date,time,content,state);
	            }
	        }
	        setModifyAndDeleteIconClickEventInScheduleDetail();  
	    },
	    error : function(xhr, status, error) {   
	          alert("HTTP REQUEST ERROR");    
	    }
	}); 
} 
function checkEmptySchedule(param) { 
	setInitializeInScheduleDetailList(); 
	var completedScheduleCount = 0;
	var notyestScheduleCount = 0;
	for(var i = 0; i<Object.keys(param).length; i++){    
		if(param[i].state=="Y")
			completedScheduleCount++;
		else if(param[i].state=="N")
			notyestScheduleCount++; 
	}
	if(completedScheduleCount==0)
		fillInTheModalNothingInfo("completed"); 
	if(notyestScheduleCount==0)
		fillInTheModalNothingInfo("notyet");   
}
function fillInTheModalNothingInfo(param) { 
	var selecter = "#"+param; 
	var contentHTMLForFillIntheScheduleListAboutOneDay = "<div class='detailSchedule'>";
	contentHTMLForFillIntheScheduleListAboutOneDay += "<span>일정이 없습니다.</span>";    
	contentHTMLForFillIntheScheduleListAboutOneDay += "</div>"; 
	$(selecter).append(contentHTMLForFillIntheScheduleListAboutOneDay);         
}
function fillInTheModalContainDetailScheduleAfterCheckCompletedOrNotYet(no, member, year, month, date, time,content, state) { 
	var selecter = "#";
	var checkStateForSetImgId = "";
	if(state=="Y"){ //완료
		selecter += "completed";
		checkStateForSetImgId += "<img id='completed' src='include/completed.jpg'style='height: 15px; margin-left: -1px'>";
	}
	else{
		selecter += "notyet";
		checkStateForSetImgId += "<img id='completed' src='include/notyet.jpg'style='height: 13px; margin-left: -1px'>";  
	}
	var contentHTMLForFillIntheScheduleListAboutOneDay = "<div class='detailSchedule'>";
	contentHTMLForFillIntheScheduleListAboutOneDay += "<input type='hidden' value='"+no+"'/>";
	contentHTMLForFillIntheScheduleListAboutOneDay += checkStateForSetImgId;
	contentHTMLForFillIntheScheduleListAboutOneDay += "<span>"+content+"</span>";  
	contentHTMLForFillIntheScheduleListAboutOneDay +="<img class='delete' id='scheduleDetailList' src='include/delete.png' style='margin-top: 3px; margin-right: 10px;'>";
	contentHTMLForFillIntheScheduleListAboutOneDay +="<img class='done' id='scheduleDetailList' src='include/done.png' style='margin-top: -1px; margin-right: 17px; height: 22px;'>";
	contentHTMLForFillIntheScheduleListAboutOneDay += "<img class='modify' id='scheduleDetailList' src='include/modify.png' style='margin-right: 16px; margin-top: 2px;'>";
	contentHTMLForFillIntheScheduleListAboutOneDay += "</div>";
	$(selecter).append(contentHTMLForFillIntheScheduleListAboutOneDay);       
}
function setModifyAndDeleteIconClickEventInScheduleDetail() {
	var size = $('img#scheduleDetailList').size();
	for(var i = 0; i < size; i++){  
		$('img#scheduleDetailList').eq(i).attr("onclick","checkScheduleDetailClassNameForCallAnotherClickEvent(this)");   
	}
}
function checkScheduleDetailClassNameForCallAnotherClickEvent(input) { 
	if($(input).attr('class')=="delete")
		scheduleDelete(input);  
	else if($(input).attr('class')=="modify")
		scheduleModify(input);
	else
		scheduleDone(input); 
}
function scheduleUpdate(action, key, info) {
	jQuery.ajax({
	    type:"GET",
	    url:"./server.php?action="+action+"&key="+key,   
	    success : function(data) {
	    	if(data>0){
	    		reset();
	    		closeDetailScheduleModal();   
	    		if(action=="modify")
	    			closeModifyScheduleModal();  
	    	}
	    	else{
	    		alert(info);  
	    	}
	    },
	    error : function(xhr, status, error) {  
	          alert("HTTP REQUEST ERROR");    
	    }
	});  
}
function scheduleDelete(input) {
	scheduleDatailKeyOfDababase = $(input).prev().prev().prev().val();    
	var confirmResult = confirm("해당 일정을 삭제하시겠습니까?"); 
	if(confirmResult){
		scheduleUpdate("delete",scheduleDatailKeyOfDababase,"일정 삭제에 실패하였습니다. 다시 시도해주세요."); 
	}
}
function scheduleDone(input) {
	scheduleDatailKeyOfDababase = $(input).prev().prev().prev().prev().val();  
	var confirmResult = confirm("일정을 완료하시겠습니까?"); 
	if(confirmResult){ 
		scheduleUpdate("done",scheduleDatailKeyOfDababase,"일정 완료에 실패하였습니다. 다시 시도해주세요."); 
	} 
}
function scheduleModify(input) { 
	scheduleDatailKeyOfDababase = $(input).prev().prev().prev().prev().prev().val();  
	openScheduleModifyModal();   
}
function modifySchedule() {
	var modifyConent = $('#modifyDoneContent').val();  
	if(modifyConent==""){
		alert("수정할 내용을 입력해주세요.");   
		return;
	}
	scheduleDatailKeyOfDababase += "&msg="+modifyConent;  
	scheduleUpdate("modify",scheduleDatailKeyOfDababase,"일정 수정에 실패하였습니다. 다시 시도해주세요.");
}
function setInitializeInScheduleDetailList() {
	$('div#completed').empty();  
	$('div#notyet').empty();  
}
function reset() { 
	today = new Date();  
	nowCalendar(); 
}
function registrationContent() {  
	if($('#registrationContent').val()==""){  
		alert("일정 내용을 입력해주세요.");   
		return; 
	} 
	else if(!validationCheckAboutScriptInsert($('#registrationContent').val())){
		alert("스크립트 문장을 입력할 수 없습니다. "); 
		$('#registrationContent').val("");  
		return;
	}
	jQuery.ajax({
	    type:"GET",
	    url:"./server.php?action=register&year="+year+"&month="+month+"&date="+nowDate+"&msg="+$('#registrationContent').val(),  
	    success : function(data) {
	    	if(data>0){
	    		$('#registrationContent').val("");      
	    		reset();
	    		closeDetailScheduleModal(); 
	    	}
	    	else{ 
	    		alert("일정 등록에 실패하였습니다. 다시 시도해주세요."); 
	    	}
	    },
	    error : function(xhr, status, error) {  
	          alert("HTTP REQUEST ERROR");    
	    }
	});  
}
function validationCheckAboutScriptInsert(param) {
	var returnResult = true;
	if(param.includes("<script"))  
		returnResult = false;
	return returnResult;
}
function showRegistrationDivision() {
	if($('#registrationDiv').css("display")=="none"){ 
		$('#registrationDiv').slideDown();
	}
	else{
		$('#registrationDiv').slideUp();   
	}
	$('#registrationContent').focus();   
}
function closeDetailScheduleModal() {
	var modal = document.getElementById('myModal');
	modal.style.display = "none";
}
function closeModifyScheduleModal() {
	var modal = document.getElementById('myModifyModal'); 
	$('#modifyDoneContent').val(""); 
	modal.style.display = "none"; 
}
function doRegistrationUsingEnterKeyEvent() {
	if(event.keyCode == 13) 
		registrationContent();
}
function doModifyUsingEnterKeyEvent() {
	if(event.keyCode == 13)
		modifySchedule();
}
function setPreviousMonthAndYear() {
	previousYear = year;
	previousMonth = (month-1); 
	if((month-1)==0){
		previousMonth = 12; 
		previousYear -= 1;  
	} 
}
function setNextMonthAndYear() {
	nextYear = year;
	nextMonth = (month+1);
	if((month+1)==13){
		nextMonth = 1;  
		nextYear += 1; 
	} 
}
function requestPreviousMonthSchedulList() {
	setPreviousMonthAndYear(); 
	setNextAndPreviousSchedule(previousYear,previousMonth,0,(nowFirstDateOfMonth-1));
}
function requestNextMonthSchedulList() {
	setNextMonthAndYear();  
	setNextAndPreviousSchedule(nextYear,nextMonth,(lastDayOfTheWeek+1),41);  
}
function setNextAndPreviousSchedule(paramYear, paramMonth,startingPoint,endingPoint) {  
	jQuery.ajax({
	    type:"GET", 
	    url:"./server.php?action=go&year="+paramYear+"&month="+paramMonth, 
	    success : function(data) {   
	    	var jObj = JSON.parse(data); 
	        for(var i = 0; i<Object.keys(jObj).length; i++){      
	            if(jObj[i].result=='true'){  
	            	var no = jObj[i].no; 
	                var member = jObj[i].member;
	                var subyear = jObj[i].year; 
	                var submonth = jObj[i].month; 
	                var date = jObj[i].date;  
	                var content = jObj[i].content;   
	                var state = jObj[i].state;      
	                addPreviousMonthAndNextMonthSchedule(no,member,subyear,submonth,date,content,state,startingPoint,endingPoint);
	            }
	        }
	    },
	    error : function(xhr, status, error) {  
	          alert("HTTP REQUEST ERROR");    
	    }
	});
}
function addPreviousMonthAndNextMonthSchedule(no,member,subyear,submonth,date,content,state,startingPoint,endingPoint){
	for(var i =startingPoint; i <= endingPoint; i++){ 
		var calendarClassName = document.getElementById(i).className;       
		var selecter = "#"+i+"";
		var comparisionText = $(selecter).text();    
		if((comparisionText==date)){     
			var contentHTML = "<div id='contentInfo' style='background-color: transparent'><nobr>";
			if(state=="Y")
				contentHTML += "<img id='completed' src='include/completed.jpg' style='height: 15px; margin-left: -1px'>"; 
			else
				contentHTML += "<img id='completed' src='include/notyet.jpg' style='height: 13px'>";
			contentHTML += "<span>"+content+"</span>";   
			contentHTML += "</div>";  
			$(selecter).next().append(contentHTML);          
			break;
		}  
	} 
}
function returnHolidayMonthForSet(holidayType) {
	var requestHolidayOfMonth;
	if(holidayType=="oneDay"){
		requestHolidayOfMonth = today.getMonth()+2;
		if(requestHolidayOfMonth==13)
			requestHolidayOfMonth = 1;
	}
	else if(holidayType=="previousMonth"){ 
		requestHolidayOfMonth = today.getMonth()+1;
	}
	else{
		requestHolidayOfMonth = today.getMonth()+3;
		if(requestHolidayOfMonth==13)
			requestHolidayOfMonth = 1;   
	}
	return requestHolidayOfMonth;  
}
function setMonthHoliday(holidayType) {
	returnHolidayMonthForSet(holidayType);  
	var requestHolidayOfMonth = returnHolidayMonthForSet(holidayType); 
	if(requestHolidayOfMonth==13)
		requestHolidayOfMonth = 1;
	else if(requestHolidayOfMonth==0)
		requestHolidayOfMonth = 12;
	jQuery.ajax({
	    type:"GET",
	    url:"./server.php?action=holiday&month="+requestHolidayOfMonth, 
	    success : function(data) {
	    	var jObj = JSON.parse(data); 
	        for(var i = 0; i<Object.keys(jObj).length; i++){      
	            if(jObj[i].result=='true'){  
	            	var holidayNo = jObj[i].no; 
	                var holidayMonth = jObj[i].month;
	                var holidayDate = jObj[i].date; 
	                var holidayTitle = jObj[i].title; 
	                addHolidayHTML(holidayNo, holidayMonth, holidayDate, holidayTitle,holidayType);  
	            }
	        }
	    },
	    error : function(xhr, status, error) {  
	          alert("HTTP REQUEST ERROR");    
	    }
	});  
}
function addHolidayHTML(holidayNo, holidayMonth, holidayDate, holidayTitle,holidayType) {
	for(var i =0; i <= 41; i++){   
		var calendarClassName = document.getElementById(i).className;       
		var selecter = "#"+i+"";
		var comparisionText = $(selecter).text();
		if((comparisionText==holidayDate)&&(calendarClassName==holidayType)){      
			$(selecter).css("width", "auto").css("color","red");   
			var contentHTML = "<span id='holiday' style='color: red; font-weight: 900;'>"+holidayTitle+"</span>";    
			$(selecter).parent().first().append(contentHTML);   
			break;
		}  
	} 
}
function resetHoliday() {
	var holidaySpanLength = document.getElementById('holiday');   
	if(holidaySpanLength!=null){
		holidaySpanLength =  $('span#holiday').length;   
		for(var i = 0; i < holidaySpanLength; i++){       
			var findWeekend = $('span#holiday').eq(0).parent().attr('id');
			if(findWeekend!="weekend")
				$('span#holiday').eq(0).prev().prev().css("color","black");   
			$('span#holiday').eq(0).remove(); 
		}
	}
}
function getSessionInfo() {
	if (window.sessionStorage) {
        var position = sessionStorage.getItem('userId'); 
        if(position==null){
        	//location.href = "login.php";   
        }
    }
}
function logout() {
	var logoutConfirm = confirm("로그아웃 하시겠습니까?");
	if(logoutConfirm){
		sessionStorage.clear(); 
		location.href = "login.php";  
	}
}
function moveHouseKeepingBook() {
	location.href = "housekeeping.php";  
}
$(document).ready(function(){ 
	getSessionInfo();
    $('body').click(function(e){
    	var id = e.target.getAttribute('id'); 
    	var className = e.target.getAttribute('class');  
    	if ( ( className != '') && (className != null)){    
    		var previousOrNextOrNowType = checkPreviousMonthDateOrNextMontDate(className);
    		var selecter = "#"+id+""; 
    		if(previousOrNextOrNowType==0){    
    			clickedDatePreviousMonthOrNextMonth = $(selecter).text(); 
    			prevCalendar();  
    		}
    		else if(previousOrNextOrNowType==2){  
    			clickedDatePreviousMonthOrNextMonth = $(selecter).text();
    			nextCalendar();  
    		}
    		else{
    	        if ( ( id != '') && (id != null)){   
    	            if($.isNumeric(id)){   
    	            	$(selecter).parent().css("background","gold");  
    	            	nowDate = $(selecter).text();  
    	            	selecter = "#"+clickedDate+"";
    	            	$(selecter).parent().css("background","none");    
    	            	clickedDate = id;    
    	            	var calendarClassName = document.getElementById(id).className; 
    	            	if(calendarClassName=="oneDay")
    	            		openModalContainDetailSchedule();
    	            	requestDetailSchedule();
    	            } 
    	        }
    		} 
    	}
    });  
    $('#add').click(function(){  
    	showRegistrationDivision(); 
    });
    $('#registration').click(function(){ 
    	registrationContent(); 
    }); 
    $('#modifyDone').click(function(){ 
    	modifySchedule();  
    });
    $('#prev').click(function(){ 
    	prevCalendar();
    });
    $('#next').click(function(){ 
    	nextCalendar();
    }); 
    $('.logoutImg').click(function(){ 
    	logout();  
    }); 
    $('.hb_logo').click(function(){ 
    	moveHouseKeepingBook();
    });
    $('.charticon').click(function(){  
    	moveHouseKeepingBook();
    }); 
    $('.contentDiv').click(function(e){ 
    	var id = $(this).prev().attr('id');
    	if ( ( id != '') && (id != null)){
    		if($.isNumeric(id)){
    			var selecter = "#"+id+"";
            	var calendarClassName = document.getElementById(id).className;
            	if(calendarClassName=="oneDay"){
        			$(selecter).parent().css("background","gold");   
        			nowDate = $(selecter).text();  
        			selecter = "#"+clickedDate+"";
                	$(selecter).parent().css("background","none");     
                	clickedDate = id;   
            		openModalContainDetailSchedule(); 
            	}
            	else if(calendarClassName=="previousMonth"){ 
            		clickedDatePreviousMonthOrNextMonth = $(selecter).text(); 
        			prevCalendar();  
            	}
            	else{
            		clickedDatePreviousMonthOrNextMonth = $(selecter).text(); 
        			nextCalendar();   
            	}
            	requestDetailSchedule();
    		}
    	}
    });  
});
