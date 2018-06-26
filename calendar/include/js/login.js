function loginValidation() {
	var id = $('.loginRequestId').val(); 
	var pw = $('.loginRequestPw').val();  
	if(event.keyCode == 13){
		loginBtnClickEventMethod();
	}
}
function hideValidation() {
	$('#validationId').css("display","none"); 
	$('#validationPw').css("display","none");  
}
function requestCheckIdAndPw(id,pw) { 
	jQuery.ajax({
	    type:"GET", 
	    url:"./loginServer.php?action=login&id="+id+"&pw="+md5(pw),   
	    success : function(data) {   
	    	if(data){  
	    		makeSession(id); 
	    	}
	    	else{
	    		alert("아이디 또는 비밀번호가 일치하지 않습니다."); 
	    	}
	    },
	    error : function(xhr, status, error) {     
	          alert("HTTP REQUEST ERROR");    
	    }
	});
}
function loginValidationResult(id,pw) { 
	var checkResult = true;
	if(id==""){
		$('#validationId').css("display","block");
		checkResult = false;
	}
	if(pw==""){
		$('#validationPw').css("display","block"); 
		checkResult = false;
	}
	return checkResult;
}
function loginBtnClickEventMethod() {
	hideValidation(); 
	var id = $('.loginRequestId').val(); 
	var pw = $('.loginRequestPw').val();  
	if(loginValidationResult(id,pw)){ 
		requestCheckIdAndPw(id,pw); 
	}
}
function makeSession(id) { 
	if (window.sessionStorage) {
        sessionStorage.setItem('userId', id);
        var position = sessionStorage.getItem('userId'); 
        moveScreenToMainCal(); 
    }
}
function moveScreenToMainCal() {
	location.href = "index.php";
}
$(document).ready(function(){ 
	$('.login').click(function(){  
		loginBtnClickEventMethod(); 
	});
});