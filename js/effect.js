'use strict';

(() => {
  const Effect = {
    SATURATION_MAX: 100,
    SATURATION_STEP: 1,
    SATURATION_STEP_SPECIAL: 33,
    LEVEL_PIN_POSITION: 100,
    LEVEL_DEPTH_WIDTH: 100,
    LEVEL_VALUE: 100
  };

  const uploadForm = document.querySelector('.img-upload__form');
  const uploadPanel = uploadForm.querySelector('.img-upload__overlay');
  const imgUploadPreview = uploadPanel.querySelector('.img-upload__preview');
  const imgUpload = imgUploadPreview.querySelector('img');

  const effectLevel = uploadPanel.querySelector('.effect-level');
  const effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  const effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
  const effectLevelValue = effectLevel.querySelector('.effect-level__value');

  const setGrayscale = () => `filter: grayscale(${effectLevelValue.value / Effect.SATURATION_MAX})`;
  const setSepia = () => `filter: sepia(${effectLevelValue.value / Effect.SATURATION_MAX})`;
  const setInvert = () => `filter: invert(${effectLevelValue.value}%)`;
  const setBlur = () => `filter: blur(${Math.round(effectLevelValue.value / Effect.SATURATION_STEP_SPECIAL)}px)`;
  const setBrightness = () => `filter: brightness(${Math.round(effectLevelValue.value / Effect.SATURATION_STEP_SPECIAL)})`;
  const setOriginal = () => '';

  const saturationFilterMap = new Map([
    ["effects__preview--chrome", setGrayscale],
    ["effects__preview--sepia", setSepia],
    ["effects__preview--marvin", setInvert],
    ["effects__preview--phobos", setBlur],
    ["effects__preview--heat", setBrightness],
    ["effects__preview--none", setOriginal],
  ]);

  const renderDefaultSlider = () => {
    effectLevelPin.style.left = `${Effect.LEVEL_PIN_POSITION}%`;
    effectLevelDepth.style.width = `${Effect.LEVEL_DEPTH_WIDTH}%`;
    effectLevelValue.value = `${Effect.LEVEL_VALUE}`;
  };

  const onEffectChange = (evt) => {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      if (imgUpload.classList.length !== 0) {
        imgUpload.classList.remove(Array.from(imgUpload.classList));
      }

      imgUpload.classList.add(`effects__preview--${evt.target.value}`);
      imgUpload.style = '';
      renderDefaultSlider();

      if (imgUpload.classList.contains('effects__preview--none')) {
        effectLevel.classList.add('hidden');
      } else {
        effectLevel.classList.remove('hidden');
      }
    }
  };

  window.effect = {
    onEffectChange,
    getSaturation: (saturationKey) => saturationFilterMap.get(saturationKey)
  };
})();
