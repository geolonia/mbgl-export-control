import ExportControl from '..'

const geoloniaMap = new geolonia.Map('#geolonia')
geoloniaMap.addControl(new ExportControl({
  dpi: 300,
}))
