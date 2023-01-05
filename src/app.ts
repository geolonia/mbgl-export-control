import ExportControl from './index'
const exportControl = new ExportControl({ dpi: 300 })
// @ts-ignore
const map = new window.geolonia.Map('#map')
map.addControl(exportControl)
