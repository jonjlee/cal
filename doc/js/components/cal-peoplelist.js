import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.8.0/core/lit-core.min.js";
import "./cal-checklist.js";
import { CHECKED, INDETERMINATE, UNCHECKED } from "./cal-checklist.js";

class CalPeopleList extends LitElement {
  static properties = {
    settings: { type: Object, attribute: false },
  };
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
    .footer {
      align-self: center;
      margin-top: 5px;
      font-size: 0.75em;
      a {
        color: var(--bs-link-color);
        text-decoration: none;
      }
    }
    .divider {
      margin: 10px 30px;
      border-top: 1px solid var(--border-color);
    }
    .everyone-list {
      font-size: 0.85em;
      max-height: 14em;
      overflow-y: scroll;
    }
  `;
  willUpdate() {
    if (!this.settings) {
      return;
    }

    // this.settings is the main data source for this component, but it may not contain
    // define all of the required properties. Provide empty defaults if needed.
    let options = this.settings.options ?? {};
    options = this.settings.options = {
      peopleGroupOrder: [],
      peopleGroups: {},
      people: {},
      ...options,
    };

    // Make people visible unless explicitly hidden, then update the checked state of groups
    for (const p in options.people) {
      options.people[p].visible = options.people[p].visible ?? CHECKED;
    }
    this._syncGroupsToPeopleChecked(options.peopleGroups, options.people);
  }
  render() {
    if (!this.settings) {
      return;
    }

    // this.settings is the main data source for this component
    const { peopleGroupOrder, peopleGroups, people } =
      this.settings.options ?? {};

    // peopleGroupOrder is a list of names of groups to show, e.g. ["MDs", "RNs", ...]
    const peopleGroupItems = peopleGroupOrder?.map((name) => ({
      label: name,
      group: true,
      checked: peopleGroups[name]?.visible ?? UNCHECKED,
    }));
    const peopleItems = Object.entries(people ?? {})
      .map(([_, person]) => person.name)
      .filter((name, idx, arr) => arr.indexOf(name) === idx) // Return unique names
      .sort()
      .map((name) => ({
        label: name,
        group: false,
        checked: people[name]?.visible ?? CHECKED,
        color: people[name]?.color,
      }));

    // Show a checkbox for each group of people
    const groupsEl = html`<cal-checklist
      checkable
      .items=${peopleGroupItems}
      @color-change=${this._handleColorChange}
      @checked=${this._handleGroupCheck}
    ></cal-checklist>`;

    // Show list of all known people, limiting height to screen
    const dividerEl = html`<div class="divider"></div>`;
    const everyoneEl = html`<cal-checklist
      class="everyone-list"
      checkable
      colorable
      .items=${peopleItems}
      @color-change=${this._handleColorChange}
      @checked=${this._handlePersonCheck}
    >
    </cal-checklist>`;

    // Show all / none in footer
    const footer = html`<div class="footer">
      <a href="#" @click=${this._handleSelectAll.bind(this, CHECKED)}
        >Show All</a
      >
      |
      <a href="#" @click=${this._handleSelectAll.bind(this, UNCHECKED)}>None</a>
    </div>`;

    return html`${groupsEl} ${dividerEl} ${everyoneEl} ${footer} ${dividerEl}`;
  }
  _syncGroupsToPeopleChecked(peopleGroups, people) {
    // Synchronize peopleGroups checked state to people checked state
    for (const group in peopleGroups) {
      // Each group has a names[] with people in the group
      const names = peopleGroups[group].names;
      const peopleInGroup = names.filter((name) => people[name]?.visible);
      peopleGroups[group].visible =
        peopleInGroup.length == names.length
          ? CHECKED
          : peopleInGroup.length > 0
          ? INDETERMINATE
          : UNCHECKED;
    }
  }
  _dispatch(eventName) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: false,
        composed: true,
        detail: { settings: this.settings },
      })
    );
  }
  _handleColorChange(e) {
    // Update internal state
    const { item, color } = e.detail;
    if (item.group) {
      this.settings.options.peopleGroups[item.label].color = color;
    } else {
      this.settings.options.people[item.label].color = color;
    }

    // Let parent know that settings have been updated
    this._dispatch("change");
  }
  _handleGroupCheck(e) {
    const { item, checked } = e.detail;
    for (const person of this.settings.options.peopleGroups[item.label].names) {
      if (person in this.settings.options.people) {
        this.settings.options.people[person].visible = checked
          ? CHECKED
          : UNCHECKED;
      }
    }
    this._dispatch("change");
    this.requestUpdate();
  }
  _handlePersonCheck(e) {
    const { item, checked } = e.detail;
    this.settings.options.people[item.label].visible = checked
      ? CHECKED
      : UNCHECKED;
    this._dispatch("change");
    this.requestUpdate();
  }
  _handleSelectAll(selected) {
    const people = this.settings.options.people;
    for (const person in people) {
      people[person].visible = selected;
    }
    this._dispatch("change");
    this.requestUpdate();
  }
}

customElements.define("cal-peoplelist", CalPeopleList);
