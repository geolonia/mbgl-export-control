import 'canvas-toBlob'
import FileSaver from 'file-saver'
import { loading, download } from './icons'
import type { Map as GeoloniaMap } from '@geolonia/embed'

type Options = {
  dpi: number,
  attribution: string,
  textFont: string[]
}

const defaultOptions: Options = {
  dpi: 300,
  attribution: "© OpenStreetMap Contributors",
  textFont: [],
}

class ExportControl {

  public options: Options
  public container: HTMLDivElement | null = null

  constructor(options: Partial<Options> = {}) {
    this.options = { ...defaultOptions, ...options }
  }

  onAdd(map: GeoloniaMap) {
    this.container = document.createElement('div')
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group maplibregl-ctrl maplibregl-ctrl-group'

    const btn = document.createElement('button')
    btn.className = 'mapboxgl-ctrl-icon mapbox-gl-download maplibregl-ctrl-icon maplibre-gl-download'
    btn.type = "button"
    btn.setAttribute("aria-label", "Download")
    btn.innerHTML = download

    this.container.appendChild(btn)

    btn.addEventListener('click', async () => {
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
        top: '0',
        bottom: '0',
        width: `${width}px`,
        height: `${height}px`,
      })

      let fontFamily = 'Noto Sans Regular'
      if (map.style.glyphManager && map.style.glyphManager.localIdeographFontFamily) {
        fontFamily = map.style.glyphManager.localIdeographFontFamily
      }

      let Map: typeof GeoloniaMap;
      if ('undefined' !== typeof window.geolonia) {
        Map = window.geolonia.Map
      } else {
        // @ts-ignore
        Map = mapboxgl.Map
      }

      const copiedStyle = JSON.parse(JSON.stringify(map.getStyle()))

      const _map = new Map({
        container: _container,
        center: map.getCenter(),
        zoom: map.getZoom(),
        bearing: map.getBearing(),
        pitch: map.getPitch(),
        style: copiedStyle,
        localIdeographFontFamily: fontFamily,
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

        let textFont: string[] = []
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
            if(blob) {
              FileSaver.saveAs(blob, `${_map.getCenter().toArray().join('-')}.png`)
            }
            _map.remove()
            _container.parentNode!.removeChild(_container)
            _loading.parentNode!.removeChild(_loading)
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
    if(this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container)
    }
  }

  loading() {
    const container = document.createElement('div')
    document.body.appendChild(container)

    this.setStyles(container, {
      position: "absolute",
      top: '0',
      bottom: '0',
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      zIndex: '9999',
    })

    const icon = document.createElement('div')
    icon.innerHTML = loading

    this.setStyles(icon, {
      position: "absolute",
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      zIndex: '9999',
      margin: "auto",
      width: "120px",
      height: "120px",
    })

    container.appendChild(icon)

    return container;
  }

  setStyles(element: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
    for (const style in styles) {
      // @ts-ignore
      element.style[style] = styles[style]
    }
  }
}

export default ExportControl
