import ExportControl from '..'

// const map = new mapboxgl.Map({
//   container: 'map',
//   style: 'https://tilecloud.github.io/tiny-tileserver/style.json',
//   attributionControl: true,
//   hash: true,
//   localIdeographFontFamily: ['sans-serif']
// });
//
// map.addControl(new mapboxgl.NavigationControl())
// map.addControl(new ExportControl({
//   dpi: 300,
// }))

const tilecloudMap = new tilecloud.Map(document.querySelector('#tilecloud-custom'))
tilecloudMap.addControl(new ExportControl({
  dpi: 300,
}))
