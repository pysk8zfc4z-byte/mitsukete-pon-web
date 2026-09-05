var ft=Object.defineProperty;var pt=(t,e,i)=>e in t?ft(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var D=(t,e,i)=>pt(t,typeof e!="symbol"?e+"":e,i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function i(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(n){if(n.ep)return;n.ep=!0;const s=i(n);fetch(n.href,s)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class x{constructor(e,i,l,n,s="div"){this.parent=e,this.object=i,this.property=l,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(n),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),x.nextNameID=x.nextNameID||0,this.$name.id=`lil-gui-name-${++x.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(l)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("lil-disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const i=this.parent.add(this.object,this.property,e);return i.name(this._name),this.destroy(),i}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class mt extends x{constructor(e,i,l){super(e,i,l,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Ae(t){let e,i;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?i=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),i?"#"+i:!1}const gt={isPrimitive:!0,match:t=>typeof t=="string",fromHexString:Ae,toHexString:Ae},te={isPrimitive:!0,match:t=>typeof t=="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},bt={isPrimitive:!1,match:t=>Array.isArray(t)||ArrayBuffer.isView(t),fromHexString(t,e,i=1){const l=te.fromHexString(t);e[0]=(l>>16&255)/255*i,e[1]=(l>>8&255)/255*i,e[2]=(l&255)/255*i},toHexString([t,e,i],l=1){l=255/l;const n=t*l<<16^e*l<<8^i*l<<0;return te.toHexString(n)}},yt={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,i=1){const l=te.fromHexString(t);e.r=(l>>16&255)/255*i,e.g=(l>>8&255)/255*i,e.b=(l&255)/255*i},toHexString({r:t,g:e,b:i},l=1){l=255/l;const n=t*l<<16^e*l<<8^i*l<<0;return te.toHexString(n)}},vt=[gt,te,bt,yt];function wt(t){return vt.find(e=>e.match(t))}class Mt extends x{constructor(e,i,l,n){super(e,i,l,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=wt(this.initialValue),this._rgbScale=n,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=Ae(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const i=this._format.fromHexString(e);this.setValue(i)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class _e extends x{constructor(e,i,l){super(e,i,l,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",n=>{n.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class _t extends x{constructor(e,i,l,n,s,o){super(e,i,l,"lil-number"),this._initInput(),this.min(n),this.max(s);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,i=!0){return this._step=e,this._stepExplicit=i,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let i=(e-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let f=parseFloat(this.$input.value);isNaN(f)||(this._stepExplicit&&(f=this._snap(f)),this.setValue(this._clamp(f)))},l=f=>{const w=parseFloat(this.$input.value);isNaN(w)||(this._snapClampSetValue(w+f),this.$input.value=this.getValue())},n=f=>{f.key==="Enter"&&this.$input.blur(),f.code==="ArrowUp"&&(f.preventDefault(),l(this._step*this._arrowKeyMultiplier(f))),f.code==="ArrowDown"&&(f.preventDefault(),l(this._step*this._arrowKeyMultiplier(f)*-1))},s=f=>{this._inputFocused&&(f.preventDefault(),l(this._step*this._normalizeMouseWheel(f)))};let o=!1,a,h,r,d,c;const p=5,b=f=>{a=f.clientX,h=r=f.clientY,o=!0,d=this.getValue(),c=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",M)},g=f=>{if(o){const w=f.clientX-a,S=f.clientY-h;Math.abs(S)>p?(f.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(w)>p&&M()}if(!o){const w=f.clientY-r;c-=w*this._step*this._arrowKeyMultiplier(f),d+c>this._max?c=this._max-d:d+c<this._min&&(c=this._min-d),this._snapClampSetValue(d+c)}r=f.clientY},M=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",M)},F=()=>{this._inputFocused=!0},m=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",n),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",b),this.$input.addEventListener("focus",F),this.$input.addEventListener("blur",m)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const e=(m,f,w,S,j)=>(m-f)/(w-f)*(j-S)+S,i=m=>{const f=this.$slider.getBoundingClientRect();let w=e(m,f.left,f.right,this._min,this._max);this._snapClampSetValue(w)},l=m=>{this._setDraggingStyle(!0),i(m.clientX),window.addEventListener("mousemove",n),window.addEventListener("mouseup",s)},n=m=>{i(m.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",n),window.removeEventListener("mouseup",s)};let o=!1,a,h;const r=m=>{m.preventDefault(),this._setDraggingStyle(!0),i(m.touches[0].clientX),o=!1},d=m=>{m.touches.length>1||(this._hasScrollBar?(a=m.touches[0].clientX,h=m.touches[0].clientY,o=!0):r(m),window.addEventListener("touchmove",c,{passive:!1}),window.addEventListener("touchend",p))},c=m=>{if(o){const f=m.touches[0].clientX-a,w=m.touches[0].clientY-h;Math.abs(f)>Math.abs(w)?r(m):(window.removeEventListener("touchmove",c),window.removeEventListener("touchend",p))}else m.preventDefault(),i(m.touches[0].clientX)},p=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",c),window.removeEventListener("touchend",p)},b=this._callOnFinishChange.bind(this),g=400;let M;const F=m=>{if(Math.abs(m.deltaX)<Math.abs(m.deltaY)&&this._hasScrollBar)return;m.preventDefault();const w=this._normalizeMouseWheel(m)*this._step;this._snapClampSetValue(this.getValue()+w),this.$input.value=this.getValue(),clearTimeout(M),M=setTimeout(b,g)};this.$slider.addEventListener("mousedown",l),this.$slider.addEventListener("touchstart",d,{passive:!1}),this.$slider.addEventListener("wheel",F,{passive:!1})}_setDraggingStyle(e,i="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",e),document.body.classList.toggle("lil-dragging",e),document.body.classList.toggle(`lil-${i}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:i,deltaY:l}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(i=0,l=-e.wheelDelta/120,l*=this._stepExplicit?1:10),i+-l}_arrowKeyMultiplier(e){let i=this._stepExplicit?1:10;return e.shiftKey?i*=10:e.altKey&&(i/=10),i}_snap(e){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),e-=i,e=Math.round(e/this._step)*this._step,e+=i,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class $t extends x{constructor(e,i,l,n){super(e,i,l,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(n)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(i=>{const l=document.createElement("option");l.textContent=i,this.$select.appendChild(l)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),i=this._values.indexOf(e);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?e:this._names[i],this}}class kt extends x{constructor(e,i,l){super(e,i,l,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",n=>{n.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var At=`.lil-gui {
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
}`;function St(t){const e=document.createElement("style");e.innerHTML=t;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(e,i):document.head.appendChild(e)}let We=!1;class Pe{constructor({parent:e,autoPlace:i=e===void 0,container:l,width:n,title:s="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:h=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),h&&this.domElement.classList.add("lil-allow-touch-styles"),!We&&a&&(St(At),We=!0),l?l.appendChild(this.domElement):i&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),n&&this.domElement.style.setProperty("--width",n+"px"),this._closeFolders=o}add(e,i,l,n,s){if(Object(l)===l)return new $t(this,e,i,l);const o=e[i];switch(typeof o){case"number":return new _t(this,e,i,l,n,s);case"boolean":return new mt(this,e,i);case"string":return new kt(this,e,i);case"function":return new _e(this,e,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,e,`
	value:`,o)}addColor(e,i,l=1){return new Mt(this,e,i,l)}addFolder(e){const i=new Pe({parent:this,title:e});return this.root._closeFolders&&i.close(),i}load(e,i=!0){return e.controllers&&this.controllers.forEach(l=>{l instanceof _e||l._name in e.controllers&&l.load(e.controllers[l._name])}),i&&e.folders&&this.folders.forEach(l=>{l._title in e.folders&&l.load(e.folders[l._title])}),this}save(e=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(l=>{if(!(l instanceof _e)){if(l._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${l._name}"`);i.controllers[l._name]=l.save()}}),e&&this.folders.forEach(l=>{if(l._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${l._title}"`);i.folders[l._title]=l.save()}),i}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("lil-transition");const l=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",l))};this.$children.addEventListener("transitionend",l);const n=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!e),requestAnimationFrame(()=>{this.$children.style.height=n+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(l=>l.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(i=>{e=e.concat(i.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(i=>{e=e.concat(i.foldersRecursive())}),e}}function Et(t,e,i){var a,h;const l=i.length,n=(a=i[l-1])==null?void 0:a.answer,s=l>=2&&n!==void 0&&n===((h=i[l-2])==null?void 0:h.answer)?n:-1;if(s<0||t<=1)return Math.min(t-1,Math.floor(e()*t));const o=Math.min(t-2,Math.floor(e()*(t-1)));return o>=s?o+1:o}function Se(t,e,i){const l=Et(e.answerCount,i,t.queue);t.queue.push({answer:l,face:e.makeFace(l,i)})}function Ct(t,e){const i={queue:[],bottomY:t.lineY,spawnAcc:0},l=t.maxQueue>0?t.maxQueue:4;for(let n=0;n<l;n++)Se(i,t,e);return i}function Ft(t,e,i,l){if(t.bottomY=Math.min(i.lineY,t.bottomY+i.fallBlocksPerSec*i.blockH*e),i.maxQueue>0){for(;t.queue.length<i.maxQueue;)Se(t,i,l);return}for(t.spawnAcc+=i.spawnPerSec*e;t.spawnAcc>=1;)t.spawnAcc-=1,Se(t,i,l)}function Tt(t,e,i){const l=t.queue[0];return l?l.answer!==e?"miss":(t.queue.shift(),t.bottomY-=i.blockH,"hit"):"empty"}const ie={easy:{id:"easy",label:"かんたん",answerCount:3,visibleCount:3},normal:{id:"normal",label:"ふつう",answerCount:4,visibleCount:4},hard:{id:"hard",label:"むずかしい",answerCount:5,visibleCount:5}},N=["easy","normal","hard"];function Ot(t){return ie[t].answerCount}function Pt(t){return ie[t].visibleCount}const le=[{fill:"#ff5a5f",edge:"#c02128",gloss:"#ff9296",glyph:"#ffffff",shape:"circle",label:"あか"},{fill:"#3fa9ff",edge:"#1259a8",gloss:"#8bccff",glyph:"#ffffff",shape:"square",label:"あお"},{fill:"#ffc93c",edge:"#c07f00",gloss:"#ffe293",glyph:"#7a4b00",shape:"triangle",label:"きいろ"},{fill:"#4bd37b",edge:"#188c4a",gloss:"#9aeab7",glyph:"#ffffff",shape:"diamond",label:"みどり"},{fill:"#b072ff",edge:"#6a2cbd",gloss:"#d6b1ff",glyph:"#ffffff",shape:"star",label:"むらさき"}],Ke={fill:"#efe0c6",edge:"#b09166",gloss:"#fff4de",glyph:"#6b5330"},Ht="#dcefff",Ee="#fff4e2",k="#4a3a24",H="rgba(74,58,36,0.55)",A="ui-rounded, 'Hiragino Maru Gothic ProN', 'Hiragino Sans', -apple-system, BlinkMacSystemFont, 'Noto Sans JP', sans-serif";function xt(t,e,i,l,n){switch(t.beginPath(),e){case"circle":t.arc(i,l,n,0,Math.PI*2);break;case"square":t.rect(i-n*.85,l-n*.85,n*1.7,n*1.7);break;case"triangle":Xe(t,i,l+n*.12,n*1.12,3,-Math.PI/2);break;case"diamond":Xe(t,i,l,n*1.14,4,-Math.PI/2);break;case"star":Rt(t,i,l,n*1.16,n*.5,5);break}t.closePath()}function Xe(t,e,i,l,n,s){for(let o=0;o<n;o++){const a=s+o*Math.PI*2/n,h=e+Math.cos(a)*l,r=i+Math.sin(a)*l;o===0?t.moveTo(h,r):t.lineTo(h,r)}}function Rt(t,e,i,l,n,s){for(let o=0;o<s*2;o++){const a=o%2===0?l:n,h=-Math.PI/2+o*Math.PI/s,r=e+Math.cos(h)*a,d=i+Math.sin(h)*a;o===0?t.moveTo(r,d):t.lineTo(r,d)}}function v(t,e,i,l,n,s){const o=Math.max(0,Math.min(s,l/2,n/2));t.beginPath(),t.moveTo(e+o,i),t.arcTo(e+l,i,e+l,i+n,o),t.arcTo(e+l,i+n,e,i+n,o),t.arcTo(e,i+n,e,i,o),t.arcTo(e,i,e+l,i,o),t.closePath()}const Dt=3200;class Vt{constructor(){D(this,"enabled",!0);D(this,"shards",[]);D(this,"beams",[])}clear(){this.shards.length=0,this.beams.length=0}get shardCount(){return this.shards.length}burst(e,i,l,n,s,o,a,h=0){if(!this.enabled)return;const r=Math.min(h,10)/10,d=7+Math.round(r*4);for(let c=0;c<d;c++){const p=c/d*Math.PI*2+a()*.6,b=90+a()*220;this.shards.push({x:e+(a()-.5)*l*.6,y:i+a()*n*.25,vx:Math.cos(p)*b,vy:Math.sin(p)*b*.55-100,rot:a()*Math.PI,vrot:(a()-.5)*14,size:Math.min(l,n)*(.14+a()*.12)*(1+r*.4),life:.42+a()*.12,maxLife:.54,fill:s,edge:o})}}beam(e,i,l,n,s){this.enabled&&this.beams.push({x:e,w:i,yFrom:l,yTo:n,life:.09,maxLife:.09,fill:s})}confetti(e,i,l,n){if(this.enabled)for(let s=0;s<l;s++){const o=le[Math.floor(n()*le.length)];this.shards.push({x:n()*e,y:-20-n()*i*.4,vx:(n()-.5)*120,vy:60+n()*160,rot:n()*Math.PI,vrot:(n()-.5)*10,size:6+n()*8,life:1.4+n()*.8,maxLife:2.2,fill:o.fill,edge:o.edge})}}update(e){for(let i=this.shards.length-1;i>=0;i--){const l=this.shards[i];if(l.life-=e,l.life<=0){this.shards.splice(i,1);continue}l.vy+=Dt*e,l.x+=l.vx*e,l.y+=l.vy*e,l.rot+=l.vrot*e}for(let i=this.beams.length-1;i>=0;i--){const l=this.beams[i];l.life-=e,l.life<=0&&this.beams.splice(i,1)}}draw(e){for(const i of this.beams){const l=1-i.life/i.maxLife,n=i.yFrom+(i.yTo-i.yFrom)*l,s=Math.abs(i.yFrom-i.yTo)*.42;e.globalAlpha=.55*(1-l),e.fillStyle=i.fill,v(e,i.x-i.w/2,n-s,i.w,s,i.w/2),e.fill()}e.globalAlpha=1;for(const i of this.shards){const l=Math.min(1,i.life/(i.maxLife*.4));e.globalAlpha=l,e.save(),e.translate(i.x,i.y),e.rotate(i.rot),v(e,-i.size/2,-i.size/2,i.size,i.size,i.size*.28),e.fillStyle=i.fill,e.fill(),e.lineWidth=Math.max(1.5,i.size*.14),e.strokeStyle=i.edge,e.stroke(),e.restore()}e.globalAlpha=1}}const L=44,It=.62;function Bt(t,e){const i=Math.min(t,e*It);return{x:(t-i)/2,y:0,w:i,h:e}}function Yt(t,e){return t>e}function Qe(t,e,i,l,n,s,o=0,a={x:0,y:0,w:t,h:e}){const h=Math.min(t,e),r=Math.min(e*.11,84),d=o+Math.max(6,e*.012),c=Math.min(e*.19,130),p=e-c-d,b=(p-r)/(n+s),g=Math.max(24,Math.min(h*l,b)),M=Math.min(t*.46,g*1.3),F=p-g*s,m=Math.max(4,t*.012),f=(t-m*(i+1))/i,w=[];for(let S=0;S<i;S++)w.push({x:m+S*(f+m),y:p+m,w:f,h:c-m*2});return{w:t,h:e,frameW:a.w+a.x*2,frameH:a.h+a.y*2,offsetX:a.x,offsetY:a.y,headerH:r,blockH:g,blockW:M,colX:t/2,lineY:p,restY:F,buttons:w}}function Lt(t,e,i){for(let l=0;l<t.buttons.length;l++){const n=t.buttons[l];if(e>=n.x-2&&e<=n.x+n.w+2&&i>=t.lineY)return l}return null}function zt(t,e,i){const l=Je(e)+Ze(e)+Math.max(14,e*.02),n=e*.88-l,s=.28,o=Math.min(e*.13,96,n/(i*(1+s)-s)),a=o*s,h=Math.min(t*.72,340),r=i*o+(i-1)*a,d=l+(n-r)/2,c=[];for(let p=0;p<i;p++)c.push({x:(t-h)/2,y:d+p*(o+a),w:h,h:o});return c}function Wt(t,e,i){const l=Math.max(6,t*.022),n=Math.min((t*.86-l*(i-1))/i,120),s=Ze(e),o=i*n+(i-1)*l,a=(t-o)/2,h=Je(e),r=[];for(let d=0;d<i;d++)r.push({x:a+d*(n+l),y:h,w:n,h:s});return r}const Je=t=>t*.29,Ze=t=>Math.min(t*.065,50);function P(t,e,i){return e>=t.x&&e<=t.x+t.w&&i>=t.y&&i<=t.y+t.h}function He(t,e){const i=Math.max(L,Math.min(t*.12,52));return{x:t-i-Math.max(10,t*.035),y:Math.max(10,e*.018),w:i,h:i}}function Xt(t,e){return{cx:t/2,cy:e*.4,r:Math.min(t*.26,e*.14)}}function et(t,e,i=3){const l=Math.min(t*.6,280),n=Math.max(L,Math.min(e*.09,68)),s=Math.min(t*.44,200),o=Math.max(L,Math.min(e*.07,54)),a=Math.max(6,t*.022),h=Math.min((t*.86-a*(i-1))/i,120),r=Math.max(L*.8,Math.min(e*.055,44)),d=i*h+(i-1)*a,c=(t-d)/2,p=e*.63,b=[];for(let M=0;M<i;M++)b.push({x:c+M*(h+a),y:p,w:h,h:r});const g=p+r+Math.max(14,e*.026);return{difficulty:b,again:{x:(t-l)/2,y:g,w:l,h:n},title:{x:(t-s)/2,y:g+n+Math.max(10,e*.018),w:s,h:o}}}function tt(t,e,i){const l=Math.max(16,t*.055),n=Math.min(e*.105,84),s=n*.22,o=e*.19,a=t-l,h=Math.max(5,t*.016),r=[];for(let f=0;f<i.length;f++){const w=o+f*(n+s),S=i[f],j=S<=2?Math.min(t*.21,86):Math.min(t*.125,52),Ye=n*.6,ut=S*j+(S-1)*h,Le=a-ut,ze=[];for(let Me=0;Me<S;Me++)ze.push({x:Le+Me*(j+h),y:w+(n-Ye)/2,w:j,h:Ye});r.push({label:{x:l,y:w,w:Math.max(40,Le-l-10),h:n},chips:ze})}const d=Math.min(t*.5,230),c=Math.max(L,Math.min(e*.085,64)),p=Math.min(t*.62,260),b=Math.max(L,Math.min(e*.055,48)),g=Math.min(t*.5,210),M=Math.max(L,Math.min(e*.055,48)),F=e*.7,m=F+c+Math.max(10,e*.018);return{rows:r,close:{x:(t-d)/2,y:F,w:d,h:c},reset:{x:(t-p)/2,y:m,w:p,h:b},admin:{x:(t-g)/2,y:m+b+Math.max(8,e*.012),w:g,h:M}}}const Nt=3e3;class qt{constructor(){D(this,"samples",[]);D(this,"lastHitAt",null);D(this,"hits",0);D(this,"misses",0)}reset(){this.samples=[],this.lastHitAt=null,this.hits=0,this.misses=0}recordMiss(){this.misses++}recordHit(e,i,l){this.hits++;const n=this.lastHitAt;if(this.lastHitAt=e,n===null)return;const s=e-n;s>Nt||this.samples.push({mode:l,depth:i,interval:s})}summary(e,i,l){const n=this.samples.filter(c=>c.mode==="open"),s=this.samples.filter(c=>c.mode==="blind"),o=oe(n.map(c=>c.interval)),a=oe(s.map(c=>c.interval)),h=n.filter(c=>c.depth>=e),r=n.filter(c=>c.depth<=i),d=n.filter(c=>c.interval<l).length;return{hits:this.hits,misses:this.misses,openMedian:o,blindMedian:a,lookaheadGain:o!==null&&a!==null&&o>0?a/o:null,deepMedian:oe(h.map(c=>c.interval)),shallowMedian:oe(r.map(c=>c.interval)),preemptRate:n.length>0?d/n.length:null}}count(e){return this.samples.filter(i=>i.mode===e).length}}function oe(t){if(t.length===0)return null;const e=[...t].sort((l,n)=>l-n),i=e.length>>1;return e.length%2===1?e[i]:(e[i-1]+e[i])/2}const Ut={color:-1,shape:null,dots:0,layout:0,numeral:0,frame:0,text:""};function R(t){return{...Ut,...t}}const Ce=["circle","square","triangle","diamond","star"],it={1:[[[1,1]],[[0,0]],[[2,2]]],2:[[[0,0],[2,2]],[[2,0],[0,2]],[[0,1],[2,1]]],3:[[[0,0],[1,1],[2,2]],[[2,0],[1,1],[0,2]],[[1,0],[0,2],[2,2]]],4:[[[0,0],[2,0],[0,2],[2,2]],[[1,0],[0,1],[2,1],[1,2]],[[0,0],[2,0],[1,1],[1,2]]],5:[[[0,0],[2,0],[1,1],[0,2],[2,2]],[[1,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[2,0],[0,1],[0,2],[2,2]]]};function jt(t,e){const i=it[t];return!i||i.length===0?[]:i[e%i.length]}function Gt(t,e){var l;const i=((l=it[t])==null?void 0:l.length)??1;return Math.min(i-1,Math.floor(e()*i))}function Ne(t,e){return R({color:t,shape:e.colorAssist?Ce[t]??"circle":null})}const xe={iro:{id:"iro",label:"いろ",note:"同一マッチ。色だけ。2〜3歳",maxAnswers:5,buttonFace:(t,e)=>Ne(t,e),blockFace:(t,e,i)=>Ne(t,i)},katachi:{id:"katachi",label:"かたち",note:"同一マッチ。色の手がかりを消してある。3歳",maxAnswers:5,buttonFace:t=>R({shape:Ce[t]??"circle"}),blockFace:t=>R({shape:Ce[t]??"circle"})},ikutsu:{id:"ikutsu",label:"いくつ",note:"変換マッチ。サイコロの目を見て数字を押す。4〜5歳",maxAnswers:5,buttonFace:t=>R({numeral:t+1}),blockFace:(t,e)=>R({dots:t+1,layout:Gt(t+1,e)})},hosuu:{id:"hosuu",label:"10のほすう",note:"変換マッチ。あと何個で10か。さくらんぼ算の土台。小1",maxAnswers:5,buttonFace:t=>R({numeral:t+1}),blockFace:t=>R({frame:9-t})},tashizan:{id:"tashizan",label:"たしざん",note:"変換マッチ。式を見て答えを押す。答えは2〜6。小1",maxAnswers:5,buttonFace:t=>R({numeral:t+2}),blockFace:(t,e)=>{const i=t+2,l=1+Math.min(i-2,Math.floor(e()*(i-1)));return R({text:`${l}+${i-l}`})}}},Re=["iro","katachi","ikutsu","hosuu","tashizan"],G=5,$e=2,B=[{key:"soundOn",label:"おと",hint:"こうかおん",choices:[{label:"あり",value:!0},{label:"なし",value:!1}]},{key:"baseSec",label:"じかん",hint:"1かいの ながさ（びょう）",choices:[{label:"20",value:20},{label:"30",value:30},{label:"45",value:45},{label:"60",value:60}]},{key:"showCount",label:"すうじ",hint:"のこりと けしたかず",choices:[{label:"だす",value:!0},{label:"ださない",value:!1}]},{key:"colorAssist",label:"いろのサポート",hint:"かたちを かさねる",choices:[{label:"なし",value:!1},{label:"あり",value:!0}]}];function De(t,e,i){switch(e){case"soundOn":t.soundOn=i.value;break;case"showCount":t.showCount=i.value;break;case"colorAssist":t.colorAssist=i.value;break;case"baseSec":t.baseSec=i.value;break}}function lt(t,e){return e.choices.findIndex(i=>i.value===t[e.key])}function Kt(t,e){for(const i of B)if(lt(t,i)<0){const l=i.choices.find(n=>n.value===e[i.key]);l&&De(t,i.key,l)}}function Qt(t,e){for(const i of B){const l=i.choices.find(n=>n.value===e[i.key]);l&&De(t,i.key,l)}}function Jt(t){return{elapsed:0,penalty:0,cleared:0,missed:0}}function nt(t,e){return Math.max(0,e.baseSec-t.elapsed-t.penalty)}function Zt(t,e){return nt(t,e)<=0}function ei(t,e){t.elapsed+=e}function ti(t,e){t.cleared++,t.penalty=Math.max(0,t.penalty-e.hitRecoverSec)}function ii(t,e){t.missed++,t.penalty+=e.missPenaltySec}const me="rgba(74,58,36,0.20)";function li(t,e){const{layout:i,column:l,mode:n}=e;ge(t,i),oi(t,i,e);const s=i.blockW*1.34;v(t,i.colX-s/2,i.restY-4,s,14,7),t.fillStyle="rgba(74,58,36,0.16)",t.fill();const o=i.colX-i.blockW/2;for(let a=0;a<l.queue.length;a++){const h=l.queue[a];if(!h)continue;const r=l.bottomY-(a+1)*i.blockH;if(r>i.restY||r+i.blockH<i.headerH-i.blockH)break;let d=r,c=i.blockH;const p=a===0;if(p&&e.squash>0&&(c=i.blockH*(1-.2*e.squash),d=r+(i.blockH-c)),p){const b=i.blockW*1.09,g=i.colX-b/2;ni(t,g,d,b,c,e.targetPulse),ke(t,g,d,b,c,h.face,!1,10),e.showPointer&&si(t,g,d,b,c,e.targetPulse)}else ke(t,o,d,i.blockW,c,h.face,e.hideAhead)}e.effects.draw(t);for(let a=0;a<e.answerCount;a++){const h=i.buttons[a];if(!h)continue;const r=(e.press[a]??0)*5;ke(t,h.x,h.y+r,h.w,h.h,n.buttonFace(a,e.faceOpts),!1,6-r)}}function ni(t,e,i,l,n,s){const o=5+s*4;v(t,e-o,i-o,l+o*2,n+o*2,(n+o*2)*.3),t.lineWidth=4,t.strokeStyle=`rgba(74,58,36,${.14+s*.24})`,t.stroke()}function si(t,e,i,l,n,s){const o=i+n/2,a=Math.min(n*.3,22),h=s*a*.45;t.fillStyle="#c07000";for(const r of[-1,1]){const d=r<0?e-16-h:e+l+16+h;t.beginPath(),t.moveTo(d,o),t.lineTo(d-r*a,o-a*.6),t.lineTo(d-r*a,o+a*.6),t.closePath(),t.fill()}}function ge(t,e){(e.offsetX>0||e.offsetY>0)&&(t.fillStyle=Ee,t.fillRect(-e.offsetX,-e.offsetY,e.frameW,e.frameH));const i=t.createLinearGradient(0,0,0,e.h);i.addColorStop(0,Ht),i.addColorStop(1,Ee),t.fillStyle=i,t.fillRect(0,0,e.w,e.h)}function oi(t,e,i){const l=i.session,n=nt(l,i.sessionCfg),s=Math.max(12,e.w*.045),o=Math.max(16,e.headerH*.32),a=e.headerH*.3,h=e.w-s*2;v(t,s,a,h,o,o/2),t.fillStyle="rgba(74,58,36,0.12)",t.fill();const r=Math.max(0,Math.min(1,n/i.sessionCfg.baseSec));if(r>0){const d=Math.max(o,h*r),c=n<=5?"#ff5a5f":n<=12?"#ffab2e":"#4bd37b",p=n<=5?"#c02128":n<=12?"#c07000":"#188c4a";v(t,s,a,d,o,o/2),t.fillStyle=c,t.fill(),t.lineWidth=3,t.strokeStyle=p,t.stroke(),v(t,s+o*.25,a+o*.18,d-o*.5,o*.26,o*.13),t.fillStyle="rgba(255,255,255,0.42)",t.fill()}i.showCount&&(t.textBaseline="top",t.font=`700 ${Math.round(e.headerH*.3)}px ${A}`,t.fillStyle=H,t.textAlign="left",t.fillText(`${Math.ceil(n)}`,s+2,a+o+5),t.fillStyle=k,t.textAlign="right",t.fillText(`${l.cleared}こ`,e.w-s-2,a+o+5))}function ke(t,e,i,l,n,s,o,a=6){const h=Math.min(l,n)*.26,r=2;a>0&&(v(t,e+r,i+r+a,l-r*2,n-r*2,h),t.fillStyle=me,t.fill());const d=o?{fill:"#d9cdb8",edge:"#a8977c",gloss:"#efe6d5",glyph:"#a8977c"}:s.color>=0?le[s.color]:Ke;v(t,e+r,i+r,l-r*2,n-r*2,h),t.fillStyle=d.fill,t.fill(),t.save(),t.clip(),v(t,e+r,i+r,l-r*2,(n-r*2)*.44,h),t.fillStyle=d.gloss,t.globalAlpha=.42,t.fill(),t.restore(),t.globalAlpha=1,v(t,e+r,i+r,l-r*2,n-r*2,h),t.lineWidth=Math.max(3,Math.min(l,n)*.075),t.strokeStyle=d.edge,t.stroke(),o||ai(t,s,e+l/2,i+n/2,l-r*2,n-r*2,d.glyph)}function ai(t,e,i,l,n,s,o){const a=Math.min(n,s);if(t.fillStyle=o,e.frame>0){ri(t,e.frame,i,l,n,s,o);return}if(e.text){t.textAlign="center",t.textBaseline="middle",t.font=`800 ${Math.round(Math.min(s*.46,n*.86/e.text.length))}px ${A}`,t.fillText(e.text,i,l+a*.03);return}if(e.numeral>0){t.textAlign="center",t.textBaseline="middle",t.font=`800 ${Math.round(a*.6)}px ${A}`,t.fillText(String(e.numeral),i,l+a*.04);return}if(e.shape){xt(t,e.shape,i,l,a*.25),t.fill();return}if(e.dots>0){const h=a*.26,r=a*.098;for(const[d,c]of jt(e.dots,e.layout))t.beginPath(),t.arc(i+(d-1)*h,l+(c-1)*h,r,0,Math.PI*2),t.fill()}}function ri(t,e,i,l,n,s,o){const a=n*.84,h=Math.min(s*.68,a/G*$e*1.2),r=i-a/2,d=l-h/2,c=a/G,p=h/$e,b=Math.min(c,p)*.3;v(t,r,d,a,h,Math.min(c,p)*.28),t.lineWidth=Math.max(2,Math.min(n,s)*.026),t.strokeStyle=o,t.globalAlpha=.5,t.stroke(),t.globalAlpha=1;for(let g=0;g<G*$e;g++){const M=r+g%G*c+c/2,F=d+Math.floor(g/G)*p+p/2;t.beginPath(),t.arc(M,F,b,0,Math.PI*2),g<e?(t.fillStyle=o,t.fill()):(t.lineWidth=Math.max(1.5,b*.32),t.strokeStyle=o,t.globalAlpha=.34,t.stroke(),t.globalAlpha=1)}}function hi(t,e,i,l){t.textAlign="center",t.textBaseline="middle";for(let n=0;n<e.length;n++){const s=i[n],o=e[n];if(!s||!o)continue;const a=o.id===l;v(t,s.x,s.y,s.w,s.h,s.h*.42),t.fillStyle=a?k:"rgba(255,255,255,0.66)",t.fill(),t.lineWidth=3,t.strokeStyle=a?k:"rgba(74,58,36,0.24)",t.stroke(),t.fillStyle=a?"#fff6e6":H,K(t,o.label,s.w*.86,Math.min(s.h*.38,18),700),t.fillText(o.label,s.x+s.w/2,s.y+s.h/2)}}function ci(t,e){t.fillStyle=Ee,t.fillRect(-e.offsetX,-e.offsetY,e.frameW,e.frameH);const i=e.frameW/2-e.offsetX,l=e.frameH/2-e.offsetY,n=Math.min(e.frameH*.2,90),s=n*1.5;v(t,i-n/2,l-s/2-e.frameH*.06,n,s,n*.16),t.fillStyle="rgba(255,255,255,0.8)",t.fill(),t.lineWidth=5,t.strokeStyle=k,t.stroke(),t.textAlign="center",t.textBaseline="middle",t.fillStyle=k,t.font=`800 ${Math.round(Math.min(e.frameW*.05,30))}px ${A}`,t.fillText("たてに してね",i,l+e.frameH*.28)}function di(t,e,i){ge(t,e),t.textAlign="center",t.textBaseline="middle",t.fillStyle=k,t.font=`800 ${Math.round(Math.min(e.w*.115,50))}px ${A}`,t.fillText("みつけてポン",e.w/2,e.h*.16);for(let l=0;l<i.difficulties.length;l++){const n=i.difficultyRects[l],s=i.difficulties[l];if(!n||!s)continue;const o=s.id===i.selected;v(t,n.x,n.y,n.w,n.h,n.h*.42),t.fillStyle=o?k:"rgba(255,255,255,0.66)",t.fill(),t.lineWidth=3,t.strokeStyle=o?k:"rgba(74,58,36,0.22)",t.stroke(),t.fillStyle=o?"#fff6e6":H,t.font=`700 ${Math.round(Math.min(n.h*.38,n.w*.21))}px ${A}`,t.fillText(s.label,n.x+n.w/2,n.y+n.h/2)}for(let l=0;l<i.modes.length;l++){const n=i.modeRects[l],s=i.modes[l];if(!n||!s)continue;const o=le[l];v(t,n.x,n.y+7,n.w,n.h,n.h*.32),t.fillStyle=me,t.fill(),v(t,n.x,n.y,n.w,n.h,n.h*.32),t.fillStyle=o.fill,t.fill(),t.save(),t.clip(),v(t,n.x,n.y,n.w,n.h*.44,n.h*.32),t.globalAlpha=.4,t.fillStyle=o.gloss,t.fill(),t.restore(),t.globalAlpha=1,v(t,n.x,n.y,n.w,n.h,n.h*.32),t.lineWidth=4,t.strokeStyle=o.edge,t.stroke(),t.fillStyle="#ffffff",t.font=`800 ${Math.round(n.h*.44)}px ${A}`,t.fillText(s.label,n.x+n.w/2,n.y+n.h/2)}if(st(t,He(e.w,e.h)),i.notices.length>0){const l=Math.round(Math.min(e.w*.038,15));t.font=`700 ${l}px ${A}`;const n=e.h-Math.max(14,e.h*.03);t.fillStyle="#c07000",t.fillText("⚙ きてい以外の設定",e.w/2,n-l*1.5*i.notices.length),t.fillStyle="rgba(192,112,0,0.75)",i.notices.forEach((s,o)=>{t.fillText(s,e.w/2,n-l*1.5*(i.notices.length-1-o))})}}function ui(t,e,i,l,n,s,o){ge(t,e),t.textAlign="center",t.textBaseline="middle",n.draw(t),t.fillStyle=k,t.font=`800 ${Math.round(Math.min(e.w*.1,42))}px ${A}`,t.fillText("よくできました",e.w/2,e.h*.24);const{cx:a,cy:h,r}=Xt(e.w,e.h);if(t.beginPath(),t.arc(a,h+7,r,0,Math.PI*2),t.fillStyle=me,t.fill(),t.beginPath(),t.arc(a,h,r,0,Math.PI*2),t.fillStyle="#ffc93c",t.fill(),t.lineWidth=6,t.strokeStyle="#c07f00",t.stroke(),l)t.fillStyle="#7a4b00",t.font=`800 ${Math.round(r*1)}px ${A}`,t.fillText(`${i.cleared}`,a,h),t.fillStyle=H,t.font=`700 ${Math.round(Math.min(e.w*.05,20))}px ${A}`,t.fillText(`ミス ${i.missed}`,a,h+r+24);else{const c=Math.min(i.cleared,40),p=Math.min(e.w*.024,12),b=8;for(let g=0;g<c;g++){const M=a+(g%b-(b-1)/2)*p*2.6,F=h-r*.5+Math.floor(g/b)*p*2.7;t.beginPath(),t.arc(M,F,p,0,Math.PI*2),t.fillStyle="#7a4b00",t.fill()}}const d=et(e.w,e.h,s.length);hi(t,s,d.difficulty,o),ae(t,d.again,"もういちど","#4bd37b","#188c4a","#ffffff"),ae(t,d.title,"タイトルへ","rgba(255,255,255,0.72)",H,k),st(t,He(e.w,e.h))}function ae(t,e,i,l,n,s){t.textAlign="center",t.textBaseline="middle",v(t,e.x,e.y+6,e.w,e.h,e.h*.36),t.fillStyle=me,t.fill(),v(t,e.x,e.y,e.w,e.h,e.h*.36),t.fillStyle=l,t.fill(),t.lineWidth=4,t.strokeStyle=n,t.stroke(),t.fillStyle=s,t.font=`800 ${Math.round(e.h*.42)}px ${A}`,t.fillText(i,e.x+e.w/2,e.y+e.h/2)}function st(t,e){v(t,e.x,e.y,e.w,e.h,e.h*.32),t.fillStyle="rgba(255,255,255,0.66)",t.fill(),t.lineWidth=2.5,t.strokeStyle="rgba(74,58,36,0.28)",t.stroke();const i=e.w*.26,l=e.x+i,n=e.x+e.w-i,s=[.7,.32,.58];t.lineCap="round",t.lineWidth=Math.max(2,e.w*.07);for(let o=0;o<s.length;o++){const a=e.y+e.h*(.32+o*.18);t.strokeStyle=H,t.beginPath(),t.moveTo(l,a),t.lineTo(n,a),t.stroke();const h=l+(n-l)*s[o];t.fillStyle=k,t.beginPath(),t.arc(h,a,e.w*.075,0,Math.PI*2),t.fill()}t.lineCap="butt"}function K(t,e,i,l,n){const s=Math.round(l);t.font=`${n} ${s}px ${A}`;const o=t.measureText(e).width;o<=i||(t.font=`${n} ${Math.max(9,Math.floor(s*(i/o)))}px ${A}`)}function fi(t,e,i){ge(t,e),t.textAlign="center",t.textBaseline="middle",t.fillStyle=k,t.font=`800 ${Math.round(Math.min(e.w*.09,38))}px ${A}`,t.fillText("せってい",e.w/2,e.h*.12);const l=tt(e.w,e.h,B.map(n=>n.choices.length));for(let n=0;n<B.length;n++){const s=B[n],o=l.rows[n];if(!s||!o)continue;const a=lt(i,s);t.textAlign="left",t.fillStyle=k,K(t,s.label,o.label.w,Math.min(o.label.h*.33,21),700),t.fillText(s.label,o.label.x,o.label.y+o.label.h*.38),t.fillStyle=H,K(t,s.hint,o.label.w,Math.min(o.label.h*.21,13),600),t.fillText(s.hint,o.label.x,o.label.y+o.label.h*.68),t.textAlign="center";for(let h=0;h<o.chips.length;h++){const r=o.chips[h],d=s.choices[h];if(!r||!d)continue;const c=h===a;v(t,r.x,r.y,r.w,r.h,r.h*.4),t.fillStyle=c?k:"rgba(255,255,255,0.72)",t.fill(),t.lineWidth=3,t.strokeStyle=c?k:"rgba(74,58,36,0.22)",t.stroke(),t.fillStyle=c?"#fff6e6":H,K(t,d.label,r.w*.82,r.h*.42,700),t.fillText(d.label,r.x+r.w/2,r.y+r.h/2)}}ae(t,l.close,"とじる","#4bd37b","#188c4a","#ffffff"),ae(t,l.reset,"さいしょに もどす","rgba(255,255,255,0.72)",H,k),t.fillStyle=H,K(t,"かんりしゃメニュー",l.admin.w*.9,Math.min(l.admin.h*.36,15),600),t.fillText("かんりしゃメニュー",e.w/2,l.admin.y+l.admin.h/2)}let $=null,Ve=!0;function re(t){Ve=t}let he=null;function pi(){if($)return;const t=window.AudioContext??window.webkitAudioContext;if(!t)return;$=new t,$.resume();const e=Math.floor($.sampleRate*.25);he=$.createBuffer(1,e,$.sampleRate);const i=he.getChannelData(0);for(let l=0;l<e;l++)i[l]=Math.random()*2-1}function ce(t,e,i,l,n){if(!$||!Ve)return;const s=$.currentTime,o=$.createOscillator(),a=$.createGain();o.type=i,o.frequency.setValueAtTime(t,s),n&&o.frequency.exponentialRampToValueAtTime(n,s+e),a.gain.setValueAtTime(0,s),a.gain.linearRampToValueAtTime(l,s+.006),a.gain.exponentialRampToValueAtTime(1e-4,s+e),o.connect(a).connect($.destination),o.start(s),o.stop(s+e+.02)}function ot(t,e,i){if(!$||!he||!Ve)return;const l=$.currentTime,n=$.createBufferSource();n.buffer=he;const s=$.createBiquadFilter();s.type="bandpass",s.frequency.setValueAtTime(i,l),s.Q.value=1.1;const o=$.createGain();o.gain.setValueAtTime(e,l),o.gain.exponentialRampToValueAtTime(1e-4,l+t),n.connect(s).connect(o).connect($.destination),n.start(l),n.stop(l+t+.02)}function mi(t){const e=Math.min(t,8),i=523*Math.pow(2,e/12);ce(i,.11,"triangle",.16),ce(i*2,.06,"sine",.05),ot(.07,.09,1800+e*120)}function gi(){ce(150,.09,"sine",.1,90),ot(.04,.03,320)}function bi(){ce(330,.1,"sine",.07,250)}const at="mitsukete-pon.played.v1";function yi(){try{return localStorage.getItem(at)==="1"}catch{return!1}}function vi(){try{localStorage.setItem(at,"1")}catch{}}const z={mode:"iro",difficulty:"easy",bottomGapBlocks:.45,fallBlocksPerSec:10,blockScale:.22,baseSec:30,missPenaltySec:.5,hitRecoverSec:.3,soundOn:!0,showCount:!0,colorAssist:!1,effectsOn:!0,hideAhead:!1},Ie="mitsukete-pon.tuning.v1";function wi(){try{const t=localStorage.getItem(Ie);return t?{...z,...JSON.parse(t)}:{...z}}catch{return{...z}}}function Y(t){try{localStorage.setItem(Ie,JSON.stringify(t))}catch{}}function Mi(){try{localStorage.removeItem(Ie)}catch{}}const qe={bottomGapBlocks:"下の隙間",fallBlocksPerSec:"ストンの速さ",blockScale:"ブロック大きさ",missPenaltySec:"ミスで-秒",hitRecoverSec:"正解でもどる秒",effectsOn:"演出",hideAhead:"先を隠す"};function _i(t){const e=[];for(const i of Object.keys(qe))t[i]!==z[i]&&e.push(`${qe[i]}: ${String(t[i])}`);return e}const de=document.getElementById("stage"),X=de.getContext("2d"),$i=document.getElementById("hud"),u=wi();Kt(u,z);const E=new Vt;let _="title",y=Qe(1,1,3,.22,3,.45),ue=[],fe=[],se=xe[u.mode],I,O,V;const pe=new qt,Q=[0,0,0,0,0];let J=0,Z=0,Fe=!1,Ue="title",T={x:0,y:0,w:1,h:1},Be=!1,Te=!yi();function q(){return Ot(u.difficulty)}function be(){return Pt(u.difficulty)}function rt(){return{colorAssist:u.colorAssist}}function ne(){return{baseSec:u.baseSec,missPenaltySec:u.missPenaltySec,hitRecoverSec:u.hitRecoverSec}}function ki(){const t=getComputedStyle(document.documentElement).getPropertyValue("--sab");return Number.parseFloat(t)||0}function W(){const t=window.innerWidth,e=window.innerHeight,i=Math.min(window.devicePixelRatio||1,2);de.width=Math.round(t*i),de.height=Math.round(e*i),Be=Yt(t,e),T=Bt(t,e),X.setTransform(i,0,0,i,T.x*i,T.y*i),y=Qe(T.w,T.h,q(),u.blockScale,be(),u.bottomGapBlocks,ki(),T),ue=zt(T.w,T.h,Re.length),fe=Wt(T.w,T.h,N.length),O&&(O.blockH=y.blockH,O.lineY=y.restY)}function Ai(){return{blockH:y.blockH,fallBlocksPerSec:u.fallBlocksPerSec,spawnPerSec:0,answerCount:q(),maxQueue:be(),lineY:y.restY,makeFace:(t,e)=>se.blockFace(t,e,rt())}}let ye="";function ve(){$i.textContent=ee?ye:""}function ht(){_="title",ye="",ve(),E.clear()}function je(t){se=t,u.mode=t.id,Y(u),W(),O=Ai(),I=Ct(O,Math.random),V=Jt(ne()),pe.reset(),E.clear(),Z=0,J=0,Fe=!1,ye="",ve(),_="play"}function ct(t){var s;if(_!=="play"||t>=q())return;Q[t]=1;const e=I.queue.length,i=(s=I.queue[0])==null?void 0:s.face,l=I.bottomY-y.blockH/2;if(Tt(I,t,O)==="hit"){pe.recordHit(performance.now(),e,u.hideAhead?"blind":"open"),ti(V,ne()),Z++,Te&&(Te=!1,vi()),mi(Z);const o=i&&i.color>=0?le[i.color]:Ke;E.burst(y.colX,l,y.blockW,y.blockH,o.fill,o.edge,Math.random,Z);const a=y.buttons[t];a&&E.beam(a.x+a.w/2,a.w*.3,a.y,y.restY,o.fill)}else pe.recordMiss(),ii(V,ne()),Z=0,bi()}function Si(){_="result",E.clear(),E.confetti(y.w,y.h,60,Math.random);const t=pe.summary(4,2,350),e=i=>i===null?"—":`${Math.round(i)}ms`;ye=[`${se.label} / ${ie[u.difficulty].label}(${q()}こ) / ${be()}段${u.hideAhead?" / 先を隠す":""}`,`消した ${t.hits}  ミス ${t.misses}`,`中央値タップ間隔 ${e(t.openMedian??t.blindMedian)}`].join(`
`),ve()}function Ei(t,e){if((_==="title"||_==="result")&&P(He(y.w,y.h),t,e)){Ue=_,_="settings";return}if(_==="settings"){const l=tt(y.w,y.h,B.map(n=>n.choices.length));for(let n=0;n<B.length;n++){const s=B[n],o=l.rows[n];if(!(!s||!o))for(let a=0;a<o.chips.length;a++){const h=o.chips[a],r=s.choices[a];if(!(!h||!r||!P(h,t,e))){De(u,s.key,r),Y(u),re(u.soundOn),C.controllersRecursive().forEach(d=>d.updateDisplay());return}}}P(l.close,t,e)?_=Ue:P(l.reset,t,e)?(Qt(u,z),Y(u),re(u.soundOn),C.controllersRecursive().forEach(n=>n.updateDisplay())):P(l.admin,t,e)&&we();return}if(_==="title"){for(let l=0;l<fe.length;l++){const n=fe[l],s=N[l];if(n&&s&&P(n,t,e)){u.difficulty=s,Y(u),W();return}}for(let l=0;l<ue.length;l++){const n=ue[l],s=Re[l];n&&s&&P(n,t,e)&&je(xe[s])}return}if(_==="result"){const l=et(y.w,y.h,N.length);for(let n=0;n<l.difficulty.length;n++){const s=l.difficulty[n],o=N[n];if(s&&o&&P(s,t,e)){u.difficulty=o,Y(u),W();return}}P(l.again,t,e)?je(se):P(l.title,t,e)&&ht();return}const i=Lt(y,t,e);i!==null&&ct(i)}de.addEventListener("pointerdown",t=>{pi(),t.preventDefault(),!Be&&Ei(t.clientX-T.x,t.clientY-T.y)},{passive:!1});window.addEventListener("keydown",t=>{t.key==="d"&&we();const e="12345".indexOf(t.key);e>=0&&_==="play"&&ct(e)});window.addEventListener("resize",W);const C=new Pe({title:"かんりしゃ",width:240});C.close();let ee=!1;function we(){ee=!ee,C.domElement.style.display=ee?"":"none",ee&&C.open(),ve()}we();we();const U=t=>()=>{Y(u),t&&W(),O&&(O.fallBlocksPerSec=u.fallBlocksPerSec,O.answerCount=q(),O.maxQueue=be())};C.add(u,"bottomGapBlocks",0,1.5,.05).name("下の隙間(段)").onChange(U(!0));C.add(u,"hideAhead").name("★先を隠す(対照)").onChange(U(!1));C.add(u,"fallBlocksPerSec",2,30,1).name("ストンの速さ(段/秒)").onChange(U(!1));C.add(u,"effectsOn").name("演出を出す").onChange(()=>{Y(u),E.enabled=u.effectsOn,u.effectsOn||E.clear()});const dt=C.addFolder("時間の判定").close();dt.add(u,"missPenaltySec",0,3,.1).name("ミスで-秒").onChange(U(!1));dt.add(u,"hitRecoverSec",0,1,.05).name("正解でもどる秒").onChange(U(!1));C.add(u,"blockScale",.08,.28,.005).name("ブロック大きさ").onChange(U(!0));C.add({f:()=>{Object.assign(u,z),Mi(),E.enabled=u.effectsOn,re(u.soundOn),C.controllersRecursive().forEach(t=>t.updateDisplay()),ht(),W()}},"f").name("既定に戻す");E.enabled=u.effectsOn;re(u.soundOn);W();let Ge=performance.now();function Oe(){const t=performance.now(),e=Math.min((t-Ge)/1e3,.05);Ge=t;for(let i=0;i<Q.length;i++)Q[i]=Math.max(0,Q[i]-e*7);if(J=Math.max(0,J-e*7),E.update(e),_==="play"){ei(V,e),Ft(I,e,O,Math.random);const i=I.bottomY<O.lineY-.5;Fe&&!i&&(J=1,gi()),Fe=i,Zt(V,ne())&&Si()}if(Be){ci(X,y),requestAnimationFrame(Oe);return}_==="title"?di(X,y,{modes:Re.map(i=>xe[i]),modeRects:ue,difficulties:N.map(i=>ie[i]),difficultyRects:fe,selected:u.difficulty,notices:_i(u)}):_==="play"?li(X,{layout:y,column:I,mode:se,session:V,sessionCfg:ne(),faceOpts:rt(),answerCount:q(),hideAhead:u.hideAhead,showCount:u.showCount,press:Q,squash:J,targetPulse:.5+.5*Math.sin(t/1100*Math.PI*2),showPointer:Te&&V.cleared===0,effects:E}):_==="result"?ui(X,y,V,u.showCount,E,N.map(i=>ie[i]),u.difficulty):fi(X,y,u),requestAnimationFrame(Oe)}requestAnimationFrame(Oe);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register(new URL("sw.js",document.baseURI).href)});
