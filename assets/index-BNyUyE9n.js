var ie=Object.defineProperty;var le=(e,t,i)=>t in e?ie(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var x=(e,t,i)=>le(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class T{constructor(t,i,l,n,o="div"){this.parent=t,this.object=i,this.property=l,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(n),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),T.nextNameID=T.nextNameID||0,this.$name.id=`lil-gui-name-${++T.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",s=>s.stopPropagation()),this.domElement.addEventListener("keyup",s=>s.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(l)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("lil-disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const i=this.parent.add(this.object,this.property,t);return i.name(this._name),this.destroy(),i}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class ne extends T{constructor(t,i,l){super(t,i,l,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Mt(e){let t,i;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?i=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),i?"#"+i:!1}const se={isPrimitive:!0,match:e=>typeof e=="string",fromHexString:Mt,toHexString:Mt},G={isPrimitive:!0,match:e=>typeof e=="number",fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>"#"+e.toString(16).padStart(6,0)},oe={isPrimitive:!1,match:e=>Array.isArray(e)||ArrayBuffer.isView(e),fromHexString(e,t,i=1){const l=G.fromHexString(e);t[0]=(l>>16&255)/255*i,t[1]=(l>>8&255)/255*i,t[2]=(l&255)/255*i},toHexString([e,t,i],l=1){l=255/l;const n=e*l<<16^t*l<<8^i*l<<0;return G.toHexString(n)}},ae={isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,i=1){const l=G.fromHexString(e);t.r=(l>>16&255)/255*i,t.g=(l>>8&255)/255*i,t.b=(l&255)/255*i},toHexString({r:e,g:t,b:i},l=1){l=255/l;const n=e*l<<16^t*l<<8^i*l<<0;return G.toHexString(n)}},re=[se,G,oe,ae];function he(e){return re.find(t=>t.match(e))}class ce extends T{constructor(t,i,l,n){super(t,i,l,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=he(this.initialValue),this._rgbScale=n,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=Mt(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const i=this._format.fromHexString(t);this.setValue(i)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class bt extends T{constructor(t,i,l){super(t,i,l,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",n=>{n.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class de extends T{constructor(t,i,l,n,o,s){super(t,i,l,"lil-number"),this._initInput(),this.min(n),this.max(o);const a=s!==void 0;this.step(a?s:this._getImplicitStep(),a),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,i=!0){return this._step=t,this._stepExplicit=i,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let i=(t-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let f=parseFloat(this.$input.value);isNaN(f)||(this._stepExplicit&&(f=this._snap(f)),this.setValue(this._clamp(f)))},l=f=>{const w=parseFloat(this.$input.value);isNaN(w)||(this._snapClampSetValue(w+f),this.$input.value=this.getValue())},n=f=>{f.key==="Enter"&&this.$input.blur(),f.code==="ArrowUp"&&(f.preventDefault(),l(this._step*this._arrowKeyMultiplier(f))),f.code==="ArrowDown"&&(f.preventDefault(),l(this._step*this._arrowKeyMultiplier(f)*-1))},o=f=>{this._inputFocused&&(f.preventDefault(),l(this._step*this._normalizeMouseWheel(f)))};let s=!1,a,h,r,d,c;const m=5,v=f=>{a=f.clientX,h=r=f.clientY,s=!0,d=this.getValue(),c=0,window.addEventListener("mousemove",b),window.addEventListener("mouseup",A)},b=f=>{if(s){const w=f.clientX-a,V=f.clientY-h;Math.abs(V)>m?(f.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(w)>m&&A()}if(!s){const w=f.clientY-r;c-=w*this._step*this._arrowKeyMultiplier(f),d+c>this._max?c=this._max-d:d+c<this._min&&(c=this._min-d),this._snapClampSetValue(d+c)}r=f.clientY},A=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",b),window.removeEventListener("mouseup",A)},$=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",v),this.$input.addEventListener("focus",$),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const t=(p,f,w,V,et)=>(p-f)/(w-f)*(et-V)+V,i=p=>{const f=this.$slider.getBoundingClientRect();let w=t(p,f.left,f.right,this._min,this._max);this._snapClampSetValue(w)},l=p=>{this._setDraggingStyle(!0),i(p.clientX),window.addEventListener("mousemove",n),window.addEventListener("mouseup",o)},n=p=>{i(p.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",o)};let s=!1,a,h;const r=p=>{p.preventDefault(),this._setDraggingStyle(!0),i(p.touches[0].clientX),s=!1},d=p=>{p.touches.length>1||(this._hasScrollBar?(a=p.touches[0].clientX,h=p.touches[0].clientY,s=!0):r(p),window.addEventListener("touchmove",c,{passive:!1}),window.addEventListener("touchend",m))},c=p=>{if(s){const f=p.touches[0].clientX-a,w=p.touches[0].clientY-h;Math.abs(f)>Math.abs(w)?r(p):(window.removeEventListener("touchmove",c),window.removeEventListener("touchend",m))}else p.preventDefault(),i(p.touches[0].clientX)},m=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",c),window.removeEventListener("touchend",m)},v=this._callOnFinishChange.bind(this),b=400;let A;const $=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const w=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+w),this.$input.value=this.getValue(),clearTimeout(A),A=setTimeout(v,b)};this.$slider.addEventListener("mousedown",l),this.$slider.addEventListener("touchstart",d,{passive:!1}),this.$slider.addEventListener("wheel",$,{passive:!1})}_setDraggingStyle(t,i="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",t),document.body.classList.toggle("lil-dragging",t),document.body.classList.toggle(`lil-${i}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:i,deltaY:l}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(i=0,l=-t.wheelDelta/120,l*=this._stepExplicit?1:10),i+-l}_arrowKeyMultiplier(t){let i=this._stepExplicit?1:10;return t.shiftKey?i*=10:t.altKey&&(i/=10),i}_snap(t){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),t-=i,t=Math.round(t/this._step)*this._step,t+=i,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class ue extends T{constructor(t,i,l,n){super(t,i,l,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(n)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(i=>{const l=document.createElement("option");l.textContent=i,this.$select.appendChild(l)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),i=this._values.indexOf(t);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?t:this._names[i],this}}class fe extends T{constructor(t,i,l){super(t,i,l,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",n=>{n.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var pe=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.lil-root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.lil-root > .lil-children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.lil-root > .lil-children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.lil-allow-touch-styles, .lil-gui.lil-allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.lil-force-touch-styles, .lil-gui.lil-force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.lil-auto-place, .lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-controller.lil-disabled {
  opacity: 0.5;
}
.lil-controller.lil-disabled, .lil-controller.lil-disabled * {
  pointer-events: none !important;
}
.lil-controller > .lil-name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-controller .lil-widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-controller.lil-string input {
  color: var(--string-color);
}
.lil-controller.lil-boolean {
  cursor: pointer;
}
.lil-controller.lil-color .lil-display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-controller.lil-color .lil-display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-controller.lil-color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-controller.lil-color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-controller.lil-option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-controller.lil-option .lil-display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-display.lil-focus {
    background: var(--focus-color);
  }
}
.lil-controller.lil-option .lil-display.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-option .lil-display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-controller.lil-option .lil-widget,
.lil-controller.lil-option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-controller.lil-option .lil-widget:hover .lil-display {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number input {
  color: var(--number-color);
}
.lil-controller.lil-number.lil-has-slider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-controller.lil-number .lil-slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-controller.lil-number .lil-slider:hover {
    background: var(--hover-color);
  }
}
.lil-controller.lil-number .lil-slider.lil-active {
  background: var(--focus-color);
}
.lil-controller.lil-number .lil-slider.lil-active .lil-fill {
  opacity: 0.95;
}
.lil-controller.lil-number .lil-fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-dragging * {
  cursor: ew-resize !important;
}
.lil-dragging.lil-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .lil-title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .lil-title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .lil-title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-dragging) .lil-gui .lil-title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .lil-title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.lil-root > .lil-title:focus {
  text-decoration: none !important;
}
.lil-gui.lil-closed > .lil-title:before {
  content: "▸";
}
.lil-gui.lil-closed > .lil-children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.lil-closed:not(.lil-transition) > .lil-children {
  display: none;
}
.lil-gui.lil-transition > .lil-children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .lil-children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.lil-root > .lil-children > .lil-gui > .lil-title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.lil-root > .lil-children > .lil-gui.lil-closed > .lil-title {
  border-bottom-color: transparent;
}
.lil-gui + .lil-controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .lil-title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .lil-children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .lil-controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .lil-controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .lil-controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .lil-controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .lil-controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff2;charset=utf-8;base64,d09GMgABAAAAAALkAAsAAAAABtQAAAKVAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHFQGYACDMgqBBIEbATYCJAMUCwwABCAFhAoHgQQbHAbIDiUFEYVARAAAYQTVWNmz9MxhEgodq49wYRUFKE8GWNiUBxI2LBRaVnc51U83Gmhs0Q7JXWMiz5eteLwrKwuxHO8VFxUX9UpZBs6pa5ABRwHA+t3UxUnH20EvVknRerzQgX6xC/GH6ZUvTcAjAv122dF28OTqCXrPuyaDER30YBA1xnkVutDDo4oCi71Ca7rrV9xS8dZHbPHefsuwIyCpmT7j+MnjAH5X3984UZoFFuJ0yiZ4XEJFxjagEBeqs+e1iyK8Xf/nOuwF+vVK0ur765+vf7txotUi0m3N0m/84RGSrBCNrh8Ee5GjODjF4gnWP+dJrH/Lk9k4oT6d+gr6g/wssA2j64JJGP6cmx554vUZnpZfn6ZfX2bMwPPrlANsB86/DiHjhl0OP+c87+gaJo/gY084s3HoYL/ZkWHTRfBXvvoHnnkHvngKun4KBE/ede7tvq3/vQOxDXB1/fdNz6XbPdcr0Vhpojj9dG+owuSKFsslCi1tgEjirjXdwMiov2EioadxmqTHUCIwo8NgQaeIasAi0fTYSPTbSmwbMOFduyh9wvBrESGY0MtgRjtgQR8Q1bRPohn2UoCRZf9wyYANMXFeJTysqAe0I4mrherOekFdKMrYvJjLvOIUM9SuwYB5DVZUwwVjJJOaUnZCmcEkIZZrKqNvRGRMvmFZsmhP4VMKCSXBhSqUBxgMS7h0cZvEd71AWkEhGWaeMFcNnpqyJkyXgYL7PQ1MoSq0wDAkRtJIijkZSmqYTiSImfLiSWXIZwhRh3Rug2X0kk1Dgj+Iu43u5p98ghopcpSo0Uyc8SnjlYX59WUeaMoDqmVD2TOWD9a4pCRAzf2ECgwGcrHjPOWY9bNxq/OL3I/QjwEAAAA=") format("woff2");
}`;function me(e){const t=document.createElement("style");t.innerHTML=e;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(t,i):document.head.appendChild(t)}let Ht=!1;class St{constructor({parent:t,autoPlace:i=t===void 0,container:l,width:n,title:o="Controls",closeFolders:s=!1,injectStyles:a=!0,touchStyles:h=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),h&&this.domElement.classList.add("lil-allow-touch-styles"),!Ht&&a&&(me(pe),Ht=!0),l?l.appendChild(this.domElement):i&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),n&&this.domElement.style.setProperty("--width",n+"px"),this._closeFolders=s}add(t,i,l,n,o){if(Object(l)===l)return new ue(this,t,i,l);const s=t[i];switch(typeof s){case"number":return new de(this,t,i,l,n,o);case"boolean":return new ne(this,t,i);case"string":return new fe(this,t,i);case"function":return new bt(this,t,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,t,`
	value:`,s)}addColor(t,i,l=1){return new ce(this,t,i,l)}addFolder(t){const i=new St({parent:this,title:t});return this.root._closeFolders&&i.close(),i}load(t,i=!0){return t.controllers&&this.controllers.forEach(l=>{l instanceof bt||l._name in t.controllers&&l.load(t.controllers[l._name])}),i&&t.folders&&this.folders.forEach(l=>{l._title in t.folders&&l.load(t.folders[l._title])}),this}save(t=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(l=>{if(!(l instanceof bt)){if(l._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${l._name}"`);i.controllers[l._name]=l.save()}}),t&&this.folders.forEach(l=>{if(l._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${l._title}"`);i.folders[l._title]=l.save()}),i}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("lil-transition");const l=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",l))};this.$children.addEventListener("transitionend",l);const n=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!t),requestAnimationFrame(()=>{this.$children.style.height=n+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(l=>l.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(i=>{t=t.concat(i.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(i=>{t=t.concat(i.foldersRecursive())}),t}}function ge(e,t,i){var a,h;const l=i.length,n=(a=i[l-1])==null?void 0:a.answer,o=l>=2&&n!==void 0&&n===((h=i[l-2])==null?void 0:h.answer)?n:-1;if(o<0||e<=1)return Math.min(e-1,Math.floor(t()*e));const s=Math.min(e-2,Math.floor(t()*(e-1)));return s>=o?s+1:s}function _t(e,t,i){const l=ge(t.answerCount,i,e.queue);e.queue.push({answer:l,face:t.makeFace(l,i)})}function be(e,t){const i={queue:[],bottomY:e.lineY,spawnAcc:0},l=e.maxQueue>0?e.maxQueue:4;for(let n=0;n<l;n++)_t(i,e,t);return i}function ve(e,t,i,l){if(e.bottomY=Math.min(i.lineY,e.bottomY+i.fallBlocksPerSec*i.blockH*t),i.maxQueue>0){for(;e.queue.length<i.maxQueue;)_t(e,i,l);return}for(e.spawnAcc+=i.spawnPerSec*t;e.spawnAcc>=1;)e.spawnAcc-=1,_t(e,i,l)}function ye(e,t,i){const l=e.queue[0];return l?l.answer!==t?"miss":(e.queue.shift(),e.bottomY-=i.blockH,"hit"):"empty"}const ht={easy:{id:"easy",label:"かんたん",answerCount:3,visibleCount:3},normal:{id:"normal",label:"ふつう",answerCount:4,visibleCount:4},hard:{id:"hard",label:"むずかしい",answerCount:5,visibleCount:5}},Ct=["easy","normal","hard"];function we(e){return ht[e].answerCount}function Me(e){return ht[e].visibleCount}const K=[{fill:"#ff5a5f",edge:"#c02128",gloss:"#ff9296",glyph:"#ffffff",shape:"circle",label:"あか"},{fill:"#3fa9ff",edge:"#1259a8",gloss:"#8bccff",glyph:"#ffffff",shape:"square",label:"あお"},{fill:"#ffc93c",edge:"#c07f00",gloss:"#ffe293",glyph:"#7a4b00",shape:"triangle",label:"きいろ"},{fill:"#4bd37b",edge:"#188c4a",gloss:"#9aeab7",glyph:"#ffffff",shape:"diamond",label:"みどり"},{fill:"#b072ff",edge:"#6a2cbd",gloss:"#d6b1ff",glyph:"#ffffff",shape:"star",label:"むらさき"}],Yt={fill:"#efe0c6",edge:"#b09166",gloss:"#fff4de",glyph:"#6b5330"},_e="#dcefff",$e="#fff4e2",F="#4a3a24",R="rgba(74,58,36,0.55)",k="ui-rounded, 'Hiragino Maru Gothic ProN', 'Hiragino Sans', -apple-system, BlinkMacSystemFont, 'Noto Sans JP', sans-serif";function ke(e,t,i,l,n){switch(e.beginPath(),t){case"circle":e.arc(i,l,n,0,Math.PI*2);break;case"square":e.rect(i-n*.85,l-n*.85,n*1.7,n*1.7);break;case"triangle":Dt(e,i,l+n*.12,n*1.12,3,-Math.PI/2);break;case"diamond":Dt(e,i,l,n*1.14,4,-Math.PI/2);break;case"star":Ae(e,i,l,n*1.16,n*.5,5);break}e.closePath()}function Dt(e,t,i,l,n,o){for(let s=0;s<n;s++){const a=o+s*Math.PI*2/n,h=t+Math.cos(a)*l,r=i+Math.sin(a)*l;s===0?e.moveTo(h,r):e.lineTo(h,r)}}function Ae(e,t,i,l,n,o){for(let s=0;s<o*2;s++){const a=s%2===0?l:n,h=-Math.PI/2+s*Math.PI/o,r=t+Math.cos(h)*a,d=i+Math.sin(h)*a;s===0?e.moveTo(r,d):e.lineTo(r,d)}}function y(e,t,i,l,n,o){const s=Math.max(0,Math.min(o,l/2,n/2));e.beginPath(),e.moveTo(t+s,i),e.arcTo(t+l,i,t+l,i+n,s),e.arcTo(t+l,i+n,t,i+n,s),e.arcTo(t,i+n,t,i,s),e.arcTo(t,i,t+l,i,s),e.closePath()}const Se=3200;class Ce{constructor(){x(this,"enabled",!0);x(this,"shards",[]);x(this,"beams",[])}clear(){this.shards.length=0,this.beams.length=0}get shardCount(){return this.shards.length}burst(t,i,l,n,o,s,a,h=0){if(!this.enabled)return;const r=Math.min(h,10)/10,d=7+Math.round(r*4);for(let c=0;c<d;c++){const m=c/d*Math.PI*2+a()*.6,v=90+a()*220;this.shards.push({x:t+(a()-.5)*l*.6,y:i+a()*n*.25,vx:Math.cos(m)*v,vy:Math.sin(m)*v*.55-100,rot:a()*Math.PI,vrot:(a()-.5)*14,size:Math.min(l,n)*(.14+a()*.12)*(1+r*.4),life:.42+a()*.12,maxLife:.54,fill:o,edge:s})}}beam(t,i,l,n,o){this.enabled&&this.beams.push({x:t,w:i,yFrom:l,yTo:n,life:.09,maxLife:.09,fill:o})}confetti(t,i,l,n){if(this.enabled)for(let o=0;o<l;o++){const s=K[Math.floor(n()*K.length)];this.shards.push({x:n()*t,y:-20-n()*i*.4,vx:(n()-.5)*120,vy:60+n()*160,rot:n()*Math.PI,vrot:(n()-.5)*10,size:6+n()*8,life:1.4+n()*.8,maxLife:2.2,fill:s.fill,edge:s.edge})}}update(t){for(let i=this.shards.length-1;i>=0;i--){const l=this.shards[i];if(l.life-=t,l.life<=0){this.shards.splice(i,1);continue}l.vy+=Se*t,l.x+=l.vx*t,l.y+=l.vy*t,l.rot+=l.vrot*t}for(let i=this.beams.length-1;i>=0;i--){const l=this.beams[i];l.life-=t,l.life<=0&&this.beams.splice(i,1)}}draw(t){for(const i of this.beams){const l=1-i.life/i.maxLife,n=i.yFrom+(i.yTo-i.yFrom)*l,o=Math.abs(i.yFrom-i.yTo)*.42;t.globalAlpha=.55*(1-l),t.fillStyle=i.fill,y(t,i.x-i.w/2,n-o,i.w,o,i.w/2),t.fill()}t.globalAlpha=1;for(const i of this.shards){const l=Math.min(1,i.life/(i.maxLife*.4));t.globalAlpha=l,t.save(),t.translate(i.x,i.y),t.rotate(i.rot),y(t,-i.size/2,-i.size/2,i.size,i.size,i.size*.28),t.fillStyle=i.fill,t.fill(),t.lineWidth=Math.max(1.5,i.size*.14),t.strokeStyle=i.edge,t.stroke(),t.restore()}t.globalAlpha=1}}const Q=44;function zt(e,t,i,l,n,o,s=0){const a=Math.min(e,t),h=Math.min(t*.11,84),r=s+Math.max(6,t*.012),d=Math.min(t*.19,130),c=t-d-r,m=(c-h)/(n+o),v=Math.max(24,Math.min(a*l,m)),b=Math.min(e*.46,v*1.3),A=c-v*o,$=Math.max(4,e*.012),p=(e-$*(i+1))/i,f=[];for(let w=0;w<i;w++)f.push({x:$+w*(p+$),y:c+$,w:p,h:d-$*2});return{w:e,h:t,headerH:h,blockH:v,blockW:b,colX:e/2,lineY:c,restY:A,buttons:f}}function Ee(e,t,i){for(let l=0;l<e.buttons.length;l++){const n=e.buttons[l];if(t>=n.x-2&&t<=n.x+n.w+2&&i>=e.lineY)return l}return null}function Fe(e,t,i){const l=Wt(t)+Nt(t)+Math.max(14,t*.02),n=t*.88-l,o=.28,s=Math.min(t*.13,96,n/(i*(1+o)-o)),a=s*o,h=Math.min(e*.72,340),r=i*s+(i-1)*a,d=l+(n-r)/2,c=[];for(let m=0;m<i;m++)c.push({x:(e-h)/2,y:d+m*(s+a),w:h,h:s});return c}function Te(e,t,i){const l=Math.max(6,e*.022),n=Math.min((e*.86-l*(i-1))/i,120),o=Nt(t),s=i*n+(i-1)*l,a=(e-s)/2,h=Wt(t),r=[];for(let d=0;d<i;d++)r.push({x:a+d*(n+l),y:h,w:n,h:o});return r}const Wt=e=>e*.29,Nt=e=>Math.min(e*.065,50);function P(e,t,i){return t>=e.x&&t<=e.x+e.w&&i>=e.y&&i<=e.y+e.h}function Et(e,t){const i=Math.max(Q,Math.min(e*.12,52));return{x:e-i-Math.max(10,e*.035),y:Math.max(10,t*.018),w:i,h:i}}function qt(e,t){const i=Math.min(e*.6,280),l=Math.max(Q,Math.min(t*.09,68)),n=Math.min(e*.44,200),o=Math.max(Q,Math.min(t*.07,54));return{again:{x:(e-i)/2,y:t*.735,w:i,h:l},title:{x:(e-n)/2,y:t*.735+l+Math.max(12,t*.022),w:n,h:o}}}function Ut(e,t,i){const l=Math.max(16,e*.055),n=Math.min(t*.105,84),o=n*.22,s=t*.19,a=e-l,h=Math.max(5,e*.016),r=[];for(let b=0;b<i.length;b++){const A=s+b*(n+o),$=i[b],p=$<=2?Math.min(e*.21,86):Math.min(e*.125,52),f=n*.6,w=$*p+($-1)*h,V=a-w,et=[];for(let gt=0;gt<$;gt++)et.push({x:V+gt*(p+h),y:A+(n-f)/2,w:p,h:f});r.push({label:{x:l,y:A,w:Math.max(40,V-l-10),h:n},chips:et})}const d=Math.min(e*.5,230),c=Math.max(Q,Math.min(t*.085,64)),m=Math.min(e*.44,190),v=Math.max(Q,Math.min(t*.055,48));return{rows:r,close:{x:(e-d)/2,y:t*.71,w:d,h:c},admin:{x:(e-m)/2,y:t*.86,w:m,h:v}}}const Oe=3e3;class xe{constructor(){x(this,"samples",[]);x(this,"lastHitAt",null);x(this,"hits",0);x(this,"misses",0)}reset(){this.samples=[],this.lastHitAt=null,this.hits=0,this.misses=0}recordMiss(){this.misses++}recordHit(t,i,l){this.hits++;const n=this.lastHitAt;if(this.lastHitAt=t,n===null)return;const o=t-n;o>Oe||this.samples.push({mode:l,depth:i,interval:o})}summary(t,i,l){const n=this.samples.filter(c=>c.mode==="open"),o=this.samples.filter(c=>c.mode==="blind"),s=it(n.map(c=>c.interval)),a=it(o.map(c=>c.interval)),h=n.filter(c=>c.depth>=t),r=n.filter(c=>c.depth<=i),d=n.filter(c=>c.interval<l).length;return{hits:this.hits,misses:this.misses,openMedian:s,blindMedian:a,lookaheadGain:s!==null&&a!==null&&s>0?a/s:null,deepMedian:it(h.map(c=>c.interval)),shallowMedian:it(r.map(c=>c.interval)),preemptRate:n.length>0?d/n.length:null}}count(t){return this.samples.filter(i=>i.mode===t).length}}function it(e){if(e.length===0)return null;const t=[...e].sort((l,n)=>l-n),i=t.length>>1;return t.length%2===1?t[i]:(t[i-1]+t[i])/2}const Pe={color:-1,shape:null,dots:0,layout:0,numeral:0,frame:0,text:""};function O(e){return{...Pe,...e}}const $t=["circle","square","triangle","diamond","star"],Xt={1:[[[1,1]],[[0,0]],[[2,2]]],2:[[[0,0],[2,2]],[[2,0],[0,2]],[[0,1],[2,1]]],3:[[[0,0],[1,1],[2,2]],[[2,0],[1,1],[0,2]],[[1,0],[0,2],[2,2]]],4:[[[0,0],[2,0],[0,2],[2,2]],[[1,0],[0,1],[2,1],[1,2]],[[0,0],[2,0],[1,1],[1,2]]],5:[[[0,0],[2,0],[1,1],[0,2],[2,2]],[[1,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[2,0],[0,1],[0,2],[2,2]]]};function He(e,t){const i=Xt[e];return!i||i.length===0?[]:i[t%i.length]}function De(e,t){var l;const i=((l=Xt[e])==null?void 0:l.length)??1;return Math.min(i-1,Math.floor(t()*i))}function Rt(e,t){return O({color:e,shape:t.colorAssist?$t[e]??"circle":null})}const Ft={iro:{id:"iro",label:"いろ",note:"同一マッチ。色だけ。2〜3歳",maxAnswers:5,buttonFace:(e,t)=>Rt(e,t),blockFace:(e,t,i)=>Rt(e,i)},katachi:{id:"katachi",label:"かたち",note:"同一マッチ。色の手がかりを消してある。3歳",maxAnswers:5,buttonFace:e=>O({shape:$t[e]??"circle"}),blockFace:e=>O({shape:$t[e]??"circle"})},ikutsu:{id:"ikutsu",label:"いくつ",note:"変換マッチ。サイコロの目を見て数字を押す。4〜5歳",maxAnswers:5,buttonFace:e=>O({numeral:e+1}),blockFace:(e,t)=>O({dots:e+1,layout:De(e+1,t)})},hosuu:{id:"hosuu",label:"10のほすう",note:"変換マッチ。あと何個で10か。さくらんぼ算の土台。小1",maxAnswers:5,buttonFace:e=>O({numeral:e+1}),blockFace:e=>O({frame:9-e})},tashizan:{id:"tashizan",label:"たしざん",note:"変換マッチ。式を見て答えを押す。答えは2〜6。小1",maxAnswers:5,buttonFace:e=>O({numeral:e+2}),blockFace:(e,t)=>{const i=e+2,l=1+Math.min(i-2,Math.floor(t()*(i-1)));return O({text:`${l}+${i-l}`})}}},Tt=["iro","katachi","ikutsu","hosuu","tashizan"],z=5,vt=2,I=[{key:"soundOn",label:"おと",hint:"こうかおん",choices:[{label:"あり",value:!0},{label:"なし",value:!1}]},{key:"baseSec",label:"じかん",hint:"1かいの ながさ（びょう）",choices:[{label:"20",value:20},{label:"30",value:30},{label:"45",value:45},{label:"60",value:60}]},{key:"showCount",label:"すうじ",hint:"のこりと けしたかず",choices:[{label:"だす",value:!0},{label:"ださない",value:!1}]},{key:"colorAssist",label:"いろのサポート",hint:"かたちを かさねる",choices:[{label:"なし",value:!1},{label:"あり",value:!0}]}];function Re(e,t,i){switch(t){case"soundOn":e.soundOn=i.value;break;case"showCount":e.showCount=i.value;break;case"colorAssist":e.colorAssist=i.value;break;case"baseSec":e.baseSec=i.value;break}}function Ve(e,t){return t.choices.findIndex(i=>i.value===e[t.key])}function Ie(e){return{elapsed:0,penalty:0,cleared:0,missed:0}}function jt(e,t){return Math.max(0,t.baseSec-e.elapsed-e.penalty)}function Le(e,t){return jt(e,t)<=0}function Be(e,t){e.elapsed+=t}function Ye(e,t){e.cleared++,e.penalty=Math.max(0,e.penalty-t.hitRecoverSec)}function ze(e,t){e.missed++,e.penalty+=t.missPenaltySec}const ct="rgba(74,58,36,0.20)";function We(e,t){const{layout:i,column:l,mode:n}=t;dt(e,i),Ue(e,i,t);const o=i.blockW*1.34;y(e,i.colX-o/2,i.restY-4,o,14,7),e.fillStyle="rgba(74,58,36,0.16)",e.fill();const s=i.colX-i.blockW/2;for(let a=0;a<l.queue.length;a++){const h=l.queue[a];if(!h)continue;const r=l.bottomY-(a+1)*i.blockH;if(r>i.restY||r+i.blockH<i.headerH-i.blockH)break;let d=r,c=i.blockH;const m=a===0;if(m&&t.squash>0&&(c=i.blockH*(1-.2*t.squash),d=r+(i.blockH-c)),m){const v=i.blockW*1.09,b=i.colX-v/2;Ne(e,b,d,v,c,t.targetPulse),yt(e,b,d,v,c,h.face,!1,10),t.showPointer&&qe(e,b,d,v,c,t.targetPulse)}else yt(e,s,d,i.blockW,c,h.face,t.hideAhead)}t.effects.draw(e);for(let a=0;a<t.answerCount;a++){const h=i.buttons[a];if(!h)continue;const r=(t.press[a]??0)*5;yt(e,h.x,h.y+r,h.w,h.h,n.buttonFace(a,t.faceOpts),!1,6-r)}}function Ne(e,t,i,l,n,o){const s=5+o*4;y(e,t-s,i-s,l+s*2,n+s*2,(n+s*2)*.3),e.lineWidth=4,e.strokeStyle=`rgba(74,58,36,${.14+o*.24})`,e.stroke()}function qe(e,t,i,l,n,o){const s=i+n/2,a=Math.min(n*.3,22),h=o*a*.45;e.fillStyle="#c07000";for(const r of[-1,1]){const d=r<0?t-16-h:t+l+16+h;e.beginPath(),e.moveTo(d,s),e.lineTo(d-r*a,s-a*.6),e.lineTo(d-r*a,s+a*.6),e.closePath(),e.fill()}}function dt(e,t){const i=e.createLinearGradient(0,0,0,t.h);i.addColorStop(0,_e),i.addColorStop(1,$e),e.fillStyle=i,e.fillRect(0,0,t.w,t.h)}function Ue(e,t,i){const l=i.session,n=jt(l,i.sessionCfg),o=Math.max(12,t.w*.045),s=Math.max(16,t.headerH*.32),a=t.headerH*.3,h=t.w-o*2;y(e,o,a,h,s,s/2),e.fillStyle="rgba(74,58,36,0.12)",e.fill();const r=Math.max(0,Math.min(1,n/i.sessionCfg.baseSec));if(r>0){const d=Math.max(s,h*r),c=n<=5?"#ff5a5f":n<=12?"#ffab2e":"#4bd37b",m=n<=5?"#c02128":n<=12?"#c07000":"#188c4a";y(e,o,a,d,s,s/2),e.fillStyle=c,e.fill(),e.lineWidth=3,e.strokeStyle=m,e.stroke(),y(e,o+s*.25,a+s*.18,d-s*.5,s*.26,s*.13),e.fillStyle="rgba(255,255,255,0.42)",e.fill()}i.showCount&&(e.textBaseline="top",e.font=`700 ${Math.round(t.headerH*.3)}px ${k}`,e.fillStyle=R,e.textAlign="left",e.fillText(`${Math.ceil(n)}`,o+2,a+s+5),e.fillStyle=F,e.textAlign="right",e.fillText(`${l.cleared}こ`,t.w-o-2,a+s+5))}function yt(e,t,i,l,n,o,s,a=6){const h=Math.min(l,n)*.26,r=2;a>0&&(y(e,t+r,i+r+a,l-r*2,n-r*2,h),e.fillStyle=ct,e.fill());const d=s?{fill:"#d9cdb8",edge:"#a8977c",gloss:"#efe6d5",glyph:"#a8977c"}:o.color>=0?K[o.color]:Yt;y(e,t+r,i+r,l-r*2,n-r*2,h),e.fillStyle=d.fill,e.fill(),e.save(),e.clip(),y(e,t+r,i+r,l-r*2,(n-r*2)*.44,h),e.fillStyle=d.gloss,e.globalAlpha=.42,e.fill(),e.restore(),e.globalAlpha=1,y(e,t+r,i+r,l-r*2,n-r*2,h),e.lineWidth=Math.max(3,Math.min(l,n)*.075),e.strokeStyle=d.edge,e.stroke(),s||Xe(e,o,t+l/2,i+n/2,l-r*2,n-r*2,d.glyph)}function Xe(e,t,i,l,n,o,s){const a=Math.min(n,o);if(e.fillStyle=s,t.frame>0){je(e,t.frame,i,l,n,o,s);return}if(t.text){e.textAlign="center",e.textBaseline="middle",e.font=`800 ${Math.round(Math.min(o*.46,n*.86/t.text.length))}px ${k}`,e.fillText(t.text,i,l+a*.03);return}if(t.numeral>0){e.textAlign="center",e.textBaseline="middle",e.font=`800 ${Math.round(a*.6)}px ${k}`,e.fillText(String(t.numeral),i,l+a*.04);return}if(t.shape){ke(e,t.shape,i,l,a*.25),e.fill();return}if(t.dots>0){const h=a*.26,r=a*.098;for(const[d,c]of He(t.dots,t.layout))e.beginPath(),e.arc(i+(d-1)*h,l+(c-1)*h,r,0,Math.PI*2),e.fill()}}function je(e,t,i,l,n,o,s){const a=n*.84,h=Math.min(o*.68,a/z*vt*1.2),r=i-a/2,d=l-h/2,c=a/z,m=h/vt,v=Math.min(c,m)*.3;y(e,r,d,a,h,Math.min(c,m)*.28),e.lineWidth=Math.max(2,Math.min(n,o)*.026),e.strokeStyle=s,e.globalAlpha=.5,e.stroke(),e.globalAlpha=1;for(let b=0;b<z*vt;b++){const A=r+b%z*c+c/2,$=d+Math.floor(b/z)*m+m/2;e.beginPath(),e.arc(A,$,v,0,Math.PI*2),b<t?(e.fillStyle=s,e.fill()):(e.lineWidth=Math.max(1.5,v*.32),e.strokeStyle=s,e.globalAlpha=.34,e.stroke(),e.globalAlpha=1)}}function Ge(e,t,i){dt(e,t),e.textAlign="center",e.textBaseline="middle",e.fillStyle=F,e.font=`800 ${Math.round(Math.min(t.w*.115,50))}px ${k}`,e.fillText("みつけてポン",t.w/2,t.h*.16);for(let l=0;l<i.difficulties.length;l++){const n=i.difficultyRects[l],o=i.difficulties[l];if(!n||!o)continue;const s=o.id===i.selected;y(e,n.x,n.y,n.w,n.h,n.h*.42),e.fillStyle=s?F:"rgba(255,255,255,0.66)",e.fill(),e.lineWidth=3,e.strokeStyle=s?F:"rgba(74,58,36,0.22)",e.stroke(),e.fillStyle=s?"#fff6e6":R,e.font=`700 ${Math.round(Math.min(n.h*.38,n.w*.21))}px ${k}`,e.fillText(o.label,n.x+n.w/2,n.y+n.h/2)}for(let l=0;l<i.modes.length;l++){const n=i.modeRects[l],o=i.modes[l];if(!n||!o)continue;const s=K[l];y(e,n.x,n.y+7,n.w,n.h,n.h*.32),e.fillStyle=ct,e.fill(),y(e,n.x,n.y,n.w,n.h,n.h*.32),e.fillStyle=s.fill,e.fill(),e.save(),e.clip(),y(e,n.x,n.y,n.w,n.h*.44,n.h*.32),e.globalAlpha=.4,e.fillStyle=s.gloss,e.fill(),e.restore(),e.globalAlpha=1,y(e,n.x,n.y,n.w,n.h,n.h*.32),e.lineWidth=4,e.strokeStyle=s.edge,e.stroke(),e.fillStyle="#ffffff",e.font=`800 ${Math.round(n.h*.44)}px ${k}`,e.fillText(o.label,n.x+n.w/2,n.y+n.h/2)}if(Gt(e,Et(t.w,t.h)),i.notices.length>0){const l=Math.round(Math.min(t.w*.038,15));e.font=`700 ${l}px ${k}`;const n=t.h-Math.max(14,t.h*.03);e.fillStyle="#c07000",e.fillText("⚙ きてい以外の設定",t.w/2,n-l*1.5*i.notices.length),e.fillStyle="rgba(192,112,0,0.75)",i.notices.forEach((o,s)=>{e.fillText(o,t.w/2,n-l*1.5*(i.notices.length-1-s))})}}function Ke(e,t,i,l,n){dt(e,t),e.textAlign="center",e.textBaseline="middle",n.draw(e),e.fillStyle=F,e.font=`800 ${Math.round(Math.min(t.w*.1,42))}px ${k}`,e.fillText("よくできました",t.w/2,t.h*.24);const o=t.w/2,s=t.h*.44,a=Math.min(t.w*.28,t.h*.155);if(e.beginPath(),e.arc(o,s+7,a,0,Math.PI*2),e.fillStyle=ct,e.fill(),e.beginPath(),e.arc(o,s,a,0,Math.PI*2),e.fillStyle="#ffc93c",e.fill(),e.lineWidth=6,e.strokeStyle="#c07f00",e.stroke(),l)e.fillStyle="#7a4b00",e.font=`800 ${Math.round(a*1)}px ${k}`,e.fillText(`${i.cleared}`,o,s),e.fillStyle=R,e.font=`700 ${Math.round(Math.min(t.w*.05,20))}px ${k}`,e.fillText(`ミス ${i.missed}`,o,s+a+24);else{const r=Math.min(i.cleared,40),d=Math.min(t.w*.024,12),c=8;for(let m=0;m<r;m++){const v=o+(m%c-(c-1)/2)*d*2.6,b=s-a*.5+Math.floor(m/c)*d*2.7;e.beginPath(),e.arc(v,b,d,0,Math.PI*2),e.fillStyle="#7a4b00",e.fill()}}const h=qt(t.w,t.h);kt(e,h.again,"もういちど","#4bd37b","#188c4a","#ffffff"),kt(e,h.title,"タイトルへ","rgba(255,255,255,0.72)",R,F),Gt(e,Et(t.w,t.h))}function kt(e,t,i,l,n,o){e.textAlign="center",e.textBaseline="middle",y(e,t.x,t.y+6,t.w,t.h,t.h*.36),e.fillStyle=ct,e.fill(),y(e,t.x,t.y,t.w,t.h,t.h*.36),e.fillStyle=l,e.fill(),e.lineWidth=4,e.strokeStyle=n,e.stroke(),e.fillStyle=o,e.font=`800 ${Math.round(t.h*.42)}px ${k}`,e.fillText(i,t.x+t.w/2,t.y+t.h/2)}function Gt(e,t){y(e,t.x,t.y,t.w,t.h,t.h*.32),e.fillStyle="rgba(255,255,255,0.66)",e.fill(),e.lineWidth=2.5,e.strokeStyle="rgba(74,58,36,0.28)",e.stroke();const i=t.w*.26,l=t.x+i,n=t.x+t.w-i,o=[.7,.32,.58];e.lineCap="round",e.lineWidth=Math.max(2,t.w*.07);for(let s=0;s<o.length;s++){const a=t.y+t.h*(.32+s*.18);e.strokeStyle=R,e.beginPath(),e.moveTo(l,a),e.lineTo(n,a),e.stroke();const h=l+(n-l)*o[s];e.fillStyle=F,e.beginPath(),e.arc(h,a,t.w*.075,0,Math.PI*2),e.fill()}e.lineCap="butt"}function wt(e,t,i,l,n){const o=Math.round(l);e.font=`${n} ${o}px ${k}`;const s=e.measureText(t).width;s<=i||(e.font=`${n} ${Math.max(9,Math.floor(o*(i/s)))}px ${k}`)}function Qe(e,t,i){dt(e,t),e.textAlign="center",e.textBaseline="middle",e.fillStyle=F,e.font=`800 ${Math.round(Math.min(t.w*.09,38))}px ${k}`,e.fillText("せってい",t.w/2,t.h*.12);const l=Ut(t.w,t.h,I.map(n=>n.choices.length));for(let n=0;n<I.length;n++){const o=I[n],s=l.rows[n];if(!o||!s)continue;const a=Ve(i,o);e.textAlign="left",e.fillStyle=F,wt(e,o.label,s.label.w,Math.min(s.label.h*.33,21),700),e.fillText(o.label,s.label.x,s.label.y+s.label.h*.38),e.fillStyle=R,wt(e,o.hint,s.label.w,Math.min(s.label.h*.21,13),600),e.fillText(o.hint,s.label.x,s.label.y+s.label.h*.68),e.textAlign="center";for(let h=0;h<s.chips.length;h++){const r=s.chips[h],d=o.choices[h];if(!r||!d)continue;const c=h===a;y(e,r.x,r.y,r.w,r.h,r.h*.4),e.fillStyle=c?F:"rgba(255,255,255,0.72)",e.fill(),e.lineWidth=3,e.strokeStyle=c?F:"rgba(74,58,36,0.22)",e.stroke(),e.fillStyle=c?"#fff6e6":R,wt(e,d.label,r.w*.82,r.h*.42,700),e.fillText(d.label,r.x+r.w/2,r.y+r.h/2)}}kt(e,l.close,"とじる","#4bd37b","#188c4a","#ffffff"),e.fillStyle=R,e.font=`600 ${Math.round(Math.min(l.admin.h*.4,16))}px ${k}`,e.fillText("かんりしゃメニュー",t.w/2,l.admin.y+l.admin.h/2)}let _=null,Ot=!0;function xt(e){Ot=e}let lt=null;function Je(){if(_)return;const e=window.AudioContext??window.webkitAudioContext;if(!e)return;_=new e,_.resume();const t=Math.floor(_.sampleRate*.25);lt=_.createBuffer(1,t,_.sampleRate);const i=lt.getChannelData(0);for(let l=0;l<t;l++)i[l]=Math.random()*2-1}function nt(e,t,i,l,n){if(!_||!Ot)return;const o=_.currentTime,s=_.createOscillator(),a=_.createGain();s.type=i,s.frequency.setValueAtTime(e,o),n&&s.frequency.exponentialRampToValueAtTime(n,o+t),a.gain.setValueAtTime(0,o),a.gain.linearRampToValueAtTime(l,o+.006),a.gain.exponentialRampToValueAtTime(1e-4,o+t),s.connect(a).connect(_.destination),s.start(o),s.stop(o+t+.02)}function Kt(e,t,i){if(!_||!lt||!Ot)return;const l=_.currentTime,n=_.createBufferSource();n.buffer=lt;const o=_.createBiquadFilter();o.type="bandpass",o.frequency.setValueAtTime(i,l),o.Q.value=1.1;const s=_.createGain();s.gain.setValueAtTime(t,l),s.gain.exponentialRampToValueAtTime(1e-4,l+e),n.connect(o).connect(s).connect(_.destination),n.start(l),n.stop(l+e+.02)}function Ze(e){const t=Math.min(e,8),i=523*Math.pow(2,t/12);nt(i,.11,"triangle",.16),nt(i*2,.06,"sine",.05),Kt(.07,.09,1800+t*120)}function ti(){nt(150,.09,"sine",.1,90),Kt(.04,.03,320)}function ei(){nt(330,.1,"sine",.07,250)}const j={mode:"iro",difficulty:"easy",bottomGapBlocks:.45,fallBlocksPerSec:10,blockScale:.22,baseSec:30,missPenaltySec:.5,hitRecoverSec:.3,soundOn:!0,showCount:!0,colorAssist:!1,effectsOn:!0,hideAhead:!1},Pt="mitsukete-pon.tuning.v1";function ii(){try{const e=localStorage.getItem(Pt);return e?{...j,...JSON.parse(e)}:{...j}}catch{return{...j}}}function J(e){try{localStorage.setItem(Pt,JSON.stringify(e))}catch{}}function li(){try{localStorage.removeItem(Pt)}catch{}}const Vt={bottomGapBlocks:"下の隙間",fallBlocksPerSec:"ストンの速さ",blockScale:"ブロック大きさ",missPenaltySec:"ミスで-秒",hitRecoverSec:"正解でもどる秒",effectsOn:"演出",hideAhead:"先を隠す"};function ni(e){const t=[];for(const i of Object.keys(Vt))e[i]!==j[i]&&t.push(`${Vt[i]}: ${String(e[i])}`);return t}const st=document.getElementById("stage"),W=st.getContext("2d"),si=document.getElementById("hud"),u=ii(),S=new Ce;let M="title",g=zt(1,1,3,.22,3,.45),ot=[],at=[],tt=Ft[u.mode],D,C,H;const rt=new xe,N=[0,0,0,0,0];let q=0,U=0,At=!1,It="title";function L(){return we(u.difficulty)}function ut(){return Me(u.difficulty)}function Qt(){return{colorAssist:u.colorAssist}}function Z(){return{baseSec:u.baseSec,missPenaltySec:u.missPenaltySec,hitRecoverSec:u.hitRecoverSec}}function oi(){const e=getComputedStyle(document.documentElement).getPropertyValue("--sab");return Number.parseFloat(e)||0}function B(){const e=window.innerWidth,t=window.innerHeight,i=Math.min(window.devicePixelRatio||1,2);st.width=Math.round(e*i),st.height=Math.round(t*i),W.setTransform(i,0,0,i,0,0),g=zt(e,t,L(),u.blockScale,ut(),u.bottomGapBlocks,oi()),ot=Fe(e,t,Tt.length),at=Te(e,t,Ct.length),C&&(C.blockH=g.blockH,C.lineY=g.restY)}function ai(){return{blockH:g.blockH,fallBlocksPerSec:u.fallBlocksPerSec,spawnPerSec:0,answerCount:L(),maxQueue:ut(),lineY:g.restY,makeFace:(e,t)=>tt.blockFace(e,t,Qt())}}let ft="";function pt(){si.textContent=X?ft:""}function Jt(){M="title",ft="",pt(),S.clear()}function Lt(e){tt=e,u.mode=e.id,J(u),B(),C=ai(),D=be(C,Math.random),H=Ie(Z()),rt.reset(),S.clear(),U=0,q=0,At=!1,ft="",pt(),M="play"}function Zt(e){var o;if(M!=="play"||e>=L())return;N[e]=1;const t=D.queue.length,i=(o=D.queue[0])==null?void 0:o.face,l=D.bottomY-g.blockH/2;if(ye(D,e,C)==="hit"){rt.recordHit(performance.now(),t,u.hideAhead?"blind":"open"),Ye(H,Z()),U++,Ze(U);const s=i&&i.color>=0?K[i.color]:Yt;S.burst(g.colX,l,g.blockW,g.blockH,s.fill,s.edge,Math.random,U);const a=g.buttons[e];a&&S.beam(a.x+a.w/2,a.w*.3,a.y,g.restY,s.fill)}else rt.recordMiss(),ze(H,Z()),U=0,ei()}function ri(){M="result",S.clear(),S.confetti(g.w,g.h,60,Math.random);const e=rt.summary(4,2,350),t=i=>i===null?"—":`${Math.round(i)}ms`;ft=[`${tt.label} / ${ht[u.difficulty].label}(${L()}こ) / ${ut()}段${u.hideAhead?" / 先を隠す":""}`,`消した ${e.hits}  ミス ${e.misses}`,`中央値タップ間隔 ${t(e.openMedian??e.blindMedian)}`].join(`
`),pt()}function hi(e,t){if((M==="title"||M==="result")&&P(Et(g.w,g.h),e,t)){It=M,M="settings";return}if(M==="settings"){const l=Ut(g.w,g.h,I.map(n=>n.choices.length));for(let n=0;n<I.length;n++){const o=I[n],s=l.rows[n];if(!(!o||!s))for(let a=0;a<s.chips.length;a++){const h=s.chips[a],r=o.choices[a];if(!(!h||!r||!P(h,e,t))){Re(u,o.key,r),J(u),xt(u.soundOn),E.controllersRecursive().forEach(d=>d.updateDisplay());return}}}P(l.close,e,t)?M=It:P(l.admin,e,t)&&mt();return}if(M==="title"){for(let l=0;l<at.length;l++){const n=at[l],o=Ct[l];if(n&&o&&P(n,e,t)){u.difficulty=o,J(u),B();return}}for(let l=0;l<ot.length;l++){const n=ot[l],o=Tt[l];n&&o&&P(n,e,t)&&Lt(Ft[o])}return}if(M==="result"){const l=qt(g.w,g.h);P(l.again,e,t)?Lt(tt):P(l.title,e,t)&&Jt();return}const i=Ee(g,e,t);i!==null&&Zt(i)}st.addEventListener("pointerdown",e=>{Je(),e.preventDefault(),hi(e.clientX,e.clientY)},{passive:!1});window.addEventListener("keydown",e=>{e.key==="d"&&mt();const t="12345".indexOf(e.key);t>=0&&M==="play"&&Zt(t)});window.addEventListener("resize",B);const E=new St({title:"かんりしゃ",width:240});E.close();let X=!1;function mt(){X=!X,E.domElement.style.display=X?"":"none",X&&E.open(),pt()}mt();mt();const Y=e=>()=>{J(u),e&&B(),C&&(C.fallBlocksPerSec=u.fallBlocksPerSec,C.answerCount=L(),C.maxQueue=ut())};E.add(u,"bottomGapBlocks",0,1.5,.05).name("下の隙間(段)").onChange(Y(!0));E.add(u,"hideAhead").name("★先を隠す(対照)").onChange(Y(!1));E.add(u,"fallBlocksPerSec",2,30,1).name("ストンの速さ(段/秒)").onChange(Y(!1));E.add(u,"effectsOn").name("演出を出す").onChange(()=>{J(u),S.enabled=u.effectsOn,u.effectsOn||S.clear()});const te=E.addFolder("時間の判定").close();te.add(u,"missPenaltySec",0,3,.1).name("ミスで-秒").onChange(Y(!1));te.add(u,"hitRecoverSec",0,1,.05).name("正解でもどる秒").onChange(Y(!1));E.add(u,"blockScale",.08,.28,.005).name("ブロック大きさ").onChange(Y(!0));E.add({f:()=>{Object.assign(u,j),li(),S.enabled=u.effectsOn,xt(u.soundOn),E.controllersRecursive().forEach(e=>e.updateDisplay()),Jt(),B()}},"f").name("既定に戻す");S.enabled=u.effectsOn;xt(u.soundOn);B();let Bt=performance.now();function ee(){const e=performance.now(),t=Math.min((e-Bt)/1e3,.05);Bt=e;for(let i=0;i<N.length;i++)N[i]=Math.max(0,N[i]-t*7);if(q=Math.max(0,q-t*7),S.update(t),M==="play"){Be(H,t),ve(D,t,C,Math.random);const i=D.bottomY<C.lineY-.5;At&&!i&&(q=1,ti()),At=i,Le(H,Z())&&ri()}M==="title"?Ge(W,g,{modes:Tt.map(i=>Ft[i]),modeRects:ot,difficulties:Ct.map(i=>ht[i]),difficultyRects:at,selected:u.difficulty,notices:ni(u)}):M==="play"?We(W,{layout:g,column:D,mode:tt,session:H,sessionCfg:Z(),faceOpts:Qt(),answerCount:L(),hideAhead:u.hideAhead,showCount:u.showCount,press:N,squash:q,targetPulse:.5+.5*Math.sin(e/1100*Math.PI*2),showPointer:H.cleared===0,effects:S}):M==="result"?Ke(W,g,H,u.showCount,S):Qe(W,g,u),requestAnimationFrame(ee)}requestAnimationFrame(ee);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register(new URL("sw.js",document.baseURI).href)});
