var It=Object.defineProperty;var Bt=(e,t,i)=>t in e?It(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var O=(e,t,i)=>Bt(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class x{constructor(t,i,l,n,o="div"){this.parent=t,this.object=i,this.property=l,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(n),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),x.nextNameID=x.nextNameID||0,this.$name.id=`lil-gui-name-${++x.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",s=>s.stopPropagation()),this.domElement.addEventListener("keyup",s=>s.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(l)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("lil-disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const i=this.parent.add(this.object,this.property,t);return i.name(this._name),this.destroy(),i}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Yt extends x{constructor(t,i,l){super(t,i,l,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function dt(e){let t,i;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?i=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),i?"#"+i:!1}const zt={isPrimitive:!0,match:e=>typeof e=="string",fromHexString:dt,toHexString:dt},Y={isPrimitive:!0,match:e=>typeof e=="number",fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>"#"+e.toString(16).padStart(6,0)},qt={isPrimitive:!1,match:e=>Array.isArray(e)||ArrayBuffer.isView(e),fromHexString(e,t,i=1){const l=Y.fromHexString(e);t[0]=(l>>16&255)/255*i,t[1]=(l>>8&255)/255*i,t[2]=(l&255)/255*i},toHexString([e,t,i],l=1){l=255/l;const n=e*l<<16^t*l<<8^i*l<<0;return Y.toHexString(n)}},Nt={isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,i=1){const l=Y.fromHexString(e);t.r=(l>>16&255)/255*i,t.g=(l>>8&255)/255*i,t.b=(l&255)/255*i},toHexString({r:e,g:t,b:i},l=1){l=255/l;const n=e*l<<16^t*l<<8^i*l<<0;return Y.toHexString(n)}},Wt=[zt,Y,qt,Nt];function Ut(e){return Wt.find(t=>t.match(e))}class Xt extends x{constructor(t,i,l,n){super(t,i,l,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Ut(this.initialValue),this._rgbScale=n,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=dt(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const i=this._format.fromHexString(t);this.setValue(i)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class rt extends x{constructor(t,i,l){super(t,i,l,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",n=>{n.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class jt extends x{constructor(t,i,l,n,o,s){super(t,i,l,"lil-number"),this._initInput(),this.min(n),this.max(o);const r=s!==void 0;this.step(r?s:this._getImplicitStep(),r),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,i=!0){return this._step=t,this._stepExplicit=i,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let i=(t-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let f=parseFloat(this.$input.value);isNaN(f)||(this._stepExplicit&&(f=this._snap(f)),this.setValue(this._clamp(f)))},l=f=>{const v=parseFloat(this.$input.value);isNaN(v)||(this._snapClampSetValue(v+f),this.$input.value=this.getValue())},n=f=>{f.key==="Enter"&&this.$input.blur(),f.code==="ArrowUp"&&(f.preventDefault(),l(this._step*this._arrowKeyMultiplier(f))),f.code==="ArrowDown"&&(f.preventDefault(),l(this._step*this._arrowKeyMultiplier(f)*-1))},o=f=>{this._inputFocused&&(f.preventDefault(),l(this._step*this._normalizeMouseWheel(f)))};let s=!1,r,h,a,c,d;const b=5,m=f=>{r=f.clientX,h=a=f.clientY,s=!0,c=this.getValue(),d=0,window.addEventListener("mousemove",_),window.addEventListener("mouseup",$)},_=f=>{if(s){const v=f.clientX-r,W=f.clientY-h;Math.abs(W)>b?(f.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(v)>b&&$()}if(!s){const v=f.clientY-a;d-=v*this._step*this._arrowKeyMultiplier(f),c+d>this._max?d=this._max-c:c+d<this._min&&(d=this._min-c),this._snapClampSetValue(c+d)}a=f.clientY},$=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",_),window.removeEventListener("mouseup",$)},k=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",m),this.$input.addEventListener("focus",k),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const t=(p,f,v,W,Rt)=>(p-f)/(v-f)*(Rt-W)+W,i=p=>{const f=this.$slider.getBoundingClientRect();let v=t(p,f.left,f.right,this._min,this._max);this._snapClampSetValue(v)},l=p=>{this._setDraggingStyle(!0),i(p.clientX),window.addEventListener("mousemove",n),window.addEventListener("mouseup",o)},n=p=>{i(p.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",o)};let s=!1,r,h;const a=p=>{p.preventDefault(),this._setDraggingStyle(!0),i(p.touches[0].clientX),s=!1},c=p=>{p.touches.length>1||(this._hasScrollBar?(r=p.touches[0].clientX,h=p.touches[0].clientY,s=!0):a(p),window.addEventListener("touchmove",d,{passive:!1}),window.addEventListener("touchend",b))},d=p=>{if(s){const f=p.touches[0].clientX-r,v=p.touches[0].clientY-h;Math.abs(f)>Math.abs(v)?a(p):(window.removeEventListener("touchmove",d),window.removeEventListener("touchend",b))}else p.preventDefault(),i(p.touches[0].clientX)},b=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",d),window.removeEventListener("touchend",b)},m=this._callOnFinishChange.bind(this),_=400;let $;const k=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const v=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+v),this.$input.value=this.getValue(),clearTimeout($),$=setTimeout(m,_)};this.$slider.addEventListener("mousedown",l),this.$slider.addEventListener("touchstart",c,{passive:!1}),this.$slider.addEventListener("wheel",k,{passive:!1})}_setDraggingStyle(t,i="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",t),document.body.classList.toggle("lil-dragging",t),document.body.classList.toggle(`lil-${i}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:i,deltaY:l}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(i=0,l=-t.wheelDelta/120,l*=this._stepExplicit?1:10),i+-l}_arrowKeyMultiplier(t){let i=this._stepExplicit?1:10;return t.shiftKey?i*=10:t.altKey&&(i/=10),i}_snap(t){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),t-=i,t=Math.round(t/this._step)*this._step,t+=i,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Gt extends x{constructor(t,i,l,n){super(t,i,l,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(n)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(i=>{const l=document.createElement("option");l.textContent=i,this.$select.appendChild(l)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),i=this._values.indexOf(t);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?t:this._names[i],this}}class Kt extends x{constructor(t,i,l){super(t,i,l,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",n=>{n.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Qt=`.lil-gui {
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
}`;function Jt(e){const t=document.createElement("style");t.innerHTML=e;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(t,i):document.head.appendChild(t)}let $t=!1;class pt{constructor({parent:t,autoPlace:i=t===void 0,container:l,width:n,title:o="Controls",closeFolders:s=!1,injectStyles:r=!0,touchStyles:h=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),h&&this.domElement.classList.add("lil-allow-touch-styles"),!$t&&r&&(Jt(Qt),$t=!0),l?l.appendChild(this.domElement):i&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),n&&this.domElement.style.setProperty("--width",n+"px"),this._closeFolders=s}add(t,i,l,n,o){if(Object(l)===l)return new Gt(this,t,i,l);const s=t[i];switch(typeof s){case"number":return new jt(this,t,i,l,n,o);case"boolean":return new Yt(this,t,i);case"string":return new Kt(this,t,i);case"function":return new rt(this,t,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,t,`
	value:`,s)}addColor(t,i,l=1){return new Xt(this,t,i,l)}addFolder(t){const i=new pt({parent:this,title:t});return this.root._closeFolders&&i.close(),i}load(t,i=!0){return t.controllers&&this.controllers.forEach(l=>{l instanceof rt||l._name in t.controllers&&l.load(t.controllers[l._name])}),i&&t.folders&&this.folders.forEach(l=>{l._title in t.folders&&l.load(t.folders[l._title])}),this}save(t=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(l=>{if(!(l instanceof rt)){if(l._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${l._name}"`);i.controllers[l._name]=l.save()}}),t&&this.folders.forEach(l=>{if(l._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${l._title}"`);i.folders[l._title]=l.save()}),i}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("lil-transition");const l=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",l))};this.$children.addEventListener("transitionend",l);const n=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!t),requestAnimationFrame(()=>{this.$children.style.height=n+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(l=>l.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(i=>{t=t.concat(i.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(i=>{t=t.concat(i.foldersRecursive())}),t}}function Zt(e,t,i){var r,h;const l=i.length,n=(r=i[l-1])==null?void 0:r.answer,o=l>=2&&n!==void 0&&n===((h=i[l-2])==null?void 0:h.answer)?n:-1;if(o<0||e<=1)return Math.min(e-1,Math.floor(t()*e));const s=Math.min(e-2,Math.floor(t()*(e-1)));return s>=o?s+1:s}function ct(e,t,i){const l=Zt(t.answerCount,i,e.queue);e.queue.push({answer:l,face:t.makeFace(l,i)})}function te(e,t){const i={queue:[],bottomY:e.lineY,spawnAcc:0},l=e.maxQueue>0?e.maxQueue:4;for(let n=0;n<l;n++)ct(i,e,t);return i}function ee(e,t,i,l){if(e.bottomY=Math.min(i.lineY,e.bottomY+i.fallBlocksPerSec*i.blockH*t),i.maxQueue>0){for(;e.queue.length<i.maxQueue;)ct(e,i,l);return}for(e.spawnAcc+=i.spawnPerSec*t;e.spawnAcc>=1;)e.spawnAcc-=1,ct(e,i,l)}function ie(e,t,i){const l=e.queue[0];return l?l.answer!==t?"miss":(e.queue.shift(),e.bottomY-=i.blockH,"hit"):"empty"}const lt={easy:{id:"easy",label:"かんたん",answerCount:3,visibleCount:3},normal:{id:"normal",label:"ふつう",answerCount:4,visibleCount:4},hard:{id:"hard",label:"むずかしい",answerCount:5,visibleCount:5}},mt=["easy","normal","hard"];function le(e){return lt[e].answerCount}function ne(e){return lt[e].visibleCount}const z=[{fill:"#ff5a5f",edge:"#c02128",gloss:"#ff9296",glyph:"#ffffff",shape:"circle",label:"あか"},{fill:"#3fa9ff",edge:"#1259a8",gloss:"#8bccff",glyph:"#ffffff",shape:"square",label:"あお"},{fill:"#ffc93c",edge:"#c07f00",gloss:"#ffe293",glyph:"#7a4b00",shape:"triangle",label:"きいろ"},{fill:"#4bd37b",edge:"#188c4a",gloss:"#9aeab7",glyph:"#ffffff",shape:"diamond",label:"みどり"},{fill:"#b072ff",edge:"#6a2cbd",gloss:"#d6b1ff",glyph:"#ffffff",shape:"star",label:"むらさき"}],xt={fill:"#efe0c6",edge:"#b09166",gloss:"#fff4de",glyph:"#6b5330"},se="#dcefff",oe="#fff4e2",I="#4a3a24",gt="rgba(74,58,36,0.55)",E="ui-rounded, 'Hiragino Maru Gothic ProN', 'Hiragino Sans', -apple-system, BlinkMacSystemFont, 'Noto Sans JP', sans-serif";function re(e,t,i,l,n){switch(e.beginPath(),t){case"circle":e.arc(i,l,n,0,Math.PI*2);break;case"square":e.rect(i-n*.85,l-n*.85,n*1.7,n*1.7);break;case"triangle":At(e,i,l+n*.12,n*1.12,3,-Math.PI/2);break;case"diamond":At(e,i,l,n*1.14,4,-Math.PI/2);break;case"star":ae(e,i,l,n*1.16,n*.5,5);break}e.closePath()}function At(e,t,i,l,n,o){for(let s=0;s<n;s++){const r=o+s*Math.PI*2/n,h=t+Math.cos(r)*l,a=i+Math.sin(r)*l;s===0?e.moveTo(h,a):e.lineTo(h,a)}}function ae(e,t,i,l,n,o){for(let s=0;s<o*2;s++){const r=s%2===0?l:n,h=-Math.PI/2+s*Math.PI/o,a=t+Math.cos(h)*r,c=i+Math.sin(h)*r;s===0?e.moveTo(a,c):e.lineTo(a,c)}}function y(e,t,i,l,n,o){const s=Math.max(0,Math.min(o,l/2,n/2));e.beginPath(),e.moveTo(t+s,i),e.arcTo(t+l,i,t+l,i+n,s),e.arcTo(t+l,i+n,t,i+n,s),e.arcTo(t,i+n,t,i,s),e.arcTo(t,i,t+l,i,s),e.closePath()}const he=3200;class de{constructor(){O(this,"enabled",!0);O(this,"shards",[]);O(this,"beams",[])}clear(){this.shards.length=0,this.beams.length=0}get shardCount(){return this.shards.length}burst(t,i,l,n,o,s,r,h=0){if(!this.enabled)return;const a=Math.min(h,10)/10,c=7+Math.round(a*4);for(let d=0;d<c;d++){const b=d/c*Math.PI*2+r()*.6,m=90+r()*220;this.shards.push({x:t+(r()-.5)*l*.6,y:i+r()*n*.25,vx:Math.cos(b)*m,vy:Math.sin(b)*m*.55-100,rot:r()*Math.PI,vrot:(r()-.5)*14,size:Math.min(l,n)*(.14+r()*.12)*(1+a*.4),life:.42+r()*.12,maxLife:.54,fill:o,edge:s})}}beam(t,i,l,n,o){this.enabled&&this.beams.push({x:t,w:i,yFrom:l,yTo:n,life:.09,maxLife:.09,fill:o})}confetti(t,i,l,n){if(this.enabled)for(let o=0;o<l;o++){const s=z[Math.floor(n()*z.length)];this.shards.push({x:n()*t,y:-20-n()*i*.4,vx:(n()-.5)*120,vy:60+n()*160,rot:n()*Math.PI,vrot:(n()-.5)*10,size:6+n()*8,life:1.4+n()*.8,maxLife:2.2,fill:s.fill,edge:s.edge})}}update(t){for(let i=this.shards.length-1;i>=0;i--){const l=this.shards[i];if(l.life-=t,l.life<=0){this.shards.splice(i,1);continue}l.vy+=he*t,l.x+=l.vx*t,l.y+=l.vy*t,l.rot+=l.vrot*t}for(let i=this.beams.length-1;i>=0;i--){const l=this.beams[i];l.life-=t,l.life<=0&&this.beams.splice(i,1)}}draw(t){for(const i of this.beams){const l=1-i.life/i.maxLife,n=i.yFrom+(i.yTo-i.yFrom)*l,o=Math.abs(i.yFrom-i.yTo)*.42;t.globalAlpha=.55*(1-l),t.fillStyle=i.fill,y(t,i.x-i.w/2,n-o,i.w,o,i.w/2),t.fill()}t.globalAlpha=1;for(const i of this.shards){const l=Math.min(1,i.life/(i.maxLife*.4));t.globalAlpha=l,t.save(),t.translate(i.x,i.y),t.rotate(i.rot),y(t,-i.size/2,-i.size/2,i.size,i.size,i.size*.28),t.fillStyle=i.fill,t.fill(),t.lineWidth=Math.max(1.5,i.size*.14),t.strokeStyle=i.edge,t.stroke(),t.restore()}t.globalAlpha=1}}function Ft(e,t,i,l,n,o,s=0){const r=Math.min(e,t),h=Math.min(t*.11,84),a=s+Math.max(6,t*.012),c=Math.min(t*.19,130),d=t-c-a,b=(d-h)/(n+o),m=Math.max(24,Math.min(r*l,b)),_=Math.min(e*.46,m*1.3),$=d-m*o,k=Math.max(4,e*.012),p=(e-k*(i+1))/i,f=[];for(let v=0;v<i;v++)f.push({x:k+v*(p+k),y:d+k,w:p,h:c-k*2});return{w:e,h:t,headerH:h,blockH:m,blockW:_,colX:e/2,lineY:d,restY:$,buttons:f}}function ce(e,t,i){for(let l=0;l<e.buttons.length;l++){const n=e.buttons[l];if(t>=n.x-2&&t<=n.x+n.w+2&&i>=e.lineY)return l}return null}function ue(e,t,i){const l=Math.min(e*.72,340),n=Math.min(t*.13,96),o=n*.28,s=i*n+(i-1)*o,r=t*.5-s/2+t*.08,h=[];for(let a=0;a<i;a++)h.push({x:(e-l)/2,y:r+a*(n+o),w:l,h:n});return h}function fe(e,t,i){const l=Math.max(6,e*.022),n=Math.min((e*.86-l*(i-1))/i,120),o=Math.min(t*.065,50),s=i*n+(i-1)*l,r=(e-s)/2,h=t*.29,a=[];for(let c=0;c<i;c++)a.push({x:r+c*(n+l),y:h,w:n,h:o});return a}function at(e,t,i){return t>=e.x&&t<=e.x+e.w&&i>=e.y&&i<=e.y+e.h}const pe=3e3;class me{constructor(){O(this,"samples",[]);O(this,"lastHitAt",null);O(this,"hits",0);O(this,"misses",0)}reset(){this.samples=[],this.lastHitAt=null,this.hits=0,this.misses=0}recordMiss(){this.misses++}recordHit(t,i,l){this.hits++;const n=this.lastHitAt;if(this.lastHitAt=t,n===null)return;const o=t-n;o>pe||this.samples.push({mode:l,depth:i,interval:o})}summary(t,i,l){const n=this.samples.filter(d=>d.mode==="open"),o=this.samples.filter(d=>d.mode==="blind"),s=U(n.map(d=>d.interval)),r=U(o.map(d=>d.interval)),h=n.filter(d=>d.depth>=t),a=n.filter(d=>d.depth<=i),c=n.filter(d=>d.interval<l).length;return{hits:this.hits,misses:this.misses,openMedian:s,blindMedian:r,lookaheadGain:s!==null&&r!==null&&s>0?r/s:null,deepMedian:U(h.map(d=>d.interval)),shallowMedian:U(a.map(d=>d.interval)),preemptRate:n.length>0?c/n.length:null}}count(t){return this.samples.filter(i=>i.mode===t).length}}function U(e){if(e.length===0)return null;const t=[...e].sort((l,n)=>l-n),i=t.length>>1;return t.length%2===1?t[i]:(t[i-1]+t[i])/2}const ut=["circle","square","triangle","diamond","star"],Ot={1:[[[1,1]],[[0,0]],[[2,2]]],2:[[[0,0],[2,2]],[[2,0],[0,2]],[[0,1],[2,1]]],3:[[[0,0],[1,1],[2,2]],[[2,0],[1,1],[0,2]],[[1,0],[0,2],[2,2]]],4:[[[0,0],[2,0],[0,2],[2,2]],[[1,0],[0,1],[2,1],[1,2]],[[0,0],[2,0],[1,1],[1,2]]],5:[[[0,0],[2,0],[1,1],[0,2],[2,2]],[[1,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[2,0],[0,1],[0,2],[2,2]]]};function ge(e,t){const i=Ot[e];return!i||i.length===0?[]:i[t%i.length]}function be(e,t){var l;const i=((l=Ot[e])==null?void 0:l.length)??1;return Math.min(i-1,Math.floor(t()*i))}function Mt(e,t){return{color:e,shape:t.colorAssist?ut[e]??"circle":null,dots:0,layout:0,numeral:0}}const bt={iro:{id:"iro",label:"いろ",note:"同一マッチ。色だけ。2〜3歳",maxAnswers:5,buttonFace:(e,t)=>Mt(e,t),blockFace:(e,t,i)=>Mt(e,i)},katachi:{id:"katachi",label:"かたち",note:"同一マッチ。色の手がかりを消してある。3歳",maxAnswers:5,buttonFace:e=>({color:-1,shape:ut[e]??"circle",dots:0,layout:0,numeral:0}),blockFace:e=>({color:-1,shape:ut[e]??"circle",dots:0,layout:0,numeral:0})},ikutsu:{id:"ikutsu",label:"いくつ",note:"変換マッチ。サイコロの目を見て数字を押す。4〜5歳",maxAnswers:5,buttonFace:e=>({color:-1,shape:null,dots:0,layout:0,numeral:e+1}),blockFace:(e,t)=>({color:-1,shape:null,dots:e+1,layout:be(e+1,t),numeral:0})}},vt=["iro","katachi","ikutsu"];function ve(e){return{elapsed:0,penalty:0,cleared:0,missed:0}}function Tt(e,t){return Math.max(0,t.baseSec-e.elapsed-e.penalty)}function ye(e,t){return Tt(e,t)<=0}function we(e,t){e.elapsed+=t}function _e(e,t){e.cleared++,e.penalty=Math.max(0,e.penalty-t.hitRecoverSec)}function $e(e,t){e.missed++,e.penalty+=t.missPenaltySec}const K="rgba(74,58,36,0.20)";function Ae(e,t){const{layout:i,column:l,mode:n}=t;yt(e,i),ke(e,i,t);const o=i.blockW*1.34;y(e,i.colX-o/2,i.restY-4,o,14,7),e.fillStyle="rgba(74,58,36,0.16)",e.fill();const s=i.colX-i.blockW/2;for(let r=0;r<l.queue.length;r++){const h=l.queue[r];if(!h)continue;const a=l.bottomY-(r+1)*i.blockH;if(a>i.restY||a+i.blockH<i.headerH-i.blockH)break;let c=a,d=i.blockH;const b=r===0;if(b&&t.squash>0&&(d=i.blockH*(1-.2*t.squash),c=a+(i.blockH-d)),b){const m=i.blockW*1.09,_=i.colX-m/2;Me(e,_,c,m,d,t.targetPulse),ht(e,_,c,m,d,h.face,!1,10),t.showPointer&&Ce(e,_,c,m,d,t.targetPulse)}else ht(e,s,c,i.blockW,d,h.face,t.hideAhead)}t.effects.draw(e);for(let r=0;r<t.answerCount;r++){const h=i.buttons[r];if(!h)continue;const a=(t.press[r]??0)*5;ht(e,h.x,h.y+a,h.w,h.h,n.buttonFace(r,t.faceOpts),!1,6-a)}}function Me(e,t,i,l,n,o){const s=5+o*4;y(e,t-s,i-s,l+s*2,n+s*2,(n+s*2)*.3),e.lineWidth=4,e.strokeStyle=`rgba(74,58,36,${.14+o*.24})`,e.stroke()}function Ce(e,t,i,l,n,o){const s=i+n/2,r=Math.min(n*.3,22),h=o*r*.45;e.fillStyle="#c07000";for(const a of[-1,1]){const c=a<0?t-16-h:t+l+16+h;e.beginPath(),e.moveTo(c,s),e.lineTo(c-a*r,s-r*.6),e.lineTo(c-a*r,s+r*.6),e.closePath(),e.fill()}}function yt(e,t){const i=e.createLinearGradient(0,0,0,t.h);i.addColorStop(0,se),i.addColorStop(1,oe),e.fillStyle=i,e.fillRect(0,0,t.w,t.h)}function ke(e,t,i){const l=i.session,n=Tt(l,i.sessionCfg),o=Math.max(12,t.w*.045),s=Math.max(16,t.headerH*.32),r=t.headerH*.3,h=t.w-o*2;y(e,o,r,h,s,s/2),e.fillStyle="rgba(74,58,36,0.12)",e.fill();const a=Math.max(0,Math.min(1,n/i.sessionCfg.baseSec));if(a>0){const c=Math.max(s,h*a),d=n<=5?"#ff5a5f":n<=12?"#ffab2e":"#4bd37b",b=n<=5?"#c02128":n<=12?"#c07000":"#188c4a";y(e,o,r,c,s,s/2),e.fillStyle=d,e.fill(),e.lineWidth=3,e.strokeStyle=b,e.stroke(),y(e,o+s*.25,r+s*.18,c-s*.5,s*.26,s*.13),e.fillStyle="rgba(255,255,255,0.42)",e.fill()}i.showCount&&(e.textBaseline="top",e.font=`700 ${Math.round(t.headerH*.3)}px ${E}`,e.fillStyle=gt,e.textAlign="left",e.fillText(`${Math.ceil(n)}`,o+2,r+s+5),e.fillStyle=I,e.textAlign="right",e.fillText(`${l.cleared}こ`,t.w-o-2,r+s+5))}function ht(e,t,i,l,n,o,s,r=6){const h=Math.min(l,n)*.26,a=2;r>0&&(y(e,t+a,i+a+r,l-a*2,n-a*2,h),e.fillStyle=K,e.fill());const c=s?{fill:"#d9cdb8",edge:"#a8977c",gloss:"#efe6d5",glyph:"#a8977c"}:o.color>=0?z[o.color]:xt;y(e,t+a,i+a,l-a*2,n-a*2,h),e.fillStyle=c.fill,e.fill(),e.save(),e.clip(),y(e,t+a,i+a,l-a*2,(n-a*2)*.44,h),e.fillStyle=c.gloss,e.globalAlpha=.42,e.fill(),e.restore(),e.globalAlpha=1,y(e,t+a,i+a,l-a*2,n-a*2,h),e.lineWidth=Math.max(3,Math.min(l,n)*.075),e.strokeStyle=c.edge,e.stroke(),s||Se(e,o,t+l/2,i+n/2,Math.min(l,n),c.glyph)}function Se(e,t,i,l,n,o){if(e.fillStyle=o,t.numeral>0){e.textAlign="center",e.textBaseline="middle",e.font=`800 ${Math.round(n*.6)}px ${E}`,e.fillText(String(t.numeral),i,l+n*.04);return}if(t.shape){re(e,t.shape,i,l,n*.25),e.fill();return}if(t.dots>0){const s=n*.26,r=n*.098;for(const[h,a]of ge(t.dots,t.layout))e.beginPath(),e.arc(i+(h-1)*s,l+(a-1)*s,r,0,Math.PI*2),e.fill()}}function Ee(e,t,i){yt(e,t),e.textAlign="center",e.textBaseline="middle",e.fillStyle=I,e.font=`800 ${Math.round(Math.min(t.w*.115,50))}px ${E}`,e.fillText("みつけてポン",t.w/2,t.h*.16);for(let l=0;l<i.difficulties.length;l++){const n=i.difficultyRects[l],o=i.difficulties[l];if(!n||!o)continue;const s=o.id===i.selected;y(e,n.x,n.y,n.w,n.h,n.h*.42),e.fillStyle=s?I:"rgba(255,255,255,0.66)",e.fill(),e.lineWidth=3,e.strokeStyle=s?I:"rgba(74,58,36,0.22)",e.stroke(),e.fillStyle=s?"#fff6e6":gt,e.font=`700 ${Math.round(Math.min(n.h*.38,n.w*.21))}px ${E}`,e.fillText(o.label,n.x+n.w/2,n.y+n.h/2)}for(let l=0;l<i.modes.length;l++){const n=i.modeRects[l],o=i.modes[l];if(!n||!o)continue;const s=z[l];y(e,n.x,n.y+7,n.w,n.h,n.h*.32),e.fillStyle=K,e.fill(),y(e,n.x,n.y,n.w,n.h,n.h*.32),e.fillStyle=s.fill,e.fill(),e.save(),e.clip(),y(e,n.x,n.y,n.w,n.h*.44,n.h*.32),e.globalAlpha=.4,e.fillStyle=s.gloss,e.fill(),e.restore(),e.globalAlpha=1,y(e,n.x,n.y,n.w,n.h,n.h*.32),e.lineWidth=4,e.strokeStyle=s.edge,e.stroke(),e.fillStyle="#ffffff",e.font=`800 ${Math.round(n.h*.44)}px ${E}`,e.fillText(o.label,n.x+n.w/2,n.y+n.h/2)}if(i.notices.length>0){const l=Math.round(Math.min(t.w*.038,15));e.font=`700 ${l}px ${E}`;const n=t.h-Math.max(14,t.h*.03);e.fillStyle="#c07000",e.fillText("⚙ きてい以外の設定",t.w/2,n-l*1.5*i.notices.length),e.fillStyle="rgba(192,112,0,0.75)",i.notices.forEach((o,s)=>{e.fillText(o,t.w/2,n-l*1.5*(i.notices.length-1-s))})}}function xe(e,t,i,l,n){yt(e,t),e.textAlign="center",e.textBaseline="middle",e.fillStyle=I,e.font=`800 ${Math.round(Math.min(t.w*.1,42))}px ${E}`,e.fillText("よくできました",t.w/2,t.h*.24);const o=t.w/2,s=t.h*.47,r=Math.min(t.w*.3,t.h*.17);if(e.beginPath(),e.arc(o,s+7,r,0,Math.PI*2),e.fillStyle=K,e.fill(),e.beginPath(),e.arc(o,s,r,0,Math.PI*2),e.fillStyle="#ffc93c",e.fill(),e.lineWidth=6,e.strokeStyle="#c07f00",e.stroke(),l)e.fillStyle="#7a4b00",e.font=`800 ${Math.round(r*1)}px ${E}`,e.fillText(`${i.cleared}`,o,s),e.fillStyle=gt,e.font=`700 ${Math.round(Math.min(t.w*.05,20))}px ${E}`,e.fillText(`ミス ${i.missed}`,o,s+r+26);else{const b=Math.min(i.cleared,40),m=Math.min(t.w*.024,12),_=8;for(let $=0;$<b;$++){const k=o+($%_-(_-1)/2)*m*2.6,p=s-r*.5+Math.floor($/_)*m*2.7;e.beginPath(),e.arc(k,p,m,0,Math.PI*2),e.fillStyle="#7a4b00",e.fill()}}n.draw(e);const h=Math.min(t.w*.6,280),a=Math.min(t.h*.09,68),c=(t.w-h)/2,d=t.h*.78;y(e,c,d+7,h,a,a*.36),e.fillStyle=K,e.fill(),y(e,c,d,h,a,a*.36),e.fillStyle="#4bd37b",e.fill(),e.lineWidth=4,e.strokeStyle="#188c4a",e.stroke(),e.fillStyle="#ffffff",e.font=`800 ${Math.round(a*.42)}px ${E}`,e.fillText("もういちど",t.w/2,d+a/2)}function Fe(e){const t=Math.min(e.w*.6,280),i=Math.min(e.h*.09,68);return{x:(e.w-t)/2,y:e.h*.78,w:t,h:i}}let w=null,Q=null;function Oe(){if(w)return;const e=window.AudioContext??window.webkitAudioContext;if(!e)return;w=new e,w.resume();const t=Math.floor(w.sampleRate*.25);Q=w.createBuffer(1,t,w.sampleRate);const i=Q.getChannelData(0);for(let l=0;l<t;l++)i[l]=Math.random()*2-1}function J(e,t,i,l,n){if(!w)return;const o=w.currentTime,s=w.createOscillator(),r=w.createGain();s.type=i,s.frequency.setValueAtTime(e,o),n&&s.frequency.exponentialRampToValueAtTime(n,o+t),r.gain.setValueAtTime(0,o),r.gain.linearRampToValueAtTime(l,o+.006),r.gain.exponentialRampToValueAtTime(1e-4,o+t),s.connect(r).connect(w.destination),s.start(o),s.stop(o+t+.02)}function Pt(e,t,i){if(!w||!Q)return;const l=w.currentTime,n=w.createBufferSource();n.buffer=Q;const o=w.createBiquadFilter();o.type="bandpass",o.frequency.setValueAtTime(i,l),o.Q.value=1.1;const s=w.createGain();s.gain.setValueAtTime(t,l),s.gain.exponentialRampToValueAtTime(1e-4,l+e),n.connect(o).connect(s).connect(w.destination),n.start(l),n.stop(l+e+.02)}function Te(e){const t=Math.min(e,8),i=523*Math.pow(2,t/12);J(i,.11,"triangle",.16),J(i*2,.06,"sine",.05),Pt(.07,.09,1800+t*120)}function Pe(){J(150,.09,"sine",.1,90),Pt(.04,.03,320)}function He(){J(330,.1,"sine",.07,250)}const B={mode:"iro",difficulty:"easy",bottomGapBlocks:.45,fallBlocksPerSec:10,blockScale:.22,baseSec:30,missPenaltySec:.5,hitRecoverSec:.3,showCount:!0,colorAssist:!1,effectsOn:!0,hideAhead:!1},wt="mitsukete-pon.tuning.v1";function De(){try{const e=localStorage.getItem(wt);return e?{...B,...JSON.parse(e)}:{...B}}catch{return{...B}}}function nt(e){try{localStorage.setItem(wt,JSON.stringify(e))}catch{}}function Ve(){try{localStorage.removeItem(wt)}catch{}}const Ct={bottomGapBlocks:"下の隙間",fallBlocksPerSec:"ストンの速さ",blockScale:"ブロック大きさ",baseSec:"もち時間",missPenaltySec:"ミスで-秒",hitRecoverSec:"正解でもどる秒",showCount:"数字を出す",colorAssist:"色弱サポート",effectsOn:"演出",hideAhead:"先を隠す"};function Le(e){const t=[];for(const i of Object.keys(Ct))e[i]!==B[i]&&t.push(`${Ct[i]}: ${String(e[i])}`);return t}const Z=document.getElementById("stage"),G=Z.getContext("2d"),Ht=document.getElementById("hud"),u=De(),C=new de;let S="title",g=Ft(1,1,3,.22,3,.45),tt=[],et=[],N=bt[u.mode],P,M,T;const it=new me,V=[0,0,0,0,0];let L=0,R=0,ft=!1;function H(){return le(u.difficulty)}function st(){return ne(u.difficulty)}function Dt(){return{colorAssist:u.colorAssist}}function q(){return{baseSec:u.baseSec,missPenaltySec:u.missPenaltySec,hitRecoverSec:u.hitRecoverSec}}function Re(){const e=getComputedStyle(document.documentElement).getPropertyValue("--sab");return Number.parseFloat(e)||0}function D(){const e=window.innerWidth,t=window.innerHeight,i=Math.min(window.devicePixelRatio||1,2);Z.width=Math.round(e*i),Z.height=Math.round(t*i),G.setTransform(i,0,0,i,0,0),g=Ft(e,t,H(),u.blockScale,st(),u.bottomGapBlocks,Re()),tt=ue(e,t,vt.length),et=fe(e,t,mt.length),M&&(M.blockH=g.blockH,M.lineY=g.restY)}function Ie(){return{blockH:g.blockH,fallBlocksPerSec:u.fallBlocksPerSec,spawnPerSec:0,answerCount:H(),maxQueue:st(),lineY:g.restY,makeFace:(e,t)=>N.blockFace(e,t,Dt())}}function kt(e){N=e,u.mode=e.id,nt(u),D(),M=Ie(),P=te(M,Math.random),T=ve(q()),it.reset(),C.clear(),R=0,L=0,ft=!1,Ht.textContent="",S="play"}function Vt(e){var o;if(S!=="play"||e>=H())return;V[e]=1;const t=P.queue.length,i=(o=P.queue[0])==null?void 0:o.face,l=P.bottomY-g.blockH/2;if(ie(P,e,M)==="hit"){it.recordHit(performance.now(),t,u.hideAhead?"blind":"open"),_e(T,q()),R++,Te(R);const s=i&&i.color>=0?z[i.color]:xt;C.burst(g.colX,l,g.blockW,g.blockH,s.fill,s.edge,Math.random,R);const r=g.buttons[e];r&&C.beam(r.x+r.w/2,r.w*.3,r.y,g.restY,s.fill)}else it.recordMiss(),$e(T,q()),R=0,He()}function Be(){S="result",C.clear(),C.confetti(g.w,g.h,60,Math.random);const e=it.summary(4,2,350),t=i=>i===null?"—":`${Math.round(i)}ms`;Ht.textContent=[`${N.label} / ${lt[u.difficulty].label}(${H()}こ) / ${st()}段${u.hideAhead?" / 先を隠す":""}`,`消した ${e.hits}  ミス ${e.misses}`,`中央値タップ間隔 ${t(e.openMedian??e.blindMedian)}`].join(`
`)}let X=0,St=0;function Ye(e,t){if(e>g.w-64&&t<64){const l=performance.now();if(X=l-St<800?X+1:1,St=l,X>=3){X=0,ot();return}}if(S==="title"){for(let l=0;l<et.length;l++){const n=et[l],o=mt[l];if(n&&o&&at(n,e,t)){u.difficulty=o,nt(u),D();return}}for(let l=0;l<tt.length;l++){const n=tt[l],o=vt[l];n&&o&&at(n,e,t)&&kt(bt[o])}return}if(S==="result"){at(Fe(g),e,t)?kt(N):S="title";return}const i=ce(g,e,t);i!==null&&Vt(i)}Z.addEventListener("pointerdown",e=>{Oe(),e.preventDefault(),Ye(e.clientX,e.clientY)},{passive:!1});window.addEventListener("keydown",e=>{e.key==="d"&&ot();const t="12345".indexOf(e.key);t>=0&&S==="play"&&Vt(t)});window.addEventListener("resize",D);const A=new pt({title:"調整",width:240});A.close();let j=!1;function ot(){j=!j,A.domElement.style.display=j?"":"none",j&&A.open()}ot();ot();const F=e=>()=>{nt(u),e&&D(),M&&(M.fallBlocksPerSec=u.fallBlocksPerSec,M.answerCount=H(),M.maxQueue=st())};A.add(u,"bottomGapBlocks",0,1.5,.05).name("下の隙間(段)").onChange(F(!0));A.add(u,"hideAhead").name("★先を隠す(対照)").onChange(F(!1));A.add(u,"fallBlocksPerSec",2,30,1).name("ストンの速さ(段/秒)").onChange(F(!1));A.add(u,"showCount").name("数字を出す").onChange(F(!1));A.add(u,"colorAssist").name("色弱サポート(形も出す)").onChange(F(!1));A.add(u,"effectsOn").name("演出を出す").onChange(()=>{nt(u),C.enabled=u.effectsOn,u.effectsOn||C.clear()});const _t=A.addFolder("時間").close();_t.add(u,"baseSec",10,60,5).name("もち時間(秒)").onChange(F(!1));_t.add(u,"missPenaltySec",0,3,.1).name("ミスで-秒").onChange(F(!1));_t.add(u,"hitRecoverSec",0,1,.05).name("正解でもどる秒").onChange(F(!1));A.add(u,"blockScale",.08,.28,.005).name("ブロック大きさ").onChange(F(!0));A.add({f:()=>{Object.assign(u,B),Ve(),C.enabled=u.effectsOn,A.controllersRecursive().forEach(e=>e.updateDisplay()),S="title",D()}},"f").name("既定に戻す");C.enabled=u.effectsOn;D();let Et=performance.now();function Lt(){const e=performance.now(),t=Math.min((e-Et)/1e3,.05);Et=e;for(let i=0;i<V.length;i++)V[i]=Math.max(0,V[i]-t*7);if(L=Math.max(0,L-t*7),C.update(t),S==="play"){we(T,t),ee(P,t,M,Math.random);const i=P.bottomY<M.lineY-.5;ft&&!i&&(L=1,Pe()),ft=i,ye(T,q())&&Be()}S==="title"?Ee(G,g,{modes:vt.map(i=>bt[i]),modeRects:tt,difficulties:mt.map(i=>lt[i]),difficultyRects:et,selected:u.difficulty,notices:Le(u)}):S==="play"?Ae(G,{layout:g,column:P,mode:N,session:T,sessionCfg:q(),faceOpts:Dt(),answerCount:H(),hideAhead:u.hideAhead,showCount:u.showCount,press:V,squash:L,targetPulse:.5+.5*Math.sin(e/1100*Math.PI*2),showPointer:T.cleared===0,effects:C}):xe(G,g,T,u.showCount,C),requestAnimationFrame(Lt)}requestAnimationFrame(Lt);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register(new URL("sw.js",document.baseURI).href)});
