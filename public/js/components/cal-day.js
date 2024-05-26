import {
  html,
  css,
  nothing,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.8.0/core/lit-core.min.js";
import { live } from "https://cdn.jsdelivr.net/npm/lit-html@2.8.0/directives/live.min.js";
import "./cal-event-group.js";

class CalDay extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      outline: 1px solid var(--border-color);
      padding-top: 0px;
      min-height: 4em; /* Minimum height for a day in the calendar. See comment in cal-component .cal-container */
      user-select: none; /* Do not allow text selection, which interferes with day range selection */
    }
    :host([selected]) {
      background-color: var(--selected-color);
    }
    .day {
      flex-grow: 1;
      display: flex;
      flex-direction: column;

      &.alert-info {
        box-shadow: var(--info-box-shadow);
      }
      &.alert-warn {
        box-shadow: var(--warn-box-shadow);
      }
      &.alert-danger {
        box-shadow: var(--err-box-shadow);
      }
    }
    .cal-day-and-note {
      display: flex;
      font-size: 1em;
      white-space: nowrap;
    }
    .cal-day-and-note > span:nth-of-type(1) {
      /* 1st <span> is the day number */
      font-weight: bold;
      color: rgb(60, 64, 67);
      padding-right: 4px;
    }
    .cal-note {
      font-size: 0.8em;
      color: var(--info-text);
      overflow: hidden;
      text-overflow: ellipsis;
      align-self: center;
      flex-grow: 1;
      padding-left: 3px;

      &:focus {
        outline: none;
        border: 1px solid var(--bs-primary);
        background: white;
      }
    }
    .dim {
      opacity: 0.8;

      .cal-day-and-note > span {
        opacity: 0.5;
      }
    }
    @media print {
      :host {
        break-inside: avoid; /* Avoid page breaks when printing */
      }
    }
  `;
  static properties = {
    day: { type: String },
    note: { type: String },
    noteStyle: { type: String },
    readonly: { type: Boolean },
    selected: { type: Boolean },
    dim: { type: Boolean },
    data: { type: Object, attribute: false },
    alerts: { type: Object, attribute: false },
    settings: { type: Object, attribute: false },
  };

  constructor() {
    super();
    // Default to no calendar data or settings
    this.data = this.data ?? { cals: {} };
    this.settings = this.settings ?? { cals: {} };
  }

  willUpdate(changedProperties) {
    if (!this.data || !this.settings) {
      return;
    }

    // Make sure that all calendars have an entry in data.cals
    const calOrder = this.settings.options?.calOrder ?? [];
    calOrder.forEach((id) => {
      this.data.cals[id] = this.data.cals[id] || { id, events: [] };
    });

    // Update our render template based on the current data, which contains one element for each event group
    this._renderInfo = this._createRenderInfo(
      this.data,
      this.alerts,
      this.settings
    );
  }

  // Converts this.data to a template [{type, color, background, events, calSettings}, ...] for the event groups that will be used by render()
  _createRenderInfo(data, alerts, settings) {
    const { cals } = data;
    const { cals: calSettings, options } = settings;

    // Get list of visible calendars in display order
    const visibleCals =
      options?.calOrder?.map((id) => calSettings[id]?.visible && cals[id]) ??
      [];

    // Render all the non-call calendars first
    const topCals = visibleCals.filter(
      (cal) => cal && calSettings[cal.id]?.type !== "call"
    );
    // Separate call/non-call with vertical space divider
    const divider = { type: "divider" };
    // Render call calendars on bottom
    const bottomCals = visibleCals.filter(
      (cal) => cal && calSettings[cal.id]?.type === "call"
    );

    // Return a list of info for render() to convert to HTML elements
    const renderCals = [...topCals, divider, ...bottomCals].map(
      ({ type, id: calId, events }) => ({
        type: type ?? "event",
        color: calSettings[calId]?.color,
        background: calSettings[calId]?.background,
        events: events ?? [],
      })
    );

    const alertClasses = ["info", "warn", "danger"];
    let alertClass = "";
    let alertTexts = null;
    if (alerts?.length > 0) {
      const alertClassIndexes = alerts.map((a) => alertClasses.indexOf(a.type));
      const highestAlert = Math.max(...alertClassIndexes);
      alertClass = alertClasses[highestAlert]
        ? `alert-${alertClasses[highestAlert]}`
        : "";
      alertTexts = alerts.map((a) => a.text);
    }

    return { cals: renderCals, alertTexts, alertClass };
  }

  render() {
    // Make sure we have completed our initial update and have a render template
    const { cals, alertText, alertClass } = this._renderInfo;
    if (!cals) {
      return;
    }

    // Date number in left hand corner + any text to the right of it
    const dayAndNote = html`
      <div class="cal-day-and-note">
        <span>${this.day}</span>
        <div
          class="cal-note"
          style="${this["noteStyle"]}"
          ?contenteditable=${!this.readonly}
          @keydown=${this.handleNoteKeydown}
          @blur=${this.handleNoteBlur}
          .innerText="${this.note ?? ""}"
        ></div>
      </div>
    `;

    // _renderInfo contains an ordered list of event group descriptions to convert to <cal-event-group>'s
    const eventGroups = cals.map(({ type, color, background, events }) => {
      if (type == "divider") {
        return html`<div style="flex-grow:1"></div>`;
      } else {
        return html`<cal-event-group
          borderColor="${color}"
          background="${background}"
          ?readonly=${this.readonly}
          .events=${events}
          .settings=${this.settings}
        ></cal-event-group>`;
      }
    });

    const dimClass = this.dim ? "dim" : "";
    return html`<div class="day ${alertClass} ${dimClass}">
      ${dayAndNote} ${eventGroups}
    </div>`;
  }

  // Force re-render of component and all sub-components
  forceRefresh() {
    this.requestUpdate();
    this.shadowRoot
      .querySelectorAll("cal-event-group")
      .forEach((el) => el.forceRefresh());
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mousedown", this.handleMouseDown);
    this.addEventListener("mouseover", this.handleMouseOver);
    this.addEventListener("mouseup", this.handleMouseUp);
    this.addEventListener("change", this.handleEventGroupChange);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mousedown", this.handleMouseDown);
    this.removeEventListener("mouseover", this.handleMouseOver);
    this.removeEventListener("mouseup", this.handleMouseUp);
    this.removeEventListener("change", this.handleEventGroupChange);
  }

  _dispatch(eventName, detail) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: false,
        composed: true,
        detail: { index: this.index, ...detail },
      })
    );
  }

  handleMouseDown(e) {
    // Delay propagating mousedown to parent until any blur event can complete
    setTimeout(
      () => this._dispatch("cal-day-mousedown", { mouseDownEvent: e }),
      0
    );
  }
  handleMouseOver(e) {
    this._dispatch("cal-day-mouseover");
  }
  handleMouseUp(e) {
    // Delay propagating mousedown to parent until mousedown can complete
    setTimeout(() => this._dispatch("cal-day-mouseup"), 0);
  }
  handleEventGroupChange(e) {
    // Make copy of event data, which has already changed, and reconstruct object contents with previous data
    const prevData = structuredClone(this.data);
    const { events, prevEvents } = e.detail;
    if (events && prevEvents) {
      Object.entries(this.data.cals || {}).forEach(([id, v]) => {
        if (v?.events == events) {
          prevData.cals[id].events = prevEvents;
        }
      });
    }

    // Bubble notification to parent with data from full day, instead of only event group
    e.stopPropagation();
    this._dispatch("cal-day-change", { data: this.data, prevData });
  }
  handleNoteKeydown(e) {
    // On Esc, or ctrl/cmd+enter, commit text
    if (
      (e.keyCode == 27 &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey) ||
      (e.keyCode == 13 &&
        (e.ctrlKey || !e.ctrlKey) &&
        !e.metaKey &&
        !e.shiftKey &&
        !e.altKey)
    ) {
      // Defocus input, whose event handler will trigger handleNoteBlur()
      e.preventDefault();
      e.stopPropagation();
      e.target.blur();
    }
  }
  handleNoteBlur(e) {
    const newNote = this.shadowRoot.querySelector(".cal-note").innerText;
    if ((this.data.note && !newNote) || this.data.note != newNote) {
      // Store note text into data and notify parent
      const prevData = structuredClone(this.data);

      // Remove note property from object if note is empty
      if (newNote) {
        this.data.note = newNote;
      } else {
        delete this.data.note;
      }

      this._dispatch("cal-day-change", { data: this.data, prevData });
    }
    e.preventDefault();
    e.stopPropagation();
  }
}

customElements.define("cal-day", CalDay);
