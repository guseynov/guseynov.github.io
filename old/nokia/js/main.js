$(document).ready(function(){
		$('.slider').width($('.lumia').width());
		$('.slider').css('transform', 'translateX('+(parseInt($('.lumia').css('padding-left'))+$('.home').outerWidth())+'px)');

	});
	$(window).resize(function(){
		$('.slider').width($('.lumia').width());
		$('.slider').css('transform', 'translateX('+(parseInt($('.lumia').css('padding-left'))+$('.home').outerWidth())+'px)');
	});

	var lumiaStyles = function () { 
		return {
			'transform' :'translateX('+(parseInt($('.lumia').css('padding-left'))+$('.home').outerWidth())+'px)',
			'width' : $(".lumia").width()+'px'
		};
	}

	$('.home').hover(function(){
		$('.slider')
		.css({
			'transform' : 'translateX(0)',
			'width' : $(this).width()
		})},function(){
			$('.slider')
			.css(lumiaStyles())
		});


	$('.news').hover(function(){
		$('.slider')
		.css({
			'transform' : 'translateX('+($('.home').outerWidth()+$('.lumia').outerWidth()+parseInt($('.news').css('padding-left')))+'px)',
			'width' : $(this).width()+'px'
		})},function(){
			$('.slider')
			.css(lumiaStyles())
		});

	$('.coming').hover(function(){
		$('.slider')
		.css({
			'transform' : 'translateX('+($('.home').outerWidth()+$('.lumia').outerWidth()+$('.news').outerWidth()+parseInt($('.coming').css('padding-left')))+'px)',
			'width' : $(this).width()+'px'
		})},function(){
			$('.slider')
			.css(lumiaStyles())
		});

	$('.gallery').hover(function(){
		$('.slider')
		.css({
			'transform' : 'translateX('+($('.home').outerWidth()+$('.lumia').outerWidth()+$('.news').outerWidth()+$('.coming').outerWidth()+parseInt($('.gallery').css('padding-left')))+'px)',
			'width' : $(this).width()+'px'
		})},function(){
			$('.slider')
			.css(lumiaStyles())
		});