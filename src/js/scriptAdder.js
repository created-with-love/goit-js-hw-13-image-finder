const head = document.querySelector(".head");
const body = document.querySelector(".body");

(function () {
  head.insertAdjacentHTML =
    ("beforeend",
    `<link rel="stylesheet" href="dist/basicLightbox.min.css"></link>`);

  body.insertAdjacentHTML(
    "beforeend",
    `<script src="dist/basicLightbox.min.js"></script>`
  );
})();
