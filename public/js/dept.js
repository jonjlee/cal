import * as model from "./model/model.js";
import { submitOnEnter } from "./util.js";

document.on("DOMContentLoaded", () => {
  checkAuth().then(initUI);
  loginAccessCode.on("keypress", submitOnEnter(loginAccessCodeBtn));
  loginAccessCodeBtn.on("click", handleRequestAccessClick);
  pendingList.on("click", handlePendingClick);
  createDeptLink.on("click", handleNewClick);
  logoutBtn.on("click", handleLogoutClick);
});

function initUI() {
  // Show request input and create link
  requestCalendars.classList.remove("d-none");
  createDept.classList.remove("d-none");

  // Render list of accessible departments
  renderAuthList();

  // Render list of all outstanding department requests
  renderPendingList();
}

// On load, check for valid login. If not redirect to login form
async function checkAuth() {
  const user = await model.getUser();
  if (!user) {
    window.location.href = "./login.html";
  }
}

// Update authList <ul> with a link to each accessible department
function renderAuthList() {
  model.getUserDepts().then(({ data }) => {
    if (data?.length) {
      authorizedDepts.classList.remove("d-none");
      const html = data.map(
        (dept) =>
          `<li>
            <div class="list-item">
              <div><a href="./cal.html?d=${dept.id}">${dept.name}</a></div>
            </div>
          </li>`
      );
      authList.innerHTML = html.join("");
    } else {
      authorizedDepts.classList.add("d-none");
    }
  });
}

// Update pendingList <ul> with a link to view each pending department access request
function renderPendingList() {
  model.getUserDeptRequests().then(({ data }) => {
    if (data?.length) {
      pendingDepts.classList.remove("d-none");
      const html = data.map(
        (dept) =>
          `<li>
            <div class="list-item">
              <div class="font-monospace">
                ${dept.access_code}
                <a href="#" class="small ps-2 text-muted">
                  <i class="removePending fa-regular fa-circle-xmark" data-dept-id="${
                    dept.dept_id
                  }"></i>
                </a>
              </div> 
              <a href="./cal.html?c=${btoa(
                dept.access_code
              )}" class="small ps-2">
                View-only
                <i class="fa fa-chevron-right" style="font-size: 0.75em"></i>
              </a>
            </div>  
          </li>`
      );
      pendingList.innerHTML = html.join("");
    } else {
      pendingDepts.classList.add("d-none");
    }
  });
}

// Request access button clicked. Add a department access request to DB and refresh UI.
async function handleRequestAccessClick() {
  feedback("Requesting...");

  const res = await model.addUserDeptRequest(loginAccessCode.value);
  if (res.duplicateError) {
    feedback("Access request already pending", true);
  } else if (res.badCodeError) {
    feedback("Unrecognized access code", true);
  } else if (res.rpcError) {
    feedback("Communication error. Please retry later.", true);
  } else {
    feedback("Access request submitted");
  }
  renderPendingList();
  loginAccessCode.focus();
}

async function handlePendingClick(ev) {
  if (ev.target?.classList?.contains("removePending")) {
    const icon = ev.target;
    icon.classList?.remove("fa-regular", "fa-circle-xmark");
    icon.classList?.add("fa-solid", "fa-ellipsis");

    const deptId = icon.dataset?.deptId;
    const res = await model.removeUserDeptRequest(deptId);
    renderPendingList();
    ev.preventDefault();
  }
}

async function handleNewClick(ev) {
  ev.preventDefault();

  // Add row to depts, triggering creation of view only user
  feedback("Creating new calendar...");
  const { data } = await model.addDept("Calendar");

  // Redirect to the new dept
  if (data?.length > 0) {
    window.location.href = "./cal.html?d=" + data[0].id;
  } else {
    feedback("Issue creating calendar. Please contact administrator.");
    renderAuthList();
  }
}

async function handleLogoutClick() {
  await model.auth.signOut();
  window.location.href = "./login.html";
}

// Show info/alert text under request access input
function feedback(text, alert = false) {
  if (text) {
    loginAccessCodeAlert.classList.remove("d-none");
  } else {
    loginAccessCodeAlert.classList.add("d-none");
  }
  const textColor = alert ? "text-danger" : "text-muted";
  loginAccessCodeAlert.classList.remove("text-danger", "text-muted");
  loginAccessCodeAlert.classList.add(textColor);
  loginAccessCodeAlert.innerText = text;
}
