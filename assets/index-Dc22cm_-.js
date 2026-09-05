var Yt=Object.defineProperty;var zt=(e,t,i)=>t in e?Yt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var x=(e,t,i)=>zt(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&l(s)}).observe(document,{childList:!0,subtree:!0});function i(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function l(n){if(n.ep)return;n.ep=!0;const o=i(n);fetch(n.href,o)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class F{constructor(t,i,l,n,o="div"){this.parent=t,this.object=i,this.property=l,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(o),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(n),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),F.nextNameID=F.nextNameID||0,this.$name.id=`lil-gui-name-${++F.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",s=>s.stopPropagation()),this.domElement.addEventListener("keyup",s=>s.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(l)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("lil-disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const i=this.parent.add(this.object,this.property,t);return i.name(this._name),this.destroy(),i}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class Wt extends F{constructor(t,i,l){super(t,i,l,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function ut(e){let t,i;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?i=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),i?"#"+i:!1}const qt={isPrimitive:!0,match:e=>typeof e=="string",fromHexString:ut,toHexString:ut},z={isPrimitive:!0,match:e=>typeof e=="number",fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>"#"+e.toString(16).padStart(6,0)},Nt={isPrimitive:!1,match:e=>Array.isArray(e)||ArrayBuffer.isView(e),fromHexString(e,t,i=1){const l=z.fromHexString(e);t[0]=(l>>16&255)/255*i,t[1]=(l>>8&255)/255*i,t[2]=(l&255)/255*i},toHexString([e,t,i],l=1){l=255/l;const n=e*l<<16^t*l<<8^i*l<<0;return z.toHexString(n)}},Ut={isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,i=1){const l=z.fromHexString(e);t.r=(l>>16&255)/255*i,t.g=(l>>8&255)/255*i,t.b=(l&255)/255*i},toHexString({r:e,g:t,b:i},l=1){l=255/l;const n=e*l<<16^t*l<<8^i*l<<0;return z.toHexString(n)}},Xt=[qt,z,Nt,Ut];function jt(e){return Xt.find(t=>t.match(e))}class Gt extends F{constructor(t,i,l,n){super(t,i,l,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=jt(this.initialValue),this._rgbScale=n,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const o=ut(this.$text.value);o&&this._setValueFromHexString(o)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const i=this._format.fromHexString(t);this.setValue(i)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class at extends F{constructor(t,i,l){super(t,i,l,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",n=>{n.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Kt extends F{constructor(t,i,l,n,o,s){super(t,i,l,"lil-number"),this._initInput(),this.min(n),this.max(o);const r=s!==void 0;this.step(r?s:this._getImplicitStep(),r),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,i=!0){return this._step=t,this._stepExplicit=i,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let i=(t-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let f=parseFloat(this.$input.value);isNaN(f)||(this._stepExplicit&&(f=this._snap(f)),this.setValue(this._clamp(f)))},l=f=>{const w=parseFloat(this.$input.value);isNaN(w)||(this._snapClampSetValue(w+f),this.$input.value=this.getValue())},n=f=>{f.key==="Enter"&&this.$input.blur(),f.code==="ArrowUp"&&(f.preventDefault(),l(this._step*this._arrowKeyMultiplier(f))),f.code==="ArrowDown"&&(f.preventDefault(),l(this._step*this._arrowKeyMultiplier(f)*-1))},o=f=>{this._inputFocused&&(f.preventDefault(),l(this._step*this._normalizeMouseWheel(f)))};let s=!1,r,d,a,c,h;const m=5,g=f=>{r=f.clientX,d=a=f.clientY,s=!0,c=this.getValue(),h=0,window.addEventListener("mousemove",b),window.addEventListener("mouseup",$)},b=f=>{if(s){const w=f.clientX-r,U=f.clientY-d;Math.abs(U)>m?(f.preventDefault(),this.$input.blur(),s=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(w)>m&&$()}if(!s){const w=f.clientY-a;h-=w*this._step*this._arrowKeyMultiplier(f),c+h>this._max?h=this._max-c:c+h<this._min&&(h=this._min-c),this._snapClampSetValue(c+h)}a=f.clientY},$=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",b),window.removeEventListener("mouseup",$)},M=()=>{this._inputFocused=!0},p=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",o,{passive:!1}),this.$input.addEventListener("mousedown",g),this.$input.addEventListener("focus",M),this.$input.addEventListener("blur",p)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const t=(p,f,w,U,Bt)=>(p-f)/(w-f)*(Bt-U)+U,i=p=>{const f=this.$slider.getBoundingClientRect();let w=t(p,f.left,f.right,this._min,this._max);this._snapClampSetValue(w)},l=p=>{this._setDraggingStyle(!0),i(p.clientX),window.addEventListener("mousemove",n),window.addEventListener("mouseup",o)},n=p=>{i(p.clientX)},o=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",o)};let s=!1,r,d;const a=p=>{p.preventDefault(),this._setDraggingStyle(!0),i(p.touches[0].clientX),s=!1},c=p=>{p.touches.length>1||(this._hasScrollBar?(r=p.touches[0].clientX,d=p.touches[0].clientY,s=!0):a(p),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",m))},h=p=>{if(s){const f=p.touches[0].clientX-r,w=p.touches[0].clientY-d;Math.abs(f)>Math.abs(w)?a(p):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",m))}else p.preventDefault(),i(p.touches[0].clientX)},m=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",m)},g=this._callOnFinishChange.bind(this),b=400;let $;const M=p=>{if(Math.abs(p.deltaX)<Math.abs(p.deltaY)&&this._hasScrollBar)return;p.preventDefault();const w=this._normalizeMouseWheel(p)*this._step;this._snapClampSetValue(this.getValue()+w),this.$input.value=this.getValue(),clearTimeout($),$=setTimeout(g,b)};this.$slider.addEventListener("mousedown",l),this.$slider.addEventListener("touchstart",c,{passive:!1}),this.$slider.addEventListener("wheel",M,{passive:!1})}_setDraggingStyle(t,i="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",t),document.body.classList.toggle("lil-dragging",t),document.body.classList.toggle(`lil-${i}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:i,deltaY:l}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(i=0,l=-t.wheelDelta/120,l*=this._stepExplicit?1:10),i+-l}_arrowKeyMultiplier(t){let i=this._stepExplicit?1:10;return t.shiftKey?i*=10:t.altKey&&(i/=10),i}_snap(t){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),t-=i,t=Math.round(t/this._step)*this._step,t+=i,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Qt extends F{constructor(t,i,l,n){super(t,i,l,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(n)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(i=>{const l=document.createElement("option");l.textContent=i,this.$select.appendChild(l)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),i=this._values.indexOf(t);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?t:this._names[i],this}}class Jt extends F{constructor(t,i,l){super(t,i,l,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",n=>{n.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Zt=`.lil-gui {
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
}`;function te(e){const t=document.createElement("style");t.innerHTML=e;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(t,i):document.head.appendChild(t)}let At=!1;class gt{constructor({parent:t,autoPlace:i=t===void 0,container:l,width:n,title:o="Controls",closeFolders:s=!1,injectStyles:r=!0,touchStyles:d=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(o),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),d&&this.domElement.classList.add("lil-allow-touch-styles"),!At&&r&&(te(Zt),At=!0),l?l.appendChild(this.domElement):i&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),n&&this.domElement.style.setProperty("--width",n+"px"),this._closeFolders=s}add(t,i,l,n,o){if(Object(l)===l)return new Qt(this,t,i,l);const s=t[i];switch(typeof s){case"number":return new Kt(this,t,i,l,n,o);case"boolean":return new Wt(this,t,i);case"string":return new Jt(this,t,i);case"function":return new at(this,t,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,t,`
	value:`,s)}addColor(t,i,l=1){return new Gt(this,t,i,l)}addFolder(t){const i=new gt({parent:this,title:t});return this.root._closeFolders&&i.close(),i}load(t,i=!0){return t.controllers&&this.controllers.forEach(l=>{l instanceof at||l._name in t.controllers&&l.load(t.controllers[l._name])}),i&&t.folders&&this.folders.forEach(l=>{l._title in t.folders&&l.load(t.folders[l._title])}),this}save(t=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(l=>{if(!(l instanceof at)){if(l._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${l._name}"`);i.controllers[l._name]=l.save()}}),t&&this.folders.forEach(l=>{if(l._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${l._title}"`);i.folders[l._title]=l.save()}),i}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("lil-transition");const l=o=>{o.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",l))};this.$children.addEventListener("transitionend",l);const n=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!t),requestAnimationFrame(()=>{this.$children.style.height=n+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(l=>l.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(i=>{t=t.concat(i.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(i=>{t=t.concat(i.foldersRecursive())}),t}}function ee(e,t,i){var r,d;const l=i.length,n=(r=i[l-1])==null?void 0:r.answer,o=l>=2&&n!==void 0&&n===((d=i[l-2])==null?void 0:d.answer)?n:-1;if(o<0||e<=1)return Math.min(e-1,Math.floor(t()*e));const s=Math.min(e-2,Math.floor(t()*(e-1)));return s>=o?s+1:s}function ft(e,t,i){const l=ee(t.answerCount,i,e.queue);e.queue.push({answer:l,face:t.makeFace(l,i)})}function ie(e,t){const i={queue:[],bottomY:e.lineY,spawnAcc:0},l=e.maxQueue>0?e.maxQueue:4;for(let n=0;n<l;n++)ft(i,e,t);return i}function le(e,t,i,l){if(e.bottomY=Math.min(i.lineY,e.bottomY+i.fallBlocksPerSec*i.blockH*t),i.maxQueue>0){for(;e.queue.length<i.maxQueue;)ft(e,i,l);return}for(e.spawnAcc+=i.spawnPerSec*t;e.spawnAcc>=1;)e.spawnAcc-=1,ft(e,i,l)}function ne(e,t,i){const l=e.queue[0];return l?l.answer!==t?"miss":(e.queue.shift(),e.bottomY-=i.blockH,"hit"):"empty"}const nt={easy:{id:"easy",label:"かんたん",answerCount:3,visibleCount:3},normal:{id:"normal",label:"ふつう",answerCount:4,visibleCount:4},hard:{id:"hard",label:"むずかしい",answerCount:5,visibleCount:5}},bt=["easy","normal","hard"];function se(e){return nt[e].answerCount}function oe(e){return nt[e].visibleCount}const W=[{fill:"#ff5a5f",edge:"#c02128",gloss:"#ff9296",glyph:"#ffffff",shape:"circle",label:"あか"},{fill:"#3fa9ff",edge:"#1259a8",gloss:"#8bccff",glyph:"#ffffff",shape:"square",label:"あお"},{fill:"#ffc93c",edge:"#c07f00",gloss:"#ffe293",glyph:"#7a4b00",shape:"triangle",label:"きいろ"},{fill:"#4bd37b",edge:"#188c4a",gloss:"#9aeab7",glyph:"#ffffff",shape:"diamond",label:"みどり"},{fill:"#b072ff",edge:"#6a2cbd",gloss:"#d6b1ff",glyph:"#ffffff",shape:"star",label:"むらさき"}],xt={fill:"#efe0c6",edge:"#b09166",gloss:"#fff4de",glyph:"#6b5330"},re="#dcefff",ae="#fff4e2",B="#4a3a24",vt="rgba(74,58,36,0.55)",E="ui-rounded, 'Hiragino Maru Gothic ProN', 'Hiragino Sans', -apple-system, BlinkMacSystemFont, 'Noto Sans JP', sans-serif";function he(e,t,i,l,n){switch(e.beginPath(),t){case"circle":e.arc(i,l,n,0,Math.PI*2);break;case"square":e.rect(i-n*.85,l-n*.85,n*1.7,n*1.7);break;case"triangle":kt(e,i,l+n*.12,n*1.12,3,-Math.PI/2);break;case"diamond":kt(e,i,l,n*1.14,4,-Math.PI/2);break;case"star":de(e,i,l,n*1.16,n*.5,5);break}e.closePath()}function kt(e,t,i,l,n,o){for(let s=0;s<n;s++){const r=o+s*Math.PI*2/n,d=t+Math.cos(r)*l,a=i+Math.sin(r)*l;s===0?e.moveTo(d,a):e.lineTo(d,a)}}function de(e,t,i,l,n,o){for(let s=0;s<o*2;s++){const r=s%2===0?l:n,d=-Math.PI/2+s*Math.PI/o,a=t+Math.cos(d)*r,c=i+Math.sin(d)*r;s===0?e.moveTo(a,c):e.lineTo(a,c)}}function y(e,t,i,l,n,o){const s=Math.max(0,Math.min(o,l/2,n/2));e.beginPath(),e.moveTo(t+s,i),e.arcTo(t+l,i,t+l,i+n,s),e.arcTo(t+l,i+n,t,i+n,s),e.arcTo(t,i+n,t,i,s),e.arcTo(t,i,t+l,i,s),e.closePath()}const ce=3200;class ue{constructor(){x(this,"enabled",!0);x(this,"shards",[]);x(this,"beams",[])}clear(){this.shards.length=0,this.beams.length=0}get shardCount(){return this.shards.length}burst(t,i,l,n,o,s,r,d=0){if(!this.enabled)return;const a=Math.min(d,10)/10,c=7+Math.round(a*4);for(let h=0;h<c;h++){const m=h/c*Math.PI*2+r()*.6,g=90+r()*220;this.shards.push({x:t+(r()-.5)*l*.6,y:i+r()*n*.25,vx:Math.cos(m)*g,vy:Math.sin(m)*g*.55-100,rot:r()*Math.PI,vrot:(r()-.5)*14,size:Math.min(l,n)*(.14+r()*.12)*(1+a*.4),life:.42+r()*.12,maxLife:.54,fill:o,edge:s})}}beam(t,i,l,n,o){this.enabled&&this.beams.push({x:t,w:i,yFrom:l,yTo:n,life:.09,maxLife:.09,fill:o})}confetti(t,i,l,n){if(this.enabled)for(let o=0;o<l;o++){const s=W[Math.floor(n()*W.length)];this.shards.push({x:n()*t,y:-20-n()*i*.4,vx:(n()-.5)*120,vy:60+n()*160,rot:n()*Math.PI,vrot:(n()-.5)*10,size:6+n()*8,life:1.4+n()*.8,maxLife:2.2,fill:s.fill,edge:s.edge})}}update(t){for(let i=this.shards.length-1;i>=0;i--){const l=this.shards[i];if(l.life-=t,l.life<=0){this.shards.splice(i,1);continue}l.vy+=ce*t,l.x+=l.vx*t,l.y+=l.vy*t,l.rot+=l.vrot*t}for(let i=this.beams.length-1;i>=0;i--){const l=this.beams[i];l.life-=t,l.life<=0&&this.beams.splice(i,1)}}draw(t){for(const i of this.beams){const l=1-i.life/i.maxLife,n=i.yFrom+(i.yTo-i.yFrom)*l,o=Math.abs(i.yFrom-i.yTo)*.42;t.globalAlpha=.55*(1-l),t.fillStyle=i.fill,y(t,i.x-i.w/2,n-o,i.w,o,i.w/2),t.fill()}t.globalAlpha=1;for(const i of this.shards){const l=Math.min(1,i.life/(i.maxLife*.4));t.globalAlpha=l,t.save(),t.translate(i.x,i.y),t.rotate(i.rot),y(t,-i.size/2,-i.size/2,i.size,i.size,i.size*.28),t.fillStyle=i.fill,t.fill(),t.lineWidth=Math.max(1.5,i.size*.14),t.strokeStyle=i.edge,t.stroke(),t.restore()}t.globalAlpha=1}}function Tt(e,t,i,l,n,o,s=0){const r=Math.min(e,t),d=Math.min(t*.11,84),a=s+Math.max(6,t*.012),c=Math.min(t*.19,130),h=t-c-a,m=(h-d)/(n+o),g=Math.max(24,Math.min(r*l,m)),b=Math.min(e*.46,g*1.3),$=h-g*o,M=Math.max(4,e*.012),p=(e-M*(i+1))/i,f=[];for(let w=0;w<i;w++)f.push({x:M+w*(p+M),y:h+M,w:p,h:c-M*2});return{w:e,h:t,headerH:d,blockH:g,blockW:b,colX:e/2,lineY:h,restY:$,buttons:f}}function fe(e,t,i){for(let l=0;l<e.buttons.length;l++){const n=e.buttons[l];if(t>=n.x-2&&t<=n.x+n.w+2&&i>=e.lineY)return l}return null}function pe(e,t,i){const l=t*.36,n=t*.88-l,o=.28,s=Math.min(t*.13,96,n/(i*(1+o)-o)),r=s*o,d=Math.min(e*.72,340),a=i*s+(i-1)*r,c=l+(n-a)/2,h=[];for(let m=0;m<i;m++)h.push({x:(e-d)/2,y:c+m*(s+r),w:d,h:s});return h}function me(e,t,i){const l=Math.max(6,e*.022),n=Math.min((e*.86-l*(i-1))/i,120),o=Math.min(t*.065,50),s=i*n+(i-1)*l,r=(e-s)/2,d=t*.29,a=[];for(let c=0;c<i;c++)a.push({x:r+c*(n+l),y:d,w:n,h:o});return a}function ht(e,t,i){return t>=e.x&&t<=e.x+e.w&&i>=e.y&&i<=e.y+e.h}const ge=3e3;class be{constructor(){x(this,"samples",[]);x(this,"lastHitAt",null);x(this,"hits",0);x(this,"misses",0)}reset(){this.samples=[],this.lastHitAt=null,this.hits=0,this.misses=0}recordMiss(){this.misses++}recordHit(t,i,l){this.hits++;const n=this.lastHitAt;if(this.lastHitAt=t,n===null)return;const o=t-n;o>ge||this.samples.push({mode:l,depth:i,interval:o})}summary(t,i,l){const n=this.samples.filter(h=>h.mode==="open"),o=this.samples.filter(h=>h.mode==="blind"),s=X(n.map(h=>h.interval)),r=X(o.map(h=>h.interval)),d=n.filter(h=>h.depth>=t),a=n.filter(h=>h.depth<=i),c=n.filter(h=>h.interval<l).length;return{hits:this.hits,misses:this.misses,openMedian:s,blindMedian:r,lookaheadGain:s!==null&&r!==null&&s>0?r/s:null,deepMedian:X(d.map(h=>h.interval)),shallowMedian:X(a.map(h=>h.interval)),preemptRate:n.length>0?c/n.length:null}}count(t){return this.samples.filter(i=>i.mode===t).length}}function X(e){if(e.length===0)return null;const t=[...e].sort((l,n)=>l-n),i=t.length>>1;return t.length%2===1?t[i]:(t[i-1]+t[i])/2}const pt=["circle","square","triangle","diamond","star"],Pt={1:[[[1,1]],[[0,0]],[[2,2]]],2:[[[0,0],[2,2]],[[2,0],[0,2]],[[0,1],[2,1]]],3:[[[0,0],[1,1],[2,2]],[[2,0],[1,1],[0,2]],[[1,0],[0,2],[2,2]]],4:[[[0,0],[2,0],[0,2],[2,2]],[[1,0],[0,1],[2,1],[1,2]],[[0,0],[2,0],[1,1],[1,2]]],5:[[[0,0],[2,0],[1,1],[0,2],[2,2]],[[1,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[2,0],[0,1],[0,2],[2,2]]]};function ve(e,t){const i=Pt[e];return!i||i.length===0?[]:i[t%i.length]}function ye(e,t){var l;const i=((l=Pt[e])==null?void 0:l.length)??1;return Math.min(i-1,Math.floor(t()*i))}function Ct(e,t){return{color:e,shape:t.colorAssist?pt[e]??"circle":null,dots:0,layout:0,numeral:0,frame:0}}const yt={iro:{id:"iro",label:"いろ",note:"同一マッチ。色だけ。2〜3歳",maxAnswers:5,buttonFace:(e,t)=>Ct(e,t),blockFace:(e,t,i)=>Ct(e,i)},katachi:{id:"katachi",label:"かたち",note:"同一マッチ。色の手がかりを消してある。3歳",maxAnswers:5,buttonFace:e=>({color:-1,shape:pt[e]??"circle",dots:0,layout:0,numeral:0,frame:0}),blockFace:e=>({color:-1,shape:pt[e]??"circle",dots:0,layout:0,numeral:0,frame:0})},ikutsu:{id:"ikutsu",label:"いくつ",note:"変換マッチ。サイコロの目を見て数字を押す。4〜5歳",maxAnswers:5,buttonFace:e=>({color:-1,shape:null,dots:0,layout:0,numeral:e+1,frame:0}),blockFace:(e,t)=>({color:-1,shape:null,dots:e+1,layout:ye(e+1,t),numeral:0,frame:0})},hosuu:{id:"hosuu",label:"10のほすう",note:"変換マッチ。あと何個で10か。さくらんぼ算の土台。小1",maxAnswers:5,buttonFace:e=>({color:-1,shape:null,dots:0,layout:0,numeral:e+1,frame:0}),blockFace:e=>({color:-1,shape:null,dots:0,layout:0,numeral:0,frame:9-e})}},wt=["iro","katachi","ikutsu","hosuu"],V=5,dt=2;function we(e){return{elapsed:0,penalty:0,cleared:0,missed:0}}function Ht(e,t){return Math.max(0,t.baseSec-e.elapsed-e.penalty)}function _e(e,t){return Ht(e,t)<=0}function $e(e,t){e.elapsed+=t}function Me(e,t){e.cleared++,e.penalty=Math.max(0,e.penalty-t.hitRecoverSec)}function Ae(e,t){e.missed++,e.penalty+=t.missPenaltySec}const Q="rgba(74,58,36,0.20)";function ke(e,t){const{layout:i,column:l,mode:n}=t;_t(e,i),Ee(e,i,t);const o=i.blockW*1.34;y(e,i.colX-o/2,i.restY-4,o,14,7),e.fillStyle="rgba(74,58,36,0.16)",e.fill();const s=i.colX-i.blockW/2;for(let r=0;r<l.queue.length;r++){const d=l.queue[r];if(!d)continue;const a=l.bottomY-(r+1)*i.blockH;if(a>i.restY||a+i.blockH<i.headerH-i.blockH)break;let c=a,h=i.blockH;const m=r===0;if(m&&t.squash>0&&(h=i.blockH*(1-.2*t.squash),c=a+(i.blockH-h)),m){const g=i.blockW*1.09,b=i.colX-g/2;Ce(e,b,c,g,h,t.targetPulse),ct(e,b,c,g,h,d.face,!1,10),t.showPointer&&Se(e,b,c,g,h,t.targetPulse)}else ct(e,s,c,i.blockW,h,d.face,t.hideAhead)}t.effects.draw(e);for(let r=0;r<t.answerCount;r++){const d=i.buttons[r];if(!d)continue;const a=(t.press[r]??0)*5;ct(e,d.x,d.y+a,d.w,d.h,n.buttonFace(r,t.faceOpts),!1,6-a)}}function Ce(e,t,i,l,n,o){const s=5+o*4;y(e,t-s,i-s,l+s*2,n+s*2,(n+s*2)*.3),e.lineWidth=4,e.strokeStyle=`rgba(74,58,36,${.14+o*.24})`,e.stroke()}function Se(e,t,i,l,n,o){const s=i+n/2,r=Math.min(n*.3,22),d=o*r*.45;e.fillStyle="#c07000";for(const a of[-1,1]){const c=a<0?t-16-d:t+l+16+d;e.beginPath(),e.moveTo(c,s),e.lineTo(c-a*r,s-r*.6),e.lineTo(c-a*r,s+r*.6),e.closePath(),e.fill()}}function _t(e,t){const i=e.createLinearGradient(0,0,0,t.h);i.addColorStop(0,re),i.addColorStop(1,ae),e.fillStyle=i,e.fillRect(0,0,t.w,t.h)}function Ee(e,t,i){const l=i.session,n=Ht(l,i.sessionCfg),o=Math.max(12,t.w*.045),s=Math.max(16,t.headerH*.32),r=t.headerH*.3,d=t.w-o*2;y(e,o,r,d,s,s/2),e.fillStyle="rgba(74,58,36,0.12)",e.fill();const a=Math.max(0,Math.min(1,n/i.sessionCfg.baseSec));if(a>0){const c=Math.max(s,d*a),h=n<=5?"#ff5a5f":n<=12?"#ffab2e":"#4bd37b",m=n<=5?"#c02128":n<=12?"#c07000":"#188c4a";y(e,o,r,c,s,s/2),e.fillStyle=h,e.fill(),e.lineWidth=3,e.strokeStyle=m,e.stroke(),y(e,o+s*.25,r+s*.18,c-s*.5,s*.26,s*.13),e.fillStyle="rgba(255,255,255,0.42)",e.fill()}i.showCount&&(e.textBaseline="top",e.font=`700 ${Math.round(t.headerH*.3)}px ${E}`,e.fillStyle=vt,e.textAlign="left",e.fillText(`${Math.ceil(n)}`,o+2,r+s+5),e.fillStyle=B,e.textAlign="right",e.fillText(`${l.cleared}こ`,t.w-o-2,r+s+5))}function ct(e,t,i,l,n,o,s,r=6){const d=Math.min(l,n)*.26,a=2;r>0&&(y(e,t+a,i+a+r,l-a*2,n-a*2,d),e.fillStyle=Q,e.fill());const c=s?{fill:"#d9cdb8",edge:"#a8977c",gloss:"#efe6d5",glyph:"#a8977c"}:o.color>=0?W[o.color]:xt;y(e,t+a,i+a,l-a*2,n-a*2,d),e.fillStyle=c.fill,e.fill(),e.save(),e.clip(),y(e,t+a,i+a,l-a*2,(n-a*2)*.44,d),e.fillStyle=c.gloss,e.globalAlpha=.42,e.fill(),e.restore(),e.globalAlpha=1,y(e,t+a,i+a,l-a*2,n-a*2,d),e.lineWidth=Math.max(3,Math.min(l,n)*.075),e.strokeStyle=c.edge,e.stroke(),s||Fe(e,o,t+l/2,i+n/2,l-a*2,n-a*2,c.glyph)}function Fe(e,t,i,l,n,o,s){const r=Math.min(n,o);if(e.fillStyle=s,t.frame>0){Oe(e,t.frame,i,l,n,o,s);return}if(t.numeral>0){e.textAlign="center",e.textBaseline="middle",e.font=`800 ${Math.round(r*.6)}px ${E}`,e.fillText(String(t.numeral),i,l+r*.04);return}if(t.shape){he(e,t.shape,i,l,r*.25),e.fill();return}if(t.dots>0){const d=r*.26,a=r*.098;for(const[c,h]of ve(t.dots,t.layout))e.beginPath(),e.arc(i+(c-1)*d,l+(h-1)*d,a,0,Math.PI*2),e.fill()}}function Oe(e,t,i,l,n,o,s){const r=n*.84,d=Math.min(o*.68,r/V*dt*1.2),a=i-r/2,c=l-d/2,h=r/V,m=d/dt,g=Math.min(h,m)*.3;y(e,a,c,r,d,Math.min(h,m)*.28),e.lineWidth=Math.max(2,Math.min(n,o)*.026),e.strokeStyle=s,e.globalAlpha=.5,e.stroke(),e.globalAlpha=1;for(let b=0;b<V*dt;b++){const $=a+b%V*h+h/2,M=c+Math.floor(b/V)*m+m/2;e.beginPath(),e.arc($,M,g,0,Math.PI*2),b<t?(e.fillStyle=s,e.fill()):(e.lineWidth=Math.max(1.5,g*.32),e.strokeStyle=s,e.globalAlpha=.34,e.stroke(),e.globalAlpha=1)}}function xe(e,t,i){_t(e,t),e.textAlign="center",e.textBaseline="middle",e.fillStyle=B,e.font=`800 ${Math.round(Math.min(t.w*.115,50))}px ${E}`,e.fillText("みつけてポン",t.w/2,t.h*.16);for(let l=0;l<i.difficulties.length;l++){const n=i.difficultyRects[l],o=i.difficulties[l];if(!n||!o)continue;const s=o.id===i.selected;y(e,n.x,n.y,n.w,n.h,n.h*.42),e.fillStyle=s?B:"rgba(255,255,255,0.66)",e.fill(),e.lineWidth=3,e.strokeStyle=s?B:"rgba(74,58,36,0.22)",e.stroke(),e.fillStyle=s?"#fff6e6":vt,e.font=`700 ${Math.round(Math.min(n.h*.38,n.w*.21))}px ${E}`,e.fillText(o.label,n.x+n.w/2,n.y+n.h/2)}for(let l=0;l<i.modes.length;l++){const n=i.modeRects[l],o=i.modes[l];if(!n||!o)continue;const s=W[l];y(e,n.x,n.y+7,n.w,n.h,n.h*.32),e.fillStyle=Q,e.fill(),y(e,n.x,n.y,n.w,n.h,n.h*.32),e.fillStyle=s.fill,e.fill(),e.save(),e.clip(),y(e,n.x,n.y,n.w,n.h*.44,n.h*.32),e.globalAlpha=.4,e.fillStyle=s.gloss,e.fill(),e.restore(),e.globalAlpha=1,y(e,n.x,n.y,n.w,n.h,n.h*.32),e.lineWidth=4,e.strokeStyle=s.edge,e.stroke(),e.fillStyle="#ffffff",e.font=`800 ${Math.round(n.h*.44)}px ${E}`,e.fillText(o.label,n.x+n.w/2,n.y+n.h/2)}if(i.notices.length>0){const l=Math.round(Math.min(t.w*.038,15));e.font=`700 ${l}px ${E}`;const n=t.h-Math.max(14,t.h*.03);e.fillStyle="#c07000",e.fillText("⚙ きてい以外の設定",t.w/2,n-l*1.5*i.notices.length),e.fillStyle="rgba(192,112,0,0.75)",i.notices.forEach((o,s)=>{e.fillText(o,t.w/2,n-l*1.5*(i.notices.length-1-s))})}}function Te(e,t,i,l,n){_t(e,t),e.textAlign="center",e.textBaseline="middle",e.fillStyle=B,e.font=`800 ${Math.round(Math.min(t.w*.1,42))}px ${E}`,e.fillText("よくできました",t.w/2,t.h*.24);const o=t.w/2,s=t.h*.47,r=Math.min(t.w*.3,t.h*.17);if(e.beginPath(),e.arc(o,s+7,r,0,Math.PI*2),e.fillStyle=Q,e.fill(),e.beginPath(),e.arc(o,s,r,0,Math.PI*2),e.fillStyle="#ffc93c",e.fill(),e.lineWidth=6,e.strokeStyle="#c07f00",e.stroke(),l)e.fillStyle="#7a4b00",e.font=`800 ${Math.round(r*1)}px ${E}`,e.fillText(`${i.cleared}`,o,s),e.fillStyle=vt,e.font=`700 ${Math.round(Math.min(t.w*.05,20))}px ${E}`,e.fillText(`ミス ${i.missed}`,o,s+r+26);else{const m=Math.min(i.cleared,40),g=Math.min(t.w*.024,12),b=8;for(let $=0;$<m;$++){const M=o+($%b-(b-1)/2)*g*2.6,p=s-r*.5+Math.floor($/b)*g*2.7;e.beginPath(),e.arc(M,p,g,0,Math.PI*2),e.fillStyle="#7a4b00",e.fill()}}n.draw(e);const d=Math.min(t.w*.6,280),a=Math.min(t.h*.09,68),c=(t.w-d)/2,h=t.h*.78;y(e,c,h+7,d,a,a*.36),e.fillStyle=Q,e.fill(),y(e,c,h,d,a,a*.36),e.fillStyle="#4bd37b",e.fill(),e.lineWidth=4,e.strokeStyle="#188c4a",e.stroke(),e.fillStyle="#ffffff",e.font=`800 ${Math.round(a*.42)}px ${E}`,e.fillText("もういちど",t.w/2,h+a/2)}function Pe(e){const t=Math.min(e.w*.6,280),i=Math.min(e.h*.09,68);return{x:(e.w-t)/2,y:e.h*.78,w:t,h:i}}let _=null,J=null;function He(){if(_)return;const e=window.AudioContext??window.webkitAudioContext;if(!e)return;_=new e,_.resume();const t=Math.floor(_.sampleRate*.25);J=_.createBuffer(1,t,_.sampleRate);const i=J.getChannelData(0);for(let l=0;l<t;l++)i[l]=Math.random()*2-1}function Z(e,t,i,l,n){if(!_)return;const o=_.currentTime,s=_.createOscillator(),r=_.createGain();s.type=i,s.frequency.setValueAtTime(e,o),n&&s.frequency.exponentialRampToValueAtTime(n,o+t),r.gain.setValueAtTime(0,o),r.gain.linearRampToValueAtTime(l,o+.006),r.gain.exponentialRampToValueAtTime(1e-4,o+t),s.connect(r).connect(_.destination),s.start(o),s.stop(o+t+.02)}function Dt(e,t,i){if(!_||!J)return;const l=_.currentTime,n=_.createBufferSource();n.buffer=J;const o=_.createBiquadFilter();o.type="bandpass",o.frequency.setValueAtTime(i,l),o.Q.value=1.1;const s=_.createGain();s.gain.setValueAtTime(t,l),s.gain.exponentialRampToValueAtTime(1e-4,l+e),n.connect(o).connect(s).connect(_.destination),n.start(l),n.stop(l+e+.02)}function De(e){const t=Math.min(e,8),i=523*Math.pow(2,t/12);Z(i,.11,"triangle",.16),Z(i*2,.06,"sine",.05),Dt(.07,.09,1800+t*120)}function Ve(){Z(150,.09,"sine",.1,90),Dt(.04,.03,320)}function Le(){Z(330,.1,"sine",.07,250)}const Y={mode:"iro",difficulty:"easy",bottomGapBlocks:.45,fallBlocksPerSec:10,blockScale:.22,baseSec:30,missPenaltySec:.5,hitRecoverSec:.3,showCount:!0,colorAssist:!1,effectsOn:!0,hideAhead:!1},$t="mitsukete-pon.tuning.v1";function Re(){try{const e=localStorage.getItem($t);return e?{...Y,...JSON.parse(e)}:{...Y}}catch{return{...Y}}}function st(e){try{localStorage.setItem($t,JSON.stringify(e))}catch{}}function Ie(){try{localStorage.removeItem($t)}catch{}}const St={bottomGapBlocks:"下の隙間",fallBlocksPerSec:"ストンの速さ",blockScale:"ブロック大きさ",baseSec:"もち時間",missPenaltySec:"ミスで-秒",hitRecoverSec:"正解でもどる秒",showCount:"数字を出す",colorAssist:"色弱サポート",effectsOn:"演出",hideAhead:"先を隠す"};function Be(e){const t=[];for(const i of Object.keys(St))e[i]!==Y[i]&&t.push(`${St[i]}: ${String(e[i])}`);return t}const tt=document.getElementById("stage"),K=tt.getContext("2d"),Vt=document.getElementById("hud"),u=Re(),C=new ue;let S="title",v=Tt(1,1,3,.22,3,.45),et=[],it=[],N=yt[u.mode],P,k,T;const lt=new be,L=[0,0,0,0,0];let R=0,I=0,mt=!1;function H(){return se(u.difficulty)}function ot(){return oe(u.difficulty)}function Lt(){return{colorAssist:u.colorAssist}}function q(){return{baseSec:u.baseSec,missPenaltySec:u.missPenaltySec,hitRecoverSec:u.hitRecoverSec}}function Ye(){const e=getComputedStyle(document.documentElement).getPropertyValue("--sab");return Number.parseFloat(e)||0}function D(){const e=window.innerWidth,t=window.innerHeight,i=Math.min(window.devicePixelRatio||1,2);tt.width=Math.round(e*i),tt.height=Math.round(t*i),K.setTransform(i,0,0,i,0,0),v=Tt(e,t,H(),u.blockScale,ot(),u.bottomGapBlocks,Ye()),et=pe(e,t,wt.length),it=me(e,t,bt.length),k&&(k.blockH=v.blockH,k.lineY=v.restY)}function ze(){return{blockH:v.blockH,fallBlocksPerSec:u.fallBlocksPerSec,spawnPerSec:0,answerCount:H(),maxQueue:ot(),lineY:v.restY,makeFace:(e,t)=>N.blockFace(e,t,Lt())}}function Et(e){N=e,u.mode=e.id,st(u),D(),k=ze(),P=ie(k,Math.random),T=we(q()),lt.reset(),C.clear(),I=0,R=0,mt=!1,Vt.textContent="",S="play"}function Rt(e){var o;if(S!=="play"||e>=H())return;L[e]=1;const t=P.queue.length,i=(o=P.queue[0])==null?void 0:o.face,l=P.bottomY-v.blockH/2;if(ne(P,e,k)==="hit"){lt.recordHit(performance.now(),t,u.hideAhead?"blind":"open"),Me(T,q()),I++,De(I);const s=i&&i.color>=0?W[i.color]:xt;C.burst(v.colX,l,v.blockW,v.blockH,s.fill,s.edge,Math.random,I);const r=v.buttons[e];r&&C.beam(r.x+r.w/2,r.w*.3,r.y,v.restY,s.fill)}else lt.recordMiss(),Ae(T,q()),I=0,Le()}function We(){S="result",C.clear(),C.confetti(v.w,v.h,60,Math.random);const e=lt.summary(4,2,350),t=i=>i===null?"—":`${Math.round(i)}ms`;Vt.textContent=[`${N.label} / ${nt[u.difficulty].label}(${H()}こ) / ${ot()}段${u.hideAhead?" / 先を隠す":""}`,`消した ${e.hits}  ミス ${e.misses}`,`中央値タップ間隔 ${t(e.openMedian??e.blindMedian)}`].join(`
`)}let j=0,Ft=0;function qe(e,t){if(e>v.w-64&&t<64){const l=performance.now();if(j=l-Ft<800?j+1:1,Ft=l,j>=3){j=0,rt();return}}if(S==="title"){for(let l=0;l<it.length;l++){const n=it[l],o=bt[l];if(n&&o&&ht(n,e,t)){u.difficulty=o,st(u),D();return}}for(let l=0;l<et.length;l++){const n=et[l],o=wt[l];n&&o&&ht(n,e,t)&&Et(yt[o])}return}if(S==="result"){ht(Pe(v),e,t)?Et(N):S="title";return}const i=fe(v,e,t);i!==null&&Rt(i)}tt.addEventListener("pointerdown",e=>{He(),e.preventDefault(),qe(e.clientX,e.clientY)},{passive:!1});window.addEventListener("keydown",e=>{e.key==="d"&&rt();const t="12345".indexOf(e.key);t>=0&&S==="play"&&Rt(t)});window.addEventListener("resize",D);const A=new gt({title:"調整",width:240});A.close();let G=!1;function rt(){G=!G,A.domElement.style.display=G?"":"none",G&&A.open()}rt();rt();const O=e=>()=>{st(u),e&&D(),k&&(k.fallBlocksPerSec=u.fallBlocksPerSec,k.answerCount=H(),k.maxQueue=ot())};A.add(u,"bottomGapBlocks",0,1.5,.05).name("下の隙間(段)").onChange(O(!0));A.add(u,"hideAhead").name("★先を隠す(対照)").onChange(O(!1));A.add(u,"fallBlocksPerSec",2,30,1).name("ストンの速さ(段/秒)").onChange(O(!1));A.add(u,"showCount").name("数字を出す").onChange(O(!1));A.add(u,"colorAssist").name("色弱サポート(形も出す)").onChange(O(!1));A.add(u,"effectsOn").name("演出を出す").onChange(()=>{st(u),C.enabled=u.effectsOn,u.effectsOn||C.clear()});const Mt=A.addFolder("時間").close();Mt.add(u,"baseSec",10,60,5).name("もち時間(秒)").onChange(O(!1));Mt.add(u,"missPenaltySec",0,3,.1).name("ミスで-秒").onChange(O(!1));Mt.add(u,"hitRecoverSec",0,1,.05).name("正解でもどる秒").onChange(O(!1));A.add(u,"blockScale",.08,.28,.005).name("ブロック大きさ").onChange(O(!0));A.add({f:()=>{Object.assign(u,Y),Ie(),C.enabled=u.effectsOn,A.controllersRecursive().forEach(e=>e.updateDisplay()),S="title",D()}},"f").name("既定に戻す");C.enabled=u.effectsOn;D();let Ot=performance.now();function It(){const e=performance.now(),t=Math.min((e-Ot)/1e3,.05);Ot=e;for(let i=0;i<L.length;i++)L[i]=Math.max(0,L[i]-t*7);if(R=Math.max(0,R-t*7),C.update(t),S==="play"){$e(T,t),le(P,t,k,Math.random);const i=P.bottomY<k.lineY-.5;mt&&!i&&(R=1,Ve()),mt=i,_e(T,q())&&We()}S==="title"?xe(K,v,{modes:wt.map(i=>yt[i]),modeRects:et,difficulties:bt.map(i=>nt[i]),difficultyRects:it,selected:u.difficulty,notices:Be(u)}):S==="play"?ke(K,{layout:v,column:P,mode:N,session:T,sessionCfg:q(),faceOpts:Lt(),answerCount:H(),hideAhead:u.hideAhead,showCount:u.showCount,press:L,squash:R,targetPulse:.5+.5*Math.sin(e/1100*Math.PI*2),showPointer:T.cleared===0,effects:C}):Te(K,v,T,u.showCount,C),requestAnimationFrame(It)}requestAnimationFrame(It);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register(new URL("sw.js",document.baseURI).href)});
