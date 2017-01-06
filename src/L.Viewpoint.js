
L.Viewpoint = L.CircleMarker.extend({
    options: {
        id: null,
        arrow: {
            width: 8,
            height: 16,
            offset: 3,
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

        if (!options.id) {
            this.options.id = L.stamp(this);
        }

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
                obj.options[i] = L.extend({}, obj.options[i], options[i]);
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


        if ('width' in style || 'height' in style || 'offset' in style) {
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

L.viewpoint = function (latlngs, options) {
    return new L.Viewpoint(latlngs, options);
}
