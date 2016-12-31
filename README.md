# Leaflet.Viewpoint

Represents point with multiple directions. Extends CircleMarker.

Useful to show photos taken from one point.

Example

![l viewpoint example](https://cloud.githubusercontent.com/assets/17549928/21459122/bb3770bc-c94c-11e6-841f-d1ec4e6073a5.png)


## [Demo](https://ggolikov.github.io/Leaflet.Viewpoint/example/)

## Installation
requires leaflet@1.0.2

browser:

```html
<script src="path/to/leaflet@1.0.2/dist/leaflet.js"></script>
<script src="path/to/Leaflet.viewpoint.js"></script>
```

browserify:

```
npm install leaflet-viewpoint
```

```javascript
require('leaflet');
require('leaflet-viewpoint');
```

## Usage
You can specify arrow directions and style in `options` object by creating a viewpoint.

```javascript
var directions = [0, 45, 90, 135];

var viewpoint = L.viewpoint([55.786456, 37.629898], {
    id: 1, // if not specified, _leaflet_id will be used
    radius: 8,
    fillColor: 'green',
    fillOpacity: 1,
    directions: directions,
    arrow: {
        width: 5    // pixels
        height: 10  // pixels
        offset: 5,  // pixels
        stroke: false,
        color: null,
        weight: 0,
        opacity: 1,
        fill: true,
        fillColor: 'black',
        fillOpacity: 1
    }
}).addTo(map);

```
Don't pass arrow options to `setStyle` method, use `setArrowStyle` instead:

```javascript
viewpoint.setArrowStyle({
    width: 10
    height: 20
    offset: 1,
    stroke: true,
    color: 'black',
    weight: 1,
    opacity: 0.5,
    fill: true,
    fillColor: 'yellow',
    fillOpacity: 0.5
});
```

You can always change arrows directions (in degrees):

```javascript
viewpoint.setDirections([90, 95, 100]);
```

Or get them:

```javascript
var directions = viewpoint.getDirections(); //[90, 95, 100]
```

## API reference
### Factory
Factory|Description
-------|-----------
L.viewpoint(`LatLng` _latlng_, _options?_)| Create viewpoint marker from latLng.

### Methods
Method|Returns|Description
------|-------|-----------
setArrowStyle(`Object`)|`this`|Set arrow style.
setDirections(`Array`)|`this`|Set arrow directions (degrees).
getDirections()|`Array`|Get arrow directions (degrees).

## [License](https://opensource.org/licenses/MIT)
