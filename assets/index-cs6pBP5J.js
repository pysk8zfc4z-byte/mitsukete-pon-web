var ve=Object.defineProperty;var Me=(e,t,i)=>t in e?ve(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var H=(e,t,i)=>Me(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))n(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(l){if(l.ep)return;l.ep=!0;const s=i(l);fetch(l.href,s)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class I{constructor(t,i,n,l,s="div"){this.parent=t,this.object=i,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(l),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),I.nextNameID=I.nextNameID||0,this.$name.id=`lil-gui-name-${++I.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("lil-disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const i=this.parent.add(this.object,this.property,t);return i.name(this._name),this.destroy(),i}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class _e extends I{constructor(t,i,n){super(t,i,n,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Tt(e){let t,i;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?i=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),i?"#"+i:!1}const $e={isPrimitive:!0,match:e=>typeof e=="string",fromHexString:Tt,toHexString:Tt},nt={isPrimitive:!0,match:e=>typeof e=="number",fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>"#"+e.toString(16).padStart(6,0)},Ae={isPrimitive:!1,match:e=>Array.isArray(e)||ArrayBuffer.isView(e),fromHexString(e,t,i=1){const n=nt.fromHexString(e);t[0]=(n>>16&255)/255*i,t[1]=(n>>8&255)/255*i,t[2]=(n&255)/255*i},toHexString([e,t,i],n=1){n=255/n;const l=e*n<<16^t*n<<8^i*n<<0;return nt.toHexString(l)}},Se={isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,i=1){const n=nt.fromHexString(e);t.r=(n>>16&255)/255*i,t.g=(n>>8&255)/255*i,t.b=(n&255)/255*i},toHexString({r:e,g:t,b:i},n=1){n=255/n;const l=e*n<<16^t*n<<8^i*n<<0;return nt.toHexString(l)}},ke=[$e,nt,Ae,Se];function Ce(e){return ke.find(t=>t.match(e))}class Ee extends I{constructor(t,i,n,l){super(t,i,n,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Ce(this.initialValue),this._rgbScale=l,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=Tt(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const i=this._format.fromHexString(t);this.setValue(i)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Et extends I{constructor(t,i,n){super(t,i,n,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",l=>{l.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class xe extends I{constructor(t,i,n,l,s,o){super(t,i,n,"lil-number"),this._initInput(),this.min(l),this.max(s);const a=o!==void 0;this.step(a?o:this._getImplicitStep(),a),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,i=!0){return this._step=t,this._stepExplicit=i,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let i=(t-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let p=parseFloat(this.$input.value);isNaN(p)||(this._stepExplicit&&(p=this._snap(p)),this.setValue(this._clamp(p)))},n=p=>{const M=parseFloat(this.$input.value);isNaN(M)||(this._snapClampSetValue(M+p),this.$input.value=this.getValue())},l=p=>{p.key==="Enter"&&this.$input.blur(),p.code==="ArrowUp"&&(p.preventDefault(),n(this._step*this._arrowKeyMultiplier(p))),p.code==="ArrowDown"&&(p.preventDefault(),n(this._step*this._arrowKeyMultiplier(p)*-1))},s=p=>{this._inputFocused&&(p.preventDefault(),n(this._step*this._normalizeMouseWheel(p)))};let o=!1,a,h,r,d,u;const g=5,m=p=>{a=p.clientX,h=r=p.clientY,o=!0,d=this.getValue(),u=0,window.addEventListener("mousemove",y),window.addEventListener("mouseup",_)},y=p=>{if(o){const M=p.clientX-a,T=p.clientY-h;Math.abs(T)>g?(p.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(M)>g&&_()}if(!o){const M=p.clientY-r;u-=M*this._step*this._arrowKeyMultiplier(p),d+u>this._max?u=this._max-d:d+u<this._min&&(u=this._min-d),this._snapClampSetValue(d+u)}r=p.clientY},_=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",y),window.removeEventListener("mouseup",_)},C=()=>{this._inputFocused=!0},b=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",l),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",m),this.$input.addEventListener("focus",C),this.$input.addEventListener("blur",b)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const t=(b,p,M,T,B)=>(b-p)/(M-p)*(B-T)+T,i=b=>{const p=this.$slider.getBoundingClientRect();let M=t(b,p.left,p.right,this._min,this._max);this._snapClampSetValue(M)},n=b=>{this._setDraggingStyle(!0),i(b.clientX),window.addEventListener("mousemove",l),window.addEventListener("mouseup",s)},l=b=>{i(b.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",s)};let o=!1,a,h;const r=b=>{b.preventDefault(),this._setDraggingStyle(!0),i(b.touches[0].clientX),o=!1},d=b=>{b.touches.length>1||(this._hasScrollBar?(a=b.touches[0].clientX,h=b.touches[0].clientY,o=!0):r(b),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",g))},u=b=>{if(o){const p=b.touches[0].clientX-a,M=b.touches[0].clientY-h;Math.abs(p)>Math.abs(M)?r(b):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",g))}else b.preventDefault(),i(b.touches[0].clientX)},g=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",g)},m=this._callOnFinishChange.bind(this),y=400;let _;const C=b=>{if(Math.abs(b.deltaX)<Math.abs(b.deltaY)&&this._hasScrollBar)return;b.preventDefault();const M=this._normalizeMouseWheel(b)*this._step;this._snapClampSetValue(this.getValue()+M),this.$input.value=this.getValue(),clearTimeout(_),_=setTimeout(m,y)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",d,{passive:!1}),this.$slider.addEventListener("wheel",C,{passive:!1})}_setDraggingStyle(t,i="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",t),document.body.classList.toggle("lil-dragging",t),document.body.classList.toggle(`lil-${i}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:i,deltaY:n}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(i=0,n=-t.wheelDelta/120,n*=this._stepExplicit?1:10),i+-n}_arrowKeyMultiplier(t){let i=this._stepExplicit?1:10;return t.shiftKey?i*=10:t.altKey&&(i/=10),i}_snap(t){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),t-=i,t=Math.round(t/this._step)*this._step,t+=i,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Te extends I{constructor(t,i,n,l){super(t,i,n,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(l)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(i=>{const n=document.createElement("option");n.textContent=i,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),i=this._values.indexOf(t);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?t:this._names[i],this}}class Oe extends I{constructor(t,i,n){super(t,i,n,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",l=>{l.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Fe=`.lil-gui {
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
}`;function Pe(e){const t=document.createElement("style");t.innerHTML=e;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(t,i):document.head.appendChild(t)}let Gt=!1;class Vt{constructor({parent:t,autoPlace:i=t===void 0,container:n,width:l,title:s="Controls",closeFolders:o=!1,injectStyles:a=!0,touchStyles:h=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),h&&this.domElement.classList.add("lil-allow-touch-styles"),!Gt&&a&&(Pe(Fe),Gt=!0),n?n.appendChild(this.domElement):i&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),l&&this.domElement.style.setProperty("--width",l+"px"),this._closeFolders=o}add(t,i,n,l,s){if(Object(n)===n)return new Te(this,t,i,n);const o=t[i];switch(typeof o){case"number":return new xe(this,t,i,n,l,s);case"boolean":return new _e(this,t,i);case"string":return new Oe(this,t,i);case"function":return new Et(this,t,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,t,`
	value:`,o)}addColor(t,i,n=1){return new Ee(this,t,i,n)}addFolder(t){const i=new Vt({parent:this,title:t});return this.root._closeFolders&&i.close(),i}load(t,i=!0){return t.controllers&&this.controllers.forEach(n=>{n instanceof Et||n._name in t.controllers&&n.load(t.controllers[n._name])}),i&&t.folders&&this.folders.forEach(n=>{n._title in t.folders&&n.load(t.folders[n._title])}),this}save(t=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Et)){if(n._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);i.controllers[n._name]=n.save()}}),t&&this.folders.forEach(n=>{if(n._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);i.folders[n._title]=n.save()}),i}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("lil-transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const l=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!t),requestAnimationFrame(()=>{this.$children.style.height=l+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(i=>{t=t.concat(i.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(i=>{t=t.concat(i.foldersRecursive())}),t}}function He(e,t,i){var a,h;const n=i.length,l=(a=i[n-1])==null?void 0:a.answer,s=n>=2&&l!==void 0&&l===((h=i[n-2])==null?void 0:h.answer)?l:-1;if(s<0||e<=1)return Math.min(e-1,Math.floor(t()*e));const o=Math.min(e-2,Math.floor(t()*(e-1)));return o>=s?o+1:o}function Ot(e,t,i){const n=He(t.answerCount,i,e.queue);e.queue.push({answer:n,face:t.makeFace(n,i)})}function De(e,t){const i={queue:[],bottomY:e.lineY,spawnAcc:0},n=e.maxQueue>0?e.maxQueue:4;for(let l=0;l<n;l++)Ot(i,e,t);return i}function Re(e,t,i,n){if(e.bottomY=Math.min(i.lineY,e.bottomY+i.fallBlocksPerSec*i.blockH*t),i.maxQueue>0){for(;e.queue.length<i.maxQueue;)Ot(e,i,n);return}for(e.spawnAcc+=i.spawnPerSec*t;e.spawnAcc>=1;)e.spawnAcc-=1,Ot(e,i,n)}function Ie(e,t,i){const n=e.queue[0];return n?n.answer!==t?"miss":(e.queue.shift(),e.bottomY-=i.blockH,"hit"):"empty"}const lt={easy:{id:"easy",label:"かんたん",answerCount:3,visibleCount:3},normal:{id:"normal",label:"ふつう",answerCount:4,visibleCount:4},hard:{id:"hard",label:"むずかしい",answerCount:5,visibleCount:5}},j=["easy","normal","hard"];function Ve(e){return lt[e].answerCount}function Be(e){return lt[e].visibleCount}const W=[{fill:"#ff5a5f",edge:"#c02128",gloss:"#ff9296",glyph:"#ffffff",shape:"circle",label:"あか"},{fill:"#3fa9ff",edge:"#1259a8",gloss:"#8bccff",glyph:"#ffffff",shape:"square",label:"あお"},{fill:"#ffc93c",edge:"#c07f00",gloss:"#ffe293",glyph:"#7a4b00",shape:"triangle",label:"きいろ"},{fill:"#4bd37b",edge:"#188c4a",gloss:"#9aeab7",glyph:"#ffffff",shape:"diamond",label:"みどり"},{fill:"#b072ff",edge:"#6a2cbd",gloss:"#d6b1ff",glyph:"#ffffff",shape:"star",label:"むらさき"}],ie={fill:"#efdfc0",edge:"#9d8155",gloss:"#fff6e4",glyph:"#54401f"},Bt="#d9ccb6",Ye="#ffffff",Le="#fffaee",We=Bt,A="#4a3a24",R="rgba(74,58,36,0.55)",S="ui-rounded, 'Hiragino Maru Gothic ProN', 'Hiragino Sans', -apple-system, BlinkMacSystemFont, 'Noto Sans JP', sans-serif";function ne(e,t,i,n,l){switch(e.beginPath(),t){case"circle":e.arc(i,n,l,0,Math.PI*2);break;case"square":e.rect(i-l*.85,n-l*.85,l*1.7,l*1.7);break;case"triangle":jt(e,i,n+l*.12,l*1.12,3,-Math.PI/2);break;case"diamond":jt(e,i,n,l*1.14,4,-Math.PI/2);break;case"star":Ne(e,i,n,l*1.16,l*.5,5);break}e.closePath()}function jt(e,t,i,n,l,s){for(let o=0;o<l;o++){const a=s+o*Math.PI*2/l,h=t+Math.cos(a)*n,r=i+Math.sin(a)*n;o===0?e.moveTo(h,r):e.lineTo(h,r)}}function Ne(e,t,i,n,l,s){for(let o=0;o<s*2;o++){const a=o%2===0?n:l,h=-Math.PI/2+o*Math.PI/s,r=t+Math.cos(h)*a,d=i+Math.sin(h)*a;o===0?e.moveTo(r,d):e.lineTo(r,d)}}function v(e,t,i,n,l,s){const o=Math.max(0,Math.min(s,n/2,l/2));e.beginPath(),e.moveTo(t+o,i),e.arcTo(t+n,i,t+n,i+l,o),e.arcTo(t+n,i+l,t,i+l,o),e.arcTo(t,i+l,t,i,o),e.arcTo(t,i,t+n,i,o),e.closePath()}const ze=3200;class qe{constructor(){H(this,"enabled",!0);H(this,"shards",[]);H(this,"beams",[])}clear(){this.shards.length=0,this.beams.length=0}get shardCount(){return this.shards.length}burst(t,i,n,l,s,o,a,h=0){if(!this.enabled)return;const r=Math.min(h,10)/10,d=7+Math.round(r*4);for(let u=0;u<d;u++){const g=u/d*Math.PI*2+a()*.6,m=90+a()*220;this.shards.push({x:t+(a()-.5)*n*.6,y:i+a()*l*.25,vx:Math.cos(g)*m,vy:Math.sin(g)*m*.55-100,rot:a()*Math.PI,vrot:(a()-.5)*14,size:Math.min(n,l)*(.14+a()*.12)*(1+r*.4),life:.42+a()*.12,maxLife:.54,fill:s,edge:o})}}beam(t,i,n,l,s){this.enabled&&this.beams.push({x:t,w:i,yFrom:n,yTo:l,life:.09,maxLife:.09,fill:s})}confetti(t,i,n,l){if(this.enabled)for(let s=0;s<n;s++){const o=W[Math.floor(l()*W.length)];this.shards.push({x:l()*t,y:-20-l()*i*.4,vx:(l()-.5)*120,vy:60+l()*160,rot:l()*Math.PI,vrot:(l()-.5)*10,size:6+l()*8,life:1.4+l()*.8,maxLife:2.2,fill:o.fill,edge:o.edge})}}update(t){for(let i=this.shards.length-1;i>=0;i--){const n=this.shards[i];if(n.life-=t,n.life<=0){this.shards.splice(i,1);continue}n.vy+=ze*t,n.x+=n.vx*t,n.y+=n.vy*t,n.rot+=n.vrot*t}for(let i=this.beams.length-1;i>=0;i--){const n=this.beams[i];n.life-=t,n.life<=0&&this.beams.splice(i,1)}}draw(t){for(const i of this.beams){const n=1-i.life/i.maxLife,l=i.yFrom+(i.yTo-i.yFrom)*n,s=Math.abs(i.yFrom-i.yTo)*.42;t.globalAlpha=.55*(1-n),t.fillStyle=i.fill,v(t,i.x-i.w/2,l-s,i.w,s,i.w/2),t.fill()}t.globalAlpha=1;for(const i of this.shards){const n=Math.min(1,i.life/(i.maxLife*.4));t.globalAlpha=n,t.save(),t.translate(i.x,i.y),t.rotate(i.rot),v(t,-i.size/2,-i.size/2,i.size,i.size,i.size*.28),t.fillStyle=i.fill,t.fill(),t.lineWidth=Math.max(1.5,i.size*.14),t.strokeStyle=i.edge,t.stroke(),t.restore()}t.globalAlpha=1}}const q=44,Xe=.62;function Ue(e,t){const i=Math.min(e,t*Xe);return{x:(e-i)/2,y:0,w:i,h:t}}function Ge(e,t){return e>t}function le(e,t,i,n,l,s,o=0,a={x:0,y:0,w:e,h:t}){const h=Math.min(e,t),r=Math.min(t*.11,84),d=o+Math.max(6,t*.012),u=Math.min(t*.19,130),g=t-u-d,m=(g-r)/(l+s),y=Math.max(24,Math.min(h*n,m)),_=Math.min(e*.46,y*1.3),C=g-y*s,b=Math.max(4,e*.012),p=(e-b*(i+1))/i,M=[];for(let G=0;G<i;G++)M.push({x:b+G*(p+b),y:g+b,w:p,h:u-b*2});const T=Math.max(8,e*.03),B=C+y*.1,J=Math.max(r,B-y*(l+.45)),kt={x:T,y:J,w:e-T*2,h:B-J};return{w:e,h:t,card:kt,frameW:a.w+a.x*2,frameH:a.h+a.y*2,offsetX:a.x,offsetY:a.y,headerH:r,blockH:y,blockW:_,colX:e/2,lineY:g,restY:C,buttons:M}}function je(e,t,i){for(let n=0;n<e.buttons.length;n++){const l=e.buttons[n];if(t>=l.x-2&&t<=l.x+l.w+2&&i>=e.lineY)return n}return null}function Ke(e,t,i){const n=se(t)+oe(t)+Math.max(14,t*.02),l=t*.88-n,s=.28,o=Math.min(t*.13,96,l/(i*(1+s)-s)),a=o*s,h=Math.min(e*.72,340),r=i*o+(i-1)*a,d=n+(l-r)/2,u=[];for(let g=0;g<i;g++)u.push({x:(e-h)/2,y:d+g*(o+a),w:h,h:o});return u}function Qe(e,t,i){const n=Math.max(6,e*.022),l=Math.min((e*.86-n*(i-1))/i,120),s=oe(t),o=i*l+(i-1)*n,a=(e-o)/2,h=se(t),r=[];for(let d=0;d<i;d++)r.push({x:a+d*(l+n),y:h,w:l,h:s});return r}const se=e=>e*.29,oe=e=>Math.min(e*.065,50);function D(e,t,i){return t>=e.x&&t<=e.x+e.w&&i>=e.y&&i<=e.y+e.h}function Yt(e,t){const i=Math.max(q,Math.min(e*.12,52));return{x:e-i-Math.max(10,e*.035),y:Math.max(10,t*.018),w:i,h:i}}function Je(e,t){return{cx:e/2,cy:t*.4,r:Math.min(e*.26,t*.14)}}function ae(e,t,i=3){const n=Math.min(e*.6,280),l=Math.max(q,Math.min(t*.09,68)),s=Math.min(e*.44,200),o=Math.max(q,Math.min(t*.07,54)),a=Math.max(6,e*.022),h=Math.min((e*.86-a*(i-1))/i,120),r=Math.max(q*.8,Math.min(t*.055,44)),d=i*h+(i-1)*a,u=(e-d)/2,g=t*.63,m=[];for(let _=0;_<i;_++)m.push({x:u+_*(h+a),y:g,w:h,h:r});const y=g+r+Math.max(14,t*.026);return{difficulty:m,again:{x:(e-n)/2,y,w:n,h:l},title:{x:(e-s)/2,y:y+l+Math.max(10,t*.018),w:s,h:o}}}function re(e,t,i){const n=Math.max(16,e*.055),l=Math.min(t*.105,84),s=l*.22,o=t*.19,a=e-n,h=Math.max(5,e*.016),r=[];for(let p=0;p<i.length;p++){const M=o+p*(l+s),T=i[p],B=T<=2?Math.min(e*.21,86):Math.min(e*.125,52),J=l*.6,kt=T*B+(T-1)*h,G=a-kt,Ut=[];for(let Ct=0;Ct<T;Ct++)Ut.push({x:G+Ct*(B+h),y:M+(l-J)/2,w:B,h:J});r.push({label:{x:n,y:M,w:Math.max(40,G-n-10),h:l},chips:Ut})}const d=Math.min(e*.5,230),u=Math.max(q,Math.min(t*.085,64)),g=Math.min(e*.62,260),m=Math.max(q,Math.min(t*.055,48)),y=Math.min(e*.5,210),_=Math.max(q,Math.min(t*.055,48)),C=t*.7,b=C+u+Math.max(10,t*.018);return{rows:r,close:{x:(e-d)/2,y:C,w:d,h:u},reset:{x:(e-g)/2,y:b,w:g,h:m},admin:{x:(e-y)/2,y:b+m+Math.max(8,t*.012),w:y,h:_}}}const Ze=3e3;class ti{constructor(){H(this,"samples",[]);H(this,"lastHitAt",null);H(this,"hits",0);H(this,"misses",0)}reset(){this.samples=[],this.lastHitAt=null,this.hits=0,this.misses=0}recordMiss(){this.misses++}recordHit(t,i,n){this.hits++;const l=this.lastHitAt;if(this.lastHitAt=t,l===null)return;const s=t-l;s>Ze||this.samples.push({mode:n,depth:i,interval:s})}summary(t,i,n){const l=this.samples.filter(u=>u.mode==="open"),s=this.samples.filter(u=>u.mode==="blind"),o=rt(l.map(u=>u.interval)),a=rt(s.map(u=>u.interval)),h=l.filter(u=>u.depth>=t),r=l.filter(u=>u.depth<=i),d=l.filter(u=>u.interval<n).length;return{hits:this.hits,misses:this.misses,openMedian:o,blindMedian:a,lookaheadGain:o!==null&&a!==null&&o>0?a/o:null,deepMedian:rt(h.map(u=>u.interval)),shallowMedian:rt(r.map(u=>u.interval)),preemptRate:l.length>0?d/l.length:null}}count(t){return this.samples.filter(i=>i.mode===t).length}}function rt(e){if(e.length===0)return null;const t=[...e].sort((n,l)=>n-l),i=t.length>>1;return t.length%2===1?t[i]:(t[i-1]+t[i])/2}const ei={color:-1,shape:null,dots:0,layout:0,numeral:0,tenGroup:0,text:""};function V(e){return{...ei,...e}}const Ft=["circle","square","triangle","diamond","star"],he={1:[[[1,1]],[[0,0]],[[2,2]]],2:[[[0,0],[2,2]],[[2,0],[0,2]],[[0,1],[2,1]]],3:[[[0,0],[1,1],[2,2]],[[2,0],[1,1],[0,2]],[[1,0],[0,2],[2,2]]],4:[[[0,0],[2,0],[0,2],[2,2]],[[1,0],[0,1],[2,1],[1,2]],[[0,0],[2,0],[1,1],[1,2]]],5:[[[0,0],[2,0],[1,1],[0,2],[2,2]],[[1,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[2,0],[0,1],[0,2],[2,2]]]};function ii(e,t){const i=he[e];return!i||i.length===0?[]:i[t%i.length]}function ni(e,t){var n;const i=((n=he[e])==null?void 0:n.length)??1;return Math.min(i-1,Math.floor(t()*i))}function Kt(e,t){return V({color:e,shape:t.colorAssist?Ft[e]??"circle":null})}const Lt={iro:{id:"iro",label:"いろ",note:"同一マッチ。色だけ。2〜3歳",maxAnswers:5,buttonFace:(e,t)=>Kt(e,t),blockFace:(e,t,i)=>Kt(e,i)},katachi:{id:"katachi",label:"かたち",note:"同一マッチ。色の手がかりを消してある。3歳",maxAnswers:5,buttonFace:e=>V({shape:Ft[e]??"circle"}),blockFace:e=>V({shape:Ft[e]??"circle"})},ikutsu:{id:"ikutsu",label:"いくつ",note:"変換マッチ。サイコロの目を見て数字を押す。4〜5歳",maxAnswers:5,buttonFace:e=>V({numeral:e+1}),blockFace:(e,t)=>V({dots:e+1,layout:ni(e+1,t)})},hosuu:{id:"hosuu",label:"10のほすう",note:"変換マッチ。あと何個で10か。さくらんぼ算の土台。小1",maxAnswers:5,buttonFace:e=>V({numeral:e+1}),blockFace:e=>V({tenGroup:9-e})},tashizan:{id:"tashizan",label:"たしざん",note:"変換マッチ。式を見て答えを押す。答えは2〜6。小1",maxAnswers:5,buttonFace:e=>V({numeral:e+2}),blockFace:(e,t)=>{const i=e+2,n=1+Math.min(i-2,Math.floor(t()*(i-1)));return V({text:`${n}+${i-n}`})}}},Wt=["iro","katachi","ikutsu","hosuu","tashizan"],ht=5,N=[{key:"soundOn",label:"おと",hint:"こうかおん",choices:[{label:"あり",value:!0},{label:"なし",value:!1}]},{key:"baseSec",label:"じかん",hint:"1かいの ながさ（びょう）",choices:[{label:"20",value:20},{label:"30",value:30},{label:"45",value:45},{label:"60",value:60}]},{key:"showCount",label:"すうじ",hint:"のこりと けしたかず",choices:[{label:"だす",value:!0},{label:"ださない",value:!1}]},{key:"colorAssist",label:"いろのサポート",hint:"かたちを かさねる",choices:[{label:"なし",value:!1},{label:"あり",value:!0}]}];function Nt(e,t,i){switch(t){case"soundOn":e.soundOn=i.value;break;case"showCount":e.showCount=i.value;break;case"colorAssist":e.colorAssist=i.value;break;case"baseSec":e.baseSec=i.value;break}}function ce(e,t){return t.choices.findIndex(i=>i.value===e[t.key])}function li(e,t){for(const i of N)if(ce(e,i)<0){const n=i.choices.find(l=>l.value===t[i.key]);n&&Nt(e,i.key,n)}}function si(e,t){for(const i of N){const n=i.choices.find(l=>l.value===t[i.key]);n&&Nt(e,i.key,n)}}function oi(e){return{elapsed:0,penalty:0,cleared:0,missed:0}}function de(e,t){return Math.max(0,t.baseSec-e.elapsed-e.penalty)}function ai(e,t){return de(e,t)<=0}function ri(e,t){e.elapsed+=t}function hi(e,t){e.cleared++,e.penalty=Math.max(0,e.penalty-t.hitRecoverSec)}function ci(e,t){e.missed++,e.penalty+=t.missPenaltySec}const Mt="rgba(74,58,36,0.20)";function di(e,t){const{layout:i,column:n,mode:l}=t;mi(e,i),gi(e,i,t);const s=i.colX-i.blockW/2;for(let o=0;o<n.queue.length;o++){const a=n.queue[o];if(!a)continue;const h=n.bottomY-(o+1)*i.blockH;if(h>i.restY||h+i.blockH<i.headerH-i.blockH)break;let r=h,d=i.blockH;const u=o===0;if(u&&t.squash>0&&(d=i.blockH*(1-.2*t.squash),r=h+(i.blockH-d)),u){const g=i.blockW*1.09,m=i.colX-g/2;ui(e,m,r,g,d,t.targetPulse),xt(e,m,r,g,d,a.face,!1,bi),t.showPointer&&fi(e,m,r,g,d,t.targetPulse)}else xt(e,s,r,i.blockW,d,a.face,t.hideAhead,yi)}t.effects.draw(e);for(let o=0;o<t.answerCount;o++){const a=i.buttons[o];if(!a)continue;const h=(t.press[o]??0)*5;xt(e,a.x,a.y+h,a.w,a.h,l.buttonFace(o,t.faceOpts),!1,{...Pt,shadow:Pt.shadow-h})}}function ui(e,t,i,n,l,s){const o=5+s*4;v(e,t-o,i-o,n+o*2,l+o*2,(l+o*2)*.3),e.lineWidth=4,e.strokeStyle=`rgba(74,58,36,${.14+s*.24})`,e.stroke()}function fi(e,t,i,n,l,s){const o=i+l/2,a=Math.min(l*.3,22),h=s*a*.45;e.fillStyle="#c07000";for(const r of[-1,1]){const d=r<0?t-16-h:t+n+16+h;e.beginPath(),e.moveTo(d,o),e.lineTo(d-r*a,o-a*.6),e.lineTo(d-r*a,o+a*.6),e.closePath(),e.fill()}}function pi(e,t,i){i?e.drawImage(i,-t.offsetX,-t.offsetY,t.frameW,t.frameH):(e.fillStyle=Bt,e.fillRect(-t.offsetX,-t.offsetY,t.frameW,t.frameH))}function mi(e,t){const i=t.card,n=Math.min(i.w,i.h)*.07;v(e,i.x,i.y+5,i.w,i.h,n),e.fillStyle="rgba(74,58,36,0.13)",e.fill();const l=e.createLinearGradient(0,i.y,0,i.y+i.h);l.addColorStop(0,Ye),l.addColorStop(1,Le),v(e,i.x,i.y,i.w,i.h,n),e.fillStyle=l,e.fill()}function gi(e,t,i){const n=i.session,l=de(n,i.sessionCfg),s=t.card.x,o=t.card.w,a=Math.max(5,t.headerH*.075),h=t.headerH*.52;v(e,s,h,o,a,a/2),e.fillStyle="rgba(74,58,36,0.16)",e.fill();const r=Math.max(0,Math.min(1,l/i.sessionCfg.baseSec));r>0&&(e.fillStyle=l<=5?"#e0453f":l<=12?"#d98a1a":"#3f9c63",v(e,s,h,Math.max(a,o*r),a,a/2),e.fill()),i.showCount&&(e.textBaseline="alphabetic",e.font=`700 ${Math.round(Math.min(t.headerH*.24,17))}px ${S}`,e.fillStyle=R,e.textAlign="left",e.fillText(`${Math.ceil(l)}`,s+1,h-a*1.1),e.textAlign="right",e.fillText(`${n.cleared}こ`,s+o-1,h-a*1.1))}const Pt={shadow:6,gloss:!0,edge:.075},bi={shadow:4,gloss:!1,edge:.055},yi={shadow:0,gloss:!1,edge:.045};function xt(e,t,i,n,l,s,o,a=Pt){const h=Math.min(n,l)*.26,r=2;a.shadow>0&&(v(e,t+r,i+r+a.shadow,n-r*2,l-r*2,h),e.fillStyle=Mt,e.fill());const d=o?{fill:"#e6dbc6",edge:"#b3a288",gloss:"#f4ecdd",glyph:"#b3a288"}:s.color>=0?W[s.color]:ie;v(e,t+r,i+r,n-r*2,l-r*2,h),e.fillStyle=d.fill,e.fill(),a.gloss&&(e.save(),e.clip(),v(e,t+r,i+r,n-r*2,(l-r*2)*.44,h),e.fillStyle=d.gloss,e.globalAlpha=.42,e.fill(),e.restore(),e.globalAlpha=1),v(e,t+r,i+r,n-r*2,l-r*2,h),e.lineWidth=Math.max(2,Math.min(n,l)*a.edge),e.strokeStyle=d.edge,e.stroke(),o||wi(e,s,t+n/2,i+l/2,n-r*2,l-r*2,d.glyph)}function wi(e,t,i,n,l,s,o){const a=Math.min(l,s);if(e.fillStyle=o,t.tenGroup>0){vi(e,t.tenGroup,i,n,l,s,o);return}if(t.text){e.textAlign="center",e.textBaseline="middle",e.font=`800 ${Math.round(Math.min(s*.46,l*.86/t.text.length))}px ${S}`,e.fillText(t.text,i,n+a*.03);return}if(t.numeral>0){e.textAlign="center",e.textBaseline="middle",e.font=`800 ${Math.round(a*.6)}px ${S}`,e.fillText(String(t.numeral),i,n+a*.04);return}if(t.shape){ne(e,t.shape,i,n,a*.25),e.fill();return}if(t.dots>0){const h=a*.26,r=a*.098;for(const[d,u]of ii(t.dots,t.layout))e.beginPath(),e.arc(i+(d-1)*h,n+(u-1)*h,r,0,Math.PI*2),e.fill()}}function vi(e,t,i,n,l,s,o){const a=l*.88/ht,h=Math.min(s*.38,a*1.1),r=i-a*ht/2,d=n-h,u=Math.min(a,h)*.34;e.fillStyle=o;for(let g=0;g<t;g++){const m=r+g%ht*a+a/2,y=d+Math.floor(g/ht)*h+h/2;e.beginPath(),e.arc(m,y,u,0,Math.PI*2),e.fill()}}function Mi(e,t,i,n){const s=[..."みつけてポン"];e.font=`800 ${Math.round(n)}px ${S}`;const o=n*.06,a=s.map(m=>e.measureText(m).width),h=a.reduce((m,y)=>m+y,0)+o*(s.length-1);let r=t-h/2;e.textAlign="left",e.textBaseline="alphabetic";for(let m=0;m<s.length;m++){const y=a[m],_=s.length>1?m/(s.length-1):.5,C=-Math.sin(_*Math.PI)*n*.09,b=(m%2===0?-1:1)*.052;e.save(),e.translate(r+y/2,i+C),e.rotate(b),e.fillStyle="rgba(74,58,36,0.16)",e.fillText(s[m],-y/2,n*.36+n*.07),e.fillStyle=A,e.fillText(s[m],-y/2,n*.36),e.restore(),r+=y+o}const d=h*.62,u=d/W.length,g=i+n*.72;for(let m=0;m<W.length;m++){const y=W[m];v(e,t-d/2+m*u+u*.16,g,u*.68,n*.095,n*.05),e.fillStyle=y.fill,e.fill()}e.textAlign="center",e.textBaseline="middle"}function _i(e,t,i,n){e.textAlign="center",e.textBaseline="middle";for(let l=0;l<t.length;l++){const s=i[l],o=t[l];if(!s||!o)continue;const a=o.id===n;v(e,s.x,s.y,s.w,s.h,s.h*.42),e.fillStyle=a?A:"rgba(255,255,255,0.66)",e.fill(),e.lineWidth=3,e.strokeStyle=a?A:"rgba(74,58,36,0.24)",e.stroke(),e.fillStyle=a?"#fff6e6":R,Z(e,o.label,s.w*.86,Math.min(s.h*.38,18),700),e.fillText(o.label,s.x+s.w/2,s.y+s.h/2)}}function $i(e,t){e.fillStyle=We,e.fillRect(-t.offsetX,-t.offsetY,t.frameW,t.frameH);const i=t.frameW/2-t.offsetX,n=t.frameH/2-t.offsetY,l=Math.min(t.frameH*.2,90),s=l*1.5;v(e,i-l/2,n-s/2-t.frameH*.06,l,s,l*.16),e.fillStyle="rgba(255,255,255,0.8)",e.fill(),e.lineWidth=5,e.strokeStyle=A,e.stroke(),e.textAlign="center",e.textBaseline="middle",e.fillStyle=A,e.font=`800 ${Math.round(Math.min(t.frameW*.05,30))}px ${S}`,e.fillText("たてに してね",i,n+t.frameH*.28)}function Ai(e,t,i){e.textAlign="center",e.textBaseline="middle",Mi(e,t.w/2,t.h*.15,Math.min(t.w*.132,56));for(let n=0;n<i.difficulties.length;n++){const l=i.difficultyRects[n],s=i.difficulties[n];if(!l||!s)continue;const o=s.id===i.selected;v(e,l.x,l.y,l.w,l.h,l.h*.42),e.fillStyle=o?A:"rgba(255,255,255,0.66)",e.fill(),e.lineWidth=3,e.strokeStyle=o?A:"rgba(74,58,36,0.22)",e.stroke(),e.fillStyle=o?"#fff6e6":R,e.font=`700 ${Math.round(Math.min(l.h*.38,l.w*.21))}px ${S}`,e.fillText(s.label,l.x+l.w/2,l.y+l.h/2)}for(let n=0;n<i.modes.length;n++){const l=i.modeRects[n],s=i.modes[n];if(!l||!s)continue;const o=W[n];v(e,l.x,l.y+7,l.w,l.h,l.h*.32),e.fillStyle=Mt,e.fill(),v(e,l.x,l.y,l.w,l.h,l.h*.32),e.fillStyle=o.fill,e.fill(),e.save(),e.clip(),v(e,l.x,l.y,l.w,l.h*.44,l.h*.32),e.globalAlpha=.4,e.fillStyle=o.gloss,e.fill(),e.restore(),e.globalAlpha=1,v(e,l.x,l.y,l.w,l.h,l.h*.32),e.lineWidth=4,e.strokeStyle=o.edge,e.stroke(),e.fillStyle="#ffffff",e.font=`800 ${Math.round(l.h*.44)}px ${S}`,e.fillText(s.label,l.x+l.w/2,l.y+l.h/2)}if(ue(e,Yt(t.w,t.h)),i.notices.length>0){const n=Math.round(Math.min(t.w*.038,15));e.font=`700 ${n}px ${S}`;const l=t.h-Math.max(14,t.h*.03);e.fillStyle="#c07000",e.fillText("⚙ きてい以外の設定",t.w/2,l-n*1.5*i.notices.length),e.fillStyle="rgba(192,112,0,0.75)",i.notices.forEach((s,o)=>{e.fillText(s,t.w/2,l-n*1.5*(i.notices.length-1-o))})}}function Si(e,t,i,n,l,s,o){e.textAlign="center",e.textBaseline="middle",l.draw(e),e.fillStyle=A,e.font=`800 ${Math.round(Math.min(t.w*.1,42))}px ${S}`,e.fillText("よくできました",t.w/2,t.h*.24);const{cx:a,cy:h,r}=Je(t.w,t.h);if(e.beginPath(),e.arc(a,h+7,r,0,Math.PI*2),e.fillStyle=Mt,e.fill(),e.beginPath(),e.arc(a,h,r,0,Math.PI*2),e.fillStyle="#ffc93c",e.fill(),e.lineWidth=6,e.strokeStyle="#c07f00",e.stroke(),n)e.fillStyle="#7a4b00",e.font=`800 ${Math.round(r*1)}px ${S}`,e.fillText(`${i.cleared}`,a,h),e.fillStyle=R,e.font=`700 ${Math.round(Math.min(t.w*.05,20))}px ${S}`,e.fillText(`ミス ${i.missed}`,a,h+r+24);else{const u=Math.min(i.cleared,40),g=Math.min(t.w*.024,12),m=8;for(let y=0;y<u;y++){const _=a+(y%m-(m-1)/2)*g*2.6,C=h-r*.5+Math.floor(y/m)*g*2.7;e.beginPath(),e.arc(_,C,g,0,Math.PI*2),e.fillStyle="#7a4b00",e.fill()}}const d=ae(t.w,t.h,s.length);_i(e,s,d.difficulty,o),ft(e,d.again,"もういちど","#4bd37b","#188c4a","#ffffff"),ft(e,d.title,"タイトルへ","rgba(255,255,255,0.72)",R,A),ue(e,Yt(t.w,t.h))}function ft(e,t,i,n,l,s){e.textAlign="center",e.textBaseline="middle",v(e,t.x,t.y+6,t.w,t.h,t.h*.36),e.fillStyle=Mt,e.fill(),v(e,t.x,t.y,t.w,t.h,t.h*.36),e.fillStyle=n,e.fill(),e.lineWidth=4,e.strokeStyle=l,e.stroke(),e.fillStyle=s,e.font=`800 ${Math.round(t.h*.42)}px ${S}`,e.fillText(i,t.x+t.w/2,t.y+t.h/2)}function ue(e,t){v(e,t.x,t.y,t.w,t.h,t.h*.32),e.fillStyle="rgba(255,255,255,0.66)",e.fill(),e.lineWidth=2.5,e.strokeStyle="rgba(74,58,36,0.28)",e.stroke();const i=t.w*.26,n=t.x+i,l=t.x+t.w-i,s=[.7,.32,.58];e.lineCap="round",e.lineWidth=Math.max(2,t.w*.07);for(let o=0;o<s.length;o++){const a=t.y+t.h*(.32+o*.18);e.strokeStyle=R,e.beginPath(),e.moveTo(n,a),e.lineTo(l,a),e.stroke();const h=n+(l-n)*s[o];e.fillStyle=A,e.beginPath(),e.arc(h,a,t.w*.075,0,Math.PI*2),e.fill()}e.lineCap="butt"}function Z(e,t,i,n,l){const s=Math.round(n);e.font=`${l} ${s}px ${S}`;const o=e.measureText(t).width;o<=i||(e.font=`${l} ${Math.max(9,Math.floor(s*(i/o)))}px ${S}`)}function ki(e,t,i){e.textAlign="center",e.textBaseline="middle",e.fillStyle=A,e.font=`800 ${Math.round(Math.min(t.w*.09,38))}px ${S}`,e.fillText("せってい",t.w/2,t.h*.12);const n=re(t.w,t.h,N.map(l=>l.choices.length));for(let l=0;l<N.length;l++){const s=N[l],o=n.rows[l];if(!s||!o)continue;const a=ce(i,s);e.textAlign="left",e.fillStyle=A,Z(e,s.label,o.label.w,Math.min(o.label.h*.33,21),700),e.fillText(s.label,o.label.x,o.label.y+o.label.h*.38),e.fillStyle=R,Z(e,s.hint,o.label.w,Math.min(o.label.h*.21,13),600),e.fillText(s.hint,o.label.x,o.label.y+o.label.h*.68),e.textAlign="center";for(let h=0;h<o.chips.length;h++){const r=o.chips[h],d=s.choices[h];if(!r||!d)continue;const u=h===a;v(e,r.x,r.y,r.w,r.h,r.h*.4),e.fillStyle=u?A:"rgba(255,255,255,0.72)",e.fill(),e.lineWidth=3,e.strokeStyle=u?A:"rgba(74,58,36,0.22)",e.stroke(),e.fillStyle=u?"#fff6e6":R,Z(e,d.label,r.w*.82,r.h*.42,700),e.fillText(d.label,r.x+r.w/2,r.y+r.h/2)}}ft(e,n.close,"とじる","#4bd37b","#188c4a","#ffffff"),ft(e,n.reset,"さいしょに もどす","rgba(255,255,255,0.72)",R,A),e.fillStyle=R,Z(e,"かんりしゃメニュー",n.admin.w*.9,Math.min(n.admin.h*.36,15),600),e.fillText("かんりしゃメニュー",t.w/2,n.admin.y+n.admin.h/2)}const Qt=["circle","square","triangle","diamond","star"];function Ci(e){let t=e;return()=>(t=(t*1103515245+12345)%2147483648,t/2147483648)}function Ei(e=96){const t=document.createElement("canvas");t.width=e,t.height=e;const i=t.getContext("2d");if(!i)return t;const n=i.createImageData(e,e);for(let l=0;l<n.data.length;l+=4){const s=Math.random()<.5?0:255;n.data[l]=s,n.data[l+1]=s,n.data[l+2]=s,n.data[l+3]=90}return i.putImageData(n,0,0),t}function xi(e,t,i){const n=document.createElement("canvas");n.width=Math.max(1,Math.round(e*i)),n.height=Math.max(1,Math.round(t*i));const l=n.getContext("2d");if(!l)return n;l.scale(i,i),l.fillStyle=Bt,l.fillRect(0,0,e,t);const s=Ci(20260905),o=Math.max(88,Math.min(e,t)*.26);l.fillStyle="rgba(74,58,36,0.05)";for(let h=-o*.5;h<t+o;h+=o)for(let r=-o*.5;r<e+o;r+=o){const d=Qt[Math.floor(s()*Qt.length)],u=r+s()*o*.7,g=h+s()*o*.7,m=o*(.14+s()*.11);l.save(),l.translate(u,g),l.rotate((s()-.5)*.9),ne(l,d,0,0,m),l.fill(),l.restore()}const a=l.createPattern(Ei(),"repeat");return a&&(l.globalAlpha=.035,l.fillStyle=a,l.fillRect(0,0,e,t),l.globalAlpha=1),n}const c=(e,t=1)=>({midi:e,len:t}),ct=[{id:"twinkle",label:"きらきらぼし",source:"フランス民謡 “Ah! vous dirai-je, maman”（1761）",notes:[c(72),c(72),c(79),c(79),c(81),c(81),c(79,2),c(77),c(77),c(76),c(76),c(74),c(74),c(72,2)]},{id:"mary",label:"メリーさんのひつじ",source:"アメリカ伝承（1830）",notes:[c(76),c(74),c(72),c(74),c(76),c(76),c(76,2),c(74),c(74),c(74,2),c(76),c(79),c(79,2)]},{id:"london",label:"ロンドンばし",source:"イングランド伝承",notes:[c(79),c(81),c(79),c(77),c(76),c(77),c(79,2),c(74),c(76),c(77,2),c(76),c(77),c(79,2)]},{id:"frog",label:"かえるのうた",source:"ドイツ民謡 “Froschgesang”",notes:[c(72),c(74),c(76),c(77),c(76),c(74),c(72,2),c(76),c(77),c(79),c(81),c(79),c(77),c(76,2)]},{id:"joy",label:"よろこびのうた",source:"ベートーヴェン 交響曲第9番（1824）",notes:[c(76),c(76),c(77),c(79),c(79),c(77),c(76),c(74),c(72),c(72),c(74),c(76),c(76,1.5),c(74,.5),c(74,2)]}];function Ti(e){return 440*Math.pow(2,(e-69)/12)}function Oi(e){const t=Math.min(ct.length-1,Math.floor(e()*ct.length));return ct[t]}class Fi{constructor(){H(this,"song",ct[0]);H(this,"index",0)}setSong(t){this.song=t,this.index=0}get current(){return this.song}get progress(){return this.index/this.song.notes.length}next(){const t=this.song.notes[this.index];return this.index=(this.index+1)%this.song.notes.length,t}reset(){this.index=0}}let $=null,zt=!0;function pt(e){zt=e}let mt=null;function Pi(){if($)return;const e=window.AudioContext??window.webkitAudioContext;if(!e)return;$=new e,$.resume();const t=Math.floor($.sampleRate*.25);mt=$.createBuffer(1,t,$.sampleRate);const i=mt.getChannelData(0);for(let n=0;n<t;n++)i[n]=Math.random()*2-1}function gt(e,t,i,n,l){if(!$||!zt)return;const s=$.currentTime,o=$.createOscillator(),a=$.createGain();o.type=i,o.frequency.setValueAtTime(e,s),l&&o.frequency.exponentialRampToValueAtTime(l,s+t),a.gain.setValueAtTime(0,s),a.gain.linearRampToValueAtTime(n,s+.006),a.gain.exponentialRampToValueAtTime(1e-4,s+t),o.connect(a).connect($.destination),o.start(s),o.stop(s+t+.02)}function fe(e,t,i){if(!$||!mt||!zt)return;const n=$.currentTime,l=$.createBufferSource();l.buffer=mt;const s=$.createBiquadFilter();s.type="bandpass",s.frequency.setValueAtTime(i,n),s.Q.value=1.1;const o=$.createGain();o.gain.setValueAtTime(t,n),o.gain.exponentialRampToValueAtTime(1e-4,n+e),l.connect(s).connect(o).connect($.destination),l.start(n),l.stop(n+e+.02)}function Hi(e){const t=Ti(e.midi),i=Math.min(.34,.13*e.len+.04);gt(t,i,"triangle",.17),gt(t*2,i*.45,"sine",.045),fe(.035,.05,2400)}function Di(){gt(150,.09,"sine",.1,90),fe(.04,.03,320)}function Ri(){gt(330,.1,"sine",.07,250)}const pe="mitsukete-pon.played.v1";function Ii(){try{return localStorage.getItem(pe)==="1"}catch{return!1}}function Vi(){try{localStorage.setItem(pe,"1")}catch{}}const X={mode:"iro",difficulty:"easy",bottomGapBlocks:.45,fallBlocksPerSec:10,blockScale:.22,baseSec:30,missPenaltySec:.5,hitRecoverSec:.3,soundOn:!0,showCount:!0,colorAssist:!1,effectsOn:!0,hideAhead:!1},qt="mitsukete-pon.tuning.v1";function Bi(){try{const e=localStorage.getItem(qt);return e?{...X,...JSON.parse(e)}:{...X}}catch{return{...X}}}function z(e){try{localStorage.setItem(qt,JSON.stringify(e))}catch{}}function Yi(){try{localStorage.removeItem(qt)}catch{}}const Jt={bottomGapBlocks:"下の隙間",fallBlocksPerSec:"ストンの速さ",blockScale:"ブロック大きさ",missPenaltySec:"ミスで-秒",hitRecoverSec:"正解でもどる秒",effectsOn:"演出",hideAhead:"先を隠す"};function Li(e){const t=[];for(const i of Object.keys(Jt))e[i]!==X[i]&&t.push(`${Jt[i]}: ${String(e[i])}`);return t}const bt=document.getElementById("stage"),O=bt.getContext("2d"),Wi=document.getElementById("hud"),f=Bi();li(f,X);const E=new qe,Ht=new Fi;let k="title",w=le(1,1,3,.22,3,.45),yt=[],wt=[],at=Lt[f.mode],L,P,Y;const vt=new ti,tt=[0,0,0,0,0];let et=0,dt=0,Dt=!1,Zt="title",F={x:0,y:0,w:1,h:1},Xt=!1,Rt=!Ii(),me=null,ut=1;function st(e){k!==e&&(ut=0),k=e}function K(){return Ve(f.difficulty)}function _t(){return Be(f.difficulty)}function ge(){return{colorAssist:f.colorAssist}}function ot(){return{baseSec:f.baseSec,missPenaltySec:f.missPenaltySec,hitRecoverSec:f.hitRecoverSec}}function Ni(){const e=getComputedStyle(document.documentElement).getPropertyValue("--sab");return Number.parseFloat(e)||0}function U(){const e=window.innerWidth,t=window.innerHeight,i=Math.min(window.devicePixelRatio||1,2);bt.width=Math.round(e*i),bt.height=Math.round(t*i),Xt=Ge(e,t),F=Ue(e,t),O.setTransform(i,0,0,i,F.x*i,F.y*i),me=xi(e,t,i),w=le(F.w,F.h,K(),f.blockScale,_t(),f.bottomGapBlocks,Ni(),F),yt=Ke(F.w,F.h,Wt.length),wt=Qe(F.w,F.h,j.length),P&&(P.blockH=w.blockH,P.lineY=w.restY)}function zi(){return{blockH:w.blockH,fallBlocksPerSec:f.fallBlocksPerSec,spawnPerSec:0,answerCount:K(),maxQueue:_t(),lineY:w.restY,makeFace:(e,t)=>at.blockFace(e,t,ge())}}let $t="";function At(){Wi.textContent=it?$t:""}function be(){st("title"),$t="",At(),E.clear()}function te(e){at=e,f.mode=e.id,z(f),U(),P=zi(),Ht.setSong(Oi(Math.random)),L=De(P,Math.random),Y=oi(ot()),vt.reset(),E.clear(),dt=0,et=0,Dt=!1,$t="",At(),st("play")}function ye(e){var s;if(k!=="play"||e>=K())return;tt[e]=1;const t=L.queue.length,i=(s=L.queue[0])==null?void 0:s.face,n=L.bottomY-w.blockH/2;if(Ie(L,e,P)==="hit"){vt.recordHit(performance.now(),t,f.hideAhead?"blind":"open"),hi(Y,ot()),dt++,Rt&&(Rt=!1,Vi()),Hi(Ht.next());const o=i&&i.color>=0?W[i.color]:ie;E.burst(w.colX,n,w.blockW,w.blockH,o.fill,o.edge,Math.random,dt);const a=w.buttons[e];a&&E.beam(a.x+a.w/2,a.w*.3,a.y,w.restY,o.fill)}else vt.recordMiss(),ci(Y,ot()),dt=0,Ht.reset(),Ri()}function qi(){st("result"),E.clear(),E.confetti(w.w,w.h,60,Math.random);const e=vt.summary(4,2,350),t=i=>i===null?"—":`${Math.round(i)}ms`;$t=[`${at.label} / ${lt[f.difficulty].label}(${K()}こ) / ${_t()}段${f.hideAhead?" / 先を隠す":""}`,`消した ${e.hits}  ミス ${e.misses}`,`中央値タップ間隔 ${t(e.openMedian??e.blindMedian)}`].join(`
`),At()}function Xi(e,t){if((k==="title"||k==="result")&&D(Yt(w.w,w.h),e,t)){Zt=k,st("settings");return}if(k==="settings"){const n=re(w.w,w.h,N.map(l=>l.choices.length));for(let l=0;l<N.length;l++){const s=N[l],o=n.rows[l];if(!(!s||!o))for(let a=0;a<o.chips.length;a++){const h=o.chips[a],r=s.choices[a];if(!(!h||!r||!D(h,e,t))){Nt(f,s.key,r),z(f),pt(f.soundOn),x.controllersRecursive().forEach(d=>d.updateDisplay());return}}}D(n.close,e,t)?st(Zt):D(n.reset,e,t)?(si(f,X),z(f),pt(f.soundOn),x.controllersRecursive().forEach(l=>l.updateDisplay())):D(n.admin,e,t)&&St();return}if(k==="title"){for(let n=0;n<wt.length;n++){const l=wt[n],s=j[n];if(l&&s&&D(l,e,t)){f.difficulty=s,z(f),U();return}}for(let n=0;n<yt.length;n++){const l=yt[n],s=Wt[n];l&&s&&D(l,e,t)&&te(Lt[s])}return}if(k==="result"){const n=ae(w.w,w.h,j.length);for(let l=0;l<n.difficulty.length;l++){const s=n.difficulty[l],o=j[l];if(s&&o&&D(s,e,t)){f.difficulty=o,z(f),U();return}}D(n.again,e,t)?te(at):D(n.title,e,t)&&be();return}const i=je(w,e,t);i!==null&&ye(i)}bt.addEventListener("pointerdown",e=>{Pi(),e.preventDefault(),!Xt&&Xi(e.clientX-F.x,e.clientY-F.y)},{passive:!1});window.addEventListener("keydown",e=>{e.key==="d"&&St();const t="12345".indexOf(e.key);t>=0&&k==="play"&&ye(t)});window.addEventListener("resize",U);const x=new Vt({title:"かんりしゃ",width:240});x.close();let it=!1;function St(){it=!it,x.domElement.style.display=it?"":"none",it&&x.open(),At()}St();St();const Q=e=>()=>{z(f),e&&U(),P&&(P.fallBlocksPerSec=f.fallBlocksPerSec,P.answerCount=K(),P.maxQueue=_t())};x.add(f,"bottomGapBlocks",0,1.5,.05).name("下の隙間(段)").onChange(Q(!0));x.add(f,"hideAhead").name("★先を隠す(対照)").onChange(Q(!1));x.add(f,"fallBlocksPerSec",2,30,1).name("ストンの速さ(段/秒)").onChange(Q(!1));x.add(f,"effectsOn").name("演出を出す").onChange(()=>{z(f),E.enabled=f.effectsOn,f.effectsOn||E.clear()});const we=x.addFolder("時間の判定").close();we.add(f,"missPenaltySec",0,3,.1).name("ミスで-秒").onChange(Q(!1));we.add(f,"hitRecoverSec",0,1,.05).name("正解でもどる秒").onChange(Q(!1));x.add(f,"blockScale",.08,.28,.005).name("ブロック大きさ").onChange(Q(!0));x.add({f:()=>{Object.assign(f,X),Yi(),E.enabled=f.effectsOn,pt(f.soundOn),x.controllersRecursive().forEach(e=>e.updateDisplay()),be(),U()}},"f").name("既定に戻す");E.enabled=f.effectsOn;pt(f.soundOn);U();let ee=performance.now();function It(){const e=performance.now(),t=Math.min((e-ee)/1e3,.05);ee=e;for(let n=0;n<tt.length;n++)tt[n]=Math.max(0,tt[n]-t*7);if(et=Math.max(0,et-t*7),E.update(t),k==="play"){ri(Y,t),Re(L,t,P,Math.random);const n=L.bottomY<P.lineY-.5;Dt&&!n&&(et=1,Di()),Dt=n,ai(Y,ot())&&qi()}if(Xt){$i(O,w),requestAnimationFrame(It);return}ut=Math.min(1,ut+t/.22);const i=1-Math.pow(1-ut,3);pi(O,w,me),O.save(),O.globalAlpha=i,O.translate(0,(1-i)*w.h*.022),k==="title"?Ai(O,w,{modes:Wt.map(n=>Lt[n]),modeRects:yt,difficulties:j.map(n=>lt[n]),difficultyRects:wt,selected:f.difficulty,notices:Li(f)}):k==="play"?di(O,{layout:w,column:L,mode:at,session:Y,sessionCfg:ot(),faceOpts:ge(),answerCount:K(),hideAhead:f.hideAhead,showCount:f.showCount,press:tt,squash:et,targetPulse:.5+.5*Math.sin(e/1100*Math.PI*2),showPointer:Rt&&Y.cleared===0,effects:E}):k==="result"?Si(O,w,Y,f.showCount,E,j.map(n=>lt[n]),f.difficulty):ki(O,w,f),O.restore(),O.globalAlpha=1,requestAnimationFrame(It)}requestAnimationFrame(It);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register(new URL("sw.js",document.baseURI).href)});
