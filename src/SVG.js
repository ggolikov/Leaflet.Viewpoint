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
            layer._arrows.push(arrow);
        }
    },

    _createArrow: function (angle, options) {
        var arrow = L.SVG.create('path');

        L.DomUtil.addClass(arrow, 'leaflet-interactive');

        arrow.setAttribute('id', options.id + '-' + angle);
        arrow.setAttribute('angle', angle);

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
            angle = Number(arrow.getAttribute('angle')),

            // first shift - radius, second shift - middlepoint of arrow basis
            dx = - (r + offset) * Math.sin(angle * Math.PI / 180) - (width / 2) * Math.sin((90 - angle) * Math.PI / 180),
            dy = (r + offset) * Math.cos(angle * Math.PI / 180) - (width / 2) * Math.cos((90 - angle) * Math.PI / 180);

        arrow.setAttribute('d', 'M 0 0 L ' + width + ' 0 L ' + (width / 2) + ' ' + height + ' z');
        arrow.setAttribute('width', options.width);
        arrow.setAttribute('transform', 'translate(' + (x + dx) + ',' + (y + dy) + ') ' + 'rotate(' + angle + ')');
        // this._setPath(layer, 'M 0 0 L ' + width + ' 0 L ' + (width / 2) + ' ' + height + ' z')
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
