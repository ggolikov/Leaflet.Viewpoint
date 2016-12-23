# Leaflet.Viewpoint

Represents point with multiple directions. Extends CircleMarker.

Useful to show photos taken from one point.

Example

![l viewpoint example](https://cloud.githubusercontent.com/assets/17549928/21459122/bb3770bc-c94c-11e6-841f-d1ec4e6073a5.png)


<!-- ## [Demo](https://ggolikov.github.io/Leaflet.River/example/) -->
## Usage
creation:
```javascript
var directions = [0, 45, 90, 135];

var viewPoint = L.viewpoint([55.786456, 37.629898], {
    radius: 8,
    fillColor: 'green',
    fillOpacity: 1,
    directions: directions,
    arrow: {
        width: 5    // pixels
        height: 10  // pixels
        offset: 5,  // pixels
        id: null,
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

## API reference
### Factory
Factory|Description
-------|-----------
L.viewPoint(`LatLng` _latlng_, _options?_)| Create viewpoint marker from latLng.

### Methods
Method|Returns|Description
------|-------|-----------
setArrowStyle(`Object`)|`this`|Set arrow style.
setDirections(`Array`)|`this`|Set arrow directions (degrees).
getDirections()|`Array`|Set arrow directions (degrees).

## [License](https://opensource.org/licenses/MIT)
