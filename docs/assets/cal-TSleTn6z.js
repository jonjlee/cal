var se=Object.defineProperty;var ae=(d,t,e)=>t in d?se(d,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):d[t]=e;var b=(d,t,e)=>ae(d,typeof t!="symbol"?t+"":t,e);import{s as S,d as f,i as z,x as y,T as w,t as F,w as ne,f as oe,n as J,a as I,b as T,c as M,g as le,e as ie,h as ce,j as re,k as de,l as B,m as K,o as he,p as ue}from"./db-DgbyiZOf.js";import{C as D,U as x,I as pe,i as fe,t as me,e as ve,A as ye}from"./auth-ClBlxFA7.js";class ge extends S{createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this.monthTextDiv=this.querySelector(".cal-navbar-month"),this.dateSelector=this.querySelector(".cal-navbar-datesel"),this.dateSelectorIcon=this.querySelector(".cal-navbar-datesel-icon");const t=this.getAttribute("cal-id");this.parent=document.querySelector("#"+t),this.parent.addEventListener("displaying-month",this._handleDisplayMonth.bind(this)),this.dateSelector.addEventListener("change",()=>this.selectDate(this.dateSelector.value)),this.querySelector(".cal-navbar-datesel-icon").addEventListener("click",()=>this.dateSelector.showPicker()),this.querySelector("#cal-navbar-today-btn").addEventListener("click",()=>this.today()),this.querySelector("#cal-navbar-prevmonth").addEventListener("click",()=>this.prevMonth()),this.querySelector("#cal-navbar-nextmonth").addEventListener("click",()=>this.nextMonth())}today(){this.parent.scrollToDate(f(),"auto")}selectDate(t){this.parent.scrollToDate(t,"auto")}prevMonth(){this.parent.scrollToMonth(f(this.dateSelector.value).subtract(1,"month").format("YYYY-MM"))}nextMonth(){this.parent.scrollToMonth(f(this.dateSelector.value).add(1,"month").format("YYYY-MM"))}_handleDisplayMonth(t){t.detail.monthObj?(this.monthTextDiv.textContent=t.detail.monthObj.format("MMMM YYYY"),this.dateSelector.value=t.detail.monthObj.format("YYYY-MM-DD")):this.monthTextDiv.textContent=""}}customElements.define("cal-navbar",ge);class be{constructor(){this.clear()}clear(){this._actions=[],this._curAction=-1}add(t){this._curAction++,this._actions[this._curAction]=t,this._actions[this._curAction+1]&&this._actions.splice(this._curAction+1)}undo(){return this.hasUndo()?this._actions[this._curAction--]:null}redo(){return this.hasRedo()?this._actions[++this._curAction]:null}hasUndo(){return this._curAction>=0}hasRedo(){return this._curAction<this._actions.length-1}}const _e="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20xmlns='http://www.w3.org/2000/svg'%3e%3cstyle%3e.spinner_b2T7{animation:spinner_xe7Q%20.8s%20linear%20infinite}.spinner_YRVV{animation-delay:-.65s}.spinner_c9oY{animation-delay:-.5s}@keyframes%20spinner_xe7Q{93.75%25,100%25{r:3px}46.875%25{r:.2px}}%3c/style%3e%3ccircle%20class='spinner_b2T7'%20cx='4'%20cy='12'%20r='3'/%3e%3ccircle%20class='spinner_b2T7%20spinner_YRVV'%20cx='12'%20cy='12'%20r='3'/%3e%3ccircle%20class='spinner_b2T7%20spinner_c9oY'%20cx='20'%20cy='12'%20r='3'/%3e%3c/svg%3e";class Y extends S{constructor(){super();b(this,"forceRefresh",F((e=null)=>{const s=e?e.map(o=>"#day-"+o):"cal-day";this.requestUpdate(),this.shadowRoot.querySelectorAll(s).forEach(o=>o.forceRefresh())},250));this.data=null,this._undo=new be,this._selecting=!1,this._firstSelectedIdx=null,this._lastSelectedIdx=null}connectedCallback(){super.connectedCallback(),this.addEventListener("cal-day-change",this._handleDayChange),this.addEventListener("cal-day-mousedown",this._handleMouseDown),this.addEventListener("cal-day-mouseover",this._handleMouseOver),this.addEventListener("cal-day-mouseup",this._handleMouseUp)}disconnectedCallback(){super.disconnectedCallback(),this.removeEventListener("cal-day-change",this._handleDayChange),this.removeEventListener("cal-day-mousedown",this._handleMouseDown),this.removeEventListener("cal-day-mouseover",this._handleMouseOver),this.removeEventListener("cal-day-mouseup",this._handleMouseUp)}render(){return this.data?y`
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
        ${this.loadingText??y`<img src="${_e}" style="height:48px" />`}
      </div>`}renderDay(e,s){var h,u,p,v;const o=f().format("YYYY-MM-DD");let n="";if(e.dayObj.day()%7===1)if(e.dayObj.date()<=7&&this._wholeWeekInSameMonth(e.dayObj)){const m=e.dayObj;n=y`<div
          id="month-${m.format("YYYY-MM")}"
          class="cal-month-gutter"
        >
          <div class="fw-bold">${m.year()}</div>
          <div>${m.format("MMM").toUpperCase()}</div>
        </div>`}else n=y`<div class="cal-month-gutter"></div>`;const l=e.dayStr,a=e.dayObj.date()==1?"first-day":w,i=((h=this.data)==null?void 0:h[l])??{cals:{}},r=(u=this.alerts)==null?void 0:u[l],c=this.settings??{cals:{},options:{}};return y`${n}
      <cal-day
        id="day-${l}"
        class="${a}"
        day="${e.display?e.display:e.dayObj.date()}"
        dim=${l<o||w}
        note="${((p=i==null?void 0:i.note)==null?void 0:p.text)||(i==null?void 0:i.note)||w}"
        noteStyle="${((v=i==null?void 0:i.note)==null?void 0:v.style)||w}"
        ?readonly=${this.readonly}
        ?selected=${e.selected}
        .index=${s}
        .dayObj=${e.dayObj}
        .data=${i}
        .alerts=${r}
        .settings=${c}
      ></cal-day>`}loadData(e,s){const o=Object.keys(e).reduce((a,i)=>i<a?i:a,f().format("YYYY-MM-DD")),n=this.start||o,l=this.end||f().endOf("year").add(2,"year");this.startDateObj=f(n).startOf("month").subtract(1,"day").startOf("week").add(1,"day"),this.endDateObj=f(l).endOf("month").endOf("week").add(1,"day"),this.days=this._fillDays(this.startDateObj,this.endDateObj),this.data=e,this.settings=s,this._sortDataByEvents(this.data),this._fillDaysInData(this.data,this.settings,this.days),this._undo.clear(),this.forceRefresh()}updateData(e){const s=Object.keys(e);if(s.length>0){const o={};return s.map(n=>{o[n]=structuredClone(this.data[n])}),this._undo.add({days:s,scrollPos:this.scrollPos,redoData:structuredClone(e),undoData:o}),this._updateDays(e),this.forceRefresh(s),this._dispatch("change",{data:e}),!0}return!1}hasUndo(){return this._undo.hasUndo()}hasRedo(){return this._undo.hasRedo()}undo(){const e=this._undo.undo();return e&&this._performUndoRedo("undo",e,e.undoData),e}redo(){const e=this._undo.redo();return e&&this._performUndoRedo("redo",e,e.redoData),e}_performUndoRedo(e,s,o){let n=s.days;const l=this.getSelected();this._selectDays(n);const a=n.concat(l);this._updateDays(o),this.forceRefresh(a),this.isDateVsible(n[n.length-1])||(this.scrollPos=s.scrollPos),this._dispatch(e,{action:s}),this._dispatch("change",{data:o}),this._dispatchSelect()}scrollToMonth(e,s="smooth"){const n="#day-"+f(e).date(1).format("YYYY-MM-DD"),l=this.shadowRoot.querySelector(n);l==null||l.scrollIntoView({behavior:s})}scrollToDate(e,s="smooth"){const o=f(e),n=this.shadowRoot.querySelector(".cal-container"),l="#day-"+o.format("YYYY-MM-DD"),a=this.shadowRoot.querySelector(l);this.scrollToMonth(e,s);const i=n.scrollTop+n.clientHeight-(a.offsetTop-n.offsetTop)-a.clientHeight;i<0&&(n.scrollTop-=i);const r=this.days.find(c=>c.dayObj.isSame(o,"day"));r&&(this._clearSelectedDays(),r.selected=!0,this._selecting=!1,this._firstSelectedIdx=a.index,this._lastSelectedIdx=a.index,this._dispatchSelect(),this.requestUpdate())}get scrollPos(){return this.shadowRoot.querySelector(".cal-container").scrollTop}set scrollPos(e){const s=this.shadowRoot.querySelector(".cal-container");s.scrollTop=e}isDateVsible(e){const s=this.shadowRoot.querySelector(".cal-container"),o="#day-"+f(e).format("YYYY-MM-DD"),n=this.shadowRoot.querySelector(o);if(n){const l=s.offsetTop+s.scrollTop,a=l+s.clientHeight,i=n.offsetTop,r=i+n.clientHeight;return i<=a&&r>l}return!1}getSelected(){return this.days?this.days.filter(e=>e.selected).map(e=>e.dayStr):[]}_sortDataByEvents(e){var s;if(e){for(const o in e)if(e[o].cals)for(const n in e[o].cals){const{events:l}=e[o].cals[n];if(l){l.sort((a,i)=>{var r,c;return((r=a.resource)==null?void 0:r.toLowerCase())<((c=i.resource)==null?void 0:c.toLowerCase())?-1:1});for(const a of l)(s=a.subitems)==null||s.sort((i,r)=>{var c,h;return((c=i.resource)==null?void 0:c.toLowerCase())<((h=r.resource)==null?void 0:h.toLowerCase())?-1:1})}}}return e}_fillDays(e,s){const o=[];for(let n=e;n<=s;n=n.add(1,"day")){const l={dayObj:n,dayStr:n.format("YYYY-MM-DD")};(n===e||n.date()===1)&&(l.display=n.format("MMM D")),o.push(l)}return o}_fillDaysInData(e,s,o){var l;const n=((l=s.options)==null?void 0:l.calOrder)??[];for(const{dayStr:a}of o){e[a]=e[a]||{};const i=e[a];i.cals=i.cals||{},n.forEach(r=>{i.cals[r]=i.cals[r]||{id:r,events:[]}})}return e}_wholeWeekInSameMonth(e){return e.day(1).month()==e.day(6).add(1,"day").month()}_monthStartingInWeek(e){const s=e.day(1),o=e.day(6).add(1,"day");return s.date()===1||s.date()>o.date()?o.date(1):null}_updateDays(e){Object.entries(e).forEach(([s,o])=>{this.data[s]=structuredClone(o)})}_clearSelectedDays(){this.days.forEach(e=>{e.selected=!1})}_selectDays(e){e=Array.isArray(e)?e:[e],this.days.forEach(s=>{s.selected=e.includes(s.dayStr)})}_selectDaysBetween(e,s){const o=Math.min(e,s),n=Math.max(e,s);for(let l=o;l<=n;l++)this.days[l].selected=!0}_dispatch(e,s){this.dispatchEvent(new CustomEvent(e,{bubbles:!0,composed:!0,detail:s}))}_dispatchSelect(){this._dispatch("select",{selected:this.getSelected()})}_handleDayChange(e){var a;const{index:s,data:o,prevData:n}=e.detail,l=(a=this.days[s])==null?void 0:a.dayStr;l&&JSON.stringify(o)!=JSON.stringify(n)&&(this._undo.add({days:[l],scrollPos:this.scrollPos,redoData:{[l]:structuredClone(o)},undoData:{[l]:n}}),this._dispatch("change",{data:{[l]:o}}))}_handleMouseDown(e){const{index:s,mouseDownEvent:o}=e.detail;o.ctrlKey||o.metaKey?s!==this._firstSelectedIdx&&(this.days[s].selected=!this.days[s].selected):o.shiftKey?(this._firstSelectedIdx==this._firstSelectedIdx,this._clearSelectedDays(),this._selectDaysBetween(this._firstSelectedIdx,s)):(this._clearSelectedDays(),this._selecting=!0,this._firstSelectedIdx=s,this._lastSelectedIdx=s,this.days[e.detail.index].selected=!0),this.requestUpdate()}_handleMouseOver(e){this._selecting&&this._firstSelectedIdx!==null&&(this._clearSelectedDays(),this._selectDaysBetween(this._firstSelectedIdx,e.detail.index),this.requestUpdate())}_handleMouseUp(e){this._selecting=!1,this._dispatchSelect()}_handleScroll(e){const s=e.target,o=s.scrollTop,n=100,a=Array.from(s.querySelectorAll(".first-day")).reverse().find(i=>i.offsetTop-n-s.offsetTop<o);this.currentMonth=a.dayObj,this.dispatchEvent(new CustomEvent("displaying-month",{bubbles:!1,composed:!1,detail:{monthObj:this.currentMonth}}))}}b(Y,"styles",z`
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
  `),b(Y,"properties",{loadingText:{type:String},readonly:{type:Boolean},start:{type:String},end:{type:String},alerts:{type:Object,attribute:!1}});customElements.define("cal-component",Y);class Q extends S{render(){var l;if(!this.settings)return;const{cals:t,options:e}=this.settings??{},{calOrder:s}=e??{},o=(l=s==null?void 0:s.filter(a=>{var i;return!((i=t[a])!=null&&i.archived)}))==null?void 0:l.map(a=>{var i,r,c,h;return{id:a,label:(i=t[a])==null?void 0:i.name,color:((r=t[a])==null?void 0:r.color)||((c=t[a])==null?void 0:c.background),checked:((h=t[a])==null?void 0:h.visible)??D}}),n=y`<cal-checklist
      checkable
      .items=${o??[]}
      @checked=${this._handleCalChange}
      @color-change=${this._handleCalChange}
    >
    </cal-checklist>`;return y` ${n} `}_handleCalChange(t){const{item:e,checked:s,color:o}=t.detail;this.dispatchEvent(new CustomEvent("change",{bubbles:!1,composed:!0,detail:{cal:e.id,checked:s,color:o}}))}}b(Q,"properties",{settings:{type:Object,attribute:!1}});customElements.define("cal-callist",Q);class L extends S{willUpdate(){if(!this.settings)return;let t=this.settings.options??{};t=this.settings.options={peopleGroupOrder:[],peopleGroups:{},people:{},...t};for(const e in t.people)t.people[e].visible=t.people[e].visible??D;this._syncGroupsToPeopleChecked(t.peopleGroups,t.people)}render(){if(!this.settings)return;const{peopleGroupOrder:t,peopleGroups:e,people:s}=this.settings.options??{},o=t==null?void 0:t.map(c=>{var h;return{label:c,group:!0,checked:((h=e[c])==null?void 0:h.visible)??x}}),n=Object.entries(s??{}).sort(([c,h],[u,p])=>c.localeCompare(u)).map(([c,h])=>({label:h.name,group:!1,checked:h.visible??D,color:h.color})),l=y`<cal-checklist
      checkable
      .items=${o}
      @color-change=${this._handleColorChange}
      @checked=${this._handleGroupCheck}
    ></cal-checklist>`,a=y`<div class="divider"></div>`,i=y`<cal-checklist
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
    </div>`;return y`${l} ${a} ${i} ${r} ${a}`}_syncGroupsToPeopleChecked(t,e){for(const s in t){const o=t[s].names,n=o.filter(l=>{var a;return(a=e[l.toLowerCase()])==null?void 0:a.visible});t[s].visible=n.length==o.length?D:n.length>0?pe:x}}_dispatch(t){this.dispatchEvent(new CustomEvent(t,{bubbles:!1,composed:!0,detail:{settings:this.settings}}))}_handleColorChange(t){const{item:e,color:s}=t.detail;e.group?this.settings.options.peopleGroups[e.label].color=s:this.settings.options.people[e.label.toLowerCase()].color=s,this._dispatch("change")}_handleGroupCheck(t){const{item:e,checked:s}=t.detail;for(const o of this.settings.options.peopleGroups[e.label].names){const n=this.settings.options.people[o.toLowerCase()];n&&(n.visible=s?D:x)}this._dispatch("change"),this.requestUpdate()}_handlePersonCheck(t){const{item:e,checked:s}=t.detail,o=this.settings.options.people[e.label.toLowerCase()];o.visible=s?D:x,this._dispatch("change"),this.requestUpdate()}_handleSelectAll(t){const e=this.settings.options.people;for(const s in e)e[s].visible=t;this._dispatch("change"),this.requestUpdate()}}b(L,"properties",{settings:{type:Object,attribute:!1}}),b(L,"styles",z`
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
  `);customElements.define("cal-peoplelist",L);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class A extends fe{constructor(t){if(super(t),this.et=w,t.type!==me.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===w||t==null)return this.vt=void 0,this.et=t;if(t===ne)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.vt;this.et=t;const e=[t];return e.raw=e,this.vt={_$litType$:this.constructor.resultType,strings:e,values:[]}}}A.directiveName="unsafeHTML",A.resultType=1;const we=ve(A),q=document.querySelector("#reportModal"),De=q.querySelector(".modal-title"),Ce=q.querySelector(".modal-body"),G=new bootstrap.Modal(q),U={setTitle:d=>{De.textContent=d},setBodyHtml:d=>{Ce.innerHTML=d},show:(d,t)=>{d!==void 0&&U.setTitle(d),t!==void 0&&U.setBodyHtml(t),G.show()},hide:()=>{G.hide()}};function $(d,t,e){var a,i;const s={};oe(t,d,({day:r,calId:c,resource:h,shift:u,subitemResource:p,subitemShift:v})=>{var g,C;const m=(C=(g=e.cals)==null?void 0:g[c])==null?void 0:C.type;if((m==null?void 0:m.toLowerCase())!="call"){h=p??h,u=v??u;const H=h.toLowerCase(),O=s[H]??{display:h},V=O[r]??[];V.push(u),O[r]=V,s[H]=O}});const o={},n=Object.keys(s).sort();for(const r of d)for(const c of n){const h=c.toLowerCase();let u=0;const p=s[h][r]??[];for(const v of p)u+=((a=J(r,v))==null?void 0:a.hours)||0;o[h]=o[h]??{display:s[h].display},o[h][r]=u}n.forEach(r=>{o[r].total=Object.values(o[r]).reduce((c,h)=>c+(isNaN(h)?0:h),0)});const l=Object.values(((i=e.options)==null?void 0:i.people)??{}).map(r=>r.visible??!0?r.name.toLowerCase():null).filter(r=>r);for(const r of Object.keys(o))l.includes(r)||delete o[r];return{days:d,people:Object.keys(o),data:o}}function xe(d,t=null,e=null,s=null){const{days:o,people:n,data:l}=d,a=n.map(c=>`<th>${l[c].display}</th>`),i=o.map(c=>{const h=`<td>${f(c).format("dd M/D/YY")}</td>`,u=n.map(p=>l[p][c]).map(p=>`<td>${p}</td>`);return[h,...u]}).map(c=>`<tr>${c.join("")}</tr>`),r=n.map(c=>`<td>${l[c].total}</td>`);if(i.push(`<tr><td><i>Total</i></td>${r.join("")}</tr>`),t&&e||s){if(i.unshift(`<tr><th colspan="${n.length+1}">Selected Days</th></tr>`),t&&e){const c=n.map(h=>{var u;return`<td>${((u=e.data[h])==null?void 0:u.total)??""}</td>`});i.push(`<tr><th>Total through ${f(t).format("M/D/YY")}</th>${c.join("")}</tr>`)}if(s){const c=n.map(h=>{var u;return`<td>${((u=s.data[h])==null?void 0:u.total)??""}</td>`});i.push(`<tr><th>Total for ${f(t).year()}</th>${c.join("")}</tr>`)}}return`<table class="table table-striped">
    <thead>
      <tr>
        <th></th>
        ${a.join("")}
      </tr>
    </thead>
    <tbody>
      ${i.join("")}
    </tbody>
  </table>`}class Se extends S{constructor(){super(),this._dayData={cals:{}}}createRenderRoot(){return this}willUpdate(t){var e,s,o;this._calData=(e=this._calEl)==null?void 0:e.data,this._settings=((s=this._calEl)==null?void 0:s.settings)??{cals:{}},this._alerts=((o=this._calEl)==null?void 0:o.alerts)??{},this._renderInfo=this._createRenderInfo(this._selected,this._settings,this._dayData,this._alerts,this._calEl.readonly)}_createRenderInfo(t,e,s,o,n){var h,u;const l=this._selectedDaysAsText(t)||"Select a date",a=(t==null?void 0:t.length)==1?w:!0,i={};t.filter(p=>!!o[p]).forEach(p=>i[p]=o[p]);const r=(h=e.templates)==null?void 0:h.map((p,v)=>y`<option value="${v}">${p.name}</option>`),c=Object.keys(((u=e.options)==null?void 0:u.people)??{}).map(p=>y`<option value="${p}"></option>`);return{dayData:s,calSettings:e,selectedDaysText:l,selectedAlerts:i,copyDisabled:a,templateOptions:r,peopleDatalist:c,readonly:n}}render(){if(!this._renderInfo)return;const{dayData:t,calSettings:e,selectedDaysText:s,selectedAlerts:o,copyDisabled:n,templateOptions:l,peopleDatalist:a,readonly:i}=this._renderInfo,r=y`
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
    `,c=y`
      <h2 class="sidebar-heading">Details</h2>
      <div class="selected-days-label">${s}</div>
      <div class="selected-days-alerts">
        ${this._selected.length?this._alertTable(o):""}
      </div>
      <div class="details"></div>
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
                  <h6 class="edit-section-label">Create schedule to apply:</h6>
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

                  <h6 class="edit-section-label mt-3">Apply a template:</h6>
                  <div class="edit-section-content">
                    <div class="edit-section-row">
                      <select name="template" class="dropdown" id="template">
                        ${l}
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
                      <datalist id="people-list">${a}</datalist>
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
      ${r} ${c} ${h} ${u}
    </nav>`}enableSave(t="Save"){const e=this.querySelector(".saveBtn");e.disabled=!1,e.classList.remove("btn-outline-primary","btn-danger"),e.classList.add("btn-primary"),e.innerText=t}disableSave(t="Saved"){const e=this.querySelector(".saveBtn");e.disabled=!0,e.classList.add("btn-outline-primary","btn-danger"),e.classList.remove("btn-primary"),e.innerText=t}errorSave(t="Error"){const e=this.querySelector(".saveBtn");e.disabled=!0,e.classList.add("btn-danger"),e.classList.remove("btn-outline-primary","btn-primary"),e.innerText=t}connectedCallback(){super.connectedCallback(),this._calEl=document.querySelector("#"+this.getAttribute("cal-id")),this._calEl&&(this._calEl.addEventListener("select",this._handleSelectDay.bind(this)),this._calEl.addEventListener("undo",this._updateUndoRedo.bind(this)),this._calEl.addEventListener("redo",this._updateUndoRedo.bind(this)),this._calEl.addEventListener("change",this._updateUndoRedo.bind(this)),this._selected=this._calEl.getSelected())}_handleUndoClick(t){var e;(e=this._calEl)==null||e.undo()}_handleRedoClick(t){var e;(e=this._calEl)==null||e.redo()}_handleSaveClick(t){this.dispatchEvent(new CustomEvent("save",{bubbles:!0,composed:!1}))}_handleSelectDay(t){this._selected=t.detail.selected,this.requestUpdate()}_handleCopyClick(t){var s;const e=((s=this._selected)==null?void 0:s.length)==1&&this._selected[0];e&&this._calData&&(this._dayData=structuredClone(this._calData[e])??{cals:{}},this.requestUpdate(),t.preventDefault())}_handleClearClick(t){this._dayData={cals:{}},this.requestUpdate(),t.preventDefault()}_handleApplyScheduleClick(t){if(this._selected.length>0){const e={};this._selected.forEach(s=>{e[s]=this._dayData}),this._calEl.updateData(e)}t.preventDefault()}_handleMergeScheduleClick(t){if(this._selected.length>0){const e=this._dayData,s={};this._selected.forEach(o=>{s[o]=structuredClone(this._calData[o]),s[o].cals=s[o].cals??{},e.note&&(s[o].note=e.note),Object.keys(e.cals??{}).length&&Object.entries(e.cals).forEach(([n,l])=>{s[o].cals[n]?l.events.forEach(a=>{var r;const i=(r=s[o].cals[n].events)==null?void 0:r.findIndex(c=>{var h,u;return((h=c.resource)==null?void 0:h.toLowerCase())==((u=a.resource)==null?void 0:u.toLowerCase())});i>=0?s[o].cals[n].events.splice(i,1,a):s[o].cals[n].events.push(a)}):s[o].cals[n]=l})}),this._calEl.updateData(s)}t.preventDefault()}_handleApplyTemplateClick(t){var o,n;const e=this.querySelector("#template").value,s=(n=(o=this._settings)==null?void 0:o.templates)==null?void 0:n[e];if(s!=null&&s.data){const l={};for(const a of this._selected)if((s==null?void 0:s.format)=="week"){const i=f(a).day();l[a]=s.data[i]}else l[a]=s.data;this._calEl.updateData(l)}t.preventDefault()}_handleTimeOffClick(t){var n;let e=!1;const s={},o=this.querySelector("#remove").value.toLowerCase();if(o){for(const l of this._selected){s[l]=structuredClone(this._calData[l]);const a=(n=s[l])==null?void 0:n.cals;if(a)for(const i in a)a[i].events.forEach(r=>{r.resource.toLowerCase()==o&&(r.schedule=["OFF"],e=!0)})}e&&this._calEl.updateData(s)}}_handleUnscheduleClick(t){var n;let e=!1;const s={},o=this.querySelector("#remove").value.toLowerCase();if(o){for(const l of this._selected){s[l]=structuredClone(this._calData[l]);const a=(n=s[l])==null?void 0:n.cals;if(a)for(const i in a){const r=a[i].events;a[i].events=r.filter(c=>c.resource.toLowerCase()!=o),e=e||r.length!=a[i].events.length}}e&&this._calEl.updateData(s)}}_handleRunClick(t){const e=this.querySelector("#report").value;let s=this._selected,o=null,n=null;const l=s!=null&&s.length?f(s.reduce((a,i)=>i>a?i:a)):null;if(l&&e=="hours"){const a=f(s[0]).year();if(s.map(h=>f(h).year()).every(h=>h==a)){const h=f(new Date(a,0)),u=f(new Date(a+1,0)),p=[],v=[];for(let m=h;m.isBefore(u,"day");m=m.add(1,"day")){const g=m.format("YYYY-MM-DD");v.push(g),(m.isBefore(l,"day")||m.isSame(l,"day"))&&p.push(g)}o=$(p,this._calData,this._settings),n=$(v,this._calData,this._settings)}if(s.length==1){const h=f(s).startOf("week");s=[1,2,3,4,5,6,7].map(u=>h.add(u,"day").format("YYYY-MM-DD"))}const r=$(s,this._calData,this._settings),c=xe(r,l,o,n);U.show("Hours",c),t.preventDefault()}}_updateUndoRedo(t){var o,n;const e=this.querySelector(".undoBtn"),s=this.querySelector(".redoBtn");e.disabled=!((o=this._calEl)!=null&&o.hasUndo()),s.disabled=!((n=this._calEl)!=null&&n.hasRedo())}_selectedDaysAsText(t){let e,s,o=[];if(t&&t.length<=4){for(const n of t){const l=f(n);e==null?o.push(l.format("M/D/YY")):l.subtract(1,"day").isSame(e)?s=!0:s&&e&&!l.subtract(1,"day").isSame(e)?(o.push("-",e.format("M/D/YY"),", ",l.format("M/D/YY")),s=!1):!s&&e&&o.push(", ",l.format("M/D/YY")),e=l}s&&o.push("-",e.format("M/D/YY"))}else o.push(t.length," ","days selected");return o.join("")}_alertTable(t){const e=Object.keys(t);if(e.length==0||!Object.values(t).some(n=>n.length))return y`<div class="text-center"></div>`;const s=e.length>1,o=e.filter(n=>{var l;return((l=t[n])==null?void 0:l.length)>0}).map(n=>{var r;const a=`<tr>
          ${s?`<td class="alert-date">${f(n).format("M/D/YY")}</td>`:"<td></td>"}
          <td>${((r=t[n][0])==null?void 0:r.text)??""}</td>
        </tr>`,i=t[n].slice(1).map(c=>`<tr><td></td><td>${c.text??""}</td></tr>`);return[a,...i]}).flat().join("");return y`<table>
      <tbody>
        ${we(o)}
      </tbody>
    </table>`}}customElements.define("cal-action-panel",Se);function X(d,t){var n,l;const e={addedResources:[],removedResources:[],movedResources:[],replacedResources:[],changedResources:[]},s=W(d),o=W(t);for(const[a,i]of o){const r=s.get(a)||[];if(r.length===0)i.length===1&&((l=(n=i[0].event)==null?void 0:n.schedule)==null?void 0:l.length)===1&&i[0].event.schedule[0].toLowerCase()==="off"||e.addedResources.push(...i.map(c=>({resource:c.event.resource,eventIdx:c.index})));else{const c=Ee(r,i);e.changedResources.push(...c)}s.delete(a)}for(const[,a]of s)e.removedResources.push(...a.map(({event:i,index:r})=>({resource:i.resource,eventIdx:r})));return e}function Ie(d){if(d&&Object.keys(d).length)for(const[t,e]of Object.entries(d)){if(e.removedResources.length===1&&e.addedResources.length===1&&e.removedResources[0]!==e.addedResources[0]){e.replacedResources??(e.replacedResources=[]),e.replacedResources.push(e.addedResources[0]),e.replacedResources[0].fromResource=e.removedResources[0].resource,e.replacedResources[0].fromEventIdx=e.removedResources[0].eventIdx,e.removedResources=[],e.addedResources=[];continue}for(let s=0;s<e.removedResources.length;s++){let o=!1;const n=e.removedResources[s];for(const[l,a]of Object.entries(d))if(t!==l){if(o)break;for(let i=0;i<a.addedResources.length;i++){const r=a.addedResources[i];if(n.resource===r.resource){r.fromCalId=t,r.fromEventIdx=n.eventIdx,a.movedResources??(a.movedResources=[]),a.movedResources.push(r),a.addedResources.splice(i,1),o=!0;break}}}o&&(e.removedResources.splice(s,1),s--)}}return d}const W=d=>{const t=new Map;return d.forEach((e,s)=>{const o=e.resource.toLowerCase();t.has(o)||t.set(o,[]),t.get(o).push({event:e,index:s})}),t},Ee=(d,t)=>{const e=[],s=[];d.forEach(({event:n,index:l})=>{const a=ke(t,n.schedule);a?s.push(a.index):e.push({resource:n.resource,srcSchedule:n.schedule,eventIdx:l})});const o=t.find(({index:n})=>!s.includes(n));return o&&e.forEach(n=>{n.cmpSchedule=o.event.schedule,n.cmpEventIdx=o.index}),e},ke=(d,t)=>d.find(({event:e})=>Oe(e.schedule,t)),Oe=(d,t)=>{if(d.length!==t.length)return!1;const e=new Set(d);return t.every(s=>e.has(s))};function $e(d,t,e={}){const s={},o=Object.keys(d??{}).filter(n=>(!e.minDate||n>=e.minDate)&&(!e.maxDate||n<=e.maxDate)).sort();if(o.length>0&&(t==null?void 0:t.length)>0){const n=f(o[0]).startOf("week").add(1,"day"),l=f(o[o.length-1]);for(let a=n;a<=l;a=a.add(1,"week")){const i=a.add(1,"week"),r=o.filter(h=>a.isSame(h)||i.isSame(h)||a.isBefore(h)&&i.isAfter(h)),c=je(d,t,r);Object.assign(s,c)}}return s}function Re(d,t,e={}){const s=[];if(!d[t])return s;const{addedIds:o,removedIds:n,changedIds:l}=d[t];s.push(...o.map(a=>({text:`${e[a]||"Calendar ("+a+")"} added events`,calId:a,eventIdx:-1}))),s.push(...n.map(a=>({text:`${e[a]||a}: removed events`,calId:a,eventIdx:-1})));for(const[a,i]of Object.entries(l)){const r=e[a]||a;s.push(...i.movedResources.map(c=>({text:`${r}: ${c.resource} moved from ${e[c.fromCalId]||c.fromCalId}`,calId:a,eventIdx:c.eventIdx}))),s.push(...i.replacedResources.map(c=>({text:`${r}: ${c.resource} replaced ${c.fromResource}`,calId:a,eventIdx:c.eventIdx}))),s.push(...i.addedResources.map(c=>({text:`${r}: ${c.resource} added`,calId:a,eventIdx:c.eventIdx}))),s.push(...i.removedResources.map(c=>({text:`${r}: ${c.resource} off`,calId:a,eventIdx:-1}))),s.push(...i.changedResources.map(({resource:c,srcSchedule:h,cmpSchedule:u,eventIdx:p,cmpEventIdx:v})=>({text:`${r}: ${c} from ${h.join(", ")}`,calId:a,eventIdx:v})))}return s.forEach(a=>a.type="info"),s}function je(d,t,e){const s=t.map(n=>Te(d,n,e));if(s.length===0||s.findIndex(n=>Object.keys(n).length===0)>=0)return{};let o={idx:null,nDays:1/0};for(let n=0;n<s.length;n++){let l=0;if(s[n])for(const[a,i]of Object.entries(s[n]))(i.addedIds.length||i.removedIds.length||Object.keys(i.changedIds).length>0)&&l++;l<o.nDays&&(o={idx:n,nDays:l})}return s[o.idx]}function Te(d,t,e){var o;const s={};for(const n of e){const l=d[n],a=t.data[f(n).day()],i={addedIds:[],removedIds:[],changedIds:{}},r=new Set(Object.keys(l.cals)),c=new Set(Object.keys(a.cals));for(const h of c){if(!r.has(h))((o=a.cals[h].events)==null?void 0:o.length)>0&&i.removedIds.push(h);else{const u=X(a.cals[h].events,l.cals[h].events);Object.values(u).some(p=>p.length>0)&&(i.changedIds[h]=u)}r.delete(h),i.addedIds=Array.from(r),Ie(i.changedIds),(i.addedIds.length||i.removedIds.length||Object.keys(i.changedIds).length)&&(s[n]=i)}}return s}function Me(d,t,e={}){var l;const s={},o=new Set([...Object.keys(d),...Object.keys(t)]),n=a=>Object.entries(a).filter(([i,r])=>{var c;return((c=r.events)==null?void 0:c.length)>0}).map(([i,r])=>i);for(const a of o){const i=d[a],r=t[a];if(!(e.minDate&&a<e.minDate||e.maxDate&&a>e.maxDate))if(!i)s[a]={addedIds:n(r.cals),removedIds:[],eventChanges:{}};else if(!r)s[a]={addedIds:[],removedIds:n(i.cals),eventChanges:{}};else{const c={addedIds:[],removedIds:[],eventChanges:{}},h=new Set(Object.keys(i.cals)),u=new Set(Object.keys(r.cals));for(const p of u){if(!h.has(p))((l=r.cals[p].events)==null?void 0:l.length)>0&&c.addedIds.push(p);else{const v=X(i.cals[p].events,r.cals[p].events);Object.values(v).some(m=>m.length>0)&&(c.eventChanges[p]=v)}h.delete(p)}c.removedIds=Array.from(h),(c.addedIds.length||c.removedIds.length||Object.keys(c.eventChanges).length)&&(s[a]=c)}}return s}function Ye(d,t,e={}){const s=[];if(!d[t])return s;const{addedIds:o,removedIds:n,eventChanges:l}=d[t];s.push(...o.map(a=>`${e[a]||a}: schedule added`)),s.push(...n.map(a=>`${e[a]||a}: schedule cleared`));for(const[a,i]of Object.entries(l)){const r=e[a]||a;s.push(...i.addedResources.map(c=>`${r}: ${c.resource} added`)),s.push(...i.removedResources.map(c=>`${r}: ${c.resource} removed`)),s.push(...i.changedResources.map(({resource:c,srcSchedule:h,cmpSchedule:u,eventIdx:p,cmpEventIdx:v})=>`${r}: ${c} ${h.join(", ")} -> ${u.join(", ")}`))}return s}function Le(d,t,e={}){const s={},o=Ue(d,e.callCalIds),n=a=>Object.entries(a).filter(([i,r])=>{var c;return((c=r.events)==null?void 0:c.length)>0}).map(([i,r])=>i),l=new Set([...n(d),...Object.keys(t)]);for(const a of l){if(e.minDate&&a<e.minDate||e.maxDate&&a>e.maxDate)continue;const i=o[a]??{},r=t[a]??{},c=qe(i,r);c&&(s[a]=c)}return s}function Ae(d,t,e={}){const s=[];if(!d[t])return s;const{addedIds:o,removedIds:n,changedIds:l}=d[t];s.push(...o.map(a=>({text:`${e[a]||"Calendar ("+a+")"}: has events in Epic`,calId:a,eventIdx:-1}))),s.push(...n.map(a=>({text:`${e[a]||a}: has no events in Epic`,calId:a,eventIdx:-1})));for(const[a,i]of Object.entries(l)){const r=e[a]||a;s.push(...i.addedResources.map(c=>({text:`${r}: ${c} in Epic`,calId:a,eventIdx:-1}))),s.push(...i.removedResources.map(c=>({text:`${r}: ${c.resource} not in Epic`,calId:a,eventIdx:c.eventIdx}))),s.push(...i.changedResources.map(({resource:c,desc:h,eventIdx:u})=>({text:`${c} (${r}) ${h}`,calId:a,eventIdx:u})))}return s.forEach(a=>a.type="info"),s}function Ue(d,t=[]){var s;const e={};for(const[o,n]of Object.entries(d)){const l=e[o]??(e[o]={});for(const[a,i]of Object.entries(n.cals))if(!(t&&t.includes(a))&&i.events&&i.events.length>0){const r=l[a]??(l[a]={});for(const[c,h]of i.events.entries())if(((s=h.schedule)==null?void 0:s.length)>0){const u=h.resource;r[u]??(r[u]=[]);for(const p of h.schedule){const v=J(o,p);if(v){const{start:m,end:g,off:C}=v;m&&r[u].push({type:"shift_start",ts:m.format("YYYY-MM-DD HH:mm"),eventIdx:c}),g&&r[u].push({type:"shift_end",ts:g.format("YYYY-MM-DD HH:mm"),eventIdx:c})}else r[u].push({type:"error",desc:"invalid shift: "+JSON.stringify(p),ts:null,eventIdx:c});r[u].sort((m,g)=>{var C;return((C=m.ts)==null?void 0:C.localeCompare(g.ts))??1})}}}}return e}function qe(d,t){const e={addedIds:[],removedIds:[],changedIds:{}},s=new Set([...Object.keys(d),...Object.keys(t)]);for(const o of s){const n=d[o],l=t[o];if(!n)e.addedIds.push(o);else if(!l)e.removedIds.push(o);else{const a=Pe(n,l);a&&(e.changedIds[o]=a)}}return e}function Pe(d,t){const e={addedResources:[],removedResources:[],changedResources:[]},s=n=>{const l=n.filter(c=>c.type==="shift_start").map(c=>c.ts),a=n.filter(c=>c.type==="shift_end").map(c=>c.ts),i=n.filter(c=>c.type==="unavailable_start").map(c=>c.ts),r=n.filter(c=>c.type==="unavailable_end").map(c=>c.ts);return l.length>0&&l.length==i.length&&a.length==r.length&&l.every(c=>i.includes(c))&&a.every(c=>r.includes(c))},o={...Object.fromEntries([...Object.keys(t).map(n=>[n.toLowerCase(),{name:n}]),...Object.keys(d).map(n=>{var l;return[n.toLowerCase(),{name:n,eventIdx:(l=d[n][0])==null?void 0:l.eventIdx}]})])};return Object.keys(o).forEach(n=>{const l=o[n].name,a=d[l]??[],i=t[l]??[],r=s(i)?[]:i;if(a.length===0&&r.length>0)e.addedResources.push(l);else if(r.length===0&&a.length>0)e.removedResources.push({resource:l,eventIdx:o[n].eventIdx});else{const c=Ne(a,r);c&&e.changedResources.push({resource:l,...c})}}),e.addedResources.length===0&&e.removedResources.length===0&&e.changedResources.length===0?null:e}function Ne(d,t){var a,i,r,c;let e=0,s=0;const o=d.filter(h=>h.type=="error"||!h.ts);if(o.length>0)return{desc:o[0].desc||"Problem with schedule",eventIdx:o[0].eventIdx};t=t.filter(h=>h.ts);let n="off",l="off";for(;e<d.length||s<t.length;){let h=((a=d[e])==null?void 0:a.ts)??t[s].ts;h=t[s].ts<h?t[s].ts:h;let u,p,v=null;const m=[],g=[];do u=((i=d[e])==null?void 0:i.ts)===h&&d[e],p=((r=t[s])==null?void 0:r.ts)===h&&t[s],(u==null?void 0:u.ts)===h&&(m.push(u.type),v=u.eventIdx,e++),(p==null?void 0:p.ts)===h&&(g.push(p.type),s++);while(u&&u.ts===h||p&&p.ts===h);if(m.includes("shift_end")?n="off":m.includes("shift_start")&&(n="shift"),g.includes("shift_end")?l="off":g.includes("unavailable_end")?l="shift":g.includes("unavailable_start")?l="unavailable":g.includes("shift_start")&&(l="shift"),n!==l&&l!=="unavailable")return{desc:"differs at "+(f(h).isValid()?f(h).format("h:mmA"):h),eventIdx:v??((c=d[0])==null?void 0:c.eventIdx)}}return null}const P="default",Z="changes",ee="epic";let te=P,E={};function R(d,t={}){te=d,E=t}function j(d,t,e={}){switch(te){case P:return He(d,t,{...E,options:e});case Z:return Ve(d,t,{...E,options:e});case ee:return Be(d,t,{...E,options:e});default:return{}}}function He(d,t,e={}){var l;if(!e.showChanges)return{};const s=(l=t==null?void 0:t.templates)==null?void 0:l.filter(a=>a.type=="regular");e.minDate=e.minDate??I(),e.maxDate=e.maxDate??k(d);const o=Ke(d,t,[Ge],e),n=$e(d,s,e);return Object.keys(n).forEach(a=>{o[a]??(o[a]=[]),o[a]=o[a].concat(Re(n,a,N(t)))}),o}function Ve(d,t,e={}){const s=e.prevData;if(e.minDate=e.minDate??I(),!e.maxDate){const[l,a]=[k(d),k(s)];e.maxDate=l>a?l:a}if(!s)return{};const o=Me(s,d,e),n={};return Object.keys(o).forEach(l=>{const a=Ye(o,l,N(t));n[l]=a.map(i=>({type:"info",text:i}))}),n}function Be(d,t,e={}){const s=e.epicData??{};if(e.minDate=e.minDate??I(),!e.maxDate){const a=k(d),i=Object.keys(s).reduce((r,c)=>r>c?r:c,"");e.maxDate=a>i?a:i}if(!s)return{};const o=t.cals??{};e.callCalIds=Object.keys(o).filter(a=>o[a].type=="call");const n=Le(d,s,e),l={};return Object.keys(n).forEach(a=>{l[a]=Ae(n,a,N(t))}),l}const Ke=(d,t,e=[],{days:s=null,minDate:o=I(),maxDate:n=null,context:l=null}={})=>{const a={};return s=s??Object.keys(d),s=o?s.filter(i=>i>=o):s,s=n?s.filter(i=>i<=n):s,s.forEach(i=>{const r=a[i]??[];e.forEach(c=>{const h=c(i,d[i],d,t,l);(h==null?void 0:h.length)>0&&r.push(...h)}),r.length&&(a[i]=r)}),a},Ge=(d,t,e,s,o)=>{var a;const n=Object.keys(((a=s.options)==null?void 0:a.people)??{}).map(i=>i.toLowerCase()),l=[];if(n.length>0){const i=new Set;Object.values(t.cals??{}).forEach(({events:r})=>{r.forEach(({resource:c,subitems:h})=>{c&&!n.includes(c.toLowerCase())&&i.add(c),h==null||h.forEach(({resource:u})=>{u&&!n.includes(u.toLowerCase())&&i.add(u)})})}),i.size>0&&l.push({type:"warn",text:"Unrecognized: "+Array.from(i.values()).join(", ")})}return l},k=d=>{let t=I();return d&&Object.entries(d).forEach(([e,s])=>{(s.note||Object.values(s.cals??{}).findIndex(n=>{var l;return((l=n.events)==null?void 0:l.length)>0})>-1)&&e>t&&(t=e)}),t},N=d=>Object.fromEntries(Object.entries(d.cals??{}).map(([t,e])=>[t,e.name]));class We{constructor(){b(this,"_handleSettingsUpdated",F(()=>{mainCal.alerts=j(mainCal.data,SETTINGS),mainCal.forceRefresh(),actionPanel.requestUpdate(),mainCal.readonly||(M({deptId:AUTH.deptId,userId:AUTH.user.id,settings:SETTINGS},{callback:this._handleSaveComplete}),actionPanel.enableSave())},250));this.calData=null,this.settings=null,this.alerts=null,this.readonly=!1,this.auth=new ye("cal.html",window.location.search).auth}initEmbedMode(){new URLSearchParams(window.location.search).get("embed")=="1"&&(deptNameLabel.style.cssText="display:none !important",menu.style.cssText="display:none !important",sidebar.style.cssText="display:none !important",actionPanel.style.cssText="display:none !important")}async fetchData(t){var n;if(!t.user||t.deptId==null)throw new Error(`Unable to fetch due to invalid user and department ${(n=t.user)==null?void 0:n.id}, ${t.deptId}`);const e=le(t.deptId),s=ie(t.deptId),o=ce(t.deptId);return Promise.all([e,s,o]).then(async l=>{if(e.error||s.error||o.error)throw new Error(`Error fetching data: ${[e.error,s.error,o.error]}`);return{auth:t,dept:l[0].data,calData:l[1].data,settings:l[2].data}})}initUI({auth:t,dept:e,calData:s,settings:o}){var a;if(!t||!s||!o)throw new Error("Invalid login or user data");[this.auth,this.calData,this.settings]=[t,s,o],[window.AUTH,window.CAL_DATA,window.SETTINGS]=[t,s,o];const n=(a=t.user.user_metadata)==null?void 0:a.depts[e.id];this.renderHeader(t.user,e),calNav.classList.remove("d-none");const l=window.innerWidth<=768;this.readonly=l||!(n=="admin"||n=="edit"),mainCal.loadData(s,o),mainCal.readonly=this.readonly,calList.settings=o,peopleList.settings=o,setTimeout(()=>calNav.today(),0),this._handleChangeView(),logout.addEventListener("click",this._handleLogout),mainCal.addEventListener("select",this._handleCalSelect.bind(this)),mainCal.addEventListener("change",this._handleCalChange.bind(this)),calList.addEventListener("change",this._handleCalListChange.bind(this)),peopleList.addEventListener("change",this._handlePeopleChange.bind(this)),viewDefault.addEventListener("change",this._handleChangeView.bind(this)),viewChanges.addEventListener("change",this._handleChangeView.bind(this)),showHighlights.addEventListener("change",this._handleChangeView.bind(this)),viewChangesDate.addEventListener("change",this._handleViewChangesDate.bind(this)),showPriorData.addEventListener("change",this._handleViewChangesDate.bind(this)),viewEpic.addEventListener("change",this._handleChangeView.bind(this)),actionPanel.addEventListener("save",this._handleSave.bind(this)),window.addEventListener("beforeunload",this._checkDirtyOnUnload),document.addEventListener("keydown",this._handleHotkey.bind(this))}renderHeader(t,e){var s;!t||!t.email?userNameLabel.innerText="Not logged in":(s=t.user_metadata)!=null&&s.restricted?userNameLabel.innerText="View Only":userNameLabel.innerText=t.email,e.name&&(deptNameLabel.innerText=e.name),e.id&&(deptNameLabel.href="./cal.html?d="+e.id,settingsLink.href="./settings.html?d="+e.id,settingsLink.classList.remove("d-none"))}refreshAlerts(t,e){e?e.forEach(s=>mainCal.alerts[s]=t[s]??[]):mainCal.alerts=t,mainCal.forceRefresh(e),actionPanel.requestUpdate()}async _handleLogout(t){t.preventDefault(),await re.signOut(),window.location.href="./login.html"}_handleCalSelect(t){t.detail}_handleCalChange(t){if(!mainCal.readonly){const{data:e}=t.detail,s=Object.keys(e);if(s.length>0){T({deptId:AUTH.deptId,data:e},{callback:this._handleSaveComplete}),actionPanel.enableSave();const o=j(e,this.settings);this.refreshAlerts(o,s)}}}_handleCalListChange(t){const{cal:e,color:s,checked:o}=t.detail;o!==void 0&&(SETTINGS.cals[e].visible=o?1:0),s!==void 0&&(SETTINGS.cals[e].color=s),this._handleSettingsUpdated()}_handlePeopleChange(t){SETTINGS=t.detail.settings,this._handleSettingsUpdated()}_handleSave(){mainCal.readonly||(T({},{callback:this._handleSaveComplete,flush:!0}),M({},{callback:this._handleSaveComplete,flush:!0}))}_handleSaveComplete(t){t.filter(e=>e.error).length>0?(mainCal.readonly=!0,actionPanel.errorSave(),actionPanel.requestUpdate(),de("Unable to save. Please reload page.",{autohide:!1})):!B()&&!K()&&actionPanel.disableSave()}async _handleChangeView(t){var s,o;if(epicTs.innerText="",viewDefault.checked)R(P,{showChanges:showHighlights.checked}),mainCal.loadData(this.calData,this.settings),mainCal.readonly=this.readonly;else if(viewChanges.checked){const n=f(viewChangesDate.value);let l=null;if(n.isValid()){const a=await he(this.auth.deptId,n.format("YYYY-MM-DD"));a.error||(l=a.data)}R(Z,{prevData:l==null?void 0:l.data}),showPriorData.checked&&(l!=null&&l.data)?(mainCal.loadData(l.data,this.settings),mainCal.readonly=!0):(mainCal.loadData(this.calData,this.settings),mainCal.readonly=this.readonly)}else if(viewEpic.checked){const n=await ue(this.auth.deptId);if(!n.error){const l=f(((s=n.data)==null?void 0:s.source_ts)||null);l.isValid()?epicTs.innerText=`Data from ${l.format("M/D/YY H:mmA")}`:epicTs.innerText="No Epic data available"}R(ee,{epicData:(o=n.data)==null?void 0:o.data})}const e=j(this.calData,mainCal.settings);this.refreshAlerts(e)}_handleViewChangesDate(t){viewChanges.checked||(viewChanges.checked=!0),this._handleChangeView()}_handleHotkey(t){var o,n;const e=(n=(o=t.composedPath)==null?void 0:o.call(t))==null?void 0:n[0],s=(e==null?void 0:e.nodeName)=="INPUT"||(e==null?void 0:e.nodeName)=="DIV"&&e.contentEditable=="true";(t.ctrlKey||t.metaKey)&&t.keyCode==90&&!t.altKey&&!t.shiftKey?s||(t.preventDefault(),mainCal.undo()):(t.ctrlKey&&!t.shiftKey&&t.keyCode==89||t.metaKey&&t.shiftKey&&t.keyCode==90)&&!t.altKey?s||(t.preventDefault(),mainCal.redo()):(t.metaKey||t.ctrlKey)&&t.keyCode==83&&!t.altKey&&!t.shiftKey?(t.preventDefault(),this._handleSave()):t.altKey&&t.keyCode==84&&!t.ctrlKey&&!t.metaKey&&!t.shiftKey&&!s?(t.preventDefault(),calNav.today()):t.ctrlKey&&t.keyCode==71&&!t.metaKey&&!t.altKey&&!t.shiftKey&&(s||(t.preventDefault(),calNav.focus(),document.querySelector(".cal-navbar-datesel").click()))}_checkDirtyOnUnload(t){if(B()||K()){const e="Changes you made may not have been saved.";return(t||window.event).returnValue=e,e}}}const _=window.APP=new We;window.AUTH=_.auth;window.CAL_DATA=_.calData;window.SETTINGS=_.settings;document.on("DOMContentLoaded",()=>{_.initEmbedMode(),_.auth.then(d=>_.fetchData(d).then(t=>_.initUI(t)).catch(t=>{console.log(t),mainCal.loadingText="Error loading calendar. Please refresh page to try again."})).catch(d=>{console.log(d),window.location.href=_.auth.redirect})});window.importData=async function(){let[d,t]=await Promise.all([fetch("./js/2024.json"),fetch("./js/settings.json")]);[d,t]=await Promise.all([d.json(),t.json()]);const e=Object.keys(SETTINGS.cals);let s=Object.keys(t.cals);if(s.length>e.length)throw new Error("Not enough existing calendars to import. Need >= "+e.length);const o={};s=s.filter(n=>!e.includes(n)),s.forEach((n,l)=>o[n]=e[l]);for(const n of Object.values(d))Object.keys(n.cals).forEach(l=>{o[l]&&(n.cals[l].id=o[l],n.cals[o[l]]=n.cals[l],delete n.cals[l])});T({deptId:AUTH.deptId,data:d},{flush:!0}),Object.keys(t.cals).forEach(n=>{o[n]&&(t.cals[o[n]]=t.cals[n],delete t.cals[n])}),t.options.calOrder=t.options.calOrder.map(n=>o[n]??n);for(const n of t.templates)for(const l of Object.values(n.data))Object.keys(l.cals).forEach(a=>{o[a]&&(l.cals[a].id=o[a],l.cals[o[a]]=l.cals[a],delete l.cals[a])});M({deptId:AUTH.deptId,userId:AUTH.user.id,settings:t},{flush:!0})};
