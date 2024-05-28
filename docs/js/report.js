import dayjs from "https://cdn.jsdelivr.net/npm/dayjs@1.11.10/+esm";
import * as util from "./util.js";

// Utilities to create specific reports from calendar data and display it as a modal in cal.html#reportModal
const reportEl = document.querySelector("#reportModal");
const reportTitleEl = reportEl.querySelector(".modal-title");
const reportBodyEl = reportEl.querySelector(".modal-body");
const reportModal = new bootstrap.Modal(reportEl);
export const REPORT = {
  setTitle: (title) => {
    reportTitleEl.textContent = title;
  },
  setBodyHtml: (html) => {
    reportBodyEl.innerHTML = html;
  },
  show: (title, html) => {
    title !== undefined && REPORT.setTitle(title);
    html !== undefined && REPORT.setBodyHtml(html);
    reportModal.show();
  },
  hide: () => {
    reportModal.hide();
  },
};

// Accepts a list of seleted days in the format "2022-01-01", and objects that contains
// all of the data and setting used cal-component.js to generate an object
// with the total number of hours worked by each person per day for the selected days.
//
// data should be in the format:
// {
//   "2020-01-01": {
//     "cals": {
//       "Location": {
//         name: "Location",
//         events: [ resource: "Person", schedule: ["8a-5p"]]
//       }
//     }
//   }
// }
//
// returns:
// {
//   "Person": {
//     "2020-01-01": 9
//   }
// }
//
export function hoursReport(selected, data, settings) {
  // Iterate over selected days, adding every shift to a table indexed by person
  const shiftsByPerson = {};
  util.forEachShift(
    data,
    selected,
    ({ day, calId, resource, shift, subitemResource, subitemShift }) => {
      // Do not total hours from call calendars
      const calType = settings.cals?.[calId]?.type;
      if (calType?.toLowerCase() != "call") {
        // If this is a subitem, store details for subitem rather than parent
        resource = subitemResource ?? resource;
        shift = subitemShift ?? shift;

        // Store shiftsByResource["Person"]["2020-01-01"] = ["8a-12p", "1p-5p"]
        const lcaseName = resource.toLowerCase();
        const el = shiftsByPerson[lcaseName] ?? { display: resource };
        const elDay = el[day] ?? [];
        elDay.push(shift);
        el[day] = elDay;
        shiftsByPerson[lcaseName] = el;
      }
    }
  );

  // Convert shifts to total hours per person per day
  const hoursByPerson = {};
  const people = Object.keys(shiftsByPerson).sort();
  // Iterate over selected days
  for (const day of selected) {
    for (const person of people) {
      const lcaseName = person.toLowerCase();
      let hrs = 0;
      // Sum the hours for all shifts for each person for this day
      const shifts = shiftsByPerson[lcaseName][day] ?? [];
      for (const shift of shifts) {
        hrs += util.normalizeShift(day, shift)?.hours || 0;
      }
      // Add a total for the day to each person
      hoursByPerson[lcaseName] = hoursByPerson[lcaseName] ?? {
        display: shiftsByPerson[lcaseName].display,
      };
      hoursByPerson[lcaseName][day] = hrs;
    }
  }

  // Total hours
  people.forEach((person) => {
    hoursByPerson[person].total = Object.values(hoursByPerson[person]).reduce(
      (total, hrs) => total + (isNaN(hrs) ? 0 : hrs),
      0
    );
  });

  // Filter by visible people
  const visiblePeople = Object.values(settings.options?.people ?? {})
    .map((person) =>
      person.visible ?? true ? person.name.toLowerCase() : null
    )
    .filter((person) => person);
  for (const person of Object.keys(hoursByPerson)) {
    if (!visiblePeople.includes(person)) {
      delete hoursByPerson[person];
    }
  }

  return {
    days: selected,
    people: Object.keys(hoursByPerson),
    data: hoursByPerson,
  };
}

export function htmlReportTable(
  selectedReport,
  ytdDay = null,
  ytdReport = null,
  annualReport = null
) {
  const { days, people, data } = selectedReport;
  const headers = people.map((person) => `<th>${data[person].display}</th>`);
  const rows = days
    .map((day) => {
      const rowHeader = `<td>${dayjs(day).format("dd M/D/YY")}</td>`;
      const row = people
        .map((person) => data[person][day])
        .map((val) => `<td>${val}</td>`);
      return [rowHeader, ...row];
    })
    .map((row) => `<tr>${row.join("")}</tr>`);

  const totals = people.map((person) => `<td>${data[person].total}</td>`);
  rows.push(`<tr><td><i>Total</i></td>${totals.join("")}</tr>`);

  // Add  YTD / annual totals if available
  if ((ytdDay && ytdReport) || annualReport) {
    // Add spacer line to indicate initial rows are for selected days
    rows.unshift(
      `<tr><th colspan="${people.length + 1}">Selected Days</th></tr>`
    );

    // Add YTD total line
    if (ytdDay && ytdReport) {
      const ytd = people.map(
        (person) => `<td>${ytdReport.data[person]?.total ?? ""}</td>`
      );
      rows.push(
        `<tr><th>Total to ${dayjs(ytdDay).format("M/D/YY")}</th>${ytd.join(
          ""
        )}</tr>`
      );
    }

    // Add annual total line
    if (annualReport) {
      const annual = people.map(
        (person) => `<td>${annualReport.data[person]?.total ?? ""}</td>`
      );
      rows.push(
        `<tr><th>Total for ${dayjs(ytdDay).year()}</th>${annual.join("")}</tr>`
      );
    }
  }

  return `<table class="table table-striped">
    <thead>
      <tr>
        <th></th>
        ${headers.join("")}
      </tr>
    </thead>
    <tbody>
      ${rows.join("")}
    </tbody>
  </table>`;
}
