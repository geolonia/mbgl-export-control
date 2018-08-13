# Mapbox GL Image Export

This is a Mapbox GL JS plugin that allows you to download the map as `.png` file.

![](https://www.evernote.com/l/ABW7C9vzeu9FsrMfu900lhOknLVdcP-vcCQB/image.png)

## How to install

```
<script type="src='path/to/dist/app.js'"></script>

<script>
    var map = new mapboxgl.Map({...});

    // Add the control to download
    map.addControl(new mapboxgl.Export());
</script>
```

## LICENCE

MIT