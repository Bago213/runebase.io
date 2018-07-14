$(document).ready(function () {
	if (typeof auth !== 'undefined') {
 	  console.log(auth);
 	  console.log(auth._json['avatar_url']);
 	  $(".auth").append("<div class='w-50'><img height='40px' src='" + auth._json['avatar_url'] + "'/></div>");
 	  $(".auth").append("<div class='w-50'><a href='/logout'>" + "logout" + "</a></div>");
 	  $(".auth").append("<div class='w-50'>" + auth.username + "</div>");
	}
	else{
		$(".auth").append("<div class='w-50'></div>");
 	  	$(".auth").append("<div class='w-50'><a href='/auth' class='float-left'>" + "login" + "</a></div>");
	}
});