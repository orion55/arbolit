$(document).ready(function () {
    $("a.nav__link").click(function () {
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        $('html, body').animate({scrollTop: destination}, 1000);
        return false;
    });
});