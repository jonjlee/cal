var x=Object.defineProperty;var y=(s,e,t)=>e in s?x(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var p=(s,e,t)=>y(s,typeof e!="symbol"?e+"":e,t);import{s as u,i as w,x as c,D as g,g as G,h as D,j as L,c as S,E,F as U,G as T}from"./db-DgbyiZOf.js";import{A as O}from"./auth-ClBlxFA7.js";class _ extends u{constructor(){super(),this._deleteMode=!1}createRenderRoot(){return this}willUpdate(e){(e.has("cal")||e.has("calId"))&&(this._deleteMode=!1)}render(){if(!this.cal)return;const{name:e,archived:t,color:a,background:l}=this.cal,n=this.cal.type==="call",i=this._deleteMode?c`<div class="fade-in">
          <p class="text-danger">
            Action cannot be undone. Delete calendar and its events, including
            within templates?
          </p>
          <button class="btn btn-danger" @click="${this._handleConfirmDelete}">
            Confirm Delete
          </button>
        </div>`:c`<a href="#" class="text-danger" @click="${this._handleDelete}"
          >Delete calendar</a
        >`;return c`
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
              .checked=${n}
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
                .value=${l??"#ffffff"}
              />
            </div>
            <label for="background" class="col-sm-10 col-form-label"
              >Background color for this calendar</label
            >
          </div>
          <div class="mt-3">${i}</div>
        </div>
      </div>
    `}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleNameChange(e){this.cal.name=e.target.value,this._dispatch("details-change",{calId:this.calId,cal:this.cal})}_handleArchivedChange(e){this.cal.archived=e.target.checked?0:1,this._dispatch("details-change",{calId:this.calId,cal:this.cal})}_handleCallChange(e){this.cal.type=e.target.checked?"call":"",this._dispatch("details-change",{calId:this.calId,cal:this.cal})}_handleColorChange(e){this.cal.color=e.target.value,this._dispatch("details-change",{calId:this.calId,cal:this.cal})}_handleBackgroundChange(e){this.cal.background=e.target.value,this._dispatch("details-change",{calId:this.calId,cal:this.cal})}_handleDelete(e){e.preventDefault(),this._deleteMode=!0,this.requestUpdate()}_handleConfirmDelete(e){this._dispatch("delete-click",{calId:this.calId})}}p(_,"styles",w`
    input[type="color"] {
      width: 2.25em;
      border-radius: 1.2em;
    }
  `),p(_,"properties",{calId:{type:String,attribute:!1},cal:{type:Object,attribute:!1}});customElements.define("set-caldetails",_);class b extends u{constructor(){super(),this.settings=null,this._renderInfo=null,this._selectedIdx=0}createRenderRoot(){return this}willUpdate(e){this.settings&&(this._renderInfo=this._createRenderInfo(this.settings,this._selectedIdx))}_createRenderInfo(e,t){var r;const{cals:a,options:l}=e,n=l.calOrder||[];t=Math.min(t,n.length-1);const i=n==null?void 0:n.map(o=>{var h;return{id:o,label:(h=a[o])==null?void 0:h.name,cal:a[o]}}),d=(r=i[t])==null?void 0:r.cal;return{items:i,selectedCal:d,selectedIdx:t}}render(){var i;if(!this._renderInfo)return;const{items:e,selectedCal:t,selectedIdx:a}=this._renderInfo,l=c`<cal-checklist
        addable
        selectable
        disableDelete
        selected=${a}
        @add-item=${this._handleAddCal}
        @select=${this._handleSelectCal}
        itemStyle="padding: 0.4em 0.7em;"
        .items=${e}
      </cal-checklist>`,n=c`<set-caldetails
      @details-change=${this._handleCalChange}
      @delete-click=${this._handleDeleteCal}
      .calId=${(i=e[a])==null?void 0:i.id}
      .cal=${t}
    ></set-caldetails>`;return c` ${l} ${n} `}get _list(){var e;return(e=this.renderRoot)==null?void 0:e.querySelector("cal-checklist")}get _details(){var e;return(e=this.renderRoot)==null?void 0:e.querySelector("set-caldetails")}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleAddCal(e){const{item:t}=e.detail;t.label="...",this._dispatch("add-cal",{item:e.detail.item})}_handleSelectCal(e){const{item:t,index:a}=e.detail;this._selectedIdx=a,this._details.calId=t.id,this._details.cal=this.settings.cals[t.id]}_handleCalChange(e){const{calId:t,cal:a}=e.detail;this._renderInfo.items[this._selectedIdx].label=a.name,this._list.requestUpdate(),this._dispatch("change-cal",{calId:t,cal:a})}_handleDeleteCal(e){const{calId:t}=e.detail;this._selectedIdx=Math.max(this._selectedIdx-1,0),this._dispatch("delete-cal",{calId:t})}}p(b,"properties",{settings:{type:Object,attribute:!1}});customElements.define("set-callist",b);class v extends u{constructor(){super(),this.settings=null,this._renderInfo=null,this._selectedIdx=0,this._selectedGroup=null,this._deleteMode=!1}createRenderRoot(){return this}willUpdate(e){if(!this.settings)return;const t=this.settings.options.peopleGroupOrder||[];this._selectedIdx=Math.min(this._selectedIdx,t.length-1),this._selectedGroup=t[this._selectedIdx]||"",this._renderInfo=this._createRenderInfo(this.settings,this._selectedIdx,this._selectedGroup)}_createRenderInfo(e,t,a){var r,o;const{peopleGroups:l,peopleGroupOrder:n}=e.options,i=n==null?void 0:n.map(h=>({label:h})),d=(o=(r=l==null?void 0:l[a])==null?void 0:r.names)==null?void 0:o.map(h=>({group:a,label:h}));return{selectedIdx:t,selectedGroup:a,groupItems:i,memberItems:d}}render(){if(!this._renderInfo)return;const{selectedIdx:e,selectedGroup:t,groupItems:a,memberItems:l}=this._renderInfo,n=c`<cal-checklist
      addable
      selectable
      disableDelete
      selected=${e}
      @add-item=${this._handleAddGroup}
      @select=${this._handleSelectGroup}
      itemStyle="padding: 0.4em 0.7em;"
      .items=${a}
    ></cal-checklist>`,i=this._deleteMode?c`<div class="mt-3 fade-in">
          <p class="text-danger">
            Remove group? Scheduled shifts in calendars will NOT be deleted.
          </p>
          <button class="btn btn-danger" @click=${this._handleConfirmDelete}>
            Confirm Delete
          </button>
        </div>`:c`<a
          class="text-danger mt-2"
          href="#"
          @click=${this._handleDeleteGroup}
          >Delete Group</a
        >`,d=c`<div class="card p-3 pt-2 pb-2 mt-3">
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
            .items=${l}
          ></cal-checklist>
        </div>
        ${i}
      </div>
    </div>`;return c` ${n} ${d} `}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleAddGroup(e){const{item:t}=e.detail;t.label="Group "+(this.settings.options.peopleGroupOrder.length+1),this._dispatch("add-group",{group:t.label}),this._deleteMode=!1,this.requestUpdate()}_handleChangeGroupName(e){const t=e.target.value.trim(),a=this._selectedGroup;t&&t!==a&&this._dispatch("change-group",{group:a,name:t})}_handleSelectGroup(e){const{index:t}=e.detail;this._selectedIdx=t,this._selectedGroup=this.settings.options.peopleGroupOrder[this._selectedIdx],this._deleteMode=!1,this.requestUpdate()}_handleChangeMemberName(e){const{index:t,label:a}=e.detail,l=this._selectedGroup;this._dispatch("change-person",{group:l,index:t,person:a}),this._deleteMode=!1}_handleDeleteMember(e){const{index:t,item:a}=e.detail,l=this._selectedGroup;this._dispatch("remove-person",{group:l,index:t,person:a.label})}_handleDeleteGroup(e){e.preventDefault(),this._deleteMode=!0,this.requestUpdate()}_handleConfirmDelete(e){const t=this._selectedGroup;t&&(this._dispatch("delete-group",{group:t}),this._deleteMode=!1,this.requestUpdate())}}p(v,"properties",{settings:{type:Object,attribute:!1}});customElements.define("set-peoplelist",v);class C extends u{constructor(){super(),this.settings=null,this.template=null,this._deleteMode=!1}createRenderRoot(){return this}render(){var i;if(!this.settings||!this.template)return;const{name:e,data:t}=this.template,a=this._deleteMode?c`<div class="fade-in">
          <p class="text-danger">
            Action cannot be undone. Delete this template?
          </p>
          <button class="btn btn-danger" @click="${this._handleConfirmDelete}">
            Confirm Delete
          </button>
        </div>`:c`<a href="#" class="text-danger" @click="${this._handleDelete}"
          >Delete template</a
        >`,l=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],n=[];for(let d=1;d<=7;d++){const r=t[d%7];n.push(c`<cal-day
        day=${l[d-1]}
        note="${((i=r==null?void 0:r.note)==null?void 0:i.text)||(r==null?void 0:r.note)||""}"
        showAll
        @cal-day-change=${this._handleTemplateChange}
        .index=${d}
        .data=${r}
        .settings=${this.settings}
      ></cal-day>`)}return c`<div class="col-12 mt-3">
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
        <div class="col-12 mt-3 template-week">${n}</div>
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
    </div>`}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleNameChange(e){e.preventDefault(),e.stopPropagation(),this.template.name=e.target.value,this._dispatch("change",{template:this.template,weekday:null}),this._deleteMode=!1}_handleTemplateChange(e){const{index:t,data:a,prevData:l}=e.detail;JSON.stringify(a)!=JSON.stringify(l)&&this._dispatch("change",{template:this.template,weekday:t}),this._deleteMode=!1}_handleDuplicate(e){e.preventDefault(),this._deleteMode=!1,this._dispatch("duplicate-click",{template:this.template})}_handleDelete(e){e.preventDefault(),this._deleteMode=!0,this.requestUpdate()}_handleConfirmDelete(e){this._dispatch("delete-click",{template:this.template}),this._deleteMode=!1,this.requestUpdate()}}p(C,"properties",{settings:{type:Object,attribute:!1},template:{type:Object,attribute:!1}});customElements.define("set-template-details",C);function M(s,e,t){const a=s.cals??(s.cals={}),l=s.options??(s.options={}),n=l.calOrder??(l.calOrder=[]),i={name:"Calendar",archived:0,visible:1,color:"#333333"};return a[e]||(a[e]={},n.push(""+e)),a[e]={...i,...a[e],...t},s}function N(s,e,t){const a=s.cals??(s.cals={});return a[e]??(a[e]={}),a[e]={...a[e],...t},s}function A(s,e){const t=s.cals??(s.cals={});delete t[e];const a=s.options??(s.options={}),l=a.calOrder??(a.calOrder=[]);return l.includes(e)&&l.splice(l.indexOf(e),1),s}function q(s,e){var n;const t=s.options??(s.options={}),a=t.peopleGroupOrder??(t.peopleGroupOrder=[]),l=t.peopleGroups??(t.peopleGroups={});return l[e]||(l[e]={group:e},a.push(e)),(n=l[e]).names??(n.names=[]),s}function R(s,e){const t=s.options??(s.options={}),a=t.peopleGroupOrder??(t.peopleGroupOrder=[]),l=t.peopleGroups??(t.peopleGroups={});if(l[e]){const n=a.indexOf(e);n>=0&&a.splice(n,1),delete l[e]}return f(s),s}function P(s,e,t){const a=s.options??(s.options={}),l=a.peopleGroupOrder??(a.peopleGroupOrder=[]),n=a.peopleGroups??(a.peopleGroups={});if(e!=t&&n[e]){const i=l.indexOf(e);i>=0&&(l[i]=t),n[t]=n[e],n[t].group=t,delete n[e]}return s}function j(s,e,t){var r;const a=s.options??(s.options={}),l=a.peopleGroups??(a.peopleGroups={});if(l[e]===void 0)return;const n=a.people??(a.people={}),i=t.toLowerCase();return n[i]??(n[i]={name:t}),((r=l[e]).names??(r.names=[])).push(t),s}function F(s,e,t,a){var d;const l=s.options??(s.options={}),n=l.peopleGroups??(l.peopleGroups={});if(n[e]===void 0||t>n[e].names.length-1)return;const i=(d=n[e]).names??(d.names=[]);return i[t]=a,f(s),s}function B(s,e,t){const a=s.options??(s.options={}),l=a.peopleGroups??(a.peopleGroups={});if(!(!l[e]||t>=l[e].names.length))return l[e].names.splice(t,1),f(s),s}function f(s){const e=s.options??(s.options={}),t=e.peopleGroups??(e.peopleGroups={}),a=e.people??(e.people={}),l={};return Object.values(t).forEach(n=>{n.names.forEach(i=>{l[i.toLowerCase()]=i})}),Object.keys(a).forEach(n=>{l[n]||delete a[n]}),Object.entries(l).forEach(([n,i])=>{a[n]??(a[n]={}),a[n].name=i}),s}function I(){return{name:"Template",format:"week",type:"regular",data:{1:{cals:{}},2:{cals:{}},3:{cals:{}},4:{cals:{}},5:{cals:{}},6:{cals:{}},0:{cals:{}}}}}function H(s,e=null){return e??(e=I()),s.templates.push(e),s}function J(s,e){return s.templates.splice(e,1),s}class $ extends u{constructor(){super(),this.settings=null,this._selectedIdx=0,this._templateIdx=null}createRenderRoot(){return this}willUpdate(e){this.settings&&(this._renderInfo=this._createRenderInfo(this.settings,this._selectedIdx),this._selectedIdx=this._renderInfo.selectedIdx,this._templateIdx=this._renderInfo.templateIdx)}_createRenderInfo(e,t){var d,r;const l=e.templates.map((o,h)=>({templateIndex:h,label:o.name,type:o.type,template:o})).filter(o=>o.type=="regular");t=Math.min(t,l.length-1);const n=(d=l[t])==null?void 0:d.template,i=(r=l[t])==null?void 0:r.templateIndex;return{templateItems:l,template:n,templateIdx:i,selectedIdx:t}}render(){if(!this._renderInfo)return;const{templateItems:e,template:t,selectedIdx:a}=this._renderInfo,l=c`<cal-checklist
        addable
        selectable
        disableDelete
        selected=${a}
        @add-item=${this._handleAddTemplate}
        @select=${this._handleSelectTemplate}
        itemStyle="padding: 0.4em 0.7em;"
        .items=${e}
      </cal-checklist>`,n=c`<set-template-details
      @change=${this._handleTemplateChange}
      @delete-click=${this._handleDeleteTemplate}
      @duplicate-click=${this._handleDuplicateTemplate}
      .settings=${this.settings}
      .template=${t}
    ></set-template-details>`;return c` ${l} ${n} `}get _templateList(){var e;return(e=this.renderRoot)==null?void 0:e.querySelector("cal-checklist")}get _details(){var e;return(e=this.renderRoot)==null?void 0:e.querySelector("set-template-details")}_dispatch(e,t){this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:t}))}_handleSelectTemplate(e){const{item:t,index:a}=e.detail;this._selectedIdx=a,this._templateIdx=t.templateIndex,this._details.template=t.template}_handleAddTemplate(e,t){t??(t=I()),H(this.settings,t),this._dispatch("add-template",{index:this.settings.templates.length-1,template:t}),this._selectedIdx=this._renderInfo.templateItems.length,this.requestUpdate()}_handleDuplicateTemplate(e){const t=structuredClone(e.detail.template);t.name+=" (copy)",this._handleAddTemplate(e,t)}_handleTemplateChange(e){const{template:t,weekday:a}=e.detail;this._dispatch("change-template",{index:this._templateIdx,template:t}),this.requestUpdate()}_handleDeleteTemplate(e){const{template:t}=e.detail;J(this.settings,this._templateIdx),this._dispatch("delete-template",{index:this._templateIdx,template:t}),this.requestUpdate()}}p($,"properties",{settings:{type:Object,attribute:!1}});customElements.define("set-templates",$);class k extends u{constructor(){super(),this._contacts=[]}createRenderRoot(){return this}willUpdate(e){if(!this.settings||!e.has("settings"))return;const{contacts:t}=this.settings.options;this._contacts=Object.keys(t??{}).sort().map(a=>({...t[a],key:a}))}render(){return c`
      <div class="contact-list">
        ${this._contacts.map((e,t)=>this.renderContactItem(e,t))}
      </div>
      <buttn class="btn btn-outline-primary mt-2" @click=${this._handleAddClick}>
        <span class="cal-checklist-plussign">${g("plus")}</span>
        <span>Add</span>
      </div>
    `}renderContactItem(e,t){return c`
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
        <button
          class="btn btn-outline-secondary"
          @click=${()=>this.deleteContact(t)}
        >
          ${g("xmark")}
        </button>
      </div>
    `}_dispatch(e,t){var a,l;this.dispatchEvent(new CustomEvent(e,{bubbles:!1,composed:!0,detail:{contacts:(l=(a=this.settings)==null?void 0:a.options)==null?void 0:l.contacts,...t}}))}_handleAddClick(){this._contacts.push({person:"",name:"",phone:""}),this.updateSettings(),this.requestUpdate()}updateContact(e,t,a){this._contacts[e][t]=a,this._contacts[e].key=this._contacts[e].name.toLowerCase(),this.updateSettings(),this.requestUpdate()}deleteContact(e){this._contacts.splice(e,1),this.updateSettings(),this.requestUpdate()}updateSettings(){const e=this._contacts.reduce((t,a)=>(a.key&&(t[a.key]={name:a.name,phone:a.phone}),t),{});this.settings.options.contacts=e,this._dispatch("contacts-changed")}}p(k,"properties",{settings:{type:Object,attribute:!1}});customElements.define("set-contactlist",k);class V{constructor(){this.auth=new O("cal.html",window.location.search).auth,this.settings=null}async fetchData(e){var l;if(!e.user||e.deptId==null)throw new Error(`Unable to fetch due to invalid user and department ${(l=e.user)==null?void 0:l.id}, ${e.deptId}`);const t=G(e.deptId),a=D(e.deptId);return Promise.all([t,a]).then(async n=>{if(t.error||a.error)throw new Error(`Error fetching data: ${[t.error,a.error]}`);return{auth:e,dept:n[0].data,settings:n[1].data}})}renderHeader(e,t){var a;!e||!e.email?userNameLabel.innerText="Not logged in":(a=e.user_metadata)!=null&&a.restricted?userNameLabel.innerText="View Only":userNameLabel.innerText=e.email,t&&(deptNameLabel.href="./cal.html?d="+t)}initUI({auth:e,dept:t,settings:a}){if(!e||!t||!a)throw new Error("Invalid login or user data");[this.auth,this.dept,this.settings]=[e,t,a],[window.AUTH,window.DEPT,window.SETTINGS]=[e,t,a],this.renderHeader(e.user,t),loadingDiv.classList.add("d-none"),settingsDiv.classList.remove("d-none"),calList.settings=a,peopleList.settings=a,templates.settings=a,contactList.settings=a,logout.addEventListener("click",this._handleLogout),calList.addEventListener("add-cal",this._handleAddCal.bind(this)),calList.addEventListener("change-cal",this._handleChangeCal.bind(this)),calList.addEventListener("delete-cal",this._handleDeleteCal.bind(this)),peopleList.addEventListener("add-group",this._handleAddGroup.bind(this)),peopleList.addEventListener("delete-group",this._handleDeleteGroup.bind(this)),peopleList.addEventListener("change-group",this._handleChangeGroup.bind(this)),peopleList.addEventListener("change-person",this._handleChangePerson.bind(this)),peopleList.addEventListener("remove-person",this._handleRemovePerson.bind(this)),templates.addEventListener("add-template",this._handleChangeTemplate.bind(this)),templates.addEventListener("change-template",this._handleChangeTemplate.bind(this)),templates.addEventListener("delete-template",this._handleChangeTemplate.bind(this)),contactList.addEventListener("contacts-changed",this._handleChangeContacts.bind(this))}async _handleLogout(e){e.preventDefault(),await L.signOut(),window.location.href="./login.html"}_handleSettingsUpdated(){S({deptId:this.dept.id,userId:this.auth.user.id,settings:this.settings},{callback:this._handleSaveComplete})}_handleSaveComplete(){}async _handleAddCal(e){const{item:t}=e.detail;t.label="...";const l=await E(this.auth.deptId,this.auth.user.id,"Calendar");if(!l.error){const{id:n,cal_name:i}=l.data[0];t.id=n,t.label=i,M(this.settings,n,{name:i}),this._handleSettingsUpdated(),calList.requestUpdate()}}async _handleChangeCal(e){const{calId:t,cal:a}=e.detail;U(t,a),N(this.settings,t,a),this._handleSettingsUpdated(),calList.requestUpdate()}async _handleDeleteCal(e){const{calId:t}=e.detail;(await T(t)).error||(A(this.settings,t),this._handleSettingsUpdated(),calList.requestUpdate())}_handleAddGroup(e){const{group:t}=e.detail;q(this.settings,t),this._handleSettingsUpdated(),peopleList.requestUpdate()}_handleChangeGroup(e){const{group:t,name:a}=e.detail;P(this.settings,t,a),this._handleSettingsUpdated(),peopleList.requestUpdate()}_handleDeleteGroup(e){const{group:t}=e.detail;R(this.settings,t),this._handleSettingsUpdated(),peopleList.requestUpdate()}_handleChangePerson(e){var n;const{group:t,index:a,person:l}=e.detail;if(t&&a>=0&&l){const i=(n=this.settings.options.peopleGroups)==null?void 0:n[t],d=i==null?void 0:i.names;d&&(a>=d.length?j(this.settings,t,l):F(this.settings,t,a,l),this._handleSettingsUpdated(),peopleList.requestUpdate())}}_handleRemovePerson(e){const{group:t,index:a}=e.detail;B(this.settings,t,a),this._handleSettingsUpdated(),peopleList.requestUpdate()}_handleChangeTemplate(e){this._handleSettingsUpdated()}_handleChangeContacts(e){this._handleSettingsUpdated()}}const m=window.APP=new V;document.on("DOMContentLoaded",()=>{m.auth.then(s=>m.fetchData(s).then(e=>m.initUI(e)).catch(e=>{console.log(e),loadingText.innerText="Error loading calendar. Please refresh page to try again."})).catch(s=>{console.log(s),window.location.href=m.auth.redirect})});
