import { error } from "@pnotify/core";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/core/dist/PNotify.css";
import getRefs from "./get-refs";

const refs = getRefs();

// кидаю ошибку на страницу, если ее еще на странице нет
function errorMsgMarkUp() {
  const errorMsg = document.querySelector(".pnotify");
  if (!errorMsg) {
    refs.countriesList.innerHTML = "";
    error(`Too many matches found.
    Please enter a more specific query!`);
  }
}

// удаляю ошибку при создании элемента страны
function hideError() {
  const errorMsg = document.querySelector(".pnotify-container");
  if (errorMsg) {
    errorMsg.classList.add("hidden");
  }
}

export default { errorMsgMarkUp, hideError };
