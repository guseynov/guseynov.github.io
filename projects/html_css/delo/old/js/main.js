$(function() {
    var showcaseContentHeight = 0,
        tempHeight;
    $('.showcase-wrapper > *').each(function() {
        tempHeight = $(this).height() + Number($(this).css('top').replace('px', ''));
        if (tempHeight > showcaseContentHeight) {
            showcaseContentHeight = tempHeight;
        }
    });

    $('.showcase-wrapper').height(showcaseContentHeight).css('margin-top', -(showcaseContentHeight / 2));

    $('[data-hero]').hover(function() {
        if (!($('.heroes__bg').hasClass('active'))) {
            $('.hero-image[data-hero=' + $(this).attr('data-hero') + ']').removeClass('hero-image--darkened').siblings('.hero-image[data-hero]').addClass('hero-image--darkened');
        }
    }, function() {
        $('.hero-image[data-hero]').removeClass('hero-image--darkened');
    });

    $('.experts__slider').slick({
        fade: true,
        dots: true,
        prevArrow: '<button class="prev-arrow slider-button"><img src="img/left-arrow.png"> <img class="hover-img" src="img/left-arrow--hover.png"></button>',
        nextArrow: '<button class="next-arrow slider-button"><img src="img/right-arrow.png"> <img class="hover-img" src="img/right-arrow--hover.png"></button>'

    });

    $('.showcase').imagesLoaded(function() {
        $('.loader').fadeOut(1000);
        $('.showcase__logo').addClass('animated fadeIn');
        $('.showcase .play').addClass('animated fadeInRight');
        $('.showcase__map').addClass('animated fadeInDown');
    });

    $('.showcase .play').click(function() {
        $('.showcase__video').addClass('active').find('video')[0].play();
    });

    $('.showcase__video').click(function() {
        $(this)
            .removeClass('active')
            .find('video')
            .get(0)
            .pause();
    });

    $('.showcase__video video').click(function(e) {
        e.stopPropagation();
    });

    $('.showcase__video video').on('ended', function() {
        console.log('Video has ended!');
    });

    if ($(window).scrollTop() > 500) {
        $('.header--scroll').addClass('active');
    } else {
        $('.header--scroll').removeClass('active');
    }

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 500) {
            $('.header--scroll').addClass('active');
        } else {
            $('.header--scroll').removeClass('active');
        }
    });

    var heroesDescriptions = {
        'dobrofeev': {
            name: 'Елена Лудкова',
            position: 'Социальный предприниматель',
            text: 'В отрезанной Северной Двиной от большой земли деревне возглавила территориальное общественное самоуправление, объединяющее в команду жителей нескольких деревень. Своими силами ТОС создал точку жизни и роста сообщества – создав музей, клуб',
            coordinates: {
                left: '33%'
            },
            video: '<iframe src="https://www.youtube.com/embed/1X7xmAWufrE" frameborder="0" allowfullscreen></iframe>'
        },
        'bronsky': {
            name: 'Елена Лудкова',
            position: 'Социальный предприниматель',
            text: 'В отрезанной Северной Двиной от большой земли деревне возглавила территориальное общественное самоуправление, объединяющее в команду жителей нескольких деревень. Своими силами ТОС создал точку жизни и роста сообщества – создав музей, клуб',
            coordinates: {
                left: '47%'
            },
            video: '<iframe src="https://www.youtube.com/embed/1X7xmAWufrE" frameborder="0" allowfullscreen></iframe>'
        },
        'polikina': {
            name: 'Елена Лудкова',
            position: 'Социальный предприниматель',
            text: 'В отрезанной Северной Двиной от большой земли деревне возглавила территориальное общественное самоуправление, объединяющее в команду жителей нескольких деревень. Своими силами ТОС создал точку жизни и роста сообщества – создав музей, клуб',
            coordinates: {
                right: '46%'
            },
            video: '<iframe src="https://www.youtube.com/embed/1X7xmAWufrE" frameborder="0" allowfullscreen></iframe>'
        },
        'starodubtsevy': {
            name: 'Елена Лудкова',
            position: 'Социальный предприниматель',
            text: 'В отрезанной Северной Двиной от большой земли деревне возглавила территориальное общественное самоуправление, объединяющее в команду жителей нескольких деревень. Своими силами ТОС создал точку жизни и роста сообщества – создав музей, клуб',
            coordinates: {
                right: '36%'
            },
            video: '<iframe src="https://www.youtube.com/embed/1X7xmAWufrE" frameborder="0" allowfullscreen></iframe>'
        }
    };

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
    });

    $('.heroes__bg, .heroes__images--description').click(function() {
        $('.heroes__images--description .hero-image').removeClass('active');
        $('.heroes__images--description').removeClass('active');
        $('.heroes__bg').removeClass('active');
        $('.heroes__description').removeClass('active');
    });

    $('.heroes__description, .hero-image, .popup').click(function(e) {
        e.stopPropagation();
    });

    $('.overlay').click(function() {
        $(this)
            .removeClass('active')
            .find('.popup--video').html('');
        $('.popup').removeClass('active');
    });

    $('.watch-an-episode .play').click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 1000);
        setTimeout(function() {
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

    $('[data-popup').click(function() {
        var that = $(this);
        $('.overlay').addClass('active');
        $('.popup[data-popup=' + that.attr('data-popup') + ']').addClass('active');

        if (that.attr('data-popup') == 'video') {
            $('.popup[data-popup=video]').html(that.attr('data-video'));
        }
    });

    var topMenu = $('.header__nav'),
        topMenuHeight = $('.header').height() + 15,
        menuItems = topMenu.find('li'),
        scrollItems = menuItems.map(function() {
            var item = $('section.' + $(this).attr('data-scroll'));
            if (item.length) {
                return item;
            }
        });

    $(window).scroll(function() {
        var fromTop = $(this).scrollTop() + topMenuHeight;
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length - 1];
        $('header [data-scroll]').removeClass('active');
        $('header [data-scroll=' + cur.attr('class') + ']').addClass('active');
    });
});
