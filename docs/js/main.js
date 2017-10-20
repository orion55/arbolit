$(document).ready(function () {
    ymaps.ready(init);
    var myMap,
        myPlacemark;

    function init() {
        myMap = new ymaps.Map("map", {
            center: [51.216704, 58.334178],
            zoom: 17
        });
        myMap.container.fitToViewport();

        myPlacemark = new ymaps.Placemark([51.216704, 58.334178], {
            hintContent: 'EcoArbo'
        }, {
            preset: 'islands#redDotIcon'
        });

        myMap.geoObjects.add(myPlacemark);
    }
});

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
