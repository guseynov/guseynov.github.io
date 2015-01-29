var viewport;
$(document).ready(function(){
	$('.carousel').slick({
		fade:true,
		dots:true,
		prevArrow:$(".prev"),
		nextArrow:$(".next"),
		onAfterChange: function(){
			switch($('.carousel').slickCurrentSlide()) {
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

				default:
				console.log('test');

			}
		}
	});

	if ($( window ).width() > 2000) {
		viewport = 2000;
	} else {
		viewport = $( window ).width();
	}
	$('.carousel').width(viewport-$('.form').width());

	$('.caption-stripe').css('left', $('.carousel').width()*0.38);
});

$(window).resize(function(){

	if ($( window ).width() > 2000) {
		viewport = 2000;
	} 

	else {
		viewport = $( window ).width();
	}
	$('.carousel').width(viewport-$('.form').width());


	switch($('.carousel').slickCurrentSlide()) {
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

		default:
		console.log('test');

	}

});