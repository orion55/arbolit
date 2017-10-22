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
    if ($(window).width() < 767) {
        var $menu = $("#my-menu").mmenu({
            extensions: ["fullscreen", "theme-dark"]
        });
        var $icon = $("#mmenu-icon");
        var API = $menu.data("mmenu");
        var logo = $('.logo');
        var phone = $('.phone');
        var title = $('.mm-title');

        title.text('Меню');

        $icon.on("click", function () {
            API.open();
        });

        $("a.nav__link").click(function () {
            API.close();
        });

        API.bind("open:finish", function () {
            setTimeout(function () {
                $icon.addClass("is-active");
            }, 100);

            $icon.on("click", function () {
                API.close();
            });

            logo.hide();
            phone.hide();
        });

        API.bind("close:finish", function () {
            setTimeout(function () {
                $icon.removeClass("is-active");
            }, 100);

            $icon.on("click", function () {
                API.open();
            });

            logo.show();
            phone.show();
        });
    }
});
$(document).ready(function () {
    $("a.nav__link").click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('html, body').animate({scrollTop: destination}, 1000);
        return false;
    });
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
