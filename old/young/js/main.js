$(window).load(function() {
	$('.page-loader').fadeOut(400);
});

$(document).ready(function(){
	$('.collection__items').slick({
		dots: true,
		arrows: false
	});

	$(document).scroll(function(){
		if ($(document).scrollTop() > 1) {
			$('header').addClass('header-fixed');
		}

		else {
			$('header').removeClass('header-fixed');
		}
	});

	new WOW().init();
});