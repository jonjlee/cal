import * as util from "../util.js";

// Run validators for the default calendar view
export function defaultView(data, settings, options = {}) {
  // Get all regular templates (not extra user templates), and compile
  const templates = settings?.templates?.filter((t) => t.type == "regular");
  const compiledTemplates = compileTemplates(templates);

  // Store compiled templates to context
  options.context = options.context ?? {};
  options.context.compiledTemplates = compiledTemplates;

  // Only validate to the last populated date
  options.maxDate = options.maxDate ?? _lastDateWithData(data);

  // Default calendar view should show alerts for unknown names and days that don't match any
  // regular templates
  return validate(data, settings, [peopleNames, regularShifts], options);
}

// Accepts the full calendar data and user/dept settings and runs validators against each
// day, produces alerts when validators are not satisfied. Returns a map of
// { "2020-01-01": [{ type: "info|warn|danger|", text: "alert" }}, ...]
export function validate(
  data,
  settings,
  validators = [],
  { days = null, minDate = util.today(), maxDate = null, context = null } = {}
) {
  const alerts = {};

  // Iterate over specified days, e.g. ["2020-01-01", ...] or all days by default
  days = days ?? Object.keys(data);

  // Remove dates outside of [minDate, maxDate] if specified
  days = minDate ? days.filter((day) => day >= minDate) : days;
  days = maxDate ? days.filter((day) => day <= maxDate) : days;

  // Validate each day by running every validator against the day
  days.forEach((day) => {
    const dayAlerts = alerts[day] ?? [];
    validators.forEach((v) => {
      // Call validator for this day and append any alerts
      const validatorAlerts = v(day, data[day], data, settings, context);
      if (validatorAlerts?.length > 0) {
        dayAlerts.push(...validatorAlerts);
      }
    });
    if (dayAlerts.length) {
      alerts[day] = dayAlerts;
    }
  });
  return alerts;
}

// Validates one day against the provided templates. Templates should be compiled using
// compileTemplates() and the result passed into this function via the context object.
export function regularShifts(
  day,
  dayData,
  data,
  settings,
  { compiledTemplates = null }
) {
  if (compiledTemplates) {
    // Get hidden people, calendars, and map from calendar ID to names
    const hiddenPeople = Object.entries(settings.options?.people ?? {})
      .filter(([_, person]) => person.visible === 0)
      .map(([_, person]) => person.name?.toLowerCase());
    const visibleCals = Object.entries(settings.cals ?? {})
      .filter(([_, cal]) => cal.visible ?? true)
      .map(([id, _]) => id);
    const calNames = Object.fromEntries(
      visibleCals.map((id) => [id, settings.cals?.[id]?.name])
    );

    // Extract all of the day's events and subitems into a flat list of:
    // [
    //    { type: "event", calId, resource, schedule },
    //    { type: "subitem", calId, parentResource, parentSchedule, resource, schedule },
    //    ...
    // ]
    const weekday = dayjs(day).day();
    const allEvents = [];
    const eventGroups = Object.values(dayData.cals);
    eventGroups.forEach(({ id: calId, events: eventGroupEvents }) => {
      eventGroupEvents.forEach((event) => {
        const eventResource = event.resource?.trim()?.toLowerCase();
        const eventScheduleStr = Array.isArray(event.schedule)
          ? event.schedule.join(", ")?.trim()?.toLowerCase()
          : event.schedule?.trim()?.toLowerCase();
        allEvents.push({
          type: "event",
          calId,
          resource: eventResource,
          schedule: eventScheduleStr,
        });
        if (event.subitems) {
          event.subitems.forEach((subitem) => {
            allEvents.push({
              type: "subitem",
              calId,
              parentResource: eventResource,
              parentSchedule: eventScheduleStr,
              resource: subitem.resource?.toLowerCase(),
              schedule: Array.isArray(subitem.schedule)
                ? subitem.schedule.join(", ")?.toLowerCase()
                : subitem.schedule?.trim().toLowerCase(),
            });
          });
        }
      });
    });

    // Iterate over all defined templates to find one that is satisfied by the events on this day.
    // A template is  satisfied if there is a shift that satisfies each rule in the template
    // Format of compiledTemplates: [{ "weekday": [{type, match, resource, shift}] }]
    let hasTemplate = false;
    let foundMatch = false;
    let rules = null;
    let matchedRules = null;
    for (const template of compiledTemplates.reverse()) {
      // Get the rules for the matching weekday in this template
      rules = template[weekday];
      if (rules?.length) {
        // There is at least one template to check for this day
        hasTemplate = true;

        // Track which rules are satisfied by events in this day
        matchedRules = new Array(rules.length).fill(false);

        // Make a copy of the all the events so we can test this template against them
        const remainingEvents =
          compiledTemplates.length == 1
            ? allEvents
            : structuredClone(allEvents);

        // Find an event that satisifies each rule in rule order. compileTemplates() prioritizes
        // exact matches before partial matches.
        rules.forEach((rule, ruleIdx) => {
          // Ignore rules for hidden calendars and hidden resources
          if (
            visibleCals.indexOf(rule.calId) < 0 ||
            hiddenPeople.indexOf(rule.resource.toLowerCase()) >= 0
          ) {
            matchedRules[ruleIdx] = true;
          } else {
            // Iterate over each event that hasn't been used to satisfy a rule to see if it matches this one
            for (const idx in remainingEvents) {
              const event = remainingEvents[idx];
              if (rule.calId == event.calId) {
                if (rule.type == "event" && event.type == "event") {
                  if (
                    (rule.match == "exact" &&
                      rule.resource == event.resource &&
                      rule.schedule == event.schedule) ||
                    (rule.match == "resource" &&
                      rule.resource == event.resource) ||
                    (rule.match == "schedule" &&
                      rule.schedule == event.schedule)
                  ) {
                    // Remove the matching event used to satisfy this rule and mark the rule as matched
                    remainingEvents.splice(idx, 1);
                    matchedRules[ruleIdx] = true;
                    break;
                  }
                }
              }
            }
          }
        });

        // If we found a template where every rule was satisfied, then return
        if (matchedRules.every((x) => !!x)) {
          foundMatch = true;
          break;
        } else {
        }
      }
    }

    if (!hasTemplate || foundMatch) {
      return [];
    } else {
      // Build alert text. This will show the rules that were not matched for last compiledTemplates.
      // In the block above, compiledTemplates.reverse() is called, so alert will be based on the first defined template.
      const names = rules
        .filter((r, idx) => !matchedRules[idx])
        .filter((r) => r.resource && r.resource != "*")
        .map((r) => `${r.display} (${calNames[r.calId]})`);
      return [{ type: "info", text: "Changes: " + names.join(", ") }];
    }
  }

  return [];
}

// Convert each template into a list of rules for each day of the week
// templates: [{ name, format, type, data: { "weekday": { cals: { "id": { id, events: [{ resource, schedule, subitems: [] }]}}}}]
// =>
// compiledTemplates: [{ "weekday": [{priority, type, match, calId, resource, shift}] }]
export function compileTemplates(templates) {
  const ret = [];

  if (templates) {
    for (const template of templates) {
      // Weekly templates have one entry for each weekday (0-6)
      if (template.format == "week") {
        // Transform each cals object for the weekday into a template, then reduce() to an
        // an object: { weekday: template }
        const compiled = Object.entries(template.data)
          .map(([weekday, { cals }]) => [weekday, dayDataToTemplateRules(cals)])
          .filter(([_, rules]) => rules.length);

        if (compiled.length) {
          // Convert [[k, v]] => {k: v} and return compiled template
          ret.push(Object.fromEntries(compiled));
        }
      }
    }
  }

  return ret;
}

// Transform a template's cals object { "id": { id, events: [{ resource, schedule, subitems: [] }] }} into a set of
// rules to validate that data matches the template.
function dayDataToTemplateRules(templateCals) {
  const rules = [];
  Object.values(templateCals).forEach(({ id, events }) => {
    events.forEach(({ resource, schedule, subitems }) => {
      // Convert schedule to a flat string
      const scheduleStr = Array.isArray(schedule)
        ? schedule.join(", ")?.trim()?.toLowerCase()
        : schedule?.trim()?.toLowerCase();

      // Assign a priority to each rules by exact match, partial match resource, partial match shift, wildcard
      if (resource == "" || resource == "*") {
        rules.push({
          priority: 1,
          type: "event",
          match: "partialMatchShift",
          calId: id,
          display: "missing shift",
          schedule: scheduleStr,
        });
      } else if (
        resource != "" &&
        (schedule?.length > 0 || (!Array.isArray(schedule) && schedule))
      ) {
        rules.push({
          priority: 0,
          type: "event",
          match: "exact",
          calId: id,
          resource: resource?.toLowerCase(),
          display: resource,
          schedule: scheduleStr,
        });
      }
    });
  });
  if (rules.length > 0) {
    // Sort rules for this template by priority
    rules.sort((a, b) => a.priority - b.priority);
  }
  return rules;
}

export function peopleNames(day, dayData, data, settings, context) {
  // Get a list of registered people from the settings object
  const knownNames = Object.keys(settings.options?.people ?? {}).map((name) =>
    name.toLowerCase()
  );

  // If there are no people registered, then do not alert
  const alerts = [];
  if (knownNames.length > 0) {
    const unknownNames = new Set();
    // Iterate over every event and event subitem
    Object.values(dayData.cals ?? {}).forEach(({ events }) => {
      events.forEach(({ resource, subitems }) => {
        // For every resource for an event or a subitem of the event,
        // produce an alert if the resource is not in the list of registered people
        if (resource && !knownNames.includes(resource.toLowerCase())) {
          unknownNames.add(resource);
        }
        subitems?.forEach(({ resource }) => {
          if (resource && !knownNames.includes(resource.toLowerCase())) {
            unknownNames.add(resource);
          }
        });
      });
    });

    // Convert list of unknown people to human readable text
    if (unknownNames.size > 0) {
      alerts.push({
        type: "warn",
        text: "Unrecognized: " + Array.from(unknownNames.values()).join(", "),
      });
    }
  }
  return alerts;
}

function _lastDateWithData(data) {
  let max = util.today();
  Object.entries(data).forEach(([day, dayData]) => {
    // Find the latest date that with any data (a note or event)
    const dayHasEventsOrNote =
      dayData.note ||
      Object.values(dayData.cals ?? {}).findIndex(
        (calData) => calData.events?.length > 0
      ) > -1;
    if (dayHasEventsOrNote && day > max) {
      max = day;
    }
  });
  return max;
}
