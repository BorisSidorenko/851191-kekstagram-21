'use strict';

const uploadForm = document.querySelector(`.img-upload__form`);
const uploadPanel = uploadForm.querySelector(`.img-upload__overlay`);
const uploadFileInput = uploadForm.querySelector(`#upload-file`);
const uploadCancelButton = uploadForm.querySelector(`#upload-cancel`);

const effectLevel = uploadPanel.querySelector(`.effect-level`);
const hashtagInput = uploadPanel.querySelector(`.text__hashtags`);
const commentInput = uploadPanel.querySelector(`.text__description`);

const onEditPanelEscPress = (evt) => {
  if (document.activeElement !== hashtagInput && document.activeElement !== commentInput) {
    window.utils.isEscEvent(evt, closeEditPanel);
  }
};

const onUploadFileInputChange = () => {
  window.effect.resetScale();
  document.body.classList.toggle(`modal-open`);
  uploadPanel.classList.remove(`hidden`);
  effectLevel.classList.add(`hidden`);

  document.addEventListener(`keydown`, onEditPanelEscPress);
  uploadCancelButton.addEventListener(`click`, onUploadCancelClick);
};

const closeEditPanel = () => {
  window.effect.setToDefault();
  uploadForm.reset();

  document.body.classList.toggle(`modal-open`);
  uploadPanel.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onEditPanelEscPress);
  uploadCancelButton.removeEventListener(`click`, onUploadCancelClick);
};

const onUploadCancelClick = closeEditPanel;

uploadFileInput.addEventListener(`change`, onUploadFileInputChange);

uploadForm.addEventListener(`change`, window.effect.onInputChange);

const onHashtagInput = () => {
  const hashtags = hashtagInput.value.trim().split(` `);

  hashtags.forEach(window.validation.setHashtagMessage);
};

hashtagInput.addEventListener(`input`, onHashtagInput);

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  window.backend.save(new FormData(uploadForm), window.handlers.success, window.handlers.error);
};

uploadForm.addEventListener(`submit`, onUploadFormSubmit);
