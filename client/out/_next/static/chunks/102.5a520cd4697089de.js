(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[102],{8423:function(e,t,n){"use strict";let r=n(8472).Z.create({baseURL:"https://api-ligtas.parallaxed.ph",timeout:5e3,headers:{"Content-Type":"application/json"}});t.Z=r},5102:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return O}});var r,a,l,o,c,i,s=n(7437),d=n(2265);let u=(0,d.createContext)(null),p=u.Provider;function f(){let e=(0,d.useContext)(u);if(null==e)throw Error("No context provided: useLeafletContext() can only be used in a descendant of <MapContainer>");return e}var x=n(7691),m=n.n(x);function h(){return(h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}let g=(0,d.forwardRef)(function({bounds:e,boundsOptions:t,center:n,children:r,className:a,id:l,placeholder:o,style:c,whenReady:i,zoom:s,...u},f){let[m]=(0,d.useState)({className:a,id:l,style:c}),[g,b]=(0,d.useState)(null);(0,d.useImperativeHandle)(f,()=>g?.map??null,[g]);let w=(0,d.useCallback)(r=>{if(null!==r&&null===g){let a=new x.Map(r,u);null!=n&&null!=s?a.setView(n,s):null!=e&&a.fitBounds(e,t),null!=i&&a.whenReady(i),b(Object.freeze({__version:1,map:a}))}},[]);(0,d.useEffect)(()=>()=>{g?.map.remove()},[g]);let y=g?d.createElement(p,{value:g},r):o??null;return d.createElement("div",h({},m,{ref:w}),y)});var b=n(4887);function w(e,t,n){return Object.freeze({instance:e,context:t,container:n})}function y(e,t){return null==t?function(t,n){let r=(0,d.useRef)();return r.current||(r.current=e(t,n)),r}:function(n,r){let a=(0,d.useRef)();a.current||(a.current=e(n,r));let l=(0,d.useRef)(n),{instance:o}=a.current;return(0,d.useEffect)(function(){l.current!==n&&(t(o,n,l.current),l.current=n)},[o,n,r]),a}}function j(e,t){let n=(0,d.useRef)(t);(0,d.useEffect)(function(){t!==n.current&&null!=e.attributionControl&&(null!=n.current&&e.attributionControl.removeAttribution(n.current),null!=t&&e.attributionControl.addAttribution(t)),n.current=t},[e,t])}function N(e,t){let n=(0,d.useRef)();(0,d.useEffect)(function(){return null!=t&&e.instance.on(t),n.current=t,function(){null!=n.current&&e.instance.off(n.current),n.current=null}},[e,t])}function v(e,t){let n=e.pane??t.pane;return n?{...e,pane:n}:e}function k(e){return function(t){var n;let r=f(),a=e(v(t,r),r);return j(r.map,t.attribution),N(a.current,t.eventHandlers),n=a.current,(0,d.useEffect)(function(){return(r.layerContainer??r.map).addLayer(n.instance),function(){r.layerContainer?.removeLayer(n.instance),r.map.removeLayer(n.instance)}},[r,n]),a}}let C=(r=k(y(function({url:e,...t},n){return w(new x.TileLayer(e,v(t,n)),n)},function(e,t,n){!function(e,t,n){let{opacity:r,zIndex:a}=t;null!=r&&r!==n.opacity&&e.setOpacity(r),null!=a&&a!==n.zIndex&&e.setZIndex(a)}(e,t,n);let{url:r}=t;null!=r&&r!==n.url&&e.setUrl(r)})),(0,d.forwardRef)(function(e,t){let{instance:n}=r(e).current;return(0,d.useImperativeHandle)(t,()=>n),null})),S=(a=k(y(function({position:e,...t},n){var r;let a=new x.Marker(e,t);return w(a,(r={overlayContainer:a},Object.freeze({...n,...r})))},function(e,t,n){t.position!==n.position&&e.setLatLng(t.position),null!=t.icon&&t.icon!==n.icon&&e.setIcon(t.icon),null!=t.zIndexOffset&&t.zIndexOffset!==n.zIndexOffset&&e.setZIndexOffset(t.zIndexOffset),null!=t.opacity&&t.opacity!==n.opacity&&e.setOpacity(t.opacity),null!=e.dragging&&t.draggable!==n.draggable&&(!0===t.draggable?e.dragging.enable():e.dragging.disable())})),(0,d.forwardRef)(function(e,t){let{instance:n,context:r}=a(e).current;return(0,d.useImperativeHandle)(t,()=>n),null==e.children?null:d.createElement(p,{value:r},e.children)})),I=(l=function(e,t){return w(new x.Popup(e,t.overlayContainer),t)},o=function(e,t,{position:n},r){(0,d.useEffect)(function(){let{instance:a}=e;function l(e){e.popup===a&&(a.update(),r(!0))}function o(e){e.popup===a&&r(!1)}return t.map.on({popupopen:l,popupclose:o}),null==t.overlayContainer?(null!=n&&a.setLatLng(n),a.openOn(t.map)):t.overlayContainer.bindPopup(a),function(){t.map.off({popupopen:l,popupclose:o}),t.overlayContainer?.unbindPopup(),t.map.removeLayer(a)}},[e,t,r,n])},c=y(l),i=function(e,t){let n=f(),r=c(v(e,n),n);return j(n.map,e.attribution),N(r.current,e.eventHandlers),o(r.current,n,e,t),r},(0,d.forwardRef)(function(e,t){let[n,r]=(0,d.useState)(!1),{instance:a}=i(e,r).current;(0,d.useImperativeHandle)(t,()=>a),(0,d.useEffect)(function(){n&&a.update()},[a,n,e.children]);let l=a._contentNode;return l?(0,b.createPortal)(e.children,l):null}));n(966);var E=n(8423);n(3054);var z=n(357),L=e=>{let{totalMarkers:t,okCount:n,notOkCount:r,rescuedCount:a,setFilterStatus:l,setDateFilter:o}=e,c=z.env.NEXT_PUBLIC_BASE_PATH||"",[i,u]=(0,d.useState)(""),[p,f]=(0,d.useState)("");return(0,s.jsxs)("div",{className:"flex flex-wrap gap-4 justify-center md:justify-start",children:[(0,s.jsxs)("div",{className:"cursor-pointer flex flex-row items-center flex-col items-center bg-white border border-gray-200 rounded-xl shadow md:flex-row md:max-w-xs",onClick:()=>l(null),children:[(0,s.jsx)("div",{className:"px-3",children:(0,s.jsx)("img",{src:"".concat(c,"/loc_icon.png"),alt:"Location Icon"})}),(0,s.jsxs)("div",{className:"flex flex-col justify-between p-4 leading-normal",children:[(0,s.jsx)("p",{className:"mb-2 font-lg font-bold text-gray-700 dark:text-gray-400",children:"Total Pin Location"}),(0,s.jsx)("h5",{className:"mb-2 text-xl font-bold tracking-tight text-gray-800",children:t}),(0,s.jsx)("p",{className:"mb-2 font-lg text-white text-xs",children:"Click to filter"})]})]}),(0,s.jsxs)("div",{className:"cursor-pointer flex flex-col items-center bg-green-400 border border-green-400 rounded-xl shadow md:flex-row md:max-w-xs",onClick:()=>l("is Safe"),children:[(0,s.jsx)("div",{className:"px-3",children:(0,s.jsx)("img",{src:"".concat(c,"/safe-icon.png"),alt:"Location Icon",className:"w-12 h-12"})}),(0,s.jsxs)("div",{className:"flex flex-col justify-between p-4 leading-normal text-white",children:[(0,s.jsx)("p",{className:"mb-2 font-lg font-bold text-white",children:"Safe Spartan"}),(0,s.jsx)("h5",{className:"mb-2 text-xl font-bold tracking-tight text-white",children:n}),(0,s.jsx)("p",{className:"mb-2 font-lg text-white text-xs",children:"Click to filter"})]})]}),(0,s.jsxs)("div",{className:"cursor-pointer flex flex-col items-center bg-red-800 border border-red-800 rounded-xl shadow md:flex-row md:max-w-xs",onClick:()=>l("Needs Help"),children:[(0,s.jsx)("div",{className:"px-3",children:(0,s.jsx)("img",{src:"".concat(c,"/unsafe.png"),alt:"Location Icon",className:"w-12 h-12"})}),(0,s.jsxs)("div",{className:"flex flex-col justify-between p-4 leading-normal",children:[(0,s.jsx)("p",{className:"mb-2 font-lg font-bold text-white",children:"Needs Help"}),(0,s.jsx)("h5",{className:"mb-2 text-xl font-bold tracking-tight text-white",children:r}),(0,s.jsx)("p",{className:"mb-2 font-lg text-white text-xs",children:"Click to filter"})]})]}),(0,s.jsxs)("div",{className:"cursor-pointer flex flex-col items-center bg-sky-800 border border-sky-800 rounded-xl shadow md:flex-row md:max-w-xs",onClick:()=>l("is Rescued"),children:[(0,s.jsx)("div",{className:"px-3",children:(0,s.jsx)("img",{src:"".concat(c,"/helped.png"),alt:"Location Icon",className:"w-12 h-12"})}),(0,s.jsxs)("div",{className:"flex flex-col justify-between p-4 leading-normal",children:[(0,s.jsx)("p",{className:"mb-2 font-lg font-bold text-white",children:"Helped Spartan"}),(0,s.jsx)("h5",{className:"mb-2 text-xl font-bold tracking-tight text-white",children:a}),(0,s.jsx)("p",{className:"mb-2 font-lg text-white text-xs",children:"Click to filter"})]})]}),(0,s.jsxs)("div",{className:"flex flex-col items-center",children:[(0,s.jsx)("label",{className:"mb-1 font-sm font-bold text-white",children:"Filter by Date"}),(0,s.jsxs)("div",{className:"flex flex-col gap-1",children:[(0,s.jsx)("input",{type:"date",value:i,onChange:e=>u(e.target.value),className:"border rounded p-1 text-sm"}),(0,s.jsx)("input",{type:"date",value:p,onChange:e=>f(e.target.value),className:"border rounded p-1 text-sm"}),(0,s.jsx)("button",{onClick:()=>{o({start:i,end:p})},className:"bg-blue-500 text-white rounded px-2 py-1 text-sm",children:"Apply"})]})]})]})},A=n(357),O=e=>{let{adminToken:t}=e,n=A.env.NEXT_PUBLIC_BASE_PATH||"",[r,a]=(0,d.useState)([]),[l,o]=(0,d.useState)(()=>{let e=localStorage.getItem("notifiedLocations");return new Set(e?JSON.parse(e):[])}),[c,i]=(0,d.useState)(null),[u,p]=(0,d.useState)({start:null,end:null}),f=(0,d.useRef)(null),[x,h]=(0,d.useState)(13),b=new(m()).Icon({iconUrl:"".concat(n,"/ok.png"),iconSize:[30,30],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]}),w=new(m()).Icon({iconUrl:"".concat(n,"/notok.png"),iconSize:[30,30],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]}),y=new(m()).Icon({iconUrl:"".concat(n,"/rescued.png"),iconSize:[30,30],iconAnchor:[12,41],popupAnchor:[1,-34],shadowSize:[41,41]});(0,d.useEffect)(()=>{delete m().Icon.Default.prototype._getIconUrl,m().Icon.Default.mergeOptions({iconRetinaUrl:"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",iconUrl:"https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",shadowUrl:"https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png"}),j()},[]),(0,d.useEffect)(()=>{if(localStorage.setItem("notifiedLocations",JSON.stringify([...l])),f.current&&f.current.invalidateSize(),r.length&&f.current){let e=r.map(e=>[parseFloat(e.latitude),parseFloat(e.longitude)]);f.current.fitBounds(e)}},[r,l]);let j=(0,d.useCallback)(async()=>{try{let e=await E.Z.get("/api/location-data",{headers:{Authorization:"Bearer ".concat(t)}});a(e.data)}catch(e){console.error("Error fetching data:",e)}},[t]),N=(0,d.useCallback)(async e=>{try{await E.Z.put("/api/send-help/".concat(e),{},{headers:{Authorization:"Bearer ".concat(t)}}),a(t=>t.map(t=>t.id===e?{...t,condition:"is Rescued"}:t)),o(t=>new Set(t).add(e))}catch(e){console.error("Error sending help:",e)}},[t]),v=(0,d.useCallback)(async e=>{try{await E.Z.put("/api/retract-help/".concat(e),{},{headers:{Authorization:"Bearer ".concat(t)}}),a(t=>t.map(t=>t.id===e?{...t,condition:"Needs Help"}:t)),o(t=>new Set(t).add(e))}catch(e){console.error("Error sending help:",e)}},[t]),k=(0,d.useCallback)(async e=>{try{await E.Z.delete("/api/delete-marker/".concat(e),{headers:{Authorization:"Bearer ".concat(t)}}),a(t=>t.filter(t=>t.id!==e))}catch(e){console.error("Error deleting marker:",e)}},[t]),z=r.filter(e=>"is Safe"===e.condition.trim()).length,O=r.filter(e=>"Needs Help"===e.condition.trim()).length,R=r.filter(e=>"is Rescued"===e.condition.trim()).length,H=r.filter(e=>{let t=!c||e.condition.trim()===c,n=!u.start||!u.end||new Date(e.createdAt)>=new Date(u.start)&&new Date(e.createdAt)<=new Date(u.end);return t&&n});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)("div",{className:"my-4 hidden md:block",children:(0,s.jsx)(L,{totalMarkers:r.length,okCount:z,notOkCount:O,rescuedCount:R,setFilterStatus:i,setDateFilter:p})}),(0,s.jsxs)(g,{center:[13.75,121.05],zoom:x,style:{height:"60vh",width:"100%"},className:"map-container",whenCreated:e=>{f.current=e},children:[(0,s.jsx)(C,{url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:'\xa9 <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),H.map(e=>(0,s.jsx)(S,{position:[parseFloat(e.latitude),parseFloat(e.longitude)],icon:"is Safe"===e.condition.trim()?b:"is Rescued"===e.condition.trim()?y:w,children:(0,s.jsx)(I,{children:(0,s.jsxs)("div",{className:"text-center popup-content",children:[(0,s.jsx)("img",{src:"https://api-ligtas.parallaxed.ph".concat(e.image),alt:"No Image Sent",className:"w-full text-black mb-2 rounded-lg place-self-center"}),(0,s.jsxs)("p",{className:"text-black text-xs",style:{color:"darkred"},children:["Location uploaded by ",e.userName]}),(0,s.jsxs)("p",{className:"text-black text-xs",style:{color:"darkred"},children:["Email: ",e.userEmail]}),(0,s.jsxs)("p",{className:"text-black text-xs",style:{color:"darkred"},children:["Spartan ",e.condition]}),(0,s.jsx)("p",{className:"text-black text-xs",style:{color:"darkred"},children:e.message?e.message:"No message"}),"Needs Help"===e.condition.trim()&&(0,s.jsx)("button",{onClick:()=>N(e.id),className:"".concat(l.has(e.id)?"bg-sky-800":"bg-sky-800 hover:bg-sky-800"," text-white font-bold py-2 px-3 rounded mb-2"),children:"Send Help"}),"is Rescued"===e.condition.trim()&&(0,s.jsx)("button",{onClick:()=>v(e.id),className:"".concat(l.has(e.id)?"bg-gray-500":"bg-gray-500 hover:bg-gray-500"," text-white font-bold py-2 px-3 rounded mb-2"),children:"Retract Help"}),(0,s.jsx)("button",{onClick:()=>k(e.id),className:"bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mt-2 ml-2",children:"Delete Marker"})]})})},e.id))]})]})}},966:function(){},3054:function(){}}]);