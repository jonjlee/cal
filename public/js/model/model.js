import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";
import * as transform from "./transform.js";
import { debounce } from "../util.js";

const supabaseUrl = "https://jcjyqzlsndplibaopbbm.supabase.co";
const supabaseKey =
  "ZXlKaGJHY2lPaUpJVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnBjM01pT2lKemRYQmhZbUZ6WlNJc0luSmxaaUk2SW1wamFubHhlbXh6Ym1Sd2JHbGlZVzl3WW1KdElpd2ljbTlzWlNJNkltRnViMjRpTENKcFlYUWlPakUzTVRJeU5EazBNVE1zSW1WNGNDSTZNakF5TnpneU5UUXhNMzAuY1dJTE52MHRRRDdpVHdKX01NSWFWVzdESlhuS1A3Uk91VWRWX0x1VkJBcw==";
const viewonlyPwd = "readonly";
const WRITE_DELAY_MS = 2000;
export const _supabase = createClient(supabaseUrl, atob(supabaseKey));
export const auth = _supabase.auth;

// ------------------------------------------------------------------------
// AUTH
// ------------------------------------------------------------------------
// Return the currently logged in user or undefined. If fetchFullUser, then will retrieve
// user data from DB instead of session from localstorage plus pull additional metadata
export async function getUser(fetchFullUser = false) {
  if (fetchFullUser) {
    const user = (await _supabase.auth.getUser())?.data?.user;
    if (user) {
      // Add additional columns to user metadata
      let res = await _supabase
        .from("users")
        .select("restricted")
        .eq("id", user.id)
        .single();
      user.user_metadata.restricted = res?.data?.restricted;

      res = await _supabase
        .from("user_dept_roles")
        .select("dept_id, role")
        .eq("user_id", user.id);
      user.user_metadata.depts = {};
      if (res.data) {
        res.data.forEach(
          ({ dept_id, role }) => (user.user_metadata.depts[dept_id] = role)
        );
      }
    }
    return user;
  } else {
    return (await _supabase.auth.getSession())?.data?.session?.user;
  }
}

// Returns whether currently logged in user can access dept based on ID
export async function hasDeptAccess(deptId) {
  const res = await _supabase
    .from("depts")
    .select("*", { count: "exact", head: true })
    .eq("id", deptId);
  return res.count > 0;
}

// Given a department access code, see if current user has access. If not, look up view only user and login.
// Returns logged in { user, error }
export async function loginByAccessCode(accessCode) {
  let user = await getUser(true);

  // Query dept ID from access code
  const dept = await _supabase.rpc("dept_by_access_code", {
    access_code: accessCode,
  });
  const deptId = dept.data?.[0]?.dept_id;
  const viewonlyUser = dept.data?.[0]?.username;

  // Access code is invalid, return error
  if (deptId === null || deptId === undefined) {
    return {
      badCodeError: true,
      error: dept.error || "No department for access code",
    };
  }

  // If user is logged in, check if they have access
  let res = null;
  if (user) {
    if (await hasDeptAccess(deptId)) {
      return { user, deptId };
    }
  }

  // No access for current user. Re-login as view only user.
  if (viewonlyUser) {
    res = await auth.signInWithPassword({
      email: viewonlyUser,
      password: viewonlyPwd,
    });
    if (!res.error) {
      // Successful login. Return reference to user along with full server response
      user = await getUser(true);
      return { user, deptId, data: res.data };
    } else {
      // Error logging in with view only user
      return _logAndReturn({ authError: true, error: res.error });
    }
  }

  // Current user has no access, and no view only credentials were found
  return { authError: true, error: "No view only user available" };
}

// ------------------------------------------------------------------------
// DEPARTMENTS
// ------------------------------------------------------------------------
// Return # rows in depts table that this user can access
export async function countUserDepts() {
  const res = await _supabase
    .from("depts")
    .select("*", { count: "exact", head: true });
  res.count = res.count ? res.count : 0;
  return _logAndReturn(res);
}

// Return department by ID
export async function getUserDept(deptId) {
  const res = await _supabase
    .from("depts")
    .select("*")
    .eq("id", deptId)
    .single();
  return _logAndReturn(res);
}

// Return all departments that this user can access
export async function getUserDepts() {
  const res = await _supabase.from("depts").select("*");
  return _logAndReturn(res);
}

// Return all departments that this user has outstanding requests to access
export async function getUserDeptRequests() {
  const user = await getUser();
  if (!user) {
    return { error: "Not logged in" };
  }
  const res = await _supabase
    .from("dept_requests")
    .select("*")
    .eq("user_id", user.id);
  return _logAndReturn(res);
}

// Adds a new request to access a department using an access code for the current user
// Returns an error if accessCode does not correspond to an existing department
export async function addUserDeptRequest(accessCode) {
  const user = await getUser();
  if (!user) {
    return { error: "Not logged in" };
  }
  let { data, error } = await _supabase.rpc("dept_by_access_code", {
    access_code: accessCode,
  });

  if (data?.[0]?.dept_id) {
    const res = await _supabase.from("dept_requests").insert({
      user_id: user.id,
      dept_id: data[0].dept_id,
      access_code: accessCode,
    });
    if (res.status == 409) {
      res.duplicateError = true;
    }
    return _logAndReturn(res);
  } else if (error) {
    return _logAndReturn({ rpcError: true, data, error });
  } else {
    return {
      badCodeError: true,
      error: error || "No department for access code",
    };
  }
}

// Delete an existing request to access a department by dept_id for the current user
export async function removeUserDeptRequest(deptId) {
  const res = await _supabase
    .from("dept_requests")
    .delete()
    .eq("dept_id", deptId);
  return _logAndReturn(res);
}

// Create a new department with current user as an admin
export async function addDept(name) {
  const res = await _supabase.from("depts").insert({ name }).select();
  return _logAndReturn(res);
}

// Update the access code for a department by ID
export async function setDeptAccessCode(deptId, access_code) {
  const res = await _supabase
    .from("dept_viewers")
    .update({ access_code })
    .eq("dept_id", deptId);
  return _logAndReturn(res);
}

// ------------------------------------------------------------------------
// CALENDAR DATA
// ------------------------------------------------------------------------
export async function getCals() {}
export async function getCalDataAll(deptId) {
  const { data: rows, error } = await _supabase
    .from("days")
    .select("day, data")
    .eq("dept_id", deptId);
  const data = !error ? transform.rowsToCalData(rows) : null;
  return _logAndReturn({ data, error });
}

// Accepts an object { "2020-01-01": { cals: { ... } } and writes each item as a DB row
let pendingCalData = null;
let pendingCalDataCallbacks = [];
export function writeCalData(
  { deptId = null, data = null } = {},
  { callback = null, flush = false } = {}
) {
  if (deptId !== null && data) {
    // Cache new data by combining it with any pending writes
    data = structuredClone(data);
    pendingCalData = pendingCalData ?? {};
    pendingCalData[deptId] = pendingCalData[deptId] ?? { deptId, data: {} };
    pendingCalData[deptId].data = { ...pendingCalData[deptId].data, ...data };
  }

  // Store callback to be performed on commit
  if (callback && !pendingCalDataCallbacks.includes(callback)) {
    pendingCalDataCallbacks.push(callback);
  }

  // Commit to DB after no subsequent calls for WRITE_DELAY_MS
  const ret = commitCalData();
  if (flush) {
    commitCalData.flush();
  }
  return ret;
}
export function writeCalDataPending() {
  return commitCalData.pending();
}
const commitCalData = debounce(async () => {
  const callbacks = (resps) => {
    pendingCalDataCallbacks.map((cb) => cb(resps));
    pendingCalDataCallbacks = [];
  };

  if (pendingCalData) {
    const reqs = [];

    for (const { deptId, data } of Object.values(pendingCalData)) {
      const rowsToDelete = [];
      const rowsToUpdate = [];

      // Sort days into those that have events which need to be updated, and days to delete from DB
      Object.entries(data).forEach(([day, dayData]) => {
        const dayHasEventsOrNote =
          dayData.note ||
          Object.values(dayData.cals ?? {}).findIndex(
            (calData) => calData.events?.length > 0
          ) > -1;
        if (dayHasEventsOrNote) {
          // Update row in DB for any day that has at least one event
          rowsToUpdate.push({
            dept_id: deptId,
            day,
            data: dayData,
          });
        } else {
          // Delete rows that have no events rather than storing an empty json blob
          rowsToDelete.push(day);
        }
      });

      if (rowsToDelete.length) {
        reqs.push(
          _supabase
            .from("days")
            .delete()
            .eq("dept_id", deptId)
            .in("day", rowsToDelete)
        );
      }
      if (rowsToUpdate.length) {
        reqs.push(
          _supabase
            .from("days")
            .upsert(rowsToUpdate, { onConflict: "dept_id, day" })
        );
      }
    }
    console.log("Autosave calendar data");
    return Promise.all(reqs).then((resps) => {
      callbacks(resps);
      return _logAndReturn(resps);
    });
  } else {
    // No pending writes, just resolve
    callbacks([]);
    return Promise.resolve([]);
  }
}, WRITE_DELAY_MS);

// ------------------------------------------------------------------------
// SETTINGS
// ------------------------------------------------------------------------
// Retrieve department and user settings, and combine into single object:
// { cals: { "id": {} }, options: { calOrder, peopleGroupOrder, peopleGroups, people, templates }}
export async function getSettingsAll(deptId) {
  const deptSettingsReq = _supabase
    .from("dept_settings")
    .select("cal_settings, options, templates")
    .eq("dept_id", deptId)
    .limit(1)
    .single();
  const userSettingsReq = _supabase
    .from("user_settings")
    .select("cal_settings, options")
    .limit(1)
    .single();

  return Promise.all([deptSettingsReq, userSettingsReq]).then(
    ([deptSettings, userSettings]) => {
      // Combine department and users settings into one object
      const settings = transform.combineSettings(
        deptSettings.data,
        userSettings.data
      );
      const { error } = _logAndReturn([deptSettings, userSettings]);
      return { data: settings, error };
    }
  );
}

// Write settings into dept_settings and user_settings tables
let pendingSettings = null;
let pendingSettingsCallbacks = [];
export function writeSettingsAll(
  { deptId = null, userId = null, settings } = {},
  { callback = null, flush = false } = {}
) {
  if (deptId !== null && userId !== null && settings) {
    // Cache new settings, and commit to DB after no subsequent calls for WRITE_DELAY_MS
    pendingSettings = { deptId, userId, settings };
  }
  // Store callback to be performed on commit
  if (callback && !pendingSettingsCallbacks.includes(callback)) {
    pendingSettingsCallbacks.push(callback);
  }
  const ret = commitSettings();
  if (flush) {
    commitSettings.flush();
  }
  return ret;
}
export function writeSettingsPending() {
  return commitSettings.pending();
}
const commitSettings = debounce(async () => {
  const callbacks = (resps) => {
    pendingSettingsCallbacks.map((cb) => cb(resps));
    pendingSettingsCallbacks = [];
  };

  // Writes cached pendingSettings to DB. Debounced so writes happen WRITE_DELAY_MS after last call to commitSettings().
  if (pendingSettings) {
    const { deptId, userId, settings } = pendingSettings;

    // Separate settings into department and user settings
    const { calSettings, options, templates, userCalSettings, userOptions } =
      transform.splitSettings(settings);

    // Update DB tables
    const deptSettingsReq = _supabase.from("dept_settings").upsert({
      dept_id: deptId,
      cal_settings: calSettings,
      options: options,
      templates: templates,
    });
    const userSettingsReq = _supabase.from("user_settings").upsert({
      user_id: userId,
      cal_settings: userCalSettings,
      options: userOptions,
    });

    // Clear pending save
    pendingSettings = null;

    // Return any errors from upsert commands
    console.log("Autosave settings");
    return Promise.all([deptSettingsReq, userSettingsReq]).then((resps) => {
      callbacks(resps);
      _logAndReturn(resps);
    });
  } else {
    // No pending writes, just resolve
    callbacks([]);
    return Promise.resolve([]);
  }
}, WRITE_DELAY_MS);

// ------------------------------------------------------------------------
// HELPERS
// ------------------------------------------------------------------------
// If an the res has an error field, log it, then return original response
// If res is an array of responses, then combine them into [data] and [error]
function _logAndReturn(res) {
  // Convert an array of responses to { data: [], error: [] }
  if (Array.isArray(res)) {
    const errors = res.filter((el) => el?.error).map((el) => el.error);
    const datas = res
      .filter((el) => Object.keys(el || {}).length > 0)
      .map((el) => {
        // Remove the error key if it exists in each response
        // If there is only a remaining data key, return that, otherwise return a full object
        // e.g. [{ data, error }, { data }, { other }] => [ data, data, { other } ]
        const { error: _, ...rest } = el;
        return Object.keys(rest).length == 1 && rest.data !== undefined
          ? rest.data
          : rest;
      });
    if (errors.length) {
      console.log(errors);
    }
    return { data: datas, error: errors.length > 0 ? errors : null };
  } else {
    if (res?.error) {
      console.log(res.error);
    }
    return res;
  }
}
