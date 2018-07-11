$(document).ready(function () {
	if (typeof auth !== 'undefined') {
 	  console.log(auth);
 	  console.log(auth._json['avatar_url']);
 	  $(".auth").prepend("<img class='float-left' height='40px' src='" + auth._json['avatar_url'] + "'/>");
 	  $(".auth").prepend("<div class='float-left'>" + auth.username + "</div>");
}

});