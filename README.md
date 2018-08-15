# Mapbox GL JS Export Control

[![Build Status](https://travis-ci.org/tilecloud/mbgl-export-control.svg?branch=master)](https://travis-ci.org/tilecloud/mbgl-export-control)

This is a Mapbox GL JS plugin that allows you to download the map as `.png` file.

![](https://www.evernote.com/l/ABW7C9vzeu9FsrMfu900lhOknLVdcP-vcCQB/image.png)

## Demo

https://tilecloud.github.io/mbgl-export-control/

## How to install

```html
<script type="src='path/to/dist/app.js'"></script>

<script>
    var map = new mapboxgl.Map({...});

    // Add the control to download png.
    map.addControl(new ExportControl());
</script>
```

Or

```
$ npm install @tilecloud/mbgl-export-control
```

Then:

```node
const ExportControl = require('mbgl-export-control')

var map = new mapboxgl.Map({...});

// Add the control to download png.
map.addControl(new ExportControl());
```

## Options

The constructor of this plugin has some options.

```node
new ExportControl({
  dpi: 300,
  attribution: "© OpenStreetMap Contributors",
})
```

* `dpi` - Resolution for the png image. The default value is `300`.
* `attribution` - The attribution text for map exported with png format.

## LICENCE

MIT
