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
	    		makeSession(id,"cal"); 
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
function makeSession(id,type) { 
	if (window.sessionStorage) {
        sessionStorage.setItem('userId', id);
        sessionStorage.setItem('type', type); 
        var position = sessionStorage.getItem('userId'); 
        sessionCheck();
    }
}
function moveScreenToMainCal() {
	location.href = "index.php"; 
}
function moveScreenToHouseKeeping() {
	location.href = "housekeeping.php"; 
}
function moveScreenToChart() {
	location.href = "chart.php"; 
}
function sessionCheck() {
	if(sessionStorage.getItem('userId')!=null){
		openMenuModal();
	}
	else{
		alert("로그인이 필요합니다.");
	}
}
function openMenuModal() {
	var modal = document.getElementById('calmenumodal'); 
	var span = document.getElementsByClassName("closeMenuModal")[0];  
	modal.style.display = "block"; 
	window.onclick = function(event) {   
	    if (event.target == modal) { 
	        modal.style.display = "none";     
	    }
	} 
	span.onclick = function() {
        modal.style.display = "none"; 
    }
}
$(document).ready(function(){ 
	var key;
	jQuery.ajax({
		type:"GET", 
		url:"./loginServer.php?action=key",   
		async   : false,
		success : function(data) {
			if(data!="false"){
				key = data;  
			}
		},
		error : function(xhr, status, error) {     
			alert("HTTP REQUEST ERROR");     
		}
	});
	Kakao.init(key);   
	Kakao.Auth.createLoginButton({
		container: '#kakao-login-btn',
		success: function(authObj) { 
			Kakao.API.request({
				url: '/v1/user/me', 
				success: function(res) {
					jQuery.ajax({
						type:"GET", 
						url:"./loginServer.php?action=kakao&id="+res.id+"&nickname="+res.properties['nickname']+"&token="+md5(authObj.access_token),   
						success : function(data) {   
							if(data){  
								makeSession(res.id,"kakao");    
							}
							else{
								alert("등록되지 않은 사용자입니다."); 
							}
						},
						error : function(xhr, status, error) {     
							alert("HTTP REQUEST ERROR");     
						}
					});
				}
			})
		},
		fail: function(err) {
			alert(JSON.stringify(err));  
		}
	});
    $('.loginRequestPw').focus();
    $('.login').click(function(){  
    	loginBtnClickEventMethod(); 
    });
    $('#loginModalDiv1').click(function(){  
    	moveScreenToMainCal(); 
    });
    $('#loginModalDiv2').click(function(){  
    	moveScreenToHouseKeeping(); 
    });
    $('#loginModalDiv3').click(function(){  
    	moveScreenToChart(); 
    });
});