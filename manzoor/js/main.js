var viewport;
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
});

$(window).resize(function(){

	if ($( window ).width() > 2000) {
		viewport = 2000;
	} 

	else {
		viewport = $( window ).width();
	}
	$('.carousel').width(viewport-$('.form').width());
})