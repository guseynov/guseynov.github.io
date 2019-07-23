$.extend({

    getQueryParameters: function(str) {
        return (str || document.location.search).replace(/(^\?)/, '').split("&").map(function(n) {
            return n = n.split("="), this[n[0]] = n[1], this
        }.bind({}))[0];
    }

});

var hashValue = function(key) {
    if (typeof key !== 'string') {
        key = '';
    } else {
        key = key.toLowerCase();
    }

    var keyAndHash = location.hash.toLowerCase().match(new RegExp(key + '=([^&]*)'));
    var value = '';

    if (keyAndHash) {
        value = keyAndHash[1];
    }

    return value;
};


var hash = window.location.hash.substr(1);


var instagramData = '';
$(function() {

    FastClick.attach(document.body);


    //$(".fancybox").fancybox();


    function maxHeight(e, wrapper) {
        var eMaxHeight = Math.max.apply(null, $(e).map(function() {

            return $(this).outerHeight();
        }).get());

        $(wrapper).outerHeight(eMaxHeight);
    }



    $('[data-images-trigger]').on('click', function() {
        $('[data-images]').removeClass('active');
        $('[data-images=' + $(this).attr('data-images-trigger') + ']').addClass('active');
    });

    $('[data-video-trigger]').on('click', function(e) {
        e.preventDefault();
        //if ($(window).width() > 991) {
        $('.popup-video').addClass('active');
        $('.video-iframe').attr('src', $(this).attr('data-video'));
        // } else {
        //    window.location = $(this).attr('data-video');
        // }
    });

    $('.popup-video').on('click', function() {
        $(this).removeClass('active');
        $('.video-iframe').attr('src', '');
    });

    $('.header__nav li').each(function() {
        $(this).css('width', 'auto');
        width = $(this).width();
        $(this).css('width', width + 30 + 'px');
    });




    $('.story__toggle').on('click', '[data-story-toggle]:not(.active)', function(e) {
        e.preventDefault();
        $('[data-story-toggle]').toggleClass('active');
        $('[data-story-item]').toggle();
    });

    var currSlide = 1;


    var getQuery = $.getQueryParameters();

    $('#fullpage').fullpage({
        scrollingSpeed: 450,
        controlArrows: false,
        verticalCentered: false,
        normalScrollElements: '.sidescreen, .catalog-showcase-item__content, .footer, .header',
        //Custom selectors
        sectionSelector: '.slide',
        slideSelector: '.horizontal-slide',
        //events
        onLeave: function(index, e, direction) {
            //var query = History.getState().url.queryStringToJSON();

            //Generate new link
            // History.pushState({
            //     'slide': $('.slide').eq(e - 1).attr('id'),
            //     'sidescreen': false
            // }, null, '?slide=' + $('.slide').eq(e - 1).attr('id'));

            //Refresh view
            switch (e) {
                case 1:
                    $('.header').eq(0).addClass('header--hidden');
                    $('.athlete').removeClass('active');
                    $('.triangles').removeClass('active');

                    //$('.fade-in').removeClass('active');
                    break;

                case 2:
                    $('.triangles').addClass('active');
                    $('.header').eq(0).removeClass('header--hidden');
                    $('.athlete').addClass('active');
                    //$('.fade-in').addClass('active');
                    break;

                case 3:
                    $('.header').eq(0).removeClass('header--hidden');
                    $('.athlete').removeClass('active');
                    $('.triangles').removeClass('active');

                    //$('.fade-in').removeClass('active');
                    break;
                case 5:
                    console.log('5 here');
                    imagesLoader(instagramData.length);
                    break;
                default:
                    $('.header').eq(0).removeClass('header--hidden');
                    //$('.fade-in').removeClass('active');
                    $('.athlete').removeClass('active');
                    $('.triangles').removeClass('active');

            }
            $('.nav-link').removeClass('active');
            $('.nav-link').eq(e - 1).addClass('active');


            if ($('.slide').eq(e - 1)[0].getAttribute('data-footer-color') == 'dark') {
                if (currSlide > e) {

                    setTimeout(function() {
                        $('.footer').addClass('footer--dark');
                    }, 300);
                } else {

                    setTimeout(function() {
                        $('.footer').addClass('footer--dark');
                    }, 100);
                }
            } else {
                if (currSlide > e) {

                    setTimeout(function() {
                        $('.footer').removeClass('footer--dark');
                    }, 300);
                } else {

                    setTimeout(function() {
                        $('.footer').removeClass('footer--dark');
                    }, 100);
                }

                currSlide = e;

            }

            $('.footer__item--btn-down').addClass('active');
        },
        afterLoad: function(anchorLink, index) {
            if (index == $('.slide').length) {

                $('.footer__item--btn-down').removeClass('active');
            }
        },
        afterRender: function() {},
        afterResize: function() {},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {}
    });

    $('.catalog-list-item').on('click', function() {
        $('.catalog-list-item').removeClass('active');
        $(this).addClass('active');
        $('.catalog-showcase-item').removeClass('active');
        $('.catalog-showcase-item[data-catalog=' + $(this).attr('data-catalog') + ']').addClass('active');
    });


    // if ($(window).width() <= 960) {
    //     slider.unbind();
    //     slider.detectHash = false;
    // }
    $('.news-cards-range').on('input change', function() {
        $('.news-cards').css({
            'transform': 'translate(-' + $(this).val() + 'px, 0)',
            '-webkit-transform': 'translate(-' + $(this).val() + 'px, 0)',
            '-ms-transform': 'translate(-' + $(this).val() + 'px, 0)'
        });
    });

    $('.news-cards-range').prop('max', $('.news-cards').width() - $('.container').width());

    $(window).resize(function() {



        $('.news-cards-range').prop('max', $('.news-cards').width() - $('.container').width());

        if ($(window).width() <= 991) {
            if (!$('.fp-destroyed').length) {
                $.fn.fullpage.destroy('all');
            }
            $('.instagram-carousel').height($(this).outerWidth());
            $(window).scroll(function() {
                if ($(window).scrollTop() > 100) {
                    $('.header--hidden').removeClass('header--hidden');
                } else {
                    $('.header').addClass('header--hidden');
                }
            });

        } else {

            $('.btn--broadcast').text('Подписаться на трансляцию');
            if ($('.fp-destroyed').length) {
                fullpageInit();
            }

            instagramPaddingTop = $('.header').outerHeight();
            instagramPaddingBottom = $('.footer').outerHeight() + (+$('.footer').css('bottom').replace('px', '')) + 34;

            $('[data-anchor=instagram]')
                .css('padding-bottom', instagramPaddingBottom)
                .css('padding-top', instagramPaddingTop);

            var photoHeight = ($(window).height() - instagramPaddingBottom - instagramPaddingTop),
                photosContainerWidth = photoHeight * 2;
            $('.instagram-wrapper').width(photosContainerWidth);
            $('.instagram-more').width($(window).width() - photosContainerWidth);

        }


        calculateHeights();

        $('[data-images], .card__text, .card__desc, .news-card__caption').css('height', 'auto');


        maxHeight('.card__desc', '.card__desc');
        maxHeight('[data-images]', '.article-images-wrapper');
        maxHeight('.card__text', '.card__text');
        maxHeight('.news-card__caption', '.news-card__caption');


        $('.options-range').prop('max', $('.options').width() - $('.options-bootstrap-wrap').width());
        // if ($(window).width() > 960) {} else {
        //     slider.detectHash = false;
        // }

        // if (($(window).width() <= 960) && !$('#fsvs-body').hasClass('fsvs-body--mobile')) {
        //     slider.unbind();
        // } else if (($(window).width() > 960) && $('#fsvs-body').hasClass('fsvs-body--mobile')) {
        //     slider.rebind();
        // }
        $('.header__nav li').each(function() {
            $(this).css('width', 'auto');
            width = $(this).width();
            $(this).css('width', width + (($(window).width() > 1330) ? 20 : 10) + 'px');
        });

    });
    $(".cards").owlCarousel({
        items: 4,
        navigation: true,
        pagination: false,
        navigationText: ['<button class="owl-arrow arrow-left"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
            'version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 197.402 197.402" style="enable-background:new 0 0 197.402 197.402;"' +
            'xml:space="preserve" width="512px" height="512px">' +
            '<polygon points="146.883,197.402 45.255,98.698 146.883,0 152.148,5.418 56.109,98.698 152.148,191.98" fill="#111111"/>' +
            '</svg></button>', '<button class="owl-arrow arrow-right"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
            'version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 223.413 223.413" style="enable-background:new 0 0 223.413 223.413;"' +
            'xml:space="preserve" width="512px" height="512px">' +
            '<polygon points="57.179,223.413 51.224,217.276 159.925,111.71 51.224,6.127 57.179,0 172.189,111.71" fill="#111111" />' +
            '</svg></button>'
        ],
        rewindNav: false,
        itemsDesktop: [],
        itemsDesktopSmall: [],
        itemsTablet: [991, 2],
        itemsTabletSmall: false,
        itemsMobile: [767, 1]
    });

    $(".cards-small-carousel").owlCarousel({
        items: 1,
        navigation: false,
        pagination: true,
        navigationText: ['<button class="owl-arrow arrow-left"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
            'version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 197.402 197.402" style="enable-background:new 0 0 197.402 197.402;"' +
            'xml:space="preserve" width="512px" height="512px">' +
            '<polygon points="146.883,197.402 45.255,98.698 146.883,0 152.148,5.418 56.109,98.698 152.148,191.98" fill="#111111"/>' +
            '</svg></button>', '<button class="owl-arrow arrow-right"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
            'version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 223.413 223.413" style="enable-background:new 0 0 223.413 223.413;"' +
            'xml:space="preserve" width="512px" height="512px">' +
            '<polygon points="57.179,223.413 51.224,217.276 159.925,111.71 51.224,6.127 57.179,0 172.189,111.71" fill="#111111" />' +
            '</svg></button>'
        ],


        rewindNav: false,
        itemsDesktop: [],
        itemsDesktopSmall: [],
        itemsTablet: [],
        itemsTabletSmall: false,
        itemsMobile: []
            // afterInit: function() {
            //     var cardsCarousel = $(".cards").data('owlCarousel');
            //     if ($(window).width() > 1199) {
            //         cardsCarousel.removeItem(2);
            //     }

        // }
    });



    $(".broadcast-carousel").owlCarousel({
        items: 1,
        navigation: true,
        pagination: false,
        navigationText: ['<button class="owl-arrow arrow-left"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
            'version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 197.402 197.402" style="enable-background:new 0 0 197.402 197.402;"' +
            'xml:space="preserve" width="512px" height="512px">' +
            '<polygon points="146.883,197.402 45.255,98.698 146.883,0 152.148,5.418 56.109,98.698 152.148,191.98" fill="#111111"/>' +
            '</svg></button>', '<button class="owl-arrow arrow-right"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
            'version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 223.413 223.413" style="enable-background:new 0 0 223.413 223.413;"' +
            'xml:space="preserve" width="512px" height="512px">' +
            '<polygon points="57.179,223.413 51.224,217.276 159.925,111.71 51.224,6.127 57.179,0 172.189,111.71" fill="#111111" />' +
            '</svg></button>'
        ],
        rewindNav: false,
        itemsDesktop: [],
        itemsDesktopSmall: [],
        itemsTablet: [],
        itemsTabletSmall: false,
        itemsMobile: []
    });

    $(".sponsors-carousel-mobile").owlCarousel({
        items: 1,
        navigation: false,
        pagination: true,

        rewindNav: false,
        itemsDesktop: [],
        itemsDesktopSmall: [],
        itemsTablet: [],
        itemsTabletSmall: false,
        itemsMobile: []
    });


    var newStory = '...которая, как не странно, тоже косвенно была причастна к этому уникальному и ярчайшему в нашей жизни событию.' +
        'На сегодняшний день можно констатировать, что моя карьера начинается удачно. Я играю в театре, снимаюсь в кино и профессионально уже на протяжении 10 лет реализую себя в качестве ведущего мероприятий. Я весело и оптимистично смотрю на жизнь, окружен талантливыми и бездарно талантливыми друзьями, самозабвенно увлекаюсь подводной охотой и фотографией.' +
        'На этом я решительно заканчиваю свой автобиографический рассказ, дорогие друзья. Будьте счастливы! Ваш Сергей Славин.',
        oldStory = $('.story__text').eq(0).text();

    $('.story__btn').on('click', function() {
        if ($(window).width() <= 991) {
            if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                window.setTimeout(function() {
                    window.scrollTo(0, $('[data-anchor=story]').offset().top - $('.header').outerHeight());
                }, 0);
            } else {
                $('html, body').animate({
                    scrollTop: $('[data-anchor=story]').offset().top - $('.header').outerHeight()
                }, 1000);
            }
        } else {
            $.fn.fullpage.moveTo($(this).attr('data-btn-action'));
        }
        if ($(this).hasClass('opened')) {
            $('[data-story-item=1] .story__text').text(oldStory);
            $('.story__btn').text('Что же было дальше?');
            $('.story__btn').removeClass('opened');
        } else {
            $('[data-story-item=1] .story__text').text(newStory);
            $('.story__btn').text('Назад');
            $('.story__btn').addClass('opened');
        }
    });


    $('.header__hamburger').on('click', function(e) {
        e.stopPropagation();
        $('#sidemenu').addClass('active');
        $('body').addClass('darkened');
        $('body').on('click', function(e) {
            if (!($(e.target).hasClass('sidemenu') || $(e.target).parents('.sidemenu').length)) {
                $('#sidemenu').removeClass('active');
                $('body').removeClass('darkened');
                $('body').off('click');
            }
        });

    });



    $('.sidemenu__close, .sidemenu button, .sidemenu a').on('click', function() {
        $('#sidemenu').removeClass('active');
        $('body').removeClass('darkened');
        $('body').off('click, tap');
    });


    // $('.features-slider').slick({
    //     dots: false,
    //     arrows: false,
    //     fade: true,
    //     swipe: false
    // });

    // $('.materials-slider').slick({
    //     dots: false,
    //     arrows: false,
    //     fade: true
    // });

    // $('.cards').slick
    //({
    //     arrows: true,
    //     dots: false,
    //     nextArrow: '<button class="arrow-right"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
    //         'version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 223.413 223.413" style="enable-background:new 0 0 223.413 223.413;"' +
    //         'xml:space="preserve" width="512px" height="512px">' +
    //         '<polygon points="57.179,223.413 51.224,217.276 159.925,111.71 51.224,6.127 57.179,0 172.189,111.71" fill="#111111" />' +
    //         '</svg></button>',
    //     prevArrow: '<button class="arrow-left"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"' +
    //         'version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 197.402 197.402" style="enable-background:new 0 0 197.402 197.402;"' +
    //         'xml:space="preserve" width="512px" height="512px">' +
    //         '<polygon points="146.883,197.402 45.255,98.698 146.883,0 152.148,5.418 56.109,98.698 152.148,191.98" fill="#111111"/>' +
    //         '</svg></button>',
    //     infinite: false
    // });



    function calculateHeights() {
        $('.about-sidescreen__content').css('max-height', $(window).height() - $('.header').outerHeight() - $('.about-sidescreen__content').prev().outerHeight() - 30 /* - $('.about-sidescreen').css('padding-top').replace('px', '') - $('.footer').css('bottom').replace('px', '') - $('.footer').css('height').replace('px', '') - 15*/ );

        // var circleDiameter = Math.round($(window).height() * 0.85);

        // if (circleDiameter >= $(window).width() * 0.5) {
        //     circleDiameter = $(window).width() * 0.5;
        // }

        // $('.athlete').css({
        //     'bottom': -(Math.round(circleDiameter * 0.036)),
        //     'right': -(Math.round(circleDiameter * 0.059))
        // });

        // $('#circle').attr({
        //     'height': circleDiameter,
        //     'width': circleDiameter
        // });
        // $('#circle circle').attr({
        //     'r': Math.round(circleDiameter / 2),
        //     'cx': Math.round(circleDiameter / 2),
        //     'cy': Math.round(circleDiameter / 2)
        // });

        // $('.athlete__img').css({
        //     'max-height': Math.round(circleDiameter * 1.07),
        //     'bottom': Math.round(circleDiameter * 0.036)
        // });

        // $('.athlete__img').css({
        //     'margin-left': -(($('.athlete__img').width()) / 2)
        // });

        $('.vc-content').css({
            'height': $(window).height() - $('.footer').css('bottom').replace('px', '') - $('.footer').outerHeight() - $('.header').outerHeight(),
            'margin-top': $('.header').outerHeight()

        });

        //$('.fade-in').height($(window).height() - $('.header').outerHeight());

        //$('.catalog-showcase-item__content').outerHeight($(window).height() - (Number($('.slide#shops').css('padding-top').replace('px', '')) + Number($('.footer').outerHeight()) + Number($('.footer').css('bottom').replace('px', '')) + Number($('.catalog-showcase-item').css('padding-top').replace('px', '')) + Number($('.catalog-showcase-item').css('padding-bottom').replace('px', '')) + Number($('.catalog-showcase-item__header').outerHeight(true)) + 70));
        $('.catalog__showcase').height($('.catalog-showcase-item').outerHeight());



        $('.map').css('padding-top', $('.header').outerHeight()).height($(window).height() - $('.header').outerHeight());

        $('.athlete__img').imagesLoaded({}, function() {


            if ($(window).width() > 991) {

                var circleDiameter = Math.round($(window).height() * 0.85);

                if (circleDiameter >= $(window).width() * 0.5) {
                    circleDiameter = $(window).width() * 0.5;
                }


                if ($(window).width() <= 1290 && $(window).width() > 991) {

                    $('.athlete').css({
                        'bottom': -(Math.round(circleDiameter * 0.036)),
                        'right': -(Math.round(circleDiameter * 0.25))
                    });

                    $('.circle--small').css({
                        'height': circleDiameter * 0.4 + 'px',
                        'width': circleDiameter * 0.4 + 'px'
                    });
                } else if ($(window).width() < 991) {

                    $('.athlete').css({
                        'bottom': -(Math.round(circleDiameter * 0.036)),
                        'right': -(Math.round(circleDiameter * 0.25))
                    });

                    $('.circle--small').css({
                        'height': circleDiameter * 0.5 + 'px',
                        'width': circleDiameter * 0.5 + 'px'
                    });

                } else {

                    $('.athlete').css({
                        'bottom': -(Math.round(circleDiameter * 0.036)),
                        'right': -(Math.round(circleDiameter * 0.059))
                    });

                    if ($(window).height() <= 850) {

                        $('.circle--small').css({
                            'height': circleDiameter * 0.4 + 'px',
                            'width': circleDiameter * 0.4 + 'px'
                        });
                    } else {

                        $('.circle--small').css({
                            'height': circleDiameter * 0.33 + 'px',
                            'width': circleDiameter * 0.33 + 'px'
                        });
                    }



                }

                $('#circle').attr({
                    'height': circleDiameter,
                    'width': circleDiameter
                });


                $('#circle circle').attr({
                    'r': Math.round(circleDiameter / 2),
                    'cx': Math.round(circleDiameter / 2),
                    'cy': Math.round(circleDiameter / 2)
                });


                $('.athlete__img').css({
                    'max-height': Math.round(circleDiameter * 1.04),
                    'bottom': Math.round(circleDiameter * 0.036)
                });


                $('.athlete__img').css({
                    'margin-left': -(($('.athlete__img').width()) / 2)
                });
            } else {


                var circleDiameter = Math.round($(window).width() * 0.9);

                // $('.circle--small').css({
                //     'height': circleDiameter * 0.4 + 'px',
                //     'width': circleDiameter * 0.4 + 'px'
                // });
                $('.athlete').css({
                    'bottom': -(Math.round(circleDiameter * 0.036))
                });

                $('#circle').attr({
                    'height': circleDiameter,
                    'width': circleDiameter
                });

                $('#circle circle').attr({
                    'r': Math.round(circleDiameter / 2),
                    'cx': Math.round(circleDiameter / 2),
                    'cy': Math.round(circleDiameter / 2)
                });

                $('.athlete__img').css({
                    'max-height': Math.round(circleDiameter * 1.04),
                    'bottom': Math.round(circleDiameter * 0.036)
                });

                $('.athlete__img').css({
                    'margin-left': -(($('.athlete__img').width()) / 2)
                });

                $('.athlete').imagesLoaded({
                    background: true
                }, function() {
                    $(window).scroll(function() {
                        var aboutSectionOffset = $('.athlete').offset().top + circleDiameter,
                            aboutSectionOffsetBottom = $('[data-anchor=about]').offset().top + $('[data-anchor=about]').outerHeight(true);

                        if ((($(window).scrollTop() + $(window).height()) >= aboutSectionOffset) && ($(window).scrollTop() <= aboutSectionOffsetBottom)) {
                            if (!($('.athlete').hasClass('active'))) {

                                $('.athlete').addClass('active');

                            }
                            // } else if (($(window).scrollTop() < aboutSectionOffset) || ($(window).scrollTop() > aboutSectionOffsetBottom)) {
                            //     if (($('.athlete').hasClass('active'))) {

                            //         $('.athlete').removeClass('active');
                            //     }
                        }

                    });
                });

            }

        });
    }

    if ($(window).width() <= 991) {
        $('.instagram-carousel').height($(this).outerWidth());
        if (!$('.fp-destroyed').length) {
            $.fn.fullpage.destroy('all');
        }
        $(window).scroll(function() {
            if ($(window).scrollTop() > 100) {
                $('.header--hidden').removeClass('header--hidden');
            } else {
                $('.header').addClass('header--hidden');
            }
        });
    } else {
        if ($('.fp-destroyed').length) {
            fullpageInit();
        }
    }


    $('[data-btn-action]').on('click', function(e) {
        var that = $(this);
        e.preventDefault();
        if ($(this).attr('data-btn-target') == 'sidescreen') {
            switch ($(this).attr('data-btn-action')) {
                case 'about-sidescreen':
                    $('.sidescreen').addClass('active');
                    $(this).parents('.slide').addClass('slide--swiped');
                    $('.about-sidescreen').addClass('active');
                    $('.footer__item--btn-down').removeClass('active');
                    $('.footer__item').last().removeClass('active');
                    $('.footer').removeClass('footer--dark');
                    $('.map').removeClass('active');
                    $('.footer').addClass('footer--sidescreen');
                    // History.pushState({
                    //     'slide': History.getState().data.slide,
                    //     'sidescreen': 'about-sidescreen'
                    // }, 'АНТИГОЛОЛЁД: официальный интернет-магазин обуви Burgershuhe', window.location.search + '&sidescreen=about-sidescreen');
                    break;


                case 'back':
                    $('.sidescreen').removeClass('active');
                    $('.slide--swiped').removeClass('slide--swiped');
                    $('.footer__item--btn-down').addClass('active');
                    $('.footer__item').last().addClass('active');
                    $('.footer').addClass('active');
                    if ($('.slide.active').attr('data-footer-color') == 'dark') {
                        $('.footer').addClass('footer--dark');
                    }
                    $('.footer').removeClass('footer--sidescreen');

                    // History.pushState({
                    //     'slide': History.getState().data.slide,
                    //     'sidescreen': false
                    // }, 'АНТИГОЛОЛЁД: официальный интернет-магазин обуви Burgershuhe', '?slide=' + History.getState().data.slide);
                    break;
            }
        } else {

            $('.nav-link').removeClass('active');
            $('.sidescreen').removeClass('active');
            $('.slide--swiped').removeClass('slide--swiped');
            $('.footer__item--btn-down').addClass('active');
            $('.footer__item').last().addClass('active');
            $('.footer').addClass('active');
            if ($('.slide.active').attr('data-color') == 'dark') {
                $('.footer').addClass('footer--dark');
            }
            $('.footer').removeClass('footer--sidescreen');

            if ($(window).width() <= 991) {
                if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
                    window.setTimeout(function() {
                        window.scrollTo(0, $('[data-anchor]').eq(+that.attr('data-btn-action') - 1).offset().top - $('.header').outerHeight() + 1);
                    }, 0);
                } else {
                    $('html, body').animate({
                        scrollTop: $('[data-anchor]').eq(+that.attr('data-btn-action') - 1).offset().top - $('.header').outerHeight() + 1
                    }, 1000);
                }
            } else {
                $.fn.fullpage.moveTo($(this).attr('data-btn-action'));
            }
        }

    });

    function scrollHighlight() {
        var topOffset = $('.about-sidescreen__content article').offset().top,
            sideMenu = $('.about-sidescreen__sidemenu'),
            sideMenuItems = sideMenu.find('[data-scroll]'),
            scrollItems = sideMenuItems.map(function() {
                var item = $('.about-sidescreen__content #' + $(this).attr('data-scroll'));
                if (item.length) {
                    return item;
                }
            });
        var fromTop = -$('.about-sidescreen__content .mCSB_container').css('top').replace('px', '') + topOffset;
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length - 1];
        $('.about-sidescreen__sidemenu [data-scroll]').removeClass('active');
        if (cur) {
            $('.about-sidescreen__sidemenu [data-scroll=' + cur.attr('id').split(' ')[0] + ']').addClass('active');
        }
    }


    function defineSliderOffset() {

        var sponsorsSliderWidth = 0;

        $('.sponsors-slider > .row').eq(0).find('.sponsor-wrap').each(function(index) {
            sponsorsSliderWidth += parseInt($(this).outerWidth());
        });

        sponsorsSliderOffsetWidth = sponsorsSliderWidth - $('.container').width();


        $.keyframe.define([{
            name: 'sponsors-slider',
            '0%': { 'transform': 'translate(0, 0)' },

            '50%': { 'transform': 'translate(-' + sponsorsSliderOffsetWidth + 'px, 0)' },

            '100%': { 'transform': 'translate(0, 0)' }
        }, {
            name: 'sponsors-slider-3d',
            '0%': { 'transform': 'translate3d(0, 0, 0)' },

            '50%': { 'transform': 'translate3d(-' + sponsorsSliderOffsetWidth + 'px, 0, 0)' },

            '100%': { 'transform': 'translate3d(0, 0, 0)' }
        }]);


        // setTimeout(function() {
        $('.csstransforms .sponsors-slider').playKeyframe({
            name: 'sponsors-slider', // name of the keyframe you want to bind to the selected element
            duration: '40s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
            timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
            iterationCount: 'infinite' //[optional, default:1]  how many times you want the animation to repeat
        });

        $('.csstransforms3d .sponsors-slider').playKeyframe({
            name: 'sponsors-slider-3d', // name of the keyframe you want to bind to the selected element
            duration: '40s', // [optional, default: 0, in ms] how long you want it to last in milliseconds
            timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
            iterationCount: 'infinite' //[optional, default:1]  how many times you want the animation to repeat
        });
        //   }, 2000)


    }

    // var then = 1459411200000,
    //     now;


    // function convertMS(ms) {
    //     var d, h, m, s, milli;
    //     milli = ms % 1000;
    //     milli = milli.toString().slice(0, 2);

    //     if (milli < 10) {
    //         milli = "0" + milli;
    //     }


    //     s = Math.floor(ms / 1000);
    //     m = Math.floor(s / 60);
    //     s = s % 60;

    //     if (s < 10) {
    //         s = "0" + s;
    //     }


    //     h = Math.floor(m / 60);




    //     m = m % 60;

    //     if (m < 10) {
    //         m = "0" + m;
    //     }


    //     d = Math.floor(h / 24);

    //     if (d < 10) {
    //         d = "0" + d;
    //     }

    //     h = h % 24;

    //     if (h < 10) {
    //         h = "0" + h;
    //     }
    //     document.querySelectorAll('.footer-timer')[0].innerHTML = d + ':' + h + ':' + m + ':' + s + ':' + milli;

    //     $('.footer-timer').text(d + ':' + h + ':' + m + ':' + s + ':' + milli);
    // }
    // now = Date.now();
    // convertMS(then - now);

    // if ($(window).width() >= 1200) {

    //     setInterval(function() {
    //         now = Date.now();
    //         convertMS(then - now);
    //     }, 10);

    // }
    var instagramPaddingTop,
        instagramPaddingBottom;

    defineSliderOffset();

    $(window).load(function() {

        if ($(window).scrollTop() >= $('.fade-in').offset().top - 250) {
            if (!($('.fade-in').hasClass('active'))) {
                $('.fade-in').addClass('active');
            }
        }

        $(window).scroll(function() {

            if ($(window).scrollTop() >= $('.fade-in').offset().top - 250) {
                if (!($('.fade-in').hasClass('active'))) {

                    $('.fade-in').addClass('active');

                }
                // } else if (($(window).scrollTop() < aboutSectionOffset) || ($(window).scrollTop() > aboutSectionOffsetBottom)) {
                //     if (($('.athlete').hasClass('active'))) {

                //         $('.athlete').removeClass('active');
                //     }
            }

        });

        //instagram photos sizing

        instagramPaddingTop = $('.header').outerHeight();
        instagramPaddingBottom = $('.footer').outerHeight() + (+$('.footer').css('bottom').replace('px', '')) + 34;

        $('[data-anchor=instagram]')
            .css('padding-bottom', instagramPaddingBottom)
            .css('padding-top', instagramPaddingTop);

        var photoHeight = ($(window).height() - instagramPaddingBottom - instagramPaddingTop),
            photosContainerWidth = photoHeight * 2;
        $('.instagram-wrapper').width(photosContainerWidth);
        $('.instagram-more').width($(window).width() - photosContainerWidth);



        $('.loader').removeClass('active');
        calculateHeights();

        if ($(window).width() > 991) {
            $('.about-sidescreen__content').mCustomScrollbar({
                theme: "blue-theme",
                scrollInertia: 100,
                mouseWheel: {
                    scrollAmount: 100
                },
                callbacks: {
                    onScroll: function() {
                        scrollHighlight();
                    }
                }
            });
        } else {

            $('.btn--broadcast').text('Подписаться на трансляцию');
        }
        //  else {
        //     $('.sidemenu [data-nav-slide]').on('click', function() {
        //         $('html, body').animate({
        //             scrollTop: $('[data-anchor').eq(+$(this).attr('data-nav-slide') - 1).offset().top - $('.header').outerHeight()
        //         }, 1000);
        //     });
        // }

        if (hash == 'actor') {
            $('.sidescreen').addClass('active');
            $(this).parents('.slide').addClass('slide--swiped');
            $('.about-sidescreen').addClass('active');
            $('.footer__item--btn-down').removeClass('active');
            $('.footer__item').last().removeClass('active');
            $('.footer').removeClass('footer--dark');
            $('.map').removeClass('active');
            $('.footer').addClass('footer--sidescreen');
        }

        if (hash && hash != 'frontscreen' && ($(window).width() >= 767)) {
            $('.header--hidden').removeClass('header--hidden');
        }

        maxHeight('[data-images]', '.article-images-wrapper');


        maxHeight('.card__text', '.card__text');

        maxHeight('.card__desc', '.card__desc');

        maxHeight('.news-card__caption', '.news-card__caption');

        maxHeight('.footer__item', '.footer__item');


        $('.catalog-showcase-item__content').mCustomScrollbar({
            theme: "blue-theme-inverse",
            scrollInertia: 100,
            mouseWheel: {
                scrollAmount: 100
            }
        });



    });



    var imagesLoader = function(count) {
        var params = {
            delay: 100,
            imgIndex: 0,
            imgLength: count
        };

        loadImg();

        function loadImg() {
            var imgElem = $('.instagram-photo img').eq(params.imgIndex),
                imgObj = new Image();
            imgObj.onload = completeLoadImg;
            imgObj.src = imgElem.data('src');
        }

        function completeLoadImg() {
            var imgElem = $('.instagram-photo img').eq(params.imgIndex);
            imgElem.attr('src', this.src);
            params.imgIndex++;
            if (params.imgIndex < params.imgLength) setTimeout(loadImg, params.delay);
        }
    };

    function unsetImagesSource() {
        var images = $('.instagram-photo img');
        for (var i = 0; i < images.length; ++i) {
            images.eq(i).data('src', 'img/loader.png').attr('src', 'img/loader.png');
        }
    }

    // $.post('instagram.php', function(data) {
    //     instagramData = JSON.parse(data);
    //     instagramData = instagramData.data;
    //     console.log(instagramData);
    //     var links = $('a.instagram-photo');
    //     var smallImagesLinks = $('a.instagram-photo-small');
    //     var images = $('.instagram-photo img');
    //     var smallImages = $('.instagram-photo-small img');
    //     unsetImagesSource();
    //     for (var i = 0; i < instagramData.length; ++i) {
    //         images.eq(i).data('src', instagramData[i].images.low_resolution.url);
    //         smallImages.eq(i).attr('src', instagramData[i].images.low_resolution.url);
    //         links.eq(i).attr('href', instagramData[i].link);
    //         smallImagesLinks.eq(i).attr('href', instagramData[i].link);
    //     }

    //     if (hash == 'instagram') {
    //         imagesLoader(instagramData.length);
    //     }
    // });


    $('[data-scroll]').on('click', function(e) {
        var that = $(this);
        e.preventDefault();

        if (!$('.sidescreen').hasClass('active')) {
            $('.sidescreen').addClass('active');
            $(this).parents('.slide').addClass('slide--swiped');
            $('.about-sidescreen').addClass('active');
            $('.footer__item--btn-down').removeClass('active');
            $('.footer__item').last().removeClass('active');
            $('.footer').removeClass('footer--dark');
            $('.map').removeClass('active');
            $('.footer').addClass('footer--sidescreen');
        }
        // History.pushState({
        //     'slide': History.getState().data.slide,
        //     'sidescreen': 'about-sidescreen'
        // }, 'АНТИГОЛОЛЁД: официальный интернет-магазин обуви Burgershuhe', '?slide=about-sidescreen&sidescreen=about-sidescreen#' + $(this).attr('data-scroll'));
        // e.preventDefault();

        $('[data-scroll]').removeClass('active');
        $('[data-scroll=' + $(this).attr('data-scroll') + ']').addClass('active');

        if ($(window).width() > 991) {

            $('.about-sidescreen__content').mCustomScrollbar('scrollTo', $('#' + that.attr('data-scroll')).position().top, { scrollInertia: 0 });
        } else {
            $('.about-sidescreen__content').scrollTop($('#' + that.attr('data-scroll')).position().top);
        }
    });


    $('.about-sidescreen')
        .css('padding-top', $('.header').outerHeight())
        .css('padding-bottom', $('.footer').outerHeight() + 25);



    $('.footer__item--btn-down').on('click', function() {
        $.fn.fullpage.moveSectionDown();
    });


    $('.header__hamburger').on('click', function() {
        $('.sidemenu').addClass('active');
    });

    $('.sidemenu-close, .sidemenu__list a').on('click', function() {
        $('.sidemenu').removeClass('active');
    });

    $('.options-range').prop('max', $('.options').width() - $('.options-bootstrap-wrap').width());


    $('.options-range').on('input change', function() {
        $('.options').css({
            'transform': 'translate(-' + $(this).val() + 'px, 0)',
            '-webkit-transform': 'translate(-' + $(this).val() + 'px, 0)',
            '-ms-transform': 'translate(-' + $(this).val() + 'px, 0)'
        });
    });

    // if ($.fn.fullpage) {
    //     if (getQuery.slide) {
    //         $.fn.fullpage.moveTo(getQuery.slide);
    //     }

    //     if (getQuery.sidescreen) {
    //         switch (getQuery.sidescreen) {
    //             case 'about-sidescreen':
    //                 $('.about-sidescreen').addClass('active');
    //                 $('.footer__item--btn-down').removeClass('active');
    //                 $('.footer__item').last().removeClass('active');
    //                 setTimeout(function() {
    //                     $('.slide.active').addClass('slide--swiped');
    //                     $('.footer').removeClass('footer--dark');
    //                     $('.sidescreen').addClass('active');
    //                     History.replaceState({
    //                         'slide': History.getState().data.slide,
    //                         'sidescreen': 'about-sidescreen'
    //                     }, 'АНТИГОЛОЛЁД: официальный интернет-магазин обуви Burgershuhe', '?slide=about-sidescreen&sidescreen=about-sidescreen');
    //                 }, 1000);
    //                 $('.about-sidescreen').addClass('active');

    //                 break;
    //         }
    //     }
    // }

    // $('.feedback-form').on('submit', function(e) {
    //     var that = $(this);
    //     e.preventDefault();


    //     $.ajax({
    //             type: "POST",
    //             url: 'mail.php',
    //             data: that.serialize()
    //         })
    //         .done(function(data) {
    //             if (data == 'Success') {
    //                 $('#success').modal('show');
    //             } else {
    //                 $('#success').modal('show');
    //             }
    //         })
    //         .fail(function(error) {
    //             console.log(error);
    //             $('#fail').modal('show');
    //         });

    // });

});
