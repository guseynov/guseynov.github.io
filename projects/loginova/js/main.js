// Modernizr.addTest('backgroundclip', function() {
//     var div = document.createElement('div');
//     if ('backgroundClip' in div.style)
//         return true;
//     'Webkit Moz O ms Khtml'.replace(/([A-Za-z]*)/g, function(val) {
//         if (val + 'BackgroundClip' in div.style) return true;
//     });
// });

$.extend({

    getQueryParameters: function(str) {
        return (str || document.location.search).replace(/(^\?)/, '').split("&").map(function(n) {
            return n = n.split("="), this[n[0]] = n[1], this
        }.bind({}))[0];
    }

});

var getQuery = $.getQueryParameters();

// Calculate width of text from DOM element or string. By Phil Freo <http://philfreo.com>
$.fn.textWidth = function(text, font) {
    if (!$.fn.textWidth.fakeEl) $.fn.textWidth.fakeEl = $('<span>').hide().appendTo(document.body);
    $.fn.textWidth.fakeEl.text(text || this.val() || this.text()).css('font', font || this.css('font'));
    return $.fn.textWidth.fakeEl.width();
};

$(document).on('show.bs.modal', function(event) {
    if (!event.relatedTarget) {
        $('.modal').not(event.target).modal('hide');
    };
    if ($(event.relatedTarget).parents('.modal').length > 0) {
        $(event.relatedTarget).parents('.modal').modal('hide');
    };
});

$(document).on('shown.bs.modal', function(event) {
    if ($('body').hasClass('modal-open') == false) {
        $('body').addClass('modal-open');
    };

    setTimeout(function() {
        if ($('body').hasClass('modal-open') == false) {
            $('body').addClass('modal-open');
        }
    }, 200)

});

$(document).on('hidden.bs.modal', function(event) {
    $('body').css('padding-right', '0');

});



$(function() {

    if (getQuery.order == 'success') {
        $('#order-success').modal('show');
    }

    if (getQuery.order == 'fail') {
        $('#order-fail').modal('show');
    }

    $('.payment-system').click(function() {
        $('.payment-form').submit();
        window.location.reload();
    });

    $('.gallery-subsection-triggers button').click(function(e) {
        e.preventDefault();
        $('.gallery-subsection-triggers button').removeClass('active');
        $(this).addClass('active');
        updateGallery();
    });

    $('.gallery-subsection__triggers button').click(function(e) {
        e.preventDefault();
        $('.gallery-subsection__triggers button').removeClass('active');
        $(this).addClass('active');
        updateGallery();
    });

    var imagesLoader = function(count) {
        var params = {
            delay: 100,
            imgIndex: 0,
            imgLength: count
        };

        loadImg();

        function loadImg() {
            console.log('loadImg');
            var imgElem = $('.gallery-subcategory-item img').eq(params.imgIndex),
                imgObj = new Image();
            imgObj.onload = completeLoadImg;
            imgObj.src = imgElem.data('src');
        }

        function completeLoadImg() {

            console.log('completeLoadImg');
            var imgElem = $('.gallery-subcategory-item img').eq(params.imgIndex);
            imgElem.attr('src', this.src);
            params.imgIndex++;
            if (params.imgIndex < params.imgLength) setTimeout(loadImg, params.delay);
        }
    };

    function unsetImagesSource() {

        console.log('unsetImagesSource');
        var images = $('.gallery-subcategory-item img');
        for (var i = 0; i < images.length; ++i) {
            images.eq(i).attr('src', '');
            images.eq(i).data('src', 'img/default.svg').attr('src', 'img/default.svg');
        }
    }

    function updateGallery() {

        var cat1 = $('.gallery-subsection-triggers button.active').data('cat1');
        var cat2 = $('.gallery-subsection__triggers button.active').data('cat2');
        console.log('updateGallery');
        $.ajax({
            url: 'db.php',
            data: {
                'cat1': cat1,
                'cat2': cat2
            },
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                console.log('success');
                var images = $('.gallery-subcategory-item img');
                unsetImagesSource();
                for (var i = 0; i < data.length; ++i) {
                    images.eq(i).data('src', data[i].path).data('id', data[i].id);
                    images.eq(i).parent().data('id', data[i].id);

                    images.eq(i).parent().find(".gallery-subcategory-item-overlay-wrapper__title").text(data[i].title)
                }
                imagesLoader(data.length);
            },
            error: function(error) {
                console.log('fail');
                console.log(error);
            }
        });
    }

    updateGallery();


    $('.path-slider, .events-slider').slick({
        arrows: true,
        dots: true,
        prevArrow: '<button class="arrow-left"><img src="img/arrow-left.png" alt=""></button>',
        nextArrow: '<button class="arrow-right"><img src="img/arrow-right.png" alt=""></button>',
        fade: true
    });

    $('.options-slider').slick({
        arrows: true,
        dots: false,
        prevArrow: '<button class="arrow-left"><img src="img/arrow-left.png" alt=""></button>',
        nextArrow: '<button class="arrow-right"><img src="img/arrow-right.png" alt=""></button>',
        fade: true
    });

    var popupSliderLaunched = false,
        attachments;



    $('#order-details').on('shown.bs.modal', function(e) {

        $.ajax({
            url: 'db.php',
            type: 'POST',
            data: {
                'id': $(e.relatedTarget).data('id')
            },
            dataType: 'json',
            success: function(data) {
                //TODO - data - array of photo parameters, need to handle it correctly

                $('[data-ajax-title]').text(data[0].title);
                $('[data-ajax-description]').text(data[0].description);
                $('[data-ajax-price]').text('$' + data[0].price);

                chosenItem = data[0];
                attachments = JSON.parse(chosenItem.attachments);
                fillSlider();
                fillForms()
            }
        });

        function fillForms() {
            $('input[name=ik_desc]').val(chosenItem.title);
            $('input[name=ik_am]').val(chosenItem.price + '.00');
            $('input[name=price]').val(chosenItem.price);
            $('input[name=title]').val(chosenItem.title);


        }

        function fillSlider() {
            if (!popupSliderLaunched) {
                $('#order-slider-for').slick({
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    arrows: true,
                    dots: false,
                    verticalSwiping: true,
                    draggable: true,
                    vertical: true,
                    prevArrow: '<button class="arrow-left"><img src="img/arrow-up.png" alt=""></button>',
                    nextArrow: '<button class="arrow-right"><img src="img/arrow-down.png" alt=""></button>',
                    asNavFor: '#order-slider',
                    centerMode: true,
                    centerPadding: '0px',
                    speed: 300,

                    responsive: [{
                        breakpoint: 600,
                        settings: {
                            vertical: false,
                            prevArrow: '<button class="arrow-left"><img src="img/arrow-left.png" alt=""></button>',
                            nextArrow: '<button class="arrow-right"><img src="img/arrow-right.png" alt=""></button>',
                            verticalSwiping: false
                        }
                    }]
                });
                $('#order-slider').slick({
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    asNavFor: '#order-slider-for',
                    dots: false,
                    arrows: false,
                    swipe: true,
                    fade: true
                });;

                for (image in attachments) {
                    $('#order-slider-for, #order-slider').slick('slickAdd', '<div><img src="' + attachments[image] + '" alt=""></div>');
                }
                // if (Object.keys(attachments).length < 4) {
                //     for (var i = 1; i <= (4 - Object.keys(attachments).length); i++) {
                //         $('#order-slider-for, #order-slider').slick('slickAdd', '<div><img src="' + attachments[i] + '" alt=""></div>');
                //     }
                // }


                // if ($(window).width() <= 600) {
                //     maxHeight('#order-slider img', '#order-slider');
                // }

                popupSliderLaunched = true;
            } else {
                $('#order-slider-for, #order-slider').slick('removeSlide', null, null, true);
                for (image in attachments) {
                    $('#order-slider-for, #order-slider').slick('slickAdd', '<div><img src="' + attachments[image] + '" alt=""></div>');
                }
                // if (Object.keys(attachments).length < 4) {
                //     for (var i = 1; i <= (4 - Object.keys(attachments).length); i++) {
                //         $('#order-slider-for, #order-slider').slick('slickAdd', '<div><img src="' + attachments[i] + '" alt=""></div>');
                //     }
                // }
            }

            $('.order-modal-slider-wrapper').css('height', $('.order-modal-slider-wrapper').width() * 0.75);

            //$('.order-modal__slider--for .slick-slide').css('height', Math.ceil(($('.order-modal-slider-wrapper').width() * 0.75) / 3));
            $('#order-slider-for').on('click', '.slick-slide', function(e) {
                e.stopPropagation();
                var index = $(this).data("slick-index");
                if ($('.slick-slider').slick('slickCurrentSlide') !== index) {
                    $('.slick-slider').slick('slickGoTo', index);
                    $('#order-slider-for .slick-slide').removeClass('slick-current');
                    $(this).addClass('slick-current');
                }
            });


        }
    });



    $('.payment-form__select').selectize({
        'options': ['<option value="1">Способ доставки</option>',
            '<option value="2">Почта <span class="select-price">$20</span></option>',
            '<option value="3">Самовывоз <span class="select-price">$30</span></option>',
            '<option value="4">Курьер <span class="select-price">$10</span></option>'
        ],
        options: [
            { name: 'Способ доставки', price: 0, value: 1 },
            { name: 'Почта', price: 20, value: 2 },
            { name: 'Самовывоз', price: 30, value: 3 },
            { name: 'Курьер', price: 10, value: 4 }
        ],
        render: {
            item: function(item, escape) {
                return '<div data-value="' + item.value + '">' +
                    (item.name ? '<span class="select-name">' + escape(item.name) + '</span>' : '') +
                    (item.price ? '<span class="select-price">' + '$' + escape(item.price) + '</span>' : '') +
                    '</div>'
            },
            option: function(item, escape) {
                return '<div class="option" data-delivery-price="' + escape(item.price) + '" data-value="' + item.value + '">' +
                    (item.name ? '<span class="select-name">' + escape(item.name) + '</span>' : '') +
                    (item.price ? '<span class="select-price">' + '$' + escape(item.price) + '</span>' : '') +
                    '</div>'
            }
        },
        onDropdownClose: function(e) {
            var price = $('[data-delivery-price].selected').attr('data-delivery-price');

            $('[data-ajax-price]').text('$' + Number(chosenItem.price + price));

            $('input[name=ik_am]').val(chosenItem.price + price + '.00');
            $('input[name=price]').val(chosenItem.price + price);
        }
    });

    $('.order-modal-payment-options__select').selectize({

    });

    var chosenItem;






    // var subsectionMaxHeight = Math.max.apply(null, $('.gallery-subsection').map(function() {
    //     return $(this).height();
    // }).get());

    // var subcategoryMaxHeight = Math.max.apply(null, $('.gallery-subcategory').map(function() {
    //     return $(this).height();
    // }).get());

    // $('.gallery-subcategory-wrapper').height(subcategoryMaxHeight);
    // $('.gallery-subsection-wrapper').height(subsectionMaxHeight);


    // $('[data-subsection-trigger]').click(function() {
    //     $('[data-subsection-trigger]').removeClass('active');
    //     $(this).addClass('active');
    //     $('[data-subsection]').removeClass('active');
    //     $('[data-subsection=' + $(this).attr('data-subsection-trigger') + ']').addClass('active');
    // });



    function maxHeight(e, wrapper) {
        var eMaxHeight = Math.max.apply(null, $(e).map(function() {
            return $(this).outerHeight();
        }).get());

        $(wrapper).height(eMaxHeight);
    }

    $(window).load(function() {

        maxHeight('.decoration', '.decorations-wrapper');
        maxHeight('.review', '.reviews-wrapper');


        calcArrowsPosition();
    });

    $('[data-subsection-trigger], [data-option-trigger]').each(function() {
        width = $(this).width();
        $(this).css('width', width + 20 + 'px');
    });


    $('.flipster').flipster({
        itemContainer: '.reviews-slider',
        itemSelector: '.reviews-slider-item',
        spacing: -0.88,
        buttons: 'custom',
        buttonPrev: '<img src="img/arrow-left.png">',
        buttonNext: '<img src="img/arrow-right.png">',
        scrollwheel: false,
        onItemSwitch: function(current, previous) {
            $('.review').removeClass('active');
            $('.review[data-review=' + current.getAttribute('data-review') + ']').addClass('active');
        }
    });

    $('[data-option-trigger]').click(function() {
        $('[data-option-trigger]').removeClass('active');
        $(this).addClass('active');
        $('.options-slider').slick('slickGoTo', $(this).attr('data-option-trigger') - 1);
    });

    $('.options-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('[data-option-trigger]').removeClass('active');
        $('[data-option-trigger=' + (nextSlide + 1) + ']').addClass('active');
    });

    $('[data-decoration-trigger]').click(function() {
        $('[data-decoration-trigger]').removeClass('active');
        $(this).addClass('active');
        $('[data-decoration]').removeClass('active');
        $('[data-decoration=' + $(this).attr('data-decoration-trigger') + ']').addClass('active');
    });

    $(".scroll-down").click(function() {

        $('html, body').animate({
            scrollTop: $('section.top-screen + section').offset().top
        }, 700);
    });

    $('input[name=name]').on('input', function() {
        if ($('input[name=name]').val().length != 0) {
            $('.letter-form .name').text($(this).val());
        } else {
            $('.letter-form .name').html('&nbsp;');
        }
    });

    $('.letter-form').on('input', 'input[data-input=additional]', function() {


        var lastElement = $('input[data-input=additional]').last();
        if (lastElement.outerWidth() <= lastElement.textWidth()) {
            lastElement.after('<input type="text" data-input="additional" name="additional[]" data-count="">');
            lastElement = $('input[data-input=additional]').last().focus();
        }

        if ($(this).outerWidth() <= $(this).textWidth()) {
            $(this).next().focus();
        }

    });

    $('.letter-form__submit').click(function(e) {
        e.preventDefault();
        $.post('mail.php', $(this).parents('form').serialize(), function(result) {
            if (result) {
                $('#letter-success').modal('show');
            } else {
                $('#letter-fail').modal('show');
            }
        })
    });

    function calcArrowsPosition() {

        function maxHeight(e) {
            return eMaxHeight = Math.max.apply(null, $(e).map(function() {
                return $(this).outerHeight();
            }).get());
        }

        var optionSliderImgHeight = maxHeight('.options-slider-item__img');
        var pathSliderImgHeight = maxHeight('.path-slider-item__img');

        $('.options-slider .slick-arrow').css('top', optionSliderImgHeight / 2);
        $('.path-slider .slick-arrow').css('top', pathSliderImgHeight / 2);
    }

    var clippedAspectRatio = 1754 / 232;


    $('.no-backgroundcliptext h2.clipped').css('height', $('.no-backgroundcliptext h2.clipped').width() / clippedAspectRatio);
    $(window).resize(function() {
        calcArrowsPosition();
        // if ($(window).width() <= 600) {
        //     maxHeight('#order-slider img', '#order-slider');
        // }

        maxHeight('.decoration', '.decorations-wrapper');
        maxHeight('.review', '.reviews-wrapper');

        $('.no-backgroundcliptext h2.clipped').css('height', $('.no-backgroundcliptext h2.clipped').width() / clippedAspectRatio);

        $('.order-modal-slider-wrapper').css('height', $('.order-modal-slider-wrapper').width() * 0.75);

        //$('.order-modal__slider--for .slick-slide').css('height', Math.ceil(($('.order-modal-slider-wrapper').width() * 0.75) / 3));
    });

    $('.modal').click(function(e) {
        if (!($(e.target).hasClass('modal-dialog') || $(e.target).parents('.modal-dialog').length)) {
            $('.modal').modal('hide');
        }
    })

});
