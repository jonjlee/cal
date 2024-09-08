var se=Object.defineProperty;var ae=(h,t,e)=>t in h?se(h,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):h[t]=e;var D=(h,t,e)=>ae(h,typeof t!="symbol"?t+"":t,e);import{s as O,d as y,i as X,x as b,T as k,t as Z,w as ne,f as oe,n as le,a as ee,b as Y,c as I,g as ie,e as re,h as ce,j as de,k as he,l as F,m as J}from"./db-kWuhzS5Q.js";import{C as x,U as $,I as pe,i as ue,t as fe,e as me,A as ye}from"./auth-BaWwT4vD.js";class be extends O{createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.monthTextDiv=this.querySelector(".cal-navbar-month"),this.dateSelector=this.querySelector(".cal-navbar-datesel"),this.dateSelectorIcon=this.querySelector(".cal-navbar-datesel-icon");const t=this.getAttribute("cal-id");this.parent=document.querySelector("#"+t),this.parent.addEventListener("displaying-month",this._handleDisplayMonth.bind(this)),this.dateSelector.addEventListener("change",()=>this.selectDate(this.dateSelector.value)),this.querySelector(".cal-navbar-datesel-icon").addEventListener("click",()=>this.dateSelector.showPicker()),this.querySelector("#cal-navbar-today-btn").addEventListener("click",()=>this.today()),this.querySelector("#cal-navbar-prevmonth").addEventListener("click",()=>this.prevMonth()),this.querySelector("#cal-navbar-nextmonth").addEventListener("click",()=>this.nextMonth())}today(){this.parent.scrollToDate(y(),"auto")}selectDate(t){this.parent.scrollToDate(t,"auto")}prevMonth(){this.parent.scrollToMonth(y(this.dateSelector.value).subtract(1,"month").format("YYYY-MM"))}nextMonth(){this.parent.scrollToMonth(y(this.dateSelector.value).add(1,"month").format("YYYY-MM"))}_handleDisplayMonth(t){t.detail.monthObj?(this.monthTextDiv.textContent=t.detail.monthObj.format("MMMM YYYY"),this.dateSelector.value=t.detail.monthObj.format("YYYY-MM-DD")):this.monthTextDiv.textContent=""}}customElements.define("cal-navbar",be);class ve{constructor(){this.clear()}clear(){this._actions=[],this._curAction=-1}add(t){this._curAction++,this._actions[this._curAction]=t,this._actions[this._curAction+1]&&this._actions.splice(this._curAction+1)}undo(){return this.hasUndo()?this._actions[this._curAction--]:null}redo(){return this.hasRedo()?this._actions[++this._curAction]:null}hasUndo(){return this._curAction>=0}hasRedo(){return this._curAction<this._actions.length-1}}const ge="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cstyle%3e.spinner_b2T7{animation:spinner_xe7Q%20.8s%20linear%20infinite}.spinner_YRVV{animation-delay:-.65s}.spinner_c9oY{animation-delay:-.5s}@keyframes%20spinner_xe7Q{93.75%25,100%25{r:3px}46.875%25{r:.2px}}%3c/style%3e%3ccircle%20class='spinner_b2T7'%20cx='4'%20cy='12'%20r='3'/%3e%3ccircle%20class='spinner_b2T7%20spinner_YRVV'%20cx='12'%20cy='12'%20r='3'/%3e%3ccircle%20class='spinner_b2T7%20spinner_c9oY'%20cx='20'%20cy='12'%20r='3'/%3e%3c/svg%3e";class A extends O{constructor(){super();D(this,"forceRefresh",Z((e=null)=>{const s=e?e.map(a=>"#day-"+a):"cal-day";this.requestUpdate(),this.shadowRoot.querySelectorAll(s).forEach(a=>a.forceRefresh())},250));this.data=null,this._undo=new ve,this._selecting=!1,this._firstSelectedIdx=null,this._lastSelectedIdx=null}connectedCallback(){super.connectedCallback(),this.addEventListener("cal-day-change",this._handleDayChange),this.addEventListener("cal-day-mousedown",this._handleMouseDown),this.addEventListener("cal-day-mouseover",this._handleMouseOver),this.addEventListener("cal-day-mouseup",this._handleMouseUp)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("cal-day-change",this._handleDayChange),this.removeEventListener("cal-day-mousedown",this._handleMouseDown),this.removeEventListener("cal-day-mouseover",this._handleMouseOver),this.removeEventListener("cal-day-mouseup",this._handleMouseUp)}render(){return this.data?b`
      <div class="cal-header">
        <div class="cal-month-gutter"></div>
        <div class="cal-header-day">Mon</div>
        <div class="cal-header-day">Tue</div>
        <div class="cal-header-day">Wed</div>
        <div class="cal-header-day">Thu</div>
        <div class="cal-header-day">Fri</div>
        <div class="cal-header-day">Sat</div>
        <div class="cal-header-day">Sun</div>
      </div>
      <div class="cal-container" @scroll="${this._handleScroll}">
        ${this.days.map((e,s)=>this.renderDay(e,s))}
      </div>
    `:b`<div class="loading">
        ${this.loadingText??b`<img src="${ge}" style="height:48px" />`}
      </div>`}renderDay(e,s){var d,p,f,v;const a=y().format("YYYY-MM-DD");let n="";if(e.dayObj.day()%7===1)if(e.dayObj.date()<=7&&this._wholeWeekInSameMonth(e.dayObj)){const g=e.dayObj;n=b`<div
          id="month-${g.format("YYYY-MM")}"
          class="cal-month-gutter"
        >
          <div class="fw-bold">${g.year()}</div>
          <div>${g.format("MMM").toUpperCase()}</div>
        </div>`}else n=b`<div class="cal-month-gutter"></div>`;const o=e.dayStr,l=e.dayObj.date()==1?"first-day":k,i=((d=this.data)==null?void 0:d[o])??{cals:{}},r=(p=this.alerts)==null?void 0:p[o],c=this.settings??{cals:{},options:{}};return b`${n}
      <cal-day
        id="day-${o}"
        class="${l}"
        day="${e.display?e.display:e.dayObj.date()}"
        dim=${o<a||k}
        note="${((f=i==null?void 0:i.note)==null?void 0:f.text)||(i==null?void 0:i.note)||k}"
        noteStyle="${((v=i==null?void 0:i.note)==null?void 0:v.style)||k}"
        ?readonly=${this.readonly}
        ?selected=${e.selected}
        .index=${s}
        .dayObj=${e.dayObj}
        .data=${i}
        .alerts=${r}
        .settings=${c}
      ></cal-day>`}loadData(e,s){const a=Object.keys(e).reduce((l,i)=>i<l?i:l,y().format("YYYY-MM-DD")),n=this.start||a,o=this.end||y().endOf("year").add(2,"year");this.startDateObj=y(n).startOf("month").subtract(1,"day").startOf("week").add(1,"day"),this.endDateObj=y(o).endOf("month").endOf("week").add(1,"day"),this.days=this._fillDays(this.startDateObj,this.endDateObj),this.settings=s,this.data=this._sortDataByEvents(e),this.data=this._fillDaysInData(this.data,this.settings,this.days),this._undo.clear(),this.forceRefresh()}updateData(e){const s=Object.keys(e);if(s.length>0){const a={};return s.map(n=>{a[n]=structuredClone(this.data[n])}),this._undo.add({days:s,scrollPos:this.scrollPos,redoData:structuredClone(e),undoData:a}),this._updateDays(e),this.forceRefresh(s),this._dispatch("change",{data:e}),!0}return!1}hasUndo(){return this._undo.hasUndo()}hasRedo(){return this._undo.hasRedo()}undo(){const e=this._undo.undo();return e&&this._performUndoRedo("undo",e,e.undoData),e}redo(){const e=this._undo.redo();return e&&this._performUndoRedo("redo",e,e.redoData),e}_performUndoRedo(e,s,a){let n=s.days;const o=this.getSelected();this._selectDays(n);const l=n.concat(o);this._updateDays(a),this.forceRefresh(l),this.isDateVsible(n[n.length-1])||(this.scrollPos=s.scrollPos),this._dispatch(e,{action:s}),this._dispatch("change",{data:a}),this._dispatchSelect()}scrollToMonth(e,s="smooth"){const n="#day-"+y(e).date(1).format("YYYY-MM-DD"),o=this.shadowRoot.querySelector(n);o==null||o.scrollIntoView({behavior:s})}scrollToDate(e,s="smooth"){const a=y(e),n=this.shadowRoot.querySelector(".cal-container"),o="#day-"+a.format("YYYY-MM-DD"),l=this.shadowRoot.querySelector(o);this.scrollToMonth(e,s);const i=n.scrollTop+n.clientHeight-(l.offsetTop-n.offsetTop)-l.clientHeight;i<0&&(n.scrollTop-=i);const r=this.days.find(c=>c.dayObj.isSame(a,"day"));r&&(this._clearSelectedDays(),r.selected=!0,this._selecting=!1,this._firstSelectedIdx=l.index,this._lastSelectedIdx=l.index,this._dispatchSelect(),this.requestUpdate())}get scrollPos(){return this.shadowRoot.querySelector(".cal-container").scrollTop}set scrollPos(e){const s=this.shadowRoot.querySelector(".cal-container");s.scrollTop=e}isDateVsible(e){const s=this.shadowRoot.querySelector(".cal-container"),a="#day-"+y(e).format("YYYY-MM-DD"),n=this.shadowRoot.querySelector(a);if(n){const o=s.offsetTop+s.scrollTop,l=o+s.clientHeight,i=n.offsetTop,r=i+n.clientHeight;return i<=l&&r>o}return!1}getSelected(){return this.days?this.days.filter(e=>e.selected).map(e=>e.dayStr):[]}_sortDataByEvents(e){var s;if(e){for(const a in e)if(e[a].cals)for(const n in e[a].cals){const{events:o}=e[a].cals[n];if(o){o.sort((l,i)=>{var r,c;return((r=l.resource)==null?void 0:r.toLowerCase())<((c=i.resource)==null?void 0:c.toLowerCase())?-1:1});for(const l of o)(s=l.subitems)==null||s.sort((i,r)=>{var c,d;return((c=i.resource)==null?void 0:c.toLowerCase())<((d=r.resource)==null?void 0:d.toLowerCase())?-1:1})}}}return e}_fillDays(e,s){const a=[];for(let n=e;n<=s;n=n.add(1,"day")){const o={dayObj:n,dayStr:n.format("YYYY-MM-DD")};(n===e||n.date()===1)&&(o.display=n.format("MMM D")),a.push(o)}return a}_fillDaysInData(e,s,a){var o;const n=((o=s.options)==null?void 0:o.calOrder)??[];for(const{dayStr:l}of a){e[l]=e[l]||{};const i=e[l];i.cals=i.cals||{},n.forEach(r=>{i.cals[r]=i.cals[r]||{id:r,events:[]}})}return e}_wholeWeekInSameMonth(e){return e.day(1).month()==e.day(6).add(1,"day").month()}_monthStartingInWeek(e){const s=e.day(1),a=e.day(6).add(1,"day");return s.date()===1||s.date()>a.date()?a.date(1):null}_updateDays(e){Object.entries(e).forEach(([s,a])=>{this.data[s]=structuredClone(a)})}_clearSelectedDays(){this.days.forEach(e=>{e.selected=!1})}_selectDays(e){e=Array.isArray(e)?e:[e],this.days.forEach(s=>{s.selected=e.includes(s.dayStr)})}_selectDaysBetween(e,s){const a=Math.min(e,s),n=Math.max(e,s);for(let o=a;o<=n;o++)this.days[o].selected=!0}_dispatch(e,s){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:s}))}_dispatchSelect(){this._dispatch("select",{selected:this.getSelected()})}_handleDayChange(e){var l;const{index:s,data:a,prevData:n}=e.detail,o=(l=this.days[s])==null?void 0:l.dayStr;o&&JSON.stringify(a)!=JSON.stringify(n)&&(this._undo.add({days:[o],scrollPos:this.scrollPos,redoData:{[o]:structuredClone(a)},undoData:{[o]:n}}),this._dispatch("change",{data:{[o]:a}}))}_handleMouseDown(e){const{index:s,mouseDownEvent:a}=e.detail;a.ctrlKey||a.metaKey?s!==this._firstSelectedIdx&&(this.days[s].selected=!this.days[s].selected):a.shiftKey?(this._firstSelectedIdx==this._firstSelectedIdx,this._clearSelectedDays(),this._selectDaysBetween(this._firstSelectedIdx,s)):(this._clearSelectedDays(),this._selecting=!0,this._firstSelectedIdx=s,this._lastSelectedIdx=s,this.days[e.detail.index].selected=!0),this.requestUpdate()}_handleMouseOver(e){this._selecting&&this._firstSelectedIdx!==null&&(this._clearSelectedDays(),this._selectDaysBetween(this._firstSelectedIdx,e.detail.index),this.requestUpdate())}_handleMouseUp(e){this._selecting=!1,this._dispatchSelect()}_handleScroll(e){const s=e.target,a=s.scrollTop,n=100,l=Array.from(s.querySelectorAll(".first-day")).reverse().find(i=>i.offsetTop-n-s.offsetTop<a);this.currentMonth=l.dayObj,this.dispatchEvent(new CustomEvent("displaying-month",{bubbles:!1,composed:!1,detail:{monthObj:this.currentMonth}}))}}D(A,"styles",X`
    :host {
      flex-grow: 1; /* Grow the cal-component to fill our parent's (#main) horizontal space, which is display: flex */
      display: flex; /* Display children (.cal-header and .cal-container) using flex layout in vertical direction */
      flex-direction: column;
    }
    .loading {
      flex-grow: 1;
      padding-top: 20px;
      text-align: center;
      color: #8e8e8e;
    }
    .cal-month-gutter {
      /* Default to hidden - see @media query below for showing on larger screens */
      display: none;
      align-items: start;
      justify-content: end;
    }
    .cal-month-gutter div {
      color: var(--month-name-color);
      margin-top: 5px;
      writing-mode: tb-rl;
      transform: rotate(-180deg);
    }
    .cal-header {
      height: 2.1rem;
      display: grid;
      /* Default to not show month gutter column - see @media query below for showing on larger screens */
      grid-template-columns: repeat(7, minmax(18px, 1fr));
      grid-gap: 1px;
      margin-bottom: 0px;
      border-bottom: 1px solid var(--border-color);
    }
    .cal-header-day {
      font-weight: 550;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cal-container {
      display: grid;
      flex-grow: 1; /* Fill the rest of the vertical space of our parent (cal-component, aka :host) */
      overflow-y: scroll; /* Keep as scroll to have scrollbar always visible. Setting to auto causes performance issues with reflow on every key input. */
      padding: 1px;
      /* Default to not show month gutter column - see @media query below for showing on larger screens */
      grid-template-columns: repeat(7, minmax(18px, 1fr));
      /* use min=min-content to make day expand to show full contents. cal-day also has min-height set to make sure it doesn't completely
         collapse when empty. We can't put the minimum height inside minmax(), because with once cal-container has overflowing content,
         it will start to compress the rows, overriding the minimum in grid-auto-rows if set to a specific value. so we put the minimum in cal-day
         min-height instead which takes precedence. */
      grid-auto-rows: minmax(min-content, auto);
      grid-gap: 1px;
    }

    /* Only show month name gutter when on medium device or larger (https://getbootstrap.com/docs/5.3/layout/breakpoints/) */
    @media only screen and (min-width: 768px) {
      .cal-month-gutter {
        display: flex;
      }
      .cal-header {
        grid-template-columns: var(--month-name-width) repeat(
            7,
            minmax(18px, 1fr)
          );
      }
      .cal-container {
        grid-template-columns: var(--month-name-width) repeat(
            7,
            minmax(18px, 1fr)
          );
      }
    }

    @media print {
    }
  `),D(A,"properties",{loadingText:{type:String},readonly:{type:Boolean},start:{type:String},end:{type:String},alerts:{type:Object,attribute:!1}});customElements.define("cal-component",A);class te extends O{render(){var o;if(!this.settings)return;const{cals:t,options:e}=this.settings??{},{calOrder:s}=e??{},a=(o=s==null?void 0:s.filter(l=>{var i;return!((i=t[l])!=null&&i.archived)}))==null?void 0:o.map(l=>{var i,r,c,d;return{id:l,label:(i=t[l])==null?void 0:i.name,color:((r=t[l])==null?void 0:r.color)||((c=t[l])==null?void 0:c.background),checked:((d=t[l])==null?void 0:d.visible)??x}}),n=b`<cal-checklist
      checkable
      .items=${a??[]}
      @checked=${this._handleCalChange}
      @color-change=${this._handleCalChange}
    >
    </cal-checklist>`;return b` ${n} `}_handleCalChange(t){const{item:e,checked:s,color:a}=t.detail;this.dispatchEvent(new CustomEvent("change",{bubbles:!1,composed:!0,detail:{cal:e.id,checked:s,color:a}}))}}D(te,"properties",{settings:{type:Object,attribute:!1}});customElements.define("cal-callist",te);class U extends O{willUpdate(){if(!this.settings)return;let t=this.settings.options??{};t=this.settings.options={peopleGroupOrder:[],peopleGroups:{},people:{},...t};for(const e in t.people)t.people[e].visible=t.people[e].visible??x;this._syncGroupsToPeopleChecked(t.peopleGroups,t.people)}render(){if(!this.settings)return;const{peopleGroupOrder:t,peopleGroups:e,people:s}=this.settings.options??{},a=t==null?void 0:t.map(c=>{var d;return{label:c,group:!0,checked:((d=e[c])==null?void 0:d.visible)??$}}),n=Object.entries(s??{}).sort(([c,d],[p,f])=>c.localeCompare(p)).map(([c,d])=>({label:d.name,group:!1,checked:d.visible??x,color:d.color})),o=b`<cal-checklist
      checkable
      .items=${a}
      @color-change=${this._handleColorChange}
      @checked=${this._handleGroupCheck}
    ></cal-checklist>`,l=b`<div class="divider"></div>`,i=b`<cal-checklist
      class="everyone-list"
      checkable
      colorable
      .items=${n}
      @color-change=${this._handleColorChange}
      @checked=${this._handlePersonCheck}
    >
    </cal-checklist>`,r=b`<div class="footer">
      <a href="#" @click=${this._handleSelectAll.bind(this,x)}
        >Show All</a
      >
      |
      <a href="#" @click=${this._handleSelectAll.bind(this,$)}>None</a>
    </div>`;return b`${o} ${l} ${i} ${r} ${l}`}_syncGroupsToPeopleChecked(t,e){for(const s in t){const a=t[s].names,n=a.filter(o=>{var l;return(l=e[o.toLowerCase()])==null?void 0:l.visible});t[s].visible=n.length==a.length?x:n.length>0?pe:$}}_dispatch(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!1,composed:!0,detail:{settings:this.settings}}))}_handleColorChange(t){const{item:e,color:s}=t.detail;e.group?this.settings.options.peopleGroups[e.label].color=s:this.settings.options.people[e.label.toLowerCase()].color=s,this._dispatch("change")}_handleGroupCheck(t){const{item:e,checked:s}=t.detail;for(const a of this.settings.options.peopleGroups[e.label].names){const n=this.settings.options.people[a.toLowerCase()];n&&(n.visible=s?x:$)}this._dispatch("change"),this.requestUpdate()}_handlePersonCheck(t){const{item:e,checked:s}=t.detail,a=this.settings.options.people[e.label.toLowerCase()];a.visible=s?x:$,this._dispatch("change"),this.requestUpdate()}_handleSelectAll(t){const e=this.settings.options.people;for(const s in e)e[s].visible=t;this._dispatch("change"),this.requestUpdate()}}D(U,"properties",{settings:{type:Object,attribute:!1}}),D(U,"styles",X`
    :host {
      display: flex;
      flex-direction: column;
    }
    .footer {
      align-self: center;
      margin-top: 5px;
      font-size: 0.75em;
      a {
        color: var(--bs-link-color);
        text-decoration: none;
      }
    }
    .divider {
      margin: 10px 30px;
      border-top: 1px solid var(--border-color);
    }
    .everyone-list {
      font-size: 0.85em;
      max-height: 14em;
      overflow-y: scroll;
    }
  `);customElements.define("cal-peoplelist",U);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class R extends ue{constructor(t){if(super(t),this.et=k,t.type!==fe.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===k||t==null)return this.vt=void 0,this.et=t;if(t===ne)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.vt;this.et=t;const e=[t];return e.raw=e,this.vt={_$litType$:this.constructor.resultType,strings:e,values:[]}}}R.directiveName="unsafeHTML",R.resultType=1;const _e=me(R),N=document.querySelector("#reportModal"),we=N.querySelector(".modal-title"),Ce=N.querySelector(".modal-body"),Q=new bootstrap.Modal(N),q={setTitle:h=>{we.textContent=h},setBodyHtml:h=>{Ce.innerHTML=h},show:(h,t)=>{h!==void 0&&q.setTitle(h),t!==void 0&&q.setBodyHtml(t),Q.show()},hide:()=>{Q.hide()}};function M(h,t,e){var l,i;const s={};oe(t,h,({day:r,calId:c,resource:d,shift:p,subitemResource:f,subitemShift:v})=>{var w,_;const g=(_=(w=e.cals)==null?void 0:w[c])==null?void 0:_.type;if((g==null?void 0:g.toLowerCase())!="call"){d=f??d,p=v??p;const m=d.toLowerCase(),u=s[m]??{display:d},S=u[r]??[];S.push(p),u[r]=S,s[m]=u}});const a={},n=Object.keys(s).sort();for(const r of h)for(const c of n){const d=c.toLowerCase();let p=0;const f=s[d][r]??[];for(const v of f)p+=((l=le(r,v))==null?void 0:l.hours)||0;a[d]=a[d]??{display:s[d].display},a[d][r]=p}n.forEach(r=>{a[r].total=Object.values(a[r]).reduce((c,d)=>c+(isNaN(d)?0:d),0)});const o=Object.values(((i=e.options)==null?void 0:i.people)??{}).map(r=>r.visible??!0?r.name.toLowerCase():null).filter(r=>r);for(const r of Object.keys(a))o.includes(r)||delete a[r];return{days:h,people:Object.keys(a),data:a}}function Se(h,t=null,e=null,s=null){const{days:a,people:n,data:o}=h,l=n.map(c=>`<th>${o[c].display}</th>`),i=a.map(c=>{const d=`<td>${y(c).format("dd M/D/YY")}</td>`,p=n.map(f=>o[f][c]).map(f=>`<td>${f}</td>`);return[d,...p]}).map(c=>`<tr>${c.join("")}</tr>`),r=n.map(c=>`<td>${o[c].total}</td>`);if(i.push(`<tr><td><i>Total</i></td>${r.join("")}</tr>`),t&&e||s){if(i.unshift(`<tr><th colspan="${n.length+1}">Selected Days</th></tr>`),t&&e){const c=n.map(d=>{var p;return`<td>${((p=e.data[d])==null?void 0:p.total)??""}</td>`});i.push(`<tr><th>Total through ${y(t).format("M/D/YY")}</th>${c.join("")}</tr>`)}if(s){const c=n.map(d=>{var p;return`<td>${((p=s.data[d])==null?void 0:p.total)??""}</td>`});i.push(`<tr><th>Total for ${y(t).year()}</th>${c.join("")}</tr>`)}}return`<table class="table table-striped">
    <thead>
      <tr>
        <th></th>
        ${l.join("")}
      </tr>
    </thead>
    <tbody>
      ${i.join("")}
    </tbody>
  </table>`}class De extends O{constructor(){super(),this._dayData={cals:{}}}createRenderRoot(){return this}willUpdate(t){var e,s,a;this._calData=(e=this._calEl)==null?void 0:e.data,this._settings=((s=this._calEl)==null?void 0:s.settings)??{cals:{}},this._alerts=((a=this._calEl)==null?void 0:a.alerts)??{},this._renderInfo=this._createRenderInfo(this._selected,this._settings,this._dayData,this._alerts,this._calEl.readonly)}_createRenderInfo(t,e,s,a,n){var d,p;const o=this._selectedDaysAsText(t)||"Select a date",l=(t==null?void 0:t.length)==1?k:!0,i={};t.filter(f=>!!a[f]).forEach(f=>i[f]=a[f]);const r=(d=e.templates)==null?void 0:d.map((f,v)=>b`<option value="${v}">${f.name}</option>`),c=Object.keys(((p=e.options)==null?void 0:p.people)??{}).map(f=>b`<option value="${f}"></option>`);return{dayData:s,calSettings:e,selectedDaysText:o,selectedAlerts:i,copyDisabled:l,templateOptions:r,peopleDatalist:c,readonly:n}}render(){if(!this._renderInfo)return;const{dayData:t,calSettings:e,selectedDaysText:s,selectedAlerts:a,copyDisabled:n,templateOptions:o,peopleDatalist:l,readonly:i}=this._renderInfo,r=b`
      <div class="btn-group toolbar" role="group">
        <button
          type="button"
          class="undoBtn btn btn-sm btn-outline-primary"
          disabled
          @click=${this._handleUndoClick}
        >
          Undo
        </button>
        <button
          type="button"
          class="redoBtn btn btn-sm btn-outline-primary"
          disabled
          @click=${this._handleRedoClick}
        >
          Redo
        </button>
        <button
          type="button"
          class="saveBtn btn btn-sm btn-outline-primary"
          disabled
          @click=${this._handleSaveClick}
        >
          Saved
        </button>
        <button type="button" class="btn btn-sm btn-outline-primary" disabled>
          Print
        </button>
      </div>
    `,c=b`
      <h2 class="sidebar-heading">Details</h2>
      <div class="selected-days-label">${s}</div>
      <div class="selected-days-alerts">
        ${this._selected.length?this._alertTable(a):""}
      </div>
      <div class="details"></div>
    `,d=i?k:b`
          <h2 class="sidebar-heading">Edit</h2>
          <div class="edit">
            <h6 class="edit-section-label">Create schedule to apply:</h6>
            <div class="edit-section-content">
              <cal-day .data=${t} .settings="${e}"></cal-day>
              <div class="edit-toolbar">
                <button
                  class="btn btn-sm btn-outline-primary"
                  ?disabled=${n}
                  @click=${this._handleCopyClick}
                >
                  Copy Selected
                </button>
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click=${this._handleClearClick}
                >
                  Clear
                </button>
                <div class="apply-btn-group btn-group">
                  <button
                    class="btn btn-sm btn-primary"
                    @click=${this._handleApplyScheduleClick}
                  >
                    Apply
                  </button>
                  <button
                    class="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                  ></button>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click=${this._handleMergeScheduleClick}
                        >Merge With Selected</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h6 class="edit-section-label mt-3">Apply a template:</h6>
            <div class="edit-section-content">
              <div class="edit-section-row">
                <select name="template" class="dropdown" id="template">
                  ${o}
                </select>
                <div class="apply-btn-group btn-group">
                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click=${this._handleApplyTemplateClick}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <h6 class="edit-section-label mt-3">Time off:</h6>
            <div class="edit-section-content">
              <div class="edit-section-row">
                <input
                  id="remove"
                  class="form-control"
                  type="text"
                  size="1"
                  name="remove"
                  list="people-list"
                />
                <datalist id="people-list">${l}</datalist>
                <div class="apply-btn-group btn-group">
                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click=${this._handleTimeOffClick}
                  >
                    Apply
                  </button>
                  <button
                    class="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                  ></button>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click=${this._handleUnscheduleClick}
                        >Remove from Schedule</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        `,p=b`
      <div class="accordion accordion-flush pb-3">
        <div class="accordion-item">
          <div
            class="accordion-button sidebar-heading collapsed mt-3"
            data-bs-toggle="collapse"
            data-bs-target="#reports-content"
            aria-expanded="false"
            aria-controls="reports-content"
          >
            <div class="flex-grow-1">Reports</div>
          </div>
          <div id="reports-content" class="accordion-collapse collapse">
            <div class="accordion-body reports">
              <div>
                <select name="report" class="dropdown" id="report">
                  <option value="hours">Hours</option>
                  <option value="call">Call</option>
                  <option value="holidays">Holidays</option>
                </select>
                <button
                  class="btn btn-primary dropdown-action"
                  @click=${this._handleRunClick}
                >
                  Run
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;return b`<nav>
      ${r} ${c} ${d} ${p}
    </nav>`}enableSave(t="Save"){const e=this.querySelector(".saveBtn");e.disabled=!1,e.classList.remove("btn-outline-primary","btn-danger"),e.classList.add("btn-primary"),e.innerText=t}disableSave(t="Saved"){const e=this.querySelector(".saveBtn");e.disabled=!0,e.classList.add("btn-outline-primary","btn-danger"),e.classList.remove("btn-primary"),e.innerText=t}errorSave(t="Error"){const e=this.querySelector(".saveBtn");e.disabled=!0,e.classList.add("btn-danger"),e.classList.remove("btn-outline-primary","btn-primary"),e.innerText=t}connectedCallback(){super.connectedCallback(),this._calEl=document.querySelector("#"+this.getAttribute("cal-id")),this._calEl&&(this._calEl.addEventListener("select",this._handleSelectDay.bind(this)),this._calEl.addEventListener("undo",this._updateUndoRedo.bind(this)),this._calEl.addEventListener("redo",this._updateUndoRedo.bind(this)),this._calEl.addEventListener("change",this._updateUndoRedo.bind(this)),this._selected=this._calEl.getSelected())}_handleUndoClick(t){var e;(e=this._calEl)==null||e.undo()}_handleRedoClick(t){var e;(e=this._calEl)==null||e.redo()}_handleSaveClick(t){this.dispatchEvent(new CustomEvent("save",{bubbles:!0,composed:!1}))}_handleSelectDay(t){this._selected=t.detail.selected,this.requestUpdate()}_handleCopyClick(t){var s;const e=((s=this._selected)==null?void 0:s.length)==1&&this._selected[0];e&&this._calData&&(this._dayData=structuredClone(this._calData[e])??{cals:{}},this.requestUpdate(),t.preventDefault())}_handleClearClick(t){this._dayData={cals:{}},this.requestUpdate(),t.preventDefault()}_handleApplyScheduleClick(t){if(this._selected.length>0){const e={};this._selected.forEach(s=>{e[s]=this._dayData}),this._calEl.updateData(e)}t.preventDefault()}_handleMergeScheduleClick(t){if(this._selected.length>0){const e=this._dayData,s={};this._selected.forEach(a=>{s[a]=structuredClone(this._calData[a]),s[a].cals=s[a].cals??{},e.note&&(s[a].note=e.note),Object.keys(e.cals??{}).length&&Object.entries(e.cals).forEach(([n,o])=>{s[a].cals[n]?o.events.forEach(l=>{var r;const i=(r=s[a].cals[n].events)==null?void 0:r.findIndex(c=>{var d,p;return((d=c.resource)==null?void 0:d.toLowerCase())==((p=l.resource)==null?void 0:p.toLowerCase())});i>=0?s[a].cals[n].events.splice(i,1,l):s[a].cals[n].events.push(l)}):s[a].cals[n]=o})}),this._calEl.updateData(s)}t.preventDefault()}_handleApplyTemplateClick(t){var a,n;const e=this.querySelector("#template").value,s=(n=(a=this._settings)==null?void 0:a.templates)==null?void 0:n[e];if(s!=null&&s.data){const o={};for(const l of this._selected)if((s==null?void 0:s.format)=="week"){const i=y(l).day();o[l]=s.data[i]}else o[l]=s.data;this._calEl.updateData(o)}t.preventDefault()}_handleTimeOffClick(t){var n;let e=!1;const s={},a=this.querySelector("#remove").value.toLowerCase();if(a){for(const o of this._selected){s[o]=structuredClone(this._calData[o]);const l=(n=s[o])==null?void 0:n.cals;if(l)for(const i in l)l[i].events.forEach(r=>{r.resource.toLowerCase()==a&&(r.schedule=["OFF"],e=!0)})}e&&this._calEl.updateData(s)}}_handleUnscheduleClick(t){var n;let e=!1;const s={},a=this.querySelector("#remove").value.toLowerCase();if(a){for(const o of this._selected){s[o]=structuredClone(this._calData[o]);const l=(n=s[o])==null?void 0:n.cals;if(l)for(const i in l){const r=l[i].events;l[i].events=r.filter(c=>c.resource.toLowerCase()!=a),e=e||r.length!=l[i].events.length}}e&&this._calEl.updateData(s)}}_handleRunClick(t){const e=this.querySelector("#report").value;let s=this._selected,a=null,n=null;const o=s!=null&&s.length?y(s.reduce((l,i)=>i>l?i:l)):null;if(o&&e=="hours"){const l=y(s[0]).year();if(s.map(d=>y(d).year()).every(d=>d==l)){const d=y(new Date(l,0)),p=y(new Date(l+1,0)),f=[],v=[];for(let g=d;g.isBefore(p,"day");g=g.add(1,"day")){const w=g.format("YYYY-MM-DD");v.push(w),(g.isBefore(o,"day")||g.isSame(o,"day"))&&f.push(w)}a=M(f,this._calData,this._settings),n=M(v,this._calData,this._settings)}if(s.length==1){const d=y(s).startOf("week");s=[1,2,3,4,5,6,7].map(p=>d.add(p,"day").format("YYYY-MM-DD"))}const r=M(s,this._calData,this._settings),c=Se(r,o,a,n);q.show("Hours",c),t.preventDefault()}}_updateUndoRedo(t){var a,n;const e=this.querySelector(".undoBtn"),s=this.querySelector(".redoBtn");e.disabled=!((a=this._calEl)!=null&&a.hasUndo()),s.disabled=!((n=this._calEl)!=null&&n.hasRedo())}_selectedDaysAsText(t){let e,s,a=[];if(t&&t.length<=4){for(const n of t){const o=y(n);e==null?a.push(o.format("M/D/YY")):o.subtract(1,"day").isSame(e)?s=!0:s&&e&&!o.subtract(1,"day").isSame(e)?(a.push("-",e.format("M/D/YY"),", ",o.format("M/D/YY")),s=!1):!s&&e&&a.push(", ",o.format("M/D/YY")),e=o}s&&a.push("-",e.format("M/D/YY"))}else a.push(t.length," ","days selected");return a.join("")}_alertTable(t){const e=Object.keys(t);if(e.length==0||!Object.values(t).some(n=>n.length))return b`<div class="text-center">No conflicts</div>`;const s=e.length>1,a=e.filter(n=>{var o;return((o=t[n])==null?void 0:o.length)>0}).map(n=>{var r;const l=`<tr>
          ${s?`<td class="alert-date">${y(n).format("M/D/YY")}</td>`:"<td></td>"}
          <td>${((r=t[n][0])==null?void 0:r.text)??""}</td>
        </tr>`,i=t[n].slice(1).map(c=>`<tr><td></td><td>${c.text??""}</td></tr>`);return[l,i]}).flat().join("");return b`<table>
      <tbody>
        ${_e(a)}
      </tbody>
    </table>`}}customElements.define("cal-action-panel",De);function j(h,t,e={}){var n;const s=(n=t==null?void 0:t.templates)==null?void 0:n.filter(o=>o.type=="regular"),a=xe(s);return e.context=e.context??{},e.context.compiledTemplates=a,e.maxDate=e.maxDate??Oe(h),Ee(h,t,[$e,ke],e)}function Ee(h,t,e=[],{days:s=null,minDate:a=ee(),maxDate:n=null,context:o=null}={}){const l={};return s=s??Object.keys(h),s=a?s.filter(i=>i>=a):s,s=n?s.filter(i=>i<=n):s,s.forEach(i=>{const r=l[i]??[];e.forEach(c=>{const d=c(i,h[i],h,t,o);(d==null?void 0:d.length)>0&&r.push(...d)}),r.length&&(l[i]=r)}),l}function ke(h,t,e,s,{compiledTemplates:a=null}){var n;if(a){const o=Object.entries(((n=s.options)==null?void 0:n.people)??{}).filter(([_,m])=>m.visible===0).map(([_,m])=>{var u;return(u=m.name)==null?void 0:u.toLowerCase()}),l=Object.entries(s.cals??{}).filter(([_,m])=>m.visible??!0).map(([_,m])=>_),i=Object.fromEntries(l.map(_=>{var m,u;return[_,(u=(m=s.cals)==null?void 0:m[_])==null?void 0:u.name]})),r=y(h).day(),c=[];Object.values(t.cals).forEach(({id:_,events:m})=>{m.forEach(u=>{var C,P,H,K,B,G;const S=(P=(C=u.resource)==null?void 0:C.trim())==null?void 0:P.toLowerCase(),T=Array.isArray(u.schedule)?(K=(H=u.schedule.join(", "))==null?void 0:H.trim())==null?void 0:K.toLowerCase():(G=(B=u.schedule)==null?void 0:B.trim())==null?void 0:G.toLowerCase();c.push({type:"event",calId:_,resource:S,schedule:T}),u.subitems&&u.subitems.forEach(L=>{var V,W,z;c.push({type:"subitem",calId:_,parentResource:S,parentSchedule:T,resource:(V=L.resource)==null?void 0:V.toLowerCase(),schedule:Array.isArray(L.schedule)?(W=L.schedule.join(", "))==null?void 0:W.toLowerCase():(z=L.schedule)==null?void 0:z.trim().toLowerCase()})})})});let p=!1,f=!1,v=null,g=null,w=null;for(const _ of a.reverse())if(v=_[r]??[],v!=null&&v.length){g=v,p=!0,w=new Array(v.length).fill(!1);const m=a.length==1?c:structuredClone(c);if(v.forEach((u,S)=>{if(l.indexOf(u.calId)<0||o.indexOf(u.resource.toLowerCase())>=0)w[S]=!0;else for(const T in m){const C=m[T];if(u.calId==C.calId&&u.type=="event"&&C.type=="event"&&(u.match=="exact"&&u.resource==C.resource&&u.schedule==C.schedule||u.match=="resource"&&u.resource==C.resource||u.match=="schedule"&&u.schedule==C.schedule)){m.splice(T,1),w[S]=!0;break}}}),w.every(u=>!!u)){f=!0;break}}return!p||f||g===null?[]:[{type:"info",text:"Changes: "+g.filter((m,u)=>!w[u]).filter(m=>m.resource&&m.resource!="*").map(m=>`${m.display} (${i[m.calId]})`).join(", ")}]}return[]}function xe(h){const t=[];if(h){for(const e of h)if(e.format=="week"){const s=Object.entries(e.data).map(([a,{cals:n}])=>[a,Te(n)]).filter(([a,n])=>n.length);s.length&&t.push(Object.fromEntries(s))}}return t}function Te(h){const t=[];return Object.values(h).forEach(({id:e,events:s})=>{s.forEach(({resource:a,schedule:n,subitems:o})=>{var i,r,c;const l=Array.isArray(n)?(r=(i=n.join(", "))==null?void 0:i.trim())==null?void 0:r.toLowerCase():(c=n==null?void 0:n.trim())==null?void 0:c.toLowerCase();a==""||a=="*"?t.push({priority:1,type:"event",match:"partialMatchShift",calId:e,display:"missing shift",schedule:l}):a!=""&&((n==null?void 0:n.length)>0||!Array.isArray(n)&&n)&&t.push({priority:0,type:"event",match:"exact",calId:e,resource:a==null?void 0:a.toLowerCase(),display:a,schedule:l})})}),t.length>0&&t.sort((e,s)=>e.priority-s.priority),t}function $e(h,t,e,s,a){var l;const n=Object.keys(((l=s.options)==null?void 0:l.people)??{}).map(i=>i.toLowerCase()),o=[];if(n.length>0){const i=new Set;Object.values(t.cals??{}).forEach(({events:r})=>{r.forEach(({resource:c,subitems:d})=>{c&&!n.includes(c.toLowerCase())&&i.add(c),d==null||d.forEach(({resource:p})=>{p&&!n.includes(p.toLowerCase())&&i.add(p)})})}),i.size>0&&o.push({type:"warn",text:"Unrecognized: "+Array.from(i.values()).join(", ")})}return o}function Oe(h){let t=ee();return Object.entries(h).forEach(([e,s])=>{(s.note||Object.values(s.cals??{}).findIndex(n=>{var o;return((o=n.events)==null?void 0:o.length)>0})>-1)&&e>t&&(t=e)}),t}class Le{constructor(){D(this,"_handleSettingsUpdated",Z(()=>{mainCal.alerts=j(mainCal.data,SETTINGS),mainCal.forceRefresh(),actionPanel.requestUpdate(),mainCal.readonly||(I({deptId:AUTH.deptId,userId:AUTH.user.id,settings:SETTINGS},{callback:this._handleSaveComplete}),actionPanel.enableSave())},250));this.calData=null,this.settings=null,this.alerts=null,this.auth=new ye("cal.html",window.location.search).auth}initEmbedMode(){new URLSearchParams(window.location.search).get("embed")=="1"&&(deptNameLabel.style.cssText="display:none !important",menu.style.cssText="display:none !important",sidebar.style.cssText="display:none !important",actionPanel.style.cssText="display:none !important")}async fetchData(t){var n;if(!t.user||t.deptId==null)throw new Error(`Unable to fetch due to invalid user and department ${(n=t.user)==null?void 0:n.id}, ${t.deptId}`);const e=ie(t.deptId),s=re(t.deptId),a=ce(t.deptId);return Promise.all([e,s,a]).then(async o=>{if(e.error||s.error||a.error)throw new Error(`Error fetching data: ${[e.error,s.error,a.error]}`);return{auth:t,dept:o[0].data,calData:o[1].data,settings:o[2].data}})}initUI({auth:t,dept:e,calData:s,settings:a}){var o;if(!t||!s||!a)throw new Error("Invalid login or user data");[this.auth,this.calData,this.settings]=[t,s,a],[window.AUTH,window.CAL_DATA,window.SETTINGS]=[t,s,a];const n=(o=t.user.user_metadata)==null?void 0:o.depts[e.id];this.renderHeader(t.user,e),calNav.classList.remove("d-none"),mainCal.loadData(s,a),mainCal.alerts=j(s,a),mainCal.readonly=!(n=="admin"||n=="edit"),calList.settings=a,peopleList.settings=a,setTimeout(()=>calNav.today(),0),logout.addEventListener("click",this._handleLogout),mainCal.addEventListener("select",this._handleCalSelect.bind(this)),mainCal.addEventListener("change",this._handleCalChange.bind(this)),calList.addEventListener("change",this._handleCalListChange.bind(this)),peopleList.addEventListener("change",this._handlePeopleChange.bind(this)),actionPanel.addEventListener("save",this._handleSave.bind(this)),window.addEventListener("beforeunload",this._checkDirtyOnUnload),document.addEventListener("keydown",this._handleHotkey.bind(this))}renderHeader(t,e){var s;!t||!t.email?userNameLabel.innerText="Not logged in":(s=t.user_metadata)!=null&&s.restricted?userNameLabel.innerText="View Only":userNameLabel.innerText=t.email,e.name&&(deptNameLabel.innerText=e.name),e.id&&(deptNameLabel.href="./cal.html?d="+e.id,settingsLink.href="./settings.html?d="+e.id,settingsLink.classList.remove("d-none"))}async _handleLogout(t){t.preventDefault(),await de.signOut(),window.location.href="./login.html"}_handleCalSelect(t){t.detail}_handleCalChange(t){if(!mainCal.readonly){const{data:e}=t.detail,s=Object.keys(e);if(s.length>0){Y({deptId:AUTH.deptId,data:e},{callback:this._handleSaveComplete}),actionPanel.enableSave();const a=j(e,this.settings);s.forEach(n=>mainCal.alerts[n]=a[n]??[]),mainCal.forceRefresh(s),actionPanel.requestUpdate()}}}_handleCalListChange(t){const{cal:e,color:s,checked:a}=t.detail;a!==void 0&&(SETTINGS.cals[e].visible=a?1:0),s!==void 0&&(SETTINGS.cals[e].color=s),this._handleSettingsUpdated()}_handlePeopleChange(t){SETTINGS=t.detail.settings,this._handleSettingsUpdated()}_handleSave(){mainCal.readonly||(Y({},{callback:this._handleSaveComplete,flush:!0}),I({},{callback:this._handleSaveComplete,flush:!0}))}_handleSaveComplete(t){t.filter(e=>e.error).length>0?(mainCal.readonly=!0,actionPanel.errorSave(),actionPanel.requestUpdate(),he("Unable to save. Please reload page.",{autohide:!1})):!F()&&!J()&&actionPanel.disableSave()}_handleHotkey(t){var a,n;const e=(n=(a=t.composedPath)==null?void 0:a.call(t))==null?void 0:n[0],s=(e==null?void 0:e.nodeName)=="INPUT"||(e==null?void 0:e.nodeName)=="DIV"&&e.contentEditable=="true";(t.ctrlKey||t.metaKey)&&t.keyCode==90&&!t.altKey&&!t.shiftKey?s||(t.preventDefault(),mainCal.undo()):(t.ctrlKey&&!t.shiftKey&&t.keyCode==89||t.metaKey&&t.shiftKey&&t.keyCode==90)&&!t.altKey?s||(t.preventDefault(),mainCal.redo()):(t.metaKey||t.ctrlKey)&&t.keyCode==83&&!t.altKey&&!t.shiftKey?(t.preventDefault(),this._handleSave()):t.altKey&&t.keyCode==84&&!t.ctrlKey&&!t.metaKey&&!t.shiftKey&&!s?(t.preventDefault(),calNav.today()):t.ctrlKey&&t.keyCode==71&&!t.metaKey&&!t.altKey&&!t.shiftKey&&(s||(t.preventDefault(),calNav.focus(),document.querySelector(".cal-navbar-datesel").click()))}_checkDirtyOnUnload(t){if(F()||J()){const e="Changes you made may not have been saved.";return(t||window.event).returnValue=e,e}}}const E=window.APP=new Le;window.AUTH=E.auth;window.CAL_DATA=E.calData;window.SETTINGS=E.settings;document.on("DOMContentLoaded",()=>{E.initEmbedMode(),E.auth.then(h=>E.fetchData(h).then(t=>E.initUI(t)).catch(t=>{console.log(t),mainCal.loadingText="Error loading calendar. Please refresh page to try again."})).catch(h=>{console.log(h),window.location.href=E.auth.redirect})});window.importData=async function(){let[h,t]=await Promise.all([fetch("./js/2024.json"),fetch("./js/settings.json")]);[h,t]=await Promise.all([h.json(),t.json()]);const e=Object.keys(SETTINGS.cals);let s=Object.keys(t.cals);if(s.length>e.length)throw new Error("Not enough existing calendars to import. Need >= "+e.length);const a={};s=s.filter(n=>!e.includes(n)),s.forEach((n,o)=>a[n]=e[o]);for(const n of Object.values(h))Object.keys(n.cals).forEach(o=>{n.cals[o].id=a[o],n.cals[a[o]]=n.cals[o],delete n.cals[o]});Y({deptId:AUTH.deptId,data:h},{flush:!0}),Object.keys(t.cals).forEach(n=>{t.cals[a[n]]=t.cals[n],delete t.cals[n]}),t.options.calOrder=t.options.calOrder.map(n=>a[n]);for(const n of t.templates)for(const o of Object.values(n.data))Object.keys(o.cals).forEach(l=>{o.cals[l].id=a[l],o.cals[a[l]]=o.cals[l],delete o.cals[l]});I({deptId:AUTH.deptId,userId:AUTH.user.id,settings:t},{flush:!0})};
