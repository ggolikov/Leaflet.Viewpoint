L.SVG.include({
    _setArrowStyle: function (arrow, options) {
        // var options = layer.options.arrow,
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
            this._updateArrow(arrows[i], layer);

            g.appendChild(arrows[i]);
        }
    },

    _updateArrow: function (arrow, layer) {
        var options = layer.options.arrow,
            width = options.width,
            height = options.height,
            offset = options.offset,
            r = layer._radius,
            x = layer._point.x,
            y = layer._point.y,
            angle = Number(arrow.getAttribute('angle')),

            // first shift - radius, second shift - middlepoint of arrow basis
            dx = - (r + offset) * Math.sin(angle * Math.PI / 180) - (width / 2) * Math.sin((90 - angle) * Math.PI / 180),
            dy = (r + offset) * Math.cos(angle * Math.PI / 180) - (width / 2) * Math.cos((90 - angle) * Math.PI / 180);

        arrow.setAttribute('d', 'M 0 0 L ' + width + ' 0 L ' + (width / 2) + ' ' + height + ' z');
        arrow.setAttribute('transform', 'translate(' + (x + dx) + ',' + (y + dy) + ') ' + 'rotate(' + angle + ')');

        // this._setArrowStyle(arrow, options);

        return arrow;
    }
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
        }
    },

    initialize: function (latlng, options) {
        // L.Util.setOptions(this, options);
        this.setOptions(this, options);
        this._arrows = [];
        this._createArrows();

        L.CircleMarker.prototype.initialize.call(this, latlng, this.options);
    },


    // generic L.setOptions
    // don't allow override arrow options
    setOptions: function (obj, options) {
        for (var i in options) {
            if (i === 'arrow') {
                obj.options[i] = L.extend(obj.options[i], options[i])
            } else {
                obj.options[i] = options[i];
            }
        }
    	return obj.options;
    },

    _createArrows: function () {
        var directions = this.options.directions,
            len = directions.length,
            arrowOptions = this.options.arrow,
            arrow;

        if (!directions || !len) {
            return;
        }

        for (var i = 0; i < len; i++) {
            arrow = this._createArrow(directions[i], arrowOptions);
            this._arrows.push(arrow);
        }
    },

    _createArrow: function (angle, options) {
        var arrow = L.SVG.create('path');

        if (options.interactive) {
            L.DomUtil.addClass(arrow, 'leaflet-interactive');
        }

        arrow.setAttribute('id', options.id + angle);
        arrow.setAttribute('angle', angle);

        // this._setArrowStyle(arrow, options);

        return arrow;
    },

    // _setArrowStyle: function (arrow, options) {
    //     if (options.stroke) {
    //         arrow.setAttribute('stroke', options.color);
    //         arrow.setAttribute('stroke-width', options.weight);
    //         arrow.setAttribute('stroke-opacity', options.opacity);
    //     } else {
    //         arrow.setAttribute('stroke', 'none');
    //     }
    //
    //     if (options.fill) {
    //         arrow.setAttribute('fill', options.fillColor);
    //         arrow.setAttribute('fill-opacity', options.fillOpacity);
    //     } else {
    //         arrow.setAttribute('fill', 'none');
    //     }
    // },

    _updatePath: function () {
        this._renderer._updateCircle(this);
        this._renderer._updateArrows(this);
    }
});

L.viewpoint = function(latlngs, options) {
    return new L.Viewpoint(latlngs, options);
}
