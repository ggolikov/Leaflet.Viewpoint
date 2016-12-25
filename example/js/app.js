var L = global.L || require('leaflet');
require('../../index.js');

var osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    point = L.latLng([55.819723, 37.611661]),
    map = new L.Map('map', {layers: [osm], center: point, zoom: 17, maxZoom: 22}),
    root = document.getElementById('content');

// viewpoint
window.viewPoint = L.viewpoint(point, {
    radius: 8,
    weight: 0,
    fillColor: 'blue',
    fillOpacity: 1,
    directions: [0, 45, 90, 135, 180, 225, 270, 315],
    arrow: {
        offset: 3,
        fillColor: 'black'
    }
}).addTo(map);

viewPoint.on('click', showImages);

function showImages(e) {
    var target = e.originalEvent.target,
        targetId = target.getAttribute('id'),
        len = e.target._arrows.length,
        match, src, container;

    if (!targetId || !len) {
        return;
    }

    for (var i = 0; i < len; i++) {
        var arrow = e.target._arrows[i],
            id = arrow.getAttribute('id'),
            highlightColor = 'blue';

        if (arrow.getAttribute('fill') === highlightColor) {
            arrow.setAttribute('fill', e.target.options.arrow.fillColor);
        }

        if (id === targetId) {
            arrow.setAttribute('fill', highlightColor);
            match = id.split('-');
            src = './images/' + match[0] + '/' + match[1] + '.jpg',
            container = document.getElementById('content');
            container.innerHTML = '<img src="' + src + '"/>';
        }
    }
}
