const formTemplate = require("../templates/form.hbs");
const bodyEl = document.querySelector("body");

bodyEl.insertAdjacentHTML("afterbegin", formTemplate());
