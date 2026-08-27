var H=Object.defineProperty;var F=(l,e,t)=>e in l?H(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var b=(l,e,t)=>F(l,typeof e!="symbol"?e+"":e,t);import{s as D,i as L,x as v,G as C,T as g,a as U,w as O}from"./db-D5gLqEhL.js";class R extends D{connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this._handleMouseDown),this.addEventListener("keydown",this._handleKeyDown),this.addEventListener("blur",this._commit)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("mousedown",this._handleMouseDown),this.removeEventListener("keydown",this._handleKeyDown),this.removeEventListener("blur",this._commit)}render(){var u;const e=this.subitem?v`<div class="indicator">${C("caret-right")}</div>`:g,t=v`<input type="text" id="resource" size="1" placeholder="Name" list="people-list" value="${this.resource}"></input>`,s=v`<div class="divider"></div>`,i=v`<input type="text" id="schedule" size="1" placeholder="Shift" value="${this.schedule}"></input>`,o=v`<button
      id="subitem-btn"
      @click=${this._handleSubitemClick}
    >
      ${C("subitem")}
    </button>`,n=v`<button id="delete-btn" @click=${this._delete}>
      ${C("trash-can")}
    </button>`,a=(u=this.people)!=null&&u.length?v`<datalist id="people-list">
          ${(this.people??[]).map(p=>v`<option value="${p}"></option>`)}
        </datalist>`:g;return v` <div class="inputs" @keydown=${this._handleInputKeyDown}>
        ${e} ${t} ${s} ${i}
        ${a}
      </div>
      <div class="actions">
        <div class="hfill"></div>
        ${o} ${n}
      </div>`}updated(){this.scheduleEl=this.shadowRoot.querySelector("#schedule"),this.resourceEl=this.shadowRoot.querySelector("#resource");const e=this.initialFocus==="schedule"?this.scheduleEl:this.resourceEl;e.focus(),e.select(),this._editComplete=!1}isEmpty(){const e=this.resourceEl.value.trim(),t=this.scheduleEl.value.trim();return!e&&!t}_dispatch(e,t={}){const s=this.resourceEl.value.trim(),i=this.scheduleEl.value.trim(),o=this.context;this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{context:o,resource:s,schedule:i,...t}}))}_handleMouseDown(e){e.stopPropagation()}_handleKeyDown(e){e.keyCode==27&&(this._editComplete=!0,this._dispatch("cal-event-edit-cancel"))}_handleInputKeyDown(e){e.keyCode==13&&(e.ctrlKey&&!e.shiftKey&&!e.altKey&&!e.metaKey?this.shadowRoot.querySelector("#subitem-btn").click():e.shiftKey&&!e.ctrlKey&&!e.altKey&&!e.metaKey?this._commit("prev"):this._commit("next"))}_handleSubitemClick(e){if(this.isEmpty())return this.resourceEl.focus();this._editComplete=!0,this._dispatch("cal-event-edit-add-subitem")}_handleDeleteClick(e){this._editComplete=!0,this._delete()}_delete(e=null){this._editComplete=!0,this._dispatch("cal-event-edit-delete",{next:e})}_commit(e=null){this._editComplete||(this._editComplete=!0,this.isEmpty()?this._delete(e):this._dispatch("cal-event-edit-change",{next:e}))}}b(R,"styles",L`
    :host {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
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
    .actions {
      display: flex;
      margin-top: -1px;
      .hfill {
        flex-grow: 1;
      }
      #subitem-btn {
        border-bottom-left-radius: 0.35em;
      }
      #delete-btn {
        border-bottom-right-radius: 0.35em;
      }
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
  `),b(R,"properties",{eventindex:{type:Number,attribute:!1,noAccessor:!0},isNew:{type:Boolean},subitem:{type:Boolean},resource:{type:String},schedule:{type:String},people:{type:Array,attribute:!1},initialFocus:{type:String}});customElements.define("cal-event-edit",R);const h=class h extends D{constructor(){super(),this._editState={state:h.STATE_NOT_EDITING,eventInfoIndex:null,initialFocus:null}}willUpdate(e){this.events=this.events??[],this.settings=this.settings??{};const t=["white","black","#ffffff","#000000"];this.borderColor=t.includes(this.borderColor)?null:this.borderColor,this.background=t.includes(this.background)?null:this.background,this._renderInfo=this._createRenderInfo(this.events,this.alerts,this.settings.options,this._editState,this.readonly,this.showAll)}_createRenderInfo(e,t,s,i,o,n){const a=[],u=(s==null?void 0:s.people)??{},p=r=>{var c;return n||(((c=u[r])==null?void 0:c.visible)??!0)},f=r=>{var c;return n?null:(c=u[r])==null?void 0:c.color},E=(r,c,x)=>{var I;const y=(I=x==null?void 0:x.find(T=>T.eventIdx==r))==null?void 0:I.type;return y?`alert-${y}`:""},k=(r,c,x,y)=>{var T;const I=typeof c.schedule=="object"?c.schedule.join(", "):c.schedule;a.push({type:"event",subitem:r,color:f((T=c.resource)==null?void 0:T.toLowerCase()),alertClass:E(x,y,t),resource:c.resource,schedule:I,eventInfoIndex:a.length,eventIndex:x,eventSubitemIndex:y})};if(e.forEach((r,c)=>{var y,I,T;const x=(y=r.subitems)==null?void 0:y.find(B=>{var N;return p((N=B.resource)==null?void 0:N.toLowerCase())});(p((I=r.resource)==null?void 0:I.toLowerCase())||x)&&(k(!1,r,c,null),(T=r.subitems)==null||T.forEach((B,N)=>{var V;p((V=B.resource)==null?void 0:V.toLowerCase())&&k(!0,B,c,N)}))}),i.state==h.STATE_ADD_EVENT)a.push({type:"edit",subitem:!1,resource:"",schedule:"",eventInfoIndex:a.length,eventIndex:this.events.length,eventSubitemIndex:null,editState:i});else if(i.state==h.STATE_ADD_SUBITEM){const r=a[i.eventInfoIndex],c={type:"edit",subitem:!0,resource:"",schedule:"",eventInfoIndex:i.eventInfoIndex+1,eventIndex:r.eventIndex,eventSubitemIndex:r.eventSubitemIndex,editState:i};a.splice(i.eventInfoIndex+1,0,c)}else if(i.state==h.STATE_EDIT_EVENT){const r=a[i.eventInfoIndex];r.type="edit",r.editState=i}const w=!o&&i.state!==h.STATE_ADD_EVENT,m=a.length==0?"expanded":"",_={visible:w,class:m},d=Object.entries((s==null?void 0:s.people)??{}).filter(([r,c])=>n||(c.visible??!0)).map(([r,c])=>c.name).sort();return{eventInfos:a,addButton:_,peopleList:d}}render(){const e=this.background&&`background: ${this.background};`,t=this.borderColor&&`border-color: ${this.borderColor};`,{eventInfos:s,addButton:i,peopleList:o}=this._renderInfo,n=t?v`<div class="cal-event-group-border" style="${t}"></div>`:g,a=s.map(({type:f,subitem:E,color:k,alertClass:w,resource:m,schedule:_,eventInfoIndex:d,editState:r})=>{if(f==="event"){const c=E?C("caret-right"):g;return v`<div
            class="cal-event-line ${w}"
            tabindex="0"
            draggable="true"
            .index=${d}
            @click=${this._handleEventClick.bind(this,d)}
            @dragstart=${this._handleDragStart.bind(this,d)}
          >
            ${c}
            <span class="resource" style="color: ${k??g}"
              >${m}</span
            >
            <span class="schedule">${_}</span>
          </div> `}else if(f==="edit")return v`<cal-event-edit
            .context=${r}
            .people=${o}
            ?subitem="${E}"
            resource="${m}"
            schedule="${_}"
            initialFocus="${r.initialFocus||g}"
          ></cal-event-edit>`}),u=i.visible?v`<div
          class="cal-event-add ${i.class}"
          @click=${this._handleAddEventClick}
        >
          <span class="cal-event-plussign">+</span>
        </div>`:g,p=this.readonly&&s.length==0?v`<div class="blank-line"></div>`:g;return v`<div
      class="cal-event-group"
      style="${e||g}"
    >
      ${n} ${a} ${u} ${p}
    </div>`}forceRefresh(){this.requestUpdate()}_normalizeResource(e){var i,o,n;const t=e==null?void 0:e.toLowerCase();return((n=(o=(i=this.settings)==null?void 0:i.options)==null?void 0:o.people[t])==null?void 0:n.name)??e}_resourceVisible(e){var s,i,o;const t=((i=(s=this.settings)==null?void 0:s.options)==null?void 0:i.people)??{};return e=e==null?void 0:e.toLowerCase(),this.showAll||(((o=t[e])==null?void 0:o.visible)??!0)}_commitEventEdit(e,t){e.state===h.STATE_ADD_EVENT?this._addEvent(e,t):e.state===h.STATE_ADD_SUBITEM?this._addSubitem(e,t):e.state===h.STATE_EDIT_EVENT&&this._updateEvent(e,t)}_addEvent(e,{resource:t,schedule:s}){const i=structuredClone(this.events);t=this._normalizeResource(t);const o=s.split(",").map(a=>U(a)),n={resource:t,schedule:o,subitems:[]};this.events.push(n),this._dispatch("change",{prevEvents:i})}_addSubitem(e,{resource:t,schedule:s}){const i=structuredClone(this.events),o=this._renderInfo.eventInfos[e.eventInfoIndex],n=this.events[o.eventIndex],a=o.eventSubitemIndex??-1;t=this._normalizeResource(t);const u=s.split(",").map(f=>U(f)),p={resource:t,schedule:u,subitems:[]};n.subitems=n.subitems??[],n.subitems.splice(a+1,0,p),this._dispatch("change",{prevEvents:i})}_updateEvent(e,{resource:t,schedule:s}){const i=structuredClone(this.events),o=e.eventInfoIndex,n=this._renderInfo.eventInfos[o],a=n.eventSubitemIndex==null?this.events[n.eventIndex]:this.events[n.eventIndex].subitems[n.eventSubitemIndex],u=s.split(",").map(p=>U(p));(a.resource!=t||JSON.stringify(a.schedule)!=JSON.stringify(u))&&(a.resource=this._normalizeResource(t),a.schedule=u,this._dispatch("change",{prevEvents:i}))}_deleteEvent(e){var i;const t=structuredClone(this.events),s=this._renderInfo.eventInfos[e.eventInfoIndex];(s==null?void 0:s.eventSubitemIndex)==null?this.events.splice(s.eventIndex,1):(i=this.events[s.eventIndex])==null||i.subitems.splice(s.eventSubitemIndex,1),this._dispatch("change",{prevEvents:t})}connectedCallback(){super.connectedCallback(),this.addEventListener("keydown",this._handleKeyDown),this.addEventListener("cal-event-edit-change",this._handleEventChange),this.addEventListener("cal-event-edit-delete",this._handleDeleteEvent),this.addEventListener("cal-event-edit-add-subitem",this._handleAddEventSubitem),this.addEventListener("cal-event-edit-cancel",this._handleEventCancel),this.addEventListener("dragover",this._handleDragOver.bind(this)),this.addEventListener("dragleave",this._handleDragLeave.bind(this)),this.addEventListener("drop",this._handleDrop.bind(this))}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("keydown",this._handleKeyDown),this.removeEventListener("cal-event-edit-change",this._handleEventChange),this.removeEventListener("cal-event-edit-delete",this._handleDeleteEvent),this.removeEventListener("cal-event-edit-add-subitem",this._handleAddEventSubitem),this.removeEventListener("cal-event-edit-cancel",this._handleEventCancel)}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{events:this.events,...t}}))}_handleKeyDown(e){var s,i,o,n;const t=(i=(s=e.composedPath)==null?void 0:s.call(e))==null?void 0:i[0];e.keyCode==13?(o=t==null?void 0:t.classList)!=null&&o.contains("cal-event-line")&&(e.preventDefault(),e.stopPropagation(),t.click()):(e.keyCode==8||e.keyCode==46)&&(n=t==null?void 0:t.classList)!=null&&n.contains("cal-event-line")&&(e.preventDefault(),e.stopPropagation(),t.index>=0&&t.index<this._renderInfo.eventInfos.length&&this._deleteEvent({eventInfoIndex:t.index}))}_handleEventClick(e,t){var s;this.readonly||(this._editState={state:h.STATE_EDIT_EVENT,eventInfoIndex:e,initialFocus:((s=t.target)==null?void 0:s.classList.contains("schedule"))&&"schedule"},this.requestUpdate())}_handleAddEventClick(e){this.readonly||(this._editState={state:h.STATE_ADD_EVENT,eventInfoIndex:this._renderInfo.eventInfos.length},this.requestUpdate())}_handleEventChange(e){const t=e.detail.context;this._commitEventEdit(t,e.detail),this._editState={state:h.STATE_NOT_EDITING},this._resourceVisible(e.detail.resource)?this._handleNext(e):this._dispatch("request-show-resource",{resource:e.detail.resource}),this.requestUpdate()}_handleAddEventSubitem(e){const t=e.detail.context;let s=t.eventInfoIndex;t.state===h.STATE_ADD_EVENT?this._addEvent(t,e.detail):t.state===h.STATE_ADD_SUBITEM?(this._addSubitem(t,e.detail),s++):t.state===h.STATE_EDIT_EVENT&&this._updateEvent(t,e.detail),this._editState={state:h.STATE_ADD_SUBITEM,eventInfoIndex:s},this.requestUpdate()}_handleDeleteEvent(e){var s,i;const t=e.detail.context;t.state===h.STATE_EDIT_EVENT?this._deleteEvent(t):t.state==h.STATE_ADD_EVENT&&((i=(s=this._renderInfo)==null?void 0:s.eventInfos)==null||i.splice(this._renderInfo.length-1,1)),this._editState={state:h.STATE_NOT_EDITING},this._handleNext(e),this.requestUpdate()}_handleEventCancel(e){var s,i;this._editState={state:h.STATE_NOT_EDITING},this.requestUpdate();const t=(i=(s=e.detail)==null?void 0:s.context)==null?void 0:i.eventInfoIndex;t>=0&&setTimeout(()=>{const o=this.shadowRoot.querySelectorAll(".cal-event-line"),n=Math.min(o.length-1,t),a=o[n];a&&a.focus()})}_handleNext(e){var i,o,n,a;const t=(i=e==null?void 0:e.detail)==null?void 0:i.context,s=(o=e==null?void 0:e.detail)==null?void 0:o.next;t&&s&&(s=="next"?t.eventInfoIndex+1<((a=(n=this._renderInfo)==null?void 0:n.eventInfos)==null?void 0:a.length)?this._handleEventClick(t.eventInfoIndex+1,e):this._handleAddEventClick(e):s=="prev"&&(t.eventInfoIndex>0?t.state===h.STATE_ADD_SUBITEM?this._handleEventClick(t.eventInfoIndex,e):this._handleEventClick(t.eventInfoIndex-1,e):t.eventInfoIndex==0&&this._handleEventClick(0,e)))}_handleDragStart(e,t){!this.readonly&&e>=0&&(t.dataTransfer.setData("text/json",JSON.stringify(this._renderInfo.eventInfos[e])),t.dataTransfer.effectAllowed="copyMove",h._dragged=this)}_handleDragOver(e){this.readonly||(e.preventDefault(),e.dataTransfer.dropEffect=e.ctrlKey||e.metaKey||e.shiftKey?"copy":"move",this.shadowRoot.querySelector(".cal-event-group").classList.add("drag-over"))}_handleDragLeave(e){this.readonly||this.shadowRoot.querySelector(".cal-event-group").classList.remove("drag-over")}_handleDrop(e){if(!this.readonly){const t=h._dragged;if(h._dragged=null,this.shadowRoot.querySelector(".cal-event-group").classList.remove("drag-over"),t!==this){let s=null;try{s=JSON.parse(e.dataTransfer.getData("text/json"))}catch{}(s!=null&&s.resource||s!=null&&s.schedule)&&(this._addEvent(null,{resource:s.resource,schedule:s.schedule}),!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&t._deleteEvent({eventInfoIndex:s.eventInfoIndex}),this.requestUpdate(),t.requestUpdate())}this._dispatch("mouseup",{})}}};b(h,"styles",L`
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
    .cal-event-line {
      /* Prevent text selection on touch */
      touch-action: manipulation;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-touch-callout: none;
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
  `),b(h,"properties",{borderColor:{type:String},background:{type:String},events:{type:Object,attribute:!1},alerts:{type:Object,attribute:!1},settings:{type:Object,attribute:!1},readonly:{type:Boolean},showAll:{type:Boolean}}),b(h,"STATE_NOT_EDITING",0),b(h,"STATE_ADD_EVENT",1),b(h,"STATE_ADD_SUBITEM",2),b(h,"STATE_EDIT_EVENT",3),b(h,"_dragged",null);let K=h;customElements.define("cal-event-group",K);let A=null;function j(){if(!A){const l=document.querySelector("mobile-flyout");l?A=l:(A=document.createElement("mobile-flyout"),document.body.appendChild(A))}return A}class M extends D{constructor(){super(),this.visible=!1,this.x=0,this.y=0,this.title="",this.content=""}render(){return v`
            <div class="flyout-title">${this.title}</div>
            <div class="flyout-content" .innerHTML="${this.content}"></div>
        `}updated(e){e.has("visible")&&this.visible&&this._position()}show({x:e,y:t,title:s,content:i}){this.x=e,this.y=t,this.title=s,this.content=i,this.visible=!0}hide(){this.visible=!1}_position(){const e=this.getBoundingClientRect(),t=window.innerWidth,s=window.innerHeight;let i=this.x-e.width/2,o=this.y-e.height-20;i<10?i=10:i+e.width>t-10&&(i=t-e.width-10),o<10&&(o=this.y+20),o+e.height>s-10&&(o=s-e.height-10),this.style.left=`${i}px`,this.style.top=`${o}px`}}b(M,"styles",L`
    :host {
      position: fixed;
      background: rgba(0, 0, 0, 0.9);
      color: white;
      padding: 8px 12px;
      border-radius: 6px;
      font-size: 14px;
      max-width: 320px;
      max-height: 400px;
      overflow-y: auto;
      z-index: 10000;
      pointer-events: none;
      opacity: 0;
      transform: scale(0.8);
      transition: opacity 0.2s ease, transform 0.2s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      display: none;
    }

    :host([visible]) {
      opacity: 1;
      transform: scale(1);
      display: block;
    }

    .flyout-title {
      font-weight: bold;
      margin-bottom: 4px;
      font-size: 15px;
    }

    .flyout-content {
      line-height: 1.3;
    }
  `),b(M,"properties",{visible:{type:Boolean,reflect:!0},x:{type:Number},y:{type:Number},title:{type:String},content:{type:String}});customElements.define("mobile-flyout",M);function W(l,e={}){const t=e.threshold||500,s=e.moveTolerance||10,i=e.onLongPress,o=e.onTouchEnd;let n=0,a=0,u=null,p=!1;function f(d){if(d.touches.length!==1)return;const r=d.touches[0];n=r.clientX,a=r.clientY,p=!1,l.classList.add("long-press-detecting"),u=setTimeout(()=>{p=!0,i&&i({x:n,y:a,originalEvent:d})},t),setTimeout(()=>{l.classList.remove("long-press-detecting")},t+10)}function E(d){if(!u)return;const r=d.touches[0],c=Math.abs(r.clientX-n),x=Math.abs(r.clientY-a);if(c>s||x>s){m();return}}function k(d){o&&o({isLongPress:p,originalEvent:d}),m()}function w(d){m()}function m(){u&&(clearTimeout(u),u=null),l.classList.remove("long-press-detecting")}function _(){m(),l.removeEventListener("touchstart",f),l.removeEventListener("touchmove",E),l.removeEventListener("touchend",k),l.removeEventListener("touchcancel",w)}return l.addEventListener("touchstart",f,{passive:!0}),l.addEventListener("touchmove",E,{passive:!1}),l.addEventListener("touchend",k,{passive:!0}),l.addEventListener("touchcancel",w,{passive:!0}),{removeListeners:_}}class P extends D{constructor(){super(),this.data=this.data??{cals:{}},this.settings=this.settings??{cals:{}},this.longPressListeners=null}willUpdate(e){var s;if(!this.data||!this.settings)return;(((s=this.settings.options)==null?void 0:s.calOrder)??[]).forEach(i=>{this.data.cals[i]=this.data.cals[i]||{id:i,events:[]}}),this._renderInfo=this._createRenderInfo(this.data,this.alerts,this.settings,this.showAll)}_createRenderInfo(e,t,s,i){var _;const{cals:o}=e,{cals:n,options:a}=s,u=((_=a==null?void 0:a.calOrder)==null?void 0:_.map(d=>{var r,c;return(i||((r=n[d])==null?void 0:r.visible))&&!((c=n[d])!=null&&c.archived)&&o[d]}))??[],p=u.filter(d=>{var r;return d&&((r=n[d.id])==null?void 0:r.type)!=="call"}),f={type:"divider"},E=u.filter(d=>{var r;return d&&((r=n[d.id])==null?void 0:r.type)==="call"}),k=[...p,f,...E].map(({type:d,id:r,events:c})=>{var x,y;return{type:d??"event",color:(x=n[r])==null?void 0:x.color,background:(y=n[r])==null?void 0:y.background,events:c??[],alerts:t==null?void 0:t.filter(I=>I.calId==r&&I.eventIdx>=0)}});let w="",m=null;if((t==null?void 0:t.length)>0){const d=["info","warn","danger"],c=t.filter(y=>!(y.eventIdx>=0)).map(y=>d.indexOf(y.type)),x=Math.max(...c);w=d[x]?`alert-${d[x]}`:"",m=t.map(y=>y.text)}return{cals:k,alertTexts:m,alertClass:w}}render(){const{cals:e,alertText:t,alertClass:s}=this._renderInfo;if(!e)return;const i=v`
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
    `,o=e.map(({type:a,color:u,background:p,events:f,alerts:E})=>a=="divider"?v`<div style="flex-grow:1"></div>`:v`<cal-event-group
            borderColor="${u}"
            background="${p}"
            ?readonly=${this.readonly}
            ?showAll=${this.showAll}
            .events=${f}
            .alerts=${E}
            .settings=${this.settings}
          ></cal-event-group>`),n=this.dim?"dim":"";return v`<div class="day ${s} ${n}">
      ${i} ${o}
    </div>`}forceRefresh(){this.requestUpdate(),this.shadowRoot.querySelectorAll("cal-event-group").forEach(e=>e.forceRefresh())}connectedCallback(){super.connectedCallback(),this.addEventListener("mousedown",this.handleMouseDown),this.addEventListener("mouseover",this.handleMouseOver),this.addEventListener("mouseup",this.handleMouseUp),this.addEventListener("change",this.handleEventGroupChange),window.innerWidth<=768&&(this.longPressListeners=W(this,{onLongPress:this.handleDayLongPress.bind(this),onTouchEnd:this.handleDayTouchEnd.bind(this)}))}disconnectedCallback(){var e;super.disconnectedCallback(),this.removeEventListener("mousedown",this.handleMouseDown),this.removeEventListener("mouseover",this.handleMouseOver),this.removeEventListener("mouseup",this.handleMouseUp),this.removeEventListener("change",this.handleEventGroupChange),(e=this.longPressListeners)==null||e.removeListeners()}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{index:this.index,...t}}))}handleMouseDown(e){setTimeout(()=>this._dispatch("cal-day-mousedown",{mouseDownEvent:e}),0)}handleMouseOver(e){this._dispatch("cal-day-mouseover")}handleMouseUp(e){setTimeout(()=>this._dispatch("cal-day-mouseup"),0)}handleEventGroupChange(e){const t=structuredClone(this.data),{events:s,prevEvents:i}=e.detail;s&&i&&Object.entries(this.data.cals||{}).forEach(([o,n])=>{(n==null?void 0:n.events)==s&&(t.cals[o].events=i)}),e.stopPropagation(),this._dispatch("cal-day-change",{data:this.data,prevData:t})}handleNoteKeydown(e){(e.keyCode==27&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey||e.keyCode==13&&(e.ctrlKey||!e.ctrlKey)&&!e.metaKey&&!e.shiftKey&&!e.altKey)&&(e.preventDefault(),e.stopPropagation(),e.target.blur())}handleNoteBlur(e){const t=this.shadowRoot.querySelector(".cal-note").innerText;if(this.data.note&&!t||this.data.note!=t){const s=structuredClone(this.data);t?this.data.note=t:delete this.data.note,this._dispatch("cal-day-change",{data:this.data,prevData:s})}e.preventDefault(),e.stopPropagation()}handleDayLongPress({x:e,y:t,originalEvent:s}){j().show({x:e,y:t,title:this.day,content:this._renderFlyoutContent()})}handleDayTouchEnd({isLongPress:e,originalEvent:t}){j().hide()}_renderFlyoutContent(){const{cals:e,note:t}=this.data||{cals:{}},{cals:s,options:i}=this.settings||{cals:{},options:{}},o=(i==null?void 0:i.calOrder)??[];let n="";t&&(n+=`<div style="color: white; font-size: 13px; margin: 2px 0; line-height: 1.3;">${t}</div>`);const a=(this.alerts||[]).filter(f=>f.type==="warn"||f.type==="danger");let u="";a&&a.length>0&&(u+='<div style="font-weight: bold; color: #fbbf24; margin: 12px 0 4px 0; font-size: 14px;">Alerts</div>',u+=a.map(f=>`<div style="color: ${f.type==="warn"?"#fbbf24":"#f87171"}; font-size: 13px; margin: 4px 0; line-height: 1.3;">⚠ ${f.text}</div>`).join(""));let p="";return o.forEach(f=>{var w;const E=s[f],k=((w=e[f])==null?void 0:w.events)||[];!E||k.length===0||(p+=`<div style="font-weight: bold; color: #fbbf24; margin: 8px 0 4px 0; font-size: 14px;">${E.name}</div>`,k.forEach(m=>{if(m.resource||m.schedule){const _=m.resource||"",d=Array.isArray(m.schedule)?m.schedule.join(", "):m.schedule||"";p+='<div style="color: white; font-size: 13px; margin: 2px 0; line-height: 1.3;">',_&&d?p+=`${_}: ${d}`:_?p+=_:d&&(p+=d),p+="</div>"}}))}),n+u+p}}b(P,"styles",L`
    :host {
      display: flex;
      flex-direction: column;
      outline: 1px solid var(--border-color);
      padding-top: 0px;
      min-height: 4em; /* Minimum height for a day in the calendar. See comment in cal-component .cal-container */
      user-select: none; /* Do not allow text selection, which interferes with day range selection */
    }
    :host(.long-press-detecting) {
      /* Prevent text selection on touch */
      touch-action: manipulation;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -webkit-touch-callout: none;
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
      background: #f2f2f2;

      .cal-day-and-note > span {
        opacity: 0.5;
      }
    }
    @media print {
      :host {
        break-inside: avoid; /* Avoid page breaks when printing */
      }
    }
  `),b(P,"properties",{day:{type:String},note:{type:String},noteStyle:{type:String},readonly:{type:Boolean},selected:{type:Boolean},dim:{type:Boolean},showAll:{type:Boolean},data:{type:Object,attribute:!1},alerts:{type:Object,attribute:!1},settings:{type:Object,attribute:!1}});customElements.define("cal-day",P);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Y=l=>(...e)=>({_$litDirective$:l,values:e});class J{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,s){this._$Ct=e,this._$AM=t,this._$Ci=s}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const X=l=>l.strings===void 0,G={},Q=(l,e=G)=>l._$AH=e;/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Z=Y(class extends J{constructor(l){if(super(l),l.type!==$.PROPERTY&&l.type!==$.ATTRIBUTE&&l.type!==$.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!X(l))throw Error("`live` bindings can only contain a single expression")}render(l){return l}update(l,[e]){if(e===O||e===g)return e;const t=l.element,s=l.name;if(l.type===$.PROPERTY){if(e===t[s])return O}else if(l.type===$.BOOLEAN_ATTRIBUTE){if(!!e===t.hasAttribute(s))return O}else if(l.type===$.ATTRIBUTE&&t.getAttribute(s)===e+"")return O;return Q(l),e}}),ee=0,te=1,se=2,S=class S extends D{constructor(){super(),this.focusOnUpdate=!1}render(){const e=this.checked==te,t=this.checked==se,s=this.type=="confirm"?this.type:"",i=this.showHandle?v`<div class="handle">${C("grip-vertical")}</div>`:g,o=this.hideCheckbox?g:v`<input type="checkbox" id="check" .checked=${e} .indeterminate=${t} @change=${this._handleCheckChange}></input>`,n=v`<div
      id="label"
      ?contenteditable=${this.editable}
      @keydown=${this._handleKeyDown}
      @click=${this._handleLabelClick}
      @focus=${this._handleItemFocus}
      @blur=${this._handleItemBlur}
      .innerText=${Z(this.label??"")}
    ></div>`,a=this.hideColor?g:this.renderColorSelector(this.color),u=this.showDelete?v`<div class="deleteBtn" @click=${this._handleDeleteClick}>
          ${C("xmark")}
        </div>`:null,f=((this.type=="confirm"?v`<button class="confirmBtn" @click=${this._handleDeleteClick}>
            Delete
          </button>`:null)||u)??g;return v`<div
      class="item ${s}"
      style="${this.itemStyle||g}"
      @click=${this._handleItemClick}
    >
      ${o} ${a} ${n} ${f} ${i}
    </div> `}renderColorSelector(e){return e=e??S.DEFAULT_COLOR,v`<div class="color-selector" @click=${this._handleColorSelectClick}>
      <span style="background-color: ${e}">
        <input type="color" id="color" value="${e}" @input=${this._handleColorChange}></input>
      </span>
    </div>`}updated(){this.checkInputEl=this.shadowRoot.querySelector("#check"),this.labelEl=this.shadowRoot.querySelector("#label"),this.colorInputEl=this.shadowRoot.querySelector("#color"),this.focusOnUpdate&&(this.labelEl.focus(),this.focusOnUpdate=!1)}_dispatch(e,t={}){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{context:this.context,...t}}))}_handleCheckChange(e){this._dispatch("item-checked",{checked:this.checkInputEl.checked})}_handleKeyDown(e){(e.keyCode==13||e.keyCode==27)&&(e.preventDefault(),this.labelEl.blur())}_commit(){this._dispatch("item-change",{label:this.labelEl.textContent.trim()})}_handleItemClick(e){this._dispatch("item-click")}_handleItemBlur(e){this._commit(),this._dispatch("item-blur")}_handleItemFocus(e){this._dispatch("item-focus")}_handleLabelClick(e){!this.editable&&!this.hideCheckbox&&(this.checkInputEl.checked=!this.checkInputEl.checked,this._handleCheckChange())}_handleColorSelectClick(e){e.preventDefault(),this.colorInputEl.showPicker()}_handleColorChange(e){this.color=this.colorInputEl.value.toLowerCase(),(this.color=="black"||this.color=="#000000"||this.color=="white"||this.color=="#ffffff")&&(this.color=null),this._dispatch("item-color-change",{color:this.color})}_handleDeleteClick(e){e.preventDefault(),e.stopPropagation(),this._dispatch("item-click"),this._dispatch("item-delete-click")}};b(S,"DEFAULT_COLOR","inherit"),b(S,"properties",{type:{type:String},label:{type:String},editable:{type:Boolean},selected:{type:Boolean},showHandle:{type:Boolean},showDelete:{type:Boolean},hideCheckbox:{type:Boolean},checked:{type:Number},hideColor:{type:Boolean},color:{type:String},itemStyle:{type:String}}),b(S,"styles",L`
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
  `);let q=S;customElements.define("cal-checklist-item",q);class z extends D{constructor(){super(),this.items=[],this.selected=-1,this.deleteIdx=-1}willUpdate(e){this.items=this.items??[],this._renderInfo=this._createRenderInfo(this.items,this.selected,this.deleteIdx),this.items.forEach(t=>delete t.editing)}_createRenderInfo(e,t,s){const i=[];return e.forEach(({id:o,label:n,color:a,checked:u,editing:p},f)=>{i.push({type:"item",id:o,label:n,color:a,checked:u,editing:p,selected:t==f,context:{index:f}})}),s>=0&&s<e.length&&i.splice(s+1,0,{type:"confirm",label:this.deleteWarning,context:{index:s,confirmed:!0}}),{itemInfos:i}}render(){if(!this._renderInfo)return g;const e=this._renderInfo.itemInfos.map((s,i)=>v`<cal-checklist-item
        type=${s.type}
        label=${s.label}
        color=${s.color}
        checked=${s.checked}
        itemStyle=${this.itemStyle??g}
        ?selected=${this.selectable&&s.selected}
        ?showHandle=${this.moveable}
        ?editable=${this.editable}
        ?showDelete=${this.addable&&!this.disableDelete}
        ?hideCheckbox=${!this.checkable}
        ?hideColor=${!this.colorable}
        .focusOnUpdate=${s.editing}
        .context=${s.context}
      ></cal-checklist-item>`),t=this.addable?v`<div
          class="cal-checklist-add"
          style="${this.itemStyle??g}"
          @click=${this._handleAddItemClick}
        >
          <span class="cal-checklist-plussign">${C("plus")}</span>
          <span>Add</span>
        </div>`:g;return v`<div>${e} ${t}</div>`}connectedCallback(){super.connectedCallback(),this.addEventListener("item-click",this._handleItemClick),this.addEventListener("item-focus",this._handleItemClick),this.addEventListener("item-blur",this._handleItemBlur),this.addEventListener("item-checked",this._handleItemChecked),this.addEventListener("item-change",this._handleItemChange),this.addEventListener("item-color-change",this._handleItemColorChange),this.addEventListener("item-delete-click",this._handleItemDeleteClick)}deleteItem(e=null){if(e??(e=this.selected),e>=0&&e<this.items.length){const t=this.items[e];this.items.splice(e,1),this._dispatch("delete-item",{item:t,index:e}),this.requestUpdate()}}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleItemClick(e){const{index:t}=e.detail.context;this.deleteIdx=-1,this.selectable&&(this.selected=t,this._dispatch("select",{item:this.items[t],index:t})),this.requestUpdate()}_handleItemBlur(e){this.selected=-1,this.deleteIdx=-1,this.selectable&&this._dispatch("select",{item:null,index:-1}),this.requestUpdate()}_handleItemChecked(e){const{index:t}=e.detail.context,s=e.detail.checked;this.items[t].checked=s,this._dispatch("checked",{item:this.items[t],index:t,checked:s})}_handleItemChange(e){const{index:t}=e.detail.context,s=e.detail.label;this.items[t].label=s,this._dispatch("change",{item:this.items[t],index:t,label:s}),this.requestUpdate()}_handleItemColorChange(e){const{index:t}=e.detail.context,s=e.detail.color;this.items[t].color=s,this._dispatch("color-change",{item:this.items[t],index:t,color:s})}_handleItemDeleteClick(e){let{index:t,confirmed:s}=e.detail.context;s=s||this.deleteWarning==null,s?this.deleteItem(t):(this.deleteIdx=t,this.requestUpdate())}_handleAddItemClick(e){const t={label:"",checked:ee,color:null,editing:!0};this.default&&Object.assign(t,this.default),this.items.push(t),this.selected=this.items.length-1,this.deleteIdx=-1,this._dispatch("add-item",{item:t}),this._dispatch("select",{item:t,index:this.selected})}}b(z,"properties",{items:{type:Array,attribute:!1},itemStyle:{type:String},selected:{type:Number},default:{type:Object,attribute:!1},disableDelete:{type:Boolean},deleteWarning:{type:String},checkable:{type:Boolean},colorable:{type:Boolean},addable:{type:Boolean},editable:{type:Boolean},selectable:{type:Boolean},moveable:{type:Boolean}}),b(z,"styles",L`
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
  `);customElements.define("cal-checklist",z);export{te as C,se as I,ee as U,Y as e,J as i,$ as t};
