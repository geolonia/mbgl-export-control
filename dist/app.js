parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"gMeU":[function(require,module,exports) {
!function(t){"use strict";var o,e=t.Uint8Array,n=t.HTMLCanvasElement,s=n&&n.prototype,i=/\s*;\s*base64\s*(?:;|$)/i,a="toDataURL";e&&(o=new e([62,-1,-1,-1,63,52,53,54,55,56,57,58,59,60,61,-1,-1,-1,0,-1,-1,-1,0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,-1,-1,-1,-1,-1,-1,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51])),!n||s.toBlob&&s.toBlobHD||(s.toBlob||(s.toBlob=function(t,n){if(n||(n="image/png"),this.mozGetAsFile)t(this.mozGetAsFile("canvas",n));else if(this.msToBlob&&/^\s*image\/png\s*(?:$|;)/i.test(n))t(this.msToBlob());else{var s,l=Array.prototype.slice.call(arguments,1),b=this[a].apply(this,l),r=b.indexOf(","),f=b.substring(r+1),B=i.test(b.substring(0,r));Blob.fake?((s=new Blob).encoding=B?"base64":"URI",s.data=f,s.size=f.length):e&&(s=B?new Blob([function(t){for(var n,s,i=t.length,a=new e(i/4*3|0),l=0,b=0,r=[0,0],f=0,B=0;i--;)s=t.charCodeAt(l++),255!==(n=o[s-43])&&void 0!==n&&(r[1]=r[0],r[0]=s,B=B<<6|n,4==++f&&(a[b++]=B>>>16,61!==r[1]&&(a[b++]=B>>>8),61!==r[0]&&(a[b++]=B),f=0));return a}(f)],{type:n}):new Blob([decodeURIComponent(f)],{type:n})),t(s)}}),!s.toBlobHD&&s.toDataURLHD?s.toBlobHD=function(){a="toDataURLHD";var t=this.toBlob();return a="toDataURL",t}:s.toBlobHD=s.toBlob)}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content||this);
},{}],"qmkL":[function(require,module,exports) {
var define;
var e,t=t||function(e){"use strict";if(!(void 0===e||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var t=e.document,n=function(){return e.URL||e.webkitURL||e},o=t.createElementNS("http://www.w3.org/1999/xhtml","a"),r="download"in o,a=/constructor/i.test(e.HTMLElement)||e.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent),u=function(t){(e.setImmediate||e.setTimeout)(function(){throw t},0)},d=function(e){setTimeout(function(){"string"==typeof e?n().revokeObjectURL(e):e.remove()},4e4)},c=function(e){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(e.type)?new Blob([String.fromCharCode(65279),e],{type:e.type}):e},f=function(t,f,s){s||(t=c(t));var l,p=this,v="application/octet-stream"===t.type,w=function(){!function(e,t,n){for(var o=(t=[].concat(t)).length;o--;){var r=e["on"+t[o]];if("function"==typeof r)try{r.call(e,n||e)}catch(e){u(e)}}}(p,"writestart progress write writeend".split(" "))};if(p.readyState=p.INIT,r)return l=n().createObjectURL(t),void setTimeout(function(){var e,t;o.href=l,o.download=f,e=o,t=new MouseEvent("click"),e.dispatchEvent(t),w(),d(l),p.readyState=p.DONE});!function(){if((i||v&&a)&&e.FileReader){var o=new FileReader;return o.onloadend=function(){var t=i?o.result:o.result.replace(/^data:[^;]*;/,"data:attachment/file;");e.open(t,"_blank")||(e.location.href=t),t=void 0,p.readyState=p.DONE,w()},o.readAsDataURL(t),void(p.readyState=p.INIT)}l||(l=n().createObjectURL(t)),v?e.location.href=l:e.open(l,"_blank")||(e.location.href=l);p.readyState=p.DONE,w(),d(l)}()},s=f.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(e,t,n){return t=t||e.name||"download",n||(e=c(e)),navigator.msSaveOrOpenBlob(e,t)}:(s.abort=function(){},s.readyState=s.INIT=0,s.WRITING=1,s.DONE=2,s.error=s.onwritestart=s.onprogress=s.onwrite=s.onabort=s.onerror=s.onwriteend=null,function(e,t,n){return new f(e,t||e.name||"download",n)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content);"undefined"!=typeof module&&module.exports?module.exports.saveAs=t:null!=e&&null!==e.amd&&e("FileSaver.js",function(){return t});
},{}],"A2T1":[function(require,module,exports) {
"use strict";var e=this;require("canvas-toBlob");var t=require("file-saver"),n=new Object,i=function(e){parseInt(e.dpi)?n.dpi=e.dpi:n.dpi=300,e.attribution?n.attribution=e.attribution:n.attribution="© OpenStreetMap Contributors"};i.prototype.onAdd=function(i){e.container=document.createElement("div"),e.container.className="mapboxgl-ctrl mapboxgl-ctrl-group";var o=document.createElement("button");return o.className="mapboxgl-ctrl-icon mapbox-gl-download",o.type="button",o.setAttribute("aria-label","Download"),o.innerHTML='\n  <svg height="19px" viewBox="0 0 14 19" width="14px" xmlns="http://www.w3.org/2000/svg">\n    <title/><desc/><defs/>\n    <g fill="none" fill-rule="evenodd" id="Page-1" stroke="none" stroke-width="1">\n      <g fill="#000000" id="Core" transform="translate(-383.000000, -213.000000)">\n        <g id="file-download" transform="translate(383.000000, 213.500000)">\n          <path d="M14,6 L10,6 L10,0 L4,0 L4,6 L0,6 L7,13 L14,6 L14,6 Z M0,15 L0,17 L14,17 L14,15 L0,15 L0,15 Z" id="Shape"/>\n        </g>\n      </g>\n    </g>\n  </svg>\n  ',e.container.appendChild(o),o.addEventListener("click",function(){var e=window.devicePixelRatio;Object.defineProperty(window,"devicePixelRatio",{get:function(){return n.dpi/96}});var o=function(){var e=document.createElement("div");document.body.appendChild(e);var t={position:"absolute",top:0,bottom:0,width:"100%",backgroundColor:"rgba(0, 0, 0, 0.6)",zIndex:9999};for(var n in t)e.style[n]=t[n];var i=document.createElement("div");i.innerHTML='\n  <svg style="width: 100%; height: 100%;" width="45" height="45" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" stroke="#fff">\n    <g fill="none" fill-rule="evenodd" transform="translate(1 1)" stroke-width="2">\n      <circle cx="22" cy="22" r="6" stroke-opacity="0">\n        <animate attributeName="r"\n              begin="1.5s" dur="3s"\n              values="6;22"\n              calcMode="linear"\n              repeatCount="indefinite" />\n        <animate attributeName="stroke-opacity"\n              begin="1.5s" dur="3s"\n              values="1;0" calcMode="linear"\n              repeatCount="indefinite" />\n        <animate attributeName="stroke-width"\n              begin="1.5s" dur="3s"\n              values="2;0" calcMode="linear"\n              repeatCount="indefinite" />\n      </circle>\n      <circle cx="22" cy="22" r="6" stroke-opacity="0">\n        <animate attributeName="r"\n              begin="3s" dur="3s"\n              values="6;22"\n              calcMode="linear"\n              repeatCount="indefinite" />\n        <animate attributeName="stroke-opacity"\n              begin="3s" dur="3s"\n              values="1;0" calcMode="linear"\n              repeatCount="indefinite" />\n        <animate attributeName="stroke-width"\n              begin="3s" dur="3s"\n              values="2;0" calcMode="linear"\n              repeatCount="indefinite" />\n      </circle>\n      <circle cx="22" cy="22" r="8">\n        <animate attributeName="r"\n              begin="0s" dur="1.5s"\n              values="6;1;2;3;4;5;6"\n              calcMode="linear"\n              repeatCount="indefinite" />\n      </circle>\n    </g>\n  </svg>\n  ';var o={position:"absolute",top:0,bottom:0,left:0,right:0,zIndex:9999,margin:"auto",width:"120px",height:"120px"};for(var n in o)i.style[n]=o[n];return e.appendChild(i),e}(),r=document.createElement("div");document.body.appendChild(r);var a=i.getContainer().offsetWidth,d=i.getContainer().offsetHeight,l=i.unproject([a,d]).toArray(),c={visibility:"hidden",position:"absolute",top:0,bottom:0,width:a+"px",height:d+"px"};for(var s in c)r.style[s]=c[s];var u=new mapboxgl.Map({container:r,center:i.getCenter(),zoom:i.getZoom(),bearing:i.getBearing(),pitch:i.getPitch(),style:i.getStyle(),hash:!1,preserveDrawingBuffer:!0,interactive:!1,attributionControl:!1});u.once("load",function(){var a={type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Point",coordinates:l},properties:{text:n.attribution}}]};u.addSource("attribution-for-image",{type:"geojson",data:a});for(var d=[],c=i.getStyle().layers,s=0;s<c.length;s++)try{var p=i.getLayoutProperty(c[s].id,"text-font");if(p&&p.length){d=p;break}}catch(e){}u.addLayer({id:"markers",type:"symbol",source:"attribution-for-image",paint:{"text-color":"#000000","text-halo-color":"rgba(255, 255, 255, 1)","text-halo-width":2},layout:{"text-field":"{text}","text-font":d,"text-size":18,"text-anchor":"bottom-right","text-max-width":28,"text-offset":[-.5,-.5],"text-allow-overlap":!0}}),setTimeout(function(){u.getCanvas().toBlob(function(n){t.saveAs(n,u.getCenter().toArray().join("-")+".png"),u.remove(),r.parentNode.removeChild(r),o.parentNode.removeChild(o),Object.defineProperty(window,"devicePixelRatio",{get:function(){return e}})})},3e3)})}),e.container},i.prototype.onRemove=function(){e.container.parentNode.removeChild(e.container)},"undefined"!=typeof module&&void 0!==module.exports?module.exports=i:window.ExportControl=i;
},{"canvas-toBlob":"gMeU","file-saver":"qmkL"}]},{},["A2T1"], null)
//# sourceMappingURL=/app.map