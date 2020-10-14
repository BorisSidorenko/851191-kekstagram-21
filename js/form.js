'use strict';

(() => {
  const Scale = {
    IMG_SCALE_DEFAULT: 100,
    IMG_SCALE_MAX: 100,
    IMG_SCALE_MIN: 25,
    IMG_SCALE_STEP: 25
  };

  const main = document.querySelector('main');

  const successFragment = document.querySelector('#success').content;
  const successPanelFragment = successFragment.querySelector('.success');

  let successPanel;
  let successButton;

  const uploadForm = document.querySelector('.img-upload__form');
  const uploadPanel = uploadForm.querySelector('.img-upload__overlay');
  const uploadFileInput = uploadForm.querySelector('#upload-file');
  const uploadCancelButton = uploadForm.querySelector('#upload-cancel');

  const imgUploadPreview = uploadPanel.querySelector('.img-upload__preview');
  const scaleControlSmall = uploadForm.querySelector('.scale__control--smaller');
  const scaleControlBig = uploadForm.querySelector('.scale__control--bigger');
  const effectLevel = uploadPanel.querySelector('.effect-level');
  const hashtagInput = uploadPanel.querySelector('.text__hashtags');
  const commentInput = uploadPanel.querySelector('.text__description');
  const currentScale = uploadForm.querySelector('.scale__control--value');

  const resetScale = () => {
    currentScale.value = `${Scale.IMG_SCALE_DEFAULT}%`;
    imgUploadPreview.style.transform = `scale(${Scale.IMG_SCALE_DEFAULT / Scale.IMG_SCALE_DEFAULT})`;
  };

  const resetFormAndEffects = () => {
    resetScale();
    window.effect.setDefaultEffect();
    uploadForm.reset();
  };

  const onEditPanelEscPress = (evt) => {
    if (document.activeElement !== hashtagInput && document.activeElement !== commentInput) {
      window.utils.isEscEvent(evt, closeEditPanel);
    }
  };

  const openEditPanel = () => {
    resetScale();
    document.body.classList.toggle('modal-open');
    uploadPanel.classList.remove('hidden');
    effectLevel.classList.add('hidden');

    document.addEventListener('keydown', onEditPanelEscPress);
    uploadCancelButton.addEventListener('click', onUploadCancelClick);
  };

  const closeEditPanel = () => {
    resetFormAndEffects();

    document.body.classList.toggle('modal-open');
    uploadPanel.classList.add('hidden');

    document.removeEventListener('keydown', onEditPanelEscPress);
    uploadCancelButton.removeEventListener('click', onUploadCancelClick);
  };

  const onUploadCancelClick = closeEditPanel;

  const onUploadFileInputChange = openEditPanel;

  uploadFileInput.addEventListener('change', onUploadFileInputChange);

  const subtractScaleInput = () => {
    const scale = parseInt(currentScale.value.replace('%', ''), 10);
    return scale - Scale.IMG_SCALE_STEP < Scale.IMG_SCALE_MIN ? Scale.IMG_SCALE_MIN : scale - Scale.IMG_SCALE_STEP;
  };

  const addScaleInput = () => {
    const scale = parseInt(currentScale.value.replace('%', ''), 10);
    return scale + Scale.IMG_SCALE_STEP > Scale.IMG_SCALE_MAX ? Scale.IMG_SCALE_MAX : scale + Scale.IMG_SCALE_STEP;
  };

  const onScaleDown = () => {
    const scaleInputValue = subtractScaleInput();
    currentScale.value = `${scaleInputValue}%`;
    imgUploadPreview.style.transform = `scale(${scaleInputValue / Scale.IMG_SCALE_MAX})`;
  };

  const onScaleUp = () => {
    const scaleInputValue = addScaleInput();
    currentScale.value = `${scaleInputValue}%`;
    imgUploadPreview.style.transform = `scale(${scaleInputValue / Scale.IMG_SCALE_MAX})`;
  };

  scaleControlSmall.addEventListener('click', onScaleDown);

  scaleControlBig.addEventListener('click', onScaleUp);

  uploadForm.addEventListener('change', window.effect.onEffectChange);

  const onHashtagInput = () => {
    const hashtags = hashtagInput.value.split(' ');

    hashtags.forEach(window.validation.setHashtagValidationMessage);
  };

  hashtagInput.addEventListener('input', onHashtagInput);

  const removeSuccessPanel = () => {
    main.removeChild(successPanel);
    successButton.removeEventListener('click', onSuccessButtonClick);
    successPanel.removeEventListener('click', onSuccessPanelClick);
    document.removeEventListener('keydown', onSuccessPanelEscPress);
  };

  const onSuccessButtonClick = removeSuccessPanel;

  const onSuccessPanelClick = (evt) => {
    if (evt.target.className === successPanel.className) {
      removeSuccessPanel();
    }
  };

  const onSuccessPanelEscPress = (evt) => {
    window.utils.isEscEvent(evt, removeSuccessPanel);
  };

  const showSuccessPanel = () => {
    successPanel = successPanelFragment.cloneNode(true);
    successButton = successPanel.querySelector('.success__button');

    main.appendChild(successPanel);

    successButton.addEventListener('click', onSuccessButtonClick);
    successPanel.addEventListener('click', onSuccessPanelClick);
    document.addEventListener('keydown', onSuccessPanelEscPress);
  };

  const successHandler = () => {
    uploadPanel.classList.add('hidden');
    resetFormAndEffects();
    showSuccessPanel();
  };

  const errorHandler = () => {

  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    window.backend.save(new FormData(uploadForm), successHandler, errorHandler);
  };

  uploadForm.addEventListener('submit', onSubmit);
})();
