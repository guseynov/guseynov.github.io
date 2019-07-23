$(function() {
    $('.gallery__slider').slick({
        dots: true,
        arrows: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
            breakpoint: 1240,
            settings: {
                arrows: false
            }
        }, {
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3
            }
        }, {
            breakpoint: 1110,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        }]

    });

    $('.testimonials__slider').slick({
        dots: true,
        arrows: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        responsive: [{
            breakpoint: 1240,
            settings: {
                arrows: false
            }
        }, {
            breakpoint: 1110,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                arrows: false
            }
        }, {
            breakpoint: 650,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                arrows: false
            }
        }, {
            breakpoint: 570,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                arrows: false
            }
        }, {
            breakpoint: 360,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false
            }
        }]
    });


    var clock = $('.offer-timer__flipclock').FlipClock(3600 * 24 * 3, {
        clockFace: 'DailyCounter',
        countdown: true,
        language: 'ru-ru'
    });

    if ($(this).scrollTop() >= 500) {
        $('.header-scroll').addClass('active');
    } else {
        $('.header-scroll').removeClass('active');
    }

    $('.nav button').click(function() {
        $('.nav li').removeClass('active');
        $(this).parent().addClass('active');

        $(window).scrollTo($('[data-scroll-dest=' + $(this).attr('data-scroll') + ']'), 400, {
            'offset': -100
        });
    })

    $(window).on('scroll', function() {
        if ($(this).scrollTop() >= 500) {
            $('.header-scroll').addClass('active');
        } else {
            $('.header-scroll').removeClass('active');
        }

    });

    $('input').on('input', function() {
        console.log($(this).val().length);
        if ($(this).val().length) {
            $(this).attr('data-filled', 'true');
        } else {
            $(this).attr('data-filled', '');
        }
    })

    $('[data-popup-trigger]').click(function(e) {
        e.preventDefault();
        $('[data-popup=' + $(this).attr('data-popup-trigger') + ']').addClass('active');
        $('.overlay').addClass('active');
        if ($(this).attr('data-popup-country')) {
            $('[data-popup=' + $(this).attr('data-popup-trigger') + '] .form-destination').text($(this).attr('data-popup-country'));
            $('[data-popup=' + $(this).attr('data-popup-trigger') + ']').attr('data-destination', $(this).attr('data-popup-country'));
        }

    });

    $('.overlay').click(function() {
        $(this).removeClass('active');
        $(this).find('.popup').removeClass('active').find('.form-result').removeClass('active');

    });

    $('.popup').click(function(e) {
        e.stopPropagation();
    });

    $('form').submit(function(e) {
        e.preventDefault();
        var that = $(this),
            container;
        if (that.parents('.form-container').length) {
            container = that.parents('.form-container');
        } else {
            container = that.parents('.form-result-container');
        }
        $.post('mail.php', {
                'phone': that.find('.input-tel').val(),
                'email': that.find('.input-mail').val(),
                'destination': that.parents('.popup').attr('data-destination')
            })
            .done(function(response) {
                if (response.trim() == 'Success') {

                    container.find('.form-result').addClass('active').find('span').text('Спасибо, Ваша заявка отправлена.');

                    setTimeout(function() {
                        container.find('.form-result').removeClass('active');
                    }, 3000);
                } else {

                    container.find('.form-result').addClass('active').find('span').text('К сожалению, отправка заявки сейчас недоступна.')

                    setTimeout(function() {
                        container.find('.form-result').removeClass('active');
                    }, 3000);
                }
            })
            .fail(function(error) {
                container.find('.form-result').addClass('active').find('span').text('К сожалению, отправка заявки сейчас недоступна.')

                setTimeout(function() {
                    container.find('.form-result').removeClass('active');
                }, 3000);
            })
            .always(function() {

                $('body').click(function(e) {

                    if (!(e.target.parentElement.className == 'form-result active' || e.target.className == 'form-result active')) {

                        $('.form-result').removeClass('active');

                    }

                });
            })
    });

});
