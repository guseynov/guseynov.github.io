var viewport, currentSlide = 0;
$(document).ready(function(){
	$('.carousel').slick({
		fade:true,
		dots:true,
		prevArrow:$(".prev"),
		nextArrow:$(".next")
	});

	if ($( window ).width() > 2000) {
		viewport = 2000;
	} else {
		viewport = $( window ).width();
	}
	$('.carousel').width(viewport-$('.form').width());

	$('.caption-stripe').css('left', $('.carousel').width()*0.38);

	var moveSlider = function () {
		switch(currentSlide) { 
			case 0:
			$('.caption-stripe').css('left', $('.carousel').width()*0.43);
			currentSlide++;
			break;

			case 1:
			$('.caption-stripe').css('left', $('.carousel').width()*0.48);
			currentSlide++;
			break;


			case 2:
			$('.caption-stripe').css('left', $('.carousel').width()*0.53);
			currentSlide++;
			break;


			case 3:
			$('.caption-stripe').css('left', $('.carousel').width()*0.58);
			currentSlide++;
			break;

			case 4:
			$('.caption-stripe').css('left', $('.carousel').width()*0.63);
			currentSlide++;
			break;

			case 5:
			$('.caption-stripe').css('left', $('.carousel').width()*0.38);
			currentSlide = 0;
			break;
		}
	};
	setInterval(moveSlider, 5000);
});

$(window).resize(function(){

	if ($( window ).width() > 2000) {
		viewport = 2000;
	} 

	else {
		viewport = $( window ).width();
	}
	$('.carousel').width(viewport-$('.form').width());


	switch(currentSlide) { 
		case 0:
		$('.caption-stripe').css('left', $('.carousel').width()*0.38);
		break;

		case 1:
		$('.caption-stripe').css('left', $('.carousel').width()*0.43);
		break;


		case 2:
		$('.caption-stripe').css('left', $('.carousel').width()*0.48);
		break;


		case 3:
		$('.caption-stripe').css('left', $('.carousel').width()*0.53);
		break;

		case 4:
		$('.caption-stripe').css('left', $('.carousel').width()*0.58);
		break;

		case 5:
		$('.caption-stripe').css('left', $('.carousel').width()*0.62);
		break;
	}

});