import {
  html,
  css,
  nothing,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.8.0/core/lit-core.min.js";
import { renderIcon } from "../util.js";
import "./cal-event-edit.js";

class CalEventGroup extends LitElement {
  static styles = css`
    .cal-event-group {
      display: flex;
      flex-direction: column;

      padding-left: 5px;
      padding-right: 5px;
      padding-top: 1px;
      padding-bottom: 1px;
      margin-top: 1px;
      margin-bottom: 1px;
      font-size: 0.9em;

      /* Keep each event on one line */
      text-wrap: nowrap;
      overflow: hidden;
      white-space: nowrap;
    }
    .icon {
      color: var(--gray-text);
      min-width: 1.1em;
      height: 1.1em;
      vertical-align: -0.125em;
    }
    .cal-event-group-border {
      align-self: center;
      border-top: 2px solid;
      border-color: inherit;
      width: 100%;
    }
    .cal-event-line:hover,
    .cal-event-add:hover {
      background: var(--clickable-hover-color);
    }
    .cal-event-line:focus {
      outline: 1px solid var(--bs-primary);
      overflow-x: hidden;
    }
    .cal-event-add {
      font-weight: bold;
      cursor: text;
    }
    .cal-event-add.expanded {
      /* When there are no existing events, the the add button should be "expanded" instead of collapsed into the last row */
      height: 1.5em;
    }
    .cal-event-plussign {
      display: none;
      width: 1.4em;
      text-align: center;
      color: var(--dark-gray-text);
      cursor: default;
      float: right;
      border-radius: 6px;
      margin-top: -1.5em;

      /* Highlight plus sign when directly hovered over */
      &:hover {
        background: var(--selected-color);
      }
    }
    .expanded .cal-event-plussign {
      /* When add line is "expanded", don't use negative margin-top to collapse plus sign into previous row */
      margin-top: 0px;
    }
    .cal-event-group:hover .cal-event-plussign {
      /* Show plus sign only when mouse is in this event group */
      display: block;
    }
    .blank-line {
      min-height: 1.5em;
    }

    span.schedule {
      color: var(--gray-text);
      font-size: 0.72em;
    }
  `;

  static properties = {
    borderColor: { type: String }, // Color of the dividing line above the event group
    background: { type: String }, // Background color for the whole group
    events: { type: Object, attribute: false }, // List of events to display and user settings for this calendar:  [{resource: "", schedule: []}, ...]
    settings: { type: Object, attribute: false }, // settings object for the entire calendar including user options: { cals: {}, options: {}, templates: {} }
    readonly: { type: Boolean },
  };

  // Possible states for editing inside this event group
  static STATE_NOT_EDITING = 0;
  static STATE_ADD_EVENT = 1;
  static STATE_ADD_SUBITEM = 2;
  static STATE_EDIT_EVENT = 3;

  constructor() {
    super();

    // Used to store which event is being edited. Set eventIndex = -1 to add an event.
    this._editState = {
      state: CalEventGroup.STATE_NOT_EDITING,

      // Either the index of the event being edited or to insert a new item after
      eventInfoIndex: null,

      // Should initially focused input be the "resource" or "schedule"
      initialFocus: null,
    };
  }

  willUpdate(changedProperties) {
    // Default to no events or settings
    this.events = this.events ?? [];
    this.settings = this.settings ?? {};

    // Update our render template based on the current data, which contains one element for each event group
    this._renderInfo = this._createRenderInfo(
      this.events,
      this.settings.options,
      this._editState,
      this.readonly
    );
  }

  // Converts this.events to a template [{}, ...] for the list of events that will be created by render()
  _createRenderInfo(events, options, editState, readonly) {
    // Flat array with each element corresponding to one event to display in the UI
    const eventInfos = [];
    // Returns if a person's settings in the calSetting object
    const lcasePeople = Object.fromEntries(
      Object.entries(options?.people ?? {}).map(([k, v]) => [
        k.toLowerCase(),
        v,
      ])
    );
    const resourceVisible = (name) => lcasePeople[name]?.visible ?? true;
    const resourceColor = (name) => lcasePeople[name]?.color;
    // Add a single event line to the eventInfos array
    const addEventInfo = (subitem, event, eventIndex, eventSubitemIndex) => {
      // Convert schedule list ["8-12", "1-5"] to a single string
      const schedule =
        typeof event.schedule === "object"
          ? event.schedule.join(", ")
          : event.schedule;
      // Add a single event to the end of the list
      eventInfos.push({
        type: "event",
        subitem,
        color: resourceColor(event.resource?.toLowerCase()),
        resource: event.resource,
        schedule,
        eventInfoIndex: eventInfos.length,
        eventIndex,
        eventSubitemIndex,
      });
    };
    // Iterate over all events and their subitems depth-first and add to eventsInfo
    events.forEach((event, eventIndex) => {
      // Show event if resource is not hidden or if one of its subitems is visible
      const subitemVisible = event.subitems?.find((e) =>
        resourceVisible(e.resource?.toLowerCase())
      );
      if (resourceVisible(event.resource?.toLowerCase()) || subitemVisible) {
        addEventInfo(false, event, eventIndex, null);
        event.subitems?.forEach((subitem, eventSubitemIndex) => {
          addEventInfo(true, subitem, eventIndex, eventSubitemIndex);
        });
      }
    });

    // Add in an edit event component in the right location depending on the editing state
    if (editState.state == CalEventGroup.STATE_ADD_EVENT) {
      // Add edit component to end
      eventInfos.push({
        type: "edit",
        subitem: false,
        resource: "",
        schedule: "",
        eventInfoIndex: eventInfos.length,
        eventIndex: this.events.length,
        eventSubitemIndex: null,
        editState: editState,
      });
    } else if (editState.state == CalEventGroup.STATE_ADD_SUBITEM) {
      // Add edit component to the middle at the specified eventInfoIndex
      const precedingEventInfo = eventInfos[editState.eventInfoIndex];
      const eventInfo = {
        type: "edit",
        subitem: true,
        resource: "",
        schedule: "",
        eventInfoIndex: editState.eventInfoIndex + 1,
        eventIndex: precedingEventInfo.eventIndex,
        eventSubitemIndex: precedingEventInfo.eventSubitemIndex,
        editState: editState,
      };
      eventInfos.splice(editState.eventInfoIndex + 1, 0, eventInfo);
    } else if (editState.state == CalEventGroup.STATE_EDIT_EVENT) {
      // Change an existing event to an edit component
      const eventInfo = eventInfos[editState.eventInfoIndex];
      eventInfo.type = "edit";
      eventInfo.editState = editState;
    }

    // Unless we are already adding a new item, show the add icon at the end of the list
    const addButtonVisible =
      !readonly && editState.state !== CalEventGroup.STATE_ADD_EVENT;
    // If there are no events in this group, then do not collapse the plus sign line
    const addButtonClass = eventInfos.length == 0 ? "expanded" : "";
    const addButton = {
      visible: addButtonVisible,
      class: addButtonClass,
    };

    // Generate list of visible people to show as options when editing an event
    const peopleList = Object.entries(options?.people ?? {})
      .filter(([_, person]) => person.visible ?? true)
      .map(([_, person]) => person.name)
      .sort();

    return { eventInfos, addButton, peopleList };
  }

  render() {
    // Values from cal-event-group attributes
    const backgroundCss = this.background && `background: ${this.background};`;
    const borderCss = this.borderColor && `border-color: ${this.borderColor};`;

    // Generate UI from precomputed template in _renderInfo
    const { eventInfos, addButton, peopleList } = this._renderInfo;

    // Child elements
    const borderEl = borderCss
      ? // Dividing line between calendars
        html`<div class="cal-event-group-border" style="${borderCss}"></div>`
      : nothing;
    const eventEls = eventInfos.map(
      // Iterate over list of events to generate the main content
      ({
        type,
        subitem,
        color,
        resource,
        schedule,
        eventInfoIndex,
        editState,
      }) => {
        if (type === "event") {
          // A single line with the resource and scheduled shifts
          const subitemEl = subitem ? renderIcon("caret-right") : nothing;
          return html`<div
            class="cal-event-line"
            tabindex="0"
            .index=${eventInfoIndex}
            @click=${this._handleEventClick.bind(this, eventInfoIndex)}
          >
            ${subitemEl}
            <span class="resource" style="color: ${color ?? nothing}"
              >${resource}</span
            >
            <span class="schedule">${schedule}</span>
          </div> `;
        } else if (type === "edit") {
          // An edit control
          return html`<cal-event-edit
            .context=${editState}
            .people=${peopleList}
            ?subitem="${subitem}"
            resource="${resource}"
            schedule="${schedule}"
            initialFocus="${editState.initialFocus || nothing}"
          ></cal-event-edit>`;
        }
      }
    );
    const addEl = addButton.visible
      ? // A clickable plus sign to add events to this group
        html`<div
          class="cal-event-add ${addButton.class}"
          @click=${this._handleAddEventClick}
        >
          <span class="cal-event-plussign">+</span>
        </div>`
      : nothing;

    const blankEl =
      this.readonly && eventInfos.length == 0
        ? html`<div class="blank-line"></div>`
        : nothing;

    return html`<div
      class="cal-event-group"
      style="${backgroundCss || nothing}"
    >
      ${borderEl} ${eventEls} ${addEl} ${blankEl}
    </div>`;
  }

  // Force re-render of component and all sub-components
  forceRefresh() {
    this.requestUpdate();
  }

  // Commit a change to an event depending on what edit action is being done
  _commitEventEdit(editState, eventDetails) {
    if (editState.state === CalEventGroup.STATE_ADD_EVENT) {
      this._addEvent(editState, eventDetails);
    } else if (editState.state === CalEventGroup.STATE_ADD_SUBITEM) {
      this._addSubitem(editState, eventDetails);
    } else if (editState.state === CalEventGroup.STATE_EDIT_EVENT) {
      this._updateEvent(editState, eventDetails);
    }
  }

  // Add a new event to the end of the list
  _addEvent(editState, { resource, schedule }) {
    // Store copy of internal events state prior to update
    const prevEvents = structuredClone(this.events);

    const scheduleArr = schedule.split(",").map((s) => s.trim());
    const event = { resource, schedule: scheduleArr, subitems: [] };
    this.events.push(event);

    this._dispatch("change", { prevEvents });
  }

  _addSubitem(editState, { resource, schedule }) {
    // Store copy of internal events state prior to update
    const prevEvents = structuredClone(this.events);

    // Get the eventInfo object corresponding to the preceding event to the subitem being edited
    // _createRenderInfo() creates _renderInfo.eventInfos to contain one element for each event that
    // is displayed, and they point to the source element in this.events.
    const eventInfo = this._renderInfo.eventInfos[editState.eventInfoIndex];

    // Get the index within the parent event's subitem array to add the new event using the editState
    const parentEvent = this.events[eventInfo.eventIndex];
    const eventSubitemIndex = eventInfo.eventSubitemIndex ?? -1;

    // Splice in a new event at the correct subitems index
    const scheduleArr = schedule.split(",").map((s) => s.trim());
    const event = { resource, schedule: scheduleArr, subitems: [] };
    parentEvent.subitems = parentEvent.subitems ?? [];
    parentEvent.subitems.splice(eventSubitemIndex + 1, 0, event);

    this._dispatch("change", { prevEvents });
  }

  // Update an existing event's info
  _updateEvent(editState, { resource, schedule }) {
    // Store copy of internal events state prior to update
    const prevEvents = structuredClone(this.events);

    // Get reference to existing item
    const eventIndex = editState.eventInfoIndex;
    const eventInfo = this._renderInfo.eventInfos[eventIndex];
    const event =
      eventInfo.eventSubitemIndex == null
        ? this.events[eventInfo.eventIndex]
        : this.events[eventInfo.eventIndex].subitems[
            eventInfo.eventSubitemIndex
          ];

    // Update event if it has changed
    const scheduleArr = schedule.split(",").map((s) => s.trim());
    if (
      event.resource != resource ||
      JSON.stringify(event.schedule) != JSON.stringify(scheduleArr)
    ) {
      event.resource = resource;
      event.schedule = scheduleArr;
      this._dispatch("change", { prevEvents });
    }
  }

  // Delete an existing event or subitem
  _deleteEvent(editState) {
    // Store copy of internal events state prior to update
    const prevEvents = structuredClone(this.events);

    // Dereference the event's eventInfoIndex into the actual event and subitem index
    const eventInfo = this._renderInfo.eventInfos[editState.eventInfoIndex];
    if (eventInfo?.eventSubitemIndex == null) {
      // Delete an event
      this.events.splice(eventInfo.eventIndex, 1);
    } else {
      // Delete an event's subitem
      this.events[eventInfo.eventIndex]?.subitems.splice(
        eventInfo.eventSubitemIndex,
        1
      );
    }

    this._dispatch("change", { prevEvents });
  }

  connectedCallback() {
    super.connectedCallback();

    // Handle enter as clicking div
    this.addEventListener("keydown", this._handleKeyDown);

    // Receive events from the edit component
    this.addEventListener("cal-event-edit-change", this._handleEventChange);
    this.addEventListener("cal-event-edit-delete", this._handleDeleteEvent);
    this.addEventListener(
      "cal-event-edit-add-subitem",
      this._handleAddEventSubitem
    );
    this.addEventListener("cal-event-edit-cancel", this._handleEventCancel);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("keydown", this._handleKeyDown);
    this.removeEventListener("cal-event-edit-change", this._handleEventChange);
    this.removeEventListener("cal-event-edit-delete", this._handleDeleteEvent);
    this.removeEventListener(
      "cal-event-edit-add-subitem",
      this._handleAddEventSubitem
    );
    this.removeEventListener("cal-event-edit-cancel", this._handleEventCancel);
  }

  // Notify with reference to event group data
  _dispatch(eventName, detail) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: false,
        composed: true,
        detail: { events: this.events, ...detail },
      })
    );
  }

  _handleKeyDown(e) {
    const origTarget = e.composedPath?.()?.[0];
    if (e.keyCode == 13) {
      // On enter, if is was the original event target, simulate clicking event line
      if (origTarget?.classList?.contains("cal-event-line")) {
        e.preventDefault();
        e.stopPropagation();
        origTarget.click();
      }
    } else if (e.keyCode == 8 || e.keyCode == 46) {
      // On backspace or delete, delete the current event
      if (origTarget?.classList?.contains("cal-event-line")) {
        e.preventDefault();
        e.stopPropagation();
        if (
          origTarget.index >= 0 &&
          origTarget.index < this._renderInfo.eventInfos.length
        ) {
          this._deleteEvent({ eventInfoIndex: origTarget.index });
        }
      }
    }
  }

  // An event in the group was clicked. Start editing it.
  _handleEventClick(eventInfoIndex, e) {
    if (!this.readonly) {
      this._editState = {
        state: CalEventGroup.STATE_EDIT_EVENT,
        eventInfoIndex: eventInfoIndex,
        initialFocus: e.target?.classList.contains("schedule") && "schedule",
      };
      this.requestUpdate();
    }
  }

  // The plus sign was clicked to add a new event to the group
  _handleAddEventClick(e) {
    if (!this.readonly) {
      this._editState = {
        state: CalEventGroup.STATE_ADD_EVENT,
        eventInfoIndex: this._renderInfo.eventInfos.length,
      };
      this.requestUpdate();
    }
  }

  // Enter was pressed in edit component or it lost focus
  _handleEventChange(e) {
    // Update/add the event details based on the edit action being done
    const editState = e.detail.context;
    this._commitEventEdit(editState, e.detail);
    this._editState = { state: CalEventGroup.STATE_NOT_EDITING };

    // Move to prev/next item if requested
    this._handleNext(e);

    this.requestUpdate();
  }

  // Add subitem button clicked in edit component
  _handleAddEventSubitem(e) {
    // Get the context from cal-event-edit, which is our editState
    const editState = e.detail.context;

    // Handle any pending edit / add actions before adding the subitem
    let eventInfoIndex = editState.eventInfoIndex;
    if (editState.state === CalEventGroup.STATE_ADD_EVENT) {
      // Add the new item first
      this._addEvent(editState, e.detail);
    } else if (editState.state === CalEventGroup.STATE_ADD_SUBITEM) {
      this._addSubitem(editState, e.detail);
      eventInfoIndex++;
    } else if (editState.state === CalEventGroup.STATE_EDIT_EVENT) {
      this._updateEvent(editState, e.detail);
    }

    // Enter add subitem state with the edited event as the parent
    this._editState = {
      state: CalEventGroup.STATE_ADD_SUBITEM,
      eventInfoIndex,
    };
    this.requestUpdate();
  }

  // Delete button clicked in edit component
  _handleDeleteEvent(e) {
    // Get the context from cal-event-edit, which is our editState
    const editState = e.detail.context;

    // Delete the event
    if (editState.state === CalEventGroup.STATE_EDIT_EVENT) {
      this._deleteEvent(editState);
    } else if (editState.state == CalEventGroup.STATE_ADD_EVENT) {
      // If adding an event, just remove the edit item
      this._renderInfo?.eventInfos?.splice(this._renderInfo.length - 1, 1);
    }
    this._editState = { state: CalEventGroup.STATE_NOT_EDITING };

    // Move to prev/next item if requested
    this._handleNext(e);

    this.requestUpdate();
  }

  // Escape was pressed in edit component
  _handleEventCancel(e) {
    this._editState = { state: CalEventGroup.STATE_NOT_EDITING };
    this.requestUpdate();

    // Refocus event whose edit was canceled
    const eventInfoIndex = e.detail?.context?.eventInfoIndex;
    if (eventInfoIndex >= 0) {
      // Do this on the next tick, so that render() has a time to replace the event-edit with the
      // normal static cal-event-line
      setTimeout(() => {
        const eventLineEls =
          this.shadowRoot.querySelectorAll(".cal-event-line");
        const idx = Math.min(eventLineEls.length - 1, eventInfoIndex);
        const el = eventLineEls[idx];
        el && el.focus();
      });
    }
  }

  // Move to prev/next item after an edit if requested
  _handleNext(e) {
    const editState = e?.detail?.context;
    const next = e?.detail?.next;
    if (editState && next) {
      if (next == "next") {
        if (
          editState.eventInfoIndex + 1 <
          this._renderInfo?.eventInfos?.length
        ) {
          // Start editing next event
          this._handleEventClick(editState.eventInfoIndex + 1, e);
        } else {
          // If on the last item, add a new event
          this._handleAddEventClick(e);
        }
      } else if (next == "prev") {
        if (editState.eventInfoIndex > 0) {
          if (editState.state === CalEventGroup.STATE_ADD_SUBITEM) {
            // Adding a new subitem, start editing previous subitem or parent
            this._handleEventClick(editState.eventInfoIndex, e);
          } else {
            // Start editing previous event
            this._handleEventClick(editState.eventInfoIndex - 1, e);
          }
        } else if (editState.eventInfoIndex == 0) {
          // Restart editing 1st event
          this._handleEventClick(0, e);
        }
      }
    }
  }
}

customElements.define("cal-event-group", CalEventGroup);
