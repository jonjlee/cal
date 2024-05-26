import {
  html,
  css,
  nothing,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.8.0/core/lit-core.min.js";
import "./cal-event-group.js";
import { renderIcon } from "../util.js";

class CalEventEdit extends LitElement {
  static styles = css`
    :host {
      flex-grow: 1;
      display: flex;
      z-index: 1;
    }
    .icon {
      min-width: 1.1em;
      height: 1.1em;
      vertical-align: -0.125em;
    }
    .indicator {
      color: #9ba2a9;
      background: inherit;
      margin-right: 2px;
    }
    .inputs {
      flex-grow: 1;

      background: white;
      display: flex;

      .divider {
        border-left: 1px solid var(--border-color);
      }
    }
    .inputs:focus-within {
      border: 1px solid var(--bs-primary);
    }
    input {
      font-size: 0.9em;
    }
    input,
    input:focus {
      border: none;
      outline: none;
    }
    input#resource {
      flex-grow: 1;
      margin-right: -1px;
    }
    input#schedule {
      width: 50%;
    }
    button {
      width: min-content;
      border: 1px solid var(--bs-primary);
      background: white;
      padding: 2px 2px;
      margin-left: -1px;
    }
    button:hover {
      color: var(--bs-primary);
    }
    button:focus {
      box-shadow: none;
      outline: none;
      background: var(--bs-primary);
      color: white;
    }
  `;

  static properties = {
    // Index of event used to communicate with parent element. Sent with all events dispatched from this element.
    eventindex: { type: Number, attribute: false, noAccessor: true },

    // Are we adding a new event, or editing an existing one
    isNew: { type: Boolean },

    // This event is a subitem. Show the subitem indicator, and return this flag to our parent when making changes.
    subitem: { type: Boolean },

    // Name of person and shifts as a single string for this event
    resource: { type: String },
    schedule: { type: String },
    people: { type: Array, attribute: false },

    // "resource" (default) or "schedule" to determine which input has initial focus on render
    initialFocus: { type: String },
  };

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("mousedown", this._handleMouseDown);
    this.addEventListener("keydown", this._handleKeyDown);
    this.addEventListener("blur", this._commit);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener("mousedown", this._handleMouseDown);
    this.removeEventListener("keydown", this._handleKeyDown);
    this.removeEventListener("blur", this._commit);
  }

  render() {
    // Child elements. Note <input size="1"> overrides default of size="20" so its width can be set by css property.
    const indicator = this.subitem
      ? html`<div class="indicator">${renderIcon("caret-right")}</div>`
      : nothing;
    const resourceInput = html`<input type="text" id="resource" size="1" placeholder="Name" list="people-list" value="${this.resource}"></input>`;
    const divider = html`<div class="divider"></div>`;
    const scheduleInput = html`<input type="text" id="schedule" size="1" placeholder="Shift" value="${this.schedule}"></input>`;
    const subitemBtn = html`<button
      id="subitem-btn"
      @click=${this._handleSubitemClick}
    >
      ${renderIcon("subitem")}
    </button>`;
    const deleteBtn = html`<button id="delete-btn" @click=${this._delete}>
      ${renderIcon("trash-can")}
    </button>`;
    const peopleDatalist = this.people?.length
      ? html`<datalist id="people-list">
          ${(this.people ?? []).map(
            (p) => html`<option value="${p}"></option>`
          )}
        </datalist>`
      : nothing;

    return html`${indicator}
      <div class="inputs" @keydown=${this._handleInputKeyDown}>
        ${resourceInput} ${divider} ${scheduleInput} ${peopleDatalist}
      </div>
      ${subitemBtn} ${deleteBtn}`;
  }

  updated() {
    this.scheduleEl = this.shadowRoot.querySelector("#schedule");
    this.resourceEl = this.shadowRoot.querySelector("#resource");
    const initialFocusedEl =
      this.initialFocus === "schedule" ? this.scheduleEl : this.resourceEl;
    initialFocusedEl.focus();
    initialFocusedEl.select();
    this._editComplete = false;
  }

  isEmpty() {
    const resource = this.resourceEl.value.trim();
    const schedule = this.scheduleEl.value.trim();
    return !resource && !schedule;
  }

  _dispatch(eventName, addlDetail = {}) {
    const resource = this.resourceEl.value.trim();
    const schedule = this.scheduleEl.value.trim();
    const context = this.context;
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: false,
        composed: true,
        detail: { context, resource, schedule, ...addlDetail },
      })
    );
  }

  _handleMouseDown(e) {
    // Limit mousedown events within this component to itself. This is because our ancestor
    // component <cal-day> uses mousedown events to handle selecting days, and when it calls
    // preventDefault(), that makes our internal input components not focusable by mouse.
    e.stopPropagation();
  }
  _handleKeyDown(e) {
    if (e.keyCode == 27) {
      this._editComplete = true;
      this._dispatch("cal-event-edit-cancel");
    }
  }
  _handleInputKeyDown(e) {
    if (e.keyCode == 13) {
      if (e.ctrlKey && !e.shiftKey && !e.altKey && !e.metaKey) {
        // Ctrl+Enter triggers add subitem
        this.shadowRoot.querySelector("#subitem-btn").click();
      } else if (e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
        // Shift+Enter commits edits and moves to previous item
        this._commit("prev");
      } else {
        this._commit("next");
      }
    }
  }
  _handleSubitemClick(e) {
    // Ignore click if there is no data in the current event
    if (this.isEmpty()) {
      return this.resourceEl.focus();
    }

    // Then tell parent that we want to add a new subitem
    this._editComplete = true;
    this._dispatch("cal-event-edit-add-subitem");
  }
  _handleDeleteClick(e) {
    this._editComplete = true;
    this._delete();
  }

  _delete(next = null) {
    this._editComplete = true;
    this._dispatch("cal-event-edit-delete", { next });
  }

  _commit(next = null) {
    // Ignore blur events after user already did another action with this edit control
    if (this._editComplete) {
      return;
    }

    this._editComplete = true;
    // If resource and schedule were cleared, then treat as a delete event
    if (this.isEmpty()) {
      this._delete(next);
    } else {
      // If there is data in the inputs, signal that editing has completed
      // Our parent will also update this.eventIndex if a new item is created by this change.
      this._dispatch("cal-event-edit-change", { next });
    }
  }
}

customElements.define("cal-event-edit", CalEventEdit);
