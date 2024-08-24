import{createClient as Y}from"https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";import{html as h,nothing as B}from"https://cdn.jsdelivr.net/gh/lit/dist@2.8.0/core/lit-core.min.js";import k from"https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function n(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=n(s);fetch(s.href,o)}})();const P={calendar:h`<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"
    />
  </svg>`,"caret-right":h`<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 256 512"
  >
    <path
      fill="currentColor"
      d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
    />
  </svg>`,"chevron-down":h`<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
    />
  </svg>`,"chevron-up":h`<svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 512 512"
    class="icon"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"
    />
  </svg>`,"diagram-next":h`<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 512 512"
  >
    <path
      fill="currentColor"
      d="M512 160c0 35.3-28.7 64-64 64H280v64h46.1c21.4 0 32.1 25.9 17 41L273 399c-9.4 9.4-24.6 9.4-33.9 0L169 329c-15.1-15.1-4.4-41 17-41H232V224H64c-35.3 0-64-28.7-64-64V96C0 60.7 28.7 32 64 32H448c35.3 0 64 28.7 64 64v64zM448 416V352H365.3l.4-.4c18.4-18.4 20.4-43.7 11-63.6l71.3 0c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64V352c0-35.3 28.7-64 64-64l71.3 0c-9.4 19.9-7.4 45.2 11 63.6l.4 .4H64v64H210.7l5.7 5.7c21.9 21.9 57.3 21.9 79.2 0l5.7-5.7H448z"
    />
  </svg>`,"grip-vertical":h`<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 320 512"
  >
    <path
      fill="currentColor"
      d="M40 352l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zm192 0l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 320c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 192l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40zM40 160c-22.1 0-40-17.9-40-40L0 72C0 49.9 17.9 32 40 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0zM232 32l48 0c22.1 0 40 17.9 40 40l0 48c0 22.1-17.9 40-40 40l-48 0c-22.1 0-40-17.9-40-40l0-48c0-22.1 17.9-40 40-40z"
    />
  </svg>`,subitem:h`
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="icon"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M 0.89 3.888 L 22.961 3.888 C 23.453 3.888 23.852 4.89 23.852 5.382 C 23.852 5.833 23.516 6.869 23.082 6.929 L 22.961 6.936 L 0.89 6.936 C 0.399 6.936 0 5.873 0 5.382 C 0 4.932 0.334 3.957 0.769 3.897 L 0.89 3.888 Z M 10.657 15.825 C 10.657 15.995 10.587 16.153 10.464 16.27 L 3.711 22.155 C 3.535 22.321 3.279 22.362 3.057 22.267 C 2.839 22.17 2.695 21.95 2.695 21.712 L 2.695 10.242 C 2.695 10.002 2.839 9.783 3.057 9.687 C 3.279 9.592 3.535 9.633 3.711 9.798 L 10.464 15.382 C 10.587 15.497 10.657 15.656 10.657 15.825 Z M 14.089 14.126 L 23.109 14.126 C 23.601 14.126 24 15.128 24 15.62 C 24 16.071 23.664 17.107 23.23 17.167 L 23.109 17.174 L 14.089 17.174 C 13.598 17.174 13.199 16.111 13.199 15.62 C 13.199 15.17 13.533 14.195 13.968 14.135 L 14.089 14.126 Z"
        transform="matrix(1, 0, 0, 1, 0, -1.7763568394002505e-15)"
      />
    </svg>
  `,plus:h`<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
    />
  </svg>`,"trash-can":h`<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M 170.5 51.6 L 151.5 80 L 296.5 80 L 277.5 51.6 C 276 49.4 273.5 48 270.8 48 L 177.1 48 C 174.4 48 171.9 49.3 170.4 51.6 L 170.5 51.6 Z M 317.5 25 L 354.2 80 L 368 80 L 416 80 L 424 80 C 437.3 80 448 90.7 448 104 C 448 117.3 437.3 128 424 128 L 416 128 L 416 432 C 416 476.2 380.2 512 336 512 L 112 512 C 67.8 512 32 476.2 32 432 L 32 128 L 24 128 C 10.7 128 0 117.3 0 104 C 0 90.7 10.7 80 24 80 L 32 80 L 80 80 L 93.8 80 L 130.5 24.9 C 140.9 9.4 158.4 0 177.1 0 L 270.8 0 C 289.5 0 307 9.4 317.4 24.9 L 317.5 25 Z M 80 128 L 80 432 C 80 449.7 94.3 464 112 464 L 336 464 C 353.7 464 368 449.7 368 432 L 368 128 L 80 128 Z"
      transform="matrix(1, 0, 0, 1, 7.105427357601002e-15, 0)"
    />
  </svg>`,xmark:h`<svg
    xmlns="http://www.w3.org/2000/svg"
    class="icon"
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 384 512"
  >
    <path
      fill="currentColor"
      d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
    />
  </svg>`};function ie(t){return t?P[t]??h`<span>!${t}</span>`:B}function ae(t,e){const n=document.querySelector("#notification"),r=document.querySelector("#notification .toast-body");n&&r&&(r.innerHTML=t,bootstrap.Toast.getOrCreateInstance(n,e).show())}const $="([0-2]?[0-9])(?::([0-5][0-9]))?\\s*(?:([ap])m?)?",J="(?:\\s*\\+\\s*([0-9]+)\\s*d)",Z=new RegExp(`^\\s*${$}${J}?\\s*$`,"i");function V(t,e){const[n,r,s,o,l]=Z.exec(e)??[];if(!n||parseInt(r)>=24)return null;{const i=`${r}:${s||"00"} ${o||"a"}m`,u=parseInt(l)||0;return k(`${t} ${i}`,"YYYY-MM-DD h:mm a").add(u,"day")}}function ce(t,e){const[n,r]=(e==null?void 0:e.split("-"))??[];let s=V(t,n),o=V(t,r);return!s||!o?null:(s.hour()>=0&&s.hour()<=5&&!n.match(/am?$/i)&&(s=s.add(12,"hour")),o.hour()>=0&&o.hour()<=5&&!r.match(/am?$/i)&&(o=o.add(12,"hour")),(s.isSame(o)||s.isAfter(o))&&(o=o.add(1,"day")),{start:s,end:o,hours:Math.max(0,o.diff(s,"hour",!0))})}function le(t,e=null,n=null){var r;if(typeof n=="function"){e=e??Object.keys(t);for(const s of e){const o=t[s];if(o&&o.cals)for(const l of Object.keys(o.cals)){const i=o.cals[l].events;if(i)for(const{resource:u,schedule:a,subitems:d}of i){if(Array.isArray(a))for(const c of a)n({day:s,calId:l,resource:u,shift:c});if((d==null?void 0:d.length)>0)for(const c of d){const v=c.resource,b=(r=c.schedule)!=null&&r[0]?c.schedule:a;if(Array.isArray(b))for(const C of b)n({day:s,calId:l,resource:u,subitemResource:v,shift:C})}}}}}}function ue(t){return e=>{e.keyCode==13&&(t.focus(),e.preventDefault())}}function de(t){return e=>{e.keyCode==13&&(t.click(),e.preventDefault())}}function fe(){return k().format("YYYY-MM-DD")}function N(t,e,n={}){let r,s,o,l,i,u,a=0,d=!1,c=!1,v=!0;if(typeof t!="function")throw new TypeError("Expected a function");e=+e||0,d=!!n.leading,c="maxWait"in n,o=c?Math.max(+n.maxWait||0,e):o,v="trailing"in n?!!n.trailing:v;function b(f){const g=r,y=s;return r=s=void 0,a=f,l=t.apply(y,g),l}function C(f,g){return setTimeout(f,g)}function A(f){clearTimeout(f)}function R(f){return a=f,i=C(L,e),d?b(f):l}function U(f){const g=f-u,y=f-a,H=e-g;return c?Math.min(H,o-y):H}function T(f){const g=f-u,y=f-a;return u===void 0||g>=e||g<0||c&&y>=o}function L(){const f=Date.now();if(T(f))return q(f);i=C(L,U(f))}function q(f){return i=void 0,v&&r?b(f):(r=s=void 0,l)}function W(){i!==void 0&&A(i),a=0,r=u=s=i=void 0}function j(){return i===void 0?l:q(Date.now())}function G(){return i!==void 0}function _(...f){const g=Date.now(),y=T(g);if(r=f,s=this,u=g,y){if(i===void 0)return R(u);if(c)return i=C(L,e),b(u)}return i===void 0&&(i=C(L,e)),l}return _.cancel=W,_.flush=j,_.pending=G,_}function pe(t,e,n={}){let r=!0,s=!0;if(typeof t!="function")throw new TypeError("Expected a function");return r="leading"in n?!!n.leading:r,s="trailing"in n?!!n.trailing:s,N(t,e,{leading:r,trailing:s,maxWait:e})}window.$=document.querySelectorAll.bind(document);Node.prototype.on=window.on=function(t,e){this.addEventListener(t,e)};NodeList.prototype.__proto__=Array.prototype;NodeList.prototype.on=NodeList.prototype.addEventListener=function(t,e){this.forEach(function(n,r){n.on(t,e)})};function F(t){const e={};return(t==null?void 0:t.length)>0&&t.forEach(({day:n,data:r})=>e[n]=r),e}function K(t,e){if(!t&&!e)return{cals:{},options:{}};if(t&&!e)return{cals:t.cal_settings,options:t.options,templates:t.templates};if(e&&!t)return{cals:e.cal_settings,options:e.options,templates:[]};const n=t.cal_settings??{},r=t.options??{},s=t.templates??[],o=e.cal_settings??{},l=e.options??{},i=(a,d,c,v)=>(a==null?void 0:a[c])??(d==null?void 0:d[c])??v,u={cals:{},options:{calOrder:r.calOrder,peopleGroupOrder:r.peopleGroupOrder,peopleGroups:r.peopleGroups,people:{}},templates:s};return Object.keys(n).forEach(a=>u.cals[a]={name:n[a].name,type:n[a].type,visible:i(o[a],n[a],"visible",1),color:i(o[a],n[a],"color"),background:i(o[a],n[a],"background")}),Object.keys(r.people??{}).forEach(a=>{var d,c;return u.options.people[a]={name:a,visible:i((d=l.people)==null?void 0:d[a],null,"visible",1),color:i((c=l.people)==null?void 0:c[a],null,"color",void 0)}}),u}function X(t){const e=t.cals||{},n=t.options||{},r=Object.keys(e),s=Object.keys(n.peopleGroups??{}),o=Object.keys(n.people??{}),l={},i={calOrder:n.calOrder,peopleGroupOrder:n.peopleGroupOrder,peopleGroups:{},people:{}},u=t.templates,a={},d={peopleGroups:{},people:{}};return r.forEach(c=>{l[c]={name:e[c].name,type:e[c].type,color:e[c].color,background:e[c].background},a[c]={visible:e[c].visible}}),s.forEach(c=>{i.peopleGroups[c]={group:c,names:n.peopleGroups[c].names},d.peopleGroups[c]={visible:n.peopleGroups[c].visible??1}}),o.forEach(c=>{i.people[c]={name:c},d.people[c]={visible:n.people[c].visible??1,color:n.people[c].color}}),{calSettings:l,options:i,templates:u,userCalSettings:a,userOptions:d}}const I="https://jcjyqzlsndplibaopbbm.supabase.co",Q="ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW1wamFubHhlbXh6Ym1Sd2JHbGlZVzl3WW1KdElpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlPakUzTVRJeU5EazBNVE1zSW1WNGNDSTZNakF5TnpneU5UUXhNMzAuY1dJTE52MHRRRDdpVHdKX01NSWFWVzdESlhuS1A3Uk91VWRWX0x1VkJBcw==",ee="readonly",z=2e3,p=Y(I,atob(Q)),te=p.auth;async function E(t=!1){var e,n,r,s,o,l;if(t){const i=(n=(e=await p.auth.getUser())==null?void 0:e.data)==null?void 0:n.user;if(i){let u=await p.from("users").select("restricted").eq("id",i.id).single();i.user_metadata.restricted=(r=u==null?void 0:u.data)==null?void 0:r.restricted,u=await p.from("user_dept_roles").select("dept_id, role").eq("user_id",i.id),i.user_metadata.depts={},u.data&&u.data.forEach(({dept_id:a,role:d})=>i.user_metadata.depts[a]=d)}return i}else return(l=(o=(s=await p.auth.getSession())==null?void 0:s.data)==null?void 0:o.session)==null?void 0:l.user}async function ne(t){return(await p.from("depts").select("*",{count:"exact",head:!0}).eq("id",t)).count>0}async function me(t){var l,i,u,a;let e=await E(!0);const n=await p.rpc("dept_by_access_code",{access_code:t}),r=(i=(l=n.data)==null?void 0:l[0])==null?void 0:i.dept_id,s=(a=(u=n.data)==null?void 0:u[0])==null?void 0:a.username;if(r==null)return{badCodeError:!0,error:n.error||"No department for access code"};let o=null;return e&&await ne(r)?{user:e,deptId:r}:s?(o=await te.signInWithPassword({email:s,password:ee}),o.error?m({authError:!0,error:o.error}):(e=await E(!0),{user:e,deptId:r,data:o.data})):{authError:!0,error:"No view only user available"}}async function ge(){const t=await p.from("depts").select("*",{count:"exact",head:!0});return t.count=t.count?t.count:0,m(t)}async function he(t){const e=await p.from("depts").select("*").eq("id",t).single();return m(e)}async function we(){const t=await p.from("depts").select("*");return m(t)}async function ve(){const t=await E();if(!t)return{error:"Not logged in"};const e=await p.from("dept_requests").select("*").eq("user_id",t.id);return m(e)}async function ye(t){var s;const e=await E();if(!e)return{error:"Not logged in"};let{data:n,error:r}=await p.rpc("dept_by_access_code",{access_code:t});if((s=n==null?void 0:n[0])!=null&&s.dept_id){const o=await p.from("dept_requests").insert({user_id:e.id,dept_id:n[0].dept_id,access_code:t});return o.status==409&&(o.duplicateError=!0),m(o)}else return r?m({rpcError:!0,data:n,error:r}):{badCodeError:!0,error:r||"No department for access code"}}async function be(t){const e=await p.from("dept_requests").delete().eq("dept_id",t);return m(e)}async function Ce(t){const e=await p.from("depts").insert({name:t}).select();return m(e)}async function Le(t){const{data:e,error:n}=await p.from("days").select("day, data").eq("dept_id",t),r=n?null:F(e);return m({data:r,error:n})}let w=null,O=[];function _e({deptId:t=null,data:e=null}={},{callback:n=null,flush:r=!1}={}){t!==null&&e&&(e=structuredClone(e),w=w??{},w[t]=w[t]??{deptId:t,data:{}},w[t].data={...w[t].data,...e}),n&&!O.includes(n)&&O.push(n);const s=D();return r&&D.flush(),s}function xe(){return D.pending()}const D=N(async()=>{const t=e=>{O.map(n=>n(e)),O=[]};if(w){const e=[];for(const{deptId:n,data:r}of Object.values(w)){const s=[],o=[];Object.entries(r).forEach(([l,i])=>{i.note||Object.values(i.cals??{}).findIndex(a=>{var d;return((d=a.events)==null?void 0:d.length)>0})>-1?o.push({dept_id:n,day:l,data:i}):s.push(l)}),s.length&&e.push(p.from("days").delete().eq("dept_id",n).in("day",s)),o.length&&e.push(p.from("days").upsert(o,{onConflict:"dept_id, day"}))}return console.log("Autosave calendar data"),Promise.all(e).then(n=>(t(n),m(n)))}else return t([]),Promise.resolve([])},z);async function Ee(t){const e=p.from("dept_settings").select("cal_settings, options, templates").eq("dept_id",t).limit(1).single(),n=p.from("user_settings").select("cal_settings, options").limit(1).single();return Promise.all([e,n]).then(([r,s])=>{const o=K(r.data,s.data),{error:l}=m([r,s]);return{data:o,error:l}})}let x=null,M=[];function Oe({deptId:t=null,userId:e=null,settings:n}={},{callback:r=null,flush:s=!1}={}){t!==null&&e!==null&&n&&(x={deptId:t,userId:e,settings:n}),r&&!M.includes(r)&&M.push(r);const o=S();return s&&S.flush(),o}function Me(){return S.pending()}const S=N(async()=>{const t=e=>{M.map(n=>n(e)),M=[]};if(x){const{deptId:e,userId:n,settings:r}=x,{calSettings:s,options:o,templates:l,userCalSettings:i,userOptions:u}=X(r),a=p.from("dept_settings").upsert({dept_id:e,cal_settings:s,options:o,templates:l}),d=p.from("user_settings").upsert({user_id:n,cal_settings:i,options:u});return x=null,console.log("Autosave settings"),Promise.all([a,d]).then(c=>{t(c),m(c)})}else return t([]),Promise.resolve([])},z);function m(t){if(Array.isArray(t)){const e=t.filter(r=>r==null?void 0:r.error).map(r=>r.error),n=t.filter(r=>Object.keys(r||{}).length>0).map(r=>{const{error:s,...o}=r;return Object.keys(o).length==1&&o.data!==void 0?o.data:o});return e.length&&console.log(e),{data:n,error:e.length>0?e:null}}else return t!=null&&t.error&&console.log(t.error),t}export{fe as a,Oe as b,Le as c,Ee as d,te as e,le as f,he as g,ae as h,xe as i,Me as j,ue as k,ge as l,E as m,ce as n,we as o,ve as p,ye as q,be as r,de as s,pe as t,Ce as u,ie as v,_e as w,ne as x,me as y};
