$(function(){function i(){if($(window).width()<767){$(".comparsion-item__overview").css("min-height",0);var i=0;i=$(".comparsion-slider .comparsion-item__overview").eq(0).height(),$(".comparsion-slider .comparsion-item__overview").eq(1).height()>i&&(i=$(".comparsion-slider .comparsion-item__overview").eq(1).height()),$(".comparsion-slider .comparsion-item__overview").css("min-height",i+30),$(".comparsion-item-top-block").css("background-position","center bottom -"+$(".comparsion-item-top-block").eq(0).height()/12+"px")}}function e(){$(".top-screen-ghost").height($(window).height()-$(".top-screen header").height()-$(".top-screen footer").height())}var o=new WOW({offset:50,mobile:!0});o.init(),i(),$(window).resize(function(){i()}),e(),$(window).resize(function(){e()}),$(".scroll-icon").click(function(){$("html, body").animate({scrollTop:$(".comparsion").offset().top},1e3)}),$("input[type=tel]").mask("+9 (999) 999-99-99");var t=$(".portfolio-works").imagesLoaded(function(){t.isotope({itemSelector:".portfolio-grid-image",packery:{gutter:0},layoutMode:"packery",transitionDuration:0})});$(".flipster").flipster({itemContainer:".testimonials-slider",itemSelector:".review-container",spacing:-.88,buttons:"custom",buttonPrev:'<img src="img/left_arrow.svg">',buttonNext:'<img src="img/right_arrow.svg">',scrollwheel:!1}),$("form").on("submit",function(i){i.preventDefault();var e=$(this).find('button[type="submit"]');inputs=$(this).find("input"),error=!1,that=this;for(var o=0;o<=inputs.length-1;o++)""==inputs[o].value?(inputs[o].style.border="3px solid #e74c3c",error=!0):inputs[o].style.border="none";return error?!1:(e.addClass("loading"),void $.post("rest.php",$(this).serialize(),function(i){"success"==i?$("#success").modal("show"):"fail"==i&&$("#fail").modal("show"),e.removeClass("loading")}))}),new Vivus("line",{type:"scenario",animTimingFunction:Vivus.EASE,forceRender:!1})});