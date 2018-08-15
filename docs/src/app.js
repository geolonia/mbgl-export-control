import tileCloudControl from '@tilecloud/mbgl-tilecloud-control'
import ForkMeConntrol from '@tilecloud/mbgl-fork-me-control'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import ExportControl from '../../src/app'

import "../../node_modules/@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css"

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://tilecloud.github.io/tiny-tileserver/style.json',
  attributionControl: true,
  hash: true
});

map.on('load', () => {
  map.addControl(new mapboxgl.NavigationControl())
  map.addControl(new mapboxgl.GeolocateControl())
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
  map.addControl(new tileCloudControl())
  map.addControl(new ForkMeConntrol({
    url: 'https://github.com/tilecloud/mbgl-export-control',
  }));

  map.addControl(new ExportControl({
    dpi: 600,
  }))
})
