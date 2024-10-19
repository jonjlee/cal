var le=Object.defineProperty;var ie=(c,t,e)=>t in c?le(c,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):c[t]=e;var b=(c,t,e)=>ie(c,typeof t!="symbol"?t+"":t,e);import{s as I,d as p,i as Q,x as y,T as w,t as X,w as ce,f as re,n as Z,a as S,b as T,c as M,g as de,e as he,h as ue,j as fe,k as pe,l as B,m as K,o as me,p as ye}from"./db-gBYaOoHZ.js";import{A as ve}from"./auth-C9VuaBf4.js";import{C as D,U as x,I as ge,i as be,t as _e,e as we}from"./cal-checklist-Re8eiv-o.js";class De extends I{createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.monthTextDiv=this.querySelector(".cal-navbar-month"),this.dateSelector=this.querySelector(".cal-navbar-datesel"),this.dateSelectorIcon=this.querySelector(".cal-navbar-datesel-icon");const t=this.getAttribute("cal-id");this.parent=document.querySelector("#"+t),this.parent.addEventListener("displaying-month",this._handleDisplayMonth.bind(this)),this.dateSelector.addEventListener("change",()=>this.selectDate(this.dateSelector.value)),this.querySelector(".cal-navbar-datesel-icon").addEventListener("click",()=>this.dateSelector.showPicker()),this.querySelector("#cal-navbar-today-btn").addEventListener("click",()=>this.today()),this.querySelector("#cal-navbar-prevmonth").addEventListener("click",()=>this.prevMonth()),this.querySelector("#cal-navbar-nextmonth").addEventListener("click",()=>this.nextMonth())}today(){this.parent.scrollToDate(p(),"auto")}selectDate(t){this.parent.scrollToDate(t,"auto")}prevMonth(){this.parent.scrollToMonth(p(this.dateSelector.value).subtract(1,"month").format("YYYY-MM"))}nextMonth(){this.parent.scrollToMonth(p(this.dateSelector.value).add(1,"month").format("YYYY-MM"))}_handleDisplayMonth(t){t.detail.monthObj?(this.monthTextDiv.textContent=t.detail.monthObj.format("MMMM YYYY"),this.dateSelector.value=t.detail.monthObj.format("YYYY-MM-DD")):this.monthTextDiv.textContent=""}}customElements.define("cal-navbar",De);class Ce{constructor(){this.clear()}clear(){this._actions=[],this._curAction=-1}add(t){this._curAction++,this._actions[this._curAction]=t,this._actions[this._curAction+1]&&this._actions.splice(this._curAction+1)}undo(){return this.hasUndo()?this._actions[this._curAction--]:null}redo(){return this.hasRedo()?this._actions[++this._curAction]:null}hasUndo(){return this._curAction>=0}hasRedo(){return this._curAction<this._actions.length-1}}const xe="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cstyle%3e.spinner_b2T7{animation:spinner_xe7Q%20.8s%20linear%20infinite}.spinner_YRVV{animation-delay:-.65s}.spinner_c9oY{animation-delay:-.5s}@keyframes%20spinner_xe7Q{93.75%25,100%25{r:3px}46.875%25{r:.2px}}%3c/style%3e%3ccircle%20class='spinner_b2T7'%20cx='4'%20cy='12'%20r='3'/%3e%3ccircle%20class='spinner_b2T7%20spinner_YRVV'%20cx='12'%20cy='12'%20r='3'/%3e%3ccircle%20class='spinner_b2T7%20spinner_c9oY'%20cx='20'%20cy='12'%20r='3'/%3e%3c/svg%3e";class L extends I{constructor(){super();b(this,"forceRefresh",X((e=null)=>{const s=e?e.map(o=>"#day-"+o):"cal-day";this.requestUpdate(),this.shadowRoot.querySelectorAll(s).forEach(o=>o.forceRefresh())},250));this.data=null,this._undo=new Ce,this._selecting=!1,this._firstSelectedIdx=null,this._lastSelectedIdx=null}connectedCallback(){super.connectedCallback(),this.addEventListener("cal-day-change",this._handleDayChange),this.addEventListener("cal-day-mousedown",this._handleMouseDown),this.addEventListener("cal-day-mouseover",this._handleMouseOver),this.addEventListener("cal-day-mouseup",this._handleMouseUp)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("cal-day-change",this._handleDayChange),this.removeEventListener("cal-day-mousedown",this._handleMouseDown),this.removeEventListener("cal-day-mouseover",this._handleMouseOver),this.removeEventListener("cal-day-mouseup",this._handleMouseUp)}render(){return this.data?y`
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
    `:y`<div class="loading">
        ${this.loadingText??y`<img src="${xe}" style="height:48px" />`}
      </div>`}renderDay(e,s){var h,u,f,v;const o=p().format("YYYY-MM-DD");let n="";if(e.dayObj.day()%7===1)if(e.dayObj.date()<=7&&this._wholeWeekInSameMonth(e.dayObj)){const m=e.dayObj;n=y`<div
          id="month-${m.format("YYYY-MM")}"
          class="cal-month-gutter"
        >
          <div class="fw-bold">${m.year()}</div>
          <div>${m.format("MMM").toUpperCase()}</div>
        </div>`}else n=y`<div class="cal-month-gutter"></div>`;const a=e.dayStr,l=e.dayObj.date()==1?"first-day":w,i=((h=this.data)==null?void 0:h[a])??{cals:{}},r=(u=this.alerts)==null?void 0:u[a],d=this.settings??{cals:{},options:{}};return y`${n}
      <cal-day
        id="day-${a}"
        class="${l}"
        day="${e.display?e.display:e.dayObj.date()}"
        dim=${a<o||w}
        note="${((f=i==null?void 0:i.note)==null?void 0:f.text)||(i==null?void 0:i.note)||w}"
        noteStyle="${((v=i==null?void 0:i.note)==null?void 0:v.style)||w}"
        ?readonly=${this.readonly}
        ?selected=${e.selected}
        .index=${s}
        .dayObj=${e.dayObj}
        .data=${i}
        .alerts=${r}
        .settings=${d}
      ></cal-day>`}loadData(e,s){const o=Object.keys(e).reduce((l,i)=>i<l?i:l,p().format("YYYY-MM-DD")),n=this.start||o,a=this.end||p().endOf("year").add(2,"year");this.startDateObj=p(n).startOf("month").subtract(1,"day").startOf("week").add(1,"day"),this.endDateObj=p(a).endOf("month").endOf("week").add(1,"day"),this.days=this._fillDays(this.startDateObj,this.endDateObj),this.data=e,this.settings=s,this._sortDataByEvents(this.data),this._fillDaysInData(this.data,this.settings,this.days),this._undo.clear(),this.forceRefresh()}updateData(e){const s=Object.keys(e);if(s.length>0){const o={};return s.map(n=>{o[n]=structuredClone(this.data[n])}),this._undo.add({days:s,scrollPos:this.scrollPos,redoData:structuredClone(e),undoData:o}),this._updateDays(e),this.forceRefresh(s),this._dispatch("change",{data:e}),!0}return!1}hasUndo(){return this._undo.hasUndo()}hasRedo(){return this._undo.hasRedo()}undo(){const e=this._undo.undo();return e&&this._performUndoRedo("undo",e,e.undoData),e}redo(){const e=this._undo.redo();return e&&this._performUndoRedo("redo",e,e.redoData),e}_performUndoRedo(e,s,o){let n=s.days;const a=this.getSelected();this._selectDays(n);const l=n.concat(a);this._updateDays(o),this.forceRefresh(l),this.isDateVsible(n[n.length-1])||(this.scrollPos=s.scrollPos),this._dispatch(e,{action:s}),this._dispatch("change",{data:o}),this._dispatchSelect()}scrollToMonth(e,s="smooth"){const n="#day-"+p(e).date(1).format("YYYY-MM-DD"),a=this.shadowRoot.querySelector(n);a==null||a.scrollIntoView({behavior:s})}scrollToDate(e,s="smooth"){const o=p(e),n=this.shadowRoot.querySelector(".cal-container"),a="#day-"+o.format("YYYY-MM-DD"),l=this.shadowRoot.querySelector(a);this.scrollToMonth(e,s);const i=n.scrollTop+n.clientHeight-(l.offsetTop-n.offsetTop)-l.clientHeight;i<0&&(n.scrollTop-=i);const r=this.days.find(d=>d.dayObj.isSame(o,"day"));r&&(this._clearSelectedDays(),r.selected=!0,this._selecting=!1,this._firstSelectedIdx=l.index,this._lastSelectedIdx=l.index,this._dispatchSelect(),this.requestUpdate())}get scrollPos(){return this.shadowRoot.querySelector(".cal-container").scrollTop}set scrollPos(e){const s=this.shadowRoot.querySelector(".cal-container");s.scrollTop=e}isDateVsible(e){const s=this.shadowRoot.querySelector(".cal-container"),o="#day-"+p(e).format("YYYY-MM-DD"),n=this.shadowRoot.querySelector(o);if(n){const a=s.offsetTop+s.scrollTop,l=a+s.clientHeight,i=n.offsetTop,r=i+n.clientHeight;return i<=l&&r>a}return!1}getSelected(){return this.days?this.days.filter(e=>e.selected).map(e=>e.dayStr):[]}_sortDataByEvents(e){var s;if(e){for(const o in e)if(e[o].cals)for(const n in e[o].cals){const{events:a}=e[o].cals[n];if(a){a.sort((l,i)=>{var r,d;return((r=l.resource)==null?void 0:r.toLowerCase())<((d=i.resource)==null?void 0:d.toLowerCase())?-1:1});for(const l of a)(s=l.subitems)==null||s.sort((i,r)=>{var d,h;return((d=i.resource)==null?void 0:d.toLowerCase())<((h=r.resource)==null?void 0:h.toLowerCase())?-1:1})}}}return e}_fillDays(e,s){const o=[];for(let n=e;n<=s;n=n.add(1,"day")){const a={dayObj:n,dayStr:n.format("YYYY-MM-DD")};(n===e||n.date()===1)&&(a.display=n.format("MMM D")),o.push(a)}return o}_fillDaysInData(e,s,o){var a;const n=((a=s.options)==null?void 0:a.calOrder)??[];for(const{dayStr:l}of o){e[l]=e[l]||{};const i=e[l];i.cals=i.cals||{},n.forEach(r=>{i.cals[r]=i.cals[r]||{id:r,events:[]}})}return e}_wholeWeekInSameMonth(e){return e.day(1).month()==e.day(6).add(1,"day").month()}_monthStartingInWeek(e){const s=e.day(1),o=e.day(6).add(1,"day");return s.date()===1||s.date()>o.date()?o.date(1):null}_updateDays(e){Object.entries(e).forEach(([s,o])=>{this.data[s]=structuredClone(o)})}_clearSelectedDays(){this.days.forEach(e=>{e.selected=!1})}_selectDays(e){e=Array.isArray(e)?e:[e],this.days.forEach(s=>{s.selected=e.includes(s.dayStr)})}_selectDaysBetween(e,s){const o=Math.min(e,s),n=Math.max(e,s);for(let a=o;a<=n;a++)this.days[a].selected=!0}_dispatch(e,s){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:s}))}_dispatchSelect(){this._dispatch("select",{selected:this.getSelected()})}_handleDayChange(e){var l;const{index:s,data:o,prevData:n}=e.detail,a=(l=this.days[s])==null?void 0:l.dayStr;a&&JSON.stringify(o)!=JSON.stringify(n)&&(this._undo.add({days:[a],scrollPos:this.scrollPos,redoData:{[a]:structuredClone(o)},undoData:{[a]:n}}),this._dispatch("change",{data:{[a]:o}}))}_handleMouseDown(e){const{index:s,mouseDownEvent:o}=e.detail;o.ctrlKey||o.metaKey?s!==this._firstSelectedIdx&&(this.days[s].selected=!this.days[s].selected):o.shiftKey?(this._firstSelectedIdx==this._firstSelectedIdx,this._clearSelectedDays(),this._selectDaysBetween(this._firstSelectedIdx,s)):(this._clearSelectedDays(),this._selecting=!0,this._firstSelectedIdx=s,this._lastSelectedIdx=s,this.days[e.detail.index].selected=!0),this.requestUpdate()}_handleMouseOver(e){this._selecting&&this._firstSelectedIdx!==null&&(this._clearSelectedDays(),this._selectDaysBetween(this._firstSelectedIdx,e.detail.index),this.requestUpdate())}_handleMouseUp(e){this._selecting=!1,this._dispatchSelect()}_handleScroll(e){const s=e.target,o=s.scrollTop,n=100,l=Array.from(s.querySelectorAll(".first-day")).reverse().find(i=>i.offsetTop-n-s.offsetTop<o);this.currentMonth=l.dayObj,this.dispatchEvent(new CustomEvent("displaying-month",{bubbles:!1,composed:!1,detail:{monthObj:this.currentMonth}}))}}b(L,"styles",Q`
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
  `),b(L,"properties",{loadingText:{type:String},readonly:{type:Boolean},start:{type:String},end:{type:String},alerts:{type:Object,attribute:!1}});customElements.define("cal-component",L);class ee extends I{render(){var a;if(!this.settings)return;const{cals:t,options:e}=this.settings??{},{calOrder:s}=e??{},o=(a=s==null?void 0:s.filter(l=>{var i;return!((i=t[l])!=null&&i.archived)}))==null?void 0:a.map(l=>{var i,r,d,h;return{id:l,label:(i=t[l])==null?void 0:i.name,color:((r=t[l])==null?void 0:r.color)||((d=t[l])==null?void 0:d.background),checked:((h=t[l])==null?void 0:h.visible)??D}}),n=y`<cal-checklist
      checkable
      .items=${o??[]}
      @checked=${this._handleCalChange}
      @color-change=${this._handleCalChange}
    >
    </cal-checklist>`;return y` ${n} `}_handleCalChange(t){const{item:e,checked:s,color:o}=t.detail;this.dispatchEvent(new CustomEvent("change",{bubbles:!1,composed:!0,detail:{cal:e.id,checked:s,color:o}}))}}b(ee,"properties",{settings:{type:Object,attribute:!1}});customElements.define("cal-callist",ee);class Y extends I{willUpdate(){if(!this.settings)return;let t=this.settings.options??{};t=this.settings.options={peopleGroupOrder:[],peopleGroups:{},people:{},...t};for(const e in t.people)t.people[e].visible=t.people[e].visible??D;this._syncGroupsToPeopleChecked(t.peopleGroups,t.people)}render(){if(!this.settings)return;const{peopleGroupOrder:t,peopleGroups:e,people:s}=this.settings.options??{},o=t==null?void 0:t.map(d=>{var h;return{label:d,group:!0,checked:((h=e[d])==null?void 0:h.visible)??x}}),n=Object.entries(s??{}).sort(([d,h],[u,f])=>d.localeCompare(u)).map(([d,h])=>({label:h.name,group:!1,checked:h.visible??D,color:h.color})),a=y`<cal-checklist
      checkable
      .items=${o}
      @color-change=${this._handleColorChange}
      @checked=${this._handleGroupCheck}
    ></cal-checklist>`,l=y`<div class="divider"></div>`,i=y`<cal-checklist
      class="everyone-list"
      checkable
      colorable
      .items=${n}
      @color-change=${this._handleColorChange}
      @checked=${this._handlePersonCheck}
    >
    </cal-checklist>`,r=y`<div class="footer">
      <a href="#" @click=${this._handleSelectAll.bind(this,D)}
        >Show All</a
      >
      |
      <a href="#" @click=${this._handleSelectAll.bind(this,x)}>None</a>
    </div>`;return y`${a} ${l} ${i} ${r} ${l}`}_syncGroupsToPeopleChecked(t,e){for(const s in t){const o=t[s].names,n=o.filter(a=>{var l;return(l=e[a.toLowerCase()])==null?void 0:l.visible});t[s].visible=n.length==o.length?D:n.length>0?ge:x}}_dispatch(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!1,composed:!0,detail:{settings:this.settings}}))}_handleColorChange(t){const{item:e,color:s}=t.detail;e.group?this.settings.options.peopleGroups[e.label].color=s:this.settings.options.people[e.label.toLowerCase()].color=s,this._dispatch("change")}_handleGroupCheck(t){const{item:e,checked:s}=t.detail;for(const o of this.settings.options.peopleGroups[e.label].names){const n=this.settings.options.people[o.toLowerCase()];n&&(n.visible=s?D:x)}this._dispatch("change"),this.requestUpdate()}_handlePersonCheck(t){const{item:e,checked:s}=t.detail,o=this.settings.options.people[e.label.toLowerCase()];o.visible=s?D:x,this._dispatch("change"),this.requestUpdate()}_handleSelectAll(t){const e=this.settings.options.people;for(const s in e)e[s].visible=t;this._dispatch("change"),this.requestUpdate()}}b(Y,"properties",{settings:{type:Object,attribute:!1}}),b(Y,"styles",Q`
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
  `);customElements.define("cal-peoplelist",Y);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class A extends be{constructor(t){if(super(t),this.et=w,t.type!==_e.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===w||t==null)return this.vt=void 0,this.et=t;if(t===ce)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.vt;this.et=t;const e=[t];return e.raw=e,this.vt={_$litType$:this.constructor.resultType,strings:e,values:[]}}}A.directiveName="unsafeHTML",A.resultType=1;const Ie=we(A),q=document.querySelector("#reportModal"),Se=q.querySelector(".modal-title"),ke=q.querySelector(".modal-body"),G=new bootstrap.Modal(q),U={setTitle:c=>{Se.textContent=c},setBodyHtml:c=>{ke.innerHTML=c},show:(c,t)=>{c!==void 0&&U.setTitle(c),t!==void 0&&U.setBodyHtml(t),G.show()},hide:()=>{G.hide()}};function $(c,t,e){var l,i;const s={};re(t,c,({day:r,calId:d,resource:h,shift:u,subitemResource:f,subitemShift:v})=>{var g,C;const m=(C=(g=e.cals)==null?void 0:g[d])==null?void 0:C.type;if((m==null?void 0:m.toLowerCase())!="call"){h=f??h,u=v??u;const H=h.toLowerCase(),O=s[H]??{display:h},V=O[r]??[];V.push(u),O[r]=V,s[H]=O}});const o={},n=Object.keys(s).sort();for(const r of c)for(const d of n){const h=d.toLowerCase();let u=0;const f=s[h][r]??[];for(const v of f)u+=((l=Z(r,v))==null?void 0:l.hours)||0;o[h]=o[h]??{display:s[h].display},o[h][r]=u}n.forEach(r=>{o[r].total=Object.values(o[r]).reduce((d,h)=>d+(isNaN(h)?0:h),0)});const a=Object.values(((i=e.options)==null?void 0:i.people)??{}).map(r=>r.visible??!0?r.name.toLowerCase():null).filter(r=>r);for(const r of Object.keys(o))a.includes(r)||delete o[r];return{days:c,people:Object.keys(o),data:o}}function Ee(c,t=null,e=null,s=null){const{days:o,people:n,data:a}=c,l=n.map(d=>`<th>${a[d].display}</th>`),i=o.map(d=>{const h=`<td>${p(d).format("dd M/D/YY")}</td>`,u=n.map(f=>a[f][d]).map(f=>`<td>${f}</td>`);return[h,...u]}).map(d=>`<tr>${d.join("")}</tr>`),r=n.map(d=>`<td>${a[d].total}</td>`);if(i.push(`<tr><td><i>Total</i></td>${r.join("")}</tr>`),t&&e||s){if(i.unshift(`<tr><th colspan="${n.length+1}">Selected Days</th></tr>`),t&&e){const d=n.map(h=>{var u;return`<td>${((u=e.data[h])==null?void 0:u.total)??""}</td>`});i.push(`<tr><th>Total through ${p(t).format("M/D/YY")}</th>${d.join("")}</tr>`)}if(s){const d=n.map(h=>{var u;return`<td>${((u=s.data[h])==null?void 0:u.total)??""}</td>`});i.push(`<tr><th>Total for ${p(t).year()}</th>${d.join("")}</tr>`)}}return`<table class="table table-striped">
    <thead>
      <tr>
        <th></th>
        ${l.join("")}
      </tr>
    </thead>
    <tbody>
      ${i.join("")}
    </tbody>
  </table>`}class Oe extends I{constructor(){super(),this._dayData={cals:{}}}createRenderRoot(){return this}willUpdate(t){var e,s,o;this._calData=(e=this._calEl)==null?void 0:e.data,this._settings=((s=this._calEl)==null?void 0:s.settings)??{cals:{}},this._alerts=((o=this._calEl)==null?void 0:o.alerts)??{},this._renderInfo=this._createRenderInfo(this._selected,this._settings,this._dayData,this._alerts,this._calEl.readonly)}_createRenderInfo(t,e,s,o,n){var h,u;const a=this._selectedDaysAsText(t)||"Select a date",l=(t==null?void 0:t.length)==1?w:!0,i={};t.filter(f=>!!o[f]).forEach(f=>i[f]=o[f]);const r=(h=e.templates)==null?void 0:h.map((f,v)=>y`<option value="${v}">${f.name}</option>`),d=Object.keys(((u=e.options)==null?void 0:u.people)??{}).map(f=>y`<option value="${f}"></option>`);return{dayData:s,calSettings:e,selectedDaysText:a,selectedAlerts:i,copyDisabled:l,templateOptions:r,peopleDatalist:d,readonly:n}}render(){if(!this._renderInfo)return;const{dayData:t,calSettings:e,selectedDaysText:s,selectedAlerts:o,copyDisabled:n,templateOptions:a,peopleDatalist:l,readonly:i}=this._renderInfo,r=y`
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
    `,d=y`
      <h2 class="sidebar-heading">Details</h2>
      <div class="details">
        <div class="selected-days-label">${s}</div>
        <div class="selected-days-alerts">
          ${this._selected.length?this._alertTable(o):""}
        </div>
      </div>
    `,h=i?w:y`
          <div class="accordion accordion-flush">
            <div class="accordion-item">
              <div
                class="accordion-button sidebar-heading collapsed mt-3"
                data-bs-toggle="collapse"
                data-bs-target="#edit-content"
                aria-expanded="false"
                aria-controls="edit-content"
              >
                <div class="flex-grow-1">Edit</div>
              </div>
              <div id="edit-content" class="accordion-collapse collapse">
                <div class="accordion-body edit">
                  <h6 class="edit-section-label mt-3">Apply a template:</h6>
                  <div class="edit-section-content">
                    <div class="edit-section-row">
                      <select name="template" class="dropdown" id="template">
                        ${a}
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

                  <h6 class="edit-section-label mt-3">
                    Or, create template to apply:
                  </h6>
                  <div class="edit-section-content">
                    <cal-day
                      .data=${t}
                      .settings="${e}"
                    ></cal-day>
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
              </div>
            </div>
          </div>
        `,u=y`
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
    `;return y`<nav>
      ${r} ${d} ${h} ${u}
    </nav>`}enableSave(t="Save"){const e=this.querySelector(".saveBtn");e.disabled=!1,e.classList.remove("btn-outline-primary","btn-danger"),e.classList.add("btn-primary"),e.innerText=t}disableSave(t="Saved"){const e=this.querySelector(".saveBtn");e.disabled=!0,e.classList.add("btn-outline-primary","btn-danger"),e.classList.remove("btn-primary"),e.innerText=t}errorSave(t="Error"){const e=this.querySelector(".saveBtn");e.disabled=!0,e.classList.add("btn-danger"),e.classList.remove("btn-outline-primary","btn-primary"),e.innerText=t}connectedCallback(){super.connectedCallback(),this._calEl=document.querySelector("#"+this.getAttribute("cal-id")),this._calEl&&(this._calEl.addEventListener("select",this._handleSelectDay.bind(this)),this._calEl.addEventListener("undo",this._updateUndoRedo.bind(this)),this._calEl.addEventListener("redo",this._updateUndoRedo.bind(this)),this._calEl.addEventListener("change",this._updateUndoRedo.bind(this)),this._selected=this._calEl.getSelected())}_handleUndoClick(t){var e;(e=this._calEl)==null||e.undo()}_handleRedoClick(t){var e;(e=this._calEl)==null||e.redo()}_handleSaveClick(t){this.dispatchEvent(new CustomEvent("save",{bubbles:!0,composed:!1}))}_handleSelectDay(t){this._selected=t.detail.selected,this.requestUpdate()}_handleCopyClick(t){var s;const e=((s=this._selected)==null?void 0:s.length)==1&&this._selected[0];e&&this._calData&&(this._dayData=structuredClone(this._calData[e])??{cals:{}},this.requestUpdate(),t.preventDefault())}_handleClearClick(t){this._dayData={cals:{}},this.requestUpdate(),t.preventDefault()}_handleApplyScheduleClick(t){if(this._selected.length>0){const e={};this._selected.forEach(s=>{e[s]=this._dayData}),this._calEl.updateData(e)}t.preventDefault()}_handleMergeScheduleClick(t){if(this._selected.length>0){const e=this._dayData,s={};this._selected.forEach(o=>{s[o]=structuredClone(this._calData[o]),s[o].cals=s[o].cals??{},e.note&&(s[o].note=e.note),Object.keys(e.cals??{}).length&&Object.entries(e.cals).forEach(([n,a])=>{s[o].cals[n]?a.events.forEach(l=>{var r;const i=(r=s[o].cals[n].events)==null?void 0:r.findIndex(d=>{var h,u;return((h=d.resource)==null?void 0:h.toLowerCase())==((u=l.resource)==null?void 0:u.toLowerCase())});i>=0?s[o].cals[n].events.splice(i,1,l):s[o].cals[n].events.push(l)}):s[o].cals[n]=a})}),this._calEl.updateData(s)}t.preventDefault()}_handleApplyTemplateClick(t){var o,n;const e=this.querySelector("#template").value,s=(n=(o=this._settings)==null?void 0:o.templates)==null?void 0:n[e];if(s!=null&&s.data){const a={};for(const l of this._selected)if((s==null?void 0:s.format)=="week"){const i=p(l).day();a[l]=s.data[i]}else a[l]=s.data;this._calEl.updateData(a)}t.preventDefault()}_handleTimeOffClick(t){var n;let e=!1;const s={},o=this.querySelector("#remove").value.toLowerCase();if(o){for(const a of this._selected){s[a]=structuredClone(this._calData[a]);const l=(n=s[a])==null?void 0:n.cals;if(l)for(const i in l)l[i].events.forEach(r=>{r.resource.toLowerCase()==o&&(r.schedule=["OFF"],e=!0)})}e&&this._calEl.updateData(s)}}_handleUnscheduleClick(t){var n;let e=!1;const s={},o=this.querySelector("#remove").value.toLowerCase();if(o){for(const a of this._selected){s[a]=structuredClone(this._calData[a]);const l=(n=s[a])==null?void 0:n.cals;if(l)for(const i in l){const r=l[i].events;l[i].events=r.filter(d=>d.resource.toLowerCase()!=o),e=e||r.length!=l[i].events.length}}e&&this._calEl.updateData(s)}}_handleRunClick(t){const e=this.querySelector("#report").value;let s=this._selected,o=null,n=null;const a=s!=null&&s.length?p(s.reduce((l,i)=>i>l?i:l)):null;if(a&&e=="hours"){const l=p(s[0]).year();if(s.map(h=>p(h).year()).every(h=>h==l)){const h=p(new Date(l,0)),u=p(new Date(l+1,0)),f=[],v=[];for(let m=h;m.isBefore(u,"day");m=m.add(1,"day")){const g=m.format("YYYY-MM-DD");v.push(g),(m.isBefore(a,"day")||m.isSame(a,"day"))&&f.push(g)}o=$(f,this._calData,this._settings),n=$(v,this._calData,this._settings)}if(s.length==1){const h=p(s).startOf("week");s=[1,2,3,4,5,6,7].map(u=>h.add(u,"day").format("YYYY-MM-DD"))}const r=$(s,this._calData,this._settings),d=Ee(r,a,o,n);U.show("Hours",d),t.preventDefault()}}_updateUndoRedo(t){var o,n;const e=this.querySelector(".undoBtn"),s=this.querySelector(".redoBtn");e.disabled=!((o=this._calEl)!=null&&o.hasUndo()),s.disabled=!((n=this._calEl)!=null&&n.hasRedo())}_selectedDaysAsText(t){let e,s,o=[];if(t&&t.length<=4){for(const n of t){const a=p(n);e==null?o.push(a.format("M/D/YY")):a.subtract(1,"day").isSame(e)?s=!0:s&&e&&!a.subtract(1,"day").isSame(e)?(o.push("-",e.format("M/D/YY"),", ",a.format("M/D/YY")),s=!1):!s&&e&&o.push(", ",a.format("M/D/YY")),e=a}s&&o.push("-",e.format("M/D/YY"))}else o.push(t.length," ","days selected");return o.join("")}_alertTable(t){const e=Object.keys(t);if(e.length==0||!Object.values(t).some(n=>n.length))return y`<div class="text-center"></div>`;const s=e.length>1,o=e.filter(n=>{var a;return((a=t[n])==null?void 0:a.length)>0}).map(n=>{var r;const l=`<tr>
          ${s?`<td class="alert-date">${p(n).format("M/D/YY")}</td>`:"<td></td>"}
          <td>${((r=t[n][0])==null?void 0:r.text)??""}</td>
        </tr>`,i=t[n].slice(1).map(d=>`<tr><td></td><td>${d.text??""}</td></tr>`);return[l,...i]}).flat().join("");return y`<table>
      <tbody>
        ${Ie(o)}
      </tbody>
    </table>`}}customElements.define("cal-action-panel",Oe);function $e(c,t){const e={addedIds:[],removedIds:[],changes:{}},s=a=>Object.entries(a.cals??{}).filter(([l,i])=>{var r;return((r=i.events)==null?void 0:r.length)>0}).map(([l,i])=>l),o=s(c),n=s(t);for(const a of n){const l=o.indexOf(a);if(l<0)e.addedIds.push(a),e.changes[a]={addedResources:t.cals[a].events.map((i,r)=>({resource:i.resource,eventIdx:r}))};else{const i=te(c.cals[a].events,t.cals[a].events);Object.values(i).some(r=>r.length>0)&&(e.changes[a]=i),o.splice(l,1)}}return e.removedIds=Array.from(o),e.removedIds.forEach(a=>{e.changes[a]={removedResources:c.cals[a].events.map((l,i)=>({resource:l.resource,schedule:l.schedule,eventIdx:i}))}}),Re(e.changes),Object.values(e.changes).forEach(a=>{a.addedResources??(a.addedResources=[]),a.removedResources??(a.removedResources=[]),a.replacedResources??(a.replacedResources=[]),a.movedResources??(a.movedResources=[]),a.changedResources??(a.changedResources=[])}),e}function te(c,t){const e={addedResources:[],removedResources:[],changedResources:[]};c=c.map((n,a)=>({...n,index:a})),t=t.map((n,a)=>({...n,index:a})),F(c,t,!1),F(c,t,!0);const s=W(c),o=W(t);e.addedResources=J(s,o),e.removedResources=J(o,s);for(const[n,a]of Object.entries(s)){const l=je(a,o[n]);e.changedResources.push(...l)}return e}function Re(c){var t,e,s,o;if(c&&Object.keys(c).length)for(const[n,a]of Object.entries(c)){for(let l=0;l<((t=a.removedResources)==null?void 0:t.length);l++){let i=!1;const r=a.removedResources[l];for(const[d,h]of Object.entries(c))if(n!==d){if(i)break;for(let u=0;u<((e=h.addedResources)==null?void 0:e.length);u++){const f=h.addedResources[u];if(r.resource===f.resource){f.fromCalId=n,f.fromEventIdx=r.eventIdx,h.movedResources??(h.movedResources=[]),h.movedResources.push(f),h.addedResources.splice(u,1),i=!0;break}}}i&&(a.removedResources.splice(l,1),l--)}((s=a.removedResources)==null?void 0:s.length)===1&&((o=a.addedResources)==null?void 0:o.length)===1&&a.removedResources[0]!==a.addedResources[0]&&(a.replacedResources??(a.replacedResources=[]),a.replacedResources.push(a.addedResources[0]),a.replacedResources[0].fromResource=a.removedResources[0].resource,a.replacedResources[0].fromEventIdx=a.removedResources[0].eventIdx,a.removedResources=[],a.addedResources=[])}return c}const W=c=>{const t={};return c.forEach((e,s)=>{const o=e.resource.toLowerCase();t[o]??(t[o]=[]),t[o].push(e)}),t},je=(c,t)=>{const e=[],s=[];c.forEach(({resource:n,schedule:a,index:l})=>{const i=t.find(r=>se(a,r.schedule));i?s.push(i.index):e.push({resource:n,srcSchedule:a,eventIdx:l})});const o=t.find(({index:n})=>!s.includes(n));return o&&e.forEach(n=>{n.cmpSchedule=o.schedule,n.cmpEventIdx=o.index}),e},se=(c,t)=>{if(c.length!==t.length)return!1;const e=new Set(c.map(s=>s.toLowerCase()));return t.every(s=>e.has(s.toLowerCase()))},Te=(c,t,e=!1)=>{var s,o;return(((s=c.resource)==null?void 0:s.toLowerCase())===((o=t.resource)==null?void 0:o.toLowerCase())||e&&c.resource==="*")&&se(c.schedule,t.schedule)},z=(c,t,e=!1)=>{var l;const s=t.findIndex(i=>Te(c,i,e));if(s>=0)return{found:!0,index:s};const o=((l=c.schedule)==null?void 0:l.length)===1&&c.schedule[0].trim().toLowerCase()==="off",n=t.findIndex(i=>i.resource.toLowerCase()===c.resource.toLowerCase())>=0;return{found:o&&!n,index:s}},F=(c,t,e)=>{for(let s=0;s<c.length;s++){const{found:o,index:n}=z(c[s],t,e);o&&(c.splice(s,1),s--),n>=0&&t.splice(n,1)}for(const[s,o]of t.entries()){const{found:n}=z(o,c,e);n&&t.splice(s,1)}},J=(c,t)=>{const e=[];for(const[s,o]of Object.entries(t)){const n=c[s];n!=null&&n.length||(e.push(...o.filter(a=>a.resource!="*").map(a=>({resource:a.resource,schedule:a.schedule,eventIdx:a.index}))),delete t[s])}return e};function Me(c,t,e={}){const s={},o=Object.keys(c??{}).filter(n=>(!e.minDate||n>=e.minDate)&&(!e.maxDate||n<=e.maxDate)).sort();if(o.length>0&&(t==null?void 0:t.length)>0){const n=p(o[0]).startOf("week").add(1,"day"),a=p(o[o.length-1]);for(let l=n;l<=a;l=l.add(1,"week")){const i=l.add(1,"week"),r=o.filter(h=>l.isSame(h)||i.isSame(h)||l.isBefore(h)&&i.isAfter(h)),d=Ye(c,t,r);Object.assign(s,d)}}return s}function Le(c,t,e={}){const s=[];if(!c[t])return s;const{changes:o}=c[t];for(const[n,a]of Object.entries(o)){const l=e[n]||n;s.push(...a.movedResources.map(i=>({text:`${l}: ${i.resource} moved from ${e[i.fromCalId]||i.fromCalId}`,calId:n,eventIdx:i.eventIdx}))),s.push(...a.replacedResources.map(i=>({text:`${l}: ${i.resource} replaced ${i.fromResource}`,calId:n,eventIdx:i.eventIdx}))),s.push(...a.addedResources.map(i=>({text:`${l}: ${i.resource} added`,calId:n,eventIdx:i.eventIdx}))),s.push(...a.removedResources.map(i=>({text:`${l}: ${i.resource} was ${i.schedule?i.schedule.join(", "):"-"}`,calId:n,eventIdx:-1}))),s.push(...a.changedResources.map(({resource:i,srcSchedule:r,cmpSchedule:d,eventIdx:h,cmpEventIdx:u})=>({text:`${l}: ${i} was ${r.join(", ")}`,calId:n,eventIdx:u})))}return s.forEach(n=>n.type="info"),s}function Ye(c,t,e){const s=t.map(n=>Ae(c,n,e));if(s.length===0||s.findIndex(n=>Object.keys(n).length===0)>=0)return{};let o={idx:null,nDays:1/0,nChanges:1/0};for(let n=0;n<s.length;n++){let a=0,l=0;if(s[n])for(const[i,r]of Object.entries(s[n]))(r.addedIds.length||r.removedIds.length||Object.keys(r.changes).length>0)&&(a++,l+=Object.values(r.changes??{}).reduce((d,h)=>d+Array.isArray(h)?h.length:0,0));(a<o.nDays||a===o.nDays&&l<o.nChanges)&&(o={idx:n,nDays:a,nChanges:l})}return s[o.idx]}function Ae(c,t,e){const s={};for(const o of e){const n=c[o],a=t.data[p(o).day()],l=$e(a,n);(l.addedIds.length||l.removedIds.length||Object.keys(l.changes).length)&&(s[o]=l)}return s}function Ue(c,t,e={}){var a;const s={},o=new Set([...Object.keys(c),...Object.keys(t)]),n=l=>Object.entries(l).filter(([i,r])=>{var d;return((d=r.events)==null?void 0:d.length)>0}).map(([i,r])=>i);for(const l of o){const i=c[l],r=t[l];if(!(e.minDate&&l<e.minDate||e.maxDate&&l>e.maxDate))if(!i)s[l]={addedIds:n(r.cals),removedIds:[],eventChanges:{}};else if(!r)s[l]={addedIds:[],removedIds:n(i.cals),eventChanges:{}};else{const d={addedIds:[],removedIds:[],eventChanges:{}},h=new Set(Object.keys(i.cals)),u=new Set(Object.keys(r.cals));for(const f of u){if(!h.has(f))((a=r.cals[f].events)==null?void 0:a.length)>0&&d.addedIds.push(f);else{const v=te(i.cals[f].events,r.cals[f].events);Object.values(v).some(m=>m.length>0)&&(d.eventChanges[f]=v)}h.delete(f)}d.removedIds=Array.from(h),(d.addedIds.length||d.removedIds.length||Object.keys(d.eventChanges).length)&&(s[l]=d)}}return s}function qe(c,t,e={}){const s=[];if(!c[t])return s;const{addedIds:o,removedIds:n,eventChanges:a}=c[t];s.push(...o.map(l=>`${e[l]||l}: schedule added`)),s.push(...n.map(l=>`${e[l]||l}: schedule cleared`));for(const[l,i]of Object.entries(a)){const r=e[l]||l;s.push(...i.addedResources.map(d=>`${r}: ${d.resource} added`)),s.push(...i.removedResources.map(d=>`${r}: ${d.resource} removed`)),s.push(...i.changedResources.map(({resource:d,srcSchedule:h,cmpSchedule:u,eventIdx:f,cmpEventIdx:v})=>`${r}: ${d} ${h.join(", ")} -> ${u.join(", ")}`))}return s}function Ne(c,t,e={}){const s={},o=He(c,e.callCalIds),n=l=>Object.entries(l).filter(([i,r])=>{var d;return((d=r.events)==null?void 0:d.length)>0}).map(([i,r])=>i),a=new Set([...n(c),...Object.keys(t)]);for(const l of a){if(e.minDate&&l<e.minDate||e.maxDate&&l>e.maxDate)continue;const i=o[l]??{},r=t[l]??{},d=Ve(i,r);d&&(s[l]=d)}return s}function Pe(c,t,e={}){const s=[];if(!c[t])return s;const{addedIds:o,removedIds:n,changedIds:a}=c[t];s.push(...o.map(l=>({text:`${e[l]||"Calendar ("+l+")"}: has events in Epic`,calId:l,eventIdx:-1}))),s.push(...n.map(l=>({text:`${e[l]||l}: has no events in Epic`,calId:l,eventIdx:-1})));for(const[l,i]of Object.entries(a)){const r=e[l]||l;s.push(...i.addedResources.map(d=>({text:`${r}: ${d} in Epic`,calId:l,eventIdx:-1}))),s.push(...i.removedResources.map(d=>({text:`${r}: ${d.resource} not in Epic`,calId:l,eventIdx:d.eventIdx}))),s.push(...i.changedResources.map(({resource:d,desc:h,eventIdx:u})=>({text:`${d} (${r}) ${h}`,calId:l,eventIdx:u})))}return s.forEach(l=>l.type="info"),s}function He(c,t=[]){var s;const e={};for(const[o,n]of Object.entries(c)){const a=e[o]??(e[o]={});for(const[l,i]of Object.entries(n.cals))if(!(t&&t.includes(l))&&i.events&&i.events.length>0){const r=a[l]??(a[l]={});for(const[d,h]of i.events.entries())if(((s=h.schedule)==null?void 0:s.length)>0){const u=h.resource;r[u]??(r[u]=[]);for(const f of h.schedule){const v=Z(o,f);if(v){const{start:m,end:g,off:C}=v;m&&r[u].push({type:"shift_start",ts:m.format("YYYY-MM-DD HH:mm"),eventIdx:d}),g&&r[u].push({type:"shift_end",ts:g.format("YYYY-MM-DD HH:mm"),eventIdx:d})}else r[u].push({type:"error",desc:"invalid shift: "+JSON.stringify(f),ts:null,eventIdx:d});r[u].sort((m,g)=>{var C;return((C=m.ts)==null?void 0:C.localeCompare(g.ts))??1})}}}}return e}function Ve(c,t){const e={addedIds:[],removedIds:[],changedIds:{}},s=new Set([...Object.keys(c),...Object.keys(t)]);for(const o of s){const n=c[o],a=t[o];if(!n)e.addedIds.push(o);else if(!a)e.removedIds.push(o);else{const l=Be(n,a);l&&(e.changedIds[o]=l)}}return e}function Be(c,t){const e={addedResources:[],removedResources:[],changedResources:[]},s=n=>{const a=n.filter(d=>d.type==="shift_start").map(d=>d.ts),l=n.filter(d=>d.type==="shift_end").map(d=>d.ts),i=n.filter(d=>d.type==="unavailable_start").map(d=>d.ts),r=n.filter(d=>d.type==="unavailable_end").map(d=>d.ts);return a.length>0&&a.length==i.length&&l.length==r.length&&a.every(d=>i.includes(d))&&l.every(d=>r.includes(d))},o={...Object.fromEntries([...Object.keys(t).map(n=>[n.toLowerCase(),{name:n}]),...Object.keys(c).map(n=>{var a;return[n.toLowerCase(),{name:n,eventIdx:(a=c[n][0])==null?void 0:a.eventIdx}]})])};return Object.keys(o).forEach(n=>{const a=o[n].name,l=c[a]??[],i=t[a]??[],r=s(i)?[]:i;if(l.length===0&&r.length>0)e.addedResources.push(a);else if(r.length===0&&l.length>0)e.removedResources.push({resource:a,eventIdx:o[n].eventIdx});else{const d=Ke(l,r);d&&e.changedResources.push({resource:a,...d})}}),e.addedResources.length===0&&e.removedResources.length===0&&e.changedResources.length===0?null:e}function Ke(c,t){var l,i,r,d;let e=0,s=0;const o=c.filter(h=>h.type=="error"||!h.ts);if(o.length>0)return{desc:o[0].desc||"Problem with schedule",eventIdx:o[0].eventIdx};t=t.filter(h=>h.ts);let n="off",a="off";for(;e<c.length||s<t.length;){let h=((l=c[e])==null?void 0:l.ts)??t[s].ts;h=t[s].ts<h?t[s].ts:h;let u,f,v=null;const m=[],g=[];do u=((i=c[e])==null?void 0:i.ts)===h&&c[e],f=((r=t[s])==null?void 0:r.ts)===h&&t[s],(u==null?void 0:u.ts)===h&&(m.push(u.type),v=u.eventIdx,e++),(f==null?void 0:f.ts)===h&&(g.push(f.type),s++);while(u&&u.ts===h||f&&f.ts===h);if(m.includes("shift_end")?n="off":m.includes("shift_start")&&(n="shift"),g.includes("shift_end")?a="off":g.includes("unavailable_end")?a="shift":g.includes("unavailable_start")?a="unavailable":g.includes("shift_start")&&(a="shift"),n!==a&&a!=="unavailable")return{desc:"differs at "+(p(h).isValid()?p(h).format("h:mmA"):h),eventIdx:v??((d=c[0])==null?void 0:d.eventIdx)}}return null}const N="default",ae="changes",ne="epic";let oe=N,k={};function R(c,t={}){oe=c,k=t}function j(c,t,e={}){switch(oe){case N:return Ge(c,t,{...k,options:e});case ae:return We(c,t,{...k,options:e});case ne:return ze(c,t,{...k,options:e});default:return{}}}function Ge(c,t,e={}){var a;if(!e.showChanges)return{};const s=(a=t==null?void 0:t.templates)==null?void 0:a.filter(l=>l.type=="regular");e.minDate=e.minDate??S(),e.maxDate=e.maxDate??E(c);const o=Fe(c,t,[Je],e),n=Me(c,s,e);return Object.keys(n).forEach(l=>{o[l]??(o[l]=[]),o[l]=o[l].concat(Le(n,l,P(t)))}),o}function We(c,t,e={}){const s=e.prevData;if(e.minDate=e.minDate??S(),!e.maxDate){const[a,l]=[E(c),E(s)];e.maxDate=a>l?a:l}if(!s)return{};const o=Ue(s,c,e),n={};return Object.keys(o).forEach(a=>{const l=qe(o,a,P(t));n[a]=l.map(i=>({type:"info",text:i}))}),n}function ze(c,t,e={}){const s=e.epicData??{};if(e.minDate=e.minDate??S(),!e.maxDate){const l=E(c),i=Object.keys(s).reduce((r,d)=>r>d?r:d,"");e.maxDate=l>i?l:i}if(!s)return{};const o=t.cals??{};e.callCalIds=Object.keys(o).filter(l=>o[l].type=="call");const n=Ne(c,s,e),a={};return Object.keys(n).forEach(l=>{a[l]=Pe(n,l,P(t))}),a}const Fe=(c,t,e=[],{days:s=null,minDate:o=S(),maxDate:n=null,context:a=null}={})=>{const l={};return s=s??Object.keys(c),s=o?s.filter(i=>i>=o):s,s=n?s.filter(i=>i<=n):s,s.forEach(i=>{const r=l[i]??[];e.forEach(d=>{const h=d(i,c[i],c,t,a);(h==null?void 0:h.length)>0&&r.push(...h)}),r.length&&(l[i]=r)}),l},Je=(c,t,e,s,o)=>{var l;const n=Object.keys(((l=s.options)==null?void 0:l.people)??{}).map(i=>i.toLowerCase()),a=[];if(n.length>0){const i=new Set;Object.values(t.cals??{}).forEach(({events:r})=>{r.forEach(({resource:d,subitems:h})=>{d&&!n.includes(d.toLowerCase())&&i.add(d),h==null||h.forEach(({resource:u})=>{u&&!n.includes(u.toLowerCase())&&i.add(u)})})}),i.size>0&&a.push({type:"warn",text:"Unrecognized: "+Array.from(i.values()).join(", ")})}return a},E=c=>{let t=S();return c&&Object.entries(c).forEach(([e,s])=>{(s.note||Object.values(s.cals??{}).findIndex(n=>{var a;return((a=n.events)==null?void 0:a.length)>0})>-1)&&e>t&&(t=e)}),t},P=c=>Object.fromEntries(Object.entries(c.cals??{}).map(([t,e])=>[t,e.name]));class Qe{constructor(){b(this,"_handleSettingsUpdated",X(()=>{mainCal.alerts=j(mainCal.data,SETTINGS),mainCal.forceRefresh(),actionPanel.requestUpdate(),mainCal.readonly||(M({deptId:AUTH.deptId,userId:AUTH.user.id,settings:SETTINGS},{callback:this._handleSaveComplete}),actionPanel.enableSave())},250));this.calData=null,this.settings=null,this.alerts=null,this.readonly=!1,this.auth=new ve("cal.html",window.location.search).auth}initEmbedMode(){new URLSearchParams(window.location.search).get("embed")=="1"&&(deptNameLabel.style.cssText="display:none !important",menu.style.cssText="display:none !important",sidebar.style.cssText="display:none !important",actionPanel.style.cssText="display:none !important")}async fetchData(t){var n;if(!t.user||t.deptId==null)throw new Error(`Unable to fetch due to invalid user and department ${(n=t.user)==null?void 0:n.id}, ${t.deptId}`);const e=de(t.deptId),s=he(t.deptId),o=ue(t.deptId);return Promise.all([e,s,o]).then(async a=>{if(e.error||s.error||o.error)throw new Error(`Error fetching data: ${[e.error,s.error,o.error]}`);return{auth:t,dept:a[0].data,calData:a[1].data,settings:a[2].data}})}initUI({auth:t,dept:e,calData:s,settings:o}){var l;if(!t||!s||!o)throw new Error("Invalid login or user data");[this.auth,this.calData,this.settings]=[t,s,o],[window.AUTH,window.CAL_DATA,window.SETTINGS]=[t,s,o];const n=(l=t.user.user_metadata)==null?void 0:l.depts[e.id];this.renderHeader(t.user,e),calNav.classList.remove("d-none");const a=window.innerWidth<=768;this.readonly=a||!(n=="admin"||n=="edit"),mainCal.loadData(s,o),mainCal.readonly=this.readonly,calList.settings=o,peopleList.settings=o,setTimeout(()=>calNav.today(),0),this._handleChangeView(),logout.addEventListener("click",this._handleLogout),mainCal.addEventListener("select",this._handleCalSelect.bind(this)),mainCal.addEventListener("change",this._handleCalChange.bind(this)),calList.addEventListener("change",this._handleCalListChange.bind(this)),peopleList.addEventListener("change",this._handlePeopleChange.bind(this)),viewDefault.addEventListener("change",this._handleChangeView.bind(this)),viewChanges.addEventListener("change",this._handleChangeView.bind(this)),showHighlights.addEventListener("change",this._handleChangeView.bind(this)),viewChangesDate.addEventListener("change",this._handleViewChangesDate.bind(this)),showPriorData.addEventListener("change",this._handleViewChangesDate.bind(this)),viewEpic.addEventListener("change",this._handleChangeView.bind(this)),actionPanel.addEventListener("save",this._handleSave.bind(this)),window.addEventListener("beforeunload",this._checkDirtyOnUnload),document.addEventListener("keydown",this._handleHotkey.bind(this))}renderHeader(t,e){var s;!t||!t.email?userNameLabel.innerText="Not logged in":(s=t.user_metadata)!=null&&s.restricted?userNameLabel.innerText="View Only":userNameLabel.innerText=t.email,e.name&&(deptNameLabel.innerText=e.name),e.id&&(deptNameLabel.href="./cal.html?d="+e.id,profileLink.href="./profile.html?d="+e.id,settingsLink.href="./settings.html?d="+e.id,settingsLink.classList.remove("d-none"))}refreshAlerts(t,e){e?e.forEach(s=>mainCal.alerts[s]=t[s]??[]):mainCal.alerts=t,mainCal.forceRefresh(e),actionPanel.requestUpdate()}async _handleLogout(t){t.preventDefault(),await fe.signOut(),window.location.href="./login.html"}_handleCalSelect(t){t.detail}_handleCalChange(t){if(!mainCal.readonly){const{data:e}=t.detail,s=Object.keys(e);if(s.length>0){T({deptId:AUTH.deptId,data:e},{callback:this._handleSaveComplete}),actionPanel.enableSave();const o=j(e,this.settings);this.refreshAlerts(o,s)}}}_handleCalListChange(t){const{cal:e,color:s,checked:o}=t.detail;o!==void 0&&(SETTINGS.cals[e].visible=o?1:0),s!==void 0&&(SETTINGS.cals[e].color=s),this._handleSettingsUpdated()}_handlePeopleChange(t){SETTINGS=t.detail.settings,this._handleSettingsUpdated()}_handleSave(){mainCal.readonly||(T({},{callback:this._handleSaveComplete,flush:!0}),M({},{callback:this._handleSaveComplete,flush:!0}))}_handleSaveComplete(t){t.filter(e=>e.error).length>0?(mainCal.readonly=!0,actionPanel.errorSave(),actionPanel.requestUpdate(),pe("Unable to save. Please reload page.",{autohide:!1})):!B()&&!K()&&actionPanel.disableSave()}async _handleChangeView(t){var s,o;if(epicTs.innerText="",viewDefault.checked)R(N,{showChanges:showHighlights.checked}),mainCal.loadData(this.calData,this.settings),mainCal.readonly=this.readonly;else if(viewChanges.checked){const n=p(viewChangesDate.value);let a=null;if(n.isValid()){const l=await me(this.auth.deptId,n.format("YYYY-MM-DD"));l.error||(a=l.data)}R(ae,{prevData:a==null?void 0:a.data}),showPriorData.checked&&(a!=null&&a.data)?(mainCal.loadData(a.data,this.settings),mainCal.readonly=!0):(mainCal.loadData(this.calData,this.settings),mainCal.readonly=this.readonly)}else if(viewEpic.checked){const n=await ye(this.auth.deptId);if(!n.error){const a=p(((s=n.data)==null?void 0:s.source_ts)||null);a.isValid()?epicTs.innerText=`Data from ${a.format("M/D/YY H:mmA")}`:epicTs.innerText="No Epic data available"}R(ne,{epicData:(o=n.data)==null?void 0:o.data})}const e=j(this.calData,mainCal.settings);this.refreshAlerts(e)}_handleViewChangesDate(t){viewChanges.checked||(viewChanges.checked=!0),this._handleChangeView()}_handleHotkey(t){var o,n;const e=(n=(o=t.composedPath)==null?void 0:o.call(t))==null?void 0:n[0],s=(e==null?void 0:e.nodeName)=="INPUT"||(e==null?void 0:e.nodeName)=="DIV"&&e.contentEditable=="true";(t.ctrlKey||t.metaKey)&&t.keyCode==90&&!t.altKey&&!t.shiftKey?s||(t.preventDefault(),mainCal.undo()):(t.ctrlKey&&!t.shiftKey&&t.keyCode==89||t.metaKey&&t.shiftKey&&t.keyCode==90)&&!t.altKey?s||(t.preventDefault(),mainCal.redo()):(t.metaKey||t.ctrlKey)&&t.keyCode==83&&!t.altKey&&!t.shiftKey?(t.preventDefault(),this._handleSave()):t.altKey&&t.keyCode==84&&!t.ctrlKey&&!t.metaKey&&!t.shiftKey&&!s?(t.preventDefault(),calNav.today()):t.ctrlKey&&t.keyCode==71&&!t.metaKey&&!t.altKey&&!t.shiftKey&&(s||(t.preventDefault(),calNav.focus(),document.querySelector(".cal-navbar-datesel").click()))}_checkDirtyOnUnload(t){if(B()||K()){const e="Changes you made may not have been saved.";return(t||window.event).returnValue=e,e}}}const _=window.APP=new Qe;window.AUTH=_.auth;window.CAL_DATA=_.calData;window.SETTINGS=_.settings;document.on("DOMContentLoaded",()=>{_.initEmbedMode(),_.auth.then(c=>_.fetchData(c).then(t=>_.initUI(t)).catch(t=>{console.log(t),mainCal.loadingText="Error loading calendar. Please refresh page to try again."})).catch(c=>{console.log(c),window.location.href=_.auth.redirect})});window.importData=async function(){let[c,t]=await Promise.all([fetch("./js/2024.json"),fetch("./js/settings.json")]);[c,t]=await Promise.all([c.json(),t.json()]);const e=Object.keys(SETTINGS.cals);let s=Object.keys(t.cals);if(s.length>e.length)throw new Error("Not enough existing calendars to import. Need >= "+e.length);const o={};s=s.filter(n=>!e.includes(n)),s.forEach((n,a)=>o[n]=e[a]);for(const n of Object.values(c))Object.keys(n.cals).forEach(a=>{o[a]&&(n.cals[a].id=o[a],n.cals[o[a]]=n.cals[a],delete n.cals[a])});T({deptId:AUTH.deptId,data:c},{flush:!0}),Object.keys(t.cals).forEach(n=>{o[n]&&(t.cals[o[n]]=t.cals[n],delete t.cals[n])}),t.options.calOrder=t.options.calOrder.map(n=>o[n]??n);for(const n of t.templates)for(const a of Object.values(n.data))Object.keys(a.cals).forEach(l=>{o[l]&&(a.cals[l].id=o[l],a.cals[o[l]]=a.cals[l],delete a.cals[l])});M({deptId:AUTH.deptId,userId:AUTH.user.id,settings:t},{flush:!0})};
