
L.Viewpoint = L.FeatureGroup.extend({
    initialize: function (latlngs, options) {
        L.Util.setOptions(this, options);
        this._createLayers(latlngs);
        L.LayerGroup.prototype.initialize.call(this, [
            this._center,
            this._directions
        ]);
    },

    _createLayers: function (latlngs) {
        this._centerIcon = L.icon({
            iconUrl: '../img/centerIcon.svg',
            iconSize: [20, 20]
        });

        this._center = L.marker(latlngs, {
            icon: this._centerIcon,
            draggable: true
        });

        if (this.options && this.options.directions) {
            this._setDirections(this.options.directions);
        }
    },

    _setDirections: function (directions) {
        var LEN = 15;

        var arrows = [],
            arrowIcon = L.icon({
                iconUrl: '../img/arrowIcon.svg',
                iconSize: [10, 10]
            }),
            latLng,
            line;

            center = this._center.getLatLng();
            directions.forEach(function(angle){
                latLng = L.GeometryUtil.destination(center, angle, LEN);
                line = L.polyline([latLng, center]);
                line.angle = angle;
                arrows.push(line);
            });
        this._directions = L.layerGroup(arrows);
    }
});

L.viewpoint = function(latlngs, options) {
    return new L.Viewpoint(latlngs, options);
}
