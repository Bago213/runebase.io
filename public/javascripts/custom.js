$(document).ready(function(){

	particlesJS("particles-js", {"particles":{"number":{"value":120,"density":{"enable":true,"value_area":826.0624057955}},"color":{"value":"#3f446f"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":6},"image":{"src":"img/github.svg","width":100,"height":100}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3.2,"random":false,"anim":{"enable":true,"speed":1,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#7f8a87","opacity":0.4,"width":1},"move":{"enable":true,"speed":0.3,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"grab"},"onclick":{"enable":true,"mode":"push"},"resize":true},"modes":{"grab":{"distance":194.89853095232286,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":40.603860615067255,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true}); 
            
	$(".wallet").click(function(e) {
	      e.preventDefault();
	      $('.wallet.active').removeClass('active')
	      $(this).addClass('active');
	      $('.wallet-cat .selection').fadeOut(0);
	      $('#' + $(this).data('rel')).removeClass('d-none');
	      $('#' + $(this).data('rel')).fadeIn(0);
	});

    $( "a.nav-link" ).click(function( event ) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top + (-72) }, 500);
    });
    $(document).on("scroll", onScroll);
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('#bs-example-navbar-collapse-1 a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top + (-400) <= scrollPos && refElement.position().top + (-400) + refElement.height() > scrollPos) {
            $('#bs-example-navbar-collapse-1 nav a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}
