$(document).ready(function(){
	$('.headerCarousel').slick({
		prevArrow:$('.pe-7s-angle-left-circle'),
		nextArrow:$('.pe-7s-angle-right-circle'),
		dots:true,
		fade:true,
		draggable:false
	});


	$('.screenshotCarousel').slick({
		infinite: true,
		slidesToShow: 5,
		slidesToScroll: 5,
		touchThreshold:20,
		dots:true,
		arrows:false,
		speed:600
	});


	$('.quoteCarousel').slick({
		infinite: true,
		dots:true,
		touchThreshold:35,
		autoplay:true,
		arrows:false,
		speed:500
	});

});