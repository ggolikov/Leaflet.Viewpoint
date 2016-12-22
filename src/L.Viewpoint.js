
L.Viewpoint = L.CircleMarker.extend({
    initialize: function (latlng, options) {
        L.Util.setOptions(this, options);

        if (this.options && this.options.directions) {
            this._setDirections(this.options.directions);
        }

        this._arrows = [];

        L.CircleMarker.prototype.initialize.call(this, latlng, options);
    },

    _setDirections: function (directions) {
        this._directions = directions;
    },

    _createArrow: function (angle) {

        // constants determining svg arrow coordinates
        var OFFSET = 3,
            MIDDLE = 4;

        var arrow = L.SVG.create('path'),
            r = this._radius,
            x = this._point.x,
            y = this._point.y,

            // first shift - radius
            dx = - (r + OFFSET) * Math.sin(angle * Math.PI / 180),
            dy = (r + OFFSET) * Math.cos(angle * Math.PI / 180),

            // second shift - middlepoint of arrow basis
            dx2 = - MIDDLE * Math.sin((90 - angle) * Math.PI / 180),
            dy2 = - MIDDLE * Math.cos((90 - angle) * Math.PI / 180),
            attrs = {
                'd': 'M 0 0 L ' + (MIDDLE * 2) + ' 0 L ' + MIDDLE + ' 20 z',
                'class': 'leaflet-interactive',
                'id': angle,
                'stroke-width': 0,
                'transform' : 'translate(' + (x + dx + dx2) + ',' + (y + dy + dy2) + ') ' + 'rotate(' + angle + ')'
            };

        for (var key in attrs) {
            arrow.setAttribute(key, attrs[key]);
        }

        this._renderer._rootGroup.appendChild(arrow);

        return arrow;
    },

    _updateArrows: function () {
        var arrows = this._arrows,
            directions = this._directions,
            len = arrows.length,
            g = this._renderer._rootGroup;

        if (len) {
            for (var i = 0; i < len; i++) {
                g.removeChild(arrows[i]);
            }
        }

        this._arrows = [];
        len = directions.length;

        for (var j = 0; j < len; j++) {
            arrow = this._createArrow(directions[j]);
            this._arrows.push(arrow);
        }
    },

    _updatePath: function () {
        this._renderer._updateCircle(this);
        this._updateArrows();
    }
});

L.viewpoint = function(latlngs, options) {
    return new L.Viewpoint(latlngs, options);
}
