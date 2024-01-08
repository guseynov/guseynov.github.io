$(function() {
    new WOW().init();
    $('.testimonials-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true
    });


    var src = '';
    $('#video').on('show.bs.modal', function(e) {

        var src = e.relatedTarget.getAttribute('data-video');
        $('#video iframe').attr('src', src);
    });

    $('#video').on('hide.bs.modal', function() {
        $('#video iframe').removeAttr('src');
    });

    $('form').on('submit', function(e) {
        e.preventDefault();

        var that = this;
        $.post('rest.php',
            $(this).serialize(),
            function(result) {
                if (result == "success") {
                    $('#success').modal('show')
                } else if (result == "fail") {
                    $('#fail').modal('show')
                }

            });
    });

    $('.frontscreen').imagesLoaded({
        background: true
    }, function() {
        $('.frontscreen').load('url', function() {
            $('.top-ornament, .parallax-wrap').css('height', $('.frontscreen').outerHeight());
            initParallaxBg();
            $('.loader').fadeOut(300);
        });
    });

    $(window).resize(function() {

        $('.top-ornament, .parallax-wrap').css('height', $('.frontscreen').outerHeight());
    });

    $('input[type=tel]').mask("+9 (999) 999-99-99");

});
