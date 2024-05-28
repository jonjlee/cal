import {
  html,
  css,
  nothing,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.8.0/core/lit-core.min.js";
import { renderIcon } from "../util.js";
import { UNCHECKED, CHECKED, INDETERMINATE } from "./cal-checklist-item.js";
export { UNCHECKED, CHECKED, INDETERMINATE };

class CalChecklist extends LitElement {
  static properties = {
    items: { type: Array, attribute: false },
    checkable: { type: Boolean },
    colorable: { type: Boolean },
    editable: { type: Boolean },
    moveable: { type: Boolean },
  };
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
    .cal-checklist-add {
      cursor: text;
      color: var(--dark-gray-text);
      font-size: 0.9em;
      padding: 3px 7px;
      &:hover {
        background: var(--clickable-hover-color);
      }
    }
    .cal-checklist-plussign {
      display: inline-block;
      width: 0.9em;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      padding: 0px 5px;
    }
  `;

  constructor() {
    super();
    this.items = [];
  }

  willUpdate(changedProperties) {
    // Default to no items
    this.items == this.items ?? [];

    // Update our render template based on the current data, which contains a list of items:
    // { label: "Item", color: "#000000", checked: CalChecklistItem.CHECKED/UNCHECKED/... }
    this._renderInfo = this._createRenderInfo(this.items);

    // Cancel out any "editing" states in our items for the next render
    this.items.forEach((item) => delete item.editing);
  }

  // Converts this.items to a template be used by render()
  _createRenderInfo(items) {
    // First add all the defined items
    const itemInfos = [];
    items.forEach(({ id, label, color, checked, editing }, idx) => {
      itemInfos.push({
        type: "item",
        id,
        label,
        color,
        checked,
        editing,
        context: { index: idx },
      });
    });

    return { itemInfos };
  }
  render() {
    if (!this._renderInfo) {
      return nothing;
    }

    // Render each item as a cal-checklist-item
    const itemEls = this._renderInfo.itemInfos.map(
      (itemInfo, idx) => html`<cal-checklist-item
        label=${itemInfo.label}
        color=${itemInfo.color}
        checked=${itemInfo.checked}
        ?showHandle=${this.moveable}
        ?editable=${this.editable}
        ?showDelete=${this.editable}
        ?hideCheckbox=${!this.checkable}
        ?hideColor=${!this.colorable}
        .focusOnUpdate=${itemInfo.editing}
        .context=${itemInfo.context}
      ></cal-checklist-item>`
    );

    // Render clickable add item button to end of list if it is editable and not already adding an item
    const addEl = this.editable
      ? html`<div class="cal-checklist-add" @click=${this._handleAddItemClick}>
          <span class="cal-checklist-plussign">${renderIcon("plus")}</span>
          <span>Add</span>
        </div>`
      : nothing;

    return html`<div>${itemEls} ${addEl}</div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("item-checked", this._handleItemChecked);
    this.addEventListener("item-change", this._handleItemChange);
    this.addEventListener("item-color-change", this._handleItemColorChange);
    this.addEventListener("item-delete-click", this._handleItemDeleteClick);
  }
  _dispatch(eventName, detail) {
    // Send a generic, non-bubbling event that does cross the shadow DOM border (composed)
    this.dispatchEvent(
      new CustomEvent(eventName, { bubbles: false, composed: true, detail })
    );
  }
  _handleItemChecked(e) {
    // Get the index of the item that generated the event, update internal state, and pass along to parent
    const { index } = e.detail.context;
    const checked = e.detail.checked;
    this.items[index].checked = checked;
    this._dispatch("checked", { item: this.items[index], index, checked });
  }
  _handleItemChange(e) {
    // Get the index of the item that generated the event, update internal state, and pass along to parent
    const { index } = e.detail.context;
    const label = e.detail.label;
    this.items[index].label = label;
    this._dispatch("change", { item: this.items[index], index, label });
    this.requestUpdate();
  }
  _handleItemColorChange(e) {
    // Get the index of the item that generated the event, update internal state, and pass along to parent
    const { index } = e.detail.context;
    const color = e.detail.color;
    this.items[index].color = color;
    this._dispatch("color-change", { item: this.items[index], index, color });
  }
  _handleItemDeleteClick(e) {
    // Get the index of the item that generated the event, update internal state, and pass along to parent
    const { index } = e.detail.context;
    const item = this.items[index];
    this.items.splice(index, 1);
    this._dispatch("delete-item", { item, index });

    // Re-render since the number of items changed, which is not handled by the list item itself
    this.requestUpdate();
  }
  _handleAddItemClick(e) {
    // Add a new item to the end of the list
    this.items.push({
      label: "",
      checked: UNCHECKED,
      color: null,
      editing: true,
    });
    this.requestUpdate();
  }
}
customElements.define("cal-checklist", CalChecklist);
