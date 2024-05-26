const FETCH_CAL_SETTINGS = fetch("js/settings.json");
let SETTINGS = null;

(function () {
  Promise.all([FETCH_CAL_SETTINGS]).then(async (resp) => {
    SETTINGS = await resp[0].json();
  });
})();
