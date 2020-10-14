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
  const imgUploadPreview = uploadPanel.querySelector('.img-upload__preview');
  const imgUpload = imgUploadPreview.querySelector('img');

  const currentScale = uploadForm.querySelector('.scale__control--value');
  const scaleControlSmall = uploadForm.querySelector('.scale__control--smaller');
  const scaleControlBig = uploadForm.querySelector('.scale__control--bigger');

  const effectLevel = uploadPanel.querySelector('.effect-level');

  const resetScale = () => {
    currentScale.value = `${Scale.IMG_SCALE_DEFAULT}%`;
    imgUploadPreview.style.transform = `scale(${Scale.IMG_SCALE_DEFAULT / Scale.IMG_SCALE_DEFAULT})`;
  };

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

  const onEffectChange = (evt) => {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      if (imgUpload.classList.length !== 0) {
        imgUpload.classList.remove(Array.from(imgUpload.classList));
      }

      imgUpload.classList.add(`effects__preview--${evt.target.value}`);
      imgUpload.style = '';
      window.slider.renderDefaultSlider();

      if (imgUpload.classList.contains('effects__preview--none')) {
        effectLevel.classList.add('hidden');
      } else {
        effectLevel.classList.remove('hidden');
      }
    }
  };

  const setDefaultEffect = () => {
    imgUpload.style = '';
    imgUpload.className = '';
    imgUpload.classList.add('effects__preview--none');
    resetScale();
  };

  window.effect = {
    onEffectChange,
    setDefaultEffect,
    resetScale
  };
})();
