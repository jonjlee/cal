var x=Object.defineProperty;var E=(l,e,t)=>e in l?x(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var h=(l,e,t)=>E(l,typeof e!="symbol"?e+"":e,t);import{s as u,i as b,x as d,n as D,E as v,g as G,j as L,k as S,e as U,F as T,G as O,H as M}from"./db-BFHgCUQR.js";import{A as q}from"./auth-DEnwGWKL.js";import"./cal-checklist-DDdF7yIu.js";class _ extends u{constructor(){super(),this._deleteMode=!1}createRenderRoot(){return this}willUpdate(e){(e.has("cal")||e.has("calId"))&&(this._deleteMode=!1)}render(){if(!this.cal)return;const{name:e,archived:t,color:a,background:s}=this.cal,i=this.cal.type==="call",n=this._deleteMode?d`<div class="fade-in">
          <p class="text-danger">
            Action cannot be undone. Delete calendar and its events, including
            within templates?
          </p>
          <button class="btn btn-danger" @click="${this._handleConfirmDelete}">
            Confirm Delete
          </button>
        </div>`:d`<a href="#" class="text-danger" @click="${this._handleDelete}"
          >Delete calendar</a
        >`;return d`
      <div class="col-12 mt-3">
        <div class="card p-3 pt-2 pb-2">
          <p class="fw-semibold">Details</p>
          <input
            type="text"
            class="form-control"
            id="calName"
            placeholder="Calendar Name"
            @change="${this._handleNameChange}"
            .value=${e}
          />
          <div class="form-check mt-3">
            <label for="visible"
              >Include this calendar in the left sidebar</label
            >
            <input
              id="visible"
              class="form-check-input"
              type="checkbox"
              @change="${this._handleArchivedChange}"
              .checked=${!t}
            />
          </div>
          <div class="form-check mt-3">
            <label for="call"
              >This is a call calendar. Anchor it to the bottom of each day. Use
              it to route incoming calls, if enabled.</label
            >
            <input
              id="call"
              class="form-check-input"
              type="checkbox"
              @change="${this._handleCallChange}"
              .checked=${i}
            />
          </div>
          <p class="fw-semibold mt-3">Colors</p>
          <div class="row">
            <div class="col-1">
              <input
                id="color"
                class="form-control form-control-color form-control-sm"
                type="color"
                @change="${this._handleColorChange}"
                .value=${a??"#ffffff"}
              />
            </div>
            <label for="color" class="col-sm-10 col-form-label"
              >Color of the line separating the events in this calendar</label
            >
          </div>
          <div class="row">
            <div class="col-1">
              <input
                id="background"
                class="form-control form-control-color form-control-sm"
                type="color"
                @change="${this._handleBackgroundChange}"
                .value=${s??"#ffffff"}
              />
            </div>
            <label for="background" class="col-sm-10 col-form-label"
              >Background color for this calendar</label
            >
          </div>
          <div class="mt-3">${n}</div>
        </div>
      </div>
    `}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleNameChange(e){this.cal.name=e.target.value,this._dispatch("details-change",{calId:this.calId,cal:this.cal})}_handleArchivedChange(e){this.cal.archived=e.target.checked?0:1,this._dispatch("details-change",{calId:this.calId,cal:this.cal})}_handleCallChange(e){this.cal.type=e.target.checked?"call":"",this._dispatch("details-change",{calId:this.calId,cal:this.cal})}_handleColorChange(e){this.cal.color=e.target.value,this._dispatch("details-change",{calId:this.calId,cal:this.cal})}_handleBackgroundChange(e){this.cal.background=e.target.value,this._dispatch("details-change",{calId:this.calId,cal:this.cal})}_handleDelete(e){e.preventDefault(),this._deleteMode=!0,this.requestUpdate()}_handleConfirmDelete(e){this._dispatch("delete-click",{calId:this.calId})}}h(_,"styles",b`
    input[type="color"] {
      width: 2.25em;
      border-radius: 1.2em;
    }
  `),h(_,"properties",{calId:{type:String,attribute:!1},cal:{type:Object,attribute:!1}});customElements.define("set-caldetails",_);class f extends u{constructor(){super(),this.validationErrors={}}createRenderRoot(){return this}render(){return this.cal?d`
      <div class="col-12 mt-3">
        <div class="card p-3 pt-2 pb-2">
          <p class="fw-semibold">Coverage</p>
          <div class="text-secondary pb-3">
            Set required coverage each day, formatted like: 8a-12p, 1p-5p. Leave blank for no coverage requirement.
          </div>
          
          ${this._renderCoverageForm(this.cal)}
        </div>
      </div>
    `:d`<div>No calendar selected.</div>`}_renderCoverageForm(e){const t=e.coverage||{mon:"",tue:"",wed:"",thu:"",fri:"",sat:"",sun:""};return d`
      <div class="tab-content">
        ${[{key:"mon",label:"Monday",placeholder:"e.g. 8a-5p or blank if none"},{key:"tue",label:"Tuesday"},{key:"wed",label:"Wednesday"},{key:"thu",label:"Thursday"},{key:"fri",label:"Friday"},{key:"sat",label:"Saturday"},{key:"sun",label:"Sunday"}].map(s=>this._renderDayInput(s,t[s.key],s.placeholder))}
      </div>
    `}_renderDayInput(e,t,a){const s=`${this.calId}-${e.key}`,i=this.validationErrors[s];return d`
      <div class="day-row">
        <div class="row align-items-center">
          <div class="col-sm-2">
            <span class="day-label">${e.label}</span>
          </div>
          <div class="col-sm-10">
            <input
              type="text"
              class="form-control coverage-input ${i?"is-invalid":""}"
              placeholder=${a}
              .value=${t||""}
              @change="${n=>this._handleCoverageChange(e.key,n.target.value)}"
            />
            ${i?d`<div class="coverage-error">${i}</div>`:""}
          </div>
        </div>
      </div>
    `}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleCoverageChange(e,t){this.cal.coverage||(this.cal.coverage={mon:"",tue:"",wed:"",thu:"",fri:"",sat:"",sun:""}),this._validateInput(e,t),this.cal.coverage[e]=t,this._dispatch("coverage-change",{calId:this.calId,cal:this.cal})}_validateInput(e,t){const a=`${this.calId}-${e}`,s=this._coverageTimeErrors(t);s?this.validationErrors[a]=s:delete this.validationErrors[a],this.requestUpdate()}_coverageTimeErrors(e){if(!(e!=null&&e.trim()))return null;const t=e.split(",").map(a=>a.trim());for(const a of t){const s=D(null,a);if(!s||s.off)return"Invalid coverage. Use times like: 8a-12p, 1p-5p"}return null}}h(f,"styles",b`
  `),h(f,"properties",{cal:{type:Object,attribute:!1},calId:{type:String,attribute:!1}});customElements.define("set-coverage",f);class C extends u{constructor(){super(),this.settings=null,this._renderInfo=null,this._selectedIdx=0}createRenderRoot(){return this}willUpdate(e){this.settings&&(this._renderInfo=this._createRenderInfo(this.settings,this._selectedIdx))}_createRenderInfo(e,t){var c;const{cals:a,options:s}=e,i=s.calOrder||[];t=Math.min(t,i.length-1);const n=i==null?void 0:i.map(o=>{var p;return{id:o,label:(p=a[o])==null?void 0:p.name,cal:a[o]}}),r=(c=n[t])==null?void 0:c.cal;return{items:n,selectedCal:r,selectedIdx:t}}render(){var r,c;if(!this._renderInfo)return;const{items:e,selectedCal:t,selectedIdx:a}=this._renderInfo,s=d`<cal-checklist
        addable
        selectable
        disableDelete
        selected=${a}
        @add-item=${this._handleAddCal}
        @select=${this._handleSelectCal}
        itemStyle="padding: 0.4em 0.7em;"
        .items=${e}
      </cal-checklist>`,i=d`<set-caldetails
      @details-change=${this._handleCalChange}
      @delete-click=${this._handleDeleteCal}
      .calId=${(r=e[a])==null?void 0:r.id}
      .cal=${t}
    ></set-caldetails>`,n=d`<set-coverage
      @coverage-change=${this._handleCoverageChange}
      .calId=${(c=e[a])==null?void 0:c.id}
      .cal=${t}
    ></set-coverage>`;return d` ${s} ${i} ${n} `}get _list(){var e;return(e=this.renderRoot)==null?void 0:e.querySelector("cal-checklist")}get _details(){var e;return(e=this.renderRoot)==null?void 0:e.querySelector("set-caldetails")}get _coverage(){var e;return(e=this.renderRoot)==null?void 0:e.querySelector("set-coverage")}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleAddCal(e){const{item:t}=e.detail;t.label="...",this._dispatch("add-cal",{item:e.detail.item})}_handleSelectCal(e){const{item:t,index:a}=e.detail;this._selectedIdx=a,this._details.calId=t.id,this._details.cal=this.settings.cals[t.id],this._coverage.calId=t.id,this._coverage.cal=this.settings.cals[t.id]}_handleCalChange(e){const{calId:t,cal:a}=e.detail;this._renderInfo.items[this._selectedIdx].label=a.name,this._list.requestUpdate(),this._dispatch("change-cal",{calId:t,cal:a})}_handleDeleteCal(e){const{calId:t}=e.detail;this._selectedIdx=Math.max(this._selectedIdx-1,0),this._dispatch("delete-cal",{calId:t})}_handleCoverageChange(e){this._dispatch("coverage-change",e.detail)}}h(C,"properties",{settings:{type:Object,attribute:!1}});customElements.define("set-callist",C);class y extends u{constructor(){super(),this.settings=null,this._renderInfo=null,this._selectedIdx=0,this._selectedGroup=null,this._deleteMode=!1}createRenderRoot(){return this}willUpdate(e){if(!this.settings)return;const t=this.settings.options.peopleGroupOrder||[];this._selectedIdx=Math.min(this._selectedIdx,t.length-1),this._selectedGroup=t[this._selectedIdx]||"",this._renderInfo=this._createRenderInfo(this.settings,this._selectedIdx,this._selectedGroup)}_createRenderInfo(e,t,a){var c,o;const{peopleGroups:s,peopleGroupOrder:i}=e.options,n=i==null?void 0:i.map(p=>({label:p})),r=(o=(c=s==null?void 0:s[a])==null?void 0:c.names)==null?void 0:o.map(p=>({group:a,label:p}));return{selectedIdx:t,selectedGroup:a,groupItems:n,memberItems:r}}render(){if(!this._renderInfo)return;const{selectedIdx:e,selectedGroup:t,groupItems:a,memberItems:s}=this._renderInfo,i=d`<cal-checklist
      addable
      selectable
      disableDelete
      selected=${e}
      @add-item=${this._handleAddGroup}
      @select=${this._handleSelectGroup}
      itemStyle="padding: 0.4em 0.7em;"
      .items=${a}
    ></cal-checklist>`,n=this._deleteMode?d`<div class="mt-3 fade-in">
          <p class="text-danger">
            Remove group? Scheduled shifts in calendars will NOT be deleted.
          </p>
          <button class="btn btn-danger" @click=${this._handleConfirmDelete}>
            Confirm Delete
          </button>
        </div>`:d`<a
          class="text-danger mt-2"
          href="#"
          @click=${this._handleDeleteGroup}
          >Delete Group</a
        >`,r=d`<div class="card p-3 pt-2 pb-2 mt-3">
      <p class="fw-semibold">Details</p>
      <div class="row">
        <div class="col-2">
          <label class="col-form-label">Group Name:</label>
        </div>
        <div class="col-10">
          <input
            type="text"
            class="form-control"
            id="groupName"
            placeholder="Group Name"
            @change="${this._handleChangeGroupName}"
            .value=${t}
          />
        </div>
      </div>
      <div class="row mt-2">
        <div class="col-2">
          <label class="col-form-label">Members:</label>
        </div>
        <div class="col-10">
          <cal-checklist
            id="members"
            addable
            editable
            @change=${this._handleChangeMemberName}
            @delete-item=${this._handleDeleteMember}
            itemStyle="padding: 0.2em 0.4em;"
            .items=${s}
          ></cal-checklist>
        </div>
        ${n}
      </div>
    </div>`;return d` ${i} ${r} `}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleAddGroup(e){const{item:t}=e.detail;t.label="Group "+(this.settings.options.peopleGroupOrder.length+1),this._dispatch("add-group",{group:t.label}),this._deleteMode=!1,this.requestUpdate()}_handleChangeGroupName(e){const t=e.target.value.trim(),a=this._selectedGroup;t&&t!==a&&this._dispatch("change-group",{group:a,name:t})}_handleSelectGroup(e){const{index:t}=e.detail;this._selectedIdx=t,this._selectedGroup=this.settings.options.peopleGroupOrder[this._selectedIdx],this._deleteMode=!1,this.requestUpdate()}_handleChangeMemberName(e){const{index:t,label:a}=e.detail,s=this._selectedGroup;this._dispatch("change-person",{group:s,index:t,person:a}),this._deleteMode=!1}_handleDeleteMember(e){const{index:t,item:a}=e.detail,s=this._selectedGroup;this._dispatch("remove-person",{group:s,index:t,person:a.label})}_handleDeleteGroup(e){e.preventDefault(),this._deleteMode=!0,this.requestUpdate()}_handleConfirmDelete(e){const t=this._selectedGroup;t&&(this._dispatch("delete-group",{group:t}),this._deleteMode=!1,this.requestUpdate())}}h(y,"properties",{settings:{type:Object,attribute:!1}});customElements.define("set-peoplelist",y);class $ extends u{constructor(){super(),this.settings=null,this.template=null,this._deleteMode=!1}createRenderRoot(){return this}render(){var n;if(!this.settings||!this.template)return;const{name:e,data:t}=this.template,a=this._deleteMode?d`<div class="fade-in">
          <p class="text-danger">
            Action cannot be undone. Delete this template?
          </p>
          <button class="btn btn-danger" @click="${this._handleConfirmDelete}">
            Confirm Delete
          </button>
        </div>`:d`<a href="#" class="text-danger" @click="${this._handleDelete}"
          >Delete template</a
        >`,s=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],i=[];for(let r=1;r<=7;r++){const c=t[r%7];i.push(d`<cal-day
        day=${s[r-1]}
        note="${((n=c==null?void 0:c.note)==null?void 0:n.text)||(c==null?void 0:c.note)||""}"
        showAll
        @cal-day-change=${this._handleTemplateChange}
        .index=${r}
        .data=${c}
        .settings=${this.settings}
      ></cal-day>`)}return d`<div class="col-12 mt-3">
      <div class="card p-3 pt-2 pb-2">
        <p class="fw-semibold">Details</p>
        <input
          type="text"
          class="form-control"
          id="templateName"
          placeholder="Template Name"
          @change="${this._handleNameChange}"
          .value=${e}
        />
        <div class="col-12 mt-3 template-week">${i}</div>
        <div class="row mt-3 mb-2">
          <div class="col-2">
            <a
              href="#"
              class="btn btn-outline-primary"
              @click=${this._handleDuplicate}
              >Duplicate</a
            >
          </div>
          <div class="col-10 align-self-center">${a}</div>
        </div>
      </div>
    </div>`}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleNameChange(e){e.preventDefault(),e.stopPropagation(),this.template.name=e.target.value,this._dispatch("change",{template:this.template,weekday:null}),this._deleteMode=!1}_handleTemplateChange(e){const{index:t,data:a,prevData:s}=e.detail;JSON.stringify(a)!=JSON.stringify(s)&&this._dispatch("change",{template:this.template,weekday:t}),this._deleteMode=!1}_handleDuplicate(e){e.preventDefault(),this._deleteMode=!1,this._dispatch("duplicate-click",{template:this.template})}_handleDelete(e){e.preventDefault(),this._deleteMode=!0,this.requestUpdate()}_handleConfirmDelete(e){this._dispatch("delete-click",{template:this.template}),this._deleteMode=!1,this.requestUpdate()}}h($,"properties",{settings:{type:Object,attribute:!1},template:{type:Object,attribute:!1}});customElements.define("set-template-details",$);function N(l,e,t){const a=l.cals??(l.cals={}),s=l.options??(l.options={}),i=s.calOrder??(s.calOrder=[]),n={name:"Calendar",archived:0,visible:1,color:"#333333",coverage:{mon:"",tue:"",wed:"",thu:"",fri:"",sat:"",sun:""}};return a[e]||(a[e]={},i.push(""+e)),a[e]={...n,...a[e],...t},l}function R(l,e,t){const a=l.cals??(l.cals={});return a[e]??(a[e]={}),a[e]={...a[e],...t},l}function A(l,e){const t=l.cals??(l.cals={});delete t[e];const a=l.options??(l.options={}),s=a.calOrder??(a.calOrder=[]);return s.includes(e)&&s.splice(s.indexOf(e),1),l}function P(l,e){var i;const t=l.options??(l.options={}),a=t.peopleGroupOrder??(t.peopleGroupOrder=[]),s=t.peopleGroups??(t.peopleGroups={});return s[e]||(s[e]={group:e},a.push(e)),(i=s[e]).names??(i.names=[]),l}function j(l,e){const t=l.options??(l.options={}),a=t.peopleGroupOrder??(t.peopleGroupOrder=[]),s=t.peopleGroups??(t.peopleGroups={});if(s[e]){const i=a.indexOf(e);i>=0&&a.splice(i,1),delete s[e]}return g(l),l}function B(l,e,t){const a=l.options??(l.options={}),s=a.peopleGroupOrder??(a.peopleGroupOrder=[]),i=a.peopleGroups??(a.peopleGroups={});if(e!=t&&i[e]){const n=s.indexOf(e);n>=0&&(s[n]=t),i[t]=i[e],i[t].group=t,delete i[e]}return l}function F(l,e,t){var c;const a=l.options??(l.options={}),s=a.peopleGroups??(a.peopleGroups={});if(s[e]===void 0)return;const i=a.people??(a.people={}),n=t.toLowerCase();return i[n]??(i[n]={name:t}),((c=s[e]).names??(c.names=[])).push(t),l}function H(l,e,t,a){var r;const s=l.options??(l.options={}),i=s.peopleGroups??(s.peopleGroups={});if(i[e]===void 0||t>i[e].names.length-1)return;const n=(r=i[e]).names??(r.names=[]);return n[t]=a,g(l),l}function J(l,e,t){const a=l.options??(l.options={}),s=a.peopleGroups??(a.peopleGroups={});if(!(!s[e]||t>=s[e].names.length))return s[e].names.splice(t,1),g(l),l}function g(l){const e=l.options??(l.options={}),t=e.peopleGroups??(e.peopleGroups={}),a=e.people??(e.people={}),s={};return Object.values(t).forEach(i=>{i.names.forEach(n=>{s[n.toLowerCase()]=n})}),Object.keys(a).forEach(i=>{s[i]||delete a[i]}),Object.entries(s).forEach(([i,n])=>{a[i]??(a[i]={}),a[i].name=n}),l}function I(){return{name:"Template",format:"week",type:"regular",data:{1:{cals:{}},2:{cals:{}},3:{cals:{}},4:{cals:{}},5:{cals:{}},6:{cals:{}},0:{cals:{}}}}}function W(l,e=null){return e??(e=I()),l.templates.push(e),l}function z(l,e){return l.templates.splice(e,1),l}class k extends u{constructor(){super(),this.settings=null,this._selectedIdx=0,this._templateIdx=null}createRenderRoot(){return this}willUpdate(e){this.settings&&(this._renderInfo=this._createRenderInfo(this.settings,this._selectedIdx),this._selectedIdx=this._renderInfo.selectedIdx,this._templateIdx=this._renderInfo.templateIdx)}_createRenderInfo(e,t){var r,c;const s=e.templates.map((o,p)=>({templateIndex:p,label:o.name,type:o.type,template:o})).filter(o=>o.type=="regular");t=Math.min(t,s.length-1);const i=(r=s[t])==null?void 0:r.template,n=(c=s[t])==null?void 0:c.templateIndex;return{templateItems:s,template:i,templateIdx:n,selectedIdx:t}}render(){if(!this._renderInfo)return;const{templateItems:e,template:t,selectedIdx:a}=this._renderInfo,s=d`<cal-checklist
        addable
        selectable
        disableDelete
        selected=${a}
        @add-item=${this._handleAddTemplate}
        @select=${this._handleSelectTemplate}
        itemStyle="padding: 0.4em 0.7em;"
        .items=${e}
      </cal-checklist>`,i=d`<set-template-details
      @change=${this._handleTemplateChange}
      @delete-click=${this._handleDeleteTemplate}
      @duplicate-click=${this._handleDuplicateTemplate}
      .settings=${this.settings}
      .template=${t}
    ></set-template-details>`;return d` ${s} ${i} `}get _templateList(){var e;return(e=this.renderRoot)==null?void 0:e.querySelector("cal-checklist")}get _details(){var e;return(e=this.renderRoot)==null?void 0:e.querySelector("set-template-details")}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleSelectTemplate(e){const{item:t,index:a}=e.detail;this._selectedIdx=a,this._templateIdx=t.templateIndex,this._details.template=t.template}_handleAddTemplate(e,t){t??(t=I()),W(this.settings,t),this._dispatch("add-template",{index:this.settings.templates.length-1,template:t}),this._selectedIdx=this._renderInfo.templateItems.length,this.requestUpdate()}_handleDuplicateTemplate(e){const t=structuredClone(e.detail.template);t.name+=" (copy)",this._handleAddTemplate(e,t)}_handleTemplateChange(e){const{template:t,weekday:a}=e.detail;this._dispatch("change-template",{index:this._templateIdx,template:t}),this.requestUpdate()}_handleDeleteTemplate(e){const{template:t}=e.detail;z(this.settings,this._templateIdx),this._dispatch("delete-template",{index:this._templateIdx,template:t}),this.requestUpdate()}}h(k,"properties",{settings:{type:Object,attribute:!1}});customElements.define("set-templates",k);class w extends u{constructor(){super(),this._contacts=[]}createRenderRoot(){return this}willUpdate(e){if(!this.settings||!e.has("settings"))return;const{contacts:t}=this.settings.options;this._contacts=Object.keys(t??{}).sort().map(a=>({...t[a],key:a}))}render(){return d`
      <div class="contact-list">
        ${this._contacts.map((e,t)=>this.renderContactItem(e,t))}
      </div>
      <buttn class="btn btn-outline-primary mt-2" @click=${this._handleAddClick}>
        <span class="cal-checklist-plussign">${v("plus")}</span>
        <span>Add</span>
      </div>
    `}renderContactItem(e,t){return d`
      <div class="contact-item input-group">
        <input
          type="text"
          class="form-control"
          .value=${e.name}
          @change=${a=>this.updateContact(t,"name",a.target.value)}
          @keydown=${a=>a.key==="Enter"&&a.target.blur()}
          placeholder="Name"
        />
        <input
          type="tel"
          class="form-control"
          .value=${e.phone}
          @change=${a=>this.updateContact(t,"phone",a.target.value)}
          @keydown=${a=>a.key==="Enter"&&a.target.blur()}
          placeholder="Phone"
        />
        <input
          type="email"
          class="form-control"
          .value=${e.email||""}
          @change=${a=>this.updateContact(t,"email",a.target.value)}
          @keydown=${a=>a.key==="Enter"&&a.target.blur()}
          placeholder="Email"
        />
        <button
          class="btn btn-outline-secondary"
          @click=${()=>this.deleteContact(t)}
        >
          ${v("xmark")}
        </button>
      </div>
    `}_dispatch(e,t){var a,s;this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{contacts:(s=(a=this.settings)==null?void 0:a.options)==null?void 0:s.contacts,...t}}))}_handleAddClick(){this._contacts.push({person:"",name:"",phone:"",email:""}),this.updateSettings(),this.requestUpdate()}updateContact(e,t,a){this._contacts[e][t]=a,this._contacts[e].key=this._contacts[e].name.toLowerCase(),this.updateSettings(),this.requestUpdate()}deleteContact(e){this._contacts.splice(e,1),this.updateSettings(),this.requestUpdate()}updateSettings(){const e=this._contacts.reduce((t,a)=>(a.key&&(t[a.key]={name:a.name,phone:a.phone,email:a.email}),t),{});this.settings.options.contacts=e,this._dispatch("contacts-changed")}}h(w,"properties",{settings:{type:Object,attribute:!1}});customElements.define("set-contactlist",w);class K{constructor(){this.auth=new q("cal.html",window.location.search).auth,this.settings=null,this.isDirty=!1}async fetchData(e){var s;if(!e.user||e.deptId==null)throw new Error(`Unable to fetch due to invalid user and department ${(s=e.user)==null?void 0:s.id}, ${e.deptId}`);const t=G(e.deptId),a=L(e.deptId);return Promise.all([t,a]).then(async i=>{if(t.error||a.error)throw new Error(`Error fetching data: ${[t.error,a.error]}`);return{auth:e,dept:i[0].data,settings:i[1].data}})}renderHeader(e,t){var a;!e||!e.email?userNameLabel.innerText="Not logged in":(a=e.user_metadata)!=null&&a.restricted?userNameLabel.innerText="View Only":userNameLabel.innerText=e.email,t&&(deptNameLabel.href="./cal.html?d="+t)}initUI({auth:e,dept:t,settings:a}){if(!e||!t||!a)throw new Error("Invalid login or user data");[this.auth,this.dept,this.settings]=[e,t,a],[window.AUTH,window.DEPT,window.SETTINGS]=[e,t,a],this.renderHeader(e.user,t),loadingDiv.classList.add("d-none"),settingsDiv.classList.remove("d-none"),calList.settings=a,peopleList.settings=a,templates.settings=a,contactList.settings=a,backButton.href=`./cal.html?d=${t.id}`,profileLink.href="./profile.html?d="+t.id,saveButton.addEventListener("click",this._handleSave.bind(this)),logout.addEventListener("click",this._handleLogout),calList.addEventListener("add-cal",this._handleAddCal.bind(this)),calList.addEventListener("change-cal",this._handleChangeCal.bind(this)),calList.addEventListener("delete-cal",this._handleDeleteCal.bind(this)),calList.addEventListener("coverage-change",this._handleCoverageChange.bind(this)),peopleList.addEventListener("add-group",this._handleAddGroup.bind(this)),peopleList.addEventListener("delete-group",this._handleDeleteGroup.bind(this)),peopleList.addEventListener("change-group",this._handleChangeGroup.bind(this)),peopleList.addEventListener("change-person",this._handleChangePerson.bind(this)),peopleList.addEventListener("remove-person",this._handleRemovePerson.bind(this)),templates.addEventListener("add-template",this._handleChangeTemplate.bind(this)),templates.addEventListener("change-template",this._handleChangeTemplate.bind(this)),templates.addEventListener("delete-template",this._handleChangeTemplate.bind(this)),contactList.addEventListener("contacts-changed",this._handleChangeContacts.bind(this))}async _handleLogout(e){e.preventDefault(),await S.signOut(),window.location.href="./login.html"}_handleSettingsUpdated(e=!1){U({deptId:this.dept.id,userId:this.auth.user.id,settings:this.settings},{callback:this._handleSaveComplete.bind(this),flush:e}),this.isDirty=!e,saveButton.textContent=e?"Saved":"Save",saveButton.disabled=e}_handleSaveComplete(){this.isDirty=!1,saveButton.textContent="Saved",saveButton.disabled=!0}_handleSave(){this.isDirty&&this._handleSettingsUpdated(!0)}async _handleAddCal(e){const{item:t}=e.detail;t.label="...";const s=await T(this.auth.deptId,this.auth.user.id,"Calendar");if(!s.error){const{id:i,cal_name:n}=s.data[0];t.id=i,t.label=n,N(this.settings,i,{name:n}),this._handleSettingsUpdated(),calList.requestUpdate()}}async _handleChangeCal(e){const{calId:t,cal:a}=e.detail;O(t,a),R(this.settings,t,a),this._handleSettingsUpdated(),calList.requestUpdate()}async _handleDeleteCal(e){const{calId:t}=e.detail;(await M(t)).error||(A(this.settings,t),this._handleSettingsUpdated(),calList.requestUpdate())}_handleAddGroup(e){const{group:t}=e.detail;P(this.settings,t),this._handleSettingsUpdated(),peopleList.requestUpdate()}_handleChangeGroup(e){const{group:t,name:a}=e.detail;B(this.settings,t,a),this._handleSettingsUpdated(),peopleList.requestUpdate()}_handleDeleteGroup(e){const{group:t}=e.detail;j(this.settings,t),this._handleSettingsUpdated(),peopleList.requestUpdate()}_handleChangePerson(e){var i;const{group:t,index:a,person:s}=e.detail;if(t&&a>=0&&s){const n=(i=this.settings.options.peopleGroups)==null?void 0:i[t],r=n==null?void 0:n.names;r&&(a>=r.length?F(this.settings,t,s):H(this.settings,t,a,s),this._handleSettingsUpdated(),peopleList.requestUpdate())}}_handleRemovePerson(e){const{group:t,index:a}=e.detail;J(this.settings,t,a),this._handleSettingsUpdated(),peopleList.requestUpdate()}_handleChangeTemplate(e){this._handleSettingsUpdated()}_handleChangeContacts(e){this._handleSettingsUpdated()}_handleCoverageChange(e){this._handleSettingsUpdated()}}const m=window.APP=new K;document.on("DOMContentLoaded",()=>{m.auth.then(l=>m.fetchData(l).then(e=>m.initUI(e)).catch(e=>{console.log(e),loadingText.innerText="Error loading calendar. Please refresh page to try again."})).catch(l=>{console.log(l),window.location.href=m.auth.redirect})});
