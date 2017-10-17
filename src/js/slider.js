$(document).ready(function () {
    $('.slider').slick({
        autoplay: false,
        autoplaySpeed: 2000,
        fade: true,
        cssEase: 'linear',
        infinite: true,
        prevArrow: $('.slider__arrow-left'),
        nextArrow: $('.slider__arrow-right')
    });
});
