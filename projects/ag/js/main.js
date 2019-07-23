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


$(function() {

    ymaps.ready(init);
    var map,
        shopsCollection,
        officeCollection;

    function init() {

        map = new ymaps.Map("map", {
            center: [59.938531, 30.313497],
            zoom: 11,
            controls: []
        });

        var shopsCoords = [
                [59.912269, 30.475984],
                [59.863848, 30.37239],
                [59.836147, 30.350902],
                [59.857554, 30.212706],
                [59.8905, 30.329963],
                [60.033994, 30.420576],
                [59.948212, 30.473666],
                [59.542128, 30.873596],
                [58.73658, 29.848654],
                [60.709457, 28.749898],
                [59.376503760746516, 28.607622499999902],
                [59.643841, 33.538808],
                [58.741311, 29.848879]
            ],
            shopsCollection = new ymaps.GeoObjectCollection({}, {
                preset: 'islands#blueIcon'

            }),
            contactCoords = [
                [59.89327675811333, 30.330950499999975]
            ],
            officeCollection = new ymaps.GeoObjectCollection({}, {
                preset: 'islands#blueIcon'

            });

        for (var i = 0; i < shopsCoords.length; i++) {
            shopsCollection.add(new ymaps.Placemark(shopsCoords[i]));
        }


        for (i = 0; i < contactCoords.length; i++) {
            officeCollection.add(new ymaps.Placemark(contactCoords[i]));
        }

        map.geoObjects.add(shopsCollection);

        $('[data-btn-action]').click(function() {


            if ($(this).attr('data-btn-target') == 'sidescreen') {
                $('.nav-link').removeClass('active');
                switch ($(this).attr('data-btn-action')) {
                    case 'payment':
                        $('.sidescreen').addClass('active');
                        $(this).parents('.slide').addClass('slide--swiped');
                        $('.payment').addClass('active');
                        $('.footer__item--btn-down').removeClass('active');
                        $('.footer__item').last().removeClass('active');
                        $('.footer').removeClass('footer--dark');
                        $('.map').removeClass('active');
                        History.pushState({
                            'slide': History.getState().data.slide,
                            'sidescreen': 'payment'
                        }, 'АНТИГОЛОЛЁД: официальный интернет-магазин обуви Burgershuhe', window.location.search + '&sidescreen=payment');
                        break;
                    case 'map':
                        $('.sidescreen').addClass('active');
                        $(this).parents('.slide').addClass('slide--swiped');
                        $('.payment').removeClass('active');
                        $('.map').addClass('active');
                        $('.footer').removeClass('active');
                        History.pushState({
                            'slide': History.getState().data.slide,
                            'sidescreen': 'map'
                        }, 'АНТИГОЛОЛЁД: официальный интернет-магазин обуви Burgershuhe', window.location.search + '&sidescreen=map');

                        switch ($(this).attr('data-place')) {

                            case 'saint-petersburg':
                                map.geoObjects.add(shopsCollection);
                                map.geoObjects.remove(officeCollection);
                                map.setZoom(11);
                                map.panTo(
                                    [59.938531, 30.313497], {
                                        flying: false
                                    }
                                )
                                break;
                            case 'vyborg':

                                map.geoObjects.add(shopsCollection);
                                map.geoObjects.remove(officeCollection);
                                map.setZoom(15);
                                map.panTo(
                                    [60.709457, 28.749898], {
                                        flying: false
                                    }
                                )

                                break;

                            case 'kingisepp':

                                map.geoObjects.add(shopsCollection);
                                map.geoObjects.remove(officeCollection);
                                map.setZoom(15);
                                map.panTo(
                                    [59.376503760746516, 28.607622499999902], {
                                        flying: false
                                    }
                                )

                                break;

                            case 'luga':

                                map.geoObjects.add(shopsCollection);
                                map.geoObjects.remove(officeCollection);
                                map.setZoom(15);
                                map.panTo(
                                    [58.73658, 29.848654], {
                                        flying: false
                                    }
                                )


                                break;

                            case 'tihvin':

                                map.geoObjects.add(shopsCollection);
                                map.geoObjects.remove(officeCollection);
                                map.setZoom(15);
                                map.panTo(
                                    [59.643841, 33.538808], {
                                        flying: false
                                    }
                                )


                                break;

                            case 'tosno':

                                map.geoObjects.add(shopsCollection);
                                map.geoObjects.remove(officeCollection);
                                map.setZoom(15);
                                map.panTo(
                                    [59.542128, 30.873596], {
                                        flying: false
                                    }
                                )


                                break;

                            case 'office':
                                map.geoObjects.remove(shopsCollection);
                                map.geoObjects.add(officeCollection);
                                map.setZoom(15);
                                map.panTo(
                                    [59.89327675811333, 30.330950499999975], {
                                        flying: false
                                    }
                                )
                        }

                        break;

                    case 'back':
                        $('.sidescreen').removeClass('active');
                        $('.slide--swiped').removeClass('slide--swiped');
                        $('.footer__item--btn-down').addClass('active');
                        $('.footer__item').last().addClass('active');
                        $('.footer').addClass('active');
                        if ($('.slide.active').attr('data-color') == 'dark') {
                            $('.footer').addClass('footer--dark');
                        }
                        History.pushState({
                            'slide': History.getState().data.slide,
                            'sidescreen': false
                        }, 'АНТИГОЛОЛЁД: официальный интернет-магазин обуви Burgershuhe', '?slide=' + History.getState().data.slide);
                        break;
                }
            } else {

                $.fn.fullpage.moveTo($(this).attr('data-btn-action'));
            }

        });
    }

    // var currSlide = 0;
    // var slider = $.fn.fsvs({
    //     speed: 500,
    //     bodyID: 'fsvs-body',
    //     selector: '> .slide',
    //     mouseSwipeDisance: 40,
    //     afterSlide: function(e) {},
    //     beforeSlide: function(e) {
    //         console.log(e);
    //         switch (e) {
    //             case 0:
    //                 $('.header').eq(0).addClass('header--hidden');
    //                 $('.family').removeClass('active');
    //                 $('.triangles').removeClass('active');
    //                 break;

    //             case 1:
    //                 $('.triangles').addClass('active');
    //                 $('.header').removeClass('header--hidden');
    //                 $('.family').addClass('active');
    //                 break;

    //             case 2:
    //                 $('.fade-in').addClass('active');
    //                 $('.header').removeClass('header--hidden');
    //                 $('.family').removeClass('active');
    //                 $('.triangles').removeClass('active');
    //                 break;

    //             default:
    //                 $('.header').removeClass('header--hidden');
    //                 $('.fade-in').removeClass('active');
    //                 $('.family').removeClass('active');
    //                 $('.triangles').removeClass('active');

    //         }
    //         $('.nav-link').removeClass('active');
    //         $('.nav-link').eq(e - 1).addClass('active');


    //         if ($('.slide').eq(e)[0].getAttribute('data-color') == 'dark') {
    //             if (currSlide > e) {

    //                 setTimeout(function() {
    //                     $('.footer').addClass('footer--dark');
    //                 }, 300);
    //             } else {

    //                 setTimeout(function() {
    //                     $('.footer').addClass('footer--dark');
    //                 }, 100);
    //             }
    //         } else {
    //             if (currSlide > e) {

    //                 setTimeout(function() {
    //                     $('.footer').removeClass('footer--dark');
    //                 }, 300);
    //             } else {

    //                 setTimeout(function() {
    //                     $('.footer').removeClass('footer--dark');
    //                 }, 100);
    //             }

    //             currSlide = e;

    //         }

    //         $('.footer__item--btn-down').addClass('active');
    //     },
    //     endSlide: function(e) {

    //         $('.footer__item--btn-down').removeClass('active');
    //     },
    //     mouseWheelEvents: true,
    //     mouseWheelDelay: false,
    //     scrollableArea: 'scrollable',
    //     mouseDragEvents: false,
    //     touchEvents: true,
    //     arrowKeyEvents: false,
    //     pagination: false,
    //     nthClasses: false,
    //     detectHash: true
    // });


    var currSlide = 1;

    var getQuery = $.getQueryParameters();

    ag = {
        timer: null,
        stepduration: 50,
        min: 0,
        to_max: function() {
            if (ag.timer) {
                clearInterval(ag.timer);
            }

            ag.timer = setInterval(function() {
                if (ag.current >= ag.max) {
                    clearInterval(ag.timer);

                    setTimeout(function() {
                        ag.go();
                    }, 500);


                    return;
                }

                ag.current += ag.step;

                $('.sole-animation').css('background-position', '0px -' + ag.current + 'px');
            }, ag.stepduration);
        },
        to_min: function() {
            if (ag.timer) {
                clearInterval(ag.timer);
            }

            ag.timer = setInterval(function() {
                if (ag.current <= ag.min) {
                    clearInterval(ag.timer);

                    setTimeout(function() {
                        ag.go();
                    }, 500);


                    return;
                }

                ag.current -= ag.step;

                $('.sole-animation').css('background-position', '0px -' + ag.current + 'px');
            }, ag.stepduration);
        },
        go: function() {
            if (ag.current >= ag.max) {
                ag.to_min();
            } else {
                ag.to_max();
            }
        },
        stop: function() {
            clearInterval(ag.timer);
        }
    };

    function fullpageInit() {
        $('#fullpage').fullpage({
            scrollingSpeed: 450,
            controlArrows: false,
            lockAnchors: true,
            anchors: [],
            scrollOverflow: false,
            fitToSection: true,
            verticalCentered: false,
            normalScrollElements: '.sidescreen, .catalog-showcase-item__content, .footer, .header',
            //Custom selectors
            sectionSelector: '.slide',
            slideSelector: '.horizontal-slide',
            //events
            onLeave: function(index, e, direction) {
                var query = History.getState().url.queryStringToJSON();

                //Generate new link
                History.pushState({
                    'slide': $('.slide').eq(e - 1).attr('id'),
                    'sidescreen': false
                }, null, '?slide=' + $('.slide').eq(e - 1).attr('id'));

                //Refresh view
                switch (e) {
                    case 1:
                        $('.header').eq(0).addClass('header--hidden');
                        $('.family').removeClass('active');
                        $('.triangles').removeClass('active');
                        ag.stop();
                        break;

                    case 2:
                        $('.triangles').addClass('active');
                        $('.header').eq(0).removeClass('header--hidden');
                        $('.family').addClass('active');
                        ag.stop();
                        break;

                    case 3:
                        $('.fade-in').addClass('active');
                        $('.header').eq(0).removeClass('header--hidden');
                        $('.family').removeClass('active');
                        $('.triangles').removeClass('active');
                        ag.go();

                        break;

                    default:
                        $('.header').eq(0).removeClass('header--hidden');
                        $('.fade-in').removeClass('active');
                        $('.family').removeClass('active');
                        $('.triangles').removeClass('active');
                        ag.stop();

                }
                $('.nav-link').removeClass('active');
                $('.nav-link').eq(e - 1).addClass('active');


                if ($('.slide').eq(e - 1)[0].getAttribute('data-color') == 'dark') {
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
    }
    fullpageInit();
    $('.catalog-list-item').click(function() {
        $('.catalog-list-item').removeClass('active');
        $(this).addClass('active');
        $('.catalog-showcase-item').removeClass('active');
        $('.catalog-showcase-item[data-catalog=' + $(this).attr('data-catalog') + ']').addClass('active');
    });



    $(window).resize(function() {
        updateCalculations();

        $('.options-range').prop('max', $('.options').width() - $('.options-bootstrap-wrap').width());


    });

    $('.features-slider, .features-slider-mobile').slick({
        dots: false,
        arrows: false,
        fade: true,
        swipe: false
    });

    $('.materials-slider').slick({
        dots: false,
        arrows: false,
        fade: true
    });


    $('.zoom-container img').elevateZoom({
        zoomType: "lens",
        lensShape: "round",
        lensSize: 200,
        borderSize: 0,
        responsive: true,
        containLensZoom: true
    });


    $('[data-btn-slide]').click(function() {
        $('.features-slider, .features-slider-mobile, .materials-slider').slick('slickGoTo', $(this).attr('data-btn-slide'));
        $('[data-btn-slide]').removeClass('active');
        $(this).addClass('active');
    });

    $('.features-slider, .features-slider-mobile').on('beforeChange', function(event, slick, current, next) {
        if (next == 0) {
            $('.zoomContainer').css('z-index', '-1');
        } else {
            $('.zoomContainer').css('z-index', '1');
        }
    });

    $('.sidemenu [data-nav-slide]').click(function() {
        $('html, body').animate({
            scrollTop: $('[data-anchor').eq(+$(this).attr('data-nav-slide') - 1).offset().top - $('.header').outerHeight()
        }, 1000);
    });


    function updateCalculations() {



        if (($(window).width() <= 1060 && $(window).width() > 480) || ($(window).height() <= 950 && $(window).width() > 480)) {
            ag.step = 650;
            ag.current = 650;
            ag.max = 4550;
        } else if ($(window).width() <= 480) {
            ag.step = 435;
            ag.current = 435;
            ag.max = 3481;
        } else {
            ag.step = 884;
            ag.current = 884;
            ag.max = 6188;
        }

        if ($(window).width() <= 767) {
            ag.go();
            if (!$('.fp-destroyed').length) {
                $.fn.fullpage.destroy('all');
            }
            $(window).scroll(function() {
                if ($(window).scrollTop() > 100) {
                    $('.header--hidden').removeClass('header--hidden');
                } else {
                    $('.header').addClass('header--hidden');
                }
            })
        } else {
            if ($('.fp-destroyed').length) {
                fullpageInit();
            }
        }


        $('.payment__content').css('max-height', $(window).height() /* - $('.payment').css('padding-top').replace('px', '') - $('.footer').css('bottom').replace('px', '') - $('.footer').css('height').replace('px', '') - 15*/ );

        $('.family img').imagesLoaded({}, function() {


            if ($(window).width() > 767) {

                var circleDiameter = Math.round($(window).height() * 0.85);

                if (circleDiameter >= $(window).width() * 0.5) {
                    circleDiameter = $(window).width() * 0.5;
                }


                if ($(window).width() <= 1200) {

                    $('.family').css({
                        'bottom': -(Math.round(circleDiameter * 0.036)),
                        'right': -(Math.round(circleDiameter * 0.25))
                    });
                } else {

                    $('.family').css({
                        'bottom': -(Math.round(circleDiameter * 0.036)),
                        'right': -(Math.round(circleDiameter * 0.059))
                    });
                }

                $('.family svg').attr({
                    'height': circleDiameter,
                    'width': circleDiameter
                });
                $('.family svg circle').attr({
                    'r': Math.round(circleDiameter / 2),
                    'cx': Math.round(circleDiameter / 2),
                    'cy': Math.round(circleDiameter / 2)
                });


                $('.family img').css({
                    'max-height': Math.round(circleDiameter * 1.04),
                    'bottom': Math.round(circleDiameter * 0.036)
                });


                $('.family img').css({
                    'margin-left': -(($('.family img').width()) / 2)
                });
            } else {


                var circleDiameter = Math.round($(window).width() * 0.9);

                $('.family').css({
                    'bottom': -(Math.round(circleDiameter * 0.036))
                });

                $('.family svg').attr({
                    'height': circleDiameter,
                    'width': circleDiameter
                });

                $('.family svg circle').attr({
                    'r': Math.round(circleDiameter / 2),
                    'cx': Math.round(circleDiameter / 2),
                    'cy': Math.round(circleDiameter / 2)
                });

                $('.family img').css({
                    'max-height': Math.round(circleDiameter * 1.04),
                    'bottom': Math.round(circleDiameter * 0.036)
                });

                $('.family img').css({
                    'margin-left': -(($('.family img').width()) / 2)
                });

                $('.family').imagesLoaded({
                    background: true
                }, function() {
                    $(window).scroll(function() {
                        var aboutSectionOffset = $('.family').offset().top + circleDiameter,
                            aboutSectionOffsetBottom = $('[data-anchor=about]').offset().top + $('[data-anchor=about]').outerHeight(true);

                        if ((($(window).scrollTop() + $(window).height()) >= aboutSectionOffset) && ($(window).scrollTop() <= aboutSectionOffsetBottom)) {
                            if (!($('.family').hasClass('active'))) {

                                $('.family').addClass('active');

                            }
                            // } else if (($(window).scrollTop() < aboutSectionOffset) || ($(window).scrollTop() > aboutSectionOffsetBottom)) {
                            //     if (($('.family').hasClass('active'))) {

                            //         $('.family').removeClass('active');
                            //     }
                        }

                    });
                });

            }

        });
        $('.vc-content').css({
            'height': $(window).height() - $('.footer').css('bottom').replace('px', '') - $('.footer').outerHeight() - $('.header').outerHeight(),
            'margin-top': $('.header').outerHeight()

        });

        $('.fade-in').height($(window).height() - $('.header').outerHeight());
        $('.catalog-showcase-item__content').outerHeight($(window).height() - (Number($('.slide[data-anchor=shops]').css('padding-top').replace('px', '')) + Number($('.footer').outerHeight()) + Number($('.footer').css('bottom').replace('px', '')) + Number($('.catalog-showcase-item').css('padding-top').replace('px', '')) + Number($('.catalog-showcase-item').css('padding-bottom').replace('px', '')) + Number($('.catalog-showcase-item__header').outerHeight(true)) + 70));
        $('.catalog__showcase').height($('.catalog-showcase-item').outerHeight());


        if ($(window).width() <= 1450) {
            $('.header__btn').text('Перейти в каталог');
        } else {
            $('.header__btn').text('Перейти в интернет-магазин');
        }

        $('.map').css('padding-top', $('.header').outerHeight()).height($(window).height() - $('.header').outerHeight());

    }

    updateCalculations();


    $('.sole-animation').imagesLoaded({
        background: true
    }, function() {
        $('.features-slider__loader').removeClass('active');
        $('.sole-animation').addClass('active');
    });

    function scrollHighlight() {
        var topOffset = $('.payment__content article').offset().top,
            sideMenu = $('.payment__sidemenu'),
            sideMenuItems = sideMenu.find('[data-scroll]'),
            scrollItems = sideMenuItems.map(function() {
                var item = $('.payment__content article #' + $(this).attr('data-scroll'));
                if (item.length) {
                    return item;
                }
            });
        var fromTop = -$('.payment__content .mCSB_container').css('top').replace('px', '') + topOffset;
        var cur = scrollItems.map(function() {
            if ($(this).offset().top < fromTop)
                return this;
        });
        cur = cur[cur.length - 1];
        $('.payment__sidemenu [data-scroll]').removeClass('active');
        if (cur) {
            $('.payment__sidemenu [data-scroll=' + cur.attr('id').split(' ')[0] + ']').addClass('active');
        }
    }

    $(window).load(function() {
        $('.twentytwenty').twentytwenty();

        $('.payment__content').mCustomScrollbar({
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

        $('.catalog-showcase-item__content').mCustomScrollbar({
            theme: "blue-theme-inverse",
            scrollInertia: 100,
            mouseWheel: {
                scrollAmount: 100
            }
        });

    });

    $('[data-scroll]').click(function(e) {
        History.pushState({
            'slide': History.getState().data.slide,
            'sidescreen': 'payment'
        }, 'АНТИГОЛОЛЁД: официальный интернет-магазин обуви Burgershuhe', '?slide=payment&sidescreen=payment#' + $(this).attr('data-scroll'));
        e.preventDefault();

        $('[data-scroll]').removeClass('active');
        $('[data-scroll=' + $(this).attr('data-scroll') + ']').addClass('active');

        $('.payment__content').mCustomScrollbar('scrollTo', '#' + $(this).attr('data-scroll'));
    });


    $('.payment').css('padding-top', $('.header').outerHeight());


    $('.footer__item--btn-down').click(function() {
        $.fn.fullpage.moveSectionDown();
    });

    $('[data-nav-slide]').click(function(e) {
        e.preventDefault();
        $.fn.fullpage.moveTo($(this).attr('data-nav-slide'));
        $('.sidescreen').removeClass('active');
        $('.slide--swiped').removeClass('slide--swiped');
    });

    $('.header__hamburger').click(function() {
        $('.sidemenu').toggleClass('active');
    });

    $('.sidemenu__close, .sidemenu__list a').click(function() {
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
    //             case 'payment':
    //                 $('.payment').addClass('active');
    //                 $('.footer__item--btn-down').removeClass('active');
    //                 $('.footer__item').last().removeClass('active');
    //                 setTimeout(function() {
    //                     $('.slide.active').addClass('slide--swiped');
    //                     $('.footer').removeClass('footer--dark');
    //                     $('.sidescreen').addClass('active');
    //                     History.replaceState({
    //                         'slide': History.getState().data.slide,
    //                         'sidescreen': 'payment'
    //                     }, 'АНТИГОЛОЛЁД: официальный интернет-магазин обуви Burgershuhe', '?slide=payment&sidescreen=payment');
    //                 }, 1000);
    //                 $('.payment').addClass('active');

    //                 break;
    //         }
    //     }
    // }





});
