import {
  html,
  css,
  LitElement,
  nothing,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.8.0/core/lit-core.min.js";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";
import { UndoManager } from "../undomgr.js";
import { throttle } from "../util.js";
import "./cal-day.js";

class CalComponent extends LitElement {
  static styles = css`
    :host {
      flex-grow: 1; /* Grow the cal-component to fill our parent's (#main) horizontal space, which is display: flex */
      display: flex; /* Display children (.cal-header and .cal-container) using flex layout in vertical direction */
      flex-direction: column;
    }
    .loading {
      flex-grow: 1;
      padding-top: 20px;
      text-align: center;
      color: #8e8e8e;
    }
    .cal-month-gutter {
      /* Default to hidden - see @media query below for showing on larger screens */
      display: none;
      align-items: start;
      justify-content: end;
    }
    .cal-month-gutter div {
      color: var(--month-name-color);
      margin-top: 5px;
      writing-mode: tb-rl;
      transform: rotate(-180deg);
    }
    .cal-header {
      height: 2.1rem;
      display: grid;
      /* Default to not show month gutter column - see @media query below for showing on larger screens */
      grid-template-columns: repeat(7, minmax(18px, 1fr));
      grid-gap: 1px;
      margin-bottom: 0px;
      border-bottom: 1px solid var(--border-color);
    }
    .cal-header-day {
      font-weight: 550;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .cal-container {
      display: grid;
      flex-grow: 1; /* Fill the rest of the vertical space of our parent (cal-component, aka :host) */
      overflow-y: scroll; /* Keep as scroll to have scrollbar always visible. Setting to auto causes performance issues with reflow on every key input. */
      padding: 1px;
      /* Default to not show month gutter column - see @media query below for showing on larger screens */
      grid-template-columns: repeat(7, minmax(18px, 1fr));
      /* use min=min-content to make day expand to show full contents. cal-day also has min-height set to make sure it doesn't completely
         collapse when empty. We can't put the minimum height inside minmax(), because with once cal-container has overflowing content,
         it will start to compress the rows, overriding the minimum in grid-auto-rows if set to a specific value. so we put the minimum in cal-day
         min-height instead which takes precedence. */
      grid-auto-rows: minmax(min-content, auto);
      grid-gap: 1px;
    }

    /* Only show month name gutter when on medium device or larger (https://getbootstrap.com/docs/5.3/layout/breakpoints/) */
    @media only screen and (min-width: 768px) {
      .cal-month-gutter {
        display: flex;
      }
      .cal-header {
        grid-template-columns: var(--month-name-width) repeat(
            7,
            minmax(18px, 1fr)
          );
      }
      .cal-container {
        grid-template-columns: var(--month-name-width) repeat(
            7,
            minmax(18px, 1fr)
          );
      }
    }

    @media print {
    }
  `;

  // ----------------------------
  // LitElement implementation
  // ----------------------------
  static properties = {
    loadingText: { type: String },
    readonly: { type: Boolean },
    start: { type: String },
    end: { type: String },
    alerts: { type: Object, attribute: false },
  };

  constructor() {
    super();

    // Contains the user data for specific days. See loadData() and cal.js for example of data format.
    this.data = null;

    // Undo manager to track changes in-memory for this session
    this._undo = new UndoManager();

    // Flags for selecting days with mouse
    this._selecting = false;
    this._firstSelectedIdx = null;
    this._lastSelectedIdx = null;
  }

  connectedCallback() {
    super.connectedCallback();

    // Data for a day has changed
    this.addEventListener("cal-day-change", this._handleDayChange);

    // Receive mouse events from individal days
    this.addEventListener("cal-day-mousedown", this._handleMouseDown);
    this.addEventListener("cal-day-mouseover", this._handleMouseOver);
    this.addEventListener("cal-day-mouseup", this._handleMouseUp);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("cal-day-change", this._handleDayChange);
    this.removeEventListener("cal-day-mousedown", this._handleMouseDown);
    this.removeEventListener("cal-day-mouseover", this._handleMouseOver);
    this.removeEventListener("cal-day-mouseup", this._handleMouseUp);
  }

  render() {
    // Display Loading banner if loadData() hasn't been called yet.
    // Either show user's loading text or animation from https://github.com/n3r4zzurr0/svg-spinners
    if (!this.data) {
      return html`<div class="loading">
        ${this.loadingText ??
        html`<img src="img/3-dots-scale.svg" style="height:48px" />`}
      </div>`;
    }

    return html`
      <div class="cal-header">
        <div></div>
        <div class="cal-header-day">Mon</div>
        <div class="cal-header-day">Tue</div>
        <div class="cal-header-day">Wed</div>
        <div class="cal-header-day">Thu</div>
        <div class="cal-header-day">Fri</div>
        <div class="cal-header-day">Sat</div>
        <div class="cal-header-day">Sun</div>
      </div>
      <div class="cal-container" @scroll="${this._handleScroll}">
        ${this.days.map((day, idx) => this.renderDay(day, idx))}
      </div>
    `;
  }

  // Returns a <cal-day> element (plus a <div.cal-month-gutter> for the first day of the week) for a specific date.
  // day must be an element of this.days[], and dayIdx is its index in the array
  renderDay(day, dayIdx) {
    const today = dayjs().format("YYYY-MM-DD");
    // Generate content for the gutter containing the month name
    // Add a div before each Monday (day() == 1) that goes in left column where the month name is displayed in the margin
    let monthColumnText = "";
    if (day.dayObj.day() % 7 === 1) {
      // If a new month start in this row, add a div to .cal-month-gutter, ie. the left column
      if (day.dayObj.date() <= 7 && this._wholeWeekInSameMonth(day.dayObj)) {
        const newMonth = day.dayObj;
        monthColumnText = html`<div
          id="month-${newMonth.format("YYYY-MM")}"
          class="cal-month-gutter"
        >
          <div class="fw-bold">${newMonth.year()}</div>
          <div>${newMonth.format("MMM").toUpperCase()}</div>
        </div>`;
      } else {
        // If no month is starting in this row, then leave that cell blank
        monthColumnText = html`<div class="cal-month-gutter"></div>`;
      }
    }

    // Read user data for this day
    const dayStr = day.dayStr;
    const calDayClass = day.dayObj.date() == 1 ? "first-day" : nothing;
    const dayData = this.data?.[dayStr] ?? { cals: {} };
    const dayAlerts = this.alerts?.[dayStr];
    const settings = this.settings ?? { cals: {}, options: {} };

    return html`${monthColumnText}
      <cal-day
        id="day-${dayStr}"
        class="${calDayClass}"
        day="${day.display ? day.display : day.dayObj.date()}"
        dim=${dayStr < today || nothing}
        note="${dayData?.note?.text || dayData?.note || nothing}"
        noteStyle="${dayData?.note?.style || nothing}"
        ?readonly=${this.readonly}
        ?selected=${day.selected}
        .index=${dayIdx}
        .dayObj=${day.dayObj}
        .data=${dayData}
        .alerts=${dayAlerts}
        .settings=${settings}
      ></cal-day>`;
  }

  // ----------------------------
  // Public interface
  // ----------------------------
  // Called by main page to initialize calendar. See the end of cal.js CAL_DATA_EX and CAL_SETTINGS_EX for an examples of the data formats.
  loadData(data, settings) {
    // Get the earliest date in the data {"2021-01-01": {}, ...}
    const minDate = Object.keys(data).reduce(
      (acc, v) => (v < acc ? v : acc),
      dayjs().format("YYYY-MM-DD")
    );

    // Get the start and end dates to show on the calendar
    // Our calendar week starts on Monday, but dayjs() week starts on Sunday, so
    // to find first date, subtract one day, find start of week, then readd one day
    const start = this.start || minDate;
    const end = this.end || dayjs().endOf("year").add(2, "year");
    this.startDateObj = dayjs(start)
      .startOf("month")
      .subtract(1, "day")
      .startOf("week")
      .add(1, "day");
    this.endDateObj = dayjs(end).endOf("month").endOf("week").add(1, "day");

    // Calculate all calendar dates and special display strings between start and end
    // this.days contains UI information for each day, including a dayjs object, dayObj, and an optional string, display,
    // that overrides what is shown in the left hand corner.
    this.days = this._fillDays(this.startDateObj, this.endDateObj);

    // Sort data for display and fill in any missing components of the data object
    this.settings = settings;
    this.data = this._sortDataByEvents(data);
    this.data = this._fillDaysInData(this.data, this.settings, this.days);

    // Reset undo/redo
    this._undo.clear();

    this.forceRefresh();
  }

  // Update multiple days as a single action. data: { "2020-01-01": { cals: { ... }}}
  updateData(data) {
    const days = Object.keys(data);
    if (days.length > 0) {
      // Store a copy of current data for undo/redo history
      const prevData = {};
      days.map((day) => {
        prevData[day] = structuredClone(this.data[day]);
      });
      this._undo.add({
        days,
        scrollPos: this.scrollPos,
        redoData: structuredClone(data),
        undoData: prevData,
      });

      // Update underlying data
      this._updateDays(data);

      // Update UI
      this.forceRefresh(days);
      this._dispatch("change", { data });

      return true;
    }
    return false;
  }

  // Force re-render of component and all sub-components. Throttled to avoid slowing UI.
  forceRefresh = throttle((days = null) => {
    const selector = !days ? "cal-day" : days.map((d) => "#day-" + d);
    this.requestUpdate();
    this.shadowRoot
      .querySelectorAll(selector)
      .forEach((el) => el.forceRefresh());
  }, 250);

  // In-memory undo/redo
  hasUndo() {
    return this._undo.hasUndo();
  }
  hasRedo() {
    return this._undo.hasRedo();
  }
  undo() {
    const action = this._undo.undo();
    if (action) {
      this._performUndoRedo("undo", action, action.undoData);
    }
    return action;
  }
  redo() {
    const action = this._undo.redo();
    if (action) {
      this._performUndoRedo("redo", action, action.redoData);
    }
    return action;
  }
  _performUndoRedo(actionName, action, data) {
    let days = action.days;
    // Get currently selected days, then update selection to days that are being changed
    const selectedDays = this.getSelected();
    this._selectDays(days);
    const daysToUpdate = days.concat(selectedDays);

    // Udpate underlying data
    this._updateDays(data);

    // Update UI
    this.forceRefresh(daysToUpdate);

    // Scroll to position where event happened if the last updated day is no longer visible
    if (!this.isDateVsible(days[days.length - 1])) {
      this.scrollPos = action.scrollPos;
    }

    // Notify undo/redo event
    this._dispatch(actionName, { action: action });
    this._dispatch("change", { data });
    this._dispatchSelect();
  }

  // Scroll to show the first date in the specified month. Date in format "YYYY-MM-DD"
  scrollToMonth(date, behavior = "smooth") {
    const dayObj = dayjs(date).date(1);
    const id = "#day-" + dayObj.format("YYYY-MM-DD");
    const firstOfMonthDiv = this.shadowRoot.querySelector(id);
    firstOfMonthDiv?.scrollIntoView({ behavior });
  }

  scrollToDate(date, behavior = "smooth") {
    const dayObj = dayjs(date);
    const containerDiv = this.shadowRoot.querySelector(".cal-container");
    const id = "#day-" + dayObj.format("YYYY-MM-DD");
    const dayDiv = this.shadowRoot.querySelector(id);

    // Bring the month into focus
    this.scrollToMonth(date, behavior);

    // If day is not fully in view, scroll down until it is
    const scrollDiff =
      containerDiv.scrollTop +
      containerDiv.clientHeight -
      (dayDiv.offsetTop - containerDiv.offsetTop) -
      dayDiv.clientHeight;
    if (scrollDiff < 0) {
      containerDiv.scrollTop -= scrollDiff;
    }

    // Select the given date
    const day = this.days.find((el) => el.dayObj.isSame(dayObj, "day"));
    if (day) {
      this._clearSelectedDays();
      day.selected = true;
      this._selecting = false;
      this._firstSelectedIdx = dayDiv.index;
      this._lastSelectedIdx = dayDiv.index;
      this._dispatchSelect();
      this.requestUpdate();
    }
  }

  // Get/set the scroll position of the actual calendar content
  get scrollPos() {
    const containerDiv = this.shadowRoot.querySelector(".cal-container");
    return containerDiv.scrollTop;
  }

  set scrollPos(pos) {
    const containerDiv = this.shadowRoot.querySelector(".cal-container");
    containerDiv.scrollTop = pos;
  }

  // Returns whether a date is at least partially visible on the screen
  isDateVsible(date) {
    const containerDiv = this.shadowRoot.querySelector(".cal-container");
    const id = "#day-" + dayjs(date).format("YYYY-MM-DD");
    const dayDiv = this.shadowRoot.querySelector(id);

    // If day is not in view, scroll down until it is fully visible
    if (dayDiv) {
      const containerTop = containerDiv.offsetTop + containerDiv.scrollTop;
      const containerBottom = containerTop + containerDiv.clientHeight;
      const dayTop = dayDiv.offsetTop;
      const dayBottom = dayTop + dayDiv.clientHeight;
      return dayTop <= containerBottom && dayBottom > containerTop;
    }

    return false;
  }

  getSelected() {
    if (!this.days) {
      return [];
    }
    return this.days.filter((d) => d.selected).map((d) => d.dayStr);
  }

  // ----------------------------
  // Private helpers
  // ----------------------------
  // Given calendar data object in format { "2020-01-01": { cals: { "Location": { events: [{ resource: "Person", schedule: [], subitems: [{ resource: "", ... }] }] }}}}
  // Sort all events either alphabetically or by schedule start time.
  // Sorts data in place and returns reference to original object.
  _sortDataByEvents(data) {
    if (data) {
      for (const day in data) {
        if (data[day].cals) {
          for (const cal in data[day].cals) {
            const { events } = data[day].cals[cal];
            if (events) {
              events.sort((a, b) =>
                a.resource?.toLowerCase() < b.resource?.toLowerCase() ? -1 : 1
              );
              for (const event of events) {
                event.subitems?.sort((a, b) =>
                  a.resource?.toLowerCase() < b.resource?.toLowerCase() ? -1 : 1
                );
              }
            }
          }
        }
      }
    }
    return data;
  }

  // Given start and end dayjs objects, return an array [{day: date # in month, display: undefined | string to display}, ... ] for every date between start and end inclusive
  _fillDays(startDateObj, endDateObj) {
    const days = [];
    for (
      let dayObj = startDateObj;
      dayObj <= endDateObj;
      dayObj = dayObj.add(1, "day")
    ) {
      const dayEl = { dayObj: dayObj, dayStr: dayObj.format("YYYY-MM-DD") };
      if (dayObj === startDateObj || dayObj.date() === 1) {
        dayEl.display = dayObj.format("MMM D");
      }
      days.push(dayEl);
    }
    return days;
  }
  // Make sure that data has an object for every day in days and for every calendar in settings
  _fillDaysInData(data, settings, days) {
    // Add a cal entry for every named calendar in the options
    const calOrder = settings.options?.calOrder ?? [];

    // Add an entry with { cals: { "each calOrder": { id, events } } } for every day in days
    for (const { dayStr: day } of days) {
      data[day] = data[day] || {};

      const dayData = data[day];
      dayData.cals = dayData.cals || {};
      calOrder.forEach((id) => {
        dayData.cals[id] = dayData.cals[id] || { id, events: [] };
      });
    }

    return data;
  }

  _wholeWeekInSameMonth(dayObj) {
    return dayObj.day(1).month() == dayObj.day(6).add(1, "day").month();
  }

  // Given a date as a dayjs object, returns a new dayjs object set to the month that will begin on the week represented by the date,
  // or null if no month starts that week. For example _monthStartingInWeek(dayjs('2022-01-01')) -> Jan 2022
  _monthStartingInWeek(dayObj) {
    // Get the Monday and Sunday of the week containing dayObj
    const startOfWeek = dayObj.day(1);
    const endOfWeek = dayObj.day(6).add(1, "day");
    // If the Monday is the first or has a greater date in the month than Sunday, then we've started a new month
    if (startOfWeek.date() === 1 || startOfWeek.date() > endOfWeek.date()) {
      return endOfWeek.date(1);
    }
    return null;
  }

  // Update underlying data for a given days. Does not dispatch events or update undo/redo.
  _updateDays(data) {
    // Copy of source data into internal data object
    Object.entries(data).forEach(([day, dayData]) => {
      this.data[day] = structuredClone(dayData);
    });
  }

  // Mark all this.days as deselected
  _clearSelectedDays() {
    this.days.forEach((day) => {
      day.selected = false;
    });
  }

  // Select days in array
  _selectDays(days) {
    days = Array.isArray(days) ? days : [days];
    this.days.forEach((day) => {
      day.selected = days.includes(day.dayStr);
    });
  }

  // Mark all the this.days[] between the first and last indexes as selected
  _selectDaysBetween(firstIdx, lastIdx) {
    const startIndex = Math.min(firstIdx, lastIdx);
    const endIndex = Math.max(firstIdx, lastIdx);
    for (let i = startIndex; i <= endIndex; i++) {
      this.days[i].selected = true;
    }
  }

  // ----------------------------
  // Event handlers
  // ----------------------------
  _dispatch(eventName, detail) {
    this.dispatchEvent(
      new CustomEvent(eventName, { bubbles: true, composed: true, detail })
    );
  }
  _dispatchSelect() {
    // Return list of selected days as "2020-01-01". this.days is already sorted.
    this._dispatch("select", { selected: this.getSelected() });
  }
  // Data for a day has changed
  _handleDayChange(e) {
    // Translate cal-day index into the actual date and add undo event
    const { index, data, prevData } = e.detail;
    const day = this.days[index]?.dayStr;

    // Make sure that data isn't exactly the same
    if (day && JSON.stringify(data) != JSON.stringify(prevData)) {
      // Make a copy of current data, which is currently a reference to live data
      this._undo.add({
        days: [day],
        scrollPos: this.scrollPos,
        redoData: { [day]: structuredClone(data) },
        undoData: { [day]: prevData },
      });

      // Let main app know there was a change to write to DB
      this._dispatch("change", { data: { [day]: data } });
    }
  }
  // Mouse event handlers for selecting days with the mouse
  _handleMouseDown(e) {
    const { index, mouseDownEvent } = e.detail;
    if (mouseDownEvent.ctrlKey || mouseDownEvent.metaKey) {
      // Ctrl or Cmd click - toggle selection of the clicked day, unless it was the first selected day
      if (index !== this._firstSelectedIdx) {
        this.days[index].selected = !this.days[index].selected;
      }
    } else if (mouseDownEvent.shiftKey) {
      // Shift click - reselect everything from the first selected day to this day
      this._firstSelectedIdx == this._firstSelectedIdx ?? index;
      this._clearSelectedDays();
      this._selectDaysBetween(this._firstSelectedIdx, index);
    } else {
      // No ctrl or shift modifiers on click. Restart selection process
      this._clearSelectedDays();
      this._selecting = true;
      this._firstSelectedIdx = index;
      this._lastSelectedIdx = index;
      this.days[e.detail.index].selected = true;
    }
    this.requestUpdate();
  }
  _handleMouseOver(e) {
    if (this._selecting && this._firstSelectedIdx !== null) {
      this._clearSelectedDays();
      this._selectDaysBetween(this._firstSelectedIdx, e.detail.index);
      this.requestUpdate();
    }
  }
  _handleMouseUp(e) {
    this._selecting = false;
    this._dispatchSelect();
  }
  _handleScroll(e) {
    // Get how far along the div we've scrolled
    const container = e.target;
    const containerScrollTop = container.scrollTop;

    // How many pixels before the top edge of a row we need to scroll to before we consider
    // that the next row is the first displayed row. For example, when we scroll within
    // 100px of the first week of a month, even though that prior week is still partially visible,
    // we'll say that first week is the current one.
    const scrolledPastThresholdPx = 100;

    // Get all the components that represent the first day of the month in reverse order
    const months = Array.from(
      container.querySelectorAll(".first-day")
    ).reverse();

    // Find the first one that hasn't scrolled off the top of the screen yet. Leave a margin of
    // scrolledPastThresholdPx pixels.
    // offsetTop is relative <body>, so we need to subtract off the container's offsetTop before
    // comparing to container.scrollTop.
    const topMonth = months.find(
      (div) =>
        div.offsetTop - scrolledPastThresholdPx - container.offsetTop <
        containerScrollTop
    );
    // Store the current month being displayed and emit it as an event
    this.currentMonth = topMonth.dayObj;
    this.dispatchEvent(
      new CustomEvent("displaying-month", {
        bubbles: false,
        composed: false,
        detail: { monthObj: this.currentMonth },
      })
    );
  }
}

customElements.define("cal-component", CalComponent);
