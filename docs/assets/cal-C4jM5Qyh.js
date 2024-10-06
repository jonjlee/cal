var he=Object.defineProperty;var ue=(d,t,e)=>t in d?he(d,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):d[t]=e;var S=(d,t,e)=>ue(d,typeof t!="symbol"?t+"":t,e);import{s as j,d as v,i as ne,x as _,T as E,t as oe,w as pe,f as fe,n as le,a as A,b as N,c as H,g as me,e as ye,h as ve,j as ge,k as be,l as ee,m as te,o as _e,p as we}from"./db-DgbyiZOf.js";import{C as I,U as $,I as Ce,i as De,t as Se,e as xe,A as Ee}from"./auth-DJ3NjbAr.js";class ke extends j{createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.monthTextDiv=this.querySelector(".cal-navbar-month"),this.dateSelector=this.querySelector(".cal-navbar-datesel"),this.dateSelectorIcon=this.querySelector(".cal-navbar-datesel-icon");const t=this.getAttribute("cal-id");this.parent=document.querySelector("#"+t),this.parent.addEventListener("displaying-month",this._handleDisplayMonth.bind(this)),this.dateSelector.addEventListener("change",()=>this.selectDate(this.dateSelector.value)),this.querySelector(".cal-navbar-datesel-icon").addEventListener("click",()=>this.dateSelector.showPicker()),this.querySelector("#cal-navbar-today-btn").addEventListener("click",()=>this.today()),this.querySelector("#cal-navbar-prevmonth").addEventListener("click",()=>this.prevMonth()),this.querySelector("#cal-navbar-nextmonth").addEventListener("click",()=>this.nextMonth())}today(){this.parent.scrollToDate(v(),"auto")}selectDate(t){this.parent.scrollToDate(t,"auto")}prevMonth(){this.parent.scrollToMonth(v(this.dateSelector.value).subtract(1,"month").format("YYYY-MM"))}nextMonth(){this.parent.scrollToMonth(v(this.dateSelector.value).add(1,"month").format("YYYY-MM"))}_handleDisplayMonth(t){t.detail.monthObj?(this.monthTextDiv.textContent=t.detail.monthObj.format("MMMM YYYY"),this.dateSelector.value=t.detail.monthObj.format("YYYY-MM-DD")):this.monthTextDiv.textContent=""}}customElements.define("cal-navbar",ke);class Ie{constructor(){this.clear()}clear(){this._actions=[],this._curAction=-1}add(t){this._curAction++,this._actions[this._curAction]=t,this._actions[this._curAction+1]&&this._actions.splice(this._curAction+1)}undo(){return this.hasUndo()?this._actions[this._curAction--]:null}redo(){return this.hasRedo()?this._actions[++this._curAction]:null}hasUndo(){return this._curAction>=0}hasRedo(){return this._curAction<this._actions.length-1}}const Oe="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cstyle%3e.spinner_b2T7{animation:spinner_xe7Q%20.8s%20linear%20infinite}.spinner_YRVV{animation-delay:-.65s}.spinner_c9oY{animation-delay:-.5s}@keyframes%20spinner_xe7Q{93.75%25,100%25{r:3px}46.875%25{r:.2px}}%3c/style%3e%3ccircle%20class='spinner_b2T7'%20cx='4'%20cy='12'%20r='3'/%3e%3ccircle%20class='spinner_b2T7%20spinner_YRVV'%20cx='12'%20cy='12'%20r='3'/%3e%3ccircle%20class='spinner_b2T7%20spinner_c9oY'%20cx='20'%20cy='12'%20r='3'/%3e%3c/svg%3e";class V extends j{constructor(){super();S(this,"forceRefresh",oe((e=null)=>{const s=e?e.map(n=>"#day-"+n):"cal-day";this.requestUpdate(),this.shadowRoot.querySelectorAll(s).forEach(n=>n.forceRefresh())},250));this.data=null,this._undo=new Ie,this._selecting=!1,this._firstSelectedIdx=null,this._lastSelectedIdx=null}connectedCallback(){super.connectedCallback(),this.addEventListener("cal-day-change",this._handleDayChange),this.addEventListener("cal-day-mousedown",this._handleMouseDown),this.addEventListener("cal-day-mouseover",this._handleMouseOver),this.addEventListener("cal-day-mouseup",this._handleMouseUp)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("cal-day-change",this._handleDayChange),this.removeEventListener("cal-day-mousedown",this._handleMouseDown),this.removeEventListener("cal-day-mouseover",this._handleMouseOver),this.removeEventListener("cal-day-mouseup",this._handleMouseUp)}render(){return this.data?_`
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
    `:_`<div class="loading">
        ${this.loadingText??_`<img src="${Oe}" style="height:48px" />`}
      </div>`}renderDay(e,s){var h,u,p,m;const n=v().format("YYYY-MM-DD");let a="";if(e.dayObj.day()%7===1)if(e.dayObj.date()<=7&&this._wholeWeekInSameMonth(e.dayObj)){const y=e.dayObj;a=_`<div
          id="month-${y.format("YYYY-MM")}"
          class="cal-month-gutter"
        >
          <div class="fw-bold">${y.year()}</div>
          <div>${y.format("MMM").toUpperCase()}</div>
        </div>`}else a=_`<div class="cal-month-gutter"></div>`;const o=e.dayStr,l=e.dayObj.date()==1?"first-day":E,i=((h=this.data)==null?void 0:h[o])??{cals:{}},r=(u=this.alerts)==null?void 0:u[o],c=this.settings??{cals:{},options:{}};return _`${a}
      <cal-day
        id="day-${o}"
        class="${l}"
        day="${e.display?e.display:e.dayObj.date()}"
        dim=${o<n||E}
        note="${((p=i==null?void 0:i.note)==null?void 0:p.text)||(i==null?void 0:i.note)||E}"
        noteStyle="${((m=i==null?void 0:i.note)==null?void 0:m.style)||E}"
        ?readonly=${this.readonly}
        ?selected=${e.selected}
        .index=${s}
        .dayObj=${e.dayObj}
        .data=${i}
        .alerts=${r}
        .settings=${c}
      ></cal-day>`}loadData(e,s){const n=Object.keys(e).reduce((l,i)=>i<l?i:l,v().format("YYYY-MM-DD")),a=this.start||n,o=this.end||v().endOf("year").add(2,"year");this.startDateObj=v(a).startOf("month").subtract(1,"day").startOf("week").add(1,"day"),this.endDateObj=v(o).endOf("month").endOf("week").add(1,"day"),this.days=this._fillDays(this.startDateObj,this.endDateObj),this.data=e,this.settings=s,this._sortDataByEvents(this.data),this._fillDaysInData(this.data,this.settings,this.days),this._undo.clear(),this.forceRefresh()}updateData(e){const s=Object.keys(e);if(s.length>0){const n={};return s.map(a=>{n[a]=structuredClone(this.data[a])}),this._undo.add({days:s,scrollPos:this.scrollPos,redoData:structuredClone(e),undoData:n}),this._updateDays(e),this.forceRefresh(s),this._dispatch("change",{data:e}),!0}return!1}hasUndo(){return this._undo.hasUndo()}hasRedo(){return this._undo.hasRedo()}undo(){const e=this._undo.undo();return e&&this._performUndoRedo("undo",e,e.undoData),e}redo(){const e=this._undo.redo();return e&&this._performUndoRedo("redo",e,e.redoData),e}_performUndoRedo(e,s,n){let a=s.days;const o=this.getSelected();this._selectDays(a);const l=a.concat(o);this._updateDays(n),this.forceRefresh(l),this.isDateVsible(a[a.length-1])||(this.scrollPos=s.scrollPos),this._dispatch(e,{action:s}),this._dispatch("change",{data:n}),this._dispatchSelect()}scrollToMonth(e,s="smooth"){const a="#day-"+v(e).date(1).format("YYYY-MM-DD"),o=this.shadowRoot.querySelector(a);o==null||o.scrollIntoView({behavior:s})}scrollToDate(e,s="smooth"){const n=v(e),a=this.shadowRoot.querySelector(".cal-container"),o="#day-"+n.format("YYYY-MM-DD"),l=this.shadowRoot.querySelector(o);this.scrollToMonth(e,s);const i=a.scrollTop+a.clientHeight-(l.offsetTop-a.offsetTop)-l.clientHeight;i<0&&(a.scrollTop-=i);const r=this.days.find(c=>c.dayObj.isSame(n,"day"));r&&(this._clearSelectedDays(),r.selected=!0,this._selecting=!1,this._firstSelectedIdx=l.index,this._lastSelectedIdx=l.index,this._dispatchSelect(),this.requestUpdate())}get scrollPos(){return this.shadowRoot.querySelector(".cal-container").scrollTop}set scrollPos(e){const s=this.shadowRoot.querySelector(".cal-container");s.scrollTop=e}isDateVsible(e){const s=this.shadowRoot.querySelector(".cal-container"),n="#day-"+v(e).format("YYYY-MM-DD"),a=this.shadowRoot.querySelector(n);if(a){const o=s.offsetTop+s.scrollTop,l=o+s.clientHeight,i=a.offsetTop,r=i+a.clientHeight;return i<=l&&r>o}return!1}getSelected(){return this.days?this.days.filter(e=>e.selected).map(e=>e.dayStr):[]}_sortDataByEvents(e){var s;if(e){for(const n in e)if(e[n].cals)for(const a in e[n].cals){const{events:o}=e[n].cals[a];if(o){o.sort((l,i)=>{var r,c;return((r=l.resource)==null?void 0:r.toLowerCase())<((c=i.resource)==null?void 0:c.toLowerCase())?-1:1});for(const l of o)(s=l.subitems)==null||s.sort((i,r)=>{var c,h;return((c=i.resource)==null?void 0:c.toLowerCase())<((h=r.resource)==null?void 0:h.toLowerCase())?-1:1})}}}return e}_fillDays(e,s){const n=[];for(let a=e;a<=s;a=a.add(1,"day")){const o={dayObj:a,dayStr:a.format("YYYY-MM-DD")};(a===e||a.date()===1)&&(o.display=a.format("MMM D")),n.push(o)}return n}_fillDaysInData(e,s,n){var o;const a=((o=s.options)==null?void 0:o.calOrder)??[];for(const{dayStr:l}of n){e[l]=e[l]||{};const i=e[l];i.cals=i.cals||{},a.forEach(r=>{i.cals[r]=i.cals[r]||{id:r,events:[]}})}return e}_wholeWeekInSameMonth(e){return e.day(1).month()==e.day(6).add(1,"day").month()}_monthStartingInWeek(e){const s=e.day(1),n=e.day(6).add(1,"day");return s.date()===1||s.date()>n.date()?n.date(1):null}_updateDays(e){Object.entries(e).forEach(([s,n])=>{this.data[s]=structuredClone(n)})}_clearSelectedDays(){this.days.forEach(e=>{e.selected=!1})}_selectDays(e){e=Array.isArray(e)?e:[e],this.days.forEach(s=>{s.selected=e.includes(s.dayStr)})}_selectDaysBetween(e,s){const n=Math.min(e,s),a=Math.max(e,s);for(let o=n;o<=a;o++)this.days[o].selected=!0}_dispatch(e,s){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:s}))}_dispatchSelect(){this._dispatch("select",{selected:this.getSelected()})}_handleDayChange(e){var l;const{index:s,data:n,prevData:a}=e.detail,o=(l=this.days[s])==null?void 0:l.dayStr;o&&JSON.stringify(n)!=JSON.stringify(a)&&(this._undo.add({days:[o],scrollPos:this.scrollPos,redoData:{[o]:structuredClone(n)},undoData:{[o]:a}}),this._dispatch("change",{data:{[o]:n}}))}_handleMouseDown(e){const{index:s,mouseDownEvent:n}=e.detail;n.ctrlKey||n.metaKey?s!==this._firstSelectedIdx&&(this.days[s].selected=!this.days[s].selected):n.shiftKey?(this._firstSelectedIdx==this._firstSelectedIdx,this._clearSelectedDays(),this._selectDaysBetween(this._firstSelectedIdx,s)):(this._clearSelectedDays(),this._selecting=!0,this._firstSelectedIdx=s,this._lastSelectedIdx=s,this.days[e.detail.index].selected=!0),this.requestUpdate()}_handleMouseOver(e){this._selecting&&this._firstSelectedIdx!==null&&(this._clearSelectedDays(),this._selectDaysBetween(this._firstSelectedIdx,e.detail.index),this.requestUpdate())}_handleMouseUp(e){this._selecting=!1,this._dispatchSelect()}_handleScroll(e){const s=e.target,n=s.scrollTop,a=100,l=Array.from(s.querySelectorAll(".first-day")).reverse().find(i=>i.offsetTop-a-s.offsetTop<n);this.currentMonth=l.dayObj,this.dispatchEvent(new CustomEvent("displaying-month",{bubbles:!1,composed:!1,detail:{monthObj:this.currentMonth}}))}}S(V,"styles",ne`
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
  `),S(V,"properties",{loadingText:{type:String},readonly:{type:Boolean},start:{type:String},end:{type:String},alerts:{type:Object,attribute:!1}});customElements.define("cal-component",V);class ie extends j{render(){var o;if(!this.settings)return;const{cals:t,options:e}=this.settings??{},{calOrder:s}=e??{},n=(o=s==null?void 0:s.filter(l=>{var i;return!((i=t[l])!=null&&i.archived)}))==null?void 0:o.map(l=>{var i,r,c,h;return{id:l,label:(i=t[l])==null?void 0:i.name,color:((r=t[l])==null?void 0:r.color)||((c=t[l])==null?void 0:c.background),checked:((h=t[l])==null?void 0:h.visible)??I}}),a=_`<cal-checklist
      checkable
      .items=${n??[]}
      @checked=${this._handleCalChange}
      @color-change=${this._handleCalChange}
    >
    </cal-checklist>`;return _` ${a} `}_handleCalChange(t){const{item:e,checked:s,color:n}=t.detail;this.dispatchEvent(new CustomEvent("change",{bubbles:!1,composed:!0,detail:{cal:e.id,checked:s,color:n}}))}}S(ie,"properties",{settings:{type:Object,attribute:!1}});customElements.define("cal-callist",ie);class K extends j{willUpdate(){if(!this.settings)return;let t=this.settings.options??{};t=this.settings.options={peopleGroupOrder:[],peopleGroups:{},people:{},...t};for(const e in t.people)t.people[e].visible=t.people[e].visible??I;this._syncGroupsToPeopleChecked(t.peopleGroups,t.people)}render(){if(!this.settings)return;const{peopleGroupOrder:t,peopleGroups:e,people:s}=this.settings.options??{},n=t==null?void 0:t.map(c=>{var h;return{label:c,group:!0,checked:((h=e[c])==null?void 0:h.visible)??$}}),a=Object.entries(s??{}).sort(([c,h],[u,p])=>c.localeCompare(u)).map(([c,h])=>({label:h.name,group:!1,checked:h.visible??I,color:h.color})),o=_`<cal-checklist
      checkable
      .items=${n}
      @color-change=${this._handleColorChange}
      @checked=${this._handleGroupCheck}
    ></cal-checklist>`,l=_`<div class="divider"></div>`,i=_`<cal-checklist
      class="everyone-list"
      checkable
      colorable
      .items=${a}
      @color-change=${this._handleColorChange}
      @checked=${this._handlePersonCheck}
    >
    </cal-checklist>`,r=_`<div class="footer">
      <a href="#" @click=${this._handleSelectAll.bind(this,I)}
        >Show All</a
      >
      |
      <a href="#" @click=${this._handleSelectAll.bind(this,$)}>None</a>
    </div>`;return _`${o} ${l} ${i} ${r} ${l}`}_syncGroupsToPeopleChecked(t,e){for(const s in t){const n=t[s].names,a=n.filter(o=>{var l;return(l=e[o.toLowerCase()])==null?void 0:l.visible});t[s].visible=a.length==n.length?I:a.length>0?Ce:$}}_dispatch(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!1,composed:!0,detail:{settings:this.settings}}))}_handleColorChange(t){const{item:e,color:s}=t.detail;e.group?this.settings.options.peopleGroups[e.label].color=s:this.settings.options.people[e.label.toLowerCase()].color=s,this._dispatch("change")}_handleGroupCheck(t){const{item:e,checked:s}=t.detail;for(const n of this.settings.options.peopleGroups[e.label].names){const a=this.settings.options.people[n.toLowerCase()];a&&(a.visible=s?I:$)}this._dispatch("change"),this.requestUpdate()}_handlePersonCheck(t){const{item:e,checked:s}=t.detail,n=this.settings.options.people[e.label.toLowerCase()];n.visible=s?I:$,this._dispatch("change"),this.requestUpdate()}_handleSelectAll(t){const e=this.settings.options.people;for(const s in e)e[s].visible=t;this._dispatch("change"),this.requestUpdate()}}S(K,"properties",{settings:{type:Object,attribute:!1}}),S(K,"styles",ne`
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
  `);customElements.define("cal-peoplelist",K);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class B extends De{constructor(t){if(super(t),this.et=E,t.type!==Se.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===E||t==null)return this.vt=void 0,this.et=t;if(t===pe)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.vt;this.et=t;const e=[t];return e.raw=e,this.vt={_$litType$:this.constructor.resultType,strings:e,values:[]}}}B.directiveName="unsafeHTML",B.resultType=1;const Te=xe(B),W=document.querySelector("#reportModal"),$e=W.querySelector(".modal-title"),je=W.querySelector(".modal-body"),se=new bootstrap.Modal(W),G={setTitle:d=>{$e.textContent=d},setBodyHtml:d=>{je.innerHTML=d},show:(d,t)=>{d!==void 0&&G.setTitle(d),t!==void 0&&G.setBodyHtml(t),se.show()},hide:()=>{se.hide()}};function U(d,t,e){var l,i;const s={};fe(t,d,({day:r,calId:c,resource:h,shift:u,subitemResource:p,subitemShift:m})=>{var g,b;const y=(b=(g=e.cals)==null?void 0:g[c])==null?void 0:b.type;if((y==null?void 0:y.toLowerCase())!="call"){h=p??h,u=m??u;const w=h.toLowerCase(),f=s[w]??{display:h},C=f[r]??[];C.push(u),f[r]=C,s[w]=f}});const n={},a=Object.keys(s).sort();for(const r of d)for(const c of a){const h=c.toLowerCase();let u=0;const p=s[h][r]??[];for(const m of p)u+=((l=le(r,m))==null?void 0:l.hours)||0;n[h]=n[h]??{display:s[h].display},n[h][r]=u}a.forEach(r=>{n[r].total=Object.values(n[r]).reduce((c,h)=>c+(isNaN(h)?0:h),0)});const o=Object.values(((i=e.options)==null?void 0:i.people)??{}).map(r=>r.visible??!0?r.name.toLowerCase():null).filter(r=>r);for(const r of Object.keys(n))o.includes(r)||delete n[r];return{days:d,people:Object.keys(n),data:n}}function Me(d,t=null,e=null,s=null){const{days:n,people:a,data:o}=d,l=a.map(c=>`<th>${o[c].display}</th>`),i=n.map(c=>{const h=`<td>${v(c).format("dd M/D/YY")}</td>`,u=a.map(p=>o[p][c]).map(p=>`<td>${p}</td>`);return[h,...u]}).map(c=>`<tr>${c.join("")}</tr>`),r=a.map(c=>`<td>${o[c].total}</td>`);if(i.push(`<tr><td><i>Total</i></td>${r.join("")}</tr>`),t&&e||s){if(i.unshift(`<tr><th colspan="${a.length+1}">Selected Days</th></tr>`),t&&e){const c=a.map(h=>{var u;return`<td>${((u=e.data[h])==null?void 0:u.total)??""}</td>`});i.push(`<tr><th>Total through ${v(t).format("M/D/YY")}</th>${c.join("")}</tr>`)}if(s){const c=a.map(h=>{var u;return`<td>${((u=s.data[h])==null?void 0:u.total)??""}</td>`});i.push(`<tr><th>Total for ${v(t).year()}</th>${c.join("")}</tr>`)}}return`<table class="table table-striped">
    <thead>
      <tr>
        <th></th>
        ${l.join("")}
      </tr>
    </thead>
    <tbody>
      ${i.join("")}
    </tbody>
  </table>`}class Le extends j{constructor(){super(),this._dayData={cals:{}}}createRenderRoot(){return this}willUpdate(t){var e,s,n;this._calData=(e=this._calEl)==null?void 0:e.data,this._settings=((s=this._calEl)==null?void 0:s.settings)??{cals:{}},this._alerts=((n=this._calEl)==null?void 0:n.alerts)??{},this._renderInfo=this._createRenderInfo(this._selected,this._settings,this._dayData,this._alerts,this._calEl.readonly)}_createRenderInfo(t,e,s,n,a){var h,u;const o=this._selectedDaysAsText(t)||"Select a date",l=(t==null?void 0:t.length)==1?E:!0,i={};t.filter(p=>!!n[p]).forEach(p=>i[p]=n[p]);const r=(h=e.templates)==null?void 0:h.map((p,m)=>_`<option value="${m}">${p.name}</option>`),c=Object.keys(((u=e.options)==null?void 0:u.people)??{}).map(p=>_`<option value="${p}"></option>`);return{dayData:s,calSettings:e,selectedDaysText:o,selectedAlerts:i,copyDisabled:l,templateOptions:r,peopleDatalist:c,readonly:a}}render(){if(!this._renderInfo)return;const{dayData:t,calSettings:e,selectedDaysText:s,selectedAlerts:n,copyDisabled:a,templateOptions:o,peopleDatalist:l,readonly:i}=this._renderInfo,r=_`
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
    `,c=_`
      <h2 class="sidebar-heading">Details</h2>
      <div class="selected-days-label">${s}</div>
      <div class="selected-days-alerts">
        ${this._selected.length?this._alertTable(n):""}
      </div>
      <div class="details"></div>
    `,h=i?E:_`
          <h2 class="sidebar-heading">Edit</h2>
          <div class="edit">
            <h6 class="edit-section-label">Create schedule to apply:</h6>
            <div class="edit-section-content">
              <cal-day .data=${t} .settings="${e}"></cal-day>
              <div class="edit-toolbar">
                <button
                  class="btn btn-sm btn-outline-primary"
                  ?disabled=${a}
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
        `,u=_`
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
    `;return _`<nav>
      ${r} ${c} ${h} ${u}
    </nav>`}enableSave(t="Save"){const e=this.querySelector(".saveBtn");e.disabled=!1,e.classList.remove("btn-outline-primary","btn-danger"),e.classList.add("btn-primary"),e.innerText=t}disableSave(t="Saved"){const e=this.querySelector(".saveBtn");e.disabled=!0,e.classList.add("btn-outline-primary","btn-danger"),e.classList.remove("btn-primary"),e.innerText=t}errorSave(t="Error"){const e=this.querySelector(".saveBtn");e.disabled=!0,e.classList.add("btn-danger"),e.classList.remove("btn-outline-primary","btn-primary"),e.innerText=t}connectedCallback(){super.connectedCallback(),this._calEl=document.querySelector("#"+this.getAttribute("cal-id")),this._calEl&&(this._calEl.addEventListener("select",this._handleSelectDay.bind(this)),this._calEl.addEventListener("undo",this._updateUndoRedo.bind(this)),this._calEl.addEventListener("redo",this._updateUndoRedo.bind(this)),this._calEl.addEventListener("change",this._updateUndoRedo.bind(this)),this._selected=this._calEl.getSelected())}_handleUndoClick(t){var e;(e=this._calEl)==null||e.undo()}_handleRedoClick(t){var e;(e=this._calEl)==null||e.redo()}_handleSaveClick(t){this.dispatchEvent(new CustomEvent("save",{bubbles:!0,composed:!1}))}_handleSelectDay(t){this._selected=t.detail.selected,this.requestUpdate()}_handleCopyClick(t){var s;const e=((s=this._selected)==null?void 0:s.length)==1&&this._selected[0];e&&this._calData&&(this._dayData=structuredClone(this._calData[e])??{cals:{}},this.requestUpdate(),t.preventDefault())}_handleClearClick(t){this._dayData={cals:{}},this.requestUpdate(),t.preventDefault()}_handleApplyScheduleClick(t){if(this._selected.length>0){const e={};this._selected.forEach(s=>{e[s]=this._dayData}),this._calEl.updateData(e)}t.preventDefault()}_handleMergeScheduleClick(t){if(this._selected.length>0){const e=this._dayData,s={};this._selected.forEach(n=>{s[n]=structuredClone(this._calData[n]),s[n].cals=s[n].cals??{},e.note&&(s[n].note=e.note),Object.keys(e.cals??{}).length&&Object.entries(e.cals).forEach(([a,o])=>{s[n].cals[a]?o.events.forEach(l=>{var r;const i=(r=s[n].cals[a].events)==null?void 0:r.findIndex(c=>{var h,u;return((h=c.resource)==null?void 0:h.toLowerCase())==((u=l.resource)==null?void 0:u.toLowerCase())});i>=0?s[n].cals[a].events.splice(i,1,l):s[n].cals[a].events.push(l)}):s[n].cals[a]=o})}),this._calEl.updateData(s)}t.preventDefault()}_handleApplyTemplateClick(t){var n,a;const e=this.querySelector("#template").value,s=(a=(n=this._settings)==null?void 0:n.templates)==null?void 0:a[e];if(s!=null&&s.data){const o={};for(const l of this._selected)if((s==null?void 0:s.format)=="week"){const i=v(l).day();o[l]=s.data[i]}else o[l]=s.data;this._calEl.updateData(o)}t.preventDefault()}_handleTimeOffClick(t){var a;let e=!1;const s={},n=this.querySelector("#remove").value.toLowerCase();if(n){for(const o of this._selected){s[o]=structuredClone(this._calData[o]);const l=(a=s[o])==null?void 0:a.cals;if(l)for(const i in l)l[i].events.forEach(r=>{r.resource.toLowerCase()==n&&(r.schedule=["OFF"],e=!0)})}e&&this._calEl.updateData(s)}}_handleUnscheduleClick(t){var a;let e=!1;const s={},n=this.querySelector("#remove").value.toLowerCase();if(n){for(const o of this._selected){s[o]=structuredClone(this._calData[o]);const l=(a=s[o])==null?void 0:a.cals;if(l)for(const i in l){const r=l[i].events;l[i].events=r.filter(c=>c.resource.toLowerCase()!=n),e=e||r.length!=l[i].events.length}}e&&this._calEl.updateData(s)}}_handleRunClick(t){const e=this.querySelector("#report").value;let s=this._selected,n=null,a=null;const o=s!=null&&s.length?v(s.reduce((l,i)=>i>l?i:l)):null;if(o&&e=="hours"){const l=v(s[0]).year();if(s.map(h=>v(h).year()).every(h=>h==l)){const h=v(new Date(l,0)),u=v(new Date(l+1,0)),p=[],m=[];for(let y=h;y.isBefore(u,"day");y=y.add(1,"day")){const g=y.format("YYYY-MM-DD");m.push(g),(y.isBefore(o,"day")||y.isSame(o,"day"))&&p.push(g)}n=U(p,this._calData,this._settings),a=U(m,this._calData,this._settings)}if(s.length==1){const h=v(s).startOf("week");s=[1,2,3,4,5,6,7].map(u=>h.add(u,"day").format("YYYY-MM-DD"))}const r=U(s,this._calData,this._settings),c=Me(r,o,n,a);G.show("Hours",c),t.preventDefault()}}_updateUndoRedo(t){var n,a;const e=this.querySelector(".undoBtn"),s=this.querySelector(".redoBtn");e.disabled=!((n=this._calEl)!=null&&n.hasUndo()),s.disabled=!((a=this._calEl)!=null&&a.hasRedo())}_selectedDaysAsText(t){let e,s,n=[];if(t&&t.length<=4){for(const a of t){const o=v(a);e==null?n.push(o.format("M/D/YY")):o.subtract(1,"day").isSame(e)?s=!0:s&&e&&!o.subtract(1,"day").isSame(e)?(n.push("-",e.format("M/D/YY"),", ",o.format("M/D/YY")),s=!1):!s&&e&&n.push(", ",o.format("M/D/YY")),e=o}s&&n.push("-",e.format("M/D/YY"))}else n.push(t.length," ","days selected");return n.join("")}_alertTable(t){const e=Object.keys(t);if(e.length==0||!Object.values(t).some(a=>a.length))return _`<div class="text-center"></div>`;const s=e.length>1,n=e.filter(a=>{var o;return((o=t[a])==null?void 0:o.length)>0}).map(a=>{var r;const l=`<tr>
          ${s?`<td class="alert-date">${v(a).format("M/D/YY")}</td>`:"<td></td>"}
          <td>${((r=t[a][0])==null?void 0:r.text)??""}</td>
        </tr>`,i=t[a].slice(1).map(c=>`<tr><td></td><td>${c.text??""}</td></tr>`);return[l,...i]}).flat().join("");return _`<table>
      <tbody>
        ${Te(n)}
      </tbody>
    </table>`}}customElements.define("cal-action-panel",Le);function Ye(d,t,e={}){var o;const s={},n=new Set([...Object.keys(d),...Object.keys(t)]),a=l=>Object.entries(l).filter(([i,r])=>{var c;return((c=r.events)==null?void 0:c.length)>0}).map(([i,r])=>i);for(const l of n){const i=d[l],r=t[l];if(!(e.minDate&&l<e.minDate||e.maxDate&&l>e.maxDate))if(!i)s[l]={addedIds:a(r.cals),removedIds:[],eventChanges:{}};else if(!r)s[l]={addedIds:[],removedIds:a(i.cals),eventChanges:{}};else{const c={addedIds:[],removedIds:[],eventChanges:{}},h=new Set(Object.keys(i.cals)),u=new Set(Object.keys(r.cals));for(const p of u){if(!h.has(p))((o=r.cals[p].events)==null?void 0:o.length)>0&&c.addedIds.push(p);else{const m=Ae(i.cals[p].events,r.cals[p].events);Object.values(m).some(y=>y.length>0)&&(c.eventChanges[p]=m)}h.delete(p)}c.removedIds=Array.from(h),(c.addedIds.length||c.removedIds.length||Object.keys(c.eventChanges).length)&&(s[l]=c)}}return s}function Re(d,t,e={}){const s=[];if(!d[t])return s;const{addedIds:n,removedIds:a,eventChanges:o}=d[t];s.push(...n.map(l=>`${e[l]||l}: schedule added`)),s.push(...a.map(l=>`${e[l]||l}: schedule cleared`));for(const[l,i]of Object.entries(o)){const r=e[l]||l;s.push(...i.addedResources.map(c=>`${r}: ${c} added`)),s.push(...i.removedResources.map(c=>`${r}: ${c} removed`)),s.push(...i.scheduleChanges.map(({resource:c,curSchedule:h,changedSchedule:u,curIndex:p,changedIndex:m})=>`${r}: ${c} (current index ${p}, changed index ${m}) changed ${h.join(", ")} -> ${u.join(", ")}`))}return s}const Ae=(d,t)=>{const e={addedResources:[],removedResources:[],scheduleChanges:[]},s=ae(d),n=ae(t);for(const[a,o]of n){const l=s.get(a)||[];if(l.length===0)e.addedResources.push(...o.map(i=>i.event.resource));else{const i=Ue(l,o);e.scheduleChanges.push(...i)}s.delete(a)}for(const[,a]of s)e.removedResources.push(...a.map(({event:o})=>o.resource));return e},ae=d=>{const t=new Map;return d.forEach((e,s)=>{const n=e.resource.toLowerCase();t.has(n)||t.set(n,[]),t.get(n).push({event:e,index:s})}),t},Ue=(d,t)=>{const e=[],s=[];d.forEach(({event:a,index:o})=>{const l=qe(t,a.schedule);l?s.push(l.index):e.push({resource:a.resource,curSchedule:a.schedule,curIndex:o})});const n=t.find(({index:a})=>!s.includes(a));return n&&e.forEach(a=>{a.changedSchedule=n.event.schedule,a.changedIndex=n.index}),e},qe=(d,t)=>d.find(({event:e})=>Pe(e.schedule,t)),Pe=(d,t)=>{if(d.length!==t.length)return!1;const e=new Set(d);return t.every(s=>e.has(s))};function Ne(d,t,e={}){const s={},n=Ve(d,e.callCalIds),a=l=>Object.entries(l).filter(([i,r])=>{var c;return((c=r.events)==null?void 0:c.length)>0}).map(([i,r])=>i),o=new Set([...a(d),...Object.keys(t)]);for(const l of o){if(e.minDate&&l<e.minDate||e.maxDate&&l>e.maxDate)continue;const i=n[l]??{},r=t[l]??{},c=Ke(i,r);c&&(s[l]=c)}return s}function He(d,t,e={}){const s=[];if(!d[t])return s;const{addedIds:n,removedIds:a,changedIds:o}=d[t];s.push(...n.map(l=>({text:`${e[l]||"Calendar ("+l+")"} has Epic events`,calId:l,eventIdx:-1}))),s.push(...a.map(l=>({text:`${e[l]||l} events not in Epic`,calId:l,eventIdx:-1})));for(const[l,i]of Object.entries(o)){const r=e[l]||l;s.push(...i.addedResources.map(c=>({text:`${c} (${r}) in Epic`,calId:l,eventIdx:-1}))),s.push(...i.removedResources.map(c=>({text:`${c.resource} (${r}) not in Epic`,calId:l,eventIdx:c.eventIdx}))),s.push(...i.changedResources.map(({resource:c,desc:h,eventIdx:u})=>({text:`${c} (${r}) ${h}`,calId:l,eventIdx:u})))}return s.forEach(l=>l.type="info"),s}function Ve(d,t=[]){var s;const e={};for(const[n,a]of Object.entries(d)){const o=e[n]??(e[n]={});for(const[l,i]of Object.entries(a.cals))if(!(t&&t.includes(l))&&i.events&&i.events.length>0){const r=o[l]??(o[l]={});for(const[c,h]of i.events.entries())if(((s=h.schedule)==null?void 0:s.length)>0){const u=h.resource;r[u]??(r[u]=[]);for(const p of h.schedule){const m=le(n,p);if(m){const{start:y,end:g,off:b}=m;y&&r[u].push({type:"shift_start",ts:y.format("YYYY-MM-DD HH:mm"),eventIdx:c}),g&&r[u].push({type:"shift_end",ts:g.format("YYYY-MM-DD HH:mm"),eventIdx:c})}else r[u].push({type:"error",desc:"invalid shift: "+JSON.stringify(p),ts:null,eventIdx:c});r[u].sort((y,g)=>{var b;return((b=y.ts)==null?void 0:b.localeCompare(g.ts))??1})}}}}return e}function Ke(d,t){const e={addedIds:[],removedIds:[],changedIds:{}},s=new Set([...Object.keys(d),...Object.keys(t)]);for(const n of s){const a=d[n],o=t[n];if(!a)e.addedIds.push(n);else if(!o)e.removedIds.push(n);else{const l=Be(a,o);l&&(e.changedIds[n]=l)}}return e}function Be(d,t){const e={addedResources:[],removedResources:[],changedResources:[]},s=a=>{const o=a.filter(c=>c.type==="shift_start").map(c=>c.ts),l=a.filter(c=>c.type==="shift_end").map(c=>c.ts),i=a.filter(c=>c.type==="unavailable_start").map(c=>c.ts),r=a.filter(c=>c.type==="unavailable_end").map(c=>c.ts);return o.length>0&&o.length==i.length&&l.length==r.length&&o.every(c=>i.includes(c))&&l.every(c=>r.includes(c))},n={...Object.fromEntries([...Object.keys(t).map(a=>[a.toLowerCase(),{name:a}]),...Object.keys(d).map(a=>{var o;return[a.toLowerCase(),{name:a,eventIdx:(o=d[a][0])==null?void 0:o.eventIdx}]})])};return Object.keys(n).forEach(a=>{const o=n[a].name,l=d[o]??[],i=t[o]??[],r=s(i)?[]:i;if(l.length===0&&r.length>0)e.addedResources.push(o);else if(r.length===0&&l.length>0)e.removedResources.push({resource:o,eventIdx:n[a].eventIdx});else{const c=Ge(l,r);c&&e.changedResources.push({resource:o,...c})}}),e.addedResources.length===0&&e.removedResources.length===0&&e.changedResources.length===0?null:e}function Ge(d,t){var l,i,r,c;let e=0,s=0;const n=d.filter(h=>h.type=="error"||!h.ts);if(n.length>0)return{desc:n[0].desc||"Problem with schedule",eventIdx:n[0].eventIdx};t=t.filter(h=>h.ts);let a="off",o="off";for(;e<d.length||s<t.length;){let h=((l=d[e])==null?void 0:l.ts)??t[s].ts;h=t[s].ts<h?t[s].ts:h;let u,p,m=null;const y=[],g=[];do u=((i=d[e])==null?void 0:i.ts)===h&&d[e],p=((r=t[s])==null?void 0:r.ts)===h&&t[s],(u==null?void 0:u.ts)===h&&(y.push(u.type),m=u.eventIdx,e++),(p==null?void 0:p.ts)===h&&(g.push(p.type),s++);while(u&&u.ts===h||p&&p.ts===h);if(y.includes("shift_end")?a="off":y.includes("shift_start")&&(a="shift"),g.includes("shift_end")?o="off":g.includes("unavailable_end")?o="shift":g.includes("unavailable_start")?o="unavailable":g.includes("shift_start")&&(o="shift"),a!==o&&o!=="unavailable")return{desc:"differs at "+(v(h).isValid()?v(h).format("h:mmA"):h),eventIdx:m??((c=d[0])==null?void 0:c.eventIdx)}}return null}const z="default",ce="changes",re="epic";let de=z,Y={};function q(d,t={}){de=d,Y=t}function P(d,t,e={}){switch(de){case z:return We(d,t,{...Y,options:e});case ce:return ze(d,t,{...Y,options:e});case re:return Fe(d,t,{...Y,options:e});default:return{}}}function We(d,t,e={}){var a;const s=(a=t==null?void 0:t.templates)==null?void 0:a.filter(o=>o.type=="regular"),n=Xe(s);return e.context=e.context??{},e.context.compiledTemplates=n,e.maxDate=e.maxDate??R(d),Je(d,t,[et,Qe],e)}function ze(d,t,e={}){const s=e.prevData;if(e.minDate=e.minDate??A(),!e.maxDate){const[l,i]=[R(d),R(s)];e.maxDate=l>i?l:i}if(!s)return{};const n=Ye(s,d,e),a=Object.fromEntries(Object.entries(t.cals).map(([l,i])=>[l,i.name])),o={};return Object.keys(n).forEach(l=>{const i=Re(n,l,a);o[l]=i.map(r=>({type:"info",text:r}))}),o}function Fe(d,t,e={}){const s=e.epicData;if(e.minDate=e.minDate??A(),!e.maxDate){const i=R(d),r=Object.keys(s).reduce((c,h)=>c>h?c:h,"");e.maxDate=i>r?i:r}if(!s)return{};const n=t.cals??{};e.callCalIds=Object.keys(n).filter(i=>n[i].type=="call");const a=Ne(d,s,e),o=Object.fromEntries(Object.entries(n).map(([i,r])=>[i,r.name])),l={};return Object.keys(a).forEach(i=>{l[i]=He(a,i,o)}),l}const Je=(d,t,e=[],{days:s=null,minDate:n=A(),maxDate:a=null,context:o=null}={})=>{const l={};return s=s??Object.keys(d),s=n?s.filter(i=>i>=n):s,s=a?s.filter(i=>i<=a):s,s.forEach(i=>{const r=l[i]??[];e.forEach(c=>{const h=c(i,d[i],d,t,o);(h==null?void 0:h.length)>0&&r.push(...h)}),r.length&&(l[i]=r)}),l},Qe=(d,t,e,s,{compiledTemplates:n=null})=>{var a;if(n){const o=Object.entries(((a=s.options)==null?void 0:a.people)??{}).filter(([b,w])=>w.visible===0).map(([b,w])=>{var f;return(f=w.name)==null?void 0:f.toLowerCase()}),l=Object.entries(s.cals??{}).filter(([b,w])=>w.visible??!0).map(([b,w])=>b),i=Object.fromEntries(l.map(b=>{var w,f;return[b,(f=(w=s.cals)==null?void 0:w[b])==null?void 0:f.name]})),r=v(d).day(),c=[];Object.values(t.cals).forEach(({id:b,events:w})=>{w.forEach(f=>{var D,O,T,M,F,J;const C=(O=(D=f.resource)==null?void 0:D.trim())==null?void 0:O.toLowerCase(),k=Array.isArray(f.schedule)?(M=(T=f.schedule.join(", "))==null?void 0:T.trim())==null?void 0:M.toLowerCase():(J=(F=f.schedule)==null?void 0:F.trim())==null?void 0:J.toLowerCase();c.push({type:"event",calId:b,resource:C,schedule:k}),f.subitems&&f.subitems.forEach(L=>{var Q,X,Z;c.push({type:"subitem",calId:b,parentResource:C,parentSchedule:k,resource:(Q=L.resource)==null?void 0:Q.toLowerCase(),schedule:Array.isArray(L.schedule)?(X=L.schedule.join(", "))==null?void 0:X.toLowerCase():(Z=L.schedule)==null?void 0:Z.trim().toLowerCase()})})})});let u=!1,p=!1,m=null,y=null,g=null;for(const b of n.reverse())if(m=b[r]??[],m!=null&&m.length){y=m,u=!0,g=new Array(m.length).fill(!1);const w=n.length==1?c:structuredClone(c);if(m.forEach((f,C)=>{if(l.indexOf(f.calId)<0||o.indexOf(f.resource.toLowerCase())>=0)g[C]=!0;else for(const k in w){const D=w[k];if(f.calId==D.calId&&f.type=="event"&&D.type=="event"&&(f.match=="exact"&&f.resource==D.resource&&f.schedule==D.schedule||f.match=="resource"&&f.resource==D.resource||f.match=="schedule"&&f.schedule==D.schedule)){w.splice(k,1),g[C]=!0;break}}}),g.every(f=>!!f)){p=!0;break}}if(!u||p||y===null)return[];{const b=[];return y.filter((f,C)=>!g[C]).forEach(f=>{var D,O,T;const C=f.calId,k=(T=(O=(D=t.cals)==null?void 0:D[C])==null?void 0:O.events)==null?void 0:T.findIndex(M=>M.resource.toLowerCase()==f.resource);b.push({type:"info",text:`Change: ${f.display} (${i[C]})`,calId:C,eventIdx:k})}),b}}return[]},Xe=d=>{const t=[];if(d){for(const e of d)if(e.format=="week"){const s=Object.entries(e.data).map(([n,{cals:a}])=>[n,Ze(a)]).filter(([n,a])=>a.length);s.length&&t.push(Object.fromEntries(s))}}return t};function Ze(d){const t=[];return Object.values(d).forEach(({id:e,events:s})=>{s.forEach(({resource:n,schedule:a,subitems:o})=>{var i,r,c;const l=Array.isArray(a)?(r=(i=a.join(", "))==null?void 0:i.trim())==null?void 0:r.toLowerCase():(c=a==null?void 0:a.trim())==null?void 0:c.toLowerCase();n==""||n=="*"?t.push({priority:1,type:"event",match:"partialMatchShift",calId:e,display:"missing shift",schedule:l}):n!=""&&((a==null?void 0:a.length)>0||!Array.isArray(a)&&a)&&t.push({priority:0,type:"event",match:"exact",calId:e,resource:n==null?void 0:n.toLowerCase(),display:n,schedule:l})})}),t.length>0&&t.sort((e,s)=>e.priority-s.priority),t}const et=(d,t,e,s,n)=>{var l;const a=Object.keys(((l=s.options)==null?void 0:l.people)??{}).map(i=>i.toLowerCase()),o=[];if(a.length>0){const i=new Set;Object.values(t.cals??{}).forEach(({events:r})=>{r.forEach(({resource:c,subitems:h})=>{c&&!a.includes(c.toLowerCase())&&i.add(c),h==null||h.forEach(({resource:u})=>{u&&!a.includes(u.toLowerCase())&&i.add(u)})})}),i.size>0&&o.push({type:"warn",text:"Unrecognized: "+Array.from(i.values()).join(", ")})}return o},R=d=>{let t=A();return d&&Object.entries(d).forEach(([e,s])=>{(s.note||Object.values(s.cals??{}).findIndex(a=>{var o;return((o=a.events)==null?void 0:o.length)>0})>-1)&&e>t&&(t=e)}),t};class tt{constructor(){S(this,"_handleSettingsUpdated",oe(()=>{mainCal.alerts=P(mainCal.data,SETTINGS),mainCal.forceRefresh(),actionPanel.requestUpdate(),mainCal.readonly||(H({deptId:AUTH.deptId,userId:AUTH.user.id,settings:SETTINGS},{callback:this._handleSaveComplete}),actionPanel.enableSave())},250));this.calData=null,this.settings=null,this.alerts=null,this.readonly=!1,this.auth=new Ee("cal.html",window.location.search).auth}initEmbedMode(){new URLSearchParams(window.location.search).get("embed")=="1"&&(deptNameLabel.style.cssText="display:none !important",menu.style.cssText="display:none !important",sidebar.style.cssText="display:none !important",actionPanel.style.cssText="display:none !important")}async fetchData(t){var a;if(!t.user||t.deptId==null)throw new Error(`Unable to fetch due to invalid user and department ${(a=t.user)==null?void 0:a.id}, ${t.deptId}`);const e=me(t.deptId),s=ye(t.deptId),n=ve(t.deptId);return Promise.all([e,s,n]).then(async o=>{if(e.error||s.error||n.error)throw new Error(`Error fetching data: ${[e.error,s.error,n.error]}`);return{auth:t,dept:o[0].data,calData:o[1].data,settings:o[2].data}})}initUI({auth:t,dept:e,calData:s,settings:n}){var l;if(!t||!s||!n)throw new Error("Invalid login or user data");[this.auth,this.calData,this.settings]=[t,s,n],[window.AUTH,window.CAL_DATA,window.SETTINGS]=[t,s,n];const a=(l=t.user.user_metadata)==null?void 0:l.depts[e.id];this.renderHeader(t.user,e),calNav.classList.remove("d-none");const o=window.innerWidth<=768;this.readonly=o||!(a=="admin"||a=="edit"),mainCal.loadData(s,n),mainCal.readonly=this.readonly,calList.settings=n,peopleList.settings=n,setTimeout(()=>calNav.today(),0),this._handleChangeView(),logout.addEventListener("click",this._handleLogout),mainCal.addEventListener("select",this._handleCalSelect.bind(this)),mainCal.addEventListener("change",this._handleCalChange.bind(this)),calList.addEventListener("change",this._handleCalListChange.bind(this)),peopleList.addEventListener("change",this._handlePeopleChange.bind(this)),viewDefault.addEventListener("change",this._handleChangeView.bind(this)),viewChanges.addEventListener("change",this._handleChangeView.bind(this)),viewChangesDate.addEventListener("change",this._handleViewChangesDate.bind(this)),showPriorData.addEventListener("change",this._handleViewChangesDate.bind(this)),viewEpic.addEventListener("change",this._handleChangeView.bind(this)),actionPanel.addEventListener("save",this._handleSave.bind(this)),window.addEventListener("beforeunload",this._checkDirtyOnUnload),document.addEventListener("keydown",this._handleHotkey.bind(this))}renderHeader(t,e){var s;!t||!t.email?userNameLabel.innerText="Not logged in":(s=t.user_metadata)!=null&&s.restricted?userNameLabel.innerText="View Only":userNameLabel.innerText=t.email,e.name&&(deptNameLabel.innerText=e.name),e.id&&(deptNameLabel.href="./cal.html?d="+e.id,settingsLink.href="./settings.html?d="+e.id,settingsLink.classList.remove("d-none"))}refreshAlerts(t,e){e?e.forEach(s=>mainCal.alerts[s]=t[s]??[]):mainCal.alerts=t,mainCal.forceRefresh(e),actionPanel.requestUpdate()}async _handleLogout(t){t.preventDefault(),await ge.signOut(),window.location.href="./login.html"}_handleCalSelect(t){t.detail}_handleCalChange(t){if(!mainCal.readonly){const{data:e}=t.detail,s=Object.keys(e);if(s.length>0){N({deptId:AUTH.deptId,data:e},{callback:this._handleSaveComplete}),actionPanel.enableSave();const n=P(e,this.settings);this.refreshAlerts(n,s)}}}_handleCalListChange(t){const{cal:e,color:s,checked:n}=t.detail;n!==void 0&&(SETTINGS.cals[e].visible=n?1:0),s!==void 0&&(SETTINGS.cals[e].color=s),this._handleSettingsUpdated()}_handlePeopleChange(t){SETTINGS=t.detail.settings,this._handleSettingsUpdated()}_handleSave(){mainCal.readonly||(N({},{callback:this._handleSaveComplete,flush:!0}),H({},{callback:this._handleSaveComplete,flush:!0}))}_handleSaveComplete(t){t.filter(e=>e.error).length>0?(mainCal.readonly=!0,actionPanel.errorSave(),actionPanel.requestUpdate(),be("Unable to save. Please reload page.",{autohide:!1})):!ee()&&!te()&&actionPanel.disableSave()}async _handleChangeView(t){var s,n;if(epicTs.innerText="",viewDefault.checked)q(z),mainCal.loadData(this.calData,this.settings),mainCal.readonly=this.readonly;else if(viewChanges.checked){const a=v(viewChangesDate.value);let o=null;if(a.isValid()){const l=await _e(this.auth.deptId,a.format("YYYY-MM-DD"));l.error||(o=l.data)}q(ce,{prevData:o==null?void 0:o.data}),showPriorData.checked&&(o!=null&&o.data)?(mainCal.loadData(o.data,this.settings),mainCal.readonly=!0):(mainCal.loadData(this.calData,this.settings),mainCal.readonly=this.readonly)}else if(viewEpic.checked){const a=await we(this.auth.deptId);if(!a.error){const o=v(((s=a.data)==null?void 0:s.source_ts)||null);o.isValid()?epicTs.innerText=`Data from ${o.format("M/D/YY H:mmA")}`:epicTs.innerText="No Epic data available"}q(re,{epicData:(n=a.data)==null?void 0:n.data})}const e=P(this.calData,mainCal.settings);this.refreshAlerts(e)}_handleViewChangesDate(t){viewChanges.checked||(viewChanges.checked=!0),this._handleChangeView()}_handleHotkey(t){var n,a;const e=(a=(n=t.composedPath)==null?void 0:n.call(t))==null?void 0:a[0],s=(e==null?void 0:e.nodeName)=="INPUT"||(e==null?void 0:e.nodeName)=="DIV"&&e.contentEditable=="true";(t.ctrlKey||t.metaKey)&&t.keyCode==90&&!t.altKey&&!t.shiftKey?s||(t.preventDefault(),mainCal.undo()):(t.ctrlKey&&!t.shiftKey&&t.keyCode==89||t.metaKey&&t.shiftKey&&t.keyCode==90)&&!t.altKey?s||(t.preventDefault(),mainCal.redo()):(t.metaKey||t.ctrlKey)&&t.keyCode==83&&!t.altKey&&!t.shiftKey?(t.preventDefault(),this._handleSave()):t.altKey&&t.keyCode==84&&!t.ctrlKey&&!t.metaKey&&!t.shiftKey&&!s?(t.preventDefault(),calNav.today()):t.ctrlKey&&t.keyCode==71&&!t.metaKey&&!t.altKey&&!t.shiftKey&&(s||(t.preventDefault(),calNav.focus(),document.querySelector(".cal-navbar-datesel").click()))}_checkDirtyOnUnload(t){if(ee()||te()){const e="Changes you made may not have been saved.";return(t||window.event).returnValue=e,e}}}const x=window.APP=new tt;window.AUTH=x.auth;window.CAL_DATA=x.calData;window.SETTINGS=x.settings;document.on("DOMContentLoaded",()=>{x.initEmbedMode(),x.auth.then(d=>x.fetchData(d).then(t=>x.initUI(t)).catch(t=>{console.log(t),mainCal.loadingText="Error loading calendar. Please refresh page to try again."})).catch(d=>{console.log(d),window.location.href=x.auth.redirect})});window.importData=async function(){let[d,t]=await Promise.all([fetch("./js/2024.json"),fetch("./js/settings.json")]);[d,t]=await Promise.all([d.json(),t.json()]);const e=Object.keys(SETTINGS.cals);let s=Object.keys(t.cals);if(s.length>e.length)throw new Error("Not enough existing calendars to import. Need >= "+e.length);const n={};s=s.filter(a=>!e.includes(a)),s.forEach((a,o)=>n[a]=e[o]);for(const a of Object.values(d))Object.keys(a.cals).forEach(o=>{a.cals[o].id=n[o],a.cals[n[o]]=a.cals[o],delete a.cals[o]});N({deptId:AUTH.deptId,data:d},{flush:!0}),Object.keys(t.cals).forEach(a=>{t.cals[n[a]]=t.cals[a],delete t.cals[a]}),t.options.calOrder=t.options.calOrder.map(a=>n[a]);for(const a of t.templates)for(const o of Object.values(a.data))Object.keys(o.cals).forEach(l=>{o.cals[l].id=n[l],o.cals[n[l]]=o.cals[l],delete o.cals[l]});H({deptId:AUTH.deptId,userId:AUTH.user.id,settings:t},{flush:!0})};
