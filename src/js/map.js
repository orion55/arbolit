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
