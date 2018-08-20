"use strict"

import 'babel-polyfill'
import 'canvas-toBlob'
import FileSaver from 'file-saver'
import icons from './icons'

class ExportControl {

  constructor(options = {}) {
    this.options = Object.assign({
        dpi: 300,
        attribution: "© OpenStreetMap Contributors",
        textFont: [],
      }, options
    )
  }

  onAdd(map) {
    this.container = document.createElement('div')
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group'

    const btn = document.createElement('button')
    btn.className = 'mapboxgl-ctrl-icon mapbox-gl-download'
    btn.type = "button"
    btn.setAttribute("aria-label", "Download")
    btn.innerHTML = icons.download

    this.container.appendChild(btn)

    btn.addEventListener('click', () => {
      const actualPixelRatio = window.devicePixelRatio;
      Object.defineProperty(window, 'devicePixelRatio', {
        get: () => this.options.dpi / 96
      });

      const _loading = this.loading()

      const _container = document.createElement('div')
      document.body.appendChild(_container)

      const width = map.getContainer().offsetWidth
      const height = map.getContainer().offsetHeight
      const bottomRight = map.unproject([width, height]).toArray()

      this.setStyles(_container, {
        visibility: "hidden",
        position: "absolute",
        top: 0,
        bottom: 0,
        width: `${width}px`,
        height: `${height}px`,
      })

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
              text: this.options.attribution
            }
          }]
        };

        _map.addSource("attribution-for-image", {
          type: "geojson",
          data: geojson
        })

        let textFont = []
        if (this.options.textFont.length) {
          textFont = this.options.textFont
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

  onRemove() {
    this.container.parentNode.removeChild(this.container)
  }

  loading() {
    const container = document.createElement('div')
    document.body.appendChild(container)

    this.setStyles(container, {
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: 9999,
    })

    const icon = document.createElement('div')
    icon.innerHTML = icons.loading

    this.setStyles(icon, {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      margin: "auto",
      width: "120px",
      height: "120px",
    })

    container.appendChild(icon)

    return container;
  }

  setStyles(element, styles) {
    for (const style in styles) {
      element.style[style] = styles[style]
    }
  }
}

export default ExportControl
