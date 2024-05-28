import {
  html,
  nothing,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.8.0/core/lit-core.min.js";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";

// -----------------------------------------------------------------------------------
// ICONS
// -----------------------------------------------------------------------------------
// FA SVG icons. See https://fontawesome.com/docs/web/add-icons/svg-bare
const ICONS = {
  calendar: html`<svg
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
  </svg>`,
  "caret-right": html`<svg
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
  </svg>`,
  "chevron-down": html`<svg
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
  </svg>`,
  "chevron-up": html`<svg
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
  </svg>`,
  "diagram-next": html`<svg
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
  </svg>`,
  "grip-vertical": html`<svg
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
  </svg>`,
  subitem: html`
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
  `,
  plus: html`<svg
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
  </svg>`,
  "trash-can": html`<svg
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
  </svg>`,
  xmark: html`<svg
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
  </svg>`,
};

// Returns an SVG element representing FA icon
export function renderIcon(icon) {
  if (icon) {
    return ICONS[icon] ?? html`<span>!${icon}</span>`;
  } else {
    return nothing;
  }
}

// -----------------------------------------------------------------------------------
// NOTIFICATION POPUP (BOOSTRAP TOAST)
// -----------------------------------------------------------------------------------
export function toast(html, options) {
  const toastEl = document.querySelector("#notification");
  const toastBodyEl = document.querySelector("#notification .toast-body");
  if (toastEl && toastBodyEl) {
    toastBodyEl.innerHTML = html;
    bootstrap.Toast.getOrCreateInstance(toastEl, options).show();
  }
}

// -----------------------------------------------------------------------------------
// SHIFT DATE/TIME HELPERS
// -----------------------------------------------------------------------------------
// Regexps for parsing times. Time groups are: (h), (m), (a|p).
const TIME_STR = "([0-2]?[0-9])(?::([0-5][0-9]))?\\s*(?:([ap])m?)?";
// Day groups are: (days)
const ADDL_DAY_STR = "(?:\\s*\\+\\s*([0-9]+)\\s*d)";
// RegExp to parse the first and last times in a shift (eg 8a-5p+1d)
// Use: [_, hr, min, ampm, dayoffset] = TIME_RE.exec()
const TIME_RE = new RegExp(`^\\s*${TIME_STR}${ADDL_DAY_STR}?\\s*$`, "i");

// Normalize a time into a dayjs() object. Accepts times including variations like:
// 8, 8a, 8am, 8:00am, 8:00am+1d
export function normalizeTime(dateStr, timeStr) {
  const [match, hr, min, ampm, dayOffset] = TIME_RE.exec(timeStr) ?? [];
  if (!match || parseInt(hr) >= 24) {
    return null;
  } else {
    const normTimeStr = `${hr}:${min || "00"} ${ampm || "a"}m`;
    const normDayOffset = parseInt(dayOffset) || 0;
    return dayjs(`${dateStr} ${normTimeStr}`, "YYYY-MM-DD h:mm a").add(
      normDayOffset,
      "day"
    );
  }
}

// Normalize a shift into two dayjs() objects, start and end, and a duration in hours or returns null if not properly formatted.
// Accepts shifts including variations like:
// 8a-5p, 6:30-6:30+1d
export function normalizeShift(dateStr, shiftStr) {
  // Split shift by '-' and convert start and end into dayjs() objects
  const [startStr, endStr] = shiftStr?.split("-") ?? [];
  let start = normalizeTime(dateStr, startStr);
  let end = normalizeTime(dateStr, endStr);
  if (!start || !end) {
    return null;
  }
  // For shifts with start time or end times 12-5, unless explicitly denoted as am, assume user wants it to be PM
  if (start.hour() >= 0 && start.hour() <= 5 && !startStr.match(/am?$/i)) {
    start = start.add(12, "hour");
  }
  if (end.hour() >= 0 && end.hour() <= 5 && !endStr.match(/am?$/i)) {
    end = end.add(12, "hour");
  }
  // For shifts like 6a-6a or 5p-6a, assume end date is one day in the future
  if (start.isSame(end) || start.isAfter(end)) {
    end = end.add(1, "day");
  }
  return { start, end, hours: Math.max(0, end.diff(start, "hour", true)) };
}

// Call cb({day, calId, resource, shift, subitemResource, subitemShift }) for every shift in data.
// If days is specified, then limit iteration to specific days in "YYYY-MM-DD" format.
// Note that the schedule ["8-12", "1-5"] represents the two shifts: "8-12" and "1-5". If a subitem does not have a
// schedule, it inherits the parent event's schedule.
export function forEachShift(data, days = null, cb = null) {
  if (typeof cb === "function") {
    // Iterate over all days in data unless specified
    days = days ?? Object.keys(data);

    // Iterate over selected days. 
    for (const day of days) {
      const dayData = data[day];
      if (dayData && dayData.cals) {
        // If there's data for this day, iterate over calendars
        for (const calId of Object.keys(dayData.cals)) {
          const events = dayData.cals[calId].events;
          if (events) {
            // If there's events in this calendar, iterater over events
            for (const { resource, schedule, subitems } of events) {
              // Iterate over schedule list
              if (Array.isArray(schedule)) {
                for (const shift of schedule) {
                  cb({ day, calId, resource, shift });
                }
              }

              // For subitems, do the same thing, except bring in parent's schedule if not specifed in subitem
              if (subitems?.length > 0) {
                for (const subitem of subitems) {
                  const subitemResource = subitem.resource;
                  const subitemSchedule = subitem.schedule?.[0]
                    ? subitem.schedule
                    : schedule;
                  if (Array.isArray(subitemSchedule)) {
                    for (const shift of subitemSchedule) {
                      cb({ day, calId, resource, subitemResource, shift });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

// -----------------------------------------------------------------------------------
// EVENT HANDLER HELPERS
// -----------------------------------------------------------------------------------
// Returns an event handler that focuses the given field when enter is pressed
export function nextFieldOnEnter(nextEl) {
  return (ev) => {
    if (ev.keyCode == 13) {
      nextEl.focus();
      ev.preventDefault();
    }
  };
}

// Returns an event handler that clicks the given button when enter is pressed
export function submitOnEnter(btn) {
  return (ev) => {
    if (ev.keyCode == 13) {
      btn.click();
      ev.preventDefault();
    }
  };
}

// -----------------------------------------------------------------------------------
// UTILITIES
// -----------------------------------------------------------------------------------
export function today() {
  return dayjs().format("YYYY-MM-DD");
}

// lodash.debounce() from https://github.com/lodash/lodash/blob/main/src/debounce.ts
export function debounce(func, wait, options = {}) {
  let lastArgs;
  let lastThis;
  let maxWait;
  let result;
  let timerId;
  let lastCallTime;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  wait = +wait || 0;
  leading = !!options.leading;
  maxing = "maxWait" in options;
  maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
  trailing = "trailing" in options ? !!options.trailing : trailing;

  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function startTimer(pendingFunc, milliseconds) {
    // eslint-disable-next-line @typescript-eslint/no-implied-eval
    return setTimeout(pendingFunc, milliseconds);
  }

  function cancelTimer(id) {
    clearTimeout(id);
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time));
    return undefined;
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function pending() {
    return timerId !== undefined;
  }

  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
}

export function throttle(func, wait, options = {}) {
  let leading = true;
  let trailing = true;

  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  leading = "leading" in options ? !!options.leading : leading;
  trailing = "trailing" in options ? !!options.trailing : trailing;
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait,
  });
}
