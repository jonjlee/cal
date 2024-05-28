import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2.8.0/core/lit-core.min.js";
import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";

class CalNavbar extends LitElement {
  createRenderRoot() {
    // This component's UI is built in the light DOM in the main HTML page.
    return this;
  }
  connectedCallback() {
    super.connectedCallback();

    // Get references to my internal elements
    this.monthTextDiv = this.querySelector(".cal-navbar-month");
    this.dateSelector = this.querySelector(".cal-navbar-datesel");
    this.dateSelectorIcon = this.querySelector(".cal-navbar-datesel-icon");

    // Get a reference to the main calendar element
    const parentId = this.getAttribute("cal-id");
    this.parent = document.querySelector("#" + parentId);

    // Event when a new month is scrolled into view
    this.parent.addEventListener(
      "displaying-month",
      this._handleDisplayMonth.bind(this)
    );

    // Handle events for child elements
    this.dateSelector.addEventListener("change", () =>
      this.selectDate(this.dateSelector.value)
    );
    this.querySelector(".cal-navbar-datesel-icon").addEventListener(
      "click",
      () => this.dateSelector.showPicker()
    );
    this.querySelector("#cal-navbar-today-btn").addEventListener("click", () =>
      this.today()
    );
    this.querySelector("#cal-navbar-prevmonth").addEventListener("click", () =>
      this.prevMonth()
    );
    this.querySelector("#cal-navbar-nextmonth").addEventListener("click", () =>
      this.nextMonth()
    );
  }

  today() {
    this.parent.scrollToDate(dayjs(), "auto");
  }

  selectDate(date) {
    this.parent.scrollToDate(date, "auto");
  }

  prevMonth() {
    this.parent.scrollToMonth(
      dayjs(this.dateSelector.value).subtract(1, "month").format("YYYY-MM")
    );
  }

  nextMonth() {
    this.parent.scrollToMonth(
      dayjs(this.dateSelector.value).add(1, "month").format("YYYY-MM")
    );
  }

  _handleDisplayMonth(e) {
    if (e.detail.monthObj) {
      this.monthTextDiv.textContent = e.detail.monthObj.format("MMMM YYYY");
      this.dateSelector.value = e.detail.monthObj.format("YYYY-MM-DD");
    } else {
      this.monthTextDiv.textContent = "";
    }
  }
}

customElements.define("cal-navbar", CalNavbar);
