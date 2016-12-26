L.SVG.include({
    _createArrows: function (layer) {
        var options = layer.options,
            directions = options.directions,
            arrowOptions = options.arrow,
            len,
            arrow;

        if (!directions || !directions.length) {
            return;
        }

        for (var i = 0, len = directions.length; i < len; i++) {
            arrow = this._createArrow(directions[i], arrowOptions);
            layer.addInteractiveTarget(arrow);
            layer._arrows.push(arrow);
        }
    },

    _createArrow: function (angle, options) {
        var arrow = L.SVG.create('path');

        L.DomUtil.addClass(arrow, 'leaflet-interactive');

        arrow.setAttribute('id', options.id + '-' + angle);
        arrow.angle = angle;

        this._updateArrowStyle(arrow, options);

        return arrow;
    },

    _updateArrowsStyle: function (layer) {
        var arrows = layer._arrows,
            arrowOptions = layer.options.arrow,
            len = arrows.length;

        for (var i = 0; i < len; i++) {
            this._updateArrowStyle(arrows[i], arrowOptions);
        }
    },

    _updateArrowStyle: function (arrow, options) {
        if (options.stroke) {
            arrow.setAttribute('stroke', options.color);
            arrow.setAttribute('stroke-width', options.weight);
            arrow.setAttribute('stroke-opacity', options.opacity);
        } else {
            arrow.setAttribute('stroke', 'none');
        }

        if (options.fill) {
            arrow.setAttribute('fill', options.fillColor);
            arrow.setAttribute('fill-opacity', options.fillOpacity);
        } else {
            arrow.setAttribute('fill', 'none');
        }
    },

    _updateArrows: function (layer) {
        var arrows = layer._arrows,
            arrowOptions = layer.options.arrow,
            len = arrows.length,
            g = this._rootGroup;

        for (var i = 0; i < len; i++) {
            this._updateArrowPath(arrows[i], layer);

            g.appendChild(arrows[i]);
        }
    },

    _updateArrowPath: function (arrow, layer) {
        var options = layer.options.arrow,
            width = options.width,
            height = options.height,
            offset = options.offset,
            r = layer._radius,
            x = layer._point.x,
            y = layer._point.y,
            angle = arrow.angle,

            // first shift - radius, second shift - middlepoint of arrow basis
            dx = - (r + offset) * Math.sin(angle * Math.PI / 180) - (width / 2) * Math.sin((90 - angle) * Math.PI / 180),
            dy = (r + offset) * Math.cos(angle * Math.PI / 180) - (width / 2) * Math.cos((90 - angle) * Math.PI / 180);

        arrow.setAttribute('d', 'M 0 0 L ' + width + ' 0 L ' + (width / 2) + ' ' + height + ' z');
        arrow.setAttribute('width', options.width);
        arrow.setAttribute('transform', 'translate(' + (x + dx) + ',' + (y + dy) + ') ' + 'rotate(' + angle + ')');

        return arrow;
    },

    _removeArrows: function (layer) {
        var arrows = layer._arrows,
            len = arrows.length,
            g = this._rootGroup;

        for (var i = 0; i < len; i++) {
            g.removeChild(arrows[i]);
        }

        layer._arrows = [];
    },
});

L.Viewpoint = L.CircleMarker.extend({
    options: {
        arrow: {
            width: 8,
            height: 16,
            offset: 3,
            id: null,
		    stroke: false,
		    color: null,
		    weight: 0,
		    opacity: 1,
		    fill: true,
		    fillColor: 'black',
		    fillOpacity: 1
        },
        directions: []
    },

    initialize: function (latlng, options) {
        this.setOptions(this, options);
        this.options.arrow.id = L.stamp(this);
        this._arrows = [];

        L.CircleMarker.prototype.initialize.call(this, latlng, this.options);
    },

    onAdd: function () {
        this._renderer._createArrows(this);
        L.CircleMarker.prototype.onAdd.call(this);
    },

    onRemove: function () {
        this._renderer._removeArrows(this);
        L.CircleMarker.prototype.onRemove.call(this);
    },

    // generic L.setOptions
    // don't allow override arrow options
    setOptions: function (obj, options) {
        for (var i in options) {
            if (i === 'arrow') {
                obj.options[i] = L.extend({}, obj.options[i], options[i])
            } else {
                obj.options[i] = options[i];
            }
        }
    	return obj.options;
    },

    setArrowStyle: function (style) {
        var arrowOptions = this.options.arrow;

        for (var i in style) {
            arrowOptions[i] = style[i];
        }


        if (style.width || style.height || style.offset) {
            this._renderer._updateArrows(this);
        }

        this._renderer._updateArrowsStyle(this);

        return this;
    },

    setDirections: function (directions) {
        this.options.directions = directions;

        this._resetArrows();

        return this;
    },

    getDirections: function () {
        return this.options.directions;
    },

    _resetArrows: function () {
        this._renderer._removeArrows(this);
        this._renderer._createArrows(this);
        this._renderer._updateArrows(this);
    },

    _updatePath: function () {
        this._renderer._updateCircle(this);
        this._renderer._updateArrows(this);
    }
});

L.viewpoint = function(latlngs, options) {
    return new L.Viewpoint(latlngs, options);
}
