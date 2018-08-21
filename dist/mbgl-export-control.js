require("canvas-toBlob");var e,t=(e=require("file-saver"))&&"object"==typeof e&&"default"in e?e.default:e,n={loading:'\n  <svg style="width: 100%; height: 100%;" width="45" height="45" viewBox="0 0 45 45" stroke="#fff">\n    <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">\n      <circle cx="22" cy="22" r="6" stroke-opacity="0">\n        <animate attributeName="r"\n              begin="1.5s" dur="3s"\n              values="6;22"\n              calcMode="linear"\n              repeatCount="indefinite" />\n        <animate attributeName="stroke-opacity"\n              begin="1.5s" dur="3s"\n              values="1;0" calcMode="linear"\n              repeatCount="indefinite" />\n        <animate attributeName="stroke-width"\n              begin="1.5s" dur="3s"\n              values="2;0" calcMode="linear"\n              repeatCount="indefinite" />\n      </circle>\n      <circle cx="22" cy="22" r="6" stroke-opacity="0">\n        <animate attributeName="r"\n              begin="3s" dur="3s"\n              values="6;22"\n              calcMode="linear"\n              repeatCount="indefinite" />\n        <animate attributeName="stroke-opacity"\n              begin="3s" dur="3s"\n              values="1;0" calcMode="linear"\n              repeatCount="indefinite" />\n        <animate attributeName="stroke-width"\n              begin="3s" dur="3s"\n              values="2;0" calcMode="linear"\n              repeatCount="indefinite" />\n      </circle>\n      <circle cx="22" cy="22" r="8">\n        <animate attributeName="r"\n              begin="0s" dur="1.5s"\n              values="6;1;2;3;4;5;6"\n              calcMode="linear"\n              repeatCount="indefinite" />\n      </circle>\n    </g>\n  </svg>\n  ',download:'\n  <svg height="19px" viewBox="0 0 14 19" width="14px" xmlns="http://www.w3.org/2000/svg">\n    <title/><desc/><defs/>\n    <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1">\n      <g fill="#000000" id="Core" transform="translate(-383.000000, -213.000000)">\n        <g id="file-download" transform="translate(383.000000, 213.500000)">\n          <path d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z" id="Shape"/>\n        </g>\n      </g>\n    </g>\n  </svg>\n  '},i=function(e){void 0===e&&(e={}),this.options=Object.assign({dpi:300,attribution:"© OpenStreetMap Contributors",textFont:[]},e)};i.prototype.onAdd=function(e){var i=this;this.container=document.createElement("div"),this.container.className="mapboxgl-ctrl mapboxgl-ctrl-group";var o=document.createElement("button");return o.className="mapboxgl-ctrl-icon mapbox-gl-download",o.type="button",o.setAttribute("aria-label","Download"),o.innerHTML=n.download,this.container.appendChild(o),o.addEventListener("click",function(){var n=window.devicePixelRatio;Object.defineProperty(window,"devicePixelRatio",{get:function(){return i.options.dpi/96}});var o=i.loading(),a=document.createElement("div");document.body.appendChild(a);var r=e.getContainer().offsetWidth,l=e.getContainer().offsetHeight,d=e.unproject([r,l]).toArray();i.setStyles(a,{visibility:"hidden",position:"absolute",top:0,bottom:0,width:r+"px",height:l+"px"});var s=new mapboxgl.Map({container:a,center:e.getCenter(),zoom:e.getZoom(),bearing:e.getBearing(),pitch:e.getPitch(),style:e.getStyle(),hash:!1,preserveDrawingBuffer:!0,interactive:!1,attributionControl:!1});s.once("load",function(){s.addSource("attribution-for-image",{type:"geojson",data:{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:d},properties:{text:i.options.attribution}}]}});var r=[];if(i.options.textFont.length)r=i.options.textFont;else for(var l=e.getStyle().layers,c=0;c<l.length;c++)try{var u=e.getLayoutProperty(l[c].id,"text-font");if(u&&u.length){r=u;break}}catch(e){}s.addLayer({id:"markers",type:"symbol",source:"attribution-for-image",paint:{"text-color":"#000000","text-halo-color":"rgba(255, 255, 255, 1)","text-halo-width":2},layout:{"text-field":"{text}","text-font":r,"text-size":18,"text-anchor":"bottom-right","text-max-width":28,"text-offset":[-.5,-.5],"text-allow-overlap":!0}}),setTimeout(function(){s.getCanvas().toBlob(function(e){t.saveAs(e,s.getCenter().toArray().join("-")+".png"),s.remove(),a.parentNode.removeChild(a),o.parentNode.removeChild(o),Object.defineProperty(window,"devicePixelRatio",{get:function(){return n}})})},3e3)})}),this.container},i.prototype.onRemove=function(){this.container.parentNode.removeChild(this.container)},i.prototype.loading=function(){var e=document.createElement("div");document.body.appendChild(e),this.setStyles(e,{position:"absolute",top:0,bottom:0,width:"100%",backgroundColor:"rgba(0, 0, 0, 0.6)",zIndex:9999});var t=document.createElement("div");return t.innerHTML=n.loading,this.setStyles(t,{position:"absolute",top:0,bottom:0,left:0,right:0,zIndex:9999,margin:"auto",width:"120px",height:"120px"}),e.appendChild(t),e},i.prototype.setStyles=function(e,t){for(var n in t)e.style[n]=t[n]},module.exports=i;
//# sourceMappingURL=mbgl-export-control.js.map
