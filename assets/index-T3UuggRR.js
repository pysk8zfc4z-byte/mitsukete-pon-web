var me=Object.defineProperty;var ge=(e,t,i)=>t in e?me(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var P=(e,t,i)=>ge(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))n(l);new MutationObserver(l=>{for(const s of l)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(l){const s={};return l.integrity&&(s.integrity=l.integrity),l.referrerPolicy&&(s.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?s.credentials="include":l.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(l){if(l.ep)return;l.ep=!0;const s=i(l);fetch(l.href,s)}})();/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.21.0
 * @author George Michael Brower
 * @license MIT
 */class R{constructor(t,i,n,l,s="div"){this.parent=t,this.object=i,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("lil-controller"),this.domElement.classList.add(l),this.$name=document.createElement("div"),this.$name.classList.add("lil-name"),R.nextNameID=R.nextNameID||0,this.$name.id=`lil-gui-name-${++R.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("lil-widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(t){return this._name=t,this.$name.textContent=t,this}onChange(t){return this._onChange=t,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(t=!0){return this.disable(!t)}disable(t=!0){return t===this._disabled?this:(this._disabled=t,this.domElement.classList.toggle("lil-disabled",t),this.$disable.toggleAttribute("disabled",t),this)}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(t){const i=this.parent.add(this.object,this.property,t);return i.name(this._name),this.destroy(),i}min(t){return this}max(t){return this}step(t){return this}decimals(t){return this}listen(t=!0){return this._listening=t,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const t=this.save();t!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=t}getValue(){return this.object[this.property]}setValue(t){return this.getValue()!==t&&(this.object[this.property]=t,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(t){return this.setValue(t),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class be extends R{constructor(t,i,n){super(t,i,n,"lil-boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function At(e){let t,i;return(t=e.match(/(#|0x)?([a-f0-9]{6})/i))?i=t[2]:(t=e.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(t[1]).toString(16).padStart(2,0)+parseInt(t[2]).toString(16).padStart(2,0)+parseInt(t[3]).toString(16).padStart(2,0):(t=e.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=t[1]+t[1]+t[2]+t[2]+t[3]+t[3]),i?"#"+i:!1}const ye={isPrimitive:!0,match:e=>typeof e=="string",fromHexString:At,toHexString:At},tt={isPrimitive:!0,match:e=>typeof e=="number",fromHexString:e=>parseInt(e.substring(1),16),toHexString:e=>"#"+e.toString(16).padStart(6,0)},ve={isPrimitive:!1,match:e=>Array.isArray(e)||ArrayBuffer.isView(e),fromHexString(e,t,i=1){const n=tt.fromHexString(e);t[0]=(n>>16&255)/255*i,t[1]=(n>>8&255)/255*i,t[2]=(n&255)/255*i},toHexString([e,t,i],n=1){n=255/n;const l=e*n<<16^t*n<<8^i*n<<0;return tt.toHexString(l)}},we={isPrimitive:!1,match:e=>Object(e)===e,fromHexString(e,t,i=1){const n=tt.fromHexString(e);t.r=(n>>16&255)/255*i,t.g=(n>>8&255)/255*i,t.b=(n&255)/255*i},toHexString({r:e,g:t,b:i},n=1){n=255/n;const l=e*n<<16^t*n<<8^i*n<<0;return tt.toHexString(l)}},Me=[ye,tt,ve,we];function _e(e){return Me.find(t=>t.match(e))}class $e extends R{constructor(t,i,n,l){super(t,i,n,"lil-color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=_e(this.initialValue),this._rgbScale=l,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=At(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(t){if(this._format.isPrimitive){const i=this._format.fromHexString(t);this.setValue(i)}else this._format.fromHexString(t,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(t){return this._setValueFromHexString(t),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class kt extends R{constructor(t,i,n){super(t,i,n,"lil-function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",l=>{l.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class ke extends R{constructor(t,i,n,l,s,o){super(t,i,n,"lil-number"),this._initInput(),this.min(l),this.max(s);const r=o!==void 0;this.step(r?o:this._getImplicitStep(),r),this.updateDisplay()}decimals(t){return this._decimals=t,this.updateDisplay(),this}min(t){return this._min=t,this._onUpdateMinMax(),this}max(t){return this._max=t,this._onUpdateMinMax(),this}step(t,i=!0){return this._step=t,this._stepExplicit=i,this}updateDisplay(){const t=this.getValue();if(this._hasSlider){let i=(t-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?t:t.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let p=parseFloat(this.$input.value);isNaN(p)||(this._stepExplicit&&(p=this._snap(p)),this.setValue(this._clamp(p)))},n=p=>{const M=parseFloat(this.$input.value);isNaN(M)||(this._snapClampSetValue(M+p),this.$input.value=this.getValue())},l=p=>{p.key==="Enter"&&this.$input.blur(),p.code==="ArrowUp"&&(p.preventDefault(),n(this._step*this._arrowKeyMultiplier(p))),p.code==="ArrowDown"&&(p.preventDefault(),n(this._step*this._arrowKeyMultiplier(p)*-1))},s=p=>{this._inputFocused&&(p.preventDefault(),n(this._step*this._normalizeMouseWheel(p)))};let o=!1,r,h,a,u,d;const m=5,b=p=>{r=p.clientX,h=a=p.clientY,o=!0,u=this.getValue(),d=0,window.addEventListener("mousemove",y),window.addEventListener("mouseup",k)},y=p=>{if(o){const M=p.clientX-r,C=p.clientY-h;Math.abs(C)>m?(p.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(M)>m&&k()}if(!o){const M=p.clientY-a;d-=M*this._step*this._arrowKeyMultiplier(p),u+d>this._max?d=this._max-u:u+d<this._min&&(d=this._min-u),this._snapClampSetValue(u+d)}a=p.clientY},k=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",y),window.removeEventListener("mouseup",k)},O=()=>{this._inputFocused=!0},g=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",l),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",b),this.$input.addEventListener("focus",O),this.$input.addEventListener("blur",g)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("lil-slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("lil-fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("lil-has-slider");const t=(g,p,M,C,j)=>(g-p)/(M-p)*(j-C)+C,i=g=>{const p=this.$slider.getBoundingClientRect();let M=t(g,p.left,p.right,this._min,this._max);this._snapClampSetValue(M)},n=g=>{this._setDraggingStyle(!0),i(g.clientX),window.addEventListener("mousemove",l),window.addEventListener("mouseup",s)},l=g=>{i(g.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",l),window.removeEventListener("mouseup",s)};let o=!1,r,h;const a=g=>{g.preventDefault(),this._setDraggingStyle(!0),i(g.touches[0].clientX),o=!1},u=g=>{g.touches.length>1||(this._hasScrollBar?(r=g.touches[0].clientX,h=g.touches[0].clientY,o=!0):a(g),window.addEventListener("touchmove",d,{passive:!1}),window.addEventListener("touchend",m))},d=g=>{if(o){const p=g.touches[0].clientX-r,M=g.touches[0].clientY-h;Math.abs(p)>Math.abs(M)?a(g):(window.removeEventListener("touchmove",d),window.removeEventListener("touchend",m))}else g.preventDefault(),i(g.touches[0].clientX)},m=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",d),window.removeEventListener("touchend",m)},b=this._callOnFinishChange.bind(this),y=400;let k;const O=g=>{if(Math.abs(g.deltaX)<Math.abs(g.deltaY)&&this._hasScrollBar)return;g.preventDefault();const M=this._normalizeMouseWheel(g)*this._step;this._snapClampSetValue(this.getValue()+M),this.$input.value=this.getValue(),clearTimeout(k),k=setTimeout(b,y)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",O,{passive:!1})}_setDraggingStyle(t,i="horizontal"){this.$slider&&this.$slider.classList.toggle("lil-active",t),document.body.classList.toggle("lil-dragging",t),document.body.classList.toggle(`lil-${i}`,t)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(t){let{deltaX:i,deltaY:n}=t;return Math.floor(t.deltaY)!==t.deltaY&&t.wheelDelta&&(i=0,n=-t.wheelDelta/120,n*=this._stepExplicit?1:10),i+-n}_arrowKeyMultiplier(t){let i=this._stepExplicit?1:10;return t.shiftKey?i*=10:t.altKey&&(i/=10),i}_snap(t){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),t-=i,t=Math.round(t/this._step)*this._step,t+=i,t=parseFloat(t.toPrecision(15)),t}_clamp(t){return t<this._min&&(t=this._min),t>this._max&&(t=this._max),t}_snapClampSetValue(t){this.setValue(this._clamp(this._snap(t)))}get _hasScrollBar(){const t=this.parent.root.$children;return t.scrollHeight>t.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class Se extends R{constructor(t,i,n,l){super(t,i,n,"lil-option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("lil-display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("lil-focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("lil-focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(l)}options(t){return this._values=Array.isArray(t)?t:Object.values(t),this._names=Array.isArray(t)?t:Object.keys(t),this.$select.replaceChildren(),this._names.forEach(i=>{const n=document.createElement("option");n.textContent=i,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const t=this.getValue(),i=this._values.indexOf(t);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?t:this._names[i],this}}class Ae extends R{constructor(t,i,n){super(t,i,n,"lil-string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",l=>{l.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var Ce=`.lil-gui {
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
}`;function Ee(e){const t=document.createElement("style");t.innerHTML=e;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(t,i):document.head.appendChild(t)}let Xt=!1;class Ht{constructor({parent:t,autoPlace:i=t===void 0,container:n,width:l,title:s="Controls",closeFolders:o=!1,injectStyles:r=!0,touchStyles:h=!0}={}){if(this.parent=t,this.root=t?t.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("lil-title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("lil-children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("lil-root"),h&&this.domElement.classList.add("lil-allow-touch-styles"),!Xt&&r&&(Ee(Ce),Xt=!0),n?n.appendChild(this.domElement):i&&(this.domElement.classList.add("lil-auto-place","autoPlace"),document.body.appendChild(this.domElement)),l&&this.domElement.style.setProperty("--width",l+"px"),this._closeFolders=o}add(t,i,n,l,s){if(Object(n)===n)return new Se(this,t,i,n);const o=t[i];switch(typeof o){case"number":return new ke(this,t,i,n,l,s);case"boolean":return new be(this,t,i);case"string":return new Ae(this,t,i);case"function":return new kt(this,t,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,t,`
	value:`,o)}addColor(t,i,n=1){return new $e(this,t,i,n)}addFolder(t){const i=new Ht({parent:this,title:t});return this.root._closeFolders&&i.close(),i}load(t,i=!0){return t.controllers&&this.controllers.forEach(n=>{n instanceof kt||n._name in t.controllers&&n.load(t.controllers[n._name])}),i&&t.folders&&this.folders.forEach(n=>{n._title in t.folders&&n.load(t.folders[n._title])}),this}save(t=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof kt)){if(n._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);i.controllers[n._name]=n.save()}}),t&&this.folders.forEach(n=>{if(n._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);i.folders[n._title]=n.save()}),i}open(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("lil-closed",this._closed),this}close(){return this.open(!1)}_setClosed(t){this._closed!==t&&(this._closed=t,this._callOnOpenClose(this))}show(t=!0){return this._hidden=!t,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(t=!0){return this._setClosed(!t),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("lil-transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("lil-transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const l=t?this.$children.scrollHeight:0;this.domElement.classList.toggle("lil-closed",!t),requestAnimationFrame(()=>{this.$children.style.height=l+"px"})}),this}title(t){return this._title=t,this.$title.textContent=t,this}reset(t=!0){return(t?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(t){return this._onChange=t,this}_callOnChange(t){this.parent&&this.parent._callOnChange(t),this._onChange!==void 0&&this._onChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onFinishChange(t){return this._onFinishChange=t,this}_callOnFinishChange(t){this.parent&&this.parent._callOnFinishChange(t),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:t.object,property:t.property,value:t.getValue(),controller:t})}onOpenClose(t){return this._onOpenClose=t,this}_callOnOpenClose(t){this.parent&&this.parent._callOnOpenClose(t),this._onOpenClose!==void 0&&this._onOpenClose.call(this,t)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(t=>t.destroy())}controllersRecursive(){let t=Array.from(this.controllers);return this.folders.forEach(i=>{t=t.concat(i.controllersRecursive())}),t}foldersRecursive(){let t=Array.from(this.folders);return this.folders.forEach(i=>{t=t.concat(i.foldersRecursive())}),t}}function Te(e,t,i){var r,h;const n=i.length,l=(r=i[n-1])==null?void 0:r.answer,s=n>=2&&l!==void 0&&l===((h=i[n-2])==null?void 0:h.answer)?l:-1;if(s<0||e<=1)return Math.min(e-1,Math.floor(t()*e));const o=Math.min(e-2,Math.floor(t()*(e-1)));return o>=s?o+1:o}function Ct(e,t,i){const n=Te(t.answerCount,i,e.queue);e.queue.push({answer:n,face:t.makeFace(n,i)})}function Fe(e,t){const i={queue:[],bottomY:e.lineY,spawnAcc:0},n=e.maxQueue>0?e.maxQueue:4;for(let l=0;l<n;l++)Ct(i,e,t);return i}function xe(e,t,i,n){if(e.bottomY=Math.min(i.lineY,e.bottomY+i.fallBlocksPerSec*i.blockH*t),i.maxQueue>0){for(;e.queue.length<i.maxQueue;)Ct(e,i,n);return}for(e.spawnAcc+=i.spawnPerSec*t;e.spawnAcc>=1;)e.spawnAcc-=1,Ct(e,i,n)}function Oe(e,t,i){const n=e.queue[0];return n?n.answer!==t?"miss":(e.queue.shift(),e.bottomY-=i.blockH,"hit"):"empty"}const et={easy:{id:"easy",label:"かんたん",answerCount:3,visibleCount:3},normal:{id:"normal",label:"ふつう",answerCount:4,visibleCount:4},hard:{id:"hard",label:"むずかしい",answerCount:5,visibleCount:5}},q=["easy","normal","hard"];function Pe(e){return et[e].answerCount}function He(e){return et[e].visibleCount}const it=[{fill:"#ff5a5f",edge:"#c02128",gloss:"#ff9296",glyph:"#ffffff",shape:"circle",label:"あか"},{fill:"#3fa9ff",edge:"#1259a8",gloss:"#8bccff",glyph:"#ffffff",shape:"square",label:"あお"},{fill:"#ffc93c",edge:"#c07f00",gloss:"#ffe293",glyph:"#7a4b00",shape:"triangle",label:"きいろ"},{fill:"#4bd37b",edge:"#188c4a",gloss:"#9aeab7",glyph:"#ffffff",shape:"diamond",label:"みどり"},{fill:"#b072ff",edge:"#6a2cbd",gloss:"#d6b1ff",glyph:"#ffffff",shape:"star",label:"むらさき"}],Jt={fill:"#efe0c6",edge:"#b09166",gloss:"#fff4de",glyph:"#6b5330"},De="#dcefff",Et="#fff4e2",S="#4a3a24",D="rgba(74,58,36,0.55)",A="ui-rounded, 'Hiragino Maru Gothic ProN', 'Hiragino Sans', -apple-system, BlinkMacSystemFont, 'Noto Sans JP', sans-serif";function Re(e,t,i,n,l){switch(e.beginPath(),t){case"circle":e.arc(i,n,l,0,Math.PI*2);break;case"square":e.rect(i-l*.85,n-l*.85,l*1.7,l*1.7);break;case"triangle":qt(e,i,n+l*.12,l*1.12,3,-Math.PI/2);break;case"diamond":qt(e,i,n,l*1.14,4,-Math.PI/2);break;case"star":Ve(e,i,n,l*1.16,l*.5,5);break}e.closePath()}function qt(e,t,i,n,l,s){for(let o=0;o<l;o++){const r=s+o*Math.PI*2/l,h=t+Math.cos(r)*n,a=i+Math.sin(r)*n;o===0?e.moveTo(h,a):e.lineTo(h,a)}}function Ve(e,t,i,n,l,s){for(let o=0;o<s*2;o++){const r=o%2===0?n:l,h=-Math.PI/2+o*Math.PI/s,a=t+Math.cos(h)*r,u=i+Math.sin(h)*r;o===0?e.moveTo(a,u):e.lineTo(a,u)}}function w(e,t,i,n,l,s){const o=Math.max(0,Math.min(s,n/2,l/2));e.beginPath(),e.moveTo(t+o,i),e.arcTo(t+n,i,t+n,i+l,o),e.arcTo(t+n,i+l,t,i+l,o),e.arcTo(t,i+l,t,i,o),e.arcTo(t,i,t+n,i,o),e.closePath()}const Ie=3200;class Ye{constructor(){P(this,"enabled",!0);P(this,"shards",[]);P(this,"beams",[])}clear(){this.shards.length=0,this.beams.length=0}get shardCount(){return this.shards.length}burst(t,i,n,l,s,o,r,h=0){if(!this.enabled)return;const a=Math.min(h,10)/10,u=7+Math.round(a*4);for(let d=0;d<u;d++){const m=d/u*Math.PI*2+r()*.6,b=90+r()*220;this.shards.push({x:t+(r()-.5)*n*.6,y:i+r()*l*.25,vx:Math.cos(m)*b,vy:Math.sin(m)*b*.55-100,rot:r()*Math.PI,vrot:(r()-.5)*14,size:Math.min(n,l)*(.14+r()*.12)*(1+a*.4),life:.42+r()*.12,maxLife:.54,fill:s,edge:o})}}beam(t,i,n,l,s){this.enabled&&this.beams.push({x:t,w:i,yFrom:n,yTo:l,life:.09,maxLife:.09,fill:s})}confetti(t,i,n,l){if(this.enabled)for(let s=0;s<n;s++){const o=it[Math.floor(l()*it.length)];this.shards.push({x:l()*t,y:-20-l()*i*.4,vx:(l()-.5)*120,vy:60+l()*160,rot:l()*Math.PI,vrot:(l()-.5)*10,size:6+l()*8,life:1.4+l()*.8,maxLife:2.2,fill:o.fill,edge:o.edge})}}update(t){for(let i=this.shards.length-1;i>=0;i--){const n=this.shards[i];if(n.life-=t,n.life<=0){this.shards.splice(i,1);continue}n.vy+=Ie*t,n.x+=n.vx*t,n.y+=n.vy*t,n.rot+=n.vrot*t}for(let i=this.beams.length-1;i>=0;i--){const n=this.beams[i];n.life-=t,n.life<=0&&this.beams.splice(i,1)}}draw(t){for(const i of this.beams){const n=1-i.life/i.maxLife,l=i.yFrom+(i.yTo-i.yFrom)*n,s=Math.abs(i.yFrom-i.yTo)*.42;t.globalAlpha=.55*(1-n),t.fillStyle=i.fill,w(t,i.x-i.w/2,l-s,i.w,s,i.w/2),t.fill()}t.globalAlpha=1;for(const i of this.shards){const n=Math.min(1,i.life/(i.maxLife*.4));t.globalAlpha=n,t.save(),t.translate(i.x,i.y),t.rotate(i.rot),w(t,-i.size/2,-i.size/2,i.size,i.size,i.size*.28),t.fillStyle=i.fill,t.fill(),t.lineWidth=Math.max(1.5,i.size*.14),t.strokeStyle=i.edge,t.stroke(),t.restore()}t.globalAlpha=1}}const z=44,Be=.62;function Le(e,t){const i=Math.min(e,t*Be);return{x:(e-i)/2,y:0,w:i,h:t}}function ze(e,t){return e>t}function Zt(e,t,i,n,l,s,o=0,r={x:0,y:0,w:e,h:t}){const h=Math.min(e,t),a=Math.min(t*.11,84),u=o+Math.max(6,t*.012),d=Math.min(t*.19,130),m=t-d-u,b=(m-a)/(l+s),y=Math.max(24,Math.min(h*n,b)),k=Math.min(e*.46,y*1.3),O=m-y*s,g=Math.max(4,e*.012),p=(e-g*(i+1))/i,M=[];for(let C=0;C<i;C++)M.push({x:g+C*(p+g),y:m+g,w:p,h:d-g*2});return{w:e,h:t,frameW:r.w+r.x*2,frameH:r.h+r.y*2,offsetX:r.x,offsetY:r.y,headerH:a,blockH:y,blockW:k,colX:e/2,lineY:m,restY:O,buttons:M}}function We(e,t,i){for(let n=0;n<e.buttons.length;n++){const l=e.buttons[n];if(t>=l.x-2&&t<=l.x+l.w+2&&i>=e.lineY)return n}return null}function Ne(e,t,i){const n=te(t)+ee(t)+Math.max(14,t*.02),l=t*.88-n,s=.28,o=Math.min(t*.13,96,l/(i*(1+s)-s)),r=o*s,h=Math.min(e*.72,340),a=i*o+(i-1)*r,u=n+(l-a)/2,d=[];for(let m=0;m<i;m++)d.push({x:(e-h)/2,y:u+m*(o+r),w:h,h:o});return d}function Xe(e,t,i){const n=Math.max(6,e*.022),l=Math.min((e*.86-n*(i-1))/i,120),s=ee(t),o=i*l+(i-1)*n,r=(e-o)/2,h=te(t),a=[];for(let u=0;u<i;u++)a.push({x:r+u*(l+n),y:h,w:l,h:s});return a}const te=e=>e*.29,ee=e=>Math.min(e*.065,50);function H(e,t,i){return t>=e.x&&t<=e.x+e.w&&i>=e.y&&i<=e.y+e.h}function Dt(e,t){const i=Math.max(z,Math.min(e*.12,52));return{x:e-i-Math.max(10,e*.035),y:Math.max(10,t*.018),w:i,h:i}}function qe(e,t){return{cx:e/2,cy:t*.4,r:Math.min(e*.26,t*.14)}}function ie(e,t,i=3){const n=Math.min(e*.6,280),l=Math.max(z,Math.min(t*.09,68)),s=Math.min(e*.44,200),o=Math.max(z,Math.min(t*.07,54)),r=Math.max(6,e*.022),h=Math.min((e*.86-r*(i-1))/i,120),a=Math.max(z*.8,Math.min(t*.055,44)),u=i*h+(i-1)*r,d=(e-u)/2,m=t*.63,b=[];for(let k=0;k<i;k++)b.push({x:d+k*(h+r),y:m,w:h,h:a});const y=m+a+Math.max(14,t*.026);return{difficulty:b,again:{x:(e-n)/2,y,w:n,h:l},title:{x:(e-s)/2,y:y+l+Math.max(10,t*.018),w:s,h:o}}}function ne(e,t,i){const n=Math.max(16,e*.055),l=Math.min(t*.105,84),s=l*.22,o=t*.19,r=e-n,h=Math.max(5,e*.016),a=[];for(let p=0;p<i.length;p++){const M=o+p*(l+s),C=i[p],j=C<=2?Math.min(e*.21,86):Math.min(e*.125,52),zt=l*.6,pe=C*j+(C-1)*h,Wt=r-pe,Nt=[];for(let $t=0;$t<C;$t++)Nt.push({x:Wt+$t*(j+h),y:M+(l-zt)/2,w:j,h:zt});a.push({label:{x:n,y:M,w:Math.max(40,Wt-n-10),h:l},chips:Nt})}const u=Math.min(e*.5,230),d=Math.max(z,Math.min(t*.085,64)),m=Math.min(e*.62,260),b=Math.max(z,Math.min(t*.055,48)),y=Math.min(e*.5,210),k=Math.max(z,Math.min(t*.055,48)),O=t*.7,g=O+d+Math.max(10,t*.018);return{rows:a,close:{x:(e-u)/2,y:O,w:u,h:d},reset:{x:(e-m)/2,y:g,w:m,h:b},admin:{x:(e-y)/2,y:g+b+Math.max(8,t*.012),w:y,h:k}}}const Ge=3e3;class Ue{constructor(){P(this,"samples",[]);P(this,"lastHitAt",null);P(this,"hits",0);P(this,"misses",0)}reset(){this.samples=[],this.lastHitAt=null,this.hits=0,this.misses=0}recordMiss(){this.misses++}recordHit(t,i,n){this.hits++;const l=this.lastHitAt;if(this.lastHitAt=t,l===null)return;const s=t-l;s>Ge||this.samples.push({mode:n,depth:i,interval:s})}summary(t,i,n){const l=this.samples.filter(d=>d.mode==="open"),s=this.samples.filter(d=>d.mode==="blind"),o=st(l.map(d=>d.interval)),r=st(s.map(d=>d.interval)),h=l.filter(d=>d.depth>=t),a=l.filter(d=>d.depth<=i),u=l.filter(d=>d.interval<n).length;return{hits:this.hits,misses:this.misses,openMedian:o,blindMedian:r,lookaheadGain:o!==null&&r!==null&&o>0?r/o:null,deepMedian:st(h.map(d=>d.interval)),shallowMedian:st(a.map(d=>d.interval)),preemptRate:l.length>0?u/l.length:null}}count(t){return this.samples.filter(i=>i.mode===t).length}}function st(e){if(e.length===0)return null;const t=[...e].sort((n,l)=>n-l),i=t.length>>1;return t.length%2===1?t[i]:(t[i-1]+t[i])/2}const je={color:-1,shape:null,dots:0,layout:0,numeral:0,tenGroup:0,text:""};function V(e){return{...je,...e}}const Tt=["circle","square","triangle","diamond","star"],le={1:[[[1,1]],[[0,0]],[[2,2]]],2:[[[0,0],[2,2]],[[2,0],[0,2]],[[0,1],[2,1]]],3:[[[0,0],[1,1],[2,2]],[[2,0],[1,1],[0,2]],[[1,0],[0,2],[2,2]]],4:[[[0,0],[2,0],[0,2],[2,2]],[[1,0],[0,1],[2,1],[1,2]],[[0,0],[2,0],[1,1],[1,2]]],5:[[[0,0],[2,0],[1,1],[0,2],[2,2]],[[1,0],[0,1],[1,1],[2,1],[1,2]],[[0,0],[2,0],[0,1],[0,2],[2,2]]]};function Ke(e,t){const i=le[e];return!i||i.length===0?[]:i[t%i.length]}function Qe(e,t){var n;const i=((n=le[e])==null?void 0:n.length)??1;return Math.min(i-1,Math.floor(t()*i))}function Gt(e,t){return V({color:e,shape:t.colorAssist?Tt[e]??"circle":null})}const Rt={iro:{id:"iro",label:"いろ",note:"同一マッチ。色だけ。2〜3歳",maxAnswers:5,buttonFace:(e,t)=>Gt(e,t),blockFace:(e,t,i)=>Gt(e,i)},katachi:{id:"katachi",label:"かたち",note:"同一マッチ。色の手がかりを消してある。3歳",maxAnswers:5,buttonFace:e=>V({shape:Tt[e]??"circle"}),blockFace:e=>V({shape:Tt[e]??"circle"})},ikutsu:{id:"ikutsu",label:"いくつ",note:"変換マッチ。サイコロの目を見て数字を押す。4〜5歳",maxAnswers:5,buttonFace:e=>V({numeral:e+1}),blockFace:(e,t)=>V({dots:e+1,layout:Qe(e+1,t)})},hosuu:{id:"hosuu",label:"10のほすう",note:"変換マッチ。あと何個で10か。さくらんぼ算の土台。小1",maxAnswers:5,buttonFace:e=>V({numeral:e+1}),blockFace:e=>V({tenGroup:9-e})},tashizan:{id:"tashizan",label:"たしざん",note:"変換マッチ。式を見て答えを押す。答えは2〜6。小1",maxAnswers:5,buttonFace:e=>V({numeral:e+2}),blockFace:(e,t)=>{const i=e+2,n=1+Math.min(i-2,Math.floor(t()*(i-1)));return V({text:`${n}+${i-n}`})}}},Vt=["iro","katachi","ikutsu","hosuu","tashizan"],ot=5,B=[{key:"soundOn",label:"おと",hint:"こうかおん",choices:[{label:"あり",value:!0},{label:"なし",value:!1}]},{key:"baseSec",label:"じかん",hint:"1かいの ながさ（びょう）",choices:[{label:"20",value:20},{label:"30",value:30},{label:"45",value:45},{label:"60",value:60}]},{key:"showCount",label:"すうじ",hint:"のこりと けしたかず",choices:[{label:"だす",value:!0},{label:"ださない",value:!1}]},{key:"colorAssist",label:"いろのサポート",hint:"かたちを かさねる",choices:[{label:"なし",value:!1},{label:"あり",value:!0}]}];function It(e,t,i){switch(t){case"soundOn":e.soundOn=i.value;break;case"showCount":e.showCount=i.value;break;case"colorAssist":e.colorAssist=i.value;break;case"baseSec":e.baseSec=i.value;break}}function se(e,t){return t.choices.findIndex(i=>i.value===e[t.key])}function Je(e,t){for(const i of B)if(se(e,i)<0){const n=i.choices.find(l=>l.value===t[i.key]);n&&It(e,i.key,n)}}function Ze(e,t){for(const i of B){const n=i.choices.find(l=>l.value===t[i.key]);n&&It(e,i.key,n)}}function ti(e){return{elapsed:0,penalty:0,cleared:0,missed:0}}function oe(e,t){return Math.max(0,t.baseSec-e.elapsed-e.penalty)}function ei(e,t){return oe(e,t)<=0}function ii(e,t){e.elapsed+=t}function ni(e,t){e.cleared++,e.penalty=Math.max(0,e.penalty-t.hitRecoverSec)}function li(e,t){e.missed++,e.penalty+=t.missPenaltySec}const bt="rgba(74,58,36,0.20)";function si(e,t){const{layout:i,column:n,mode:l}=t;yt(e,i),ai(e,i,t);const s=i.blockW*1.34;w(e,i.colX-s/2,i.restY-4,s,14,7),e.fillStyle="rgba(74,58,36,0.16)",e.fill();const o=i.colX-i.blockW/2;for(let r=0;r<n.queue.length;r++){const h=n.queue[r];if(!h)continue;const a=n.bottomY-(r+1)*i.blockH;if(a>i.restY||a+i.blockH<i.headerH-i.blockH)break;let u=a,d=i.blockH;const m=r===0;if(m&&t.squash>0&&(d=i.blockH*(1-.2*t.squash),u=a+(i.blockH-d)),m){const b=i.blockW*1.09,y=i.colX-b/2;oi(e,y,u,b,d,t.targetPulse),St(e,y,u,b,d,h.face,!1,10),t.showPointer&&ri(e,y,u,b,d,t.targetPulse)}else St(e,o,u,i.blockW,d,h.face,t.hideAhead)}t.effects.draw(e);for(let r=0;r<t.answerCount;r++){const h=i.buttons[r];if(!h)continue;const a=(t.press[r]??0)*5;St(e,h.x,h.y+a,h.w,h.h,l.buttonFace(r,t.faceOpts),!1,6-a)}}function oi(e,t,i,n,l,s){const o=5+s*4;w(e,t-o,i-o,n+o*2,l+o*2,(l+o*2)*.3),e.lineWidth=4,e.strokeStyle=`rgba(74,58,36,${.14+s*.24})`,e.stroke()}function ri(e,t,i,n,l,s){const o=i+l/2,r=Math.min(l*.3,22),h=s*r*.45;e.fillStyle="#c07000";for(const a of[-1,1]){const u=a<0?t-16-h:t+n+16+h;e.beginPath(),e.moveTo(u,o),e.lineTo(u-a*r,o-r*.6),e.lineTo(u-a*r,o+r*.6),e.closePath(),e.fill()}}function yt(e,t){(t.offsetX>0||t.offsetY>0)&&(e.fillStyle=Et,e.fillRect(-t.offsetX,-t.offsetY,t.frameW,t.frameH));const i=e.createLinearGradient(0,0,0,t.h);i.addColorStop(0,De),i.addColorStop(1,Et),e.fillStyle=i,e.fillRect(0,0,t.w,t.h)}function ai(e,t,i){const n=i.session,l=oe(n,i.sessionCfg),s=Math.max(12,t.w*.045),o=Math.max(16,t.headerH*.32),r=t.headerH*.3,h=t.w-s*2;w(e,s,r,h,o,o/2),e.fillStyle="rgba(74,58,36,0.12)",e.fill();const a=Math.max(0,Math.min(1,l/i.sessionCfg.baseSec));if(a>0){const u=Math.max(o,h*a),d=l<=5?"#ff5a5f":l<=12?"#ffab2e":"#4bd37b",m=l<=5?"#c02128":l<=12?"#c07000":"#188c4a";w(e,s,r,u,o,o/2),e.fillStyle=d,e.fill(),e.lineWidth=3,e.strokeStyle=m,e.stroke(),w(e,s+o*.25,r+o*.18,u-o*.5,o*.26,o*.13),e.fillStyle="rgba(255,255,255,0.42)",e.fill()}i.showCount&&(e.textBaseline="top",e.font=`700 ${Math.round(t.headerH*.3)}px ${A}`,e.fillStyle=D,e.textAlign="left",e.fillText(`${Math.ceil(l)}`,s+2,r+o+5),e.fillStyle=S,e.textAlign="right",e.fillText(`${n.cleared}こ`,t.w-s-2,r+o+5))}function St(e,t,i,n,l,s,o,r=6){const h=Math.min(n,l)*.26,a=2;r>0&&(w(e,t+a,i+a+r,n-a*2,l-a*2,h),e.fillStyle=bt,e.fill());const u=o?{fill:"#d9cdb8",edge:"#a8977c",gloss:"#efe6d5",glyph:"#a8977c"}:s.color>=0?it[s.color]:Jt;w(e,t+a,i+a,n-a*2,l-a*2,h),e.fillStyle=u.fill,e.fill(),e.save(),e.clip(),w(e,t+a,i+a,n-a*2,(l-a*2)*.44,h),e.fillStyle=u.gloss,e.globalAlpha=.42,e.fill(),e.restore(),e.globalAlpha=1,w(e,t+a,i+a,n-a*2,l-a*2,h),e.lineWidth=Math.max(3,Math.min(n,l)*.075),e.strokeStyle=u.edge,e.stroke(),o||hi(e,s,t+n/2,i+l/2,n-a*2,l-a*2,u.glyph)}function hi(e,t,i,n,l,s,o){const r=Math.min(l,s);if(e.fillStyle=o,t.tenGroup>0){ci(e,t.tenGroup,i,n,l,s,o);return}if(t.text){e.textAlign="center",e.textBaseline="middle",e.font=`800 ${Math.round(Math.min(s*.46,l*.86/t.text.length))}px ${A}`,e.fillText(t.text,i,n+r*.03);return}if(t.numeral>0){e.textAlign="center",e.textBaseline="middle",e.font=`800 ${Math.round(r*.6)}px ${A}`,e.fillText(String(t.numeral),i,n+r*.04);return}if(t.shape){Re(e,t.shape,i,n,r*.25),e.fill();return}if(t.dots>0){const h=r*.26,a=r*.098;for(const[u,d]of Ke(t.dots,t.layout))e.beginPath(),e.arc(i+(u-1)*h,n+(d-1)*h,a,0,Math.PI*2),e.fill()}}function ci(e,t,i,n,l,s,o){const r=l*.88/ot,h=Math.min(s*.38,r*1.1),a=i-r*ot/2,u=n-h,d=Math.min(r,h)*.34;e.fillStyle=o;for(let m=0;m<t;m++){const b=a+m%ot*r+r/2,y=u+Math.floor(m/ot)*h+h/2;e.beginPath(),e.arc(b,y,d,0,Math.PI*2),e.fill()}}function di(e,t,i,n){e.textAlign="center",e.textBaseline="middle";for(let l=0;l<t.length;l++){const s=i[l],o=t[l];if(!s||!o)continue;const r=o.id===n;w(e,s.x,s.y,s.w,s.h,s.h*.42),e.fillStyle=r?S:"rgba(255,255,255,0.66)",e.fill(),e.lineWidth=3,e.strokeStyle=r?S:"rgba(74,58,36,0.24)",e.stroke(),e.fillStyle=r?"#fff6e6":D,K(e,o.label,s.w*.86,Math.min(s.h*.38,18),700),e.fillText(o.label,s.x+s.w/2,s.y+s.h/2)}}function ui(e,t){e.fillStyle=Et,e.fillRect(-t.offsetX,-t.offsetY,t.frameW,t.frameH);const i=t.frameW/2-t.offsetX,n=t.frameH/2-t.offsetY,l=Math.min(t.frameH*.2,90),s=l*1.5;w(e,i-l/2,n-s/2-t.frameH*.06,l,s,l*.16),e.fillStyle="rgba(255,255,255,0.8)",e.fill(),e.lineWidth=5,e.strokeStyle=S,e.stroke(),e.textAlign="center",e.textBaseline="middle",e.fillStyle=S,e.font=`800 ${Math.round(Math.min(t.frameW*.05,30))}px ${A}`,e.fillText("たてに してね",i,n+t.frameH*.28)}function fi(e,t,i){yt(e,t),e.textAlign="center",e.textBaseline="middle",e.fillStyle=S,e.font=`800 ${Math.round(Math.min(t.w*.115,50))}px ${A}`,e.fillText("みつけてポン",t.w/2,t.h*.16);for(let n=0;n<i.difficulties.length;n++){const l=i.difficultyRects[n],s=i.difficulties[n];if(!l||!s)continue;const o=s.id===i.selected;w(e,l.x,l.y,l.w,l.h,l.h*.42),e.fillStyle=o?S:"rgba(255,255,255,0.66)",e.fill(),e.lineWidth=3,e.strokeStyle=o?S:"rgba(74,58,36,0.22)",e.stroke(),e.fillStyle=o?"#fff6e6":D,e.font=`700 ${Math.round(Math.min(l.h*.38,l.w*.21))}px ${A}`,e.fillText(s.label,l.x+l.w/2,l.y+l.h/2)}for(let n=0;n<i.modes.length;n++){const l=i.modeRects[n],s=i.modes[n];if(!l||!s)continue;const o=it[n];w(e,l.x,l.y+7,l.w,l.h,l.h*.32),e.fillStyle=bt,e.fill(),w(e,l.x,l.y,l.w,l.h,l.h*.32),e.fillStyle=o.fill,e.fill(),e.save(),e.clip(),w(e,l.x,l.y,l.w,l.h*.44,l.h*.32),e.globalAlpha=.4,e.fillStyle=o.gloss,e.fill(),e.restore(),e.globalAlpha=1,w(e,l.x,l.y,l.w,l.h,l.h*.32),e.lineWidth=4,e.strokeStyle=o.edge,e.stroke(),e.fillStyle="#ffffff",e.font=`800 ${Math.round(l.h*.44)}px ${A}`,e.fillText(s.label,l.x+l.w/2,l.y+l.h/2)}if(re(e,Dt(t.w,t.h)),i.notices.length>0){const n=Math.round(Math.min(t.w*.038,15));e.font=`700 ${n}px ${A}`;const l=t.h-Math.max(14,t.h*.03);e.fillStyle="#c07000",e.fillText("⚙ きてい以外の設定",t.w/2,l-n*1.5*i.notices.length),e.fillStyle="rgba(192,112,0,0.75)",i.notices.forEach((s,o)=>{e.fillText(s,t.w/2,l-n*1.5*(i.notices.length-1-o))})}}function pi(e,t,i,n,l,s,o){yt(e,t),e.textAlign="center",e.textBaseline="middle",l.draw(e),e.fillStyle=S,e.font=`800 ${Math.round(Math.min(t.w*.1,42))}px ${A}`,e.fillText("よくできました",t.w/2,t.h*.24);const{cx:r,cy:h,r:a}=qe(t.w,t.h);if(e.beginPath(),e.arc(r,h+7,a,0,Math.PI*2),e.fillStyle=bt,e.fill(),e.beginPath(),e.arc(r,h,a,0,Math.PI*2),e.fillStyle="#ffc93c",e.fill(),e.lineWidth=6,e.strokeStyle="#c07f00",e.stroke(),n)e.fillStyle="#7a4b00",e.font=`800 ${Math.round(a*1)}px ${A}`,e.fillText(`${i.cleared}`,r,h),e.fillStyle=D,e.font=`700 ${Math.round(Math.min(t.w*.05,20))}px ${A}`,e.fillText(`ミス ${i.missed}`,r,h+a+24);else{const d=Math.min(i.cleared,40),m=Math.min(t.w*.024,12),b=8;for(let y=0;y<d;y++){const k=r+(y%b-(b-1)/2)*m*2.6,O=h-a*.5+Math.floor(y/b)*m*2.7;e.beginPath(),e.arc(k,O,m,0,Math.PI*2),e.fillStyle="#7a4b00",e.fill()}}const u=ie(t.w,t.h,s.length);di(e,s,u.difficulty,o),ht(e,u.again,"もういちど","#4bd37b","#188c4a","#ffffff"),ht(e,u.title,"タイトルへ","rgba(255,255,255,0.72)",D,S),re(e,Dt(t.w,t.h))}function ht(e,t,i,n,l,s){e.textAlign="center",e.textBaseline="middle",w(e,t.x,t.y+6,t.w,t.h,t.h*.36),e.fillStyle=bt,e.fill(),w(e,t.x,t.y,t.w,t.h,t.h*.36),e.fillStyle=n,e.fill(),e.lineWidth=4,e.strokeStyle=l,e.stroke(),e.fillStyle=s,e.font=`800 ${Math.round(t.h*.42)}px ${A}`,e.fillText(i,t.x+t.w/2,t.y+t.h/2)}function re(e,t){w(e,t.x,t.y,t.w,t.h,t.h*.32),e.fillStyle="rgba(255,255,255,0.66)",e.fill(),e.lineWidth=2.5,e.strokeStyle="rgba(74,58,36,0.28)",e.stroke();const i=t.w*.26,n=t.x+i,l=t.x+t.w-i,s=[.7,.32,.58];e.lineCap="round",e.lineWidth=Math.max(2,t.w*.07);for(let o=0;o<s.length;o++){const r=t.y+t.h*(.32+o*.18);e.strokeStyle=D,e.beginPath(),e.moveTo(n,r),e.lineTo(l,r),e.stroke();const h=n+(l-n)*s[o];e.fillStyle=S,e.beginPath(),e.arc(h,r,t.w*.075,0,Math.PI*2),e.fill()}e.lineCap="butt"}function K(e,t,i,n,l){const s=Math.round(n);e.font=`${l} ${s}px ${A}`;const o=e.measureText(t).width;o<=i||(e.font=`${l} ${Math.max(9,Math.floor(s*(i/o)))}px ${A}`)}function mi(e,t,i){yt(e,t),e.textAlign="center",e.textBaseline="middle",e.fillStyle=S,e.font=`800 ${Math.round(Math.min(t.w*.09,38))}px ${A}`,e.fillText("せってい",t.w/2,t.h*.12);const n=ne(t.w,t.h,B.map(l=>l.choices.length));for(let l=0;l<B.length;l++){const s=B[l],o=n.rows[l];if(!s||!o)continue;const r=se(i,s);e.textAlign="left",e.fillStyle=S,K(e,s.label,o.label.w,Math.min(o.label.h*.33,21),700),e.fillText(s.label,o.label.x,o.label.y+o.label.h*.38),e.fillStyle=D,K(e,s.hint,o.label.w,Math.min(o.label.h*.21,13),600),e.fillText(s.hint,o.label.x,o.label.y+o.label.h*.68),e.textAlign="center";for(let h=0;h<o.chips.length;h++){const a=o.chips[h],u=s.choices[h];if(!a||!u)continue;const d=h===r;w(e,a.x,a.y,a.w,a.h,a.h*.4),e.fillStyle=d?S:"rgba(255,255,255,0.72)",e.fill(),e.lineWidth=3,e.strokeStyle=d?S:"rgba(74,58,36,0.22)",e.stroke(),e.fillStyle=d?"#fff6e6":D,K(e,u.label,a.w*.82,a.h*.42,700),e.fillText(u.label,a.x+a.w/2,a.y+a.h/2)}}ht(e,n.close,"とじる","#4bd37b","#188c4a","#ffffff"),ht(e,n.reset,"さいしょに もどす","rgba(255,255,255,0.72)",D,S),e.fillStyle=D,K(e,"かんりしゃメニュー",n.admin.w*.9,Math.min(n.admin.h*.36,15),600),e.fillText("かんりしゃメニュー",t.w/2,n.admin.y+n.admin.h/2)}const c=(e,t=1)=>({midi:e,len:t}),rt=[{id:"twinkle",label:"きらきらぼし",source:"フランス民謡 “Ah! vous dirai-je, maman”（1761）",notes:[c(72),c(72),c(79),c(79),c(81),c(81),c(79,2),c(77),c(77),c(76),c(76),c(74),c(74),c(72,2)]},{id:"mary",label:"メリーさんのひつじ",source:"アメリカ伝承（1830）",notes:[c(76),c(74),c(72),c(74),c(76),c(76),c(76,2),c(74),c(74),c(74,2),c(76),c(79),c(79,2)]},{id:"london",label:"ロンドンばし",source:"イングランド伝承",notes:[c(79),c(81),c(79),c(77),c(76),c(77),c(79,2),c(74),c(76),c(77,2),c(76),c(77),c(79,2)]},{id:"frog",label:"かえるのうた",source:"ドイツ民謡 “Froschgesang”",notes:[c(72),c(74),c(76),c(77),c(76),c(74),c(72,2),c(76),c(77),c(79),c(81),c(79),c(77),c(76,2)]},{id:"joy",label:"よろこびのうた",source:"ベートーヴェン 交響曲第9番（1824）",notes:[c(76),c(76),c(77),c(79),c(79),c(77),c(76),c(74),c(72),c(72),c(74),c(76),c(76,1.5),c(74,.5),c(74,2)]}];function gi(e){return 440*Math.pow(2,(e-69)/12)}function bi(e){const t=Math.min(rt.length-1,Math.floor(e()*rt.length));return rt[t]}class yi{constructor(){P(this,"song",rt[0]);P(this,"index",0)}setSong(t){this.song=t,this.index=0}get current(){return this.song}get progress(){return this.index/this.song.notes.length}next(){const t=this.song.notes[this.index];return this.index=(this.index+1)%this.song.notes.length,t}reset(){this.index=0}}let $=null,Yt=!0;function ct(e){Yt=e}let dt=null;function vi(){if($)return;const e=window.AudioContext??window.webkitAudioContext;if(!e)return;$=new e,$.resume();const t=Math.floor($.sampleRate*.25);dt=$.createBuffer(1,t,$.sampleRate);const i=dt.getChannelData(0);for(let n=0;n<t;n++)i[n]=Math.random()*2-1}function ut(e,t,i,n,l){if(!$||!Yt)return;const s=$.currentTime,o=$.createOscillator(),r=$.createGain();o.type=i,o.frequency.setValueAtTime(e,s),l&&o.frequency.exponentialRampToValueAtTime(l,s+t),r.gain.setValueAtTime(0,s),r.gain.linearRampToValueAtTime(n,s+.006),r.gain.exponentialRampToValueAtTime(1e-4,s+t),o.connect(r).connect($.destination),o.start(s),o.stop(s+t+.02)}function ae(e,t,i){if(!$||!dt||!Yt)return;const n=$.currentTime,l=$.createBufferSource();l.buffer=dt;const s=$.createBiquadFilter();s.type="bandpass",s.frequency.setValueAtTime(i,n),s.Q.value=1.1;const o=$.createGain();o.gain.setValueAtTime(t,n),o.gain.exponentialRampToValueAtTime(1e-4,n+e),l.connect(s).connect(o).connect($.destination),l.start(n),l.stop(n+e+.02)}function wi(e){const t=gi(e.midi),i=Math.min(.34,.13*e.len+.04);ut(t,i,"triangle",.17),ut(t*2,i*.45,"sine",.045),ae(.035,.05,2400)}function Mi(){ut(150,.09,"sine",.1,90),ae(.04,.03,320)}function _i(){ut(330,.1,"sine",.07,250)}const he="mitsukete-pon.played.v1";function $i(){try{return localStorage.getItem(he)==="1"}catch{return!1}}function ki(){try{localStorage.setItem(he,"1")}catch{}}const W={mode:"iro",difficulty:"easy",bottomGapBlocks:.45,fallBlocksPerSec:10,blockScale:.22,baseSec:30,missPenaltySec:.5,hitRecoverSec:.3,soundOn:!0,showCount:!0,colorAssist:!1,effectsOn:!0,hideAhead:!1},Bt="mitsukete-pon.tuning.v1";function Si(){try{const e=localStorage.getItem(Bt);return e?{...W,...JSON.parse(e)}:{...W}}catch{return{...W}}}function L(e){try{localStorage.setItem(Bt,JSON.stringify(e))}catch{}}function Ai(){try{localStorage.removeItem(Bt)}catch{}}const Ut={bottomGapBlocks:"下の隙間",fallBlocksPerSec:"ストンの速さ",blockScale:"ブロック大きさ",missPenaltySec:"ミスで-秒",hitRecoverSec:"正解でもどる秒",effectsOn:"演出",hideAhead:"先を隠す"};function Ci(e){const t=[];for(const i of Object.keys(Ut))e[i]!==W[i]&&t.push(`${Ut[i]}: ${String(e[i])}`);return t}const ft=document.getElementById("stage"),X=ft.getContext("2d"),Ei=document.getElementById("hud"),f=Si();Je(f,W);const E=new Ye,Ft=new yi;let _="title",v=Zt(1,1,3,.22,3,.45),pt=[],mt=[],lt=Rt[f.mode],Y,x,I;const gt=new Ue,Q=[0,0,0,0,0];let J=0,at=0,xt=!1,jt="title",F={x:0,y:0,w:1,h:1},Lt=!1,Ot=!$i();function G(){return Pe(f.difficulty)}function vt(){return He(f.difficulty)}function ce(){return{colorAssist:f.colorAssist}}function nt(){return{baseSec:f.baseSec,missPenaltySec:f.missPenaltySec,hitRecoverSec:f.hitRecoverSec}}function Ti(){const e=getComputedStyle(document.documentElement).getPropertyValue("--sab");return Number.parseFloat(e)||0}function N(){const e=window.innerWidth,t=window.innerHeight,i=Math.min(window.devicePixelRatio||1,2);ft.width=Math.round(e*i),ft.height=Math.round(t*i),Lt=ze(e,t),F=Le(e,t),X.setTransform(i,0,0,i,F.x*i,F.y*i),v=Zt(F.w,F.h,G(),f.blockScale,vt(),f.bottomGapBlocks,Ti(),F),pt=Ne(F.w,F.h,Vt.length),mt=Xe(F.w,F.h,q.length),x&&(x.blockH=v.blockH,x.lineY=v.restY)}function Fi(){return{blockH:v.blockH,fallBlocksPerSec:f.fallBlocksPerSec,spawnPerSec:0,answerCount:G(),maxQueue:vt(),lineY:v.restY,makeFace:(e,t)=>lt.blockFace(e,t,ce())}}let wt="";function Mt(){Ei.textContent=Z?wt:""}function de(){_="title",wt="",Mt(),E.clear()}function Kt(e){lt=e,f.mode=e.id,L(f),N(),x=Fi(),Ft.setSong(bi(Math.random)),Y=Fe(x,Math.random),I=ti(nt()),gt.reset(),E.clear(),at=0,J=0,xt=!1,wt="",Mt(),_="play"}function ue(e){var s;if(_!=="play"||e>=G())return;Q[e]=1;const t=Y.queue.length,i=(s=Y.queue[0])==null?void 0:s.face,n=Y.bottomY-v.blockH/2;if(Oe(Y,e,x)==="hit"){gt.recordHit(performance.now(),t,f.hideAhead?"blind":"open"),ni(I,nt()),at++,Ot&&(Ot=!1,ki()),wi(Ft.next());const o=i&&i.color>=0?it[i.color]:Jt;E.burst(v.colX,n,v.blockW,v.blockH,o.fill,o.edge,Math.random,at);const r=v.buttons[e];r&&E.beam(r.x+r.w/2,r.w*.3,r.y,v.restY,o.fill)}else gt.recordMiss(),li(I,nt()),at=0,Ft.reset(),_i()}function xi(){_="result",E.clear(),E.confetti(v.w,v.h,60,Math.random);const e=gt.summary(4,2,350),t=i=>i===null?"—":`${Math.round(i)}ms`;wt=[`${lt.label} / ${et[f.difficulty].label}(${G()}こ) / ${vt()}段${f.hideAhead?" / 先を隠す":""}`,`消した ${e.hits}  ミス ${e.misses}`,`中央値タップ間隔 ${t(e.openMedian??e.blindMedian)}`].join(`
`),Mt()}function Oi(e,t){if((_==="title"||_==="result")&&H(Dt(v.w,v.h),e,t)){jt=_,_="settings";return}if(_==="settings"){const n=ne(v.w,v.h,B.map(l=>l.choices.length));for(let l=0;l<B.length;l++){const s=B[l],o=n.rows[l];if(!(!s||!o))for(let r=0;r<o.chips.length;r++){const h=o.chips[r],a=s.choices[r];if(!(!h||!a||!H(h,e,t))){It(f,s.key,a),L(f),ct(f.soundOn),T.controllersRecursive().forEach(u=>u.updateDisplay());return}}}H(n.close,e,t)?_=jt:H(n.reset,e,t)?(Ze(f,W),L(f),ct(f.soundOn),T.controllersRecursive().forEach(l=>l.updateDisplay())):H(n.admin,e,t)&&_t();return}if(_==="title"){for(let n=0;n<mt.length;n++){const l=mt[n],s=q[n];if(l&&s&&H(l,e,t)){f.difficulty=s,L(f),N();return}}for(let n=0;n<pt.length;n++){const l=pt[n],s=Vt[n];l&&s&&H(l,e,t)&&Kt(Rt[s])}return}if(_==="result"){const n=ie(v.w,v.h,q.length);for(let l=0;l<n.difficulty.length;l++){const s=n.difficulty[l],o=q[l];if(s&&o&&H(s,e,t)){f.difficulty=o,L(f),N();return}}H(n.again,e,t)?Kt(lt):H(n.title,e,t)&&de();return}const i=We(v,e,t);i!==null&&ue(i)}ft.addEventListener("pointerdown",e=>{vi(),e.preventDefault(),!Lt&&Oi(e.clientX-F.x,e.clientY-F.y)},{passive:!1});window.addEventListener("keydown",e=>{e.key==="d"&&_t();const t="12345".indexOf(e.key);t>=0&&_==="play"&&ue(t)});window.addEventListener("resize",N);const T=new Ht({title:"かんりしゃ",width:240});T.close();let Z=!1;function _t(){Z=!Z,T.domElement.style.display=Z?"":"none",Z&&T.open(),Mt()}_t();_t();const U=e=>()=>{L(f),e&&N(),x&&(x.fallBlocksPerSec=f.fallBlocksPerSec,x.answerCount=G(),x.maxQueue=vt())};T.add(f,"bottomGapBlocks",0,1.5,.05).name("下の隙間(段)").onChange(U(!0));T.add(f,"hideAhead").name("★先を隠す(対照)").onChange(U(!1));T.add(f,"fallBlocksPerSec",2,30,1).name("ストンの速さ(段/秒)").onChange(U(!1));T.add(f,"effectsOn").name("演出を出す").onChange(()=>{L(f),E.enabled=f.effectsOn,f.effectsOn||E.clear()});const fe=T.addFolder("時間の判定").close();fe.add(f,"missPenaltySec",0,3,.1).name("ミスで-秒").onChange(U(!1));fe.add(f,"hitRecoverSec",0,1,.05).name("正解でもどる秒").onChange(U(!1));T.add(f,"blockScale",.08,.28,.005).name("ブロック大きさ").onChange(U(!0));T.add({f:()=>{Object.assign(f,W),Ai(),E.enabled=f.effectsOn,ct(f.soundOn),T.controllersRecursive().forEach(e=>e.updateDisplay()),de(),N()}},"f").name("既定に戻す");E.enabled=f.effectsOn;ct(f.soundOn);N();let Qt=performance.now();function Pt(){const e=performance.now(),t=Math.min((e-Qt)/1e3,.05);Qt=e;for(let i=0;i<Q.length;i++)Q[i]=Math.max(0,Q[i]-t*7);if(J=Math.max(0,J-t*7),E.update(t),_==="play"){ii(I,t),xe(Y,t,x,Math.random);const i=Y.bottomY<x.lineY-.5;xt&&!i&&(J=1,Mi()),xt=i,ei(I,nt())&&xi()}if(Lt){ui(X,v),requestAnimationFrame(Pt);return}_==="title"?fi(X,v,{modes:Vt.map(i=>Rt[i]),modeRects:pt,difficulties:q.map(i=>et[i]),difficultyRects:mt,selected:f.difficulty,notices:Ci(f)}):_==="play"?si(X,{layout:v,column:Y,mode:lt,session:I,sessionCfg:nt(),faceOpts:ce(),answerCount:G(),hideAhead:f.hideAhead,showCount:f.showCount,press:Q,squash:J,targetPulse:.5+.5*Math.sin(e/1100*Math.PI*2),showPointer:Ot&&I.cleared===0,effects:E}):_==="result"?pi(X,v,I,f.showCount,E,q.map(i=>et[i]),f.difficulty):mi(X,v,f),requestAnimationFrame(Pt)}requestAnimationFrame(Pt);"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register(new URL("sw.js",document.baseURI).href)});
