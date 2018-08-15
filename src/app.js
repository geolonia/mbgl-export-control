"use strict"

require('canvas-toBlob')
const FileSaver = require('file-saver')

const ExportControlOptions = new Object()

const ExportControl = function(options) {
  if (parseInt(options.dpi)) {
    ExportControlOptions.dpi = options.dpi
  } else {
    ExportControlOptions.dpi = 300
  }

  if (options.attribution) {
    ExportControlOptions.attribution = options.attribution
  } else {
    ExportControlOptions.attribution = "© OpenStreetMap Contributors"
  }

  if (options.textFont) {
    ExportControlOptions.textFont = options.textFont
  } else {
    ExportControlOptions.textFont = []
  }
}

ExportControl.prototype.onAdd = (map) => {
  const loading_icon = `
  <svg style="width: 100%; height: 100%;" width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
    <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">
      <circle cx="22" cy="22" r="6" stroke-opacity="0">
        <animate attributeName="r"
              begin="1.5s" dur="3s"
              values="6;22"
              calcMode="linear"
              repeatCount="indefinite" />
        <animate attributeName="stroke-opacity"
              begin="1.5s" dur="3s"
              values="1;0" calcMode="linear"
              repeatCount="indefinite" />
        <animate attributeName="stroke-width"
              begin="1.5s" dur="3s"
              values="2;0" calcMode="linear"
              repeatCount="indefinite" />
      </circle>
      <circle cx="22" cy="22" r="6" stroke-opacity="0">
        <animate attributeName="r"
              begin="3s" dur="3s"
              values="6;22"
              calcMode="linear"
              repeatCount="indefinite" />
        <animate attributeName="stroke-opacity"
              begin="3s" dur="3s"
              values="1;0" calcMode="linear"
              repeatCount="indefinite" />
        <animate attributeName="stroke-width"
              begin="3s" dur="3s"
              values="2;0" calcMode="linear"
              repeatCount="indefinite" />
      </circle>
      <circle cx="22" cy="22" r="8">
        <animate attributeName="r"
              begin="0s" dur="1.5s"
              values="6;1;2;3;4;5;6"
              calcMode="linear"
              repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
  `

  const download_icon = `
  <svg height="19px" viewBox="0 0 14 19" width="14px" xmlns="http://www.w3.org/2000/svg">
    <title/><desc/><defs/>
    <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1">
      <g fill="#000000" id="Core" transform="translate(-383.000000, -213.000000)">
        <g id="file-download" transform="translate(383.000000, 213.500000)">
          <path d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z" id="Shape"/>
        </g>
      </g>
    </g>
  </svg>
  `

  const loading = () => {
    const container = document.createElement('div')
    document.body.appendChild(container)

    const styles = {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 9999,
    }

    for (const style in styles) {
      container.style[style] = styles[style]
    }

    const icon = document.createElement('div')
    icon.innerHTML = loading_icon

    const icon_styles = {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      margin: "auto",
      width: "120px",
      height: "120px",
    }

    for (const style in icon_styles) {
      icon.style[style] = icon_styles[style]
    }

    container.appendChild(icon)

    return container;
  }

  this.container = document.createElement('div')
  this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group'

  const btn = document.createElement('button')
  btn.className = 'mapboxgl-ctrl-icon mapbox-gl-download'
  btn.type = "button"
  btn.setAttribute("aria-label", "Download")
  btn.innerHTML = download_icon

  this.container.appendChild(btn)

  btn.addEventListener('click', () => {
    const actualPixelRatio = window.devicePixelRatio;
    Object.defineProperty(window, 'devicePixelRatio', {
      get: () => ExportControlOptions.dpi / 96
    });

    const _loading = loading()

    const _container = document.createElement('div')
    document.body.appendChild(_container)

    const width = map.getContainer().offsetWidth
    const height = map.getContainer().offsetHeight
    const bottomRight = map.unproject([width, height]).toArray()

    const styles = {
      visibility: "hidden",
      position: "absolute",
      top: 0,
      bottom: 0,
      width: `${width}px`,
      height: `${height}px`,
    }

    for (const style in styles) {
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
      const geojson = {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: bottomRight
          },
          properties: {
            text: ExportControlOptions.attribution
          }
        }]
      };

      _map.addSource("attribution-for-image", {
        type: "geojson",
        data: geojson
      })

      let textFont = []
      if (ExportControlOptions.textFont) {
        textFont = ExportControlOptions.textFont
      } else {
        const layers = map.getStyle().layers
        for (let i = 0; i < layers.length; i++) {
          try {
            const fonts = map.getLayoutProperty(layers[i].id, 'text-font')
            if (fonts && fonts.length) {
              textFont = fonts
              break;
            }
          } catch (e) {
            // Nothing to do.
          }
        }
      }

      _map.addLayer({
        "id": "markers",
        "type": "symbol",
        "source": "attribution-for-image",
        "paint": {
          "text-color": "#000000",
          "text-halo-color": "rgba(255, 255, 255, 1)",
          "text-halo-width": 2,
        },
        "layout": {
          "text-field": "{text}",
          "text-font": textFont,
          "text-size": 18,
          "text-anchor": "bottom-right",
          "text-max-width": 28,
          "text-offset": [-0.5, -0.5],
          "text-allow-overlap": true,
        }
      });

      setTimeout(() => {
        _map.getCanvas().toBlob((blob) => {
          FileSaver.saveAs(blob, `${_map.getCenter().toArray().join('-')}.png`)
          _map.remove()
          _container.parentNode.removeChild(_container)
          _loading.parentNode.removeChild(_loading)
          Object.defineProperty(window, 'devicePixelRatio', {
            get: () => actualPixelRatio
          });
        })
      }, 3000)
    })
  })

  return this.container;
}

ExportControl.prototype.onRemove = () => {
  this.container.parentNode.removeChild(this.container)
}

module.exports = ExportControl;
