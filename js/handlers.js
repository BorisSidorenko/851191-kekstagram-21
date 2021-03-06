'use strict';

const main = document.querySelector(`main`);
const uploadForm = document.querySelector(`.img-upload__form`);
const uploadPreview = uploadForm.querySelector(`.img-upload__preview`);
const uploadImg = uploadPreview.querySelector(`img`);
const uploadPanel = uploadForm.querySelector(`.img-upload__overlay`);

const successFragment = document.querySelector(`#success`).content;
const successPanelFragment = successFragment.querySelector(`.success`);

const errorFragment = document.querySelector(`#error`).content;
const errorPanelFragment = errorFragment.querySelector(`.error`);

let statusPanel;
let statusButton;

const showStatusPanel = (fragment) => {
  statusPanel = fragment.cloneNode(true);
  statusButton = statusPanel.querySelector(`button`);

  main.appendChild(statusPanel);

  statusButton.addEventListener(`click`, onStatusButtonClick);
  statusPanel.addEventListener(`click`, onStatusPanelClick);
  document.addEventListener(`keydown`, onStatusPanelEscPress);
};

const removeStatusPanel = () => {
  main.removeChild(statusPanel);
  statusButton.removeEventListener(`click`, onStatusButtonClick);
  statusPanel.removeEventListener(`click`, onStatusPanelClick);
  document.removeEventListener(`keydown`, onStatusPanelEscPress);
};

const onStatusButtonClick = removeStatusPanel;

const onStatusPanelClick = (evt) => {
  if (evt.target.className === statusPanel.className) {
    removeStatusPanel();
  }
};

const onStatusPanelEscPress = (evt) => {
  window.utils.isEscEvent(evt, removeStatusPanel);
};

const resetFormAndEffect = () => {
  uploadImg.src = ``;

  window.effect.setToDefault();

  uploadForm.reset();
};

const success = () => {
  uploadPanel.classList.add(`hidden`);
  resetFormAndEffect();
  showStatusPanel(successPanelFragment);
};

const error = () => {
  uploadPanel.classList.add(`hidden`);
  resetFormAndEffect();
  showStatusPanel(errorPanelFragment);
};

window.handlers = {
  success,
  error
};
