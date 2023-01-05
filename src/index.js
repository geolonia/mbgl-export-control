import ExportControl from '../lib/index'
const exportControl = new ExportControl({ dpi: 300 })
const map = new window.geolonia.Map('#map')
map.addControl(exportControl)
