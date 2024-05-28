import { Auth } from "./auth/auth.js";
import * as model from "./model/model.js";
import { throttle, toast } from "./util.js";
import * as validate from "./validate/validate.js";

class CalApp {
  constructor() {
    this.calData = null;
    this.settings = null;
    this.alerts = null;

    // On object creation (page load), initiate login verification and redirect user appropriately.
    // auth property is a promise, which is used to initialize UI after DOMContentLoaded
    this.auth = new Auth("cal.html", window.location.search).auth;
  }

  initEmbedMode() {
    // If embed=1 in query params, then display in "embedded mode" remove all sidebars, logo, and menu
    const qp = new URLSearchParams(window.location.search);
    const embed = qp.get("embed");
    if (embed == "1") {
      deptNameLabel.style.cssText = "display:none !important";
      menu.style.cssText = "display:none !important";
      sidebar.style.cssText = "display:none !important";
      actionPanel.style.cssText = "display:none !important";
    }
  }

  // Fetch initial full data set from DB. Accepts auth: { user, deptId } from Auth._beginAuth().
  async fetchData(auth) {
    if (!auth.user || auth.deptId == null) {
      throw new Error(
        `Unable to fetch due to invalid user and department ${auth.user?.id}, ${auth.deptId}`
      );
    }

    const fetchDept = model.getUserDept(auth.deptId);
    const fetchData = model.getCalDataAll(auth.deptId);
    const fetchSettings = model.getSettingsAll(auth.deptId);
    return Promise.all([fetchDept, fetchData, fetchSettings]).then(
      async (res) => {
        if (fetchDept.error || fetchData.error || fetchSettings.error) {
          throw new Error(
            `Error fetching data: ${[
              fetchDept.error,
              fetchData.error,
              fetchSettings.error,
            ]}`
          );
        }
        return {
          auth,
          dept: res[0].data,
          calData: res[1].data,
          settings: res[2].data,
        };
      }
    );
  }

  initUI({ auth, dept, calData, settings }) {
    if (!auth || !calData || !settings) {
      throw new Error("Invalid login or user data");
    }

    // Retain reference to underlying data
    [this.auth, this.calData, this.settings] = [auth, calData, settings];
    [window.AUTH, window.CAL_DATA, window.SETTINGS] = [auth, calData, settings];
    const deptRole = auth.user.user_metadata?.depts[dept.id];

    // Render header and menu data. Show Date navigation bar in header.
    this.renderHeader(auth.user, dept);
    calNav.classList.remove("d-none");

    // Render main content
    mainCal.loadData(calData, settings);
    mainCal.alerts = validate.defaultView(calData, settings);
    mainCal.readonly = !(deptRole == "admin" || deptRole == "edit");
    calList.settings = settings;
    peopleList.settings = settings;

    // Start off with today selected
    setTimeout(() => calNav.today(), 0);

    // Event handlers
    logout.addEventListener("click", this._handleLogout);
    mainCal.addEventListener("select", this._handleCalSelect.bind(this));
    mainCal.addEventListener("change", this._handleCalChange.bind(this));
    calList.addEventListener("change", this._handleCalListChange.bind(this));
    peopleList.addEventListener("change", this._handlePeopleChange.bind(this));
    actionPanel.addEventListener("save", this._handleSave.bind(this));
    window.addEventListener("beforeunload", this._checkDirtyOnUnload);

    // Global shortcut keys
    document.addEventListener("keydown", this._handleHotkey.bind(this));
  }

  renderHeader(user, dept) {
    if (!user || !user.email) {
      userNameLabel.innerText = "Not logged in";
    } else if (user.user_metadata?.restricted) {
      userNameLabel.innerText = "View Only";
    } else {
      userNameLabel.innerText = user.email;
    }

    if (dept.name) {
      deptNameLabel.innerText = dept.name;
    }
    if (dept.id) {
      deptNameLabel.href = "./cal.html?d=" + dept.id;
      settingsLink.href = "./settings.html?d=" + dept.id;
      settingsLink.classList.remove("d-none");
    }
  }

  // -------------------------------------------------------------------------
  // EVENT HANDLERS
  // -------------------------------------------------------------------------
  async _handleLogout(e) {
    e.preventDefault();
    await model.auth.signOut();
    window.location.href = "./login.html";
  }

  _handleCalSelect(e) {
    const { selected } = e.detail;
  }

  _handleCalChange(e) {
    if (!mainCal.readonly) {
      const { data } = e.detail;
      const days = Object.keys(data);
      if (days.length > 0) {
        // Write changes to calendar to DB
        model.writeCalData(
          { deptId: AUTH.deptId, data },
          { callback: this._handleSaveComplete }
        );
        actionPanel.enableSave();

        // Regenerate alerts for changed days
        const alerts = validate.defaultView(data, this.settings);
        days.forEach((day) => (mainCal.alerts[day] = alerts[day] ?? []));
        mainCal.forceRefresh(days);
        actionPanel.requestUpdate();
      }
    }
  }

  _handleCalListChange(e) {
    // Update in-memory settings object
    const { cal, color, checked } = e.detail;
    if (checked !== undefined) {
      SETTINGS.cals[cal].visible = checked ? 1 : 0;
    }
    if (color !== undefined) {
      SETTINGS.cals[cal].color = color;
    }

    // Refresh UI and save new settings
    this._handleSettingsUpdated();
  }

  _handlePeopleChange(e) {
    // Refresh UI and save new settings
    SETTINGS = e.detail.settings;
    this._handleSettingsUpdated();
  }

  _handleSettingsUpdated = throttle(() => {
    // Throttle this function because it can get called with high frequency with color changes in cal-people-list
    // Update UI
    mainCal.alerts = validate.defaultView(mainCal.data, SETTINGS);
    mainCal.forceRefresh();
    actionPanel.requestUpdate();

    // Save settings to DB
    if (!mainCal.readonly) {
      model.writeSettingsAll(
        {
          deptId: AUTH.deptId,
          userId: AUTH.user.id,
          settings: SETTINGS,
        },
        { callback: this._handleSaveComplete }
      );
      actionPanel.enableSave();
    }
  }, 250);

  _handleSave() {
    // Save button was clicked. Commit any pending writes to DB.
    if (!mainCal.readonly) {
      model.writeCalData(
        {},
        { callback: this._handleSaveComplete, flush: true }
      );
      model.writeSettingsAll(
        {},
        { callback: this._handleSaveComplete, flush: true }
      );
    }
  }

  // Callback from writing settings or cal data to DB
  _handleSaveComplete(resps) {
    // Indicate to user if there was an error writing. Logs will be in console.
    if (resps.filter((resp) => resp.error).length > 0) {
      mainCal.readonly = true;
      actionPanel.errorSave();
      actionPanel.requestUpdate();
      toast("Unable to save. Please reload page.", { autohide: false });
    } else {
      // Update save button status
      if (!model.writeCalDataPending() && !model.writeSettingsPending()) {
        actionPanel.disableSave();
      }
    }
  }

  _handleHotkey(e) {
    const origTarget = e.composedPath?.()?.[0];
    const isEditable =
      origTarget?.nodeName == "INPUT" ||
      (origTarget?.nodeName == "DIV" && origTarget.contentEditable == "true");

    // ctrl+z or cmd+z
    if (
      (e.ctrlKey || e.metaKey) &&
      e.keyCode == 90 &&
      !e.altKey &&
      !e.shiftKey
    ) {
      if (!isEditable) {
        e.preventDefault();
        mainCal.undo();
      }
    } else if (
      ((e.ctrlKey && !e.shiftKey && e.keyCode == 89) ||
        (e.metaKey && e.shiftKey && e.keyCode == 90)) &&
      !e.altKey
    ) {
      // ctrl+y or cmd+shift+z
      if (!isEditable) {
        e.preventDefault();
        mainCal.redo();
      }
    } else if (
      (e.metaKey || e.ctrlKey) &&
      e.keyCode == 83 &&
      !e.altKey &&
      !e.shiftKey
    ) {
      // ctrl+s or cmd+s
      e.preventDefault();
      this._handleSave();
    } else if (
      e.altKey &&
      e.keyCode == 84 &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.shiftKey &&
      !isEditable
    ) {
      // alt+t
      e.preventDefault();
      calNav.today();
    } else if (
      e.ctrlKey &&
      e.keyCode == 71 &&
      !e.metaKey &&
      !e.altKey &&
      !e.shiftKey
    ) {
      // ctrl+g
      if (!isEditable) {
        e.preventDefault();
        calNav.focus();
        document.querySelector(".cal-navbar-datesel").click();
      }
    }
  }

  _checkDirtyOnUnload(e) {
    if (model.writeCalDataPending() || model.writeSettingsPending()) {
      const msg = "Changes you made may not have been saved.";
      (e || window.event).returnValue = msg;
      return msg;
    }
  }
}

// -------------------------------------------------------------------------
// INITIALIZATION
// -------------------------------------------------------------------------
// Global references to page data
const app = (window.APP = new CalApp());
window.AUTH = app.auth;
window.CAL_DATA = app.calData;
window.SETTINGS = app.settings;

// On load, check for valid login. If not redirect to login form
document.on("DOMContentLoaded", () => {
  app.initEmbedMode();
  app.auth
    .then((auth) =>
      app
        .fetchData(auth)
        .then((data) => app.initUI(data))
        .catch((err) => {
          // Could not fetch calendar data
          console.log(err);
          mainCal.loadingText =
            "Error loading calendar. Please refresh page to try again.";
        })
    )
    .catch((err) => {
      // Not authenticated or authorization problem, redirect.
      console.log(err);
      window.location.href = app.auth.redirect;
    });
});

// -------------------------------------------------------------------------
// UTILITIES
// -------------------------------------------------------------------------
window.importData = async function () {
  let [data, settings] = await Promise.all([
    fetch("./js/2024.json"),
    fetch("./js/settings.json"),
  ]);
  [data, settings] = await Promise.all([data.json(), settings.json()]);

  const calIds = Object.keys(SETTINGS.cals);
  let importCalIds = Object.keys(settings.cals);
  if (importCalIds.length > calIds.length) {
    throw new Error(
      "Not enough existing calendars to import. Need >= " + calIds.length
    );
  }

  const calIdMap = {};
  importCalIds = importCalIds.filter((id) => !calIds.includes(id));
  importCalIds.forEach((id, idx) => (calIdMap[id] = calIds[idx]));
  for (const calData of Object.values(data)) {
    Object.keys(calData.cals).forEach((id) => {
      calData.cals[id].id = calIdMap[id];
      calData.cals[calIdMap[id]] = calData.cals[id];
      delete calData.cals[id];
    });
  }
  model.writeCalData({ deptId: AUTH.deptId, data }, { flush: true });

  Object.keys(settings.cals).forEach((id) => {
    settings.cals[calIdMap[id]] = settings.cals[id];
    delete settings.cals[id];
  });
  settings.options.calOrder = settings.options.calOrder.map(
    (id) => calIdMap[id]
  );
  for (const template of settings.templates) {
    for (const dayData of Object.values(template.data)) {
      Object.keys(dayData.cals).forEach((id) => {
        dayData.cals[id].id = calIdMap[id];
        dayData.cals[calIdMap[id]] = dayData.cals[id];
        delete dayData.cals[id];
      });
    }
  }

  model.writeSettingsAll(
    {
      deptId: AUTH.deptId,
      userId: AUTH.user.id,
      settings: settings,
    },
    { flush: true }
  );
};
