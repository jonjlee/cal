var U=Object.defineProperty;var O=(E,e,t)=>e in E?U(E,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):E[e]=t;var b=(E,e,t)=>O(E,typeof e!="symbol"?e+"":e,t);import{LitElement as $,css as T,html as a,nothing as m}from"https://cdn.jsdelivr.net/gh/lit/dist@2.8.0/core/lit-core.min.js";import{live as K}from"https://cdn.jsdelivr.net/npm/lit-html@2.8.0/directives/live.min.js";import{v as I,m as M,x as q,y as R,o as P}from"./model-8AZnbWHn.js";class D extends ${connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this._handleMouseDown),this.addEventListener("keydown",this._handleKeyDown),this.addEventListener("blur",this._commit)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this._handleMouseDown),this.removeEventListener("keydown",this._handleKeyDown),this.removeEventListener("blur",this._commit)}render(){var u;const e=this.subitem?a`<div class="indicator">${I("caret-right")}</div>`:m,t=a`<input type="text" id="resource" size="1" placeholder="Name" list="people-list" value="${this.resource}"></input>`,s=a`<div class="divider"></div>`,i=a`<input type="text" id="schedule" size="1" placeholder="Shift" value="${this.schedule}"></input>`,n=a`<button
      id="subitem-btn"
      @click=${this._handleSubitemClick}
    >
      ${I("subitem")}
    </button>`,l=a`<button id="delete-btn" @click=${this._delete}>
      ${I("trash-can")}
    </button>`,o=(u=this.people)!=null&&u.length?a`<datalist id="people-list">
          ${(this.people??[]).map(v=>a`<option value="${v}"></option>`)}
        </datalist>`:m;return a`${e}
      <div class="inputs" @keydown=${this._handleInputKeyDown}>
        ${t} ${s} ${i} ${o}
      </div>
      ${n} ${l}`}updated(){this.scheduleEl=this.shadowRoot.querySelector("#schedule"),this.resourceEl=this.shadowRoot.querySelector("#resource");const e=this.initialFocus==="schedule"?this.scheduleEl:this.resourceEl;e.focus(),e.select(),this._editComplete=!1}isEmpty(){const e=this.resourceEl.value.trim(),t=this.scheduleEl.value.trim();return!e&&!t}_dispatch(e,t={}){const s=this.resourceEl.value.trim(),i=this.scheduleEl.value.trim(),n=this.context;this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{context:n,resource:s,schedule:i,...t}}))}_handleMouseDown(e){e.stopPropagation()}_handleKeyDown(e){e.keyCode==27&&(this._editComplete=!0,this._dispatch("cal-event-edit-cancel"))}_handleInputKeyDown(e){e.keyCode==13&&(e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey?this.shadowRoot.querySelector("#subitem-btn").click():e.shiftKey&&!e.ctrlKey&&!e.altKey&&!e.metaKey?this._commit("prev"):this._commit("next"))}_handleSubitemClick(e){if(this.isEmpty())return this.resourceEl.focus();this._editComplete=!0,this._dispatch("cal-event-edit-add-subitem")}_handleDeleteClick(e){this._editComplete=!0,this._delete()}_delete(e=null){this._editComplete=!0,this._dispatch("cal-event-edit-delete",{next:e})}_commit(e=null){this._editComplete||(this._editComplete=!0,this.isEmpty()?this._delete(e):this._dispatch("cal-event-edit-change",{next:e}))}}b(D,"styles",T`
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
  `),b(D,"properties",{eventindex:{type:Number,attribute:!1,noAccessor:!0},isNew:{type:Boolean},subitem:{type:Boolean},resource:{type:String},schedule:{type:String},people:{type:Array,attribute:!1},initialFocus:{type:String}});customElements.define("cal-event-edit",D);const c=class c extends ${constructor(){super(),this._editState={state:c.STATE_NOT_EDITING,eventInfoIndex:null,initialFocus:null}}willUpdate(e){this.events=this.events??[],this.settings=this.settings??{},this._renderInfo=this._createRenderInfo(this.events,this.settings.options,this._editState,this.readonly)}_createRenderInfo(e,t,s,i){const n=[],l=Object.fromEntries(Object.entries((t==null?void 0:t.people)??{}).map(([r,d])=>[r.toLowerCase(),d])),o=r=>{var d;return((d=l[r])==null?void 0:d.visible)??!0},u=r=>{var d;return(d=l[r])==null?void 0:d.color},v=(r,d,p,h)=>{var y;const g=typeof d.schedule=="object"?d.schedule.join(", "):d.schedule;n.push({type:"event",subitem:r,color:u((y=d.resource)==null?void 0:y.toLowerCase()),resource:d.resource,schedule:g,eventInfoIndex:n.length,eventIndex:p,eventSubitemIndex:h})};if(e.forEach((r,d)=>{var h,g,y;const p=(h=r.subitems)==null?void 0:h.find(w=>{var S;return o((S=w.resource)==null?void 0:S.toLowerCase())});(o((g=r.resource)==null?void 0:g.toLowerCase())||p)&&(v(!1,r,d,null),(y=r.subitems)==null||y.forEach((w,S)=>{v(!0,w,d,S)}))}),s.state==c.STATE_ADD_EVENT)n.push({type:"edit",subitem:!1,resource:"",schedule:"",eventInfoIndex:n.length,eventIndex:this.events.length,eventSubitemIndex:null,editState:s});else if(s.state==c.STATE_ADD_SUBITEM){const r=n[s.eventInfoIndex],d={type:"edit",subitem:!0,resource:"",schedule:"",eventInfoIndex:s.eventInfoIndex+1,eventIndex:r.eventIndex,eventSubitemIndex:r.eventSubitemIndex,editState:s};n.splice(s.eventInfoIndex+1,0,d)}else if(s.state==c.STATE_EDIT_EVENT){const r=n[s.eventInfoIndex];r.type="edit",r.editState=s}const f=!i&&s.state!==c.STATE_ADD_EVENT,k=n.length==0?"expanded":"",x={visible:f,class:k},_=Object.entries((t==null?void 0:t.people)??{}).filter(([r,d])=>d.visible??!0).map(([r,d])=>d.name).sort();return{eventInfos:n,addButton:x,peopleList:_}}render(){const e=this.background&&`background: ${this.background};`,t=this.borderColor&&`border-color: ${this.borderColor};`,{eventInfos:s,addButton:i,peopleList:n}=this._renderInfo,l=t?a`<div class="cal-event-group-border" style="${t}"></div>`:m,o=s.map(({type:f,subitem:k,color:x,resource:_,schedule:r,eventInfoIndex:d,editState:p})=>{if(f==="event"){const h=k?I("caret-right"):m;return a`<div
            class="cal-event-line"
            tabindex="0"
            .index=${d}
            @click=${this._handleEventClick.bind(this,d)}
          >
            ${h}
            <span class="resource" style="color: ${x??m}"
              >${_}</span
            >
            <span class="schedule">${r}</span>
          </div> `}else if(f==="edit")return a`<cal-event-edit
            .context=${p}
            .people=${n}
            ?subitem="${k}"
            resource="${_}"
            schedule="${r}"
            initialFocus="${p.initialFocus||m}"
          ></cal-event-edit>`}),u=i.visible?a`<div
          class="cal-event-add ${i.class}"
          @click=${this._handleAddEventClick}
        >
          <span class="cal-event-plussign">+</span>
        </div>`:m,v=this.readonly&&s.length==0?a`<div class="blank-line"></div>`:m;return a`<div
      class="cal-event-group"
      style="${e||m}"
    >
      ${l} ${o} ${u} ${v}
    </div>`}forceRefresh(){this.requestUpdate()}_commitEventEdit(e,t){e.state===c.STATE_ADD_EVENT?this._addEvent(e,t):e.state===c.STATE_ADD_SUBITEM?this._addSubitem(e,t):e.state===c.STATE_EDIT_EVENT&&this._updateEvent(e,t)}_addEvent(e,{resource:t,schedule:s}){const i=structuredClone(this.events),n=s.split(",").map(o=>o.trim()),l={resource:t,schedule:n,subitems:[]};this.events.push(l),this._dispatch("change",{prevEvents:i})}_addSubitem(e,{resource:t,schedule:s}){const i=structuredClone(this.events),n=this._renderInfo.eventInfos[e.eventInfoIndex],l=this.events[n.eventIndex],o=n.eventSubitemIndex??-1,u=s.split(",").map(f=>f.trim()),v={resource:t,schedule:u,subitems:[]};l.subitems=l.subitems??[],l.subitems.splice(o+1,0,v),this._dispatch("change",{prevEvents:i})}_updateEvent(e,{resource:t,schedule:s}){const i=structuredClone(this.events),n=e.eventInfoIndex,l=this._renderInfo.eventInfos[n],o=l.eventSubitemIndex==null?this.events[l.eventIndex]:this.events[l.eventIndex].subitems[l.eventSubitemIndex],u=s.split(",").map(v=>v.trim());(o.resource!=t||JSON.stringify(o.schedule)!=JSON.stringify(u))&&(o.resource=t,o.schedule=u,this._dispatch("change",{prevEvents:i}))}_deleteEvent(e){var i;const t=structuredClone(this.events),s=this._renderInfo.eventInfos[e.eventInfoIndex];(s==null?void 0:s.eventSubitemIndex)==null?this.events.splice(s.eventIndex,1):(i=this.events[s.eventIndex])==null||i.subitems.splice(s.eventSubitemIndex,1),this._dispatch("change",{prevEvents:t})}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this._handleKeyDown),this.addEventListener("cal-event-edit-change",this._handleEventChange),this.addEventListener("cal-event-edit-delete",this._handleDeleteEvent),this.addEventListener("cal-event-edit-add-subitem",this._handleAddEventSubitem),this.addEventListener("cal-event-edit-cancel",this._handleEventCancel)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this._handleKeyDown),this.removeEventListener("cal-event-edit-change",this._handleEventChange),this.removeEventListener("cal-event-edit-delete",this._handleDeleteEvent),this.removeEventListener("cal-event-edit-add-subitem",this._handleAddEventSubitem),this.removeEventListener("cal-event-edit-cancel",this._handleEventCancel)}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{events:this.events,...t}}))}_handleKeyDown(e){var s,i,n,l;const t=(i=(s=e.composedPath)==null?void 0:s.call(e))==null?void 0:i[0];e.keyCode==13?(n=t==null?void 0:t.classList)!=null&&n.contains("cal-event-line")&&(e.preventDefault(),e.stopPropagation(),t.click()):(e.keyCode==8||e.keyCode==46)&&(l=t==null?void 0:t.classList)!=null&&l.contains("cal-event-line")&&(e.preventDefault(),e.stopPropagation(),t.index>=0&&t.index<this._renderInfo.eventInfos.length&&this._deleteEvent({eventInfoIndex:t.index}))}_handleEventClick(e,t){var s;this.readonly||(this._editState={state:c.STATE_EDIT_EVENT,eventInfoIndex:e,initialFocus:((s=t.target)==null?void 0:s.classList.contains("schedule"))&&"schedule"},this.requestUpdate())}_handleAddEventClick(e){this.readonly||(this._editState={state:c.STATE_ADD_EVENT,eventInfoIndex:this._renderInfo.eventInfos.length},this.requestUpdate())}_handleEventChange(e){const t=e.detail.context;this._commitEventEdit(t,e.detail),this._editState={state:c.STATE_NOT_EDITING},this._handleNext(e),this.requestUpdate()}_handleAddEventSubitem(e){const t=e.detail.context;let s=t.eventInfoIndex;t.state===c.STATE_ADD_EVENT?this._addEvent(t,e.detail):t.state===c.STATE_ADD_SUBITEM?(this._addSubitem(t,e.detail),s++):t.state===c.STATE_EDIT_EVENT&&this._updateEvent(t,e.detail),this._editState={state:c.STATE_ADD_SUBITEM,eventInfoIndex:s},this.requestUpdate()}_handleDeleteEvent(e){var s,i;const t=e.detail.context;t.state===c.STATE_EDIT_EVENT?this._deleteEvent(t):t.state==c.STATE_ADD_EVENT&&((i=(s=this._renderInfo)==null?void 0:s.eventInfos)==null||i.splice(this._renderInfo.length-1,1)),this._editState={state:c.STATE_NOT_EDITING},this._handleNext(e),this.requestUpdate()}_handleEventCancel(e){var s,i;this._editState={state:c.STATE_NOT_EDITING},this.requestUpdate();const t=(i=(s=e.detail)==null?void 0:s.context)==null?void 0:i.eventInfoIndex;t>=0&&setTimeout(()=>{const n=this.shadowRoot.querySelectorAll(".cal-event-line"),l=Math.min(n.length-1,t),o=n[l];o&&o.focus()})}_handleNext(e){var i,n,l,o;const t=(i=e==null?void 0:e.detail)==null?void 0:i.context,s=(n=e==null?void 0:e.detail)==null?void 0:n.next;t&&s&&(s=="next"?t.eventInfoIndex+1<((o=(l=this._renderInfo)==null?void 0:l.eventInfos)==null?void 0:o.length)?this._handleEventClick(t.eventInfoIndex+1,e):this._handleAddEventClick(e):s=="prev"&&(t.eventInfoIndex>0?t.state===c.STATE_ADD_SUBITEM?this._handleEventClick(t.eventInfoIndex,e):this._handleEventClick(t.eventInfoIndex-1,e):t.eventInfoIndex==0&&this._handleEventClick(0,e)))}};b(c,"styles",T`
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
      width: 1.4em;
      text-align: center;
      color: var(--dark-gray-text);
      cursor: default;
      float: right;
      border-radius: 6px;
      margin-top: -1.5em;

      /* Highlight plus sign when directly hovered over */
      &:hover {
        background: var(--selected-color);
      }
    }
    .expanded .cal-event-plussign {
      /* When add line is "expanded", don't use negative margin-top to collapse plus sign into previous row */
      margin-top: 0px;
    }
    .cal-event-group:hover .cal-event-plussign {
      /* Show plus sign only when mouse is in this event group */
      display: block;
    }
    .blank-line {
      min-height: 1.5em;
    }

    span.schedule {
      color: var(--gray-text);
      font-size: 0.72em;
    }
  `),b(c,"properties",{borderColor:{type:String},background:{type:String},events:{type:Object,attribute:!1},settings:{type:Object,attribute:!1},readonly:{type:Boolean}}),b(c,"STATE_NOT_EDITING",0),b(c,"STATE_ADD_EVENT",1),b(c,"STATE_ADD_SUBITEM",2),b(c,"STATE_EDIT_EVENT",3);let A=c;customElements.define("cal-event-group",A);class L extends ${constructor(){super(),this.data=this.data??{cals:{}},this.settings=this.settings??{cals:{}}}willUpdate(e){var s;if(!this.data||!this.settings)return;(((s=this.settings.options)==null?void 0:s.calOrder)??[]).forEach(i=>{this.data.cals[i]=this.data.cals[i]||{id:i,events:[]}}),this._renderInfo=this._createRenderInfo(this.data,this.alerts,this.settings)}_createRenderInfo(e,t,s){var d;const{cals:i}=e,{cals:n,options:l}=s,o=((d=l==null?void 0:l.calOrder)==null?void 0:d.map(p=>{var h;return((h=n[p])==null?void 0:h.visible)&&i[p]}))??[],u=o.filter(p=>{var h;return p&&((h=n[p.id])==null?void 0:h.type)!=="call"}),v={type:"divider"},f=o.filter(p=>{var h;return p&&((h=n[p.id])==null?void 0:h.type)==="call"}),k=[...u,v,...f].map(({type:p,id:h,events:g})=>{var y,w;return{type:p??"event",color:(y=n[h])==null?void 0:y.color,background:(w=n[h])==null?void 0:w.background,events:g??[]}}),x=["info","warn","danger"];let _="",r=null;if((t==null?void 0:t.length)>0){const p=t.map(g=>x.indexOf(g.type)),h=Math.max(...p);_=x[h]?`alert-${x[h]}`:"",r=t.map(g=>g.text)}return{cals:k,alertTexts:r,alertClass:_}}render(){const{cals:e,alertText:t,alertClass:s}=this._renderInfo;if(!e)return;const i=a`
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
    `,n=e.map(({type:o,color:u,background:v,events:f})=>o=="divider"?a`<div style="flex-grow:1"></div>`:a`<cal-event-group
          borderColor="${u}"
          background="${v}"
          ?readonly=${this.readonly}
          .events=${f}
          .settings=${this.settings}
        ></cal-event-group>`),l=this.dim?"dim":"";return a`<div class="day ${s} ${l}">
      ${i} ${n}
    </div>`}forceRefresh(){this.requestUpdate(),this.shadowRoot.querySelectorAll("cal-event-group").forEach(e=>e.forceRefresh())}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseup",this.handleMouseUp),this.addEventListener("change",this.handleEventGroupChange)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseup",this.handleMouseUp),this.removeEventListener("change",this.handleEventGroupChange)}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{index:this.index,...t}}))}handleMouseDown(e){setTimeout(()=>this._dispatch("cal-day-mousedown",{mouseDownEvent:e}),0)}handleMouseOver(e){this._dispatch("cal-day-mouseover")}handleMouseUp(e){setTimeout(()=>this._dispatch("cal-day-mouseup"),0)}handleEventGroupChange(e){const t=structuredClone(this.data),{events:s,prevEvents:i}=e.detail;s&&i&&Object.entries(this.data.cals||{}).forEach(([n,l])=>{(l==null?void 0:l.events)==s&&(t.cals[n].events=i)}),e.stopPropagation(),this._dispatch("cal-day-change",{data:this.data,prevData:t})}handleNoteKeydown(e){(e.keyCode==27&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey||e.keyCode==13&&(e.ctrlKey||!e.ctrlKey)&&!e.metaKey&&!e.shiftKey&&!e.altKey)&&(e.preventDefault(),e.stopPropagation(),e.target.blur())}handleNoteBlur(e){const t=this.shadowRoot.querySelector(".cal-note").innerText;if(this.data.note&&!t||this.data.note!=t){const s=structuredClone(this.data);t?this.data.note=t:delete this.data.note,this._dispatch("cal-day-change",{data:this.data,prevData:s})}e.preventDefault(),e.stopPropagation()}}b(L,"styles",T`
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
  `),b(L,"properties",{day:{type:String},note:{type:String},noteStyle:{type:String},readonly:{type:Boolean},selected:{type:Boolean},dim:{type:Boolean},data:{type:Object,attribute:!1},alerts:{type:Object,attribute:!1},settings:{type:Object,attribute:!1}});customElements.define("cal-day",L);const V=0,j=1,F=2,C=class C extends ${constructor(){super(),this.focusOnUpdate=!1}render(){const e=this.checked==j,t=this.checked==F,s=this.type=="confirm"?this.type:"",i=this.showHandle?a`<div class="handle">${I("grip-vertical")}</div>`:m,n=this.hideCheckbox?m:a`<input type="checkbox" id="check" .checked=${e} .indeterminate=${t} @change=${this._handleCheckChange}></input>`,l=a`<div
      id="label"
      ?contenteditable=${this.editable}
      @keydown=${this._handleKeyDown}
      @click=${this._handleLabelClick}
      @focus=${this._handleItemFocus}
      @blur=${this._handleItemBlur}
      .innerText=${K(this.label??"")}
    ></div>`,o=this.hideColor?m:this.renderColorSelector(this.color),u=this.showDelete?a`<div class="deleteBtn" @click=${this._handleDeleteClick}>
          ${I("xmark")}
        </div>`:null,f=((this.type=="confirm"?a`<button class="confirmBtn" @click=${this._handleDeleteClick}>
            Delete
          </button>`:null)||u)??m;return a`<div
      class="item ${s}"
      style="${this.itemStyle||m}"
      @click=${this._handleItemClick}
    >
      ${n} ${o} ${l} ${f} ${i}
    </div> `}renderColorSelector(e){return e=e??C.DEFAULT_COLOR,a`<div class="color-selector" @click=${this._handleColorSelectClick}>
      <span style="background-color: ${e}">
        <input type="color" id="color" value="${e}" @input=${this._handleColorChange}></input>
      </span>
    </div>`}updated(){this.checkInputEl=this.shadowRoot.querySelector("#check"),this.labelEl=this.shadowRoot.querySelector("#label"),this.colorInputEl=this.shadowRoot.querySelector("#color"),this.focusOnUpdate&&(this.labelEl.focus(),this.focusOnUpdate=!1)}_dispatch(e,t={}){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{context:this.context,...t}}))}_handleCheckChange(e){this._dispatch("item-checked",{checked:this.checkInputEl.checked})}_handleKeyDown(e){(e.keyCode==13||e.keyCode==27)&&(e.preventDefault(),this.labelEl.blur())}_commit(){this._dispatch("item-change",{label:this.labelEl.textContent.trim()})}_handleItemClick(e){this._dispatch("item-click")}_handleItemBlur(e){this._commit(),this._dispatch("item-blur")}_handleItemFocus(e){this._dispatch("item-focus")}_handleLabelClick(e){!this.editable&&!this.hideCheckbox&&(this.checkInputEl.checked=!this.checkInputEl.checked,this._handleCheckChange())}_handleColorSelectClick(e){e.preventDefault(),this.colorInputEl.showPicker()}_handleColorChange(e){this.color=this.colorInputEl.value.toLowerCase(),(this.color=="black"||this.color=="#000000"||this.color=="white"||this.color=="#ffffff")&&(this.color=null),this._dispatch("item-color-change",{color:this.color})}_handleDeleteClick(e){e.preventDefault(),e.stopPropagation(),this._dispatch("item-click"),this._dispatch("item-delete-click")}};b(C,"DEFAULT_COLOR","inherit"),b(C,"properties",{type:{type:String},label:{type:String},editable:{type:Boolean},selected:{type:Boolean},showHandle:{type:Boolean},showDelete:{type:Boolean},hideCheckbox:{type:Boolean},checked:{type:Number},hideColor:{type:Boolean},color:{type:String},itemStyle:{type:String}}),b(C,"styles",T`
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
  `);let B=C;customElements.define("cal-checklist-item",B);class N extends ${constructor(){super(),this.items=[],this.selected=-1,this.deleteIdx=-1}willUpdate(e){this.items==this.items,this._renderInfo=this._createRenderInfo(this.items,this.selected,this.deleteIdx),this.items.forEach(t=>delete t.editing)}_createRenderInfo(e,t,s){const i=[];return e.forEach(({id:n,label:l,color:o,checked:u,editing:v},f)=>{i.push({type:"item",id:n,label:l,color:o,checked:u,editing:v,selected:t==f,context:{index:f}})}),s>=0&&s<e.length&&i.splice(s+1,0,{type:"confirm",label:this.deleteWarning,context:{index:s,confirmed:!0}}),{itemInfos:i}}render(){if(!this._renderInfo)return m;const e=this._renderInfo.itemInfos.map((s,i)=>a`<cal-checklist-item
        type=${s.type}
        label=${s.label}
        color=${s.color}
        checked=${s.checked}
        itemStyle=${this.itemStyle??m}
        ?selected=${this.selectable&&s.selected}
        ?showHandle=${this.moveable}
        ?editable=${this.editable}
        ?showDelete=${this.addable}
        ?hideCheckbox=${!this.checkable}
        ?hideColor=${!this.colorable}
        .focusOnUpdate=${s.editing}
        .context=${s.context}
      ></cal-checklist-item>`),t=this.addable?a`<div class="cal-checklist-add" @click=${this._handleAddItemClick}>
          <span class="cal-checklist-plussign">${I("plus")}</span>
          <span>Add</span>
        </div>`:m;return a`<div>${e} ${t}</div>`}connectedCallback(){super.connectedCallback(),this.addEventListener("item-click",this._handleItemClick),this.addEventListener("item-focus",this._handleItemClick),this.addEventListener("item-blur",this._handleItemBlur),this.addEventListener("item-checked",this._handleItemChecked),this.addEventListener("item-change",this._handleItemChange),this.addEventListener("item-color-change",this._handleItemColorChange),this.addEventListener("item-delete-click",this._handleItemDeleteClick)}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleItemClick(e){const{index:t}=e.detail.context;this.deleteIdx=-1,this.selectable&&(this.selected=t,this._dispatch("select",{item:this.items[t],index:t})),this.requestUpdate()}_handleItemBlur(e){this.selected=-1,this.deleteIdx=-1,this.selectable&&this._dispatch("select",{item:null,index:-1}),this.requestUpdate()}_handleItemChecked(e){const{index:t}=e.detail.context,s=e.detail.checked;this.items[t].checked=s,this._dispatch("checked",{item:this.items[t],index:t,checked:s})}_handleItemChange(e){const{index:t}=e.detail.context,s=e.detail.label;this.items[t].label=s,this._dispatch("change",{item:this.items[t],index:t,label:s}),this.requestUpdate()}_handleItemColorChange(e){const{index:t}=e.detail.context,s=e.detail.color;this.items[t].color=s,this._dispatch("color-change",{item:this.items[t],index:t,color:s})}_handleItemDeleteClick(e){let{index:t,confirmed:s}=e.detail.context;if(s=s||this.deleteWarning==null,s){const i=this.items[t];this.items.splice(t,1),this._dispatch("delete-item",{item:i,index:t})}else this.deleteIdx=t;this.requestUpdate()}_handleAddItemClick(e){const t={label:"",checked:V,color:null,editing:!0};this.default&&Object.assign(t,this.default),this.items.push(t),this.selected=this.items.length-1,this.deleteIdx=-1}}b(N,"properties",{items:{type:Array,attribute:!1},itemStyle:{type:String},selected:{type:Number},default:{type:Object,attribute:!1},deleteWarning:{type:String},checkable:{type:Boolean},colorable:{type:Boolean},addable:{type:Boolean},editable:{type:Boolean},selectable:{type:Boolean},moveable:{type:Boolean}}),b(N,"styles",T`
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
  `);customElements.define("cal-checklist",N);class J{constructor(e,t){this.currentPage=e;const s=new URLSearchParams(t);this.accessCode=s.get("c"),this.deptId=s.get("d"),this.user=null,this.auth=this._beginAuth(),this.auth.redirect="#"}async _beginAuth(){var e;if(this.user=await M(!0),this.user&&this.deptId&&await q(this.deptId))return{user:this.user,deptId:this.deptId};if(this.accessCode){const t=await R(this.accessCode);if(t.user&&t.deptId!=null)return this.user=t.user,this.deptId=t.deptId,t;throw this.auth.redirect="./login.html",new Error("Invalid access code, redirect")}if(this.user){const t=await P();throw((e=t.data)==null?void 0:e.length)>0?(this.auth.redirect=`./${this.currentPage}?d=${t.data[0].id}`,new Error("Invalid department, redirect")):(this.auth.redirect="./dept.html",new Error("No departments, redirect"))}throw this.auth.redirect="./login.html",new Error("User not authenticated, redirect")}}export{J as A,j as C,F as I,V as U};
