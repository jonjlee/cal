import {
  html,
  css,
  nothing,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.8.0/core/lit-core.min.js";
import { live } from "https://cdn.jsdelivr.net/npm/lit-html@2.8.0/directives/live.min.js";
import { renderIcon } from "../util.js";

export const UNCHECKED = 0;
export const CHECKED = 1;
export const INDETERMINATE = 2;

class CalChecklistItem extends LitElement {
  static DEFAULT_COLOR = "inherit";
  static properties = {
    label: { type: String },
    editable: { type: Boolean },

    showHandle: { type: Boolean },
    showDelete: { type: Boolean },

    hideCheckbox: { type: Boolean },
    checked: { type: Number },

    hideColor: { type: Boolean },
    color: { type: String },
  };
  static styles = css`
    .item {
      display: flex;
      align-items: center;
      &:hover {
        background: var(--clickable-hover-color);
      }
    }
    .icon {
      height: 1em;
      width: 1.25em;
      vertical-align: -0.125em;
    }
    .handle {
      display: flex;
      align-items: center;
      color: var(--dark-gray-icon-color);

      cursor: pointer;

      .icon {
        display: none;
        height: 0.9em;
      }
    }
    :hover .handle .icon {
      display: inline-block;
    }
    input[type="checkbox"] {
      accent-color: var(--bs-light);
    }
    #label {
      flex-grow: 1;
      padding: 3px;
      cursor: text;
      &:focus {
        outline: none;
        border-bottom: 1px solid var(--border-color);
      }
    }
    .color-selector {
      display: flex;
      align-items: center;

      padding-left: 3px;
      padding-right: 4px;

      cursor: default;

      /* Actual clickable color circle */
      span {
        display: inline-block;
        border: 1px solid var(--dark-border-color);
        border-radius: 50%;
        width: 14px;
        height: 14px;

        /* Hide the input element */
        input[type="color"] {
          visibility: hidden;
          width: 0;
        }
      }
    }
    .deleteBtn {
      display: none;
      cursor: pointer;
    }
    :hover .deleteBtn {
      display: inline-block;
    }
  `;
  constructor() {
    super();
    this.focusOnUpdate = false;
  }
  render() {
    const checked = this.checked == CHECKED;
    const indeterminate = this.checked == INDETERMINATE;
    const handleEl = this.showHandle
      ? html`<div class="handle">${renderIcon("grip-vertical")}</div>`
      : nothing;
    const checkboxEl = !this.hideCheckbox
      ? html`<input type="checkbox" id="check" .checked=${checked} .indeterminate=${indeterminate} @change=${this._handleCheckChange}></input>`
      : nothing;
    const labelEl = html`<div
      id="label"
      ?contenteditable=${this.editable}
      @keydown=${this._handleKeyDown}
      @click=${this._handleLabelClick}
      @blur=${this._commit}
      .innerText=${live(this.label ?? "")}
    ></div>`;
    const colorEl = !this.hideColor
      ? this.renderColorSelector(this.color)
      : nothing;
    const deleteBtnEl = this.showDelete
      ? html`<div class="deleteBtn" @click=${this._handleDeleteClick}>
          ${renderIcon("xmark")}
        </div>`
      : nothing;

    return html`<div class="item">
      ${checkboxEl} ${colorEl} ${labelEl} ${deleteBtnEl} ${handleEl}
    </div> `;
  }
  // Render the color dot that triggers the <input> to show a color picker
  renderColorSelector(color) {
    color = color ?? CalChecklistItem.DEFAULT_COLOR;
    return html`<div class="color-selector" @click=${this._handleColorSelectClick}>
      <span style="background-color: ${color}">
        <input type="color" id="color" value="${color}" @input=${this._handleColorChange}></input>
      </span>
    </div>`;
  }
  updated() {
    // Store reference to the input[type=color] for use in event handlers
    this.checkInputEl = this.shadowRoot.querySelector("#check");
    this.labelEl = this.shadowRoot.querySelector("#label");
    this.colorInputEl = this.shadowRoot.querySelector("#color");

    // If asked to focus on next render, then select any existing text
    if (this.focusOnUpdate) {
      this.labelEl.focus();
      this.focusOnUpdate = false;
    }
  }

  _dispatch(eventName, detail = {}) {
    // Send a generic, non-bubbling event that does cross the shadow DOM border (composed)
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: false,
        composed: true,
        detail: { context: this.context, ...detail },
      })
    );
  }

  _handleCheckChange(e) {
    // Pass the change on to our parent
    this._dispatch("item-checked", { checked: this.checkInputEl.checked });
  }
  _handleKeyDown(e) {
    // Consume Enter and Esc keystrokes and pass on to parent
    if (e.keyCode == 13 || e.keyCode == 27) {
      e.preventDefault();
      // Defocus input, whose event handler will trigger _commit()
      this.labelEl.blur();
    }
  }
  _commit() {
    // Item text has changed
    this._dispatch("item-change", { label: this.labelEl.textContent.trim() });
  }
  _handleLabelClick(e) {
    if (!this.editable && !this.hideCheckbox) {
      // If label is not editable, then toggle checkbox on click
      this.checkInputEl.checked = !this.checkInputEl.checked;
      this._handleCheckChange();
    }
  }
  // Clicked div containing the color circle
  _handleColorSelectClick(e) {
    // Don't let click also trigger input checkbox
    e.preventDefault();
    this.colorInputEl.showPicker();
  }
  // <input> color selected
  _handleColorChange(e) {
    // Update this.color property which will trigger render()
    // When black is chosen, just let render() show the default color
    this.color = this.colorInputEl.value.toLowerCase();
    if (
      this.color == "black" ||
      this.color == "#000000" ||
      this.color == "white" ||
      this.color == "#ffffff"
    ) {
      this.color = null;
    }

    // Pass the change on to our parent
    this._dispatch("item-color-change", { color: this.color });
  }
  _handleDeleteClick(e) {
    this._dispatch("item-delete-click");
  }
}
customElements.define("cal-checklist-item", CalChecklistItem);
