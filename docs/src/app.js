import tileCloudControl from '@tilecloud/mbgl-tilecloud-control'
import ExportControl from '../../src/app'

const map = new mapboxgl.Map({
  container: 'map',
  style: 'https://tilecloud.github.io/tiny-tileserver/style.json',
  attributionControl: true,
  hash: true
});
map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.GeolocateControl());
map.addControl(new ExportControl());
map.addControl(new tileCloudControl(), 'bottom-left');