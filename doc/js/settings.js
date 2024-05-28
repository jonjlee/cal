import { Auth } from "./auth/auth.js";
import * as model from "./model/model.js";

const auth = (window.AUTH = new Auth("settings.html", window.location.search));

// On load, check for valid login. If not redirect to login form
document.on("DOMContentLoaded", () => {
  auth.auth
    .then((auth) => {
      renderHeader(auth.user, auth.deptId);
      fetchData(auth)
        .then((data) => initUI(data))
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      // Not authenticated or authorization problem, redirect.
      console.log(err);
    });
});

function renderHeader(user, deptId) {
  if (!user || !user.email) {
    userNameLabel.innerText = "Not logged in";
  } else if (user.user_metadata?.restricted) {
    userNameLabel.innerText = "View Only";
  } else {
    userNameLabel.innerText = user.email;
  }
  if (deptId) {
    deptNameLabel.href = "./cal.html?d=" + deptId;
  }
}

// Fetch initial full data set from DB. Accepts auth: { user, deptId } returned from Auth._beginAuth.
async function fetchData(auth) {
  if (!auth.user || auth.deptId == null) {
    throw new Error(
      `Unable to fetch due to invalid user and department ${auth.user?.id}, ${auth.deptId}`
    );
  }

  const fetchDept = model.getUserDept(auth.deptId);
  const fetchSettings = model.getSettingsAll(auth.deptId);
  return Promise.all([fetchDept, fetchSettings]).then(async (res) => {
    if (fetchDept.error || fetchSettings.error) {
      throw new Error(
        `Error fetching data: ${[fetchDept.error, fetchSettings.error]}`
      );
    }
    return {
      auth,
      dept: res[0].data,
      settings: res[1].data,
    };
  });
}

function initUI({ auth, dept, settings }) {
  if (!auth || !dept || !settings) {
    throw new Error("Invalid login or user data");
  }
  mainDiv.innerHTML = `<pre>${JSON.stringify(settings, null, 2)}</pre>`;

  // Event handlers
  logout.addEventListener("click", _handleLogout);
}

// -------------------------------------------------------------------------
// EVENT HANDLERS
// -------------------------------------------------------------------------
async function _handleLogout(e) {
  e.preventDefault();
  await model.auth.signOut();
  window.location.href = "./login.html";
}
