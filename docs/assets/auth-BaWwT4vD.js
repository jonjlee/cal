var K=Object.defineProperty;var M=(o,e,t)=>e in o?K(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var g=(o,e,t)=>M(o,typeof e!="symbol"?e+"":e,t);import{s as S,i as A,x as d,E as I,T as m,w as B,r as q,F as P,G as V,u as F}from"./db-kWuhzS5Q.js";class L extends S{connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this._handleMouseDown),this.addEventListener("keydown",this._handleKeyDown),this.addEventListener("blur",this._commit)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this._handleMouseDown),this.removeEventListener("keydown",this._handleKeyDown),this.removeEventListener("blur",this._commit)}render(){var u;const e=this.subitem?d`<div class="indicator">${I("caret-right")}</div>`:m,t=d`<input type="text" id="resource" size="1" placeholder="Name" list="people-list" value="${this.resource}"></input>`,s=d`<div class="divider"></div>`,n=d`<input type="text" id="schedule" size="1" placeholder="Shift" value="${this.schedule}"></input>`,l=d`<button
      id="subitem-btn"
      @click=${this._handleSubitemClick}
    >
      ${I("subitem")}
    </button>`,i=d`<button id="delete-btn" @click=${this._delete}>
      ${I("trash-can")}
    </button>`,a=(u=this.people)!=null&&u.length?d`<datalist id="people-list">
          ${(this.people??[]).map(b=>d`<option value="${b}"></option>`)}
        </datalist>`:m;return d`${e}
      <div class="inputs" @keydown=${this._handleInputKeyDown}>
        ${t} ${s} ${n} ${a}
      </div>
      ${l} ${i}`}updated(){this.scheduleEl=this.shadowRoot.querySelector("#schedule"),this.resourceEl=this.shadowRoot.querySelector("#resource");const e=this.initialFocus==="schedule"?this.scheduleEl:this.resourceEl;e.focus(),e.select(),this._editComplete=!1}isEmpty(){const e=this.resourceEl.value.trim(),t=this.scheduleEl.value.trim();return!e&&!t}_dispatch(e,t={}){const s=this.resourceEl.value.trim(),n=this.scheduleEl.value.trim(),l=this.context;this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{context:l,resource:s,schedule:n,...t}}))}_handleMouseDown(e){e.stopPropagation()}_handleKeyDown(e){e.keyCode==27&&(this._editComplete=!0,this._dispatch("cal-event-edit-cancel"))}_handleInputKeyDown(e){e.keyCode==13&&(e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey?this.shadowRoot.querySelector("#subitem-btn").click():e.shiftKey&&!e.ctrlKey&&!e.altKey&&!e.metaKey?this._commit("prev"):this._commit("next"))}_handleSubitemClick(e){if(this.isEmpty())return this.resourceEl.focus();this._editComplete=!0,this._dispatch("cal-event-edit-add-subitem")}_handleDeleteClick(e){this._editComplete=!0,this._delete()}_delete(e=null){this._editComplete=!0,this._dispatch("cal-event-edit-delete",{next:e})}_commit(e=null){this._editComplete||(this._editComplete=!0,this.isEmpty()?this._delete(e):this._dispatch("cal-event-edit-change",{next:e}))}}g(L,"styles",A`
    :host {
      flex-grow: 1;
      display: flex;
      z-index: 1;
    }
    .icon {
      min-width: 1.1em;
      height: 1.1em;
      vertical-align: -0.125em;
    }
    .indicator {
      color: #9ba2a9;
      background: inherit;
      margin-right: 2px;
    }
    .inputs {
      flex-grow: 1;

      background: white;
      display: flex;

      .divider {
        border-left: 1px solid var(--border-color);
      }
    }
    .inputs:focus-within {
      border: 1px solid var(--bs-primary);
    }
    input {
      font-size: 0.9em;
    }
    input,
    input:focus {
      border: none;
      outline: none;
    }
    input#resource {
      flex-grow: 1;
      margin-right: -1px;
    }
    input#schedule {
      width: 50%;
    }
    button {
      width: min-content;
      border: 1px solid var(--bs-primary);
      background: white;
      padding: 2px 2px;
      margin-left: -1px;
    }
    button:hover {
      color: var(--bs-primary);
    }
    button:focus {
      box-shadow: none;
      outline: none;
      background: var(--bs-primary);
      color: white;
    }
  `),g(L,"properties",{eventindex:{type:Number,attribute:!1,noAccessor:!0},isNew:{type:Boolean},subitem:{type:Boolean},resource:{type:String},schedule:{type:String},people:{type:Array,attribute:!1},initialFocus:{type:String}});customElements.define("cal-event-edit",L);const r=class r extends S{constructor(){super(),this._editState={state:r.STATE_NOT_EDITING,eventInfoIndex:null,initialFocus:null}}willUpdate(e){this.events=this.events??[],this.settings=this.settings??{};const t=["white","black","#ffffff","#000000"];this.borderColor=t.includes(this.borderColor)?null:this.borderColor,this.background=t.includes(this.background)?null:this.background,this._renderInfo=this._createRenderInfo(this.events,this.settings.options,this._editState,this.readonly,this.showAll)}_createRenderInfo(e,t,s,n,l){const i=[],a=(t==null?void 0:t.people)??{},u=h=>{var c;return l||(((c=a[h])==null?void 0:c.visible)??!0)},b=h=>{var c;return l?null:(c=a[h])==null?void 0:c.color},f=(h,c,p,v)=>{var x;const E=typeof c.schedule=="object"?c.schedule.join(", "):c.schedule;i.push({type:"event",subitem:h,color:b((x=c.resource)==null?void 0:x.toLowerCase()),resource:c.resource,schedule:E,eventInfoIndex:i.length,eventIndex:p,eventSubitemIndex:v})};if(e.forEach((h,c)=>{var v,E,x;const p=(v=h.subitems)==null?void 0:v.find(w=>{var D;return u((D=w.resource)==null?void 0:D.toLowerCase())});(u((E=h.resource)==null?void 0:E.toLowerCase())||p)&&(f(!1,h,c,null),(x=h.subitems)==null||x.forEach((w,D)=>{f(!0,w,c,D)}))}),s.state==r.STATE_ADD_EVENT)i.push({type:"edit",subitem:!1,resource:"",schedule:"",eventInfoIndex:i.length,eventIndex:this.events.length,eventSubitemIndex:null,editState:s});else if(s.state==r.STATE_ADD_SUBITEM){const h=i[s.eventInfoIndex],c={type:"edit",subitem:!0,resource:"",schedule:"",eventInfoIndex:s.eventInfoIndex+1,eventIndex:h.eventIndex,eventSubitemIndex:h.eventSubitemIndex,editState:s};i.splice(s.eventInfoIndex+1,0,c)}else if(s.state==r.STATE_EDIT_EVENT){const h=i[s.eventInfoIndex];h.type="edit",h.editState=s}const k=!n&&s.state!==r.STATE_ADD_EVENT,$=i.length==0?"expanded":"",y={visible:k,class:$},_=Object.entries((t==null?void 0:t.people)??{}).filter(([h,c])=>l||(c.visible??!0)).map(([h,c])=>c.name).sort();return{eventInfos:i,addButton:y,peopleList:_}}render(){const e=this.background&&`background: ${this.background};`,t=this.borderColor&&`border-color: ${this.borderColor};`,{eventInfos:s,addButton:n,peopleList:l}=this._renderInfo,i=t?d`<div class="cal-event-group-border" style="${t}"></div>`:m,a=s.map(({type:f,subitem:k,color:$,resource:y,schedule:_,eventInfoIndex:h,editState:c})=>{if(f==="event"){const p=k?I("caret-right"):m;return d`<div
            class="cal-event-line"
            tabindex="0"
            .index=${h}
            @click=${this._handleEventClick.bind(this,h)}
          >
            ${p}
            <span class="resource" style="color: ${$??m}"
              >${y}</span
            >
            <span class="schedule">${_}</span>
          </div> `}else if(f==="edit")return d`<cal-event-edit
            .context=${c}
            .people=${l}
            ?subitem="${k}"
            resource="${y}"
            schedule="${_}"
            initialFocus="${c.initialFocus||m}"
          ></cal-event-edit>`}),u=n.visible?d`<div
          class="cal-event-add ${n.class}"
          @click=${this._handleAddEventClick}
        >
          <span class="cal-event-plussign">+</span>
        </div>`:m,b=this.readonly&&s.length==0?d`<div class="blank-line"></div>`:m;return d`<div
      class="cal-event-group"
      style="${e||m}"
    >
      ${i} ${a} ${u} ${b}
    </div>`}forceRefresh(){this.requestUpdate()}_commitEventEdit(e,t){e.state===r.STATE_ADD_EVENT?this._addEvent(e,t):e.state===r.STATE_ADD_SUBITEM?this._addSubitem(e,t):e.state===r.STATE_EDIT_EVENT&&this._updateEvent(e,t)}_addEvent(e,{resource:t,schedule:s}){const n=structuredClone(this.events),l=s.split(",").map(a=>a.trim()),i={resource:t,schedule:l,subitems:[]};this.events.push(i),this._dispatch("change",{prevEvents:n})}_addSubitem(e,{resource:t,schedule:s}){const n=structuredClone(this.events),l=this._renderInfo.eventInfos[e.eventInfoIndex],i=this.events[l.eventIndex],a=l.eventSubitemIndex??-1,u=s.split(",").map(f=>f.trim()),b={resource:t,schedule:u,subitems:[]};i.subitems=i.subitems??[],i.subitems.splice(a+1,0,b),this._dispatch("change",{prevEvents:n})}_updateEvent(e,{resource:t,schedule:s}){const n=structuredClone(this.events),l=e.eventInfoIndex,i=this._renderInfo.eventInfos[l],a=i.eventSubitemIndex==null?this.events[i.eventIndex]:this.events[i.eventIndex].subitems[i.eventSubitemIndex],u=s.split(",").map(b=>b.trim());(a.resource!=t||JSON.stringify(a.schedule)!=JSON.stringify(u))&&(a.resource=t,a.schedule=u,this._dispatch("change",{prevEvents:n}))}_deleteEvent(e){var n;const t=structuredClone(this.events),s=this._renderInfo.eventInfos[e.eventInfoIndex];(s==null?void 0:s.eventSubitemIndex)==null?this.events.splice(s.eventIndex,1):(n=this.events[s.eventIndex])==null||n.subitems.splice(s.eventSubitemIndex,1),this._dispatch("change",{prevEvents:t})}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this._handleKeyDown),this.addEventListener("cal-event-edit-change",this._handleEventChange),this.addEventListener("cal-event-edit-delete",this._handleDeleteEvent),this.addEventListener("cal-event-edit-add-subitem",this._handleAddEventSubitem),this.addEventListener("cal-event-edit-cancel",this._handleEventCancel)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this._handleKeyDown),this.removeEventListener("cal-event-edit-change",this._handleEventChange),this.removeEventListener("cal-event-edit-delete",this._handleDeleteEvent),this.removeEventListener("cal-event-edit-add-subitem",this._handleAddEventSubitem),this.removeEventListener("cal-event-edit-cancel",this._handleEventCancel)}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{events:this.events,...t}}))}_handleKeyDown(e){var s,n,l,i;const t=(n=(s=e.composedPath)==null?void 0:s.call(e))==null?void 0:n[0];e.keyCode==13?(l=t==null?void 0:t.classList)!=null&&l.contains("cal-event-line")&&(e.preventDefault(),e.stopPropagation(),t.click()):(e.keyCode==8||e.keyCode==46)&&(i=t==null?void 0:t.classList)!=null&&i.contains("cal-event-line")&&(e.preventDefault(),e.stopPropagation(),t.index>=0&&t.index<this._renderInfo.eventInfos.length&&this._deleteEvent({eventInfoIndex:t.index}))}_handleEventClick(e,t){var s;this.readonly||(this._editState={state:r.STATE_EDIT_EVENT,eventInfoIndex:e,initialFocus:((s=t.target)==null?void 0:s.classList.contains("schedule"))&&"schedule"},this.requestUpdate())}_handleAddEventClick(e){this.readonly||(this._editState={state:r.STATE_ADD_EVENT,eventInfoIndex:this._renderInfo.eventInfos.length},this.requestUpdate())}_handleEventChange(e){const t=e.detail.context;this._commitEventEdit(t,e.detail),this._editState={state:r.STATE_NOT_EDITING},this._handleNext(e),this.requestUpdate()}_handleAddEventSubitem(e){const t=e.detail.context;let s=t.eventInfoIndex;t.state===r.STATE_ADD_EVENT?this._addEvent(t,e.detail):t.state===r.STATE_ADD_SUBITEM?(this._addSubitem(t,e.detail),s++):t.state===r.STATE_EDIT_EVENT&&this._updateEvent(t,e.detail),this._editState={state:r.STATE_ADD_SUBITEM,eventInfoIndex:s},this.requestUpdate()}_handleDeleteEvent(e){var s,n;const t=e.detail.context;t.state===r.STATE_EDIT_EVENT?this._deleteEvent(t):t.state==r.STATE_ADD_EVENT&&((n=(s=this._renderInfo)==null?void 0:s.eventInfos)==null||n.splice(this._renderInfo.length-1,1)),this._editState={state:r.STATE_NOT_EDITING},this._handleNext(e),this.requestUpdate()}_handleEventCancel(e){var s,n;this._editState={state:r.STATE_NOT_EDITING},this.requestUpdate();const t=(n=(s=e.detail)==null?void 0:s.context)==null?void 0:n.eventInfoIndex;t>=0&&setTimeout(()=>{const l=this.shadowRoot.querySelectorAll(".cal-event-line"),i=Math.min(l.length-1,t),a=l[i];a&&a.focus()})}_handleNext(e){var n,l,i,a;const t=(n=e==null?void 0:e.detail)==null?void 0:n.context,s=(l=e==null?void 0:e.detail)==null?void 0:l.next;t&&s&&(s=="next"?t.eventInfoIndex+1<((a=(i=this._renderInfo)==null?void 0:i.eventInfos)==null?void 0:a.length)?this._handleEventClick(t.eventInfoIndex+1,e):this._handleAddEventClick(e):s=="prev"&&(t.eventInfoIndex>0?t.state===r.STATE_ADD_SUBITEM?this._handleEventClick(t.eventInfoIndex,e):this._handleEventClick(t.eventInfoIndex-1,e):t.eventInfoIndex==0&&this._handleEventClick(0,e)))}};g(r,"styles",A`
    .cal-event-group {
      display: flex;
      flex-direction: column;

      padding-left: 5px;
      padding-right: 5px;
      padding-top: 1px;
      padding-bottom: 1px;
      margin-top: 1px;
      margin-bottom: 1px;
      font-size: 0.9em;

      /* Keep each event on one line */
      text-wrap: nowrap;
      overflow: hidden;
      white-space: nowrap;
    }
    .icon {
      color: var(--gray-text);
      min-width: 1.1em;
      height: 1.1em;
      vertical-align: -0.125em;
    }
    .cal-event-group-border {
      align-self: center;
      border-top: 2px solid;
      border-color: inherit;
      width: 100%;
    }
    .cal-event-line:hover,
    .cal-event-add:hover {
      background: var(--clickable-hover-color);
    }
    .cal-event-line:focus {
      outline: 1px solid var(--bs-primary);
      overflow-x: hidden;
    }
    .cal-event-add {
      font-weight: bold;
      cursor: text;
    }
    .cal-event-add.expanded {
      /* When there are no existing events, the the add button should be "expanded" instead of collapsed into the last row */
      height: 1.5em;
    }
    .cal-event-plussign {
      display: none;
      width: 1.35em;
      text-align: center;
      color: var(--dark-gray-text);
      cursor: default;
      float: right;
      border-radius: 6px;
      margin-top: -1.5em;
    }
    .expanded .cal-event-plussign {
      /* When add line is "expanded", don't use negative margin-top to collapse plus sign into previous row */
      margin-top: 0px;
    }
    .cal-event-group:hover .cal-event-plussign {
      /* Show plus sign only when mouse is in this event group */
      display: block;
      background: var(--main-background-color);
      box-shadow: var(--bs-primary) 0px 0px 0px 1px inset;

      /* Highlight plus sign when directly hovered over */
      &:hover {
        background: var(--selected-color-opaque);
      }
    }
    .blank-line {
      min-height: 1.5em;
    }

    span.schedule {
      color: var(--gray-text);
      font-size: 0.72em;
    }
  `),g(r,"properties",{borderColor:{type:String},background:{type:String},events:{type:Object,attribute:!1},settings:{type:Object,attribute:!1},readonly:{type:Boolean},showAll:{type:Boolean}}),g(r,"STATE_NOT_EDITING",0),g(r,"STATE_ADD_EVENT",1),g(r,"STATE_ADD_SUBITEM",2),g(r,"STATE_EDIT_EVENT",3);let N=r;customElements.define("cal-event-group",N);class U extends S{constructor(){super(),this.data=this.data??{cals:{}},this.settings=this.settings??{cals:{}}}willUpdate(e){var s;if(!this.data||!this.settings)return;(((s=this.settings.options)==null?void 0:s.calOrder)??[]).forEach(n=>{this.data.cals[n]=this.data.cals[n]||{id:n,events:[]}}),this._renderInfo=this._createRenderInfo(this.data,this.alerts,this.settings,this.showAll)}_createRenderInfo(e,t,s,n){var c;const{cals:l}=e,{cals:i,options:a}=s,u=((c=a==null?void 0:a.calOrder)==null?void 0:c.map(p=>{var v,E;return(n||((v=i[p])==null?void 0:v.visible))&&!((E=i[p])!=null&&E.archived)&&l[p]}))??[],b=u.filter(p=>{var v;return p&&((v=i[p.id])==null?void 0:v.type)!=="call"}),f={type:"divider"},k=u.filter(p=>{var v;return p&&((v=i[p.id])==null?void 0:v.type)==="call"}),$=[...b,f,...k].map(({type:p,id:v,events:E})=>{var x,w;return{type:p??"event",color:(x=i[v])==null?void 0:x.color,background:(w=i[v])==null?void 0:w.background,events:E??[]}}),y=["info","warn","danger"];let _="",h=null;if((t==null?void 0:t.length)>0){const p=t.map(E=>y.indexOf(E.type)),v=Math.max(...p);_=y[v]?`alert-${y[v]}`:"",h=t.map(E=>E.text)}return{cals:$,alertTexts:h,alertClass:_}}render(){const{cals:e,alertText:t,alertClass:s}=this._renderInfo;if(!e)return;const n=d`
      <div class="cal-day-and-note">
        <span>${this.day}</span>
        <div
          class="cal-note"
          style="${this.noteStyle}"
          ?contenteditable=${!this.readonly}
          @keydown=${this.handleNoteKeydown}
          @blur=${this.handleNoteBlur}
          .innerText="${this.note??""}"
        ></div>
      </div>
    `,l=e.map(({type:a,color:u,background:b,events:f})=>a=="divider"?d`<div style="flex-grow:1"></div>`:d`<cal-event-group
          borderColor="${u}"
          background="${b}"
          ?readonly=${this.readonly}
          ?showAll=${this.showAll}
          .events=${f}
          .settings=${this.settings}
        ></cal-event-group>`),i=this.dim?"dim":"";return d`<div class="day ${s} ${i}">
      ${n} ${l}
    </div>`}forceRefresh(){this.requestUpdate(),this.shadowRoot.querySelectorAll("cal-event-group").forEach(e=>e.forceRefresh())}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseup",this.handleMouseUp),this.addEventListener("change",this.handleEventGroupChange)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseup",this.handleMouseUp),this.removeEventListener("change",this.handleEventGroupChange)}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{index:this.index,...t}}))}handleMouseDown(e){setTimeout(()=>this._dispatch("cal-day-mousedown",{mouseDownEvent:e}),0)}handleMouseOver(e){this._dispatch("cal-day-mouseover")}handleMouseUp(e){setTimeout(()=>this._dispatch("cal-day-mouseup"),0)}handleEventGroupChange(e){const t=structuredClone(this.data),{events:s,prevEvents:n}=e.detail;s&&n&&Object.entries(this.data.cals||{}).forEach(([l,i])=>{(i==null?void 0:i.events)==s&&(t.cals[l].events=n)}),e.stopPropagation(),this._dispatch("cal-day-change",{data:this.data,prevData:t})}handleNoteKeydown(e){(e.keyCode==27&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey||e.keyCode==13&&(e.ctrlKey||!e.ctrlKey)&&!e.metaKey&&!e.shiftKey&&!e.altKey)&&(e.preventDefault(),e.stopPropagation(),e.target.blur())}handleNoteBlur(e){const t=this.shadowRoot.querySelector(".cal-note").innerText;if(this.data.note&&!t||this.data.note!=t){const s=structuredClone(this.data);t?this.data.note=t:delete this.data.note,this._dispatch("cal-day-change",{data:this.data,prevData:s})}e.preventDefault(),e.stopPropagation()}}g(U,"styles",A`
    :host {
      display: flex;
      flex-direction: column;
      outline: 1px solid var(--border-color);
      padding-top: 0px;
      min-height: 4em; /* Minimum height for a day in the calendar. See comment in cal-component .cal-container */
      user-select: none; /* Do not allow text selection, which interferes with day range selection */
    }
    :host([selected]) {
      background-color: var(--selected-color);
    }
    .day {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      &.alert-info {
        box-shadow: var(--info-box-shadow);
      }
      &.alert-warn {
        box-shadow: var(--warn-box-shadow);
      }
      &.alert-danger {
        box-shadow: var(--err-box-shadow);
      }
    }
    .cal-day-and-note {
      display: flex;
      font-size: 1em;
      white-space: nowrap;
    }
    .cal-day-and-note > span:nth-of-type(1) {
      /* 1st <span> is the day number */
      font-weight: bold;
      color: rgb(60, 64, 67);
      padding-left: 2px;
      padding-right: 4px;
    }
    .cal-note {
      font-size: 0.8em;
      color: var(--info-text);
      overflow: hidden;
      text-overflow: ellipsis;
      align-self: center;
      flex-grow: 1;
      padding-left: 3px;

      &:focus {
        outline: none;
        border: 1px solid var(--bs-primary);
        background: white;
      }
    }
    .dim {
      opacity: 0.8;

      .cal-day-and-note > span {
        opacity: 0.5;
      }
    }
    @media print {
      :host {
        break-inside: avoid; /* Avoid page breaks when printing */
      }
    }
  `),g(U,"properties",{day:{type:String},note:{type:String},noteStyle:{type:String},readonly:{type:Boolean},selected:{type:Boolean},dim:{type:Boolean},showAll:{type:Boolean},data:{type:Object,attribute:!1},alerts:{type:Object,attribute:!1},settings:{type:Object,attribute:!1}});customElements.define("cal-day",U);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const C={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},j=o=>(...e)=>({_$litDirective$:o,values:e});class z{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=o=>o.strings===void 0,W={},G=(o,e=W)=>o._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=j(class extends z{constructor(o){if(super(o),o.type!==C.PROPERTY&&o.type!==C.ATTRIBUTE&&o.type!==C.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!H(o))throw Error("`live` bindings can only contain a single expression")}render(o){return o}update(o,[e]){if(e===B||e===m)return e;const t=o.element,s=o.name;if(o.type===C.PROPERTY){if(e===t[s])return B}else if(o.type===C.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(s))return B}else if(o.type===C.ATTRIBUTE&&t.getAttribute(s)===e+"")return B;return G(o),e}}),J=0,Q=1,X=2,T=class T extends S{constructor(){super(),this.focusOnUpdate=!1}render(){const e=this.checked==Q,t=this.checked==X,s=this.type=="confirm"?this.type:"",n=this.showHandle?d`<div class="handle">${I("grip-vertical")}</div>`:m,l=this.hideCheckbox?m:d`<input type="checkbox" id="check" .checked=${e} .indeterminate=${t} @change=${this._handleCheckChange}></input>`,i=d`<div
      id="label"
      ?contenteditable=${this.editable}
      @keydown=${this._handleKeyDown}
      @click=${this._handleLabelClick}
      @focus=${this._handleItemFocus}
      @blur=${this._handleItemBlur}
      .innerText=${Y(this.label??"")}
    ></div>`,a=this.hideColor?m:this.renderColorSelector(this.color),u=this.showDelete?d`<div class="deleteBtn" @click=${this._handleDeleteClick}>
          ${I("xmark")}
        </div>`:null,f=((this.type=="confirm"?d`<button class="confirmBtn" @click=${this._handleDeleteClick}>
            Delete
          </button>`:null)||u)??m;return d`<div
      class="item ${s}"
      style="${this.itemStyle||m}"
      @click=${this._handleItemClick}
    >
      ${l} ${a} ${i} ${f} ${n}
    </div> `}renderColorSelector(e){return e=e??T.DEFAULT_COLOR,d`<div class="color-selector" @click=${this._handleColorSelectClick}>
      <span style="background-color: ${e}">
        <input type="color" id="color" value="${e}" @input=${this._handleColorChange}></input>
      </span>
    </div>`}updated(){this.checkInputEl=this.shadowRoot.querySelector("#check"),this.labelEl=this.shadowRoot.querySelector("#label"),this.colorInputEl=this.shadowRoot.querySelector("#color"),this.focusOnUpdate&&(this.labelEl.focus(),this.focusOnUpdate=!1)}_dispatch(e,t={}){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{context:this.context,...t}}))}_handleCheckChange(e){this._dispatch("item-checked",{checked:this.checkInputEl.checked})}_handleKeyDown(e){(e.keyCode==13||e.keyCode==27)&&(e.preventDefault(),this.labelEl.blur())}_commit(){this._dispatch("item-change",{label:this.labelEl.textContent.trim()})}_handleItemClick(e){this._dispatch("item-click")}_handleItemBlur(e){this._commit(),this._dispatch("item-blur")}_handleItemFocus(e){this._dispatch("item-focus")}_handleLabelClick(e){!this.editable&&!this.hideCheckbox&&(this.checkInputEl.checked=!this.checkInputEl.checked,this._handleCheckChange())}_handleColorSelectClick(e){e.preventDefault(),this.colorInputEl.showPicker()}_handleColorChange(e){this.color=this.colorInputEl.value.toLowerCase(),(this.color=="black"||this.color=="#000000"||this.color=="white"||this.color=="#ffffff")&&(this.color=null),this._dispatch("item-color-change",{color:this.color})}_handleDeleteClick(e){e.preventDefault(),e.stopPropagation(),this._dispatch("item-click"),this._dispatch("item-delete-click")}};g(T,"DEFAULT_COLOR","inherit"),g(T,"properties",{type:{type:String},label:{type:String},editable:{type:Boolean},selected:{type:Boolean},showHandle:{type:Boolean},showDelete:{type:Boolean},hideCheckbox:{type:Boolean},checked:{type:Number},hideColor:{type:Boolean},color:{type:String},itemStyle:{type:String}}),g(T,"styles",A`
    :host([selected]) > .item {
      color: white;
      background-color: var(--bs-primary);
    }
    .item {
      min-height: 1.5em;
      display: flex;
      align-items: center;
      &:hover {
        background: var(--clickable-hover-color);
      }
      &.confirm:hover {
        background: inherit;
      }
    }
    .icon {
      height: 1em;
      width: 1.25em;
      vertical-align: -0.125em;
    }
    .handle {
      display: flex;
      align-items: center;
      color: var(--dark-gray-icon-color);

      cursor: pointer;

      .icon {
        display: none;
        height: 0.9em;
      }
    }
    :hover .handle .icon {
      display: inline-block;
    }
    input[type="checkbox"] {
      accent-color: var(--bs-light);
    }
    #label {
      flex-grow: 1;
      padding: 3px;
      cursor: text;
      &:focus {
        outline: none;
        border-bottom: 1px solid var(--border-color);
      }
    }
    .confirm #label {
      color: var(--warn-text);
      border-bottom: 1px solid var(--border-color);
    }
    .color-selector {
      display: flex;
      align-items: center;

      padding-left: 3px;
      padding-right: 4px;

      cursor: default;

      /* Actual clickable color circle */
      span {
        display: inline-block;
        border: 1px solid var(--dark-border-color);
        border-radius: 50%;
        width: 14px;
        height: 14px;

        /* Hide the input element */
        input[type="color"] {
          visibility: hidden;
          width: 0;
        }
      }
    }
    .deleteBtn {
      display: none;
      cursor: pointer;
    }
    :hover .deleteBtn {
      display: inline-block;
    }
    .confirmBtn {
      color: var(--warn-text);
      background-color: white;
      border-radius: 0.3em;
      border: 1px solid var(--warn-text);
      cursor: pointer;
      font-size: 0.9em;

      &:hover {
        color: white;
        background-color: var(--bs-danger);
      }
    }
  `);let O=T;customElements.define("cal-checklist-item",O);class R extends S{constructor(){super(),this.items=[],this.selected=-1,this.deleteIdx=-1}willUpdate(e){this.items=this.items??[],this._renderInfo=this._createRenderInfo(this.items,this.selected,this.deleteIdx),this.items.forEach(t=>delete t.editing)}_createRenderInfo(e,t,s){const n=[];return e.forEach(({id:l,label:i,color:a,checked:u,editing:b},f)=>{n.push({type:"item",id:l,label:i,color:a,checked:u,editing:b,selected:t==f,context:{index:f}})}),s>=0&&s<e.length&&n.splice(s+1,0,{type:"confirm",label:this.deleteWarning,context:{index:s,confirmed:!0}}),{itemInfos:n}}render(){if(!this._renderInfo)return m;const e=this._renderInfo.itemInfos.map((s,n)=>d`<cal-checklist-item
        type=${s.type}
        label=${s.label}
        color=${s.color}
        checked=${s.checked}
        itemStyle=${this.itemStyle??m}
        ?selected=${this.selectable&&s.selected}
        ?showHandle=${this.moveable}
        ?editable=${this.editable}
        ?showDelete=${this.addable&&!this.disableDelete}
        ?hideCheckbox=${!this.checkable}
        ?hideColor=${!this.colorable}
        .focusOnUpdate=${s.editing}
        .context=${s.context}
      ></cal-checklist-item>`),t=this.addable?d`<div
          class="cal-checklist-add"
          style="${this.itemStyle??m}"
          @click=${this._handleAddItemClick}
        >
          <span class="cal-checklist-plussign">${I("plus")}</span>
          <span>Add</span>
        </div>`:m;return d`<div>${e} ${t}</div>`}connectedCallback(){super.connectedCallback(),this.addEventListener("item-click",this._handleItemClick),this.addEventListener("item-focus",this._handleItemClick),this.addEventListener("item-blur",this._handleItemBlur),this.addEventListener("item-checked",this._handleItemChecked),this.addEventListener("item-change",this._handleItemChange),this.addEventListener("item-color-change",this._handleItemColorChange),this.addEventListener("item-delete-click",this._handleItemDeleteClick)}deleteItem(e=null){if(e??(e=this.selected),e>=0&&e<this.items.length){const t=this.items[e];this.items.splice(e,1),this._dispatch("delete-item",{item:t,index:e}),this.requestUpdate()}}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleItemClick(e){const{index:t}=e.detail.context;this.deleteIdx=-1,this.selectable&&(this.selected=t,this._dispatch("select",{item:this.items[t],index:t})),this.requestUpdate()}_handleItemBlur(e){this.selected=-1,this.deleteIdx=-1,this.selectable&&this._dispatch("select",{item:null,index:-1}),this.requestUpdate()}_handleItemChecked(e){const{index:t}=e.detail.context,s=e.detail.checked;this.items[t].checked=s,this._dispatch("checked",{item:this.items[t],index:t,checked:s})}_handleItemChange(e){const{index:t}=e.detail.context,s=e.detail.label;this.items[t].label=s,this._dispatch("change",{item:this.items[t],index:t,label:s}),this.requestUpdate()}_handleItemColorChange(e){const{index:t}=e.detail.context,s=e.detail.color;this.items[t].color=s,this._dispatch("color-change",{item:this.items[t],index:t,color:s})}_handleItemDeleteClick(e){let{index:t,confirmed:s}=e.detail.context;s=s||this.deleteWarning==null,s?this.deleteItem(t):(this.deleteIdx=t,this.requestUpdate())}_handleAddItemClick(e){const t={label:"",checked:J,color:null,editing:!0};this.default&&Object.assign(t,this.default),this.items.push(t),this.selected=this.items.length-1,this.deleteIdx=-1,this._dispatch("add-item",{item:t}),this._dispatch("select",{item:t,index:this.selected})}}g(R,"properties",{items:{type:Array,attribute:!1},itemStyle:{type:String},selected:{type:Number},default:{type:Object,attribute:!1},disableDelete:{type:Boolean},deleteWarning:{type:String},checkable:{type:Boolean},colorable:{type:Boolean},addable:{type:Boolean},editable:{type:Boolean},selectable:{type:Boolean},moveable:{type:Boolean}}),g(R,"styles",A`
    :host {
      display: flex;
      flex-direction: column;

      /* Default with no border, but if border is added to HTML element, set rounded border */
      border-radius: var(--bs-border-radius);
      overflow: hidden;
    }
    .cal-checklist-add {
      cursor: text;
      color: var(--dark-gray-text);
      font-size: 0.9em;
      padding: 3px 7px;
      &:hover {
        background: var(--clickable-hover-color);
      }
    }
    .cal-checklist-plussign {
      display: inline-block;
      width: 0.9em;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      padding: 0px 5px;
    }
  `);customElements.define("cal-checklist",R);class te{constructor(e,t){this.currentPage=e;const s=new URLSearchParams(t);this.accessCode=s.get("c"),this.deptId=s.get("d"),this.user=null,this.auth=this._beginAuth(),this.auth.redirect="#"}async _beginAuth(){var e;if(this.user=await q(!0),this.user&&this.deptId&&await P(this.deptId))return{user:this.user,deptId:this.deptId};if(this.accessCode){const t=await V(this.accessCode);if(t.user&&t.deptId!=null)return this.user=t.user,this.deptId=t.deptId,t;throw this.auth.redirect="./login.html",new Error("Invalid access code, redirect")}if(this.user){const t=await F();throw((e=t.data)==null?void 0:e.length)>0?(this.auth.redirect=`./${this.currentPage}?d=${t.data[0].id}`,new Error("Invalid department, redirect")):(this.auth.redirect="./dept.html",new Error("No departments, redirect"))}throw this.auth.redirect="./login.html",new Error("User not authenticated, redirect")}}export{te as A,Q as C,X as I,J as U,j as e,z as i,C as t};
