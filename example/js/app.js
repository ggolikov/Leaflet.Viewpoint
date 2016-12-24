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

    map = new L.Map('map', {layers: [osm, OpenMapSurfer_AdminBounds], center: new L.LatLng(55.787923, 37.632224), zoom: 18, maxZoom: 22}),
    root = document.getElementById('content');

    var directions = [0, 180];
    var directions2 = [45, 135, 225, 315];

    // for (var i = 0; i < 15; i++) {
    //     directions.push(Math.random() * 360);
    // }

    window.vp = L.viewpoint([55.787923, 37.632224], {
        radius: 8,
        weight: 0,
        fillColor: 'green',
        fillOpacity: 1,
        directions: directions,
        arrow: {
            offset: 5,
            fillColor: 'black'
        }
    }).addTo(map);

    vp.on('click', function(e) {
      console.log(e);
    })

    vp._arrows.forEach(function(arrow){
        var id = arrow.getAttribute('id'),
            src = './images/' + id + '.JPG',
            container = document.getElementById('content');

        arrow.onclick = function(e) {
            // container.innerHTML = '<img src="' + src + '"/>';
            console.log(e);
            e.target.setAttribute('fill', 'yellow');
        }
    });
console.log(vp);
    window.vp2 = L.viewpoint([55.777923, 37.631224], {
        radius: 8,
        fillColor: 'green',
        weight: 0,
        fillOpacity: 1,
        directions: directions,
        arrow: {
            width: 3,
            height: 50,
            fillColor: 'blue'
        }
    })
    .addTo(map);
    // console.log(vp.options.arrow);
    // console.log(vp2.options.arrow);

    vp2._arrows.forEach(function(arrow){
        var id = arrow.getAttribute('id'),
            src = './images/' + id + '.JPG',
            container = document.getElementById('content');

        arrow.onclick = function(e) {
            // container.innerHTML = '<img src="' + src + '"/>';
            console.log(e);
        }
    });
