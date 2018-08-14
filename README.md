# Mapbox GL Image Export

This is a Mapbox GL JS plugin that allows you to download the map as `.png` file.

![](https://www.evernote.com/l/ABW7C9vzeu9FsrMfu900lhOknLVdcP-vcCQB/image.png)

## Demo

https://tilecloud.github.io/mbgl-export/

## How to install

```
<script type="src='path/to/dist/app.js'"></script>

<script>
    var map = new mapboxgl.Map({...});

    // Add the control to download png.
    map.addControl(new ExportControl());
</script>
```

Or

```
$ npm install mbgl-export
```

Then:

```
const ExportControl = require('mbgl-export')

var map = new mapboxgl.Map({...});

// Add the control to download png.
map.addControl(new ExportControl());
```

## LICENCE

MIT