'use strict';

(() => {
  const Scale = {
    IMG_SCALE_DEFAULT: 100,
    IMG_SCALE_MAX: 100,
    IMG_SCALE_MIN: 25,
    IMG_SCALE_STEP: 25
  };

  const uploadForm = document.querySelector('.img-upload__form');
  const uploadPanel = uploadForm.querySelector('.img-upload__overlay');
  const uploadFileInput = uploadForm.querySelector('#upload-file');
  const uploadCancelButton = uploadForm.querySelector('#upload-cancel');

  const imgUploadPreview = uploadPanel.querySelector('.img-upload__preview');
  const scaleControlSmall = uploadForm.querySelector('.scale__control--smaller');
  const scaleControlBig = uploadForm.querySelector('.scale__control--bigger');
  const effectLevel = uploadPanel.querySelector('.effect-level');
  const hashtagInput = uploadPanel.querySelector('.text__hashtags');
  const currentScale = uploadForm.querySelector('.scale__control--value');
  currentScale.value = `${Scale.IMG_SCALE_DEFAULT}%`;

  const onEditPanelEscPress = (evt) => {
    if (document.activeElement !== hashtagInput) {
      window.utils.isEscEvent(evt, closeEditPanel);
    }
  };

  const openEditPanel = () => {
    document.body.classList.toggle('modal-open');
    uploadPanel.classList.toggle('hidden');
    effectLevel.classList.toggle('hidden');

    document.addEventListener('keydown', onEditPanelEscPress);
    uploadCancelButton.addEventListener('click', onUploadCancelClick);
  };

  const closeEditPanel = () => {
    document.body.classList.toggle('modal-open');
    uploadPanel.classList.toggle('hidden');
    uploadFileInput.value = '';

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
})();
