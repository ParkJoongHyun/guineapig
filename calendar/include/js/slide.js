/**
 * Created by Administrator on 2018-06-20.
 */
var slideMenuRegisterContent;
function slideMenuAdd() {
	openSlideMenuRegisterModal();  
}
$(document).ready(function(){ 
    $('.slideMenuAdd').click(function(){    
    	slideMenuAdd(); 
    });
    $('#slideMenuRegisgerDone').click(function(){ 
    	slideMenuRegister();   
    });
    requestMemoList();
}); 

function slideMenuRegister() {
	var slideMenuInputContent = $('#slideMenuRegisterContent').val();  
	if(slideMenuInputContent==""){
		alert("수정할 내용을 입력해주세요.");     
		return; 
	} 
	else if(!validationCheckAboutScriptInsert($('#slideMenuRegisterContent').val())){
		alert("스크립트 문장을 입력할 수 없습니다. ");  
		$('#slideMenuRegisterContent').val("");   
		return;
	}
	slideMenuRegisterContent += "&msg="+slideMenuInputContent;   
	memoRegister("memoAdd",slideMenuRegisterContent,"메모 등록에 실패하였습니다. 다시 시도해주세요.");
} 
function memoRegister(action, key, info) {  
	jQuery.ajax({
	    type:"GET",
	    url:"./server.php?action="+action+"&msg="+key,       
	    success : function(data) { 
	    	if(data>0){
	    		//setInitializeInMemoList(); 
	    		requestMemoList();
	    		if(action=="memoAdd") 
	    			closeMemoRegisterModal();     
	    		setInitializeContentInput();
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
function setInitializeContentInput() {
	$('#slideMenuRegisterContent').val(""); 
}
function closeMemoRegisterModal() {  
	$('#sideMenuRegister').css("display","none");   
}
function setInitializeInMemoList() { 
	$('div.slideMenuDiv').empty();   
}  
function requestMemoList() {   
	jQuery.ajax({
	    type:"GET",
	    url:"./server.php?action=memoList&member=1",
	    success : function(data) { 
	    	setInitializeInMemoList();    
	    	var jObj = JSON.parse(data);    
	        for(var i = 0; i<Object.keys(jObj).length; i++){      
	            if(jObj[i].result=='true'){ 
	            	var no = jObj[i].no; 
	                var content = jObj[i].content;   
	                var member = jObj[i].member;
	                fillInTheMemoList(no,content,member);   
	            }
	        }
	        setMemoDeleteIconClickEvent();   
	    },
	    error : function(xhr, status, error) {   
	          alert("HTTP REQUEST ERROR");     
	    }
	}); 
}
function fillInTheMemoList(no,content,member) {
	var selecter = ".slideMenuDiv"; 
	var makeDivOfMemoList = "<div class='subSlideMenu'>";    
	makeDivOfMemoList +="<input type='hidden' value='"+no+"'/>"; 
	makeDivOfMemoList += "<img class='slideMenuIndex' id='slideMenuIndex' src='include/completed.jpg'>";
	makeDivOfMemoList += "<span class='slideMenuList'>"+content+"</span>";  
	makeDivOfMemoList += "<img class='memodelete' id='memodelete' src='include/delete.png' style='margin-top:6px;'>";
	makeDivOfMemoList += "</div>";   
	$(selecter).append(makeDivOfMemoList);        
}
function openSlideMenuRegisterModal() { 
	var modal = $('#sideMenuRegister');
	var span = document.getElementsByClassName("close")[2];     
	$(modal).css("display","block");  
	window.onclick = function(event) {     
	    if (event.target == modal) { 
	        modal.style.display = "none";       
	    }
	}
	span.onclick = function() {
		$(modal).css("display","none");  
        closeModifyScheduleModal(); 
    }
	$('#slideMenuRegisterContent').focus();  
} 
function memoRegisterEnterKeyEvetn() {
	if(event.keyCode == 13)
		slideMenuRegister();
}
function setMemoDeleteIconClickEvent() {   
	var setClickEventSize = $('img#memodelete').size();
	for(var i = 0; i < setClickEventSize; i++){  
		$('img#memodelete').eq(i).attr("onclick","deleteMemo(this)");    
	} 
}
function deleteMemo(input) {
	jQuery.ajax({ 
	    type:"GET",
	    url:"./server.php?action=memodelete&key="+returnMemoKeyInDBPKey(input),    
	    success : function(data) {
	    	if(data>0){  
	    		requestMemoList();          
	    	}
	    	else
	    		alert("메모 삭제에 실패하였습니다. 다시 시도해주세요.");  
	    },
	    error : function(xhr, status, error) {  
	          alert("HTTP REQUEST ERROR");     
	    }
	});  
}

function returnMemoKeyInDBPKey(input) {  
	return $(input).prev().prev().prev().val();     
}