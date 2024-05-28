import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.8.0/core/lit-core.min.js";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";
import { CHECKED, INDETERMINATE, UNCHECKED } from "./cal-checklist.js";

class CalList extends LitElement {
  static properties = {
    settings: { type: Object, attribute: false },
  };
  render() {
    if (!this.settings) {
      return;
    }

    // this.settings is the main data source for this component
    const { cals, options } = this.settings ?? {};
    const { calOrder } = options ?? {};

    const items = calOrder?.map((id) => ({
      id: id,
      label: cals[id]?.name,
      color: cals[id]?.color || cals[id]?.background,
      checked: cals[id]?.visible ?? CHECKED,
    }));

    // Show a checkbox for each group
    const calEls = html`<cal-checklist
      checkable
      .items=${items ?? []}
      @checked=${this._handleCalChange}
      @color-change=${this._handleCalChange}>
    </calchecklist>`;

    return html` ${calEls} `;
  }

  _handleCalChange(e) {
    const { item, checked, color } = e.detail;
    this.dispatchEvent(
      new CustomEvent("change", {
        bubbles: false,
        composed: true,
        detail: { cal: item.id, checked, color },
      })
    );
  }
}

customElements.define("cal-callist", CalList);
