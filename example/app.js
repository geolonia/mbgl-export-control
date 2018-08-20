import tileCloudControl from '@tilecloud/mbgl-tilecloud-control'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import ExportControl from '../src/app'

import "../node_modules/@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css"

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://tilecloud.github.io/tiny-tileserver/style.json',
  attributionControl: true,
  hash: true
});

map.addControl(new mapboxgl.NavigationControl())
map.addControl(new mapboxgl.GeolocateControl())
map.addControl(new tileCloudControl())

map.on('load', () => {
  map.addControl(new MapboxDraw({
    controls: {
      point: true,
      line_string: true,
      polygon: true,
      trash: true,
      combine_features: false,
      uncombine_features: false,
    }
  }));

  map.addControl(new ExportControl({
    dpi: 300,
    textFont: ['noto-sans-cjk-jp-demi-light']
  }))
})
