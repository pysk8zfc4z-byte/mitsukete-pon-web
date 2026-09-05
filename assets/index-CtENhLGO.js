var Nt=Object.defineProperty;var Ut=(e,t,i)=>t in e?Nt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var x=(e,t,i)=>Ut(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class F{constructor(t,i,l,n,o="div"){this.parent=t,this.object=i,this.property=l,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(n),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),F.nextNameID=F.nextNameID||0,this.$name.id=`lil-gui-name-${++F.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",s=>s.stopPropagation()),this.domElement.addEventListener("keyup",s=>s.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(l)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("lil-disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const i=this.parent.add(this.object,this.property,t);return i.name(this._name),this.destroy(),i}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Xt extends F{constructor(t,i,l){super(t,i,l,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function ft(e){let t,i;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?i=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),i?"#"+i:!1}const jt={isPrimitive:!0,match:e=>typeof e=="string",fromHexString:ft,toHexString:ft},q={isPrimitive:!0,match:e=>typeof e=="number",fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>"#"+e.toString(16).padStart(6,0)},Gt={isPrimitive:!1,match:e=>Array.isArray(e)||ArrayBuffer.isView(e),fromHexString(e,t,i=1){const l=q.fromHexString(e);t[0]=(l>>16&255)/255*i,t[1]=(l>>8&255)/255*i,t[2]=(l&255)/255*i},toHexString([e,t,i],l=1){l=255/l;const n=e*l<<16^t*l<<8^i*l<<0;return q.toHexString(n)}},Kt={isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,i=1){const l=q.fromHexString(e);t.r=(l>>16&255)/255*i,t.g=(l>>8&255)/255*i,t.b=(l&255)/255*i},toHexString({r:e,g:t,b:i},l=1){l=255/l;const n=e*l<<16^t*l<<8^i*l<<0;return q.toHexString(n)}},Qt=[jt,q,Gt,Kt];function Jt(e){return Qt.find(t=>t.match(e))}class Zt extends F{constructor(t,i,l,n){super(t,i,l,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Jt(this.initialValue),this._rgbScale=n,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=ft(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const i=this._format.fromHexString(t);this.setValue(i)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class dt extends F{constructor(t,i,l){super(t,i,l,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",n=>{n.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class te extends F{constructor(t,i,l,n,o,s){super(t,i,l,"lil-number"),this._initInput(),this.min(n),this.max(o);const r=s!==void 0;this.step(r?s:this._getImplicitStep(),r),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,i=!0){return this._step=t,this._stepExplicit=i,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let i=(t-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let f=parseFloat(this.$input.value);isNaN(f)||(this._stepExplicit&&(f=this._snap(f)),this.setValue(this._clamp(f)))},l=f=>{const w=parseFloat(this.$input.value);isNaN(w)||(this._snapClampSetValue(w+f),this.$input.value=this.getValue())},n=f=>{f.key==="Enter"&&this.$input.blur(),f.code==="ArrowUp"&&(f.preventDefault(),l(this._step*this._arrowKeyMultiplier(f))),f.code==="ArrowDown"&&(f.preventDefault(),l(this._step*this._arrowKeyMultiplier(f)*-1))},o=f=>{this._inputFocused&&(f.preventDefault(),l(this._step*this._normalizeMouseWheel(f)))};let s=!1,r,h,a,c,d;const m=5,b=f=>{r=f.clientX,h=a=f.clientY,s=!0,c=this.getValue(),d=0,window.addEventListener("mousemove",y),window.addEventListener("mouseup",E)},y=f=>{if(s){const w=f.clientX-r,G=f.clientY-h;Math.abs(G)>m?(f.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(w)>m&&E()}if(!s){const w=f.clientY-a;d-=w*this._step*this._arrowKeyMultiplier(f),c+d>this._max?d=this._max-c:c+d<this._min&&(d=this._min-c),this._snapClampSetValue(c+d)}a=f.clientY},E=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",y),window.removeEventListener("mouseup",E)},k=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",b),this.$input.addEventListener("focus",k),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const t=(p,f,w,G,qt)=>(p-f)/(w-f)*(qt-G)+G,i=p=>{const f=this.$slider.getBoundingClientRect();let w=t(p,f.left,f.right,this._min,this._max);this._snapClampSetValue(w)},l=p=>{this._setDraggingStyle(!0),i(p.clientX),window.addEventListener("mousemove",n),window.addEventListener("mouseup",o)},n=p=>{i(p.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",o)};let s=!1,r,h;const a=p=>{p.preventDefault(),this._setDraggingStyle(!0),i(p.touches[0].clientX),s=!1},c=p=>{p.touches.length>1||(this._hasScrollBar?(r=p.touches[0].clientX,h=p.touches[0].clientY,s=!0):a(p),window.addEventListener("touchmove",d,{passive:!1}),window.addEventListener("touchend",m))},d=p=>{if(s){const f=p.touches[0].clientX-r,w=p.touches[0].clientY-h;Math.abs(f)>Math.abs(w)?a(p):(window.removeEventListener("touchmove",d),window.removeEventListener("touchend",m))}else p.preventDefault(),i(p.touches[0].clientX)},m=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",d),window.removeEventListener("touchend",m)},b=this._callOnFinishChange.bind(this),y=400;let E;const k=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const w=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+w),this.$input.value=this.getValue(),clearTimeout(E),E=setTimeout(b,y)};this.$slider.addEventListener("mousedown",l),this.$slider.addEventListener("touchstart",c,{passive:!1}),this.$slider.addEventListener("wheel",k,{passive:!1})}_setDraggingStyle(t,i="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",t),document.body.classList.toggle("lil-dragging",t),document.body.classList.toggle(`lil-${i}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:i,deltaY:l}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(i=0,l=-t.wheelDelta/120,l*=this._stepExplicit?1:10),i+-l}_arrowKeyMultiplier(t){let i=this._stepExplicit?1:10;return t.shiftKey?i*=10:t.altKey&&(i/=10),i}_snap(t){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),t-=i,t=Math.round(t/this._step)*this._step,t+=i,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class ee extends F{constructor(t,i,l,n){super(t,i,l,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(n)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(i=>{const l=document.createElement("option");l.textContent=i,this.$select.appendChild(l)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),i=this._values.indexOf(t);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?t:this._names[i],this}}class ie extends F{constructor(t,i,l){super(t,i,l,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",n=>{n.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var le=`.lil-gui {
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
}`;function ne(e){const t=document.createElement("style");t.innerHTML=e;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(t,i):document.head.appendChild(t)}let Ct=!1;class bt{constructor({parent:t,autoPlace:i=t===void 0,container:l,width:n,title:o="Controls",closeFolders:s=!1,injectStyles:r=!0,touchStyles:h=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),h&&this.domElement.classList.add("lil-allow-touch-styles"),!Ct&&r&&(ne(le),Ct=!0),l?l.appendChild(this.domElement):i&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),n&&this.domElement.style.setProperty("--width",n+"px"),this._closeFolders=s}add(t,i,l,n,o){if(Object(l)===l)return new ee(this,t,i,l);const s=t[i];switch(typeof s){case"number":return new te(this,t,i,l,n,o);case"boolean":return new Xt(this,t,i);case"string":return new ie(this,t,i);case"function":return new dt(this,t,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,t,`
	value:`,s)}addColor(t,i,l=1){return new Zt(this,t,i,l)}addFolder(t){const i=new bt({parent:this,title:t});return this.root._closeFolders&&i.close(),i}load(t,i=!0){return t.controllers&&this.controllers.forEach(l=>{l instanceof dt||l._name in t.controllers&&l.load(t.controllers[l._name])}),i&&t.folders&&this.folders.forEach(l=>{l._title in t.folders&&l.load(t.folders[l._title])}),this}save(t=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(l=>{if(!(l instanceof dt)){if(l._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${l._name}"`);i.controllers[l._name]=l.save()}}),t&&this.folders.forEach(l=>{if(l._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${l._title}"`);i.folders[l._title]=l.save()}),i}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("lil-transition");const l=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",l))};this.$children.addEventListener("transitionend",l);const n=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!t),requestAnimationFrame(()=>{this.$children.style.height=n+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(l=>l.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(i=>{t=t.concat(i.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(i=>{t=t.concat(i.foldersRecursive())}),t}}function se(e,t,i){var r,h;const l=i.length,n=(r=i[l-1])==null?void 0:r.answer,o=l>=2&&n!==void 0&&n===((h=i[l-2])==null?void 0:h.answer)?n:-1;if(o<0||e<=1)return Math.min(e-1,Math.floor(t()*e));const s=Math.min(e-2,Math.floor(t()*(e-1)));return s>=o?s+1:s}function pt(e,t,i){const l=se(t.answerCount,i,e.queue);e.queue.push({answer:l,face:t.makeFace(l,i)})}function oe(e,t){const i={queue:[],bottomY:e.lineY,spawnAcc:0},l=e.maxQueue>0?e.maxQueue:4;for(let n=0;n<l;n++)pt(i,e,t);return i}function re(e,t,i,l){if(e.bottomY=Math.min(i.lineY,e.bottomY+i.fallBlocksPerSec*i.blockH*t),i.maxQueue>0){for(;e.queue.length<i.maxQueue;)pt(e,i,l);return}for(e.spawnAcc+=i.spawnPerSec*t;e.spawnAcc>=1;)e.spawnAcc-=1,pt(e,i,l)}function ae(e,t,i){const l=e.queue[0];return l?l.answer!==t?"miss":(e.queue.shift(),e.bottomY-=i.blockH,"hit"):"empty"}const st={easy:{id:"easy",label:"かんたん",answerCount:3,visibleCount:3},normal:{id:"normal",label:"ふつう",answerCount:4,visibleCount:4},hard:{id:"hard",label:"むずかしい",answerCount:5,visibleCount:5}},vt=["easy","normal","hard"];function he(e){return st[e].answerCount}function de(e){return st[e].visibleCount}const N=[{fill:"#ff5a5f",edge:"#c02128",gloss:"#ff9296",glyph:"#ffffff",shape:"circle",label:"あか"},{fill:"#3fa9ff",edge:"#1259a8",gloss:"#8bccff",glyph:"#ffffff",shape:"square",label:"あお"},{fill:"#ffc93c",edge:"#c07f00",gloss:"#ffe293",glyph:"#7a4b00",shape:"triangle",label:"きいろ"},{fill:"#4bd37b",edge:"#188c4a",gloss:"#9aeab7",glyph:"#ffffff",shape:"diamond",label:"みどり"},{fill:"#b072ff",edge:"#6a2cbd",gloss:"#d6b1ff",glyph:"#ffffff",shape:"star",label:"むらさき"}],Pt={fill:"#efe0c6",edge:"#b09166",gloss:"#fff4de",glyph:"#6b5330"},ce="#dcefff",ue="#fff4e2",D="#4a3a24",U="rgba(74,58,36,0.55)",C="ui-rounded, 'Hiragino Maru Gothic ProN', 'Hiragino Sans', -apple-system, BlinkMacSystemFont, 'Noto Sans JP', sans-serif";function fe(e,t,i,l,n){switch(e.beginPath(),t){case"circle":e.arc(i,l,n,0,Math.PI*2);break;case"square":e.rect(i-n*.85,l-n*.85,n*1.7,n*1.7);break;case"triangle":St(e,i,l+n*.12,n*1.12,3,-Math.PI/2);break;case"diamond":St(e,i,l,n*1.14,4,-Math.PI/2);break;case"star":pe(e,i,l,n*1.16,n*.5,5);break}e.closePath()}function St(e,t,i,l,n,o){for(let s=0;s<n;s++){const r=o+s*Math.PI*2/n,h=t+Math.cos(r)*l,a=i+Math.sin(r)*l;s===0?e.moveTo(h,a):e.lineTo(h,a)}}function pe(e,t,i,l,n,o){for(let s=0;s<o*2;s++){const r=s%2===0?l:n,h=-Math.PI/2+s*Math.PI/o,a=t+Math.cos(h)*r,c=i+Math.sin(h)*r;s===0?e.moveTo(a,c):e.lineTo(a,c)}}function v(e,t,i,l,n,o){const s=Math.max(0,Math.min(o,l/2,n/2));e.beginPath(),e.moveTo(t+s,i),e.arcTo(t+l,i,t+l,i+n,s),e.arcTo(t+l,i+n,t,i+n,s),e.arcTo(t,i+n,t,i,s),e.arcTo(t,i,t+l,i,s),e.closePath()}const me=3200;class ge{constructor(){x(this,"enabled",!0);x(this,"shards",[]);x(this,"beams",[])}clear(){this.shards.length=0,this.beams.length=0}get shardCount(){return this.shards.length}burst(t,i,l,n,o,s,r,h=0){if(!this.enabled)return;const a=Math.min(h,10)/10,c=7+Math.round(a*4);for(let d=0;d<c;d++){const m=d/c*Math.PI*2+r()*.6,b=90+r()*220;this.shards.push({x:t+(r()-.5)*l*.6,y:i+r()*n*.25,vx:Math.cos(m)*b,vy:Math.sin(m)*b*.55-100,rot:r()*Math.PI,vrot:(r()-.5)*14,size:Math.min(l,n)*(.14+r()*.12)*(1+a*.4),life:.42+r()*.12,maxLife:.54,fill:o,edge:s})}}beam(t,i,l,n,o){this.enabled&&this.beams.push({x:t,w:i,yFrom:l,yTo:n,life:.09,maxLife:.09,fill:o})}confetti(t,i,l,n){if(this.enabled)for(let o=0;o<l;o++){const s=N[Math.floor(n()*N.length)];this.shards.push({x:n()*t,y:-20-n()*i*.4,vx:(n()-.5)*120,vy:60+n()*160,rot:n()*Math.PI,vrot:(n()-.5)*10,size:6+n()*8,life:1.4+n()*.8,maxLife:2.2,fill:s.fill,edge:s.edge})}}update(t){for(let i=this.shards.length-1;i>=0;i--){const l=this.shards[i];if(l.life-=t,l.life<=0){this.shards.splice(i,1);continue}l.vy+=me*t,l.x+=l.vx*t,l.y+=l.vy*t,l.rot+=l.vrot*t}for(let i=this.beams.length-1;i>=0;i--){const l=this.beams[i];l.life-=t,l.life<=0&&this.beams.splice(i,1)}}draw(t){for(const i of this.beams){const l=1-i.life/i.maxLife,n=i.yFrom+(i.yTo-i.yFrom)*l,o=Math.abs(i.yFrom-i.yTo)*.42;t.globalAlpha=.55*(1-l),t.fillStyle=i.fill,v(t,i.x-i.w/2,n-o,i.w,o,i.w/2),t.fill()}t.globalAlpha=1;for(const i of this.shards){const l=Math.min(1,i.life/(i.maxLife*.4));t.globalAlpha=l,t.save(),t.translate(i.x,i.y),t.rotate(i.rot),v(t,-i.size/2,-i.size/2,i.size,i.size,i.size*.28),t.fillStyle=i.fill,t.fill(),t.lineWidth=Math.max(1.5,i.size*.14),t.strokeStyle=i.edge,t.stroke(),t.restore()}t.globalAlpha=1}}function Ht(e,t,i,l,n,o,s=0){const r=Math.min(e,t),h=Math.min(t*.11,84),a=s+Math.max(6,t*.012),c=Math.min(t*.19,130),d=t-c-a,m=(d-h)/(n+o),b=Math.max(24,Math.min(r*l,m)),y=Math.min(e*.46,b*1.3),E=d-b*o,k=Math.max(4,e*.012),p=(e-k*(i+1))/i,f=[];for(let w=0;w<i;w++)f.push({x:k+w*(p+k),y:d+k,w:p,h:c-k*2});return{w:e,h:t,headerH:h,blockH:b,blockW:y,colX:e/2,lineY:d,restY:E,buttons:f}}function be(e,t,i){for(let l=0;l<e.buttons.length;l++){const n=e.buttons[l];if(t>=n.x-2&&t<=n.x+n.w+2&&i>=e.lineY)return l}return null}function ve(e,t,i){const l=t*.36,n=t*.88-l,o=.28,s=Math.min(t*.13,96,n/(i*(1+o)-o)),r=s*o,h=Math.min(e*.72,340),a=i*s+(i-1)*r,c=l+(n-a)/2,d=[];for(let m=0;m<i;m++)d.push({x:(e-h)/2,y:c+m*(s+r),w:h,h:s});return d}function ye(e,t,i){const l=Math.max(6,e*.022),n=Math.min((e*.86-l*(i-1))/i,120),o=Math.min(t*.065,50),s=i*n+(i-1)*l,r=(e-s)/2,h=t*.29,a=[];for(let c=0;c<i;c++)a.push({x:r+c*(n+l),y:h,w:n,h:o});return a}function R(e,t,i){return t>=e.x&&t<=e.x+e.w&&i>=e.y&&i<=e.y+e.h}function yt(e,t){const i=Math.min(Math.max(40,e*.12),52);return{x:e-i-Math.max(10,e*.035),y:Math.max(10,t*.018),w:i,h:i}}function Dt(e,t){const i=Math.min(e*.6,280),l=Math.min(t*.09,68),n=Math.min(e*.44,200),o=Math.min(t*.07,54);return{again:{x:(e-i)/2,y:t*.735,w:i,h:l},title:{x:(e-n)/2,y:t*.735+l+Math.max(12,t*.022),w:n,h:o}}}const we=3e3;class _e{constructor(){x(this,"samples",[]);x(this,"lastHitAt",null);x(this,"hits",0);x(this,"misses",0)}reset(){this.samples=[],this.lastHitAt=null,this.hits=0,this.misses=0}recordMiss(){this.misses++}recordHit(t,i,l){this.hits++;const n=this.lastHitAt;if(this.lastHitAt=t,n===null)return;const o=t-n;o>we||this.samples.push({mode:l,depth:i,interval:o})}summary(t,i,l){const n=this.samples.filter(d=>d.mode==="open"),o=this.samples.filter(d=>d.mode==="blind"),s=K(n.map(d=>d.interval)),r=K(o.map(d=>d.interval)),h=n.filter(d=>d.depth>=t),a=n.filter(d=>d.depth<=i),c=n.filter(d=>d.interval<l).length;return{hits:this.hits,misses:this.misses,openMedian:s,blindMedian:r,lookaheadGain:s!==null&&r!==null&&s>0?r/s:null,deepMedian:K(h.map(d=>d.interval)),shallowMedian:K(a.map(d=>d.interval)),preemptRate:n.length>0?c/n.length:null}}count(t){return this.samples.filter(i=>i.mode===t).length}}function K(e){if(e.length===0)return null;const t=[...e].sort((l,n)=>l-n),i=t.length>>1;return t.length%2===1?t[i]:(t[i-1]+t[i])/2}const $e={color:-1,shape:null,dots:0,layout:0,numeral:0,frame:0,text:""};function T(e){return{...$e,...e}}const mt=["circle","square","triangle","diamond","star"],Vt={1:[[[1,1]],[[0,0]],[[2,2]]],2:[[[0,0],[2,2]],[[2,0],[0,2]],[[0,1],[2,1]]],3:[[[0,0],[1,1],[2,2]],[[2,0],[1,1],[0,2]],[[1,0],[0,2],[2,2]]],4:[[[0,0],[2,0],[0,2],[2,2]],[[1,0],[0,1],[2,1],[1,2]],[[0,0],[2,0],[1,1],[1,2]]],5:[[[0,0],[2,0],[1,1],[0,2],[2,2]],[[1,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[2,0],[0,1],[0,2],[2,2]]]};function Me(e,t){const i=Vt[e];return!i||i.length===0?[]:i[t%i.length]}function Ae(e,t){var l;const i=((l=Vt[e])==null?void 0:l.length)??1;return Math.min(i-1,Math.floor(t()*i))}function Et(e,t){return T({color:e,shape:t.colorAssist?mt[e]??"circle":null})}const wt={iro:{id:"iro",label:"いろ",note:"同一マッチ。色だけ。2〜3歳",maxAnswers:5,buttonFace:(e,t)=>Et(e,t),blockFace:(e,t,i)=>Et(e,i)},katachi:{id:"katachi",label:"かたち",note:"同一マッチ。色の手がかりを消してある。3歳",maxAnswers:5,buttonFace:e=>T({shape:mt[e]??"circle"}),blockFace:e=>T({shape:mt[e]??"circle"})},ikutsu:{id:"ikutsu",label:"いくつ",note:"変換マッチ。サイコロの目を見て数字を押す。4〜5歳",maxAnswers:5,buttonFace:e=>T({numeral:e+1}),blockFace:(e,t)=>T({dots:e+1,layout:Ae(e+1,t)})},hosuu:{id:"hosuu",label:"10のほすう",note:"変換マッチ。あと何個で10か。さくらんぼ算の土台。小1",maxAnswers:5,buttonFace:e=>T({numeral:e+1}),blockFace:e=>T({frame:9-e})},tashizan:{id:"tashizan",label:"たしざん",note:"変換マッチ。式を見て答えを押す。答えは2〜6。小1",maxAnswers:5,buttonFace:e=>T({numeral:e+2}),blockFace:(e,t)=>{const i=e+2,l=1+Math.min(i-2,Math.floor(t()*(i-1)));return T({text:`${l}+${i-l}`})}}},_t=["iro","katachi","ikutsu","hosuu","tashizan"],I=5,ct=2;function ke(e){return{elapsed:0,penalty:0,cleared:0,missed:0}}function Lt(e,t){return Math.max(0,t.baseSec-e.elapsed-e.penalty)}function Ce(e,t){return Lt(e,t)<=0}function Se(e,t){e.elapsed+=t}function Ee(e,t){e.cleared++,e.penalty=Math.max(0,e.penalty-t.hitRecoverSec)}function Fe(e,t){e.missed++,e.penalty+=t.missPenaltySec}const ot="rgba(74,58,36,0.20)";function Te(e,t){const{layout:i,column:l,mode:n}=t;$t(e,i),Pe(e,i,t);const o=i.blockW*1.34;v(e,i.colX-o/2,i.restY-4,o,14,7),e.fillStyle="rgba(74,58,36,0.16)",e.fill();const s=i.colX-i.blockW/2;for(let r=0;r<l.queue.length;r++){const h=l.queue[r];if(!h)continue;const a=l.bottomY-(r+1)*i.blockH;if(a>i.restY||a+i.blockH<i.headerH-i.blockH)break;let c=a,d=i.blockH;const m=r===0;if(m&&t.squash>0&&(d=i.blockH*(1-.2*t.squash),c=a+(i.blockH-d)),m){const b=i.blockW*1.09,y=i.colX-b/2;Oe(e,y,c,b,d,t.targetPulse),ut(e,y,c,b,d,h.face,!1,10),t.showPointer&&xe(e,y,c,b,d,t.targetPulse)}else ut(e,s,c,i.blockW,d,h.face,t.hideAhead)}t.effects.draw(e);for(let r=0;r<t.answerCount;r++){const h=i.buttons[r];if(!h)continue;const a=(t.press[r]??0)*5;ut(e,h.x,h.y+a,h.w,h.h,n.buttonFace(r,t.faceOpts),!1,6-a)}}function Oe(e,t,i,l,n,o){const s=5+o*4;v(e,t-s,i-s,l+s*2,n+s*2,(n+s*2)*.3),e.lineWidth=4,e.strokeStyle=`rgba(74,58,36,${.14+o*.24})`,e.stroke()}function xe(e,t,i,l,n,o){const s=i+n/2,r=Math.min(n*.3,22),h=o*r*.45;e.fillStyle="#c07000";for(const a of[-1,1]){const c=a<0?t-16-h:t+l+16+h;e.beginPath(),e.moveTo(c,s),e.lineTo(c-a*r,s-r*.6),e.lineTo(c-a*r,s+r*.6),e.closePath(),e.fill()}}function $t(e,t){const i=e.createLinearGradient(0,0,0,t.h);i.addColorStop(0,ce),i.addColorStop(1,ue),e.fillStyle=i,e.fillRect(0,0,t.w,t.h)}function Pe(e,t,i){const l=i.session,n=Lt(l,i.sessionCfg),o=Math.max(12,t.w*.045),s=Math.max(16,t.headerH*.32),r=t.headerH*.3,h=t.w-o*2;v(e,o,r,h,s,s/2),e.fillStyle="rgba(74,58,36,0.12)",e.fill();const a=Math.max(0,Math.min(1,n/i.sessionCfg.baseSec));if(a>0){const c=Math.max(s,h*a),d=n<=5?"#ff5a5f":n<=12?"#ffab2e":"#4bd37b",m=n<=5?"#c02128":n<=12?"#c07000":"#188c4a";v(e,o,r,c,s,s/2),e.fillStyle=d,e.fill(),e.lineWidth=3,e.strokeStyle=m,e.stroke(),v(e,o+s*.25,r+s*.18,c-s*.5,s*.26,s*.13),e.fillStyle="rgba(255,255,255,0.42)",e.fill()}i.showCount&&(e.textBaseline="top",e.font=`700 ${Math.round(t.headerH*.3)}px ${C}`,e.fillStyle=U,e.textAlign="left",e.fillText(`${Math.ceil(n)}`,o+2,r+s+5),e.fillStyle=D,e.textAlign="right",e.fillText(`${l.cleared}こ`,t.w-o-2,r+s+5))}function ut(e,t,i,l,n,o,s,r=6){const h=Math.min(l,n)*.26,a=2;r>0&&(v(e,t+a,i+a+r,l-a*2,n-a*2,h),e.fillStyle=ot,e.fill());const c=s?{fill:"#d9cdb8",edge:"#a8977c",gloss:"#efe6d5",glyph:"#a8977c"}:o.color>=0?N[o.color]:Pt;v(e,t+a,i+a,l-a*2,n-a*2,h),e.fillStyle=c.fill,e.fill(),e.save(),e.clip(),v(e,t+a,i+a,l-a*2,(n-a*2)*.44,h),e.fillStyle=c.gloss,e.globalAlpha=.42,e.fill(),e.restore(),e.globalAlpha=1,v(e,t+a,i+a,l-a*2,n-a*2,h),e.lineWidth=Math.max(3,Math.min(l,n)*.075),e.strokeStyle=c.edge,e.stroke(),s||He(e,o,t+l/2,i+n/2,l-a*2,n-a*2,c.glyph)}function He(e,t,i,l,n,o,s){const r=Math.min(n,o);if(e.fillStyle=s,t.frame>0){De(e,t.frame,i,l,n,o,s);return}if(t.text){e.textAlign="center",e.textBaseline="middle",e.font=`800 ${Math.round(Math.min(o*.46,n*.86/t.text.length))}px ${C}`,e.fillText(t.text,i,l+r*.03);return}if(t.numeral>0){e.textAlign="center",e.textBaseline="middle",e.font=`800 ${Math.round(r*.6)}px ${C}`,e.fillText(String(t.numeral),i,l+r*.04);return}if(t.shape){fe(e,t.shape,i,l,r*.25),e.fill();return}if(t.dots>0){const h=r*.26,a=r*.098;for(const[c,d]of Me(t.dots,t.layout))e.beginPath(),e.arc(i+(c-1)*h,l+(d-1)*h,a,0,Math.PI*2),e.fill()}}function De(e,t,i,l,n,o,s){const r=n*.84,h=Math.min(o*.68,r/I*ct*1.2),a=i-r/2,c=l-h/2,d=r/I,m=h/ct,b=Math.min(d,m)*.3;v(e,a,c,r,h,Math.min(d,m)*.28),e.lineWidth=Math.max(2,Math.min(n,o)*.026),e.strokeStyle=s,e.globalAlpha=.5,e.stroke(),e.globalAlpha=1;for(let y=0;y<I*ct;y++){const E=a+y%I*d+d/2,k=c+Math.floor(y/I)*m+m/2;e.beginPath(),e.arc(E,k,b,0,Math.PI*2),y<t?(e.fillStyle=s,e.fill()):(e.lineWidth=Math.max(1.5,b*.32),e.strokeStyle=s,e.globalAlpha=.34,e.stroke(),e.globalAlpha=1)}}function Ve(e,t,i){$t(e,t),e.textAlign="center",e.textBaseline="middle",e.fillStyle=D,e.font=`800 ${Math.round(Math.min(t.w*.115,50))}px ${C}`,e.fillText("みつけてポン",t.w/2,t.h*.16);for(let l=0;l<i.difficulties.length;l++){const n=i.difficultyRects[l],o=i.difficulties[l];if(!n||!o)continue;const s=o.id===i.selected;v(e,n.x,n.y,n.w,n.h,n.h*.42),e.fillStyle=s?D:"rgba(255,255,255,0.66)",e.fill(),e.lineWidth=3,e.strokeStyle=s?D:"rgba(74,58,36,0.22)",e.stroke(),e.fillStyle=s?"#fff6e6":U,e.font=`700 ${Math.round(Math.min(n.h*.38,n.w*.21))}px ${C}`,e.fillText(o.label,n.x+n.w/2,n.y+n.h/2)}for(let l=0;l<i.modes.length;l++){const n=i.modeRects[l],o=i.modes[l];if(!n||!o)continue;const s=N[l];v(e,n.x,n.y+7,n.w,n.h,n.h*.32),e.fillStyle=ot,e.fill(),v(e,n.x,n.y,n.w,n.h,n.h*.32),e.fillStyle=s.fill,e.fill(),e.save(),e.clip(),v(e,n.x,n.y,n.w,n.h*.44,n.h*.32),e.globalAlpha=.4,e.fillStyle=s.gloss,e.fill(),e.restore(),e.globalAlpha=1,v(e,n.x,n.y,n.w,n.h,n.h*.32),e.lineWidth=4,e.strokeStyle=s.edge,e.stroke(),e.fillStyle="#ffffff",e.font=`800 ${Math.round(n.h*.44)}px ${C}`,e.fillText(o.label,n.x+n.w/2,n.y+n.h/2)}if(Rt(e,yt(t.w,t.h)),i.notices.length>0){const l=Math.round(Math.min(t.w*.038,15));e.font=`700 ${l}px ${C}`;const n=t.h-Math.max(14,t.h*.03);e.fillStyle="#c07000",e.fillText("⚙ きてい以外の設定",t.w/2,n-l*1.5*i.notices.length),e.fillStyle="rgba(192,112,0,0.75)",i.notices.forEach((o,s)=>{e.fillText(o,t.w/2,n-l*1.5*(i.notices.length-1-s))})}}function Le(e,t,i,l,n){$t(e,t),e.textAlign="center",e.textBaseline="middle",e.fillStyle=D,e.font=`800 ${Math.round(Math.min(t.w*.1,42))}px ${C}`,e.fillText("よくできました",t.w/2,t.h*.24);const o=t.w/2,s=t.h*.44,r=Math.min(t.w*.28,t.h*.155);if(e.beginPath(),e.arc(o,s+7,r,0,Math.PI*2),e.fillStyle=ot,e.fill(),e.beginPath(),e.arc(o,s,r,0,Math.PI*2),e.fillStyle="#ffc93c",e.fill(),e.lineWidth=6,e.strokeStyle="#c07f00",e.stroke(),l)e.fillStyle="#7a4b00",e.font=`800 ${Math.round(r*1)}px ${C}`,e.fillText(`${i.cleared}`,o,s),e.fillStyle=U,e.font=`700 ${Math.round(Math.min(t.w*.05,20))}px ${C}`,e.fillText(`ミス ${i.missed}`,o,s+r+24);else{const a=Math.min(i.cleared,40),c=Math.min(t.w*.024,12),d=8;for(let m=0;m<a;m++){const b=o+(m%d-(d-1)/2)*c*2.6,y=s-r*.5+Math.floor(m/d)*c*2.7;e.beginPath(),e.arc(b,y,c,0,Math.PI*2),e.fillStyle="#7a4b00",e.fill()}}n.draw(e);const h=Dt(t.w,t.h);Ft(e,h.again,"もういちど","#4bd37b","#188c4a","#ffffff"),Ft(e,h.title,"タイトルへ","rgba(255,255,255,0.72)",U,D),Rt(e,yt(t.w,t.h))}function Ft(e,t,i,l,n,o){e.textAlign="center",e.textBaseline="middle",v(e,t.x,t.y+6,t.w,t.h,t.h*.36),e.fillStyle=ot,e.fill(),v(e,t.x,t.y,t.w,t.h,t.h*.36),e.fillStyle=l,e.fill(),e.lineWidth=4,e.strokeStyle=n,e.stroke(),e.fillStyle=o,e.font=`800 ${Math.round(t.h*.42)}px ${C}`,e.fillText(i,t.x+t.w/2,t.y+t.h/2)}function Rt(e,t){v(e,t.x,t.y,t.w,t.h,t.h*.32),e.fillStyle="rgba(255,255,255,0.66)",e.fill(),e.lineWidth=2.5,e.strokeStyle="rgba(74,58,36,0.28)",e.stroke();const i=t.w*.26,l=t.x+i,n=t.x+t.w-i,o=[.7,.32,.58];e.lineCap="round",e.lineWidth=Math.max(2,t.w*.07);for(let s=0;s<o.length;s++){const r=t.y+t.h*(.32+s*.18);e.strokeStyle=U,e.beginPath(),e.moveTo(l,r),e.lineTo(n,r),e.stroke();const h=l+(n-l)*o[s];e.fillStyle=D,e.beginPath(),e.arc(h,r,t.w*.075,0,Math.PI*2),e.fill()}e.lineCap="butt"}let _=null,Z=null;function Re(){if(_)return;const e=window.AudioContext??window.webkitAudioContext;if(!e)return;_=new e,_.resume();const t=Math.floor(_.sampleRate*.25);Z=_.createBuffer(1,t,_.sampleRate);const i=Z.getChannelData(0);for(let l=0;l<t;l++)i[l]=Math.random()*2-1}function tt(e,t,i,l,n){if(!_)return;const o=_.currentTime,s=_.createOscillator(),r=_.createGain();s.type=i,s.frequency.setValueAtTime(e,o),n&&s.frequency.exponentialRampToValueAtTime(n,o+t),r.gain.setValueAtTime(0,o),r.gain.linearRampToValueAtTime(l,o+.006),r.gain.exponentialRampToValueAtTime(1e-4,o+t),s.connect(r).connect(_.destination),s.start(o),s.stop(o+t+.02)}function It(e,t,i){if(!_||!Z)return;const l=_.currentTime,n=_.createBufferSource();n.buffer=Z;const o=_.createBiquadFilter();o.type="bandpass",o.frequency.setValueAtTime(i,l),o.Q.value=1.1;const s=_.createGain();s.gain.setValueAtTime(t,l),s.gain.exponentialRampToValueAtTime(1e-4,l+e),n.connect(o).connect(s).connect(_.destination),n.start(l),n.stop(l+e+.02)}function Ie(e){const t=Math.min(e,8),i=523*Math.pow(2,t/12);tt(i,.11,"triangle",.16),tt(i*2,.06,"sine",.05),It(.07,.09,1800+t*120)}function Be(){tt(150,.09,"sine",.1,90),It(.04,.03,320)}function Ye(){tt(330,.1,"sine",.07,250)}const W={mode:"iro",difficulty:"easy",bottomGapBlocks:.45,fallBlocksPerSec:10,blockScale:.22,baseSec:30,missPenaltySec:.5,hitRecoverSec:.3,showCount:!0,colorAssist:!1,effectsOn:!0,hideAhead:!1},Mt="mitsukete-pon.tuning.v1";function ze(){try{const e=localStorage.getItem(Mt);return e?{...W,...JSON.parse(e)}:{...W}}catch{return{...W}}}function rt(e){try{localStorage.setItem(Mt,JSON.stringify(e))}catch{}}function We(){try{localStorage.removeItem(Mt)}catch{}}const Tt={bottomGapBlocks:"下の隙間",fallBlocksPerSec:"ストンの速さ",blockScale:"ブロック大きさ",baseSec:"もち時間",missPenaltySec:"ミスで-秒",hitRecoverSec:"正解でもどる秒",showCount:"数字を出す",colorAssist:"色弱サポート",effectsOn:"演出",hideAhead:"先を隠す"};function qe(e){const t=[];for(const i of Object.keys(Tt))e[i]!==W[i]&&t.push(`${Tt[i]}: ${String(e[i])}`);return t}const et=document.getElementById("stage"),J=et.getContext("2d"),At=document.getElementById("hud"),u=ze(),$=new ge;let S="title",g=Ht(1,1,3,.22,3,.45),it=[],lt=[],j=wt[u.mode],H,A,P;const nt=new _e,B=[0,0,0,0,0];let Y=0,z=0,gt=!1;function V(){return he(u.difficulty)}function at(){return de(u.difficulty)}function Bt(){return{colorAssist:u.colorAssist}}function X(){return{baseSec:u.baseSec,missPenaltySec:u.missPenaltySec,hitRecoverSec:u.hitRecoverSec}}function Ne(){const e=getComputedStyle(document.documentElement).getPropertyValue("--sab");return Number.parseFloat(e)||0}function L(){const e=window.innerWidth,t=window.innerHeight,i=Math.min(window.devicePixelRatio||1,2);et.width=Math.round(e*i),et.height=Math.round(t*i),J.setTransform(i,0,0,i,0,0),g=Ht(e,t,V(),u.blockScale,at(),u.bottomGapBlocks,Ne()),it=ve(e,t,_t.length),lt=ye(e,t,vt.length),A&&(A.blockH=g.blockH,A.lineY=g.restY)}function Ue(){return{blockH:g.blockH,fallBlocksPerSec:u.fallBlocksPerSec,spawnPerSec:0,answerCount:V(),maxQueue:at(),lineY:g.restY,makeFace:(e,t)=>j.blockFace(e,t,Bt())}}function Yt(){S="title",At.textContent="",$.clear()}function Ot(e){j=e,u.mode=e.id,rt(u),L(),A=Ue(),H=oe(A,Math.random),P=ke(X()),nt.reset(),$.clear(),z=0,Y=0,gt=!1,At.textContent="",S="play"}function zt(e){var o;if(S!=="play"||e>=V())return;B[e]=1;const t=H.queue.length,i=(o=H.queue[0])==null?void 0:o.face,l=H.bottomY-g.blockH/2;if(ae(H,e,A)==="hit"){nt.recordHit(performance.now(),t,u.hideAhead?"blind":"open"),Ee(P,X()),z++,Ie(z);const s=i&&i.color>=0?N[i.color]:Pt;$.burst(g.colX,l,g.blockW,g.blockH,s.fill,s.edge,Math.random,z);const r=g.buttons[e];r&&$.beam(r.x+r.w/2,r.w*.3,r.y,g.restY,s.fill)}else nt.recordMiss(),Fe(P,X()),z=0,Ye()}function Xe(){S="result",$.clear(),$.confetti(g.w,g.h,60,Math.random);const e=nt.summary(4,2,350),t=i=>i===null?"—":`${Math.round(i)}ms`;At.textContent=[`${j.label} / ${st[u.difficulty].label}(${V()}こ) / ${at()}段${u.hideAhead?" / 先を隠す":""}`,`消した ${e.hits}  ミス ${e.misses}`,`中央値タップ間隔 ${t(e.openMedian??e.blindMedian)}`].join(`
`)}function je(e,t){if(S!=="play"&&R(yt(g.w,g.h),e,t)){ht();return}if(S==="title"){for(let l=0;l<lt.length;l++){const n=lt[l],o=vt[l];if(n&&o&&R(n,e,t)){u.difficulty=o,rt(u),L();return}}for(let l=0;l<it.length;l++){const n=it[l],o=_t[l];n&&o&&R(n,e,t)&&Ot(wt[o])}return}if(S==="result"){const l=Dt(g.w,g.h);R(l.again,e,t)?Ot(j):R(l.title,e,t)&&Yt();return}const i=be(g,e,t);i!==null&&zt(i)}et.addEventListener("pointerdown",e=>{Re(),e.preventDefault(),je(e.clientX,e.clientY)},{passive:!1});window.addEventListener("keydown",e=>{e.key==="d"&&ht();const t="12345".indexOf(e.key);t>=0&&S==="play"&&zt(t)});window.addEventListener("resize",L);const M=new bt({title:"調整",width:240});M.close();let Q=!1;function ht(){Q=!Q,M.domElement.style.display=Q?"":"none",Q&&M.open()}ht();ht();const O=e=>()=>{rt(u),e&&L(),A&&(A.fallBlocksPerSec=u.fallBlocksPerSec,A.answerCount=V(),A.maxQueue=at())};M.add(u,"bottomGapBlocks",0,1.5,.05).name("下の隙間(段)").onChange(O(!0));M.add(u,"hideAhead").name("★先を隠す(対照)").onChange(O(!1));M.add(u,"fallBlocksPerSec",2,30,1).name("ストンの速さ(段/秒)").onChange(O(!1));M.add(u,"showCount").name("数字を出す").onChange(O(!1));M.add(u,"colorAssist").name("色弱サポート(形も出す)").onChange(O(!1));M.add(u,"effectsOn").name("演出を出す").onChange(()=>{rt(u),$.enabled=u.effectsOn,u.effectsOn||$.clear()});const kt=M.addFolder("時間").close();kt.add(u,"baseSec",10,60,5).name("もち時間(秒)").onChange(O(!1));kt.add(u,"missPenaltySec",0,3,.1).name("ミスで-秒").onChange(O(!1));kt.add(u,"hitRecoverSec",0,1,.05).name("正解でもどる秒").onChange(O(!1));M.add(u,"blockScale",.08,.28,.005).name("ブロック大きさ").onChange(O(!0));M.add({f:()=>{Object.assign(u,W),We(),$.enabled=u.effectsOn,M.controllersRecursive().forEach(e=>e.updateDisplay()),Yt(),L()}},"f").name("既定に戻す");$.enabled=u.effectsOn;L();let xt=performance.now();function Wt(){const e=performance.now(),t=Math.min((e-xt)/1e3,.05);xt=e;for(let i=0;i<B.length;i++)B[i]=Math.max(0,B[i]-t*7);if(Y=Math.max(0,Y-t*7),$.update(t),S==="play"){Se(P,t),re(H,t,A,Math.random);const i=H.bottomY<A.lineY-.5;gt&&!i&&(Y=1,Be()),gt=i,Ce(P,X())&&Xe()}S==="title"?Ve(J,g,{modes:_t.map(i=>wt[i]),modeRects:it,difficulties:vt.map(i=>st[i]),difficultyRects:lt,selected:u.difficulty,notices:qe(u)}):S==="play"?Te(J,{layout:g,column:H,mode:j,session:P,sessionCfg:X(),faceOpts:Bt(),answerCount:V(),hideAhead:u.hideAhead,showCount:u.showCount,press:B,squash:Y,targetPulse:.5+.5*Math.sin(e/1100*Math.PI*2),showPointer:P.cleared===0,effects:$}):Le(J,g,P,u.showCount,$),requestAnimationFrame(Wt)}requestAnimationFrame(Wt);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register(new URL("sw.js",document.baseURI).href)});
