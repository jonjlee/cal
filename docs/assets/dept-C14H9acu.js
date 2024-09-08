import{p as u,r as g,u as f,v as m,y as h,z as p,A as L,j as v}from"./db-kWuhzS5Q.js";document.on("DOMContentLoaded",()=>{C().then(A),loginAccessCode.on("keypress",u(loginAccessCodeBtn)),loginAccessCodeBtn.on("click",k),pendingList.on("click",w),createDeptLink.on("click",D),logoutBtn.on("click",y)});function A(){requestCalendars.classList.remove("d-none"),createDept.classList.remove("d-none"),r(),c()}async function C(){await g()||(window.location.href="./login.html")}function r(){f().then(({data:e})=>{if(e!=null&&e.length){authorizedDepts.classList.remove("d-none");const s=e.map(n=>`<li>
            <div class="list-item">
              <div><a href="./cal.html?d=${n.id}">${n.name}</a></div>
            </div>
          </li>`);authList.innerHTML=s.join("")}else authorizedDepts.classList.add("d-none")})}function c(){m().then(({data:e})=>{if(e!=null&&e.length){pendingDepts.classList.remove("d-none");const s=e.map(n=>`<li>
            <div class="list-item">
              <div class="font-monospace">
                ${n.access_code}
                <a href="#" class="small ps-2 text-muted">
                  <i class="removePending fa-regular fa-circle-xmark" data-dept-id="${n.dept_id}"></i>
                </a>
              </div> 
              <a href="./cal.html?c=${btoa(n.access_code)}" class="small ps-2">
                View-only
                <i class="fa fa-chevron-right" style="font-size: 0.75em"></i>
              </a>
            </div>  
          </li>`);pendingList.innerHTML=s.join("")}else pendingDepts.classList.add("d-none")})}async function k(){t("Requesting...");const e=await h(loginAccessCode.value);e.duplicateError?t("Access request already pending",!0):e.badCodeError?t("Unrecognized access code",!0):e.rpcError?t("Communication error. Please retry later.",!0):t("Access request submitted"),c(),loginAccessCode.focus()}async function w(e){var s,n,o,a,l;if((n=(s=e.target)==null?void 0:s.classList)!=null&&n.contains("removePending")){const i=e.target;(o=i.classList)==null||o.remove("fa-regular","fa-circle-xmark"),(a=i.classList)==null||a.add("fa-solid","fa-ellipsis");const d=(l=i.dataset)==null?void 0:l.deptId;await p(d),c(),e.preventDefault()}}async function D(e){e.preventDefault(),t("Creating new calendar...");const{data:s}=await L("Calendar");(s==null?void 0:s.length)>0?window.location.href="./cal.html?d="+s[0].id:(t("Issue creating calendar. Please contact administrator."),r())}async function y(){await v.signOut(),window.location.href="./login.html"}function t(e,s=!1){e?loginAccessCodeAlert.classList.remove("d-none"):loginAccessCodeAlert.classList.add("d-none");const n=s?"text-danger":"text-muted";loginAccessCodeAlert.classList.remove("text-danger","text-muted"),loginAccessCodeAlert.classList.add(n),loginAccessCodeAlert.innerText=e}
