if ($(window).width() < 767) {
    $('.loader').hide();
}

$(function() {

    function recalculate() {
        var showcaseContentHeight = 0,
            tempHeight;
        $('.showcase-wrapper > *').each(function() {
            tempHeight = $(this).height() + Number($(this).css('top').replace('px', ''));
            if (tempHeight > showcaseContentHeight) {
                showcaseContentHeight = tempHeight;
            }
        });

        $('.showcase-wrapper').height(showcaseContentHeight).css('margin-top', -(showcaseContentHeight / 2));


        if ($(window).height() < 650) {
            $('.showcase').css('height', '750px');
        } else {
            $('.showcase').css('height', '100vh');
        }
    }


    recalculate();


    $(window).resize(function() {
        recalculate();
        //$('#showcase-video').css('height', $('#showcase-video video').height() + 'px');
    });

    $('[data-hero]').hover(function() {
        if (!($('.heroes__bg').hasClass('active'))) {
            $('.hero-image[data-hero=' + $(this).attr('data-hero') + ']').removeClass('hero-image--darkened').siblings('.hero-image[data-hero]').addClass('hero-image--darkened');
            $('.heroes__names [data-hero=' + $(this).attr('data-hero') + ']').siblings().addClass('darkened');
        }
    }, function() {
        $('.hero-image[data-hero]').removeClass('hero-image--darkened');
        $('.heroes__names [data-hero]').removeClass('darkened');
    });

    $('.experts__slider').slick({
        fade: true,
        dots: true,
        responsive: [{
            breakpoint: 991,
            settings: {
                arrows: false
            }
        }],
        prevArrow: '<button class="prev-arrow slider-button"><img src="img/left-arrow.png"> <img class="hover-img" src="img/left-arrow--hover.png"></button>',
        nextArrow: '<button class="next-arrow slider-button"><img src="img/right-arrow.png"> <img class="hover-img" src="img/right-arrow--hover.png"></button>'
    });

    $('.heroes-carousel-wrapper').slick({
        fade: true,
        dots: true,
        arrows: false
    });

    $('.showcase').imagesLoaded(function() {
        $('.loader').fadeOut(1000);
        $('.showcase__logo, .showcase__string').addClass('animated fadeIn');
        $('.showcase .play').addClass('animated fadeInRight');
        $('.showcase__map').addClass('animated fadeInUp');
    });

    if ($(window).width() < 767) {
        $('.loader').hide();
    }

    $('.showcase .play, #video-repeat').click(function() {
        $('.showcase__video-ended').removeClass('active');
        $('.showcase__video').addClass('active').find('video')[0].play();
    });

    $('.showcase__video').click(function() {
        $(this)
            .removeClass('active')
            .find('video')
            .get(0)
            .pause();
    });

    $('.showcase__video video').on('ended', function() {
        $(this)
            .parent()
            .removeClass('active')
            .parents('.showcase')
            .find('.showcase__video-ended')
            .addClass('active');
    });

    if ($(window).scrollTop() > 500) {
        $('.header--scroll').addClass('active');
    } else {
        $('.header--scroll').removeClass('active');
    }

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 500) {
            $('.header--scroll').addClass('active');

            if ($(window).width() > 991) {
                $('.showcase__video-ended').removeClass('active');
                $('.showcase__video')
                    .removeClass('active')
                    .find('video')
                    .get(0)
                    .pause();
            }
        } else {
            $('.header--scroll').removeClass('active');
        }

        if ($(this).scrollTop() > $('.heroes').offset().top + 500) {
            $('.heroes__images--description .hero-image').removeClass('active');
            $('.heroes__images--description').removeClass('active');
            $('.heroes__bg').removeClass('active');
            $('.heroes__description').removeClass('active');
            $('.heroes__names [data-hero]').css('opacity', '1');
        }
    });

    var heroesDescriptions = {
        'dorofeev': {
            name: 'Тимофей Дорофеев',
            position: 'Ежегодный Джаз-фестиваль',
            text: 'Гитарист и популяризатор джазовой музыки Тим Дорофеев: много лет выступает организатором международных джазовых фестивалей, превращая Архангельск в центр музыкального джазового искусства, в который стремятся ведущие исполнители от Японии до Норвегии',
            coordinates: {
                left: '33%'
            },
            video: '<iframe src="https://www.youtube.com/embed/1X7xmAWufrE" frameborder="0" allowfullscreen></iframe>'
        },
        'bronsky': {
            name: 'Михаил Бронский',
            position: 'Бронский чай',
            text: 'В глубинке Архангельской области, в родовом доме, где жили его прадеды, создал масштабное производство Иван-чая, дав работу десяткам семей из деревень в радиусе 70 км',
            coordinates: {
                left: '47%'
            },
            video: '<iframe src="https://www.youtube.com/embed/1X7xmAWufrE" frameborder="0" allowfullscreen></iframe>'
        },
        'polikina': {
            name: 'Елена Лудкова',
            position: 'Территориальное общественное самоуправление «Белое озерко»',
            text: 'В отрезанной Северной Двиной от большой земли деревне возглавила территориальное общественное самоуправление, объединяющее в команду жителей нескольких деревень. Своими силами ТОС создал точку жизни и роста сообщества – создав музей, клуб, познавательный центр для детей и место встреч для взрослых',
            coordinates: {
                right: '46%'
            },
            video: '<iframe src="https://www.youtube.com/embed/1X7xmAWufrE" frameborder="0" allowfullscreen></iframe>'
        },
        'starodubtsevy': {
            name: 'Вячеслав и Татьяна Стародубцевы',
            position: 'Театр-студия Премьер',
            text: 'Почти три десятка лет в когда-то секретном городе Северодвинске увлеченные общим делом и любовью с сцене супруги основали и подарили городу свой театр. Для детей и взрослых',
            coordinates: {
                right: '36%'
            },
            video: '<iframe src="https://www.youtube.com/embed/1X7xmAWufrE" frameborder="0" allowfullscreen></iframe>'
        }
    };

    $('.sidemenu li').click(function() {
        $('.sidemenu').toggleClass('active');
    })

    $('[data-hero]').click(function() {
        var heroID = $(this).attr('data-hero');
        $('.heroes__bg').addClass('active');
        $('.heroes__description').addClass('active').css({
            'left': heroesDescriptions[heroID].coordinates.left || 'auto',
            'right': heroesDescriptions[heroID].coordinates.right || 'auto'
        });
        $('.heroes__images--description').addClass('active');
        $('.heroes__images--description .hero-image').removeClass('active');
        $('.heroes__images--description .hero-image[data-hero=' + heroID + ']').addClass('active');
        $('.hero-name').text(heroesDescriptions[heroID].name);
        $('.hero-position').text(heroesDescriptions[heroID].position);
        $('.hero-text').text(heroesDescriptions[heroID].text);
        $('.hero-video').attr('data-video', heroesDescriptions[heroID].video);
        $('.heroes__names [data-hero=' + heroID + ']').css('opacity', '1');
        $('.heroes__names [data-hero=' + heroID + ']').siblings().css('opacity', '0.7');
    });

    $('.heroes__bg, .heroes__images--description').click(function() {
        $('.heroes__images--description .hero-image').removeClass('active');
        $('.heroes__images--description').removeClass('active');
        $('.heroes__bg').removeClass('active');
        $('.heroes__description').removeClass('active');
        $('.heroes__names [data-hero]').css('opacity', '1');
    });

    $('.heroes__description, .hero-image, .popup').click(function(e) {
        e.stopPropagation();
    });

    $('.overlay').click(function() {
        $(this)
            .removeClass('active')
            .find('[data-popup=video]').html('');
        $('.popup').removeClass('active');
        $('.popup__result').removeClass('active');
    });

    $('.watch-an-episode .play').click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
        setTimeout(function() {

            $('.showcase__video-ended').removeClass('active');
            $('.showcase__video')
                .addClass('active')
                .find('video')
                .get(0)
                .play()
        }, 1000);
    });

    $('[data-scroll]').click(function() {
        var that = $(this);
        $('html,body').animate({
            scrollTop: $('.' + that.attr('data-scroll')).offset().top - $('.header').height()
        }, 1000);
    });



    $('[data-popup]').click(function() {
        var that = $(this);
        $('.overlay').addClass('active');
        $('.popup[data-popup=' + that.attr('data-popup') + ']').addClass('active');

        if (that.attr('data-popup') == 'video') {
            $('.popup[data-popup=video]').html(that.attr('data-video'));
        }
    });

    function navMap() {
        var topMenu = $('.header__nav'),
            topMenuHeight = $('.header').height() + 15,
            menuItems = topMenu.find('li'),
            scrollItems = menuItems.map(function() {
                var item = $('section.' + $(this).attr('data-scroll'));
                if (item.length) {
                    return item;
                }
            });


        var fromTop = $(this).scrollTop() + topMenuHeight;
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length - 1];
        $('header [data-scroll]').removeClass('active');
        $('header [data-scroll=' + cur.attr('class').split(' ')[0] + ']').addClass('active');
    }


    if ($(window).width() >= 768) {
        navMap();
    }
    $(window).scroll(function() {
        if ($(window).width() >= 768) {
            navMap();
        }
    });

    $('.header__sidemenu-trigger, .sidemenu__close').click(function() {
        $('.sidemenu').toggleClass('active');
    });

    $('button[type="submit"]').click(function(e) {
        e.preventDefault();
        var that = $(this);
        $.post('http://dimaneva.ru/delo/ajax.php', that.parents('.popup__form').serialize())
            .done(function(result) {
                if (result.trim() == 'Success') {
                    console.log(result);
                    that.parents('.popup').find('.popup__result').addClass('active').find('p').text('Запрос на получение документов отправлен.');
                } else {
                    console.log(result);
                    that.parents('.popup').find('.popup__result').addClass('active').find('p').text('К сожалению, не удалось отправить запрос.');
                }
            })
            .fail(function(error) {
                console.log(error);
                that.parents('.popup').find('.popup__result').addClass('active').find('p').text('К сожалению, не удалось отправить запрос.');
            });
    });

    videojs("showcase-video", {
        "controls": true
    }, function() {
        $('#showcase-video').click(function(e) {
            e.stopPropagation();
        });

        $('#showcase-video')
            //.css('height', $('#showcase-video video').height() + 'px')
            .append('<button class="showcase-video-close"><span class="fa fa-close fa-4x"></span></button>');


        $('.showcase-video-close').click(function() {
            $('.showcase__video')
                .removeClass('active')
                .find('video')
                .get(0)
                .pause();
        });
    });

});
