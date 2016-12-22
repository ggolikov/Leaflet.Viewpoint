
L.Viewpoint = L.CircleMarker.extend({
    initialize: function (latlng, options) {
        L.Util.setOptions(this, options);
        this._createLayers(latlng);
        L.CircleMarker.prototype.initialize.call(this, latlng, options);
    },

    _createLayers: function (latlng) {
        this._direction = L.SVG.create('circle');
    },

    _setDirections: function (directions) {
    }
});

L.viewpoint = function(latlngs, options) {
    return new L.Viewpoint(latlngs, options);
}
