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
        items: 1,
        nav: true,
        loop: true,
        navText: ['<img src="img/icons/arrow-left.svg" />', '<img src="img/icons/arrow-right.svg" />']
    });
});