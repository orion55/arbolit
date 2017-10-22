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