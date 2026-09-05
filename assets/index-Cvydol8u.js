var gt=Object.defineProperty;var bt=(t,e,i)=>e in t?gt(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var P=(t,e,i)=>bt(t,typeof e!="symbol"?e+"":e,i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))n(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(l){if(l.ep)return;l.ep=!0;const s=i(l);fetch(l.href,s)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class D{constructor(e,i,n,l,s="div"){this.parent=e,this.object=i,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(l),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),D.nextNameID=D.nextNameID||0,this.$name.id=`lil-gui-name-${++D.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("lil-disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const i=this.parent.add(this.object,this.property,e);return i.name(this._name),this.destroy(),i}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class yt extends D{constructor(e,i,n){super(e,i,n,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Ee(t){let e,i;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?i=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),i?"#"+i:!1}const vt={isPrimitive:!0,match:t=>typeof t=="string",fromHexString:Ee,toHexString:Ee},te={isPrimitive:!0,match:t=>typeof t=="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},wt={isPrimitive:!1,match:t=>Array.isArray(t)||ArrayBuffer.isView(t),fromHexString(t,e,i=1){const n=te.fromHexString(t);e[0]=(n>>16&255)/255*i,e[1]=(n>>8&255)/255*i,e[2]=(n&255)/255*i},toHexString([t,e,i],n=1){n=255/n;const l=t*n<<16^e*n<<8^i*n<<0;return te.toHexString(l)}},Mt={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,i=1){const n=te.fromHexString(t);e.r=(n>>16&255)/255*i,e.g=(n>>8&255)/255*i,e.b=(n&255)/255*i},toHexString({r:t,g:e,b:i},n=1){n=255/n;const l=t*n<<16^e*n<<8^i*n<<0;return te.toHexString(l)}},_t=[vt,te,wt,Mt];function $t(t){return _t.find(e=>e.match(t))}class kt extends D{constructor(e,i,n,l){super(e,i,n,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=$t(this.initialValue),this._rgbScale=l,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=Ee(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const i=this._format.fromHexString(e);this.setValue(i)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class ke extends D{constructor(e,i,n){super(e,i,n,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",l=>{l.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class St extends D{constructor(e,i,n,l,s,o){super(e,i,n,"lil-number"),this._initInput(),this.min(l),this.max(s);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,i=!0){return this._step=e,this._stepExplicit=i,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let i=(e-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let p=parseFloat(this.$input.value);isNaN(p)||(this._stepExplicit&&(p=this._snap(p)),this.setValue(this._clamp(p)))},n=p=>{const M=parseFloat(this.$input.value);isNaN(M)||(this._snapClampSetValue(M+p),this.$input.value=this.getValue())},l=p=>{p.key==="Enter"&&this.$input.blur(),p.code==="ArrowUp"&&(p.preventDefault(),n(this._step*this._arrowKeyMultiplier(p))),p.code==="ArrowDown"&&(p.preventDefault(),n(this._step*this._arrowKeyMultiplier(p)*-1))},s=p=>{this._inputFocused&&(p.preventDefault(),n(this._step*this._normalizeMouseWheel(p)))};let o=!1,a,h,r,u,d;const m=5,y=p=>{a=p.clientX,h=r=p.clientY,o=!0,u=this.getValue(),d=0,window.addEventListener("mousemove",b),window.addEventListener("mouseup",_)},b=p=>{if(o){const M=p.clientX-a,E=p.clientY-h;Math.abs(E)>m?(p.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(M)>m&&_()}if(!o){const M=p.clientY-r;d-=M*this._step*this._arrowKeyMultiplier(p),u+d>this._max?d=this._max-u:u+d<this._min&&(d=this._min-u),this._snapClampSetValue(u+d)}r=p.clientY},_=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",b),window.removeEventListener("mouseup",_)},T=()=>{this._inputFocused=!0},g=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",l),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",y),this.$input.addEventListener("focus",T),this.$input.addEventListener("blur",g)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const e=(g,p,M,E,G)=>(g-p)/(M-p)*(G-E)+E,i=g=>{const p=this.$slider.getBoundingClientRect();let M=e(g,p.left,p.right,this._min,this._max);this._snapClampSetValue(M)},n=g=>{this._setDraggingStyle(!0),i(g.clientX),window.addEventListener("mousemove",l),window.addEventListener("mouseup",s)},l=g=>{i(g.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",s)};let o=!1,a,h;const r=g=>{g.preventDefault(),this._setDraggingStyle(!0),i(g.touches[0].clientX),o=!1},u=g=>{g.touches.length>1||(this._hasScrollBar?(a=g.touches[0].clientX,h=g.touches[0].clientY,o=!0):r(g),window.addEventListener("touchmove",d,{passive:!1}),window.addEventListener("touchend",m))},d=g=>{if(o){const p=g.touches[0].clientX-a,M=g.touches[0].clientY-h;Math.abs(p)>Math.abs(M)?r(g):(window.removeEventListener("touchmove",d),window.removeEventListener("touchend",m))}else g.preventDefault(),i(g.touches[0].clientX)},m=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",d),window.removeEventListener("touchend",m)},y=this._callOnFinishChange.bind(this),b=400;let _;const T=g=>{if(Math.abs(g.deltaX)<Math.abs(g.deltaY)&&this._hasScrollBar)return;g.preventDefault();const M=this._normalizeMouseWheel(g)*this._step;this._snapClampSetValue(this.getValue()+M),this.$input.value=this.getValue(),clearTimeout(_),_=setTimeout(y,b)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",T,{passive:!1})}_setDraggingStyle(e,i="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",e),document.body.classList.toggle("lil-dragging",e),document.body.classList.toggle(`lil-${i}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:i,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(i=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),i+-n}_arrowKeyMultiplier(e){let i=this._stepExplicit?1:10;return e.shiftKey?i*=10:e.altKey&&(i/=10),i}_snap(e){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),e-=i,e=Math.round(e/this._step)*this._step,e+=i,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class At extends D{constructor(e,i,n,l){super(e,i,n,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(l)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(i=>{const n=document.createElement("option");n.textContent=i,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),i=this._values.indexOf(e);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?e:this._names[i],this}}class Et extends D{constructor(e,i,n){super(e,i,n,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",l=>{l.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Ct=`.lil-gui {
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
}`;function Ft(t){const e=document.createElement("style");e.innerHTML=t;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(e,i):document.head.appendChild(e)}let qe=!1;class Re{constructor({parent:e,autoPlace:i=e===void 0,container:n,width:l,title:s="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:h=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),h&&this.domElement.classList.add("lil-allow-touch-styles"),!qe&&a&&(Ft(Ct),qe=!0),n?n.appendChild(this.domElement):i&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),l&&this.domElement.style.setProperty("--width",l+"px"),this._closeFolders=o}add(e,i,n,l,s){if(Object(n)===n)return new At(this,e,i,n);const o=e[i];switch(typeof o){case"number":return new St(this,e,i,n,l,s);case"boolean":return new yt(this,e,i);case"string":return new Et(this,e,i);case"function":return new ke(this,e,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,e,`
	value:`,o)}addColor(e,i,n=1){return new kt(this,e,i,n)}addFolder(e){const i=new Re({parent:this,title:e});return this.root._closeFolders&&i.close(),i}load(e,i=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof ke||n._name in e.controllers&&n.load(e.controllers[n._name])}),i&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof ke)){if(n._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);i.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);i.folders[n._title]=n.save()}),i}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("lil-transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const l=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!e),requestAnimationFrame(()=>{this.$children.style.height=l+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(i=>{e=e.concat(i.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(i=>{e=e.concat(i.foldersRecursive())}),e}}function Tt(t,e,i){var a,h;const n=i.length,l=(a=i[n-1])==null?void 0:a.answer,s=n>=2&&l!==void 0&&l===((h=i[n-2])==null?void 0:h.answer)?l:-1;if(s<0||t<=1)return Math.min(t-1,Math.floor(e()*t));const o=Math.min(t-2,Math.floor(e()*(t-1)));return o>=s?o+1:o}function Ce(t,e,i){const n=Tt(e.answerCount,i,t.queue);t.queue.push({answer:n,face:e.makeFace(n,i)})}function Ot(t,e){const i={queue:[],bottomY:t.lineY,spawnAcc:0},n=t.maxQueue>0?t.maxQueue:4;for(let l=0;l<n;l++)Ce(i,t,e);return i}function xt(t,e,i,n){if(t.bottomY=Math.min(i.lineY,t.bottomY+i.fallBlocksPerSec*i.blockH*e),i.maxQueue>0){for(;t.queue.length<i.maxQueue;)Ce(t,i,n);return}for(t.spawnAcc+=i.spawnPerSec*e;t.spawnAcc>=1;)t.spawnAcc-=1,Ce(t,i,n)}function Pt(t,e,i){const n=t.queue[0];return n?n.answer!==e?"miss":(t.queue.shift(),t.bottomY-=i.blockH,"hit"):"empty"}const ie={easy:{id:"easy",label:"かんたん",answerCount:3,visibleCount:3},normal:{id:"normal",label:"ふつう",answerCount:4,visibleCount:4},hard:{id:"hard",label:"むずかしい",answerCount:5,visibleCount:5}},q=["easy","normal","hard"];function Ht(t){return ie[t].answerCount}function Rt(t){return ie[t].visibleCount}const ne=[{fill:"#ff5a5f",edge:"#c02128",gloss:"#ff9296",glyph:"#ffffff",shape:"circle",label:"あか"},{fill:"#3fa9ff",edge:"#1259a8",gloss:"#8bccff",glyph:"#ffffff",shape:"square",label:"あお"},{fill:"#ffc93c",edge:"#c07f00",gloss:"#ffe293",glyph:"#7a4b00",shape:"triangle",label:"きいろ"},{fill:"#4bd37b",edge:"#188c4a",gloss:"#9aeab7",glyph:"#ffffff",shape:"diamond",label:"みどり"},{fill:"#b072ff",edge:"#6a2cbd",gloss:"#d6b1ff",glyph:"#ffffff",shape:"star",label:"むらさき"}],Ze={fill:"#efe0c6",edge:"#b09166",gloss:"#fff4de",glyph:"#6b5330"},Dt="#dcefff",Fe="#fff4e2",S="#4a3a24",R="rgba(74,58,36,0.55)",A="ui-rounded, 'Hiragino Maru Gothic ProN', 'Hiragino Sans', -apple-system, BlinkMacSystemFont, 'Noto Sans JP', sans-serif";function Vt(t,e,i,n,l){switch(t.beginPath(),e){case"circle":t.arc(i,n,l,0,Math.PI*2);break;case"square":t.rect(i-l*.85,n-l*.85,l*1.7,l*1.7);break;case"triangle":Ue(t,i,n+l*.12,l*1.12,3,-Math.PI/2);break;case"diamond":Ue(t,i,n,l*1.14,4,-Math.PI/2);break;case"star":It(t,i,n,l*1.16,l*.5,5);break}t.closePath()}function Ue(t,e,i,n,l,s){for(let o=0;o<l;o++){const a=s+o*Math.PI*2/l,h=e+Math.cos(a)*n,r=i+Math.sin(a)*n;o===0?t.moveTo(h,r):t.lineTo(h,r)}}function It(t,e,i,n,l,s){for(let o=0;o<s*2;o++){const a=o%2===0?n:l,h=-Math.PI/2+o*Math.PI/s,r=e+Math.cos(h)*a,u=i+Math.sin(h)*a;o===0?t.moveTo(r,u):t.lineTo(r,u)}}function w(t,e,i,n,l,s){const o=Math.max(0,Math.min(s,n/2,l/2));t.beginPath(),t.moveTo(e+o,i),t.arcTo(e+n,i,e+n,i+l,o),t.arcTo(e+n,i+l,e,i+l,o),t.arcTo(e,i+l,e,i,o),t.arcTo(e,i,e+n,i,o),t.closePath()}const Yt=3200;class Bt{constructor(){P(this,"enabled",!0);P(this,"shards",[]);P(this,"beams",[])}clear(){this.shards.length=0,this.beams.length=0}get shardCount(){return this.shards.length}burst(e,i,n,l,s,o,a,h=0){if(!this.enabled)return;const r=Math.min(h,10)/10,u=7+Math.round(r*4);for(let d=0;d<u;d++){const m=d/u*Math.PI*2+a()*.6,y=90+a()*220;this.shards.push({x:e+(a()-.5)*n*.6,y:i+a()*l*.25,vx:Math.cos(m)*y,vy:Math.sin(m)*y*.55-100,rot:a()*Math.PI,vrot:(a()-.5)*14,size:Math.min(n,l)*(.14+a()*.12)*(1+r*.4),life:.42+a()*.12,maxLife:.54,fill:s,edge:o})}}beam(e,i,n,l,s){this.enabled&&this.beams.push({x:e,w:i,yFrom:n,yTo:l,life:.09,maxLife:.09,fill:s})}confetti(e,i,n,l){if(this.enabled)for(let s=0;s<n;s++){const o=ne[Math.floor(l()*ne.length)];this.shards.push({x:l()*e,y:-20-l()*i*.4,vx:(l()-.5)*120,vy:60+l()*160,rot:l()*Math.PI,vrot:(l()-.5)*10,size:6+l()*8,life:1.4+l()*.8,maxLife:2.2,fill:o.fill,edge:o.edge})}}update(e){for(let i=this.shards.length-1;i>=0;i--){const n=this.shards[i];if(n.life-=e,n.life<=0){this.shards.splice(i,1);continue}n.vy+=Yt*e,n.x+=n.vx*e,n.y+=n.vy*e,n.rot+=n.vrot*e}for(let i=this.beams.length-1;i>=0;i--){const n=this.beams[i];n.life-=e,n.life<=0&&this.beams.splice(i,1)}}draw(e){for(const i of this.beams){const n=1-i.life/i.maxLife,l=i.yFrom+(i.yTo-i.yFrom)*n,s=Math.abs(i.yFrom-i.yTo)*.42;e.globalAlpha=.55*(1-n),e.fillStyle=i.fill,w(e,i.x-i.w/2,l-s,i.w,s,i.w/2),e.fill()}e.globalAlpha=1;for(const i of this.shards){const n=Math.min(1,i.life/(i.maxLife*.4));e.globalAlpha=n,e.save(),e.translate(i.x,i.y),e.rotate(i.rot),w(e,-i.size/2,-i.size/2,i.size,i.size,i.size*.28),e.fillStyle=i.fill,e.fill(),e.lineWidth=Math.max(1.5,i.size*.14),e.strokeStyle=i.edge,e.stroke(),e.restore()}e.globalAlpha=1}}const z=44,Lt=.62;function zt(t,e){const i=Math.min(t,e*Lt);return{x:(t-i)/2,y:0,w:i,h:e}}function Wt(t,e){return t>e}function et(t,e,i,n,l,s,o=0,a={x:0,y:0,w:t,h:e}){const h=Math.min(t,e),r=Math.min(e*.11,84),u=o+Math.max(6,e*.012),d=Math.min(e*.19,130),m=e-d-u,y=(m-r)/(l+s),b=Math.max(24,Math.min(h*n,y)),_=Math.min(t*.46,b*1.3),T=m-b*s,g=Math.max(4,t*.012),p=(t-g*(i+1))/i,M=[];for(let E=0;E<i;E++)M.push({x:g+E*(p+g),y:m+g,w:p,h:d-g*2});return{w:t,h:e,frameW:a.w+a.x*2,frameH:a.h+a.y*2,offsetX:a.x,offsetY:a.y,headerH:r,blockH:b,blockW:_,colX:t/2,lineY:m,restY:T,buttons:M}}function Nt(t,e,i){for(let n=0;n<t.buttons.length;n++){const l=t.buttons[n];if(e>=l.x-2&&e<=l.x+l.w+2&&i>=t.lineY)return n}return null}function Xt(t,e,i){const n=tt(e)+it(e)+Math.max(14,e*.02),l=e*.88-n,s=.28,o=Math.min(e*.13,96,l/(i*(1+s)-s)),a=o*s,h=Math.min(t*.72,340),r=i*o+(i-1)*a,u=n+(l-r)/2,d=[];for(let m=0;m<i;m++)d.push({x:(t-h)/2,y:u+m*(o+a),w:h,h:o});return d}function qt(t,e,i){const n=Math.max(6,t*.022),l=Math.min((t*.86-n*(i-1))/i,120),s=it(e),o=i*l+(i-1)*n,a=(t-o)/2,h=tt(e),r=[];for(let u=0;u<i;u++)r.push({x:a+u*(l+n),y:h,w:l,h:s});return r}const tt=t=>t*.29,it=t=>Math.min(t*.065,50);function H(t,e,i){return e>=t.x&&e<=t.x+t.w&&i>=t.y&&i<=t.y+t.h}function De(t,e){const i=Math.max(z,Math.min(t*.12,52));return{x:t-i-Math.max(10,t*.035),y:Math.max(10,e*.018),w:i,h:i}}function Ut(t,e){return{cx:t/2,cy:e*.4,r:Math.min(t*.26,e*.14)}}function nt(t,e,i=3){const n=Math.min(t*.6,280),l=Math.max(z,Math.min(e*.09,68)),s=Math.min(t*.44,200),o=Math.max(z,Math.min(e*.07,54)),a=Math.max(6,t*.022),h=Math.min((t*.86-a*(i-1))/i,120),r=Math.max(z*.8,Math.min(e*.055,44)),u=i*h+(i-1)*a,d=(t-u)/2,m=e*.63,y=[];for(let _=0;_<i;_++)y.push({x:d+_*(h+a),y:m,w:h,h:r});const b=m+r+Math.max(14,e*.026);return{difficulty:y,again:{x:(t-n)/2,y:b,w:n,h:l},title:{x:(t-s)/2,y:b+l+Math.max(10,e*.018),w:s,h:o}}}function lt(t,e,i){const n=Math.max(16,t*.055),l=Math.min(e*.105,84),s=l*.22,o=e*.19,a=t-n,h=Math.max(5,t*.016),r=[];for(let p=0;p<i.length;p++){const M=o+p*(l+s),E=i[p],G=E<=2?Math.min(t*.21,86):Math.min(t*.125,52),We=l*.6,mt=E*G+(E-1)*h,Ne=a-mt,Xe=[];for(let $e=0;$e<E;$e++)Xe.push({x:Ne+$e*(G+h),y:M+(l-We)/2,w:G,h:We});r.push({label:{x:n,y:M,w:Math.max(40,Ne-n-10),h:l},chips:Xe})}const u=Math.min(t*.5,230),d=Math.max(z,Math.min(e*.085,64)),m=Math.min(t*.62,260),y=Math.max(z,Math.min(e*.055,48)),b=Math.min(t*.5,210),_=Math.max(z,Math.min(e*.055,48)),T=e*.7,g=T+d+Math.max(10,e*.018);return{rows:r,close:{x:(t-u)/2,y:T,w:u,h:d},reset:{x:(t-m)/2,y:g,w:m,h:y},admin:{x:(t-b)/2,y:g+y+Math.max(8,e*.012),w:b,h:_}}}const jt=3e3;class Gt{constructor(){P(this,"samples",[]);P(this,"lastHitAt",null);P(this,"hits",0);P(this,"misses",0)}reset(){this.samples=[],this.lastHitAt=null,this.hits=0,this.misses=0}recordMiss(){this.misses++}recordHit(e,i,n){this.hits++;const l=this.lastHitAt;if(this.lastHitAt=e,l===null)return;const s=e-l;s>jt||this.samples.push({mode:n,depth:i,interval:s})}summary(e,i,n){const l=this.samples.filter(d=>d.mode==="open"),s=this.samples.filter(d=>d.mode==="blind"),o=oe(l.map(d=>d.interval)),a=oe(s.map(d=>d.interval)),h=l.filter(d=>d.depth>=e),r=l.filter(d=>d.depth<=i),u=l.filter(d=>d.interval<n).length;return{hits:this.hits,misses:this.misses,openMedian:o,blindMedian:a,lookaheadGain:o!==null&&a!==null&&o>0?a/o:null,deepMedian:oe(h.map(d=>d.interval)),shallowMedian:oe(r.map(d=>d.interval)),preemptRate:l.length>0?u/l.length:null}}count(e){return this.samples.filter(i=>i.mode===e).length}}function oe(t){if(t.length===0)return null;const e=[...t].sort((n,l)=>n-l),i=e.length>>1;return e.length%2===1?e[i]:(e[i-1]+e[i])/2}const Kt={color:-1,shape:null,dots:0,layout:0,numeral:0,frame:0,text:""};function V(t){return{...Kt,...t}}const Te=["circle","square","triangle","diamond","star"],st={1:[[[1,1]],[[0,0]],[[2,2]]],2:[[[0,0],[2,2]],[[2,0],[0,2]],[[0,1],[2,1]]],3:[[[0,0],[1,1],[2,2]],[[2,0],[1,1],[0,2]],[[1,0],[0,2],[2,2]]],4:[[[0,0],[2,0],[0,2],[2,2]],[[1,0],[0,1],[2,1],[1,2]],[[0,0],[2,0],[1,1],[1,2]]],5:[[[0,0],[2,0],[1,1],[0,2],[2,2]],[[1,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[2,0],[0,1],[0,2],[2,2]]]};function Qt(t,e){const i=st[t];return!i||i.length===0?[]:i[e%i.length]}function Jt(t,e){var n;const i=((n=st[t])==null?void 0:n.length)??1;return Math.min(i-1,Math.floor(e()*i))}function je(t,e){return V({color:t,shape:e.colorAssist?Te[t]??"circle":null})}const Ve={iro:{id:"iro",label:"いろ",note:"同一マッチ。色だけ。2〜3歳",maxAnswers:5,buttonFace:(t,e)=>je(t,e),blockFace:(t,e,i)=>je(t,i)},katachi:{id:"katachi",label:"かたち",note:"同一マッチ。色の手がかりを消してある。3歳",maxAnswers:5,buttonFace:t=>V({shape:Te[t]??"circle"}),blockFace:t=>V({shape:Te[t]??"circle"})},ikutsu:{id:"ikutsu",label:"いくつ",note:"変換マッチ。サイコロの目を見て数字を押す。4〜5歳",maxAnswers:5,buttonFace:t=>V({numeral:t+1}),blockFace:(t,e)=>V({dots:t+1,layout:Jt(t+1,e)})},hosuu:{id:"hosuu",label:"10のほすう",note:"変換マッチ。あと何個で10か。さくらんぼ算の土台。小1",maxAnswers:5,buttonFace:t=>V({numeral:t+1}),blockFace:t=>V({frame:9-t})},tashizan:{id:"tashizan",label:"たしざん",note:"変換マッチ。式を見て答えを押す。答えは2〜6。小1",maxAnswers:5,buttonFace:t=>V({numeral:t+2}),blockFace:(t,e)=>{const i=t+2,n=1+Math.min(i-2,Math.floor(e()*(i-1)));return V({text:`${n}+${i-n}`})}}},Ie=["iro","katachi","ikutsu","hosuu","tashizan"],K=5,Se=2,B=[{key:"soundOn",label:"おと",hint:"こうかおん",choices:[{label:"あり",value:!0},{label:"なし",value:!1}]},{key:"baseSec",label:"じかん",hint:"1かいの ながさ（びょう）",choices:[{label:"20",value:20},{label:"30",value:30},{label:"45",value:45},{label:"60",value:60}]},{key:"showCount",label:"すうじ",hint:"のこりと けしたかず",choices:[{label:"だす",value:!0},{label:"ださない",value:!1}]},{key:"colorAssist",label:"いろのサポート",hint:"かたちを かさねる",choices:[{label:"なし",value:!1},{label:"あり",value:!0}]}];function Ye(t,e,i){switch(e){case"soundOn":t.soundOn=i.value;break;case"showCount":t.showCount=i.value;break;case"colorAssist":t.colorAssist=i.value;break;case"baseSec":t.baseSec=i.value;break}}function ot(t,e){return e.choices.findIndex(i=>i.value===t[e.key])}function Zt(t,e){for(const i of B)if(ot(t,i)<0){const n=i.choices.find(l=>l.value===e[i.key]);n&&Ye(t,i.key,n)}}function ei(t,e){for(const i of B){const n=i.choices.find(l=>l.value===e[i.key]);n&&Ye(t,i.key,n)}}function ti(t){return{elapsed:0,penalty:0,cleared:0,missed:0}}function at(t,e){return Math.max(0,e.baseSec-t.elapsed-t.penalty)}function ii(t,e){return at(t,e)<=0}function ni(t,e){t.elapsed+=e}function li(t,e){t.cleared++,t.penalty=Math.max(0,t.penalty-e.hitRecoverSec)}function si(t,e){t.missed++,t.penalty+=e.missPenaltySec}const be="rgba(74,58,36,0.20)";function oi(t,e){const{layout:i,column:n,mode:l}=e;ye(t,i),hi(t,i,e);const s=i.blockW*1.34;w(t,i.colX-s/2,i.restY-4,s,14,7),t.fillStyle="rgba(74,58,36,0.16)",t.fill();const o=i.colX-i.blockW/2;for(let a=0;a<n.queue.length;a++){const h=n.queue[a];if(!h)continue;const r=n.bottomY-(a+1)*i.blockH;if(r>i.restY||r+i.blockH<i.headerH-i.blockH)break;let u=r,d=i.blockH;const m=a===0;if(m&&e.squash>0&&(d=i.blockH*(1-.2*e.squash),u=r+(i.blockH-d)),m){const y=i.blockW*1.09,b=i.colX-y/2;ai(t,b,u,y,d,e.targetPulse),Ae(t,b,u,y,d,h.face,!1,10),e.showPointer&&ri(t,b,u,y,d,e.targetPulse)}else Ae(t,o,u,i.blockW,d,h.face,e.hideAhead)}e.effects.draw(t);for(let a=0;a<e.answerCount;a++){const h=i.buttons[a];if(!h)continue;const r=(e.press[a]??0)*5;Ae(t,h.x,h.y+r,h.w,h.h,l.buttonFace(a,e.faceOpts),!1,6-r)}}function ai(t,e,i,n,l,s){const o=5+s*4;w(t,e-o,i-o,n+o*2,l+o*2,(l+o*2)*.3),t.lineWidth=4,t.strokeStyle=`rgba(74,58,36,${.14+s*.24})`,t.stroke()}function ri(t,e,i,n,l,s){const o=i+l/2,a=Math.min(l*.3,22),h=s*a*.45;t.fillStyle="#c07000";for(const r of[-1,1]){const u=r<0?e-16-h:e+n+16+h;t.beginPath(),t.moveTo(u,o),t.lineTo(u-r*a,o-a*.6),t.lineTo(u-r*a,o+a*.6),t.closePath(),t.fill()}}function ye(t,e){(e.offsetX>0||e.offsetY>0)&&(t.fillStyle=Fe,t.fillRect(-e.offsetX,-e.offsetY,e.frameW,e.frameH));const i=t.createLinearGradient(0,0,0,e.h);i.addColorStop(0,Dt),i.addColorStop(1,Fe),t.fillStyle=i,t.fillRect(0,0,e.w,e.h)}function hi(t,e,i){const n=i.session,l=at(n,i.sessionCfg),s=Math.max(12,e.w*.045),o=Math.max(16,e.headerH*.32),a=e.headerH*.3,h=e.w-s*2;w(t,s,a,h,o,o/2),t.fillStyle="rgba(74,58,36,0.12)",t.fill();const r=Math.max(0,Math.min(1,l/i.sessionCfg.baseSec));if(r>0){const u=Math.max(o,h*r),d=l<=5?"#ff5a5f":l<=12?"#ffab2e":"#4bd37b",m=l<=5?"#c02128":l<=12?"#c07000":"#188c4a";w(t,s,a,u,o,o/2),t.fillStyle=d,t.fill(),t.lineWidth=3,t.strokeStyle=m,t.stroke(),w(t,s+o*.25,a+o*.18,u-o*.5,o*.26,o*.13),t.fillStyle="rgba(255,255,255,0.42)",t.fill()}i.showCount&&(t.textBaseline="top",t.font=`700 ${Math.round(e.headerH*.3)}px ${A}`,t.fillStyle=R,t.textAlign="left",t.fillText(`${Math.ceil(l)}`,s+2,a+o+5),t.fillStyle=S,t.textAlign="right",t.fillText(`${n.cleared}こ`,e.w-s-2,a+o+5))}function Ae(t,e,i,n,l,s,o,a=6){const h=Math.min(n,l)*.26,r=2;a>0&&(w(t,e+r,i+r+a,n-r*2,l-r*2,h),t.fillStyle=be,t.fill());const u=o?{fill:"#d9cdb8",edge:"#a8977c",gloss:"#efe6d5",glyph:"#a8977c"}:s.color>=0?ne[s.color]:Ze;w(t,e+r,i+r,n-r*2,l-r*2,h),t.fillStyle=u.fill,t.fill(),t.save(),t.clip(),w(t,e+r,i+r,n-r*2,(l-r*2)*.44,h),t.fillStyle=u.gloss,t.globalAlpha=.42,t.fill(),t.restore(),t.globalAlpha=1,w(t,e+r,i+r,n-r*2,l-r*2,h),t.lineWidth=Math.max(3,Math.min(n,l)*.075),t.strokeStyle=u.edge,t.stroke(),o||ci(t,s,e+n/2,i+l/2,n-r*2,l-r*2,u.glyph)}function ci(t,e,i,n,l,s,o){const a=Math.min(l,s);if(t.fillStyle=o,e.frame>0){di(t,e.frame,i,n,l,s,o);return}if(e.text){t.textAlign="center",t.textBaseline="middle",t.font=`800 ${Math.round(Math.min(s*.46,l*.86/e.text.length))}px ${A}`,t.fillText(e.text,i,n+a*.03);return}if(e.numeral>0){t.textAlign="center",t.textBaseline="middle",t.font=`800 ${Math.round(a*.6)}px ${A}`,t.fillText(String(e.numeral),i,n+a*.04);return}if(e.shape){Vt(t,e.shape,i,n,a*.25),t.fill();return}if(e.dots>0){const h=a*.26,r=a*.098;for(const[u,d]of Qt(e.dots,e.layout))t.beginPath(),t.arc(i+(u-1)*h,n+(d-1)*h,r,0,Math.PI*2),t.fill()}}function di(t,e,i,n,l,s,o){const a=l*.84,h=Math.min(s*.68,a/K*Se*1.2),r=i-a/2,u=n-h/2,d=a/K,m=h/Se,y=Math.min(d,m)*.3;w(t,r,u,a,h,Math.min(d,m)*.28),t.lineWidth=Math.max(2,Math.min(l,s)*.026),t.strokeStyle=o,t.globalAlpha=.5,t.stroke(),t.globalAlpha=1;for(let b=0;b<K*Se;b++){const _=r+b%K*d+d/2,T=u+Math.floor(b/K)*m+m/2;t.beginPath(),t.arc(_,T,y,0,Math.PI*2),b<e?(t.fillStyle=o,t.fill()):(t.lineWidth=Math.max(1.5,y*.32),t.strokeStyle=o,t.globalAlpha=.34,t.stroke(),t.globalAlpha=1)}}function ui(t,e,i,n){t.textAlign="center",t.textBaseline="middle";for(let l=0;l<e.length;l++){const s=i[l],o=e[l];if(!s||!o)continue;const a=o.id===n;w(t,s.x,s.y,s.w,s.h,s.h*.42),t.fillStyle=a?S:"rgba(255,255,255,0.66)",t.fill(),t.lineWidth=3,t.strokeStyle=a?S:"rgba(74,58,36,0.24)",t.stroke(),t.fillStyle=a?"#fff6e6":R,Q(t,o.label,s.w*.86,Math.min(s.h*.38,18),700),t.fillText(o.label,s.x+s.w/2,s.y+s.h/2)}}function fi(t,e){t.fillStyle=Fe,t.fillRect(-e.offsetX,-e.offsetY,e.frameW,e.frameH);const i=e.frameW/2-e.offsetX,n=e.frameH/2-e.offsetY,l=Math.min(e.frameH*.2,90),s=l*1.5;w(t,i-l/2,n-s/2-e.frameH*.06,l,s,l*.16),t.fillStyle="rgba(255,255,255,0.8)",t.fill(),t.lineWidth=5,t.strokeStyle=S,t.stroke(),t.textAlign="center",t.textBaseline="middle",t.fillStyle=S,t.font=`800 ${Math.round(Math.min(e.frameW*.05,30))}px ${A}`,t.fillText("たてに してね",i,n+e.frameH*.28)}function pi(t,e,i){ye(t,e),t.textAlign="center",t.textBaseline="middle",t.fillStyle=S,t.font=`800 ${Math.round(Math.min(e.w*.115,50))}px ${A}`,t.fillText("みつけてポン",e.w/2,e.h*.16);for(let n=0;n<i.difficulties.length;n++){const l=i.difficultyRects[n],s=i.difficulties[n];if(!l||!s)continue;const o=s.id===i.selected;w(t,l.x,l.y,l.w,l.h,l.h*.42),t.fillStyle=o?S:"rgba(255,255,255,0.66)",t.fill(),t.lineWidth=3,t.strokeStyle=o?S:"rgba(74,58,36,0.22)",t.stroke(),t.fillStyle=o?"#fff6e6":R,t.font=`700 ${Math.round(Math.min(l.h*.38,l.w*.21))}px ${A}`,t.fillText(s.label,l.x+l.w/2,l.y+l.h/2)}for(let n=0;n<i.modes.length;n++){const l=i.modeRects[n],s=i.modes[n];if(!l||!s)continue;const o=ne[n];w(t,l.x,l.y+7,l.w,l.h,l.h*.32),t.fillStyle=be,t.fill(),w(t,l.x,l.y,l.w,l.h,l.h*.32),t.fillStyle=o.fill,t.fill(),t.save(),t.clip(),w(t,l.x,l.y,l.w,l.h*.44,l.h*.32),t.globalAlpha=.4,t.fillStyle=o.gloss,t.fill(),t.restore(),t.globalAlpha=1,w(t,l.x,l.y,l.w,l.h,l.h*.32),t.lineWidth=4,t.strokeStyle=o.edge,t.stroke(),t.fillStyle="#ffffff",t.font=`800 ${Math.round(l.h*.44)}px ${A}`,t.fillText(s.label,l.x+l.w/2,l.y+l.h/2)}if(rt(t,De(e.w,e.h)),i.notices.length>0){const n=Math.round(Math.min(e.w*.038,15));t.font=`700 ${n}px ${A}`;const l=e.h-Math.max(14,e.h*.03);t.fillStyle="#c07000",t.fillText("⚙ きてい以外の設定",e.w/2,l-n*1.5*i.notices.length),t.fillStyle="rgba(192,112,0,0.75)",i.notices.forEach((s,o)=>{t.fillText(s,e.w/2,l-n*1.5*(i.notices.length-1-o))})}}function mi(t,e,i,n,l,s,o){ye(t,e),t.textAlign="center",t.textBaseline="middle",l.draw(t),t.fillStyle=S,t.font=`800 ${Math.round(Math.min(e.w*.1,42))}px ${A}`,t.fillText("よくできました",e.w/2,e.h*.24);const{cx:a,cy:h,r}=Ut(e.w,e.h);if(t.beginPath(),t.arc(a,h+7,r,0,Math.PI*2),t.fillStyle=be,t.fill(),t.beginPath(),t.arc(a,h,r,0,Math.PI*2),t.fillStyle="#ffc93c",t.fill(),t.lineWidth=6,t.strokeStyle="#c07f00",t.stroke(),n)t.fillStyle="#7a4b00",t.font=`800 ${Math.round(r*1)}px ${A}`,t.fillText(`${i.cleared}`,a,h),t.fillStyle=R,t.font=`700 ${Math.round(Math.min(e.w*.05,20))}px ${A}`,t.fillText(`ミス ${i.missed}`,a,h+r+24);else{const d=Math.min(i.cleared,40),m=Math.min(e.w*.024,12),y=8;for(let b=0;b<d;b++){const _=a+(b%y-(y-1)/2)*m*2.6,T=h-r*.5+Math.floor(b/y)*m*2.7;t.beginPath(),t.arc(_,T,m,0,Math.PI*2),t.fillStyle="#7a4b00",t.fill()}}const u=nt(e.w,e.h,s.length);ui(t,s,u.difficulty,o),he(t,u.again,"もういちど","#4bd37b","#188c4a","#ffffff"),he(t,u.title,"タイトルへ","rgba(255,255,255,0.72)",R,S),rt(t,De(e.w,e.h))}function he(t,e,i,n,l,s){t.textAlign="center",t.textBaseline="middle",w(t,e.x,e.y+6,e.w,e.h,e.h*.36),t.fillStyle=be,t.fill(),w(t,e.x,e.y,e.w,e.h,e.h*.36),t.fillStyle=n,t.fill(),t.lineWidth=4,t.strokeStyle=l,t.stroke(),t.fillStyle=s,t.font=`800 ${Math.round(e.h*.42)}px ${A}`,t.fillText(i,e.x+e.w/2,e.y+e.h/2)}function rt(t,e){w(t,e.x,e.y,e.w,e.h,e.h*.32),t.fillStyle="rgba(255,255,255,0.66)",t.fill(),t.lineWidth=2.5,t.strokeStyle="rgba(74,58,36,0.28)",t.stroke();const i=e.w*.26,n=e.x+i,l=e.x+e.w-i,s=[.7,.32,.58];t.lineCap="round",t.lineWidth=Math.max(2,e.w*.07);for(let o=0;o<s.length;o++){const a=e.y+e.h*(.32+o*.18);t.strokeStyle=R,t.beginPath(),t.moveTo(n,a),t.lineTo(l,a),t.stroke();const h=n+(l-n)*s[o];t.fillStyle=S,t.beginPath(),t.arc(h,a,e.w*.075,0,Math.PI*2),t.fill()}t.lineCap="butt"}function Q(t,e,i,n,l){const s=Math.round(n);t.font=`${l} ${s}px ${A}`;const o=t.measureText(e).width;o<=i||(t.font=`${l} ${Math.max(9,Math.floor(s*(i/o)))}px ${A}`)}function gi(t,e,i){ye(t,e),t.textAlign="center",t.textBaseline="middle",t.fillStyle=S,t.font=`800 ${Math.round(Math.min(e.w*.09,38))}px ${A}`,t.fillText("せってい",e.w/2,e.h*.12);const n=lt(e.w,e.h,B.map(l=>l.choices.length));for(let l=0;l<B.length;l++){const s=B[l],o=n.rows[l];if(!s||!o)continue;const a=ot(i,s);t.textAlign="left",t.fillStyle=S,Q(t,s.label,o.label.w,Math.min(o.label.h*.33,21),700),t.fillText(s.label,o.label.x,o.label.y+o.label.h*.38),t.fillStyle=R,Q(t,s.hint,o.label.w,Math.min(o.label.h*.21,13),600),t.fillText(s.hint,o.label.x,o.label.y+o.label.h*.68),t.textAlign="center";for(let h=0;h<o.chips.length;h++){const r=o.chips[h],u=s.choices[h];if(!r||!u)continue;const d=h===a;w(t,r.x,r.y,r.w,r.h,r.h*.4),t.fillStyle=d?S:"rgba(255,255,255,0.72)",t.fill(),t.lineWidth=3,t.strokeStyle=d?S:"rgba(74,58,36,0.22)",t.stroke(),t.fillStyle=d?"#fff6e6":R,Q(t,u.label,r.w*.82,r.h*.42,700),t.fillText(u.label,r.x+r.w/2,r.y+r.h/2)}}he(t,n.close,"とじる","#4bd37b","#188c4a","#ffffff"),he(t,n.reset,"さいしょに もどす","rgba(255,255,255,0.72)",R,S),t.fillStyle=R,Q(t,"かんりしゃメニュー",n.admin.w*.9,Math.min(n.admin.h*.36,15),600),t.fillText("かんりしゃメニュー",e.w/2,n.admin.y+n.admin.h/2)}const c=(t,e=1)=>({midi:t,len:e}),ae=[{id:"twinkle",label:"きらきらぼし",source:"フランス民謡 “Ah! vous dirai-je, maman”（1761）",notes:[c(72),c(72),c(79),c(79),c(81),c(81),c(79,2),c(77),c(77),c(76),c(76),c(74),c(74),c(72,2)]},{id:"mary",label:"メリーさんのひつじ",source:"アメリカ伝承（1830）",notes:[c(76),c(74),c(72),c(74),c(76),c(76),c(76,2),c(74),c(74),c(74,2),c(76),c(79),c(79,2)]},{id:"london",label:"ロンドンばし",source:"イングランド伝承",notes:[c(79),c(81),c(79),c(77),c(76),c(77),c(79,2),c(74),c(76),c(77,2),c(76),c(77),c(79,2)]},{id:"frog",label:"かえるのうた",source:"ドイツ民謡 “Froschgesang”",notes:[c(72),c(74),c(76),c(77),c(76),c(74),c(72,2),c(76),c(77),c(79),c(81),c(79),c(77),c(76,2)]},{id:"joy",label:"よろこびのうた",source:"ベートーヴェン 交響曲第9番（1824）",notes:[c(76),c(76),c(77),c(79),c(79),c(77),c(76),c(74),c(72),c(72),c(74),c(76),c(76,1.5),c(74,.5),c(74,2)]}];function bi(t){return 440*Math.pow(2,(t-69)/12)}function yi(t){const e=Math.min(ae.length-1,Math.floor(t()*ae.length));return ae[e]}class vi{constructor(){P(this,"song",ae[0]);P(this,"index",0)}setSong(e){this.song=e,this.index=0}get current(){return this.song}get progress(){return this.index/this.song.notes.length}next(){const e=this.song.notes[this.index];return this.index=(this.index+1)%this.song.notes.length,e}reset(){this.index=0}}let k=null,Be=!0;function ce(t){Be=t}let de=null;function wi(){if(k)return;const t=window.AudioContext??window.webkitAudioContext;if(!t)return;k=new t,k.resume();const e=Math.floor(k.sampleRate*.25);de=k.createBuffer(1,e,k.sampleRate);const i=de.getChannelData(0);for(let n=0;n<e;n++)i[n]=Math.random()*2-1}function ue(t,e,i,n,l){if(!k||!Be)return;const s=k.currentTime,o=k.createOscillator(),a=k.createGain();o.type=i,o.frequency.setValueAtTime(t,s),l&&o.frequency.exponentialRampToValueAtTime(l,s+e),a.gain.setValueAtTime(0,s),a.gain.linearRampToValueAtTime(n,s+.006),a.gain.exponentialRampToValueAtTime(1e-4,s+e),o.connect(a).connect(k.destination),o.start(s),o.stop(s+e+.02)}function ht(t,e,i){if(!k||!de||!Be)return;const n=k.currentTime,l=k.createBufferSource();l.buffer=de;const s=k.createBiquadFilter();s.type="bandpass",s.frequency.setValueAtTime(i,n),s.Q.value=1.1;const o=k.createGain();o.gain.setValueAtTime(e,n),o.gain.exponentialRampToValueAtTime(1e-4,n+t),l.connect(s).connect(o).connect(k.destination),l.start(n),l.stop(n+t+.02)}function Mi(t){const e=bi(t.midi),i=Math.min(.34,.13*t.len+.04);ue(e,i,"triangle",.17),ue(e*2,i*.45,"sine",.045),ht(.035,.05,2400)}function _i(){ue(150,.09,"sine",.1,90),ht(.04,.03,320)}function $i(){ue(330,.1,"sine",.07,250)}const ct="mitsukete-pon.played.v1";function ki(){try{return localStorage.getItem(ct)==="1"}catch{return!1}}function Si(){try{localStorage.setItem(ct,"1")}catch{}}const W={mode:"iro",difficulty:"easy",bottomGapBlocks:.45,fallBlocksPerSec:10,blockScale:.22,baseSec:30,missPenaltySec:.5,hitRecoverSec:.3,soundOn:!0,showCount:!0,colorAssist:!1,effectsOn:!0,hideAhead:!1},Le="mitsukete-pon.tuning.v1";function Ai(){try{const t=localStorage.getItem(Le);return t?{...W,...JSON.parse(t)}:{...W}}catch{return{...W}}}function L(t){try{localStorage.setItem(Le,JSON.stringify(t))}catch{}}function Ei(){try{localStorage.removeItem(Le)}catch{}}const Ge={bottomGapBlocks:"下の隙間",fallBlocksPerSec:"ストンの速さ",blockScale:"ブロック大きさ",missPenaltySec:"ミスで-秒",hitRecoverSec:"正解でもどる秒",effectsOn:"演出",hideAhead:"先を隠す"};function Ci(t){const e=[];for(const i of Object.keys(Ge))t[i]!==W[i]&&e.push(`${Ge[i]}: ${String(t[i])}`);return e}const fe=document.getElementById("stage"),X=fe.getContext("2d"),Fi=document.getElementById("hud"),f=Ai();Zt(f,W);const C=new Bt,Oe=new vi;let $="title",v=et(1,1,3,.22,3,.45),pe=[],me=[],se=Ve[f.mode],Y,x,I;const ge=new Gt,J=[0,0,0,0,0];let Z=0,re=0,xe=!1,Ke="title",O={x:0,y:0,w:1,h:1},ze=!1,Pe=!ki();function U(){return Ht(f.difficulty)}function ve(){return Rt(f.difficulty)}function dt(){return{colorAssist:f.colorAssist}}function le(){return{baseSec:f.baseSec,missPenaltySec:f.missPenaltySec,hitRecoverSec:f.hitRecoverSec}}function Ti(){const t=getComputedStyle(document.documentElement).getPropertyValue("--sab");return Number.parseFloat(t)||0}function N(){const t=window.innerWidth,e=window.innerHeight,i=Math.min(window.devicePixelRatio||1,2);fe.width=Math.round(t*i),fe.height=Math.round(e*i),ze=Wt(t,e),O=zt(t,e),X.setTransform(i,0,0,i,O.x*i,O.y*i),v=et(O.w,O.h,U(),f.blockScale,ve(),f.bottomGapBlocks,Ti(),O),pe=Xt(O.w,O.h,Ie.length),me=qt(O.w,O.h,q.length),x&&(x.blockH=v.blockH,x.lineY=v.restY)}function Oi(){return{blockH:v.blockH,fallBlocksPerSec:f.fallBlocksPerSec,spawnPerSec:0,answerCount:U(),maxQueue:ve(),lineY:v.restY,makeFace:(t,e)=>se.blockFace(t,e,dt())}}let we="";function Me(){Fi.textContent=ee?we:""}function ut(){$="title",we="",Me(),C.clear()}function Qe(t){se=t,f.mode=t.id,L(f),N(),x=Oi(),Oe.setSong(yi(Math.random)),Y=Ot(x,Math.random),I=ti(le()),ge.reset(),C.clear(),re=0,Z=0,xe=!1,we="",Me(),$="play"}function ft(t){var s;if($!=="play"||t>=U())return;J[t]=1;const e=Y.queue.length,i=(s=Y.queue[0])==null?void 0:s.face,n=Y.bottomY-v.blockH/2;if(Pt(Y,t,x)==="hit"){ge.recordHit(performance.now(),e,f.hideAhead?"blind":"open"),li(I,le()),re++,Pe&&(Pe=!1,Si()),Mi(Oe.next());const o=i&&i.color>=0?ne[i.color]:Ze;C.burst(v.colX,n,v.blockW,v.blockH,o.fill,o.edge,Math.random,re);const a=v.buttons[t];a&&C.beam(a.x+a.w/2,a.w*.3,a.y,v.restY,o.fill)}else ge.recordMiss(),si(I,le()),re=0,Oe.reset(),$i()}function xi(){$="result",C.clear(),C.confetti(v.w,v.h,60,Math.random);const t=ge.summary(4,2,350),e=i=>i===null?"—":`${Math.round(i)}ms`;we=[`${se.label} / ${ie[f.difficulty].label}(${U()}こ) / ${ve()}段${f.hideAhead?" / 先を隠す":""}`,`消した ${t.hits}  ミス ${t.misses}`,`中央値タップ間隔 ${e(t.openMedian??t.blindMedian)}`].join(`
`),Me()}function Pi(t,e){if(($==="title"||$==="result")&&H(De(v.w,v.h),t,e)){Ke=$,$="settings";return}if($==="settings"){const n=lt(v.w,v.h,B.map(l=>l.choices.length));for(let l=0;l<B.length;l++){const s=B[l],o=n.rows[l];if(!(!s||!o))for(let a=0;a<o.chips.length;a++){const h=o.chips[a],r=s.choices[a];if(!(!h||!r||!H(h,t,e))){Ye(f,s.key,r),L(f),ce(f.soundOn),F.controllersRecursive().forEach(u=>u.updateDisplay());return}}}H(n.close,t,e)?$=Ke:H(n.reset,t,e)?(ei(f,W),L(f),ce(f.soundOn),F.controllersRecursive().forEach(l=>l.updateDisplay())):H(n.admin,t,e)&&_e();return}if($==="title"){for(let n=0;n<me.length;n++){const l=me[n],s=q[n];if(l&&s&&H(l,t,e)){f.difficulty=s,L(f),N();return}}for(let n=0;n<pe.length;n++){const l=pe[n],s=Ie[n];l&&s&&H(l,t,e)&&Qe(Ve[s])}return}if($==="result"){const n=nt(v.w,v.h,q.length);for(let l=0;l<n.difficulty.length;l++){const s=n.difficulty[l],o=q[l];if(s&&o&&H(s,t,e)){f.difficulty=o,L(f),N();return}}H(n.again,t,e)?Qe(se):H(n.title,t,e)&&ut();return}const i=Nt(v,t,e);i!==null&&ft(i)}fe.addEventListener("pointerdown",t=>{wi(),t.preventDefault(),!ze&&Pi(t.clientX-O.x,t.clientY-O.y)},{passive:!1});window.addEventListener("keydown",t=>{t.key==="d"&&_e();const e="12345".indexOf(t.key);e>=0&&$==="play"&&ft(e)});window.addEventListener("resize",N);const F=new Re({title:"かんりしゃ",width:240});F.close();let ee=!1;function _e(){ee=!ee,F.domElement.style.display=ee?"":"none",ee&&F.open(),Me()}_e();_e();const j=t=>()=>{L(f),t&&N(),x&&(x.fallBlocksPerSec=f.fallBlocksPerSec,x.answerCount=U(),x.maxQueue=ve())};F.add(f,"bottomGapBlocks",0,1.5,.05).name("下の隙間(段)").onChange(j(!0));F.add(f,"hideAhead").name("★先を隠す(対照)").onChange(j(!1));F.add(f,"fallBlocksPerSec",2,30,1).name("ストンの速さ(段/秒)").onChange(j(!1));F.add(f,"effectsOn").name("演出を出す").onChange(()=>{L(f),C.enabled=f.effectsOn,f.effectsOn||C.clear()});const pt=F.addFolder("時間の判定").close();pt.add(f,"missPenaltySec",0,3,.1).name("ミスで-秒").onChange(j(!1));pt.add(f,"hitRecoverSec",0,1,.05).name("正解でもどる秒").onChange(j(!1));F.add(f,"blockScale",.08,.28,.005).name("ブロック大きさ").onChange(j(!0));F.add({f:()=>{Object.assign(f,W),Ei(),C.enabled=f.effectsOn,ce(f.soundOn),F.controllersRecursive().forEach(t=>t.updateDisplay()),ut(),N()}},"f").name("既定に戻す");C.enabled=f.effectsOn;ce(f.soundOn);N();let Je=performance.now();function He(){const t=performance.now(),e=Math.min((t-Je)/1e3,.05);Je=t;for(let i=0;i<J.length;i++)J[i]=Math.max(0,J[i]-e*7);if(Z=Math.max(0,Z-e*7),C.update(e),$==="play"){ni(I,e),xt(Y,e,x,Math.random);const i=Y.bottomY<x.lineY-.5;xe&&!i&&(Z=1,_i()),xe=i,ii(I,le())&&xi()}if(ze){fi(X,v),requestAnimationFrame(He);return}$==="title"?pi(X,v,{modes:Ie.map(i=>Ve[i]),modeRects:pe,difficulties:q.map(i=>ie[i]),difficultyRects:me,selected:f.difficulty,notices:Ci(f)}):$==="play"?oi(X,{layout:v,column:Y,mode:se,session:I,sessionCfg:le(),faceOpts:dt(),answerCount:U(),hideAhead:f.hideAhead,showCount:f.showCount,press:J,squash:Z,targetPulse:.5+.5*Math.sin(t/1100*Math.PI*2),showPointer:Pe&&I.cleared===0,effects:C}):$==="result"?mi(X,v,I,f.showCount,C,q.map(i=>ie[i]),f.difficulty):gi(X,v,f),requestAnimationFrame(He)}requestAnimationFrame(He);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register(new URL("sw.js",document.baseURI).href)});
