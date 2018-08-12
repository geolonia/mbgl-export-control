"use strict"

require('canvas-toBlob')
const FileSaver = require('file-saver')

const download = function() {}

download.prototype.onAdd = (map) => {
  this.container = document.createElement('div')
  this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group'

  const btn = document.createElement('button')
  btn.className = 'mapboxgl-ctrl-icon mapbox-gl-download'
  btn.type = "button"
  btn.setAttribute("aria-label", "Download")
  btn.innerHTML = '<svg height="19px" version="1.1" viewBox="0 0 14 19" width="14px" xmlns="http://www.w3.org/2000/svg" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><defs/><g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1"><g fill="#000000" id="Core" transform="translate(-383.000000, -213.000000)"><g id="file-download" transform="translate(383.000000, 213.500000)"><path d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z" id="Shape"/></g></g></g></svg>'

  this.container.appendChild(btn)

  btn.addEventListener('click', () => {
    const _container = document.createElement('div')
    document.body.appendChild(_container)

    const width = map.getContainer().offsetWidth
    const height = map.getContainer().offsetHeight

    const styles = {
      visibility: "hidden",
      position: "absolute",
      top: 0,
      bottom: 0,
      width: width + 'px',
      height: height + 'px',
    }

    for (var style in styles) {
      _container.style[style] = styles[style]
    }

    const _map = new mapboxgl.Map({
      container: _container,
      center: map.getCenter(),
      zoom: map.getZoom(),
      bearing: map.getBearing(),
      pitch: map.getPitch(),
      style: map.getStyle(),
      hash: false,
      preserveDrawingBuffer: true,
      interactive: false,
      attributionControl: false,
    })
    _map.once('load', () => {
      setTimeout(() => {
        _map.getCanvas().toBlob((blob) => {
          FileSaver.saveAs(blob, _map.getCenter().toArray().join('-') + '.png')
          _map.remove()
          _container.parentNode.removeChild(_container)
        })
      }, 2000)
    })
  })

  return this.container;
}

download.prototype.onRemove = () => {
  this.container.parentNode.removeChild(this.container)
}

mapboxgl.download = download