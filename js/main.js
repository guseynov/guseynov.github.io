$(function() {
    FastClick.attach(document.body);

    $('.portfolio').owlCarousel({
        dots: true,
        arrows: false,
        autoWidth: true,
        margin: 50,
        center: true,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            1199: {
                items: 3
            }
        }
    });

    new WOW().init();
});
