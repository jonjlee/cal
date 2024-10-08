var M=Object.defineProperty;var P=(r,e,t)=>e in r?M(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var b=(r,e,t)=>P(r,typeof e!="symbol"?e+"":e,t);import{s as S,i as A,x as h,D as w,T as v,w as B,v as V,H as j,I as F,y as H}from"./db-DgbyiZOf.js";class U extends S{connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this._handleMouseDown),this.addEventListener("keydown",this._handleKeyDown),this.addEventListener("blur",this._commit)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this._handleMouseDown),this.removeEventListener("keydown",this._handleKeyDown),this.removeEventListener("blur",this._commit)}render(){var u;const e=this.subitem?h`<div class="indicator">${w("caret-right")}</div>`:v,t=h`<input type="text" id="resource" size="1" placeholder="Name" list="people-list" value="${this.resource}"></input>`,s=h`<div class="divider"></div>`,i=h`<input type="text" id="schedule" size="1" placeholder="Shift" value="${this.schedule}"></input>`,a=h`<button
      id="subitem-btn"
      @click=${this._handleSubitemClick}
    >
      ${w("subitem")}
    </button>`,n=h`<button id="delete-btn" @click=${this._delete}>
      ${w("trash-can")}
    </button>`,l=(u=this.people)!=null&&u.length?h`<datalist id="people-list">
          ${(this.people??[]).map(m=>h`<option value="${m}"></option>`)}
        </datalist>`:v;return h`${e}
      <div class="inputs" @keydown=${this._handleInputKeyDown}>
        ${t} ${s} ${i} ${l}
      </div>
      ${a} ${n}`}updated(){this.scheduleEl=this.shadowRoot.querySelector("#schedule"),this.resourceEl=this.shadowRoot.querySelector("#resource");const e=this.initialFocus==="schedule"?this.scheduleEl:this.resourceEl;e.focus(),e.select(),this._editComplete=!1}isEmpty(){const e=this.resourceEl.value.trim(),t=this.scheduleEl.value.trim();return!e&&!t}_dispatch(e,t={}){const s=this.resourceEl.value.trim(),i=this.scheduleEl.value.trim(),a=this.context;this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{context:a,resource:s,schedule:i,...t}}))}_handleMouseDown(e){e.stopPropagation()}_handleKeyDown(e){e.keyCode==27&&(this._editComplete=!0,this._dispatch("cal-event-edit-cancel"))}_handleInputKeyDown(e){e.keyCode==13&&(e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey?this.shadowRoot.querySelector("#subitem-btn").click():e.shiftKey&&!e.ctrlKey&&!e.altKey&&!e.metaKey?this._commit("prev"):this._commit("next"))}_handleSubitemClick(e){if(this.isEmpty())return this.resourceEl.focus();this._editComplete=!0,this._dispatch("cal-event-edit-add-subitem")}_handleDeleteClick(e){this._editComplete=!0,this._delete()}_delete(e=null){this._editComplete=!0,this._dispatch("cal-event-edit-delete",{next:e})}_commit(e=null){this._editComplete||(this._editComplete=!0,this.isEmpty()?this._delete(e):this._dispatch("cal-event-edit-change",{next:e}))}}b(U,"styles",A`
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
  `),b(U,"properties",{eventindex:{type:Number,attribute:!1,noAccessor:!0},isNew:{type:Boolean},subitem:{type:Boolean},resource:{type:String},schedule:{type:String},people:{type:Array,attribute:!1},initialFocus:{type:String}});customElements.define("cal-event-edit",U);const d=class d extends S{constructor(){super(),this._editState={state:d.STATE_NOT_EDITING,eventInfoIndex:null,initialFocus:null}}willUpdate(e){this.events=this.events??[],this.settings=this.settings??{};const t=["white","black","#ffffff","#000000"];this.borderColor=t.includes(this.borderColor)?null:this.borderColor,this.background=t.includes(this.background)?null:this.background,this._renderInfo=this._createRenderInfo(this.events,this.alerts,this.settings.options,this._editState,this.readonly,this.showAll)}_createRenderInfo(e,t,s,i,a,n){const l=[],u=(s==null?void 0:s.people)??{},m=o=>{var c;return n||(((c=u[o])==null?void 0:c.visible)??!0)},g=o=>{var c;return n?null:(c=u[o])==null?void 0:c.color},_=(o,c,E)=>{var y;const f=(y=E==null?void 0:E.find(k=>k.eventIdx==o))==null?void 0:y.type;return f?`alert-${f}`:""},C=(o,c,E,f)=>{var k;const y=typeof c.schedule=="object"?c.schedule.join(", "):c.schedule;l.push({type:"event",subitem:o,color:g((k=c.resource)==null?void 0:k.toLowerCase()),alertClass:_(E,f,t),resource:c.resource,schedule:y,eventInfoIndex:l.length,eventIndex:E,eventSubitemIndex:f})};if(e.forEach((o,c)=>{var f,y,k;const E=(f=o.subitems)==null?void 0:f.find(N=>{var L;return m((L=N.resource)==null?void 0:L.toLowerCase())});(m((y=o.resource)==null?void 0:y.toLowerCase())||E)&&(C(!1,o,c,null),(k=o.subitems)==null||k.forEach((N,L)=>{C(!0,N,c,L)}))}),i.state==d.STATE_ADD_EVENT)l.push({type:"edit",subitem:!1,resource:"",schedule:"",eventInfoIndex:l.length,eventIndex:this.events.length,eventSubitemIndex:null,editState:i});else if(i.state==d.STATE_ADD_SUBITEM){const o=l[i.eventInfoIndex],c={type:"edit",subitem:!0,resource:"",schedule:"",eventInfoIndex:i.eventInfoIndex+1,eventIndex:o.eventIndex,eventSubitemIndex:o.eventSubitemIndex,editState:i};l.splice(i.eventInfoIndex+1,0,c)}else if(i.state==d.STATE_EDIT_EVENT){const o=l[i.eventInfoIndex];o.type="edit",o.editState=i}const T=!a&&i.state!==d.STATE_ADD_EVENT,x=l.length==0?"expanded":"",I={visible:T,class:x},p=Object.entries((s==null?void 0:s.people)??{}).filter(([o,c])=>n||(c.visible??!0)).map(([o,c])=>c.name).sort();return{eventInfos:l,addButton:I,peopleList:p}}render(){const e=this.background&&`background: ${this.background};`,t=this.borderColor&&`border-color: ${this.borderColor};`,{eventInfos:s,addButton:i,peopleList:a}=this._renderInfo,n=t?h`<div class="cal-event-group-border" style="${t}"></div>`:v,l=s.map(({type:g,subitem:_,color:C,alertClass:T,resource:x,schedule:I,eventInfoIndex:p,editState:o})=>{if(g==="event"){const c=_?w("caret-right"):v;return h`<div
            class="cal-event-line ${T}"
            tabindex="0"
            draggable="true"
            .index=${p}
            @click=${this._handleEventClick.bind(this,p)}
            @dragstart=${this._handleDragStart.bind(this,p)}
          >
            ${c}
            <span class="resource" style="color: ${C??v}"
              >${x}</span
            >
            <span class="schedule">${I}</span>
          </div> `}else if(g==="edit")return h`<cal-event-edit
            .context=${o}
            .people=${a}
            ?subitem="${_}"
            resource="${x}"
            schedule="${I}"
            initialFocus="${o.initialFocus||v}"
          ></cal-event-edit>`}),u=i.visible?h`<div
          class="cal-event-add ${i.class}"
          @click=${this._handleAddEventClick}
        >
          <span class="cal-event-plussign">+</span>
        </div>`:v,m=this.readonly&&s.length==0?h`<div class="blank-line"></div>`:v;return h`<div
      class="cal-event-group"
      style="${e||v}"
    >
      ${n} ${l} ${u} ${m}
    </div>`}forceRefresh(){this.requestUpdate()}_commitEventEdit(e,t){e.state===d.STATE_ADD_EVENT?this._addEvent(e,t):e.state===d.STATE_ADD_SUBITEM?this._addSubitem(e,t):e.state===d.STATE_EDIT_EVENT&&this._updateEvent(e,t)}_addEvent(e,{resource:t,schedule:s}){const i=structuredClone(this.events),a=s.split(",").map(l=>l.trim()),n={resource:t,schedule:a,subitems:[]};this.events.push(n),this._dispatch("change",{prevEvents:i})}_addSubitem(e,{resource:t,schedule:s}){const i=structuredClone(this.events),a=this._renderInfo.eventInfos[e.eventInfoIndex],n=this.events[a.eventIndex],l=a.eventSubitemIndex??-1,u=s.split(",").map(g=>g.trim()),m={resource:t,schedule:u,subitems:[]};n.subitems=n.subitems??[],n.subitems.splice(l+1,0,m),this._dispatch("change",{prevEvents:i})}_updateEvent(e,{resource:t,schedule:s}){const i=structuredClone(this.events),a=e.eventInfoIndex,n=this._renderInfo.eventInfos[a],l=n.eventSubitemIndex==null?this.events[n.eventIndex]:this.events[n.eventIndex].subitems[n.eventSubitemIndex],u=s.split(",").map(m=>m.trim());(l.resource!=t||JSON.stringify(l.schedule)!=JSON.stringify(u))&&(l.resource=t,l.schedule=u,this._dispatch("change",{prevEvents:i}))}_deleteEvent(e){var i;const t=structuredClone(this.events),s=this._renderInfo.eventInfos[e.eventInfoIndex];(s==null?void 0:s.eventSubitemIndex)==null?this.events.splice(s.eventIndex,1):(i=this.events[s.eventIndex])==null||i.subitems.splice(s.eventSubitemIndex,1),this._dispatch("change",{prevEvents:t})}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this._handleKeyDown),this.addEventListener("cal-event-edit-change",this._handleEventChange),this.addEventListener("cal-event-edit-delete",this._handleDeleteEvent),this.addEventListener("cal-event-edit-add-subitem",this._handleAddEventSubitem),this.addEventListener("cal-event-edit-cancel",this._handleEventCancel),this.addEventListener("dragover",this._handleDragOver.bind(this)),this.addEventListener("dragleave",this._handleDragLeave.bind(this)),this.addEventListener("drop",this._handleDrop.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this._handleKeyDown),this.removeEventListener("cal-event-edit-change",this._handleEventChange),this.removeEventListener("cal-event-edit-delete",this._handleDeleteEvent),this.removeEventListener("cal-event-edit-add-subitem",this._handleAddEventSubitem),this.removeEventListener("cal-event-edit-cancel",this._handleEventCancel)}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{events:this.events,...t}}))}_handleKeyDown(e){var s,i,a,n;const t=(i=(s=e.composedPath)==null?void 0:s.call(e))==null?void 0:i[0];e.keyCode==13?(a=t==null?void 0:t.classList)!=null&&a.contains("cal-event-line")&&(e.preventDefault(),e.stopPropagation(),t.click()):(e.keyCode==8||e.keyCode==46)&&(n=t==null?void 0:t.classList)!=null&&n.contains("cal-event-line")&&(e.preventDefault(),e.stopPropagation(),t.index>=0&&t.index<this._renderInfo.eventInfos.length&&this._deleteEvent({eventInfoIndex:t.index}))}_handleEventClick(e,t){var s;this.readonly||(this._editState={state:d.STATE_EDIT_EVENT,eventInfoIndex:e,initialFocus:((s=t.target)==null?void 0:s.classList.contains("schedule"))&&"schedule"},this.requestUpdate())}_handleAddEventClick(e){this.readonly||(this._editState={state:d.STATE_ADD_EVENT,eventInfoIndex:this._renderInfo.eventInfos.length},this.requestUpdate())}_handleEventChange(e){const t=e.detail.context;this._commitEventEdit(t,e.detail),this._editState={state:d.STATE_NOT_EDITING},this._handleNext(e),this.requestUpdate()}_handleAddEventSubitem(e){const t=e.detail.context;let s=t.eventInfoIndex;t.state===d.STATE_ADD_EVENT?this._addEvent(t,e.detail):t.state===d.STATE_ADD_SUBITEM?(this._addSubitem(t,e.detail),s++):t.state===d.STATE_EDIT_EVENT&&this._updateEvent(t,e.detail),this._editState={state:d.STATE_ADD_SUBITEM,eventInfoIndex:s},this.requestUpdate()}_handleDeleteEvent(e){var s,i;const t=e.detail.context;t.state===d.STATE_EDIT_EVENT?this._deleteEvent(t):t.state==d.STATE_ADD_EVENT&&((i=(s=this._renderInfo)==null?void 0:s.eventInfos)==null||i.splice(this._renderInfo.length-1,1)),this._editState={state:d.STATE_NOT_EDITING},this._handleNext(e),this.requestUpdate()}_handleEventCancel(e){var s,i;this._editState={state:d.STATE_NOT_EDITING},this.requestUpdate();const t=(i=(s=e.detail)==null?void 0:s.context)==null?void 0:i.eventInfoIndex;t>=0&&setTimeout(()=>{const a=this.shadowRoot.querySelectorAll(".cal-event-line"),n=Math.min(a.length-1,t),l=a[n];l&&l.focus()})}_handleNext(e){var i,a,n,l;const t=(i=e==null?void 0:e.detail)==null?void 0:i.context,s=(a=e==null?void 0:e.detail)==null?void 0:a.next;t&&s&&(s=="next"?t.eventInfoIndex+1<((l=(n=this._renderInfo)==null?void 0:n.eventInfos)==null?void 0:l.length)?this._handleEventClick(t.eventInfoIndex+1,e):this._handleAddEventClick(e):s=="prev"&&(t.eventInfoIndex>0?t.state===d.STATE_ADD_SUBITEM?this._handleEventClick(t.eventInfoIndex,e):this._handleEventClick(t.eventInfoIndex-1,e):t.eventInfoIndex==0&&this._handleEventClick(0,e)))}_handleDragStart(e,t){e>=0&&(t.dataTransfer.setData("text/json",JSON.stringify(this._renderInfo.eventInfos[e])),t.dataTransfer.effectAllowed="move",d._dragged=this)}_handleDragOver(e){e.preventDefault(),this.shadowRoot.querySelector(".cal-event-group").classList.add("drag-over")}_handleDragLeave(e){this.shadowRoot.querySelector(".cal-event-group").classList.remove("drag-over")}_handleDrop(e){const t=d._dragged;if(d._dragged=null,this.shadowRoot.querySelector(".cal-event-group").classList.remove("drag-over"),t!==this){let s=null;try{s=JSON.parse(e.dataTransfer.getData("text/json"))}catch{}(s!=null&&s.resource||s!=null&&s.schedule)&&(t._deleteEvent({eventInfoIndex:s.eventInfoIndex}),this._addEvent(null,{resource:s.resource,schedule:s.schedule}),this.requestUpdate(),t.requestUpdate())}this._dispatch("mouseup",{})}};b(d,"styles",A`
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
    .drag-over {
      background: #e6f3ff;
    }

    .blank-line {
      min-height: 1.5em;
    }

    span.schedule {
      color: var(--gray-text);
      font-size: 0.72em;
    }
  `),b(d,"properties",{borderColor:{type:String},background:{type:String},events:{type:Object,attribute:!1},alerts:{type:Object,attribute:!1},settings:{type:Object,attribute:!1},readonly:{type:Boolean},showAll:{type:Boolean}}),b(d,"STATE_NOT_EDITING",0),b(d,"STATE_ADD_EVENT",1),b(d,"STATE_ADD_SUBITEM",2),b(d,"STATE_EDIT_EVENT",3),b(d,"_dragged",null);let O=d;customElements.define("cal-event-group",O);class R extends S{constructor(){super(),this.data=this.data??{cals:{}},this.settings=this.settings??{cals:{}}}willUpdate(e){var s;if(!this.data||!this.settings)return;(((s=this.settings.options)==null?void 0:s.calOrder)??[]).forEach(i=>{this.data.cals[i]=this.data.cals[i]||{id:i,events:[]}}),this._renderInfo=this._createRenderInfo(this.data,this.alerts,this.settings,this.showAll)}_createRenderInfo(e,t,s,i){var I;const{cals:a}=e,{cals:n,options:l}=s,u=((I=l==null?void 0:l.calOrder)==null?void 0:I.map(p=>{var o,c;return(i||((o=n[p])==null?void 0:o.visible))&&!((c=n[p])!=null&&c.archived)&&a[p]}))??[],m=u.filter(p=>{var o;return p&&((o=n[p.id])==null?void 0:o.type)!=="call"}),g={type:"divider"},_=u.filter(p=>{var o;return p&&((o=n[p.id])==null?void 0:o.type)==="call"}),C=[...m,g,..._].map(({type:p,id:o,events:c})=>{var E,f;return{type:p??"event",color:(E=n[o])==null?void 0:E.color,background:(f=n[o])==null?void 0:f.background,events:c??[],alerts:t==null?void 0:t.filter(y=>y.calId==o&&y.eventIdx>=0)}});let T="",x=null;if((t==null?void 0:t.length)>0){const p=["info","warn","danger"],c=t.filter(f=>!(f.eventIdx>=0)).map(f=>p.indexOf(f.type)),E=Math.max(...c);T=p[E]?`alert-${p[E]}`:"",x=t.map(f=>f.text)}return{cals:C,alertTexts:x,alertClass:T}}render(){const{cals:e,alertText:t,alertClass:s}=this._renderInfo;if(!e)return;const i=h`
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
    `,a=e.map(({type:l,color:u,background:m,events:g,alerts:_})=>l=="divider"?h`<div style="flex-grow:1"></div>`:h`<cal-event-group
            borderColor="${u}"
            background="${m}"
            ?readonly=${this.readonly}
            ?showAll=${this.showAll}
            .events=${g}
            .alerts=${_}
            .settings=${this.settings}
          ></cal-event-group>`),n=this.dim?"dim":"";return h`<div class="day ${s} ${n}">
      ${i} ${a}
    </div>`}forceRefresh(){this.requestUpdate(),this.shadowRoot.querySelectorAll("cal-event-group").forEach(e=>e.forceRefresh())}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseup",this.handleMouseUp),this.addEventListener("change",this.handleEventGroupChange)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseup",this.handleMouseUp),this.removeEventListener("change",this.handleEventGroupChange)}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{index:this.index,...t}}))}handleMouseDown(e){setTimeout(()=>this._dispatch("cal-day-mousedown",{mouseDownEvent:e}),0)}handleMouseOver(e){this._dispatch("cal-day-mouseover")}handleMouseUp(e){setTimeout(()=>this._dispatch("cal-day-mouseup"),0)}handleEventGroupChange(e){const t=structuredClone(this.data),{events:s,prevEvents:i}=e.detail;s&&i&&Object.entries(this.data.cals||{}).forEach(([a,n])=>{(n==null?void 0:n.events)==s&&(t.cals[a].events=i)}),e.stopPropagation(),this._dispatch("cal-day-change",{data:this.data,prevData:t})}handleNoteKeydown(e){(e.keyCode==27&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey||e.keyCode==13&&(e.ctrlKey||!e.ctrlKey)&&!e.metaKey&&!e.shiftKey&&!e.altKey)&&(e.preventDefault(),e.stopPropagation(),e.target.blur())}handleNoteBlur(e){const t=this.shadowRoot.querySelector(".cal-note").innerText;if(this.data.note&&!t||this.data.note!=t){const s=structuredClone(this.data);t?this.data.note=t:delete this.data.note,this._dispatch("cal-day-change",{data:this.data,prevData:s})}e.preventDefault(),e.stopPropagation()}}b(R,"styles",A`
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
  `),b(R,"properties",{day:{type:String},note:{type:String},noteStyle:{type:String},readonly:{type:Boolean},selected:{type:Boolean},dim:{type:Boolean},showAll:{type:Boolean},data:{type:Object,attribute:!1},alerts:{type:Object,attribute:!1},settings:{type:Object,attribute:!1}});customElements.define("cal-day",R);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},z=r=>(...e)=>({_$litDirective$:r,values:e});class W{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const J=r=>r.strings===void 0,Y={},G=(r,e=Y)=>r._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Q=z(class extends W{constructor(r){if(super(r),r.type!==$.PROPERTY&&r.type!==$.ATTRIBUTE&&r.type!==$.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!J(r))throw Error("`live` bindings can only contain a single expression")}render(r){return r}update(r,[e]){if(e===B||e===v)return e;const t=r.element,s=r.name;if(r.type===$.PROPERTY){if(e===t[s])return B}else if(r.type===$.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(s))return B}else if(r.type===$.ATTRIBUTE&&t.getAttribute(s)===e+"")return B;return G(r),e}}),X=0,Z=1,ee=2,D=class D extends S{constructor(){super(),this.focusOnUpdate=!1}render(){const e=this.checked==Z,t=this.checked==ee,s=this.type=="confirm"?this.type:"",i=this.showHandle?h`<div class="handle">${w("grip-vertical")}</div>`:v,a=this.hideCheckbox?v:h`<input type="checkbox" id="check" .checked=${e} .indeterminate=${t} @change=${this._handleCheckChange}></input>`,n=h`<div
      id="label"
      ?contenteditable=${this.editable}
      @keydown=${this._handleKeyDown}
      @click=${this._handleLabelClick}
      @focus=${this._handleItemFocus}
      @blur=${this._handleItemBlur}
      .innerText=${Q(this.label??"")}
    ></div>`,l=this.hideColor?v:this.renderColorSelector(this.color),u=this.showDelete?h`<div class="deleteBtn" @click=${this._handleDeleteClick}>
          ${w("xmark")}
        </div>`:null,g=((this.type=="confirm"?h`<button class="confirmBtn" @click=${this._handleDeleteClick}>
            Delete
          </button>`:null)||u)??v;return h`<div
      class="item ${s}"
      style="${this.itemStyle||v}"
      @click=${this._handleItemClick}
    >
      ${a} ${l} ${n} ${g} ${i}
    </div> `}renderColorSelector(e){return e=e??D.DEFAULT_COLOR,h`<div class="color-selector" @click=${this._handleColorSelectClick}>
      <span style="background-color: ${e}">
        <input type="color" id="color" value="${e}" @input=${this._handleColorChange}></input>
      </span>
    </div>`}updated(){this.checkInputEl=this.shadowRoot.querySelector("#check"),this.labelEl=this.shadowRoot.querySelector("#label"),this.colorInputEl=this.shadowRoot.querySelector("#color"),this.focusOnUpdate&&(this.labelEl.focus(),this.focusOnUpdate=!1)}_dispatch(e,t={}){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{context:this.context,...t}}))}_handleCheckChange(e){this._dispatch("item-checked",{checked:this.checkInputEl.checked})}_handleKeyDown(e){(e.keyCode==13||e.keyCode==27)&&(e.preventDefault(),this.labelEl.blur())}_commit(){this._dispatch("item-change",{label:this.labelEl.textContent.trim()})}_handleItemClick(e){this._dispatch("item-click")}_handleItemBlur(e){this._commit(),this._dispatch("item-blur")}_handleItemFocus(e){this._dispatch("item-focus")}_handleLabelClick(e){!this.editable&&!this.hideCheckbox&&(this.checkInputEl.checked=!this.checkInputEl.checked,this._handleCheckChange())}_handleColorSelectClick(e){e.preventDefault(),this.colorInputEl.showPicker()}_handleColorChange(e){this.color=this.colorInputEl.value.toLowerCase(),(this.color=="black"||this.color=="#000000"||this.color=="white"||this.color=="#ffffff")&&(this.color=null),this._dispatch("item-color-change",{color:this.color})}_handleDeleteClick(e){e.preventDefault(),e.stopPropagation(),this._dispatch("item-click"),this._dispatch("item-delete-click")}};b(D,"DEFAULT_COLOR","inherit"),b(D,"properties",{type:{type:String},label:{type:String},editable:{type:Boolean},selected:{type:Boolean},showHandle:{type:Boolean},showDelete:{type:Boolean},hideCheckbox:{type:Boolean},checked:{type:Number},hideColor:{type:Boolean},color:{type:String},itemStyle:{type:String}}),b(D,"styles",A`
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
  `);let K=D;customElements.define("cal-checklist-item",K);class q extends S{constructor(){super(),this.items=[],this.selected=-1,this.deleteIdx=-1}willUpdate(e){this.items=this.items??[],this._renderInfo=this._createRenderInfo(this.items,this.selected,this.deleteIdx),this.items.forEach(t=>delete t.editing)}_createRenderInfo(e,t,s){const i=[];return e.forEach(({id:a,label:n,color:l,checked:u,editing:m},g)=>{i.push({type:"item",id:a,label:n,color:l,checked:u,editing:m,selected:t==g,context:{index:g}})}),s>=0&&s<e.length&&i.splice(s+1,0,{type:"confirm",label:this.deleteWarning,context:{index:s,confirmed:!0}}),{itemInfos:i}}render(){if(!this._renderInfo)return v;const e=this._renderInfo.itemInfos.map((s,i)=>h`<cal-checklist-item
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
      ></cal-checklist-item>`),t=this.addable?h`<div
          class="cal-checklist-add"
          style="${this.itemStyle??v}"
          @click=${this._handleAddItemClick}
        >
          <span class="cal-checklist-plussign">${w("plus")}</span>
          <span>Add</span>
        </div>`:v;return h`<div>${e} ${t}</div>`}connectedCallback(){super.connectedCallback(),this.addEventListener("item-click",this._handleItemClick),this.addEventListener("item-focus",this._handleItemClick),this.addEventListener("item-blur",this._handleItemBlur),this.addEventListener("item-checked",this._handleItemChecked),this.addEventListener("item-change",this._handleItemChange),this.addEventListener("item-color-change",this._handleItemColorChange),this.addEventListener("item-delete-click",this._handleItemDeleteClick)}deleteItem(e=null){if(e??(e=this.selected),e>=0&&e<this.items.length){const t=this.items[e];this.items.splice(e,1),this._dispatch("delete-item",{item:t,index:e}),this.requestUpdate()}}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleItemClick(e){const{index:t}=e.detail.context;this.deleteIdx=-1,this.selectable&&(this.selected=t,this._dispatch("select",{item:this.items[t],index:t})),this.requestUpdate()}_handleItemBlur(e){this.selected=-1,this.deleteIdx=-1,this.selectable&&this._dispatch("select",{item:null,index:-1}),this.requestUpdate()}_handleItemChecked(e){const{index:t}=e.detail.context,s=e.detail.checked;this.items[t].checked=s,this._dispatch("checked",{item:this.items[t],index:t,checked:s})}_handleItemChange(e){const{index:t}=e.detail.context,s=e.detail.label;this.items[t].label=s,this._dispatch("change",{item:this.items[t],index:t,label:s}),this.requestUpdate()}_handleItemColorChange(e){const{index:t}=e.detail.context,s=e.detail.color;this.items[t].color=s,this._dispatch("color-change",{item:this.items[t],index:t,color:s})}_handleItemDeleteClick(e){let{index:t,confirmed:s}=e.detail.context;s=s||this.deleteWarning==null,s?this.deleteItem(t):(this.deleteIdx=t,this.requestUpdate())}_handleAddItemClick(e){const t={label:"",checked:X,color:null,editing:!0};this.default&&Object.assign(t,this.default),this.items.push(t),this.selected=this.items.length-1,this.deleteIdx=-1,this._dispatch("add-item",{item:t}),this._dispatch("select",{item:t,index:this.selected})}}b(q,"properties",{items:{type:Array,attribute:!1},itemStyle:{type:String},selected:{type:Number},default:{type:Object,attribute:!1},disableDelete:{type:Boolean},deleteWarning:{type:String},checkable:{type:Boolean},colorable:{type:Boolean},addable:{type:Boolean},editable:{type:Boolean},selectable:{type:Boolean},moveable:{type:Boolean}}),b(q,"styles",A`
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
  `);customElements.define("cal-checklist",q);class ie{constructor(e,t){this.currentPage=e;const s=new URLSearchParams(t);this.accessCode=s.get("c"),this.deptId=s.get("d"),this.user=null,this.auth=this._beginAuth(),this.auth.redirect="#"}async _beginAuth(){var e;if(this.user=await V(!0),this.user&&this.deptId&&await j(this.deptId))return{user:this.user,deptId:this.deptId};if(this.accessCode){const t=await F(this.accessCode);if(t.user&&t.deptId!=null)return this.user=t.user,this.deptId=t.deptId,t;throw this.auth.redirect="./login.html",new Error("Invalid access code, redirect")}if(this.user){const t=await H();throw((e=t.data)==null?void 0:e.length)>0?(this.auth.redirect=`./${this.currentPage}?d=${t.data[0].id}`,new Error("Invalid department, redirect")):(this.auth.redirect="./dept.html",new Error("No departments, redirect"))}throw this.auth.redirect="./login.html",new Error("User not authenticated, redirect")}}export{ie as A,Z as C,ee as I,X as U,z as e,W as i,$ as t};
