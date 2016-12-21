var L = global.L || require('leaflet');
var React = require('react');
console.log(React);
var ReactDOM = require('react-dom');
require('../../index.js');
var osm = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    OpenMapSurfer_AdminBounds = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/adminb/x={x}&y={y}&z={z}', {
    	maxZoom: 19,
    	attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    })
    // map55.788096 N, 37.631392 E
    map = new L.Map('map', {layers: [osm, OpenMapSurfer_AdminBounds], center: new L.LatLng(55.786498, 37.629888), zoom: 18, maxZoom: 22}),
    root = document.getElementById('content');

    // var point = L.marker([55.786498, 37.629888])/*.addTo(map)*/;
    console.log(L.GeometryUtil);

    var directions = [0, 90];
    var vp = L.viewpoint([55.786498, 37.629888], {
            directions: directions
        })
        .addTo(map);

    // vp._directions.eachLayer(function(layer) {
    //     layer.on('click', function(e){
    //         e.target.setStyle({color: 'yellow'});
    //         var path = './images/' + e.target.angle + '.jpg'
    //         var image = React.createElement(
    //             'img',
    //             {src: path}
    //         );
    //         console.log(image);
    //         image.onclick = function() {
    //             window.open(path,'_blank');
    //         }
    //
    //         ReactDOM.render(
    //             image,
    //             root
    //         );
    //     });
    // });
    console.log(vp);
