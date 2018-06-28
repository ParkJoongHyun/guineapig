/**
 * Created by Administrator on 2018-06-20.
 */
function getSessionInfo() {
	if (window.sessionStorage) {
        var position = sessionStorage.getItem('userId'); 
        if(position==null){
        	location.href = "login.php";   
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
function moveChart() {
	location.href = "chart.php";  
}
function moveMain() {
	location.href = "index.php";   
}
$(document).ready(function(){  
	getSessionInfo(); 
	$('.logoutImg').click(function(){ 
    	logout();  
    }); 
    $('.hb_logo').click(function(){ 
    	moveHouseKeepingBook();
    });
    $('.charticon').click(function(){ 
    	moveChart();
    }); 
    $('.calicon').click(function(){ 
    	moveMain(); 
    }); 
});
