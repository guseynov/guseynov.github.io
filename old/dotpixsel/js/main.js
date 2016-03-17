function opacity () {
	$('.slick-active:eq(1),.slick-active:eq(3)').css('opacity', '0.6');
	$('.slick-active:eq(0),.slick-active:eq(4)').css('opacity', '0.3');
	$('.slick-active:eq(2)').css('opacity', '1');
}

$(document).ready(function(){
	$('.screenshots__carousel').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		touchThreshold:20,
		arrows:false,
		speed:600,
		infinite:true,
		autoplay: true,
		autoplaySpeed: 2000,
		onInit: function(){opacity()},
		onAfterChange: function(){opacity()}
	});

	$('.reviews__carousel').slick({
		arrows:false,
		dots:true,
		autoplay: true,
		autoplaySpeed: 2500
	});


});