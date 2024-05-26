import {
  html,
  nothing,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.8.0/core/lit-core.min.js";
import { unsafeHTML } from "https://cdn.jsdelivr.net/npm/lit-html@2.8.0/directives/unsafe-html.min.js";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";
import { REPORT, hoursReport, htmlReportTable } from "../report.js";
import "./cal-day.js";

class CalActionPanel extends LitElement {
  constructor() {
    super();

    // _dayData holds ad-hoc schedule data, equivalent to one day of calendar data, including "cals" property.
    this._dayData = { cals: {} };
  }

  createRenderRoot() {
    // Use standard light DOM with this component. Styles in cal.css.
    return this;
  }

  willUpdate(changedProperties) {
    // Reference the data and setting objects directly from our parent calendar
    this._calData = this._calEl?.data;
    this._settings = this._calEl?.settings ?? { cals: {} };
    this._alerts = this._calEl?.alerts ?? {};

    // Update our render template based on the current data
    this._renderInfo = this._createRenderInfo(
      this._selected,
      this._settings,
      this._dayData,
      this._alerts,
      this._calEl.readonly
    );
  }

  _createRenderInfo(selected, calSettings, dayData, alerts, readonly) {
    const selectedDaysText =
      this._selectedDaysAsText(selected) || "Select a date";
    const copyDisabled = selected?.length == 1 ? nothing : true;

    const selectedAlerts = {};
    selected
      .filter((day) => !!alerts[day])
      .forEach((day) => (selectedAlerts[day] = alerts[day]));

    const templateOptions = calSettings.templates?.map(
      (t, idx) => html`<option value="${idx}">${t.name}</option>`
    );

    const peopleDatalist = Object.keys(calSettings.options?.people ?? {}).map(
      (p) => html`<option value="${p}"></option>`
    );

    return {
      dayData,
      calSettings,
      selectedDaysText,
      selectedAlerts,
      copyDisabled,
      templateOptions,
      peopleDatalist,
      readonly,
    };
  }

  render() {
    // Make sure we have completed our initial update and have a render template
    if (!this._renderInfo) {
      return;
    }

    const {
      dayData,
      calSettings,
      selectedDaysText,
      selectedAlerts,
      copyDisabled,
      templateOptions,
      peopleDatalist,
      readonly,
    } = this._renderInfo;

    const toolbarEl = html`
      <div class="btn-group toolbar" role="group">
        <button
          type="button"
          class="undoBtn btn btn-sm btn-outline-primary"
          disabled
          @click=${this._handleUndoClick}
        >
          Undo
        </button>
        <button
          type="button"
          class="redoBtn btn btn-sm btn-outline-primary"
          disabled
          @click=${this._handleRedoClick}
        >
          Redo
        </button>
        <button
          type="button"
          class="saveBtn btn btn-sm btn-outline-primary"
          disabled
          @click=${this._handleSaveClick}
        >
          Saved
        </button>
        <button type="button" class="btn btn-sm btn-outline-primary" disabled>
          Print
        </button>
      </div>
    `;

    const detailsSectionEl = html`
      <h2 class="sidebar-heading">Details</h2>
      <div class="selected-days-label">${selectedDaysText}</div>
      <div class="selected-days-alerts">
        ${this._selected.length ? this._alertTable(selectedAlerts) : ""}
      </div>
      <div class="details"></div>
    `;

    const editSectionEl = readonly
      ? nothing
      : html`
          <h2 class="sidebar-heading">Edit</h2>
          <div class="edit">
            <h6 class="edit-section-label">Create schedule to apply:</h6>
            <div class="edit-section-content">
              <cal-day .data=${dayData} .settings="${calSettings}"></cal-day>
              <div class="edit-toolbar">
                <button
                  class="btn btn-sm btn-outline-primary"
                  ?disabled=${copyDisabled}
                  @click=${this._handleCopyClick}
                >
                  Copy Selected
                </button>
                <button
                  class="btn btn-sm btn-outline-primary"
                  @click=${this._handleClearClick}
                >
                  Clear
                </button>
                <div class="apply-btn-group btn-group">
                  <button
                    class="btn btn-sm btn-primary"
                    @click=${this._handleApplyScheduleClick}
                  >
                    Apply
                  </button>
                  <button
                    class="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                  ></button>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click=${this._handleMergeScheduleClick}
                        >Merge With Selected</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <h6 class="edit-section-label mt-3">Apply a template:</h6>
            <div class="edit-section-content">
              <div class="edit-section-row">
                <select name="template" class="dropdown" id="template">
                  ${templateOptions}
                </select>
                <div class="apply-btn-group btn-group">
                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click=${this._handleApplyTemplateClick}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            <h6 class="edit-section-label mt-3">Time off:</h6>
            <div class="edit-section-content">
              <div class="edit-section-row">
                <input
                  id="remove"
                  class="form-control"
                  type="text"
                  size="1"
                  name="remove"
                  list="people-list"
                />
                <datalist id="people-list">${peopleDatalist}</datalist>
                <div class="apply-btn-group btn-group">
                  <button
                    class="btn btn-sm btn-outline-primary"
                    @click=${this._handleTimeOffClick}
                  >
                    Apply
                  </button>
                  <button
                    class="btn btn-sm btn-outline-primary dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown"
                  ></button>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click=${this._handleUnscheduleClick}
                        >Remove from Schedule</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        `;

    const reportSectionEl = html`
      <div class="accordion accordion-flush pb-3">
        <div class="accordion-item">
          <div
            class="accordion-button accordion-sidebar-heading collapsed"
            data-bs-toggle="collapse"
            data-bs-target="#reports-content"
            aria-expanded="false"
            aria-controls="reports-content"
          >
            <div class="flex-grow-1">Reports</div>
          </div>
          <div id="reports-content" class="accordion-collapse collapse">
            <div class="accordion-body reports">
              <div>
                <select name="report" class="dropdown" id="report">
                  <option value="hours">Hours</option>
                  <option value="call">Call</option>
                  <option value="holidays">Holidays</option>
                </select>
                <button
                  class="btn btn-primary dropdown-action"
                  @click=${this._handleRunClick}
                >
                  Run
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    return html`<nav>
      ${toolbarEl} ${detailsSectionEl} ${editSectionEl} ${reportSectionEl}
    </nav>`;
  }

  // Control state of Save button
  enableSave(btnText = "Save") {
    const btn = this.querySelector(".saveBtn");
    btn.disabled = false;
    btn.classList.remove("btn-outline-primary", "btn-danger");
    btn.classList.add("btn-primary");
    btn.innerText = btnText;
  }

  disableSave(btnText = "Saved") {
    const btn = this.querySelector(".saveBtn");
    btn.disabled = true;
    btn.classList.add("btn-outline-primary", "btn-danger");
    btn.classList.remove("btn-primary");
    btn.innerText = btnText;
  }

  errorSave(btnText = "Error") {
    const btn = this.querySelector(".saveBtn");
    btn.disabled = true;
    btn.classList.add("btn-danger");
    btn.classList.remove("btn-outline-primary", "btn-primary");
    btn.innerText = btnText;
  }

  connectedCallback() {
    super.connectedCallback();
    this._calEl = document.querySelector("#" + this.getAttribute("cal-id"));
    if (this._calEl) {
      this._calEl.addEventListener("select", this._handleSelectDay.bind(this));
      this._calEl.addEventListener("undo", this._updateUndoRedo.bind(this));
      this._calEl.addEventListener("redo", this._updateUndoRedo.bind(this));
      this._calEl.addEventListener("change", this._updateUndoRedo.bind(this));
      this._selected = this._calEl.getSelected();
    }
  }

  _handleUndoClick(e) {
    this._calEl?.undo();
  }

  _handleRedoClick(e) {
    this._calEl?.redo();
  }

  _handleSaveClick(e) {
    this.dispatchEvent(
      new CustomEvent("save", { bubbles: true, composed: false })
    );
  }

  _handleSelectDay(e) {
    // New day(s) selected on calendar
    this._selected = e.detail.selected;
    this.requestUpdate();
  }

  _handleCopyClick(e) {
    const selected = this._selected?.length == 1 && this._selected[0];

    if (selected && this._calData) {
      this._dayData = structuredClone(this._calData[selected]) ?? { cals: {} };
      this.requestUpdate();
      e.preventDefault();
    }
  }

  _handleClearClick(e) {
    this._dayData = { cals: {} };
    this.requestUpdate();
    e.preventDefault();
  }

  _handleApplyScheduleClick(e) {
    // Update every selected day in the calendar to the same data
    if (this._selected.length > 0) {
      const data = {};
      this._selected.forEach((day) => {
        data[day] = this._dayData;
      });
      this._calEl.updateData(data);
    }
    e.preventDefault();
  }

  _handleMergeScheduleClick(e) {
    // Merge data with every selected day in the calendar
    if (this._selected.length > 0) {
      const tplData = this._dayData;
      const data = {};
      this._selected.forEach((day) => {
        // Start with existing data
        data[day] = structuredClone(structuredClone(this._calData[day]));
        data[day].cals = data[day].cals ?? {};

        // Copy over each field present in templated data
        if (tplData.note) {
          data[day].note = tplData.note;
        }
        if (Object.keys(tplData.cals ?? {}).length) {
          // Iterate over each calendar in this day
          Object.entries(tplData.cals).forEach(([id, tplDayData]) => {
            if (!data[day].cals[id]) {
              // Copy over data for calendar if it doesn't exist
              data[day].cals[id] = tplDayData;
            } else {
              // Iterate over each event in this calendar on this day
              tplDayData.events.forEach((event) => {
                // If the resource is already scheduled, then overwrite that event
                const existingIdx = data[day].cals[id].events?.findIndex(
                  (e) =>
                    e.resource?.toLowerCase() == event.resource?.toLowerCase()
                );
                if (existingIdx >= 0) {
                  data[day].cals[id].events.splice(existingIdx, 1, event);
                } else {
                  // Resource not already scheduled, add it
                  data[day].cals[id].events.push(event);
                }
              });
            }
          });
        }
      });
      this._calEl.updateData(data);
    }
    e.preventDefault();
  }

  _handleApplyTemplateClick(e) {
    const tplIdx = this.querySelector("#template").value;
    const template = this._settings?.templates?.[tplIdx];

    // Apply template to days selected on parent calendar
    if (template?.data) {
      // Construct data object corresponding to selected days
      const data = {};
      for (const day of this._selected) {
        if (template?.format == "week") {
          // For a weekly template, use the proper weekday's template
          const weekday = dayjs(day).day();
          data[day] = template.data[weekday];
        } else {
          // For single day, update all selected days to match the template
          data[day] = template.data;
        }
      }

      // Update calendar
      this._calEl.updateData(data);
    }
    e.preventDefault();
  }

  _handleTimeOffClick(e) {
    let updates = false;
    const data = {};

    // For each selected day in each calendar, remove the selected person
    const person = this.querySelector("#remove").value.toLowerCase();
    if (person) {
      for (const day of this._selected) {
        data[day] = structuredClone(this._calData[day]);
        const cals = data[day]?.cals;
        if (cals) {
          for (const cal in cals) {
            cals[cal].events.forEach((e) => {
              if (e.resource.toLowerCase() == person) {
                e.schedule = ["OFF"];
                updates = true;
              }
            });
          }
        }
      }
      // Let parent calendar know to refresh
      if (updates) {
        this._calEl.updateData(data);
      }
    }
  }

  _handleUnscheduleClick(e) {
    let updates = false;
    const data = {};

    // For each selected day in each calendar, remove the selected person
    const person = this.querySelector("#remove").value.toLowerCase();
    if (person) {
      for (const day of this._selected) {
        data[day] = structuredClone(this._calData[day]);
        const cals = data[day]?.cals;
        if (cals) {
          for (const cal in cals) {
            const events = cals[cal].events;
            cals[cal].events = events.filter(
              (e) => e.resource.toLowerCase() != person
            );
            updates = updates || events.length != cals[cal].events.length;
          }
        }
      }

      // Let parent calendar know to refresh
      if (updates) {
        this._calEl.updateData(data);
      }
    }
  }

  _handleRunClick(e) {
    const report = this.querySelector("#report").value;
    let selected = this._selected;
    let ytdReport = null;
    let annualReport = null;
    const maxSelectedDay = selected?.length
      ? dayjs(selected.reduce((max, day) => (day > max ? day : max)))
      : null;

    if (maxSelectedDay) {
      if (report == "hours") {
        // Year of the first selected day
        const year = dayjs(selected[0]).year();

        // Generate YTD and full year summaries if all selected dates are in the same year
        const allSameYear = selected
          .map((d) => dayjs(d).year())
          .every((y) => y == year);
        if (allSameYear) {
          // Gather all dates into arrays for YTD and all year
          const firstDayOfYear = dayjs(new Date(year, 0));
          const nextYear = dayjs(new Date(year + 1, 0));
          const ytd = [];
          const annual = [];
          for (
            let d = firstDayOfYear;
            d.isBefore(nextYear, "day");
            d = d.add(1, "day")
          ) {
            const dayStr = d.format("YYYY-MM-DD");
            annual.push(dayStr);
            if (
              d.isBefore(maxSelectedDay, "day") ||
              d.isSame(maxSelectedDay, "day")
            ) {
              ytd.push(dayStr);
            }
          }
          ytdReport = hoursReport(ytd, this._calData, this._settings);
          annualReport = hoursReport(annual, this._calData, this._settings);
        }

        // When only one date is selected, show report for the whole week
        if (selected.length == 1) {
          const start = dayjs(selected).startOf("week");
          selected = [1, 2, 3, 4, 5, 6, 7].map((d) =>
            start.add(d, "day").format("YYYY-MM-DD")
          );
        }

        const selectedReport = hoursReport(
          selected,
          this._calData,
          this._settings
        );
        const selectedHtml = htmlReportTable(
          selectedReport,
          maxSelectedDay,
          ytdReport,
          annualReport
        );
        REPORT.show("Hours", selectedHtml);
        e.preventDefault();
      }
    }
  }

  _updateUndoRedo(e) {
    const undoBtn = this.querySelector(".undoBtn");
    const redoBtn = this.querySelector(".redoBtn");
    undoBtn.disabled = !this._calEl?.hasUndo();
    redoBtn.disabled = !this._calEl?.hasRedo();
  }

  // Convert a sorted array ["2020-01-01", "2020-01-02", ...] to a human readable string
  _selectedDaysAsText(selected) {
    let lastDayObj,
      inDayRange,
      ret = [];
    if (selected && selected.length <= 4) {
      for (const day of selected) {
        const dayObj = dayjs(day);
        if (lastDayObj == null) {
          // Add the first date in array
          ret.push(dayObj.format("M/D/YY"));
        } else if (dayObj.subtract(1, "day").isSame(lastDayObj)) {
          // Detected at least subsequent days, start a day range
          inDayRange = true;
        } else if (
          inDayRange &&
          lastDayObj &&
          !dayObj.subtract(1, "day").isSame(lastDayObj)
        ) {
          // Previous day range was broken, start a new element in comma separated list
          ret.push(
            "-",
            lastDayObj.format("M/D/YY"),
            ", ",
            dayObj.format("M/D/YY")
          );
          inDayRange = false;
        } else if (!inDayRange && lastDayObj) {
          // Not in a day range, and current date does not follow previous date in list. Add to end of list.
          ret.push(", ", dayObj.format("M/D/YY"));
        }
        lastDayObj = dayObj;
      }

      // Close off any open date range
      if (inDayRange) {
        ret.push("-", lastDayObj.format("M/D/YY"));
      }
    } else {
      // When more days are selected, return count of days
      ret.push(selected.length, " ", "days selected");
    }

    return ret.join("");
  }

  // Convert object {"2020-01-01": [{type: "info", text: "alert"}]} to a table
  _alertTable(alerts) {
    const days = Object.keys(alerts);
    if (days.length == 0 || !Object.values(alerts).some((a) => a.length)) {
      return html`<div class="text-center">No conflicts</div>`;
    }

    // Make a table with the date in the left column, and one row for each alert
    const showDayColumn = days.length > 1;
    const rows = days
      .filter((day) => alerts[day]?.length > 0)
      .map((day) => {
        const dayColumn = showDayColumn
          ? `<td class="alert-date">${dayjs(day).format("M/D/YY")}</td>`
          : `<td></td>`;
        const firstRow = `<tr>
          ${dayColumn}
          <td>${alerts[day][0]?.text ?? ""}</td>
        </tr>`;
        const otherRows = alerts[day]
          .slice(1)
          .map((alert) => `<tr><td></td><td>${alert.text ?? ""}</td></tr>`);
        return [firstRow, otherRows];
      })
      .flat()
      .join("");
    return html`<table>
      <tbody>
        ${unsafeHTML(rows)}
      </tbody>
    </table>`;
  }
}

customElements.define("cal-action-panel", CalActionPanel);
