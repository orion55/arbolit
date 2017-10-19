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
    $('.slid').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true,
        prevArrow: $('.slid__arrow-left'),
        nextArrow: $('.slid__arrow-right')
    });
});
