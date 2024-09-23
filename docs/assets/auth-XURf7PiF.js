var q=Object.defineProperty;var P=(d,e,t)=>e in d?q(d,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):d[e]=t;var f=(d,e,t)=>P(d,typeof e!="symbol"?e+"":e,t);import{s as A,i as D,x as c,G as w,T as v,w as L,v as V,H as j,I as F,y as H}from"./db-CavrfT6U.js";class U extends A{connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this._handleMouseDown),this.addEventListener("keydown",this._handleKeyDown),this.addEventListener("blur",this._commit)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this._handleMouseDown),this.removeEventListener("keydown",this._handleKeyDown),this.removeEventListener("blur",this._commit)}render(){var u;const e=this.subitem?c`<div class="indicator">${w("caret-right")}</div>`:v,t=c`<input type="text" id="resource" size="1" placeholder="Name" list="people-list" value="${this.resource}"></input>`,s=c`<div class="divider"></div>`,i=c`<input type="text" id="schedule" size="1" placeholder="Shift" value="${this.schedule}"></input>`,a=c`<button
      id="subitem-btn"
      @click=${this._handleSubitemClick}
    >
      ${w("subitem")}
    </button>`,n=c`<button id="delete-btn" @click=${this._delete}>
      ${w("trash-can")}
    </button>`,l=(u=this.people)!=null&&u.length?c`<datalist id="people-list">
          ${(this.people??[]).map(m=>c`<option value="${m}"></option>`)}
        </datalist>`:v;return c`${e}
      <div class="inputs" @keydown=${this._handleInputKeyDown}>
        ${t} ${s} ${i} ${l}
      </div>
      ${a} ${n}`}updated(){this.scheduleEl=this.shadowRoot.querySelector("#schedule"),this.resourceEl=this.shadowRoot.querySelector("#resource");const e=this.initialFocus==="schedule"?this.scheduleEl:this.resourceEl;e.focus(),e.select(),this._editComplete=!1}isEmpty(){const e=this.resourceEl.value.trim(),t=this.scheduleEl.value.trim();return!e&&!t}_dispatch(e,t={}){const s=this.resourceEl.value.trim(),i=this.scheduleEl.value.trim(),a=this.context;this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{context:a,resource:s,schedule:i,...t}}))}_handleMouseDown(e){e.stopPropagation()}_handleKeyDown(e){e.keyCode==27&&(this._editComplete=!0,this._dispatch("cal-event-edit-cancel"))}_handleInputKeyDown(e){e.keyCode==13&&(e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey?this.shadowRoot.querySelector("#subitem-btn").click():e.shiftKey&&!e.ctrlKey&&!e.altKey&&!e.metaKey?this._commit("prev"):this._commit("next"))}_handleSubitemClick(e){if(this.isEmpty())return this.resourceEl.focus();this._editComplete=!0,this._dispatch("cal-event-edit-add-subitem")}_handleDeleteClick(e){this._editComplete=!0,this._delete()}_delete(e=null){this._editComplete=!0,this._dispatch("cal-event-edit-delete",{next:e})}_commit(e=null){this._editComplete||(this._editComplete=!0,this.isEmpty()?this._delete(e):this._dispatch("cal-event-edit-change",{next:e}))}}f(U,"styles",D`
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
  `),f(U,"properties",{eventindex:{type:Number,attribute:!1,noAccessor:!0},isNew:{type:Boolean},subitem:{type:Boolean},resource:{type:String},schedule:{type:String},people:{type:Array,attribute:!1},initialFocus:{type:String}});customElements.define("cal-event-edit",U);const h=class h extends A{constructor(){super(),this._editState={state:h.STATE_NOT_EDITING,eventInfoIndex:null,initialFocus:null}}willUpdate(e){this.events=this.events??[],this.settings=this.settings??{};const t=["white","black","#ffffff","#000000"];this.borderColor=t.includes(this.borderColor)?null:this.borderColor,this.background=t.includes(this.background)?null:this.background,this._renderInfo=this._createRenderInfo(this.events,this.alerts,this.settings.options,this._editState,this.readonly,this.showAll)}_createRenderInfo(e,t,s,i,a,n){const l=[],u=(s==null?void 0:s.people)??{},m=o=>{var r;return n||(((r=u[o])==null?void 0:r.visible)??!0)},g=o=>{var r;return n?null:(r=u[o])==null?void 0:r.color},x=(o,r,E)=>{var y;const b=(y=E==null?void 0:E.find(k=>k.eventIdx==o))==null?void 0:y.type;return b?`alert-${b}`:""},C=(o,r,E,b)=>{var k;const y=typeof r.schedule=="object"?r.schedule.join(", "):r.schedule;l.push({type:"event",subitem:o,color:g((k=r.resource)==null?void 0:k.toLowerCase()),alertClass:x(E,b,t),resource:r.resource,schedule:y,eventInfoIndex:l.length,eventIndex:E,eventSubitemIndex:b})};if(e.forEach((o,r)=>{var b,y,k;const E=(b=o.subitems)==null?void 0:b.find(N=>{var B;return m((B=N.resource)==null?void 0:B.toLowerCase())});(m((y=o.resource)==null?void 0:y.toLowerCase())||E)&&(C(!1,o,r,null),(k=o.subitems)==null||k.forEach((N,B)=>{C(!0,N,r,B)}))}),i.state==h.STATE_ADD_EVENT)l.push({type:"edit",subitem:!1,resource:"",schedule:"",eventInfoIndex:l.length,eventIndex:this.events.length,eventSubitemIndex:null,editState:i});else if(i.state==h.STATE_ADD_SUBITEM){const o=l[i.eventInfoIndex],r={type:"edit",subitem:!0,resource:"",schedule:"",eventInfoIndex:i.eventInfoIndex+1,eventIndex:o.eventIndex,eventSubitemIndex:o.eventSubitemIndex,editState:i};l.splice(i.eventInfoIndex+1,0,r)}else if(i.state==h.STATE_EDIT_EVENT){const o=l[i.eventInfoIndex];o.type="edit",o.editState=i}const T=!a&&i.state!==h.STATE_ADD_EVENT,_=l.length==0?"expanded":"",I={visible:T,class:_},p=Object.entries((s==null?void 0:s.people)??{}).filter(([o,r])=>n||(r.visible??!0)).map(([o,r])=>r.name).sort();return{eventInfos:l,addButton:I,peopleList:p}}render(){const e=this.background&&`background: ${this.background};`,t=this.borderColor&&`border-color: ${this.borderColor};`,{eventInfos:s,addButton:i,peopleList:a}=this._renderInfo,n=t?c`<div class="cal-event-group-border" style="${t}"></div>`:v,l=s.map(({type:g,subitem:x,color:C,alertClass:T,resource:_,schedule:I,eventInfoIndex:p,editState:o})=>{if(g==="event"){const r=x?w("caret-right"):v;return c`<div
            class="cal-event-line ${T}"
            tabindex="0"
            .index=${p}
            @click=${this._handleEventClick.bind(this,p)}
          >
            ${r}
            <span class="resource" style="color: ${C??v}"
              >${_}</span
            >
            <span class="schedule">${I}</span>
          </div> `}else if(g==="edit")return c`<cal-event-edit
            .context=${o}
            .people=${a}
            ?subitem="${x}"
            resource="${_}"
            schedule="${I}"
            initialFocus="${o.initialFocus||v}"
          ></cal-event-edit>`}),u=i.visible?c`<div
          class="cal-event-add ${i.class}"
          @click=${this._handleAddEventClick}
        >
          <span class="cal-event-plussign">+</span>
        </div>`:v,m=this.readonly&&s.length==0?c`<div class="blank-line"></div>`:v;return c`<div
      class="cal-event-group"
      style="${e||v}"
    >
      ${n} ${l} ${u} ${m}
    </div>`}forceRefresh(){this.requestUpdate()}_commitEventEdit(e,t){e.state===h.STATE_ADD_EVENT?this._addEvent(e,t):e.state===h.STATE_ADD_SUBITEM?this._addSubitem(e,t):e.state===h.STATE_EDIT_EVENT&&this._updateEvent(e,t)}_addEvent(e,{resource:t,schedule:s}){const i=structuredClone(this.events),a=s.split(",").map(l=>l.trim()),n={resource:t,schedule:a,subitems:[]};this.events.push(n),this._dispatch("change",{prevEvents:i})}_addSubitem(e,{resource:t,schedule:s}){const i=structuredClone(this.events),a=this._renderInfo.eventInfos[e.eventInfoIndex],n=this.events[a.eventIndex],l=a.eventSubitemIndex??-1,u=s.split(",").map(g=>g.trim()),m={resource:t,schedule:u,subitems:[]};n.subitems=n.subitems??[],n.subitems.splice(l+1,0,m),this._dispatch("change",{prevEvents:i})}_updateEvent(e,{resource:t,schedule:s}){const i=structuredClone(this.events),a=e.eventInfoIndex,n=this._renderInfo.eventInfos[a],l=n.eventSubitemIndex==null?this.events[n.eventIndex]:this.events[n.eventIndex].subitems[n.eventSubitemIndex],u=s.split(",").map(m=>m.trim());(l.resource!=t||JSON.stringify(l.schedule)!=JSON.stringify(u))&&(l.resource=t,l.schedule=u,this._dispatch("change",{prevEvents:i}))}_deleteEvent(e){var i;const t=structuredClone(this.events),s=this._renderInfo.eventInfos[e.eventInfoIndex];(s==null?void 0:s.eventSubitemIndex)==null?this.events.splice(s.eventIndex,1):(i=this.events[s.eventIndex])==null||i.subitems.splice(s.eventSubitemIndex,1),this._dispatch("change",{prevEvents:t})}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this._handleKeyDown),this.addEventListener("cal-event-edit-change",this._handleEventChange),this.addEventListener("cal-event-edit-delete",this._handleDeleteEvent),this.addEventListener("cal-event-edit-add-subitem",this._handleAddEventSubitem),this.addEventListener("cal-event-edit-cancel",this._handleEventCancel)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this._handleKeyDown),this.removeEventListener("cal-event-edit-change",this._handleEventChange),this.removeEventListener("cal-event-edit-delete",this._handleDeleteEvent),this.removeEventListener("cal-event-edit-add-subitem",this._handleAddEventSubitem),this.removeEventListener("cal-event-edit-cancel",this._handleEventCancel)}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{events:this.events,...t}}))}_handleKeyDown(e){var s,i,a,n;const t=(i=(s=e.composedPath)==null?void 0:s.call(e))==null?void 0:i[0];e.keyCode==13?(a=t==null?void 0:t.classList)!=null&&a.contains("cal-event-line")&&(e.preventDefault(),e.stopPropagation(),t.click()):(e.keyCode==8||e.keyCode==46)&&(n=t==null?void 0:t.classList)!=null&&n.contains("cal-event-line")&&(e.preventDefault(),e.stopPropagation(),t.index>=0&&t.index<this._renderInfo.eventInfos.length&&this._deleteEvent({eventInfoIndex:t.index}))}_handleEventClick(e,t){var s;this.readonly||(this._editState={state:h.STATE_EDIT_EVENT,eventInfoIndex:e,initialFocus:((s=t.target)==null?void 0:s.classList.contains("schedule"))&&"schedule"},this.requestUpdate())}_handleAddEventClick(e){this.readonly||(this._editState={state:h.STATE_ADD_EVENT,eventInfoIndex:this._renderInfo.eventInfos.length},this.requestUpdate())}_handleEventChange(e){const t=e.detail.context;this._commitEventEdit(t,e.detail),this._editState={state:h.STATE_NOT_EDITING},this._handleNext(e),this.requestUpdate()}_handleAddEventSubitem(e){const t=e.detail.context;let s=t.eventInfoIndex;t.state===h.STATE_ADD_EVENT?this._addEvent(t,e.detail):t.state===h.STATE_ADD_SUBITEM?(this._addSubitem(t,e.detail),s++):t.state===h.STATE_EDIT_EVENT&&this._updateEvent(t,e.detail),this._editState={state:h.STATE_ADD_SUBITEM,eventInfoIndex:s},this.requestUpdate()}_handleDeleteEvent(e){var s,i;const t=e.detail.context;t.state===h.STATE_EDIT_EVENT?this._deleteEvent(t):t.state==h.STATE_ADD_EVENT&&((i=(s=this._renderInfo)==null?void 0:s.eventInfos)==null||i.splice(this._renderInfo.length-1,1)),this._editState={state:h.STATE_NOT_EDITING},this._handleNext(e),this.requestUpdate()}_handleEventCancel(e){var s,i;this._editState={state:h.STATE_NOT_EDITING},this.requestUpdate();const t=(i=(s=e.detail)==null?void 0:s.context)==null?void 0:i.eventInfoIndex;t>=0&&setTimeout(()=>{const a=this.shadowRoot.querySelectorAll(".cal-event-line"),n=Math.min(a.length-1,t),l=a[n];l&&l.focus()})}_handleNext(e){var i,a,n,l;const t=(i=e==null?void 0:e.detail)==null?void 0:i.context,s=(a=e==null?void 0:e.detail)==null?void 0:a.next;t&&s&&(s=="next"?t.eventInfoIndex+1<((l=(n=this._renderInfo)==null?void 0:n.eventInfos)==null?void 0:l.length)?this._handleEventClick(t.eventInfoIndex+1,e):this._handleAddEventClick(e):s=="prev"&&(t.eventInfoIndex>0?t.state===h.STATE_ADD_SUBITEM?this._handleEventClick(t.eventInfoIndex,e):this._handleEventClick(t.eventInfoIndex-1,e):t.eventInfoIndex==0&&this._handleEventClick(0,e)))}};f(h,"styles",D`
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
    .cal-event-line.alert-info {
      box-shadow: var(--info-box-shadow);
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
  `),f(h,"properties",{borderColor:{type:String},background:{type:String},events:{type:Object,attribute:!1},alerts:{type:Object,attribute:!1},settings:{type:Object,attribute:!1},readonly:{type:Boolean},showAll:{type:Boolean}}),f(h,"STATE_NOT_EDITING",0),f(h,"STATE_ADD_EVENT",1),f(h,"STATE_ADD_SUBITEM",2),f(h,"STATE_EDIT_EVENT",3);let O=h;customElements.define("cal-event-group",O);class R extends A{constructor(){super(),this.data=this.data??{cals:{}},this.settings=this.settings??{cals:{}}}willUpdate(e){var s;if(!this.data||!this.settings)return;(((s=this.settings.options)==null?void 0:s.calOrder)??[]).forEach(i=>{this.data.cals[i]=this.data.cals[i]||{id:i,events:[]}}),this._renderInfo=this._createRenderInfo(this.data,this.alerts,this.settings,this.showAll)}_createRenderInfo(e,t,s,i){var I;const{cals:a}=e,{cals:n,options:l}=s,u=((I=l==null?void 0:l.calOrder)==null?void 0:I.map(p=>{var o,r;return(i||((o=n[p])==null?void 0:o.visible))&&!((r=n[p])!=null&&r.archived)&&a[p]}))??[],m=u.filter(p=>{var o;return p&&((o=n[p.id])==null?void 0:o.type)!=="call"}),g={type:"divider"},x=u.filter(p=>{var o;return p&&((o=n[p.id])==null?void 0:o.type)==="call"}),C=[...m,g,...x].map(({type:p,id:o,events:r})=>{var E,b;return{type:p??"event",color:(E=n[o])==null?void 0:E.color,background:(b=n[o])==null?void 0:b.background,events:r??[],alerts:t==null?void 0:t.filter(y=>y.calId==o&&y.eventIdx>=0)}});let T="",_=null;if((t==null?void 0:t.length)>0){const p=["info","warn","danger"],r=t.filter(b=>!(b.eventIdx>=0)).map(b=>p.indexOf(b.type)),E=Math.max(...r);T=p[E]?`alert-${p[E]}`:"",_=t.map(b=>b.text)}return{cals:C,alertTexts:_,alertClass:T}}render(){const{cals:e,alertText:t,alertClass:s}=this._renderInfo;if(!e)return;const i=c`
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
    `,a=e.map(({type:l,color:u,background:m,events:g,alerts:x})=>l=="divider"?c`<div style="flex-grow:1"></div>`:c`<cal-event-group
            borderColor="${u}"
            background="${m}"
            ?readonly=${this.readonly}
            ?showAll=${this.showAll}
            .events=${g}
            .alerts=${x}
            .settings=${this.settings}
          ></cal-event-group>`),n=this.dim?"dim":"";return c`<div class="day ${s} ${n}">
      ${i} ${a}
    </div>`}forceRefresh(){this.requestUpdate(),this.shadowRoot.querySelectorAll("cal-event-group").forEach(e=>e.forceRefresh())}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseup",this.handleMouseUp),this.addEventListener("change",this.handleEventGroupChange)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseup",this.handleMouseUp),this.removeEventListener("change",this.handleEventGroupChange)}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{index:this.index,...t}}))}handleMouseDown(e){setTimeout(()=>this._dispatch("cal-day-mousedown",{mouseDownEvent:e}),0)}handleMouseOver(e){this._dispatch("cal-day-mouseover")}handleMouseUp(e){setTimeout(()=>this._dispatch("cal-day-mouseup"),0)}handleEventGroupChange(e){const t=structuredClone(this.data),{events:s,prevEvents:i}=e.detail;s&&i&&Object.entries(this.data.cals||{}).forEach(([a,n])=>{(n==null?void 0:n.events)==s&&(t.cals[a].events=i)}),e.stopPropagation(),this._dispatch("cal-day-change",{data:this.data,prevData:t})}handleNoteKeydown(e){(e.keyCode==27&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey||e.keyCode==13&&(e.ctrlKey||!e.ctrlKey)&&!e.metaKey&&!e.shiftKey&&!e.altKey)&&(e.preventDefault(),e.stopPropagation(),e.target.blur())}handleNoteBlur(e){const t=this.shadowRoot.querySelector(".cal-note").innerText;if(this.data.note&&!t||this.data.note!=t){const s=structuredClone(this.data);t?this.data.note=t:delete this.data.note,this._dispatch("cal-day-change",{data:this.data,prevData:s})}e.preventDefault(),e.stopPropagation()}}f(R,"styles",D`
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
  `),f(R,"properties",{day:{type:String},note:{type:String},noteStyle:{type:String},readonly:{type:Boolean},selected:{type:Boolean},dim:{type:Boolean},showAll:{type:Boolean},data:{type:Object,attribute:!1},alerts:{type:Object,attribute:!1},settings:{type:Object,attribute:!1}});customElements.define("cal-day",R);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},z=d=>(...e)=>({_$litDirective$:d,values:e});class W{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=d=>d.strings===void 0,Y={},J=(d,e=Y)=>d._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=z(class extends W{constructor(d){if(super(d),d.type!==$.PROPERTY&&d.type!==$.ATTRIBUTE&&d.type!==$.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!G(d))throw Error("`live` bindings can only contain a single expression")}render(d){return d}update(d,[e]){if(e===L||e===v)return e;const t=d.element,s=d.name;if(d.type===$.PROPERTY){if(e===t[s])return L}else if(d.type===$.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(s))return L}else if(d.type===$.ATTRIBUTE&&t.getAttribute(s)===e+"")return L;return J(d),e}}),X=0,Z=1,ee=2,S=class S extends A{constructor(){super(),this.focusOnUpdate=!1}render(){const e=this.checked==Z,t=this.checked==ee,s=this.type=="confirm"?this.type:"",i=this.showHandle?c`<div class="handle">${w("grip-vertical")}</div>`:v,a=this.hideCheckbox?v:c`<input type="checkbox" id="check" .checked=${e} .indeterminate=${t} @change=${this._handleCheckChange}></input>`,n=c`<div
      id="label"
      ?contenteditable=${this.editable}
      @keydown=${this._handleKeyDown}
      @click=${this._handleLabelClick}
      @focus=${this._handleItemFocus}
      @blur=${this._handleItemBlur}
      .innerText=${Q(this.label??"")}
    ></div>`,l=this.hideColor?v:this.renderColorSelector(this.color),u=this.showDelete?c`<div class="deleteBtn" @click=${this._handleDeleteClick}>
          ${w("xmark")}
        </div>`:null,g=((this.type=="confirm"?c`<button class="confirmBtn" @click=${this._handleDeleteClick}>
            Delete
          </button>`:null)||u)??v;return c`<div
      class="item ${s}"
      style="${this.itemStyle||v}"
      @click=${this._handleItemClick}
    >
      ${a} ${l} ${n} ${g} ${i}
    </div> `}renderColorSelector(e){return e=e??S.DEFAULT_COLOR,c`<div class="color-selector" @click=${this._handleColorSelectClick}>
      <span style="background-color: ${e}">
        <input type="color" id="color" value="${e}" @input=${this._handleColorChange}></input>
      </span>
    </div>`}updated(){this.checkInputEl=this.shadowRoot.querySelector("#check"),this.labelEl=this.shadowRoot.querySelector("#label"),this.colorInputEl=this.shadowRoot.querySelector("#color"),this.focusOnUpdate&&(this.labelEl.focus(),this.focusOnUpdate=!1)}_dispatch(e,t={}){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{context:this.context,...t}}))}_handleCheckChange(e){this._dispatch("item-checked",{checked:this.checkInputEl.checked})}_handleKeyDown(e){(e.keyCode==13||e.keyCode==27)&&(e.preventDefault(),this.labelEl.blur())}_commit(){this._dispatch("item-change",{label:this.labelEl.textContent.trim()})}_handleItemClick(e){this._dispatch("item-click")}_handleItemBlur(e){this._commit(),this._dispatch("item-blur")}_handleItemFocus(e){this._dispatch("item-focus")}_handleLabelClick(e){!this.editable&&!this.hideCheckbox&&(this.checkInputEl.checked=!this.checkInputEl.checked,this._handleCheckChange())}_handleColorSelectClick(e){e.preventDefault(),this.colorInputEl.showPicker()}_handleColorChange(e){this.color=this.colorInputEl.value.toLowerCase(),(this.color=="black"||this.color=="#000000"||this.color=="white"||this.color=="#ffffff")&&(this.color=null),this._dispatch("item-color-change",{color:this.color})}_handleDeleteClick(e){e.preventDefault(),e.stopPropagation(),this._dispatch("item-click"),this._dispatch("item-delete-click")}};f(S,"DEFAULT_COLOR","inherit"),f(S,"properties",{type:{type:String},label:{type:String},editable:{type:Boolean},selected:{type:Boolean},showHandle:{type:Boolean},showDelete:{type:Boolean},hideCheckbox:{type:Boolean},checked:{type:Number},hideColor:{type:Boolean},color:{type:String},itemStyle:{type:String}}),f(S,"styles",D`
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
  `);let K=S;customElements.define("cal-checklist-item",K);class M extends A{constructor(){super(),this.items=[],this.selected=-1,this.deleteIdx=-1}willUpdate(e){this.items=this.items??[],this._renderInfo=this._createRenderInfo(this.items,this.selected,this.deleteIdx),this.items.forEach(t=>delete t.editing)}_createRenderInfo(e,t,s){const i=[];return e.forEach(({id:a,label:n,color:l,checked:u,editing:m},g)=>{i.push({type:"item",id:a,label:n,color:l,checked:u,editing:m,selected:t==g,context:{index:g}})}),s>=0&&s<e.length&&i.splice(s+1,0,{type:"confirm",label:this.deleteWarning,context:{index:s,confirmed:!0}}),{itemInfos:i}}render(){if(!this._renderInfo)return v;const e=this._renderInfo.itemInfos.map((s,i)=>c`<cal-checklist-item
        type=${s.type}
        label=${s.label}
        color=${s.color}
        checked=${s.checked}
        itemStyle=${this.itemStyle??v}
        ?selected=${this.selectable&&s.selected}
        ?showHandle=${this.moveable}
        ?editable=${this.editable}
        ?showDelete=${this.addable&&!this.disableDelete}
        ?hideCheckbox=${!this.checkable}
        ?hideColor=${!this.colorable}
        .focusOnUpdate=${s.editing}
        .context=${s.context}
      ></cal-checklist-item>`),t=this.addable?c`<div
          class="cal-checklist-add"
          style="${this.itemStyle??v}"
          @click=${this._handleAddItemClick}
        >
          <span class="cal-checklist-plussign">${w("plus")}</span>
          <span>Add</span>
        </div>`:v;return c`<div>${e} ${t}</div>`}connectedCallback(){super.connectedCallback(),this.addEventListener("item-click",this._handleItemClick),this.addEventListener("item-focus",this._handleItemClick),this.addEventListener("item-blur",this._handleItemBlur),this.addEventListener("item-checked",this._handleItemChecked),this.addEventListener("item-change",this._handleItemChange),this.addEventListener("item-color-change",this._handleItemColorChange),this.addEventListener("item-delete-click",this._handleItemDeleteClick)}deleteItem(e=null){if(e??(e=this.selected),e>=0&&e<this.items.length){const t=this.items[e];this.items.splice(e,1),this._dispatch("delete-item",{item:t,index:e}),this.requestUpdate()}}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleItemClick(e){const{index:t}=e.detail.context;this.deleteIdx=-1,this.selectable&&(this.selected=t,this._dispatch("select",{item:this.items[t],index:t})),this.requestUpdate()}_handleItemBlur(e){this.selected=-1,this.deleteIdx=-1,this.selectable&&this._dispatch("select",{item:null,index:-1}),this.requestUpdate()}_handleItemChecked(e){const{index:t}=e.detail.context,s=e.detail.checked;this.items[t].checked=s,this._dispatch("checked",{item:this.items[t],index:t,checked:s})}_handleItemChange(e){const{index:t}=e.detail.context,s=e.detail.label;this.items[t].label=s,this._dispatch("change",{item:this.items[t],index:t,label:s}),this.requestUpdate()}_handleItemColorChange(e){const{index:t}=e.detail.context,s=e.detail.color;this.items[t].color=s,this._dispatch("color-change",{item:this.items[t],index:t,color:s})}_handleItemDeleteClick(e){let{index:t,confirmed:s}=e.detail.context;s=s||this.deleteWarning==null,s?this.deleteItem(t):(this.deleteIdx=t,this.requestUpdate())}_handleAddItemClick(e){const t={label:"",checked:X,color:null,editing:!0};this.default&&Object.assign(t,this.default),this.items.push(t),this.selected=this.items.length-1,this.deleteIdx=-1,this._dispatch("add-item",{item:t}),this._dispatch("select",{item:t,index:this.selected})}}f(M,"properties",{items:{type:Array,attribute:!1},itemStyle:{type:String},selected:{type:Number},default:{type:Object,attribute:!1},disableDelete:{type:Boolean},deleteWarning:{type:String},checkable:{type:Boolean},colorable:{type:Boolean},addable:{type:Boolean},editable:{type:Boolean},selectable:{type:Boolean},moveable:{type:Boolean}}),f(M,"styles",D`
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
  `);customElements.define("cal-checklist",M);class ie{constructor(e,t){this.currentPage=e;const s=new URLSearchParams(t);this.accessCode=s.get("c"),this.deptId=s.get("d"),this.user=null,this.auth=this._beginAuth(),this.auth.redirect="#"}async _beginAuth(){var e;if(this.user=await V(!0),this.user&&this.deptId&&await j(this.deptId))return{user:this.user,deptId:this.deptId};if(this.accessCode){const t=await F(this.accessCode);if(t.user&&t.deptId!=null)return this.user=t.user,this.deptId=t.deptId,t;throw this.auth.redirect="./login.html",new Error("Invalid access code, redirect")}if(this.user){const t=await H();throw((e=t.data)==null?void 0:e.length)>0?(this.auth.redirect=`./${this.currentPage}?d=${t.data[0].id}`,new Error("Invalid department, redirect")):(this.auth.redirect="./dept.html",new Error("No departments, redirect"))}throw this.auth.redirect="./login.html",new Error("User not authenticated, redirect")}}export{ie as A,Z as C,ee as I,X as U,z as e,W as i,$ as t};
