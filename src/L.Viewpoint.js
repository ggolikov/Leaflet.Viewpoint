
L.Viewpoint = L.FeatureGroup.extend({
    initialize: function (latlngs, options) {
        L.Util.setOptions(this, options);

        this._center = L.marker(latlngs);

        if (options && options.directions) {
            this._setDirections(options.directions);
        }
        L.LayerGroup.prototype.initialize.call(this, [
            this._center,
            this._directions
        ]);
    },
    _setDirections: function (directions) {
        var lines = [],
            center = this._center.getLatLng();

        directions.forEach(function(point){
            var latLng = L.latLng(point);
            lines.push(L.polyline([center, latLng]))
        })

        this._directions = L.layerGroup(lines);
    }
});

L.viewpoint = function(latlngs, options) {
    return new L.Viewpoint(latlngs, options);
}
