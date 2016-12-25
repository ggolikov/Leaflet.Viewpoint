var L = global.L || require('leaflet');
require('../../index.js');
var osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    OpenMapSurfer_AdminBounds = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/adminb/x={x}&y={y}&z={z}', {
    	maxZoom: 19,
    	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })

    map = new L.Map('map', {layers: [osm, OpenMapSurfer_AdminBounds], /*center: new L.LatLng(55.787923, 37.632224), zoom: 18, */maxZoom: 22}),
    root = document.getElementById('content');

// viewpoints

var point1 = L.latLng([55.787923, 37.632224]),
    point2 = L.latLng([55.786424, 37.629888]);

var vp = L.viewpoint(point1, {
    radius: 8,
    weight: 0,
    fillColor: 'green',
    fillOpacity: 1,
    directions: [0, 180],
    arrow: {
        offset: 5,
        fillColor: 'black'
    }
}).addTo(map);

vp.on('click', showImages);

var vp2 = L.viewpoint(point2, {
    radius: 8,
    fillColor: 'green',
    weight: 0,
    fillOpacity: 1,
    directions: [180, 270],
    arrow: {
        fillColor: 'blue'
    }
}).addTo(map);

vp2.on('click', showImages);

function showImages(e) {
    var target = e.originalEvent.target,
        targetId = target.getAttribute('id'),
        len = e.target._arrows.length,
        match, src, container;

    if (!targetId || !len) {
        return;
    }

    for (var i = 0; i < len; i++) {
        var id = e.target._arrows[i].getAttribute('id');
        if (id === targetId) {
            match = id.split('-');
            src = './images/' + match[0] + '/' + match[1] + '.JPG',
            container = document.getElementById('content');
            container.innerHTML = '<img src="' + src + '"/>';
            break;
        }
    }
}

map.fitBounds(L.latLngBounds(point1, point2))
    .setZoom(17);
