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
    return error("Input some request");
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

  const intViewportHeight = window.innerHeight;
  const options = {
    top: intViewportHeight,
    behavior: "smooth",
  };

  setTimeout(() => {
    window.scrollBy(options);
  }, 1000);
}

function scrollToElement(elem) {
  const loadBtnTopCoords = getCoords(elem).top;
  const intViewportHeight = window.innerHeight;

  console.log(loadBtnTopCoords);
  const options = {
    top: intViewportHeight,
    behavior: "smooth",
  };

  options.loadBtnTopCoords += intViewportHeight;
  window.scrollTo(options);
}

function getCoords(elem) {
  let box = elem.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset,
  };
}
