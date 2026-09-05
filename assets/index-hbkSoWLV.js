var Fe=Object.defineProperty;var xe=(t,e,i)=>e in t?Fe(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var I=(t,e,i)=>xe(t,typeof e!="symbol"?e+"":e,i);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))n(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(l){if(l.ep)return;l.ep=!0;const s=i(l);fetch(l.href,s)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class V{constructor(e,i,n,l,s="div"){this.parent=e,this.object=i,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(l),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),V.nextNameID=V.nextNameID||0,this.$name.id=`lil-gui-name-${++V.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("lil-disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const i=this.parent.add(this.object,this.property,e);return i.name(this._name),this.destroy(),i}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class He extends V{constructor(e,i,n){super(e,i,n,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Dt(t){let e,i;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?i=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),i?"#"+i:!1}const Re={isPrimitive:!0,match:t=>typeof t=="string",fromHexString:Dt,toHexString:Dt},ot={isPrimitive:!0,match:t=>typeof t=="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},De={isPrimitive:!1,match:t=>Array.isArray(t)||ArrayBuffer.isView(t),fromHexString(t,e,i=1){const n=ot.fromHexString(t);e[0]=(n>>16&255)/255*i,e[1]=(n>>8&255)/255*i,e[2]=(n&255)/255*i},toHexString([t,e,i],n=1){n=255/n;const l=t*n<<16^e*n<<8^i*n<<0;return ot.toHexString(l)}},Ie={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,i=1){const n=ot.fromHexString(t);e.r=(n>>16&255)/255*i,e.g=(n>>8&255)/255*i,e.b=(n&255)/255*i},toHexString({r:t,g:e,b:i},n=1){n=255/n;const l=t*n<<16^e*n<<8^i*n<<0;return ot.toHexString(l)}},Be=[Re,ot,De,Ie];function Ve(t){return Be.find(e=>e.match(t))}class Ye extends V{constructor(e,i,n,l){super(e,i,n,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Ve(this.initialValue),this._rgbScale=l,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=Dt(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const i=this._format.fromHexString(e);this.setValue(i)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class xt extends V{constructor(e,i,n){super(e,i,n,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",l=>{l.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class Le extends V{constructor(e,i,n,l,s,o){super(e,i,n,"lil-number"),this._initInput(),this.min(l),this.max(s);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,i=!0){return this._step=e,this._stepExplicit=i,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let i=(e-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let g=parseFloat(this.$input.value);isNaN(g)||(this._stepExplicit&&(g=this._snap(g)),this.setValue(this._clamp(g)))},n=g=>{const S=parseFloat(this.$input.value);isNaN(S)||(this._snapClampSetValue(S+g),this.$input.value=this.getValue())},l=g=>{g.key==="Enter"&&this.$input.blur(),g.code==="ArrowUp"&&(g.preventDefault(),n(this._step*this._arrowKeyMultiplier(g))),g.code==="ArrowDown"&&(g.preventDefault(),n(this._step*this._arrowKeyMultiplier(g)*-1))},s=g=>{this._inputFocused&&(g.preventDefault(),n(this._step*this._normalizeMouseWheel(g)))};let o=!1,a,h,r,d,c;const f=5,p=g=>{a=g.clientX,h=r=g.clientY,o=!0,d=this.getValue(),c=0,window.addEventListener("mousemove",y),window.addEventListener("mouseup",M)},y=g=>{if(o){const S=g.clientX-a,x=g.clientY-h;Math.abs(x)>f?(g.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(S)>f&&M()}if(!o){const S=g.clientY-r;c-=S*this._step*this._arrowKeyMultiplier(g),d+c>this._max?c=this._max-d:d+c<this._min&&(c=this._min-d),this._snapClampSetValue(d+c)}r=g.clientY},M=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",y),window.removeEventListener("mouseup",M)},$=()=>{this._inputFocused=!0},b=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",l),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",p),this.$input.addEventListener("focus",$),this.$input.addEventListener("blur",b)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const e=(b,g,S,x,N)=>(b-g)/(S-g)*(N-x)+x,i=b=>{const g=this.$slider.getBoundingClientRect();let S=e(b,g.left,g.right,this._min,this._max);this._snapClampSetValue(S)},n=b=>{this._setDraggingStyle(!0),i(b.clientX),window.addEventListener("mousemove",l),window.addEventListener("mouseup",s)},l=b=>{i(b.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",s)};let o=!1,a,h;const r=b=>{b.preventDefault(),this._setDraggingStyle(!0),i(b.touches[0].clientX),o=!1},d=b=>{b.touches.length>1||(this._hasScrollBar?(a=b.touches[0].clientX,h=b.touches[0].clientY,o=!0):r(b),window.addEventListener("touchmove",c,{passive:!1}),window.addEventListener("touchend",f))},c=b=>{if(o){const g=b.touches[0].clientX-a,S=b.touches[0].clientY-h;Math.abs(g)>Math.abs(S)?r(b):(window.removeEventListener("touchmove",c),window.removeEventListener("touchend",f))}else b.preventDefault(),i(b.touches[0].clientX)},f=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",c),window.removeEventListener("touchend",f)},p=this._callOnFinishChange.bind(this),y=400;let M;const $=b=>{if(Math.abs(b.deltaX)<Math.abs(b.deltaY)&&this._hasScrollBar)return;b.preventDefault();const S=this._normalizeMouseWheel(b)*this._step;this._snapClampSetValue(this.getValue()+S),this.$input.value=this.getValue(),clearTimeout(M),M=setTimeout(p,y)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",d,{passive:!1}),this.$slider.addEventListener("wheel",$,{passive:!1})}_setDraggingStyle(e,i="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",e),document.body.classList.toggle("lil-dragging",e),document.body.classList.toggle(`lil-${i}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:i,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(i=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),i+-n}_arrowKeyMultiplier(e){let i=this._stepExplicit?1:10;return e.shiftKey?i*=10:e.altKey&&(i/=10),i}_snap(e){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),e-=i,e=Math.round(e/this._step)*this._step,e+=i,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class We extends V{constructor(e,i,n,l){super(e,i,n,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(l)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(i=>{const n=document.createElement("option");n.textContent=i,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),i=this._values.indexOf(e);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?e:this._names[i],this}}class Ne extends V{constructor(e,i,n){super(e,i,n,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",l=>{l.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Ue=`.lil-gui {
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
}`;function je(t){const e=document.createElement("style");e.innerHTML=t;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(e,i):document.head.appendChild(e)}let ne=!1;class zt{constructor({parent:e,autoPlace:i=e===void 0,container:n,width:l,title:s="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:h=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),h&&this.domElement.classList.add("lil-allow-touch-styles"),!ne&&a&&(je(Ue),ne=!0),n?n.appendChild(this.domElement):i&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),l&&this.domElement.style.setProperty("--width",l+"px"),this._closeFolders=o}add(e,i,n,l,s){if(Object(n)===n)return new We(this,e,i,n);const o=e[i];switch(typeof o){case"number":return new Le(this,e,i,n,l,s);case"boolean":return new He(this,e,i);case"string":return new Ne(this,e,i);case"function":return new xt(this,e,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,e,`
	value:`,o)}addColor(e,i,n=1){return new Ye(this,e,i,n)}addFolder(e){const i=new zt({parent:this,title:e});return this.root._closeFolders&&i.close(),i}load(e,i=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof xt||n._name in e.controllers&&n.load(e.controllers[n._name])}),i&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof xt)){if(n._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);i.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);i.folders[n._title]=n.save()}),i}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("lil-transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const l=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!e),requestAnimationFrame(()=>{this.$children.style.height=l+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(i=>{e=e.concat(i.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(i=>{e=e.concat(i.foldersRecursive())}),e}}function qe(t,e,i){var a,h;const n=i.length,l=(a=i[n-1])==null?void 0:a.answer,s=n>=2&&l!==void 0&&l===((h=i[n-2])==null?void 0:h.answer)?l:-1;if(s<0||t<=1)return Math.min(t-1,Math.floor(e()*t));const o=Math.min(t-2,Math.floor(e()*(t-1)));return o>=s?o+1:o}function It(t,e,i){const n=qe(e.answerCount,i,t.queue);t.queue.push({answer:n,face:e.makeFace(n,i)})}function ze(t,e){const i={queue:[],bottomY:t.lineY,spawnAcc:0},n=t.maxQueue>0?t.maxQueue:4;for(let l=0;l<n;l++)It(i,t,e);return i}function Xe(t,e,i,n){if(t.bottomY=Math.min(i.lineY,t.bottomY+i.fallBlocksPerSec*i.blockH*e),i.maxQueue>0){for(;t.queue.length<i.maxQueue;)It(t,i,n);return}for(t.spawnAcc+=i.spawnPerSec*e;t.spawnAcc>=1;)t.spawnAcc-=1,It(t,i,n)}function Ge(t,e,i){const n=t.queue[0];return n?n.answer!==e?"miss":(t.queue.shift(),t.bottomY-=i.blockH,"hit"):"empty"}const at={easy:{id:"easy",label:"かんたん",answerCount:3,visibleCount:3},normal:{id:"normal",label:"ふつう",answerCount:4,visibleCount:4},hard:{id:"hard",label:"むずかしい",answerCount:5,visibleCount:5}},J=["easy","normal","hard"];function Ke(t){return at[t].answerCount}function Qe(t){return at[t].visibleCount}const L=[{fill:"#ff5a5f",edge:"#c02128",gloss:"#ff9296",glyph:"#ffffff",shape:"circle",label:"あか"},{fill:"#3fa9ff",edge:"#1259a8",gloss:"#8bccff",glyph:"#ffffff",shape:"square",label:"あお"},{fill:"#ffc93c",edge:"#c07f00",gloss:"#ffe293",glyph:"#7a4b00",shape:"triangle",label:"きいろ"},{fill:"#4bd37b",edge:"#188c4a",gloss:"#9aeab7",glyph:"#ffffff",shape:"diamond",label:"みどり"},{fill:"#b072ff",edge:"#6a2cbd",gloss:"#d6b1ff",glyph:"#ffffff",shape:"star",label:"むらさき"}],Xt={fill:"#efdfc0",edge:"#9d8155",gloss:"#fff6e4",glyph:"#54401f"},Gt="#d9ccb6",Je="#ffffff",Ze="#fffaee",ti=Gt,_="#4a3a24",T="rgba(74,58,36,0.55)",C="ui-rounded, 'Hiragino Maru Gothic ProN', 'Hiragino Sans', -apple-system, BlinkMacSystemFont, 'Noto Sans JP', sans-serif";function ue(t,e,i,n,l){switch(t.beginPath(),e){case"circle":t.arc(i,n,l,0,Math.PI*2);break;case"square":t.rect(i-l*.85,n-l*.85,l*1.7,l*1.7);break;case"triangle":le(t,i,n+l*.12,l*1.12,3,-Math.PI/2);break;case"diamond":le(t,i,n,l*1.14,4,-Math.PI/2);break;case"star":ei(t,i,n,l*1.16,l*.5,5);break}t.closePath()}function le(t,e,i,n,l,s){for(let o=0;o<l;o++){const a=s+o*Math.PI*2/l,h=e+Math.cos(a)*n,r=i+Math.sin(a)*n;o===0?t.moveTo(h,r):t.lineTo(h,r)}}function ei(t,e,i,n,l,s){for(let o=0;o<s*2;o++){const a=o%2===0?n:l,h=-Math.PI/2+o*Math.PI/s,r=e+Math.cos(h)*a,d=i+Math.sin(h)*a;o===0?t.moveTo(r,d):t.lineTo(r,d)}}function v(t,e,i,n,l,s){const o=Math.max(0,Math.min(s,n/2,l/2));t.beginPath(),t.moveTo(e+o,i),t.arcTo(e+n,i,e+n,i+l,o),t.arcTo(e+n,i+l,e,i+l,o),t.arcTo(e,i+l,e,i,o),t.arcTo(e,i,e+n,i,o),t.closePath()}const ii=3200;class ni{constructor(){I(this,"enabled",!0);I(this,"shards",[]);I(this,"beams",[])}clear(){this.shards.length=0,this.beams.length=0}get shardCount(){return this.shards.length}burst(e,i,n,l,s,o,a,h=0){if(!this.enabled)return;const r=Math.min(h,10)/10,d=7+Math.round(r*4);for(let c=0;c<d;c++){const f=c/d*Math.PI*2+a()*.6,p=90+a()*220;this.shards.push({x:e+(a()-.5)*n*.6,y:i+a()*l*.25,vx:Math.cos(f)*p,vy:Math.sin(f)*p*.55-100,rot:a()*Math.PI,vrot:(a()-.5)*14,size:Math.min(n,l)*(.14+a()*.12)*(1+r*.4),life:.42+a()*.12,maxLife:.54,fill:s,edge:o})}}beam(e,i,n,l,s){this.enabled&&this.beams.push({x:e,w:i,yFrom:n,yTo:l,life:.09,maxLife:.09,fill:s})}confetti(e,i,n,l){if(this.enabled)for(let s=0;s<n;s++){const o=L[Math.floor(l()*L.length)];this.shards.push({x:l()*e,y:-20-l()*i*.4,vx:(l()-.5)*120,vy:60+l()*160,rot:l()*Math.PI,vrot:(l()-.5)*10,size:6+l()*8,life:1.4+l()*.8,maxLife:2.2,fill:o.fill,edge:o.edge})}}update(e){for(let i=this.shards.length-1;i>=0;i--){const n=this.shards[i];if(n.life-=e,n.life<=0){this.shards.splice(i,1);continue}n.vy+=ii*e,n.x+=n.vx*e,n.y+=n.vy*e,n.rot+=n.vrot*e}for(let i=this.beams.length-1;i>=0;i--){const n=this.beams[i];n.life-=e,n.life<=0&&this.beams.splice(i,1)}}draw(e){for(const i of this.beams){const n=1-i.life/i.maxLife,l=i.yFrom+(i.yTo-i.yFrom)*n,s=Math.abs(i.yFrom-i.yTo)*.42;e.globalAlpha=.55*(1-n),e.fillStyle=i.fill,v(e,i.x-i.w/2,l-s,i.w,s,i.w/2),e.fill()}e.globalAlpha=1;for(const i of this.shards){const n=Math.min(1,i.life/(i.maxLife*.4));e.globalAlpha=n,e.save(),e.translate(i.x,i.y),e.rotate(i.rot),v(e,-i.size/2,-i.size/2,i.size,i.size,i.size*.28),e.fillStyle=i.fill,e.fill(),e.lineWidth=Math.max(1.5,i.size*.14),e.strokeStyle=i.edge,e.stroke(),e.restore()}e.globalAlpha=1}}const W=44,li=.62;function si(t,e){const i=Math.min(t,e*li);return{x:(t-i)/2,y:0,w:i,h:e}}function oi(t,e){return t>e}function fe(t,e,i,n,l,s,o=0,a={x:0,y:0,w:t,h:e}){const h=Math.min(t,e),r=Math.min(e*.11,84),d=o+Math.max(6,e*.012),c=Math.min(e*.19,130),f=e-c-d,p=(f-r)/(l+s),y=Math.max(24,Math.min(h*n,p)),M=Math.min(t*.46,y*1.3),$=f-y*s,b=Math.max(4,t*.012),g=(t-b*(i+1))/i,S=[];for(let Q=0;Q<i;Q++)S.push({x:b+Q*(g+b),y:f+b,w:g,h:c-b*2});const x=Math.max(8,t*.03),N=$+y*.1,it=Math.max(r,N-y*(l+.45)),Pt={x,y:it,w:t-x*2,h:N-it};return{w:t,h:e,card:Pt,frameW:a.w+a.x*2,frameH:a.h+a.y*2,offsetX:a.x,offsetY:a.y,headerH:r,blockH:y,blockW:M,colX:t/2,lineY:f,restY:$,buttons:S}}function ai(t,e,i){for(let n=0;n<t.buttons.length;n++){const l=t.buttons[n];if(e>=l.x-2&&e<=l.x+l.w+2&&i>=t.lineY)return n}return null}function ri(t,e,i){const n=me(e)+pe(e)+Math.max(14,e*.02),l=e*.88-n,s=.2,o=Math.min(e*.13,96,l/(i*(1+s)-s)),a=o*s,h=Math.min(t*.72,340),r=i*o+(i-1)*a,d=n+(l-r)/2,c=[];for(let f=0;f<i;f++)c.push({x:(t-h)/2,y:d+f*(o+a),w:h,h:o});return c}function hi(t,e,i){const n=Math.max(6,t*.022),l=Math.min((t*.86-n*(i-1))/i,120),s=pe(e),o=i*l+(i-1)*n,a=(t-o)/2,h=me(e),r=[];for(let d=0;d<i;d++)r.push({x:a+d*(l+n),y:h,w:l,h:s});return r}const me=t=>t*.24,pe=t=>Math.min(t*.06,46);function E(t,e,i){return e>=t.x&&e<=t.x+t.w&&i>=t.y&&i<=t.y+t.h}function Kt(t,e){const i=Math.max(W,Math.min(t*.12,52));return{x:t-i-Math.max(10,t*.035),y:Math.max(10,e*.018),w:i,h:i}}function ci(t,e){return{cx:t/2,cy:e*.4,r:Math.min(t*.26,e*.14)}}function ge(t,e,i=3){const n=Math.min(t*.6,280),l=Math.max(W,Math.min(e*.09,68)),s=Math.min(t*.44,200),o=Math.max(W,Math.min(e*.07,54)),a=Math.max(6,t*.022),h=Math.min((t*.86-a*(i-1))/i,120),r=Math.max(W*.8,Math.min(e*.055,44)),d=i*h+(i-1)*a,c=(t-d)/2,f=e*.63,p=[];for(let M=0;M<i;M++)p.push({x:c+M*(h+a),y:f,w:h,h:r});const y=f+r+Math.max(14,e*.026);return{difficulty:p,again:{x:(t-n)/2,y,w:n,h:l},title:{x:(t-s)/2,y:y+l+Math.max(10,e*.018),w:s,h:o}}}function be(t,e,i){const n=Math.max(16,t*.055),l=Math.min(e*.105,84),s=l*.22,o=e*.19,a=t-n,h=Math.max(5,t*.016),r=[];for(let g=0;g<i.length;g++){const S=o+g*(l+s),x=i[g],N=x<=2?Math.min(t*.21,86):Math.min(t*.125,52),it=l*.6,Pt=x*N+(x-1)*h,Q=a-Pt,ie=[];for(let Ft=0;Ft<x;Ft++)ie.push({x:Q+Ft*(N+h),y:S+(l-it)/2,w:N,h:it});r.push({label:{x:n,y:S,w:Math.max(40,Q-n-10),h:l},chips:ie})}const d=Math.min(t*.5,230),c=Math.max(W,Math.min(e*.085,64)),f=Math.min(t*.62,260),p=Math.max(W,Math.min(e*.055,48)),y=Math.min(t*.5,210),M=Math.max(W,Math.min(e*.055,48)),$=e*.7,b=$+c+Math.max(10,e*.018);return{rows:r,close:{x:(t-d)/2,y:$,w:d,h:c},reset:{x:(t-f)/2,y:b,w:f,h:p},admin:{x:(t-y)/2,y:b+p+Math.max(8,e*.012),w:y,h:M}}}function ye(t,e,i){const n=Math.min(3,i),l=Math.ceil(i/n),s=Math.max(8,t*.03),o=Math.min((t*.86-s*(n-1))/n,e*.16),a=e*.22,h=[];for(let M=0;M<i;M++){const $=Math.floor(M/n),b=Math.min(n,i-$*n),g=b*o+(b-1)*s,S=(t-g)/2;h.push({x:S+M%n*(o+s),y:a+$*(o+s),w:o,h:o})}const r=a+l*o+(l-1)*s,d=Math.min(t*.6,280),c=Math.max(W,Math.min(e*.085,64)),f=Math.min(t*.44,190),p=Math.max(W,Math.min(e*.06,50)),y=Math.max(r+Math.max(18,e*.035),e*.66);return{slots:h,play:{x:(t-d)/2,y,w:d,h:c},clear:{x:(t-f)/2,y:y+c+Math.max(10,e*.018),w:f,h:p},close:{x:(t-f)/2,y:y+c+p+Math.max(18,e*.032),w:f,h:p}}}const di=3e3;class ui{constructor(){I(this,"samples",[]);I(this,"lastHitAt",null);I(this,"hits",0);I(this,"misses",0)}reset(){this.samples=[],this.lastHitAt=null,this.hits=0,this.misses=0}recordMiss(){this.misses++}recordHit(e,i,n){this.hits++;const l=this.lastHitAt;if(this.lastHitAt=e,l===null)return;const s=e-l;s>di||this.samples.push({mode:n,depth:i,interval:s})}summary(e,i,n){const l=this.samples.filter(c=>c.mode==="open"),s=this.samples.filter(c=>c.mode==="blind"),o=ft(l.map(c=>c.interval)),a=ft(s.map(c=>c.interval)),h=l.filter(c=>c.depth>=e),r=l.filter(c=>c.depth<=i),d=l.filter(c=>c.interval<n).length;return{hits:this.hits,misses:this.misses,openMedian:o,blindMedian:a,lookaheadGain:o!==null&&a!==null&&o>0?a/o:null,deepMedian:ft(h.map(c=>c.interval)),shallowMedian:ft(r.map(c=>c.interval)),preemptRate:l.length>0?d/l.length:null}}count(e){return this.samples.filter(i=>i.mode===e).length}}function ft(t){if(t.length===0)return null;const e=[...t].sort((n,l)=>n-l),i=e.length>>1;return e.length%2===1?e[i]:(e[i-1]+e[i])/2}const fi={color:-1,shape:null,dots:0,layout:0,numeral:0,tenGroup:0,text:"",photo:-1};function D(t){return{...fi,...t}}const Bt=["circle","square","triangle","diamond","star"],we={1:[[[1,1]],[[0,0]],[[2,2]]],2:[[[0,0],[2,2]],[[2,0],[0,2]],[[0,1],[2,1]]],3:[[[0,0],[1,1],[2,2]],[[2,0],[1,1],[0,2]],[[1,0],[0,2],[2,2]]],4:[[[0,0],[2,0],[0,2],[2,2]],[[1,0],[0,1],[2,1],[1,2]],[[0,0],[2,0],[1,1],[1,2]]],5:[[[0,0],[2,0],[1,1],[0,2],[2,2]],[[1,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[2,0],[0,1],[0,2],[2,2]]]};function mi(t,e){const i=we[t];return!i||i.length===0?[]:i[e%i.length]}function pi(t,e){var n;const i=((n=we[t])==null?void 0:n.length)??1;return Math.min(i-1,Math.floor(e()*i))}function se(t,e){return D({color:t,shape:e.colorAssist?Bt[t]??"circle":null})}const rt={iro:{id:"iro",label:"いろ",note:"同一マッチ。色だけ。2〜3歳",maxAnswers:5,buttonFace:(t,e)=>se(t,e),blockFace:(t,e,i)=>se(t,i)},katachi:{id:"katachi",label:"かたち",note:"同一マッチ。色の手がかりを消してある。3歳",maxAnswers:5,buttonFace:t=>D({shape:Bt[t]??"circle"}),blockFace:t=>D({shape:Bt[t]??"circle"})},ikutsu:{id:"ikutsu",label:"いくつ",note:"変換マッチ。サイコロの目を見て数字を押す。4〜5歳",maxAnswers:5,buttonFace:t=>D({numeral:t+1}),blockFace:(t,e)=>D({dots:t+1,layout:pi(t+1,e)})},hosuu:{id:"hosuu",label:"10のほすう",note:"変換マッチ。あと何個で10か。さくらんぼ算の土台。小1",maxAnswers:5,buttonFace:t=>D({numeral:t+1}),blockFace:t=>D({tenGroup:9-t})},jiyuu:{id:"jiyuu",label:"じゆう",note:"同一マッチ。自分で入れた写真。2〜3歳",maxAnswers:5,buttonFace:t=>D({photo:t}),blockFace:t=>D({photo:t})},tashizan:{id:"tashizan",label:"たしざん",note:"変換マッチ。式を見て答えを押す。答えは2〜6。小1",maxAnswers:5,buttonFace:t=>D({numeral:t+2}),blockFace:(t,e)=>{const i=t+2,n=1+Math.min(i-2,Math.floor(e()*(i-1)));return D({text:`${n}+${i-n}`})}}},Qt=["iro","katachi","ikutsu","hosuu","tashizan","jiyuu"];function gi(t){return t==="jiyuu"}const mt=5,ve="mitsukete-pon.photos.v1",pt=256,ht=5;let B=[];const Vt=new Map;function bi(){B=[];try{const t=localStorage.getItem(ve);if(t){const e=JSON.parse(t);Array.isArray(e)&&(B=e.slice(0,ht).map(i=>typeof i=="string"&&i?i:null))}}catch{B=[]}for(;B.length<ht;)B.push(null)}function Me(){try{localStorage.setItem(ve,JSON.stringify(B))}catch{}}function yi(){let t=0;for(;t<ht&&B[t];)t++;return t}function oe(t){return yi()>=t}function wi(t,e){t<0||t>=ht||(B[t]=e,Me())}function vi(){B=new Array(ht).fill(null),Vt.clear(),Me()}function Se(t){const e=B[t];if(!e)return null;const i=Vt.get(e);if(i)return i.complete&&i.naturalWidth>0?i:null;const n=new Image;return n.src=e,Vt.set(e,n),null}function Mi(t,e,i){const n=Math.min(e,i),l=document.createElement("canvas");l.width=pt,l.height=pt;const s=l.getContext("2d");return s?(s.imageSmoothingQuality="high",s.drawImage(t,(e-n)/2,(i-n)/2,n,n,0,0,pt,pt),l.toDataURL("image/jpeg",.82)):""}async function Si(t){const e=URL.createObjectURL(t);try{const i=await new Promise((n,l)=>{const s=new Image;s.onload=()=>n(s),s.onerror=()=>l(new Error("画像を読めなかった")),s.src=e});return Mi(i,i.naturalWidth,i.naturalHeight)}finally{URL.revokeObjectURL(e)}}const z=[{key:"soundOn",label:"おと",hint:"こうかおん",choices:[{label:"あり",value:!0},{label:"なし",value:!1}]},{key:"baseSec",label:"じかん",hint:"1かいの ながさ（びょう）",choices:[{label:"20",value:20},{label:"30",value:30},{label:"45",value:45},{label:"60",value:60}]},{key:"showCount",label:"すうじ",hint:"のこりと けしたかず",choices:[{label:"だす",value:!0},{label:"ださない",value:!1}]},{key:"colorAssist",label:"いろのサポート",hint:"かたちを かさねる",choices:[{label:"なし",value:!1},{label:"あり",value:!0}]}];function Jt(t,e,i){switch(e){case"soundOn":t.soundOn=i.value;break;case"showCount":t.showCount=i.value;break;case"colorAssist":t.colorAssist=i.value;break;case"baseSec":t.baseSec=i.value;break}}function _e(t,e){return e.choices.findIndex(i=>i.value===t[e.key])}function _i(t,e){for(const i of z)if(_e(t,i)<0){const n=i.choices.find(l=>l.value===e[i.key]);n&&Jt(t,i.key,n)}}function ki(t,e){for(const i of z){const n=i.choices.find(l=>l.value===e[i.key]);n&&Jt(t,i.key,n)}}function $i(t){return{elapsed:0,penalty:0,cleared:0,missed:0}}function ke(t,e){return Math.max(0,e.baseSec-t.elapsed-t.penalty)}function Ai(t,e){return ke(t,e)<=0}function Ci(t,e){t.elapsed+=e}function Ei(t,e){t.cleared++,t.penalty=Math.max(0,t.penalty-e.hitRecoverSec)}function Ti(t,e){t.missed++,t.penalty+=e.missPenaltySec}const dt="rgba(74,58,36,0.20)";function Oi(t,e){const{layout:i,column:n,mode:l}=e;Hi(t,i),Ri(t,i,e);const s=i.colX-i.blockW/2;for(let o=0;o<n.queue.length;o++){const a=n.queue[o];if(!a)continue;const h=n.bottomY-(o+1)*i.blockH;if(h>i.restY||h+i.blockH<i.headerH-i.blockH)break;let r=h,d=i.blockH;const c=o===0;if(c&&e.squash>0&&(d=i.blockH*(1-.2*e.squash),r=h+(i.blockH-d)),c){const f=i.blockW*1.09,p=i.colX-f/2;Pi(t,p,r,f,d,e.targetPulse),Ht(t,p,r,f,d,a.face,!1,Di),e.showPointer&&Fi(t,p,r,f,d,e.targetPulse)}else Ht(t,s,r,i.blockW,d,a.face,e.hideAhead,Ii)}e.effects.draw(t);for(let o=0;o<e.answerCount;o++){const a=i.buttons[o];if(!a)continue;const h=(e.press[o]??0)*5;Ht(t,a.x,a.y+h,a.w,a.h,l.buttonFace(o,e.faceOpts),!1,{...Yt,shadow:Yt.shadow-h})}}function Pi(t,e,i,n,l,s){const o=5+s*4;v(t,e-o,i-o,n+o*2,l+o*2,(l+o*2)*.3),t.lineWidth=4,t.strokeStyle=`rgba(74,58,36,${.14+s*.24})`,t.stroke()}function Fi(t,e,i,n,l,s){const o=i+l/2,a=Math.min(l*.3,22),h=s*a*.45;t.fillStyle="#c07000";for(const r of[-1,1]){const d=r<0?e-16-h:e+n+16+h;t.beginPath(),t.moveTo(d,o),t.lineTo(d-r*a,o-a*.6),t.lineTo(d-r*a,o+a*.6),t.closePath(),t.fill()}}function xi(t,e,i){i?t.drawImage(i,-e.offsetX,-e.offsetY,e.frameW,e.frameH):(t.fillStyle=Gt,t.fillRect(-e.offsetX,-e.offsetY,e.frameW,e.frameH))}function Hi(t,e){const i=e.card,n=Math.min(i.w,i.h)*.07;v(t,i.x,i.y+5,i.w,i.h,n),t.fillStyle="rgba(74,58,36,0.13)",t.fill();const l=t.createLinearGradient(0,i.y,0,i.y+i.h);l.addColorStop(0,Je),l.addColorStop(1,Ze),v(t,i.x,i.y,i.w,i.h,n),t.fillStyle=l,t.fill()}function Ri(t,e,i){const n=i.session,l=ke(n,i.sessionCfg),s=e.card.x,o=e.card.w,a=Math.max(5,e.headerH*.075),h=e.headerH*.52;v(t,s,h,o,a,a/2),t.fillStyle="rgba(74,58,36,0.16)",t.fill();const r=Math.max(0,Math.min(1,l/i.sessionCfg.baseSec));r>0&&(t.fillStyle=l<=5?"#e0453f":l<=12?"#d98a1a":"#3f9c63",v(t,s,h,Math.max(a,o*r),a,a/2),t.fill()),i.showCount&&(t.textBaseline="alphabetic",t.font=`700 ${Math.round(Math.min(e.headerH*.24,17))}px ${C}`,t.fillStyle=T,t.textAlign="left",t.fillText(`${Math.ceil(l)}`,s+1,h-a*1.1),t.textAlign="right",t.fillText(`${n.cleared}こ`,s+o-1,h-a*1.1))}const Yt={shadow:6,gloss:!0,edge:.075},Di={shadow:4,gloss:!1,edge:.055},Ii={shadow:0,gloss:!1,edge:.045};function Ht(t,e,i,n,l,s,o,a=Yt){const h=Math.min(n,l)*.26,r=2;a.shadow>0&&(v(t,e+r,i+r+a.shadow,n-r*2,l-r*2,h),t.fillStyle=dt,t.fill());const d=o?{fill:"#e6dbc6",edge:"#b3a288",gloss:"#f4ecdd",glyph:"#b3a288"}:s.color>=0?L[s.color]:Xt;v(t,e+r,i+r,n-r*2,l-r*2,h),t.fillStyle=d.fill,t.fill();const c=o||s.photo<0?null:Se(s.photo);if(c){t.save(),t.clip();const f=Math.max(n,l)-r*2;t.drawImage(c,e+n/2-f/2,i+l/2-f/2,f,f),t.restore()}a.gloss&&!c&&(t.save(),t.clip(),v(t,e+r,i+r,n-r*2,(l-r*2)*.44,h),t.fillStyle=d.gloss,t.globalAlpha=.42,t.fill(),t.restore(),t.globalAlpha=1),v(t,e+r,i+r,n-r*2,l-r*2,h),t.lineWidth=Math.max(2,Math.min(n,l)*a.edge),t.strokeStyle=c?"rgba(74,58,36,0.5)":d.edge,t.stroke(),!o&&!c&&Bi(t,s,e+n/2,i+l/2,n-r*2,l-r*2,d.glyph)}function Bi(t,e,i,n,l,s,o){const a=Math.min(l,s);if(t.fillStyle=o,e.tenGroup>0){Vi(t,e.tenGroup,i,n,l,s,o);return}if(e.text){t.textAlign="center",t.textBaseline="middle",t.font=`800 ${Math.round(Math.min(s*.46,l*.86/e.text.length))}px ${C}`,t.fillText(e.text,i,n+a*.03);return}if(e.numeral>0){t.textAlign="center",t.textBaseline="middle",t.font=`800 ${Math.round(a*.6)}px ${C}`,t.fillText(String(e.numeral),i,n+a*.04);return}if(e.shape){ue(t,e.shape,i,n,a*.25),t.fill();return}if(e.dots>0){const h=a*.26,r=a*.098;for(const[d,c]of mi(e.dots,e.layout))t.beginPath(),t.arc(i+(d-1)*h,n+(c-1)*h,r,0,Math.PI*2),t.fill()}}function Vi(t,e,i,n,l,s,o){const a=l*.88/mt,h=Math.min(s*.38,a*1.1),r=i-a*mt/2,d=n-h,c=Math.min(a,h)*.34;t.fillStyle=o;for(let f=0;f<e;f++){const p=r+f%mt*a+a/2,y=d+Math.floor(f/mt)*h+h/2;t.beginPath(),t.arc(p,y,c,0,Math.PI*2),t.fill()}}function Yi(t,e,i,n){const s=[..."みつけてポン"];t.font=`800 ${Math.round(n)}px ${C}`;const o=n*.06,a=s.map(p=>t.measureText(p).width),h=a.reduce((p,y)=>p+y,0)+o*(s.length-1);let r=e-h/2;t.textAlign="left",t.textBaseline="alphabetic";for(let p=0;p<s.length;p++){const y=a[p],M=s.length>1?p/(s.length-1):.5,$=-Math.sin(M*Math.PI)*n*.09,b=(p%2===0?-1:1)*.052;t.save(),t.translate(r+y/2,i+$),t.rotate(b),t.fillStyle="rgba(74,58,36,0.16)",t.fillText(s[p],-y/2,n*.36+n*.07),t.fillStyle=_,t.fillText(s[p],-y/2,n*.36),t.restore(),r+=y+o}const d=h*.62,c=d/L.length,f=i+n*.72;for(let p=0;p<L.length;p++){const y=L[p];v(t,e-d/2+p*c+c*.16,f,c*.68,n*.095,n*.05),t.fillStyle=y.fill,t.fill()}t.textAlign="center",t.textBaseline="middle"}function Li(t,e,i,n){t.textAlign="center",t.textBaseline="middle";for(let l=0;l<e.length;l++){const s=i[l],o=e[l];if(!s||!o)continue;const a=o.id===n;v(t,s.x,s.y,s.w,s.h,s.h*.42),t.fillStyle=a?_:"rgba(255,255,255,0.66)",t.fill(),t.lineWidth=3,t.strokeStyle=a?_:"rgba(74,58,36,0.24)",t.stroke(),t.fillStyle=a?"#fff6e6":T,j(t,o.label,s.w*.86,Math.min(s.h*.38,18),700),t.fillText(o.label,s.x+s.w/2,s.y+s.h/2)}}function Wi(t,e){t.fillStyle=ti,t.fillRect(-e.offsetX,-e.offsetY,e.frameW,e.frameH);const i=e.frameW/2-e.offsetX,n=e.frameH/2-e.offsetY,l=Math.min(e.frameH*.2,90),s=l*1.5;v(t,i-l/2,n-s/2-e.frameH*.06,l,s,l*.16),t.fillStyle="rgba(255,255,255,0.8)",t.fill(),t.lineWidth=5,t.strokeStyle=_,t.stroke(),t.textAlign="center",t.textBaseline="middle",t.fillStyle=_,t.font=`800 ${Math.round(Math.min(e.frameW*.05,30))}px ${C}`,t.fillText("たてに してね",i,n+e.frameH*.28)}function Ni(t,e,i){t.textAlign="center",t.textBaseline="middle",Yi(t,e.w/2,e.h*.15,Math.min(e.w*.132,56));for(let n=0;n<i.difficulties.length;n++){const l=i.difficultyRects[n],s=i.difficulties[n];if(!l||!s)continue;const o=s.id===i.selected;v(t,l.x,l.y,l.w,l.h,l.h*.42),t.fillStyle=o?_:"rgba(255,255,255,0.66)",t.fill(),t.lineWidth=3,t.strokeStyle=o?_:"rgba(74,58,36,0.22)",t.stroke(),t.fillStyle=o?"#fff6e6":T,t.font=`700 ${Math.round(Math.min(l.h*.38,l.w*.21))}px ${C}`,t.fillText(s.label,l.x+l.w/2,l.y+l.h/2)}for(let n=0;n<i.modes.length;n++){const l=i.modeRects[n],s=i.modes[n];if(!l||!s)continue;const o=L[n]??{...Xt},a=L[n]?"#ffffff":_;v(t,l.x,l.y+7,l.w,l.h,l.h*.32),t.fillStyle=dt,t.fill(),v(t,l.x,l.y,l.w,l.h,l.h*.32),t.fillStyle=o.fill,t.fill(),t.save(),t.clip(),v(t,l.x,l.y,l.w,l.h*.44,l.h*.32),t.globalAlpha=.4,t.fillStyle=o.gloss,t.fill(),t.restore(),t.globalAlpha=1,v(t,l.x,l.y,l.w,l.h,l.h*.32),t.lineWidth=4,t.strokeStyle=o.edge,t.stroke(),t.fillStyle=a,j(t,s.label,l.w*.8,l.h*.44,800),t.fillText(s.label,l.x+l.w/2,l.y+l.h/2)}if($e(t,Kt(e.w,e.h)),i.notices.length>0){const n=Math.round(Math.min(e.w*.038,15));t.font=`700 ${n}px ${C}`;const l=e.h-Math.max(14,e.h*.03);t.fillStyle="#c07000",t.fillText("⚙ きてい以外の設定",e.w/2,l-n*1.5*i.notices.length),t.fillStyle="rgba(192,112,0,0.75)",i.notices.forEach((s,o)=>{t.fillText(s,e.w/2,l-n*1.5*(i.notices.length-1-o))})}}function Ui(t,e,i,n,l,s,o){t.textAlign="center",t.textBaseline="middle",l.draw(t),t.fillStyle=_,t.font=`800 ${Math.round(Math.min(e.w*.1,42))}px ${C}`,t.fillText("よくできました",e.w/2,e.h*.24);const{cx:a,cy:h,r}=ci(e.w,e.h);if(t.beginPath(),t.arc(a,h+7,r,0,Math.PI*2),t.fillStyle=dt,t.fill(),t.beginPath(),t.arc(a,h,r,0,Math.PI*2),t.fillStyle="#ffc93c",t.fill(),t.lineWidth=6,t.strokeStyle="#c07f00",t.stroke(),n)t.fillStyle="#7a4b00",t.font=`800 ${Math.round(r*1)}px ${C}`,t.fillText(`${i.cleared}`,a,h),t.fillStyle=T,t.font=`700 ${Math.round(Math.min(e.w*.05,20))}px ${C}`,t.fillText(`ミス ${i.missed}`,a,h+r+24);else{const c=Math.min(i.cleared,40),f=Math.min(e.w*.024,12),p=8;for(let y=0;y<c;y++){const M=a+(y%p-(p-1)/2)*f*2.6,$=h-r*.5+Math.floor(y/p)*f*2.7;t.beginPath(),t.arc(M,$,f,0,Math.PI*2),t.fillStyle="#7a4b00",t.fill()}}const d=ge(e.w,e.h,s.length);Li(t,s,d.difficulty,o),tt(t,d.again,"もういちど","#4bd37b","#188c4a","#ffffff"),tt(t,d.title,"タイトルへ","rgba(255,255,255,0.72)",T,_),$e(t,Kt(e.w,e.h))}function tt(t,e,i,n,l,s){t.textAlign="center",t.textBaseline="middle",v(t,e.x,e.y+6,e.w,e.h,e.h*.36),t.fillStyle=dt,t.fill(),v(t,e.x,e.y,e.w,e.h,e.h*.36),t.fillStyle=n,t.fill(),t.lineWidth=4,t.strokeStyle=l,t.stroke(),t.fillStyle=s,t.font=`800 ${Math.round(e.h*.42)}px ${C}`,t.fillText(i,e.x+e.w/2,e.y+e.h/2)}function $e(t,e){v(t,e.x,e.y,e.w,e.h,e.h*.32),t.fillStyle="rgba(255,255,255,0.66)",t.fill(),t.lineWidth=2.5,t.strokeStyle="rgba(74,58,36,0.28)",t.stroke();const i=e.w*.26,n=e.x+i,l=e.x+e.w-i,s=[.7,.32,.58];t.lineCap="round",t.lineWidth=Math.max(2,e.w*.07);for(let o=0;o<s.length;o++){const a=e.y+e.h*(.32+o*.18);t.strokeStyle=T,t.beginPath(),t.moveTo(n,a),t.lineTo(l,a),t.stroke();const h=n+(l-n)*s[o];t.fillStyle=_,t.beginPath(),t.arc(h,a,e.w*.075,0,Math.PI*2),t.fill()}t.lineCap="butt"}function j(t,e,i,n,l){const s=Math.round(n);t.font=`${l} ${s}px ${C}`;const o=t.measureText(e).width;o<=i||(t.font=`${l} ${Math.max(9,Math.floor(s*(i/o)))}px ${C}`)}function ji(t,e,i){t.textAlign="center",t.textBaseline="middle",t.fillStyle=_,t.font=`800 ${Math.round(Math.min(e.w*.09,38))}px ${C}`,t.fillText("せってい",e.w/2,e.h*.12);const n=be(e.w,e.h,z.map(l=>l.choices.length));for(let l=0;l<z.length;l++){const s=z[l],o=n.rows[l];if(!s||!o)continue;const a=_e(i,s);t.textAlign="left",t.fillStyle=_,j(t,s.label,o.label.w,Math.min(o.label.h*.33,21),700),t.fillText(s.label,o.label.x,o.label.y+o.label.h*.38),t.fillStyle=T,j(t,s.hint,o.label.w,Math.min(o.label.h*.21,13),600),t.fillText(s.hint,o.label.x,o.label.y+o.label.h*.68),t.textAlign="center";for(let h=0;h<o.chips.length;h++){const r=o.chips[h],d=s.choices[h];if(!r||!d)continue;const c=h===a;v(t,r.x,r.y,r.w,r.h,r.h*.4),t.fillStyle=c?_:"rgba(255,255,255,0.72)",t.fill(),t.lineWidth=3,t.strokeStyle=c?_:"rgba(74,58,36,0.22)",t.stroke(),t.fillStyle=c?"#fff6e6":T,j(t,d.label,r.w*.82,r.h*.42,700),t.fillText(d.label,r.x+r.w/2,r.y+r.h/2)}}tt(t,n.close,"とじる","#4bd37b","#188c4a","#ffffff"),tt(t,n.reset,"さいしょに もどす","rgba(255,255,255,0.72)",T,_),t.fillStyle=T,j(t,"かんりしゃメニュー",n.admin.w*.9,Math.min(n.admin.h*.36,15),600),t.fillText("かんりしゃメニュー",e.w/2,n.admin.y+n.admin.h/2)}function qi(t,e,i){t.textAlign="center",t.textBaseline="middle",t.fillStyle=_,t.font=`800 ${Math.round(Math.min(e.w*.085,36))}px ${C}`,t.fillText("しゃしんを えらぶ",e.w/2,e.h*.12),t.fillStyle=T,j(t,`${i}まい えらぶと あそべます`,e.w*.8,Math.min(e.w*.042,16),600),t.fillText(`${i}まい えらぶと あそべます`,e.w/2,e.h*.165);const n=ye(e.w,e.h,i);let l=0;for(let o=0;o<n.slots.length;o++){const a=n.slots[o];if(!a)continue;const h=Se(o),r=a.w*.2;if(v(t,a.x,a.y+4,a.w,a.h,r),t.fillStyle=dt,t.fill(),v(t,a.x,a.y,a.w,a.h,r),t.fillStyle=h?"#ffffff":"rgba(255,255,255,0.6)",t.fill(),h&&(l++,t.save(),t.clip(),t.drawImage(h,a.x,a.y,a.w,a.h),t.restore(),v(t,a.x,a.y,a.w,a.h,r)),t.lineWidth=3,t.strokeStyle=h?"rgba(74,58,36,0.35)":"rgba(74,58,36,0.28)",t.stroke(),!h){t.strokeStyle=T,t.lineWidth=Math.max(3,a.w*.05),t.lineCap="round";const d=a.w*.16;t.beginPath(),t.moveTo(a.x+a.w/2-d,a.y+a.h/2),t.lineTo(a.x+a.w/2+d,a.y+a.h/2),t.moveTo(a.x+a.w/2,a.y+a.h/2-d),t.lineTo(a.x+a.w/2,a.y+a.h/2+d),t.stroke(),t.lineCap="butt"}}const s=l>=i;tt(t,n.play,"これで あそぶ",s?"#4bd37b":"rgba(255,255,255,0.5)",s?"#188c4a":"rgba(74,58,36,0.2)",s?"#ffffff":"rgba(74,58,36,0.35)"),tt(t,n.clear,"ぜんぶ けす","rgba(255,255,255,0.72)",T,_),t.fillStyle=T,j(t,"とじる",n.close.w*.6,Math.min(n.close.h*.4,18),700),t.fillText("とじる",e.w/2,n.close.y+n.close.h/2)}const ae=["circle","square","triangle","diamond","star"];function zi(t){let e=t;return()=>(e=(e*1103515245+12345)%2147483648,e/2147483648)}function Xi(t=96){const e=document.createElement("canvas");e.width=t,e.height=t;const i=e.getContext("2d");if(!i)return e;const n=i.createImageData(t,t);for(let l=0;l<n.data.length;l+=4){const s=Math.random()<.5?0:255;n.data[l]=s,n.data[l+1]=s,n.data[l+2]=s,n.data[l+3]=90}return i.putImageData(n,0,0),e}function Gi(t,e,i){const n=document.createElement("canvas");n.width=Math.max(1,Math.round(t*i)),n.height=Math.max(1,Math.round(e*i));const l=n.getContext("2d");if(!l)return n;l.scale(i,i),l.fillStyle=Gt,l.fillRect(0,0,t,e);const s=zi(20260905),o=Math.max(88,Math.min(t,e)*.26);l.fillStyle="rgba(74,58,36,0.05)";for(let h=-o*.5;h<e+o;h+=o)for(let r=-o*.5;r<t+o;r+=o){const d=ae[Math.floor(s()*ae.length)],c=r+s()*o*.7,f=h+s()*o*.7,p=o*(.14+s()*.11);l.save(),l.translate(c,f),l.rotate((s()-.5)*.9),ue(l,d,0,0,p),l.fill(),l.restore()}const a=l.createPattern(Xi(),"repeat");return a&&(l.globalAlpha=.035,l.fillStyle=a,l.fillRect(0,0,t,e),l.globalAlpha=1),n}const u=(t,e=1)=>({midi:t,len:e}),gt=[{id:"twinkle",label:"きらきらぼし",source:"フランス民謡 “Ah! vous dirai-je, maman”（1761）",notes:[u(72),u(72),u(79),u(79),u(81),u(81),u(79,2),u(77),u(77),u(76),u(76),u(74),u(74),u(72,2)]},{id:"mary",label:"メリーさんのひつじ",source:"アメリカ伝承（1830）",notes:[u(76),u(74),u(72),u(74),u(76),u(76),u(76,2),u(74),u(74),u(74,2),u(76),u(79),u(79,2)]},{id:"london",label:"ロンドンばし",source:"イングランド伝承",notes:[u(79),u(81),u(79),u(77),u(76),u(77),u(79,2),u(74),u(76),u(77,2),u(76),u(77),u(79,2)]},{id:"frog",label:"かえるのうた",source:"ドイツ民謡 “Froschgesang”",notes:[u(72),u(74),u(76),u(77),u(76),u(74),u(72,2),u(76),u(77),u(79),u(81),u(79),u(77),u(76,2)]},{id:"joy",label:"よろこびのうた",source:"ベートーヴェン 交響曲第9番（1824）",notes:[u(76),u(76),u(77),u(79),u(79),u(77),u(76),u(74),u(72),u(72),u(74),u(76),u(76,1.5),u(74,.5),u(74,2)]}];function Ki(t){return 440*Math.pow(2,(t-69)/12)}function Qi(t){const e=Math.min(gt.length-1,Math.floor(t()*gt.length));return gt[e]}class Ji{constructor(){I(this,"song",gt[0]);I(this,"index",0)}setSong(e){this.song=e,this.index=0}get current(){return this.song}get progress(){return this.index/this.song.notes.length}next(){const e=this.song.notes[this.index];return this.index=(this.index+1)%this.song.notes.length,e}reset(){this.index=0}}let k=null,Zt=!0;function wt(t){Zt=t}let vt=null;function Zi(){if(k)return;const t=window.AudioContext??window.webkitAudioContext;if(!t)return;k=new t,k.resume();const e=Math.floor(k.sampleRate*.25);vt=k.createBuffer(1,e,k.sampleRate);const i=vt.getChannelData(0);for(let n=0;n<e;n++)i[n]=Math.random()*2-1}function Mt(t,e,i,n,l){if(!k||!Zt)return;const s=k.currentTime,o=k.createOscillator(),a=k.createGain();o.type=i,o.frequency.setValueAtTime(t,s),l&&o.frequency.exponentialRampToValueAtTime(l,s+e),a.gain.setValueAtTime(0,s),a.gain.linearRampToValueAtTime(n,s+.006),a.gain.exponentialRampToValueAtTime(1e-4,s+e),o.connect(a).connect(k.destination),o.start(s),o.stop(s+e+.02)}function Ae(t,e,i){if(!k||!vt||!Zt)return;const n=k.currentTime,l=k.createBufferSource();l.buffer=vt;const s=k.createBiquadFilter();s.type="bandpass",s.frequency.setValueAtTime(i,n),s.Q.value=1.1;const o=k.createGain();o.gain.setValueAtTime(e,n),o.gain.exponentialRampToValueAtTime(1e-4,n+t),l.connect(s).connect(o).connect(k.destination),l.start(n),l.stop(n+t+.02)}function tn(t){const e=Ki(t.midi),i=Math.min(.34,.13*t.len+.04);Mt(e,i,"triangle",.17),Mt(e*2,i*.45,"sine",.045),Ae(.035,.05,2400)}function en(){Mt(150,.09,"sine",.1,90),Ae(.04,.03,320)}function nn(){Mt(330,.1,"sine",.07,250)}const Ce="mitsukete-pon.played.v1";function ln(){try{return localStorage.getItem(Ce)==="1"}catch{return!1}}function sn(){try{localStorage.setItem(Ce,"1")}catch{}}const G={mode:"iro",difficulty:"easy",bottomGapBlocks:.45,fallBlocksPerSec:10,blockScale:.22,baseSec:30,missPenaltySec:.5,hitRecoverSec:.3,soundOn:!0,showCount:!0,colorAssist:!1,effectsOn:!0,hideAhead:!1},te="mitsukete-pon.tuning.v1";function on(){try{const t=localStorage.getItem(te);return t?{...G,...JSON.parse(t)}:{...G}}catch{return{...G}}}function X(t){try{localStorage.setItem(te,JSON.stringify(t))}catch{}}function an(){try{localStorage.removeItem(te)}catch{}}const re={bottomGapBlocks:"下の隙間",fallBlocksPerSec:"ストンの速さ",blockScale:"ブロック大きさ",missPenaltySec:"ミスで-秒",hitRecoverSec:"正解でもどる秒",effectsOn:"演出",hideAhead:"先を隠す"};function rn(t){const e=[];for(const i of Object.keys(re))t[i]!==G[i]&&e.push(`${re[i]}: ${String(t[i])}`);return e}const St=document.getElementById("stage"),O=St.getContext("2d"),hn=document.getElementById("hud"),_t=document.getElementById("pick"),m=on();_i(m,G);bi();const P=new ni,Lt=new Ji;let A="title",w=fe(1,1,3,.22,3,.45),kt=[],$t=[],ut=rt[m.mode],q,R,U;const At=new ui,nt=[0,0,0,0,0];let lt=0,bt=0,Wt=!1,he="title",ce=rt.jiyuu,Nt=-1,H={x:0,y:0,w:1,h:1},ee=!1,Ut=!ln(),Ee=null,yt=1;function Z(t){A!==t&&(yt=0),A=t}function Y(){return Ke(m.difficulty)}function Ct(){return Qe(m.difficulty)}function Te(){return{colorAssist:m.colorAssist}}function ct(){return{baseSec:m.baseSec,missPenaltySec:m.missPenaltySec,hitRecoverSec:m.hitRecoverSec}}function cn(){const t=getComputedStyle(document.documentElement).getPropertyValue("--sab");return Number.parseFloat(t)||0}function K(){const t=window.innerWidth,e=window.innerHeight,i=Math.min(window.devicePixelRatio||1,2);St.width=Math.round(t*i),St.height=Math.round(e*i),ee=oi(t,e),H=si(t,e),O.setTransform(i,0,0,i,H.x*i,H.y*i),Ee=Gi(t,e,i),w=fe(H.w,H.h,Y(),m.blockScale,Ct(),m.bottomGapBlocks,cn(),H),kt=ri(H.w,H.h,Qt.length),$t=hi(H.w,H.h,J.length),R&&(R.blockH=w.blockH,R.lineY=w.restY)}function dn(){return{blockH:w.blockH,fallBlocksPerSec:m.fallBlocksPerSec,spawnPerSec:0,answerCount:Y(),maxQueue:Ct(),lineY:w.restY,makeFace:(t,e)=>ut.blockFace(t,e,Te())}}let Et="";function Tt(){hn.textContent=st?Et:""}function jt(){Z("title"),Et="",Tt(),P.clear()}function Rt(t){ut=t,m.mode=t.id,X(m),K(),R=dn(),Lt.setSong(Qi(Math.random)),q=ze(R,Math.random),U=$i(ct()),At.reset(),P.clear(),bt=0,lt=0,Wt=!1,Et="",Tt(),Z("play")}function Oe(t){var s;if(A!=="play"||t>=Y())return;nt[t]=1;const e=q.queue.length,i=(s=q.queue[0])==null?void 0:s.face,n=q.bottomY-w.blockH/2;if(Ge(q,t,R)==="hit"){At.recordHit(performance.now(),e,m.hideAhead?"blind":"open"),Ei(U,ct()),bt++,Ut&&(Ut=!1,sn()),tn(Lt.next());const o=i&&i.color>=0?L[i.color]:Xt;P.burst(w.colX,n,w.blockW,w.blockH,o.fill,o.edge,Math.random,bt);const a=w.buttons[t];a&&P.beam(a.x+a.w/2,a.w*.3,a.y,w.restY,o.fill)}else At.recordMiss(),Ti(U,ct()),bt=0,Lt.reset(),nn()}function un(){Z("result"),P.clear(),P.confetti(w.w,w.h,60,Math.random);const t=At.summary(4,2,350),e=i=>i===null?"—":`${Math.round(i)}ms`;Et=[`${ut.label} / ${at[m.difficulty].label}(${Y()}こ) / ${Ct()}段${m.hideAhead?" / 先を隠す":""}`,`消した ${t.hits}  ミス ${t.misses}`,`中央値タップ間隔 ${e(t.openMedian??t.blindMedian)}`].join(`
`),Tt()}function fn(t,e){if((A==="title"||A==="result")&&E(Kt(w.w,w.h),t,e)){he=A,Z("settings");return}if(A==="photos"){const n=ye(w.w,w.h,Y());for(let l=0;l<n.slots.length;l++){const s=n.slots[l];if(s&&E(s,t,e)){Nt=l,_t.value="",_t.click();return}}E(n.play,t,e)?oe(Y())&&Rt(ce):E(n.clear,t,e)?vi():E(n.close,t,e)&&jt();return}if(A==="settings"){const n=be(w.w,w.h,z.map(l=>l.choices.length));for(let l=0;l<z.length;l++){const s=z[l],o=n.rows[l];if(!(!s||!o))for(let a=0;a<o.chips.length;a++){const h=o.chips[a],r=s.choices[a];if(!(!h||!r||!E(h,t,e))){Jt(m,s.key,r),X(m),wt(m.soundOn),F.controllersRecursive().forEach(d=>d.updateDisplay());return}}}E(n.close,t,e)?Z(he):E(n.reset,t,e)?(ki(m,G),X(m),wt(m.soundOn),F.controllersRecursive().forEach(l=>l.updateDisplay())):E(n.admin,t,e)&&Ot();return}if(A==="title"){for(let n=0;n<$t.length;n++){const l=$t[n],s=J[n];if(l&&s&&E(l,t,e)){m.difficulty=s,X(m),K();return}}for(let n=0;n<kt.length;n++){const l=kt[n],s=Qt[n];!l||!s||!E(l,t,e)||(gi(s)&&!oe(Y())?(ce=rt[s],Z("photos")):Rt(rt[s]))}return}if(A==="result"){const n=ge(w.w,w.h,J.length);for(let l=0;l<n.difficulty.length;l++){const s=n.difficulty[l],o=J[l];if(s&&o&&E(s,t,e)){m.difficulty=o,X(m),K();return}}E(n.again,t,e)?Rt(ut):E(n.title,t,e)&&jt();return}const i=ai(w,t,e);i!==null&&Oe(i)}St.addEventListener("pointerdown",t=>{Zi(),t.preventDefault(),!ee&&fn(t.clientX-H.x,t.clientY-H.y)},{passive:!1});window.addEventListener("keydown",t=>{t.key==="d"&&Ot();const e="12345".indexOf(t.key);e>=0&&A==="play"&&Oe(e)});_t.addEventListener("change",()=>{var i;const t=(i=_t.files)==null?void 0:i[0],e=Nt;Nt=-1,!(!t||e<0)&&Si(t).then(n=>wi(e,n)).catch(()=>{})});window.addEventListener("resize",K);const F=new zt({title:"かんりしゃ",width:240});F.close();let st=!1;function Ot(){st=!st,F.domElement.style.display=st?"":"none",st&&F.open(),Tt()}Ot();Ot();const et=t=>()=>{X(m),t&&K(),R&&(R.fallBlocksPerSec=m.fallBlocksPerSec,R.answerCount=Y(),R.maxQueue=Ct())};F.add(m,"bottomGapBlocks",0,1.5,.05).name("下の隙間(段)").onChange(et(!0));F.add(m,"hideAhead").name("★先を隠す(対照)").onChange(et(!1));F.add(m,"fallBlocksPerSec",2,30,1).name("ストンの速さ(段/秒)").onChange(et(!1));F.add(m,"effectsOn").name("演出を出す").onChange(()=>{X(m),P.enabled=m.effectsOn,m.effectsOn||P.clear()});const Pe=F.addFolder("時間の判定").close();Pe.add(m,"missPenaltySec",0,3,.1).name("ミスで-秒").onChange(et(!1));Pe.add(m,"hitRecoverSec",0,1,.05).name("正解でもどる秒").onChange(et(!1));F.add(m,"blockScale",.08,.28,.005).name("ブロック大きさ").onChange(et(!0));F.add({f:()=>{Object.assign(m,G),an(),P.enabled=m.effectsOn,wt(m.soundOn),F.controllersRecursive().forEach(t=>t.updateDisplay()),jt(),K()}},"f").name("既定に戻す");P.enabled=m.effectsOn;wt(m.soundOn);K();let de=performance.now();function qt(){const t=performance.now(),e=Math.min((t-de)/1e3,.05);de=t;for(let n=0;n<nt.length;n++)nt[n]=Math.max(0,nt[n]-e*7);if(lt=Math.max(0,lt-e*7),P.update(e),A==="play"){Ci(U,e),Xe(q,e,R,Math.random);const n=q.bottomY<R.lineY-.5;Wt&&!n&&(lt=1,en()),Wt=n,Ai(U,ct())&&un()}if(ee){Wi(O,w),requestAnimationFrame(qt);return}yt=Math.min(1,yt+e/.22);const i=1-Math.pow(1-yt,3);xi(O,w,Ee),O.save(),O.globalAlpha=i,O.translate(0,(1-i)*w.h*.022),A==="title"?Ni(O,w,{modes:Qt.map(n=>rt[n]),modeRects:kt,difficulties:J.map(n=>at[n]),difficultyRects:$t,selected:m.difficulty,notices:rn(m)}):A==="play"?Oi(O,{layout:w,column:q,mode:ut,session:U,sessionCfg:ct(),faceOpts:Te(),answerCount:Y(),hideAhead:m.hideAhead,showCount:m.showCount,press:nt,squash:lt,targetPulse:.5+.5*Math.sin(t/1100*Math.PI*2),showPointer:Ut&&U.cleared===0,effects:P}):A==="result"?Ui(O,w,U,m.showCount,P,J.map(n=>at[n]),m.difficulty):A==="settings"?ji(O,w,m):qi(O,w,Y()),O.restore(),O.globalAlpha=1,requestAnimationFrame(qt)}requestAnimationFrame(qt);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register(new URL("sw.js",document.baseURI).href)});
