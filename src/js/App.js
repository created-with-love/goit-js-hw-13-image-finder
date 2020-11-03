import _ from "lodash";
import imagesTemplate from "../templates/imageCart.hbs";
import ApiImagesService from "./api-service";
import getRefs from "./get-refs";
import LoadMoreBtn from "./components/load-more-btn";
import { error } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";

const refs = getRefs();

const apiImageService = new ApiImagesService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.form.addEventListener("submit", onImgSearch);
refs.loadMoreBtn.addEventListener("click", onLoadMoreBtnClick);

function onImgSearch(e) {
  e.preventDefault();

  apiImageService.query = e.currentTarget.elements.query.value;

  if (apiImageService.query === "") {
    const errorMsg = document.querySelector(".pnotify");

    if (!errorMsg) {
      return error("Input some request");
    }

    if (errorMsg) {
      errorMsg.classList.add("is-hidden");
      return;
    }
  }

  loadMoreBtn.show();
  apiImageService.resetPage();
  clearGallery();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();

  apiImageService
    .fetchImages()
    .then((images) => {
      renderImages(images.hits);
      loadMoreBtn.enable();
    })
    .catch(onFetchError);
}

function onFetchError(error) {
  alert(error);
}

function renderImages(images) {
  refs.gallery.insertAdjacentHTML("beforeend", imagesTemplate(images));
}

function clearGallery() {
  refs.gallery.innerHTML = "";
}

function onLoadMoreBtnClick() {
  fetchImages();

  const options = {
    top: null,
    behavior: "smooth",
  };

  options.top = window.pageYOffset + document.documentElement.clientHeight;
  setTimeout(() => {
    window.scrollTo(options);
  }, 1000);
}
