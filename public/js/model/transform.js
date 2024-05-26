// Convert rows of [ "2022-01-01", { json } ] => { "2022-01-01": { json } }
export function rowsToCalData(rows) {
  const res = {};
  if (rows?.length > 0) {
    rows.forEach(({ day, data }) => (res[day] = data));
  }
  return res;
}

// Receives two json objects from DB and combines them into a single settings object
// Typically individual settings do not overlap, though the tree structures are the same.
// When they do overlap, user settings will override departmental settings
export function combineSettings(deptSettings, userSettings) {
  // If department or user settings missing, return the one that exists
  if (!deptSettings && !userSettings) {
    return { cals: {}, options: {} };
  } else if (deptSettings && !userSettings) {
    return {
      cals: deptSettings.cal_settings,
      options: deptSettings.options,
      templates: deptSettings.templates,
    };
  } else if (userSettings && !deptSettings) {
    return {
      cals: userSettings.cal_settings,
      options: userSettings.options,
      templates: [],
    };
  }

  // Default empty values for any missing settings
  const calSettings = deptSettings.cal_settings ?? {};
  const options = deptSettings.options ?? {};
  const templates = deptSettings.templates ?? [];
  const userCalSettings = userSettings.cal_settings ?? {};
  const userOptions = userSettings.options ?? {};

  // Combine settings by pulling specific fields from dept and user
  const c = (user, dept, key, def) => user?.[key] ?? dept?.[key] ?? def;
  const ret = {
    cals: {},
    options: {
      calOrder: options.calOrder,
      peopleGroupOrder: options.peopleGroupOrder,
      peopleGroups: options.peopleGroups,
      people: {},
    },
    templates: templates,
  };
  Object.keys(calSettings).forEach(
    (calId) =>
      (ret.cals[calId] = {
        name: calSettings[calId].name,
        type: calSettings[calId].type,
        visible: c(userCalSettings[calId], calSettings[calId], "visible", 1),
        color: c(userCalSettings[calId], calSettings[calId], "color"),
        background: c(userCalSettings[calId], calSettings[calId], "background"),
      })
  );
  Object.keys(options.people ?? {}).forEach(
    (name) =>
      (ret.options.people[name] = {
        name,
        visible: c(userOptions.people?.[name], null, "visible", 1),
        color: c(userOptions.people?.[name], null, "color", undefined),
      })
  );

  return ret;
}

// Divide a single settings object into department and user settings objects: { calSettings, options, templates, userCalSettings, userOptions }
export function splitSettings(settings) {
  const calSettings = settings.cals || {};
  const options = settings.options || {};

  // Get lists of IDs that we will need to use to reconstruct embedded objects
  const calIds = Object.keys(calSettings);
  const peopleGroupIds = Object.keys(options.peopleGroups ?? {});
  const peopleIds = Object.keys(options.people ?? {});

  const deptCalSettings = {};
  const deptOptions = {
    calOrder: options.calOrder,
    peopleGroupOrder: options.peopleGroupOrder,
    peopleGroups: {},
    people: {},
  };
  const templates = settings.templates;

  const userCalSettings = {};
  const userOptions = {
    peopleGroups: {},
    people: {},
  };

  calIds.forEach((calId) => {
    deptCalSettings[calId] = {
      name: calSettings[calId].name,
      type: calSettings[calId].type,
      color: calSettings[calId].color,
      background: calSettings[calId].background,
    };
    userCalSettings[calId] = {
      visible: calSettings[calId].visible,
    };
  });
  peopleGroupIds.forEach((group) => {
    deptOptions.peopleGroups[group] = {
      group,
      names: options.peopleGroups[group].names,
    };
    userOptions.peopleGroups[group] = {
      visible: options.peopleGroups[group].visible ?? 1,
    };
  });
  peopleIds.forEach((name) => {
    deptOptions.people[name] = { name };
    userOptions.people[name] = {
      visible: options.people[name].visible ?? 1,
      color: options.people[name].color,
    };
  });

  return {
    calSettings: deptCalSettings,
    options: deptOptions,
    templates,
    userCalSettings,
    userOptions,
  };
}
