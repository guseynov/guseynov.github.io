$(document).ready(function() {
    $('.about-carousel').owlCarousel({
        responsive: {
            0: {
                items: 1
            },
            1200: {
                items: 1,
                nav: true,
                margin: 25,
                stagePadding: 160,
                navText: ['<img src="img/icons/arrow-left.svg" />', '<img src="img/icons/arrow-right.svg" />']
            }
        }
    });

    $('.certificates-carousel').owlCarousel({
        items: 1,
        stagePadding: 70,
        margin: 15
    });

    $('.reviews-carousel').owlCarousel({
        responsive: {
            0: {
                items: 1,
                loop: true
            },
            1200: {
                items: 1,
                nav: true,
                loop: true,
                navText: ['<img src="img/icons/arrow-left.svg" />', '<img src="img/icons/arrow-right.svg" />']
            }
        }
    });

    $('.infrastructure-carousel').owlCarousel({
        startPosition: 1,
        items: 1,
        margin: 30,
        responsive: {
            1200: {
                stagePadding: 300
            }
        }
    });

    $('.header-mobile__burger').click(function() {
        $('.mobile-menu').addClass('active');
    });

    $('.header-mobile__close').click(function() {
        $('.mobile-menu').removeClass('active');
    });

    $('.read-more').click(function() {
        $('.mission-toggle').css('max-height', 'none');
        $('.read-more').remove();
    });

    $('.header-menu-item a').click(function(e) {
        if ($(this).attr('data-link') === '0') {
            e.preventDefault();
            var that = $(this);
            that.next('.header-menu-item__dropdown').toggleClass('active');
        }
    });
});