'use strict';

(() => {
  const Effect = {
    SATURATION_MAX: 100,
    SATURATION_STEP: 1,
    SATURATION_STEP_SPECIAL: 33,
    LEVEL_PIN_POSITION: 100,
    LEVEL_DEPTH_WIDTH: 100,
    LEVEL_VALUE: 100,
    BRIGHTNESS_MIN: 1,
    BRIGHTNESS_MAX: 3
  };

  const uploadForm = document.querySelector('.img-upload__form');
  const imgUploadPreview = uploadForm.querySelector('.img-upload__preview');
  const imgUpload = imgUploadPreview.querySelector('img');

  const slider = uploadForm.querySelector('.effect-level');
  const sliderlInput = slider.querySelector('.effect-level__value');
  const sliderLine = slider.querySelector('.effect-level__line');
  const sliderPin = sliderLine.querySelector('.effect-level__pin');
  const sliderDepth = sliderLine.querySelector('.effect-level__depth');

  const SLIDER_MAX_VALUE = 100;
  const SLIDER_MIN_VALUE = 0;

  const startCoords = {
    x: 0,
    y: 0
  };

  const setGrayscale = (saturationValue) => `filter: grayscale(${saturationValue / Effect.SATURATION_MAX})`;
  const setSepia = (saturationValue) => `filter: sepia(${saturationValue / Effect.SATURATION_MAX})`;
  const setInvert = (saturationValue) => `filter: invert(${saturationValue}%)`;

  const setBlur = (saturationValue) => {
    const blur = saturationValue / Effect.SATURATION_STEP_SPECIAL;
    return `filter: blur(${blur > Effect.BRIGHTNESS_MAX ? Math.round(blur) : blur}px)`;
  };

  const setBrightness = (saturationValue) => {
    let brightnessValue = saturationValue / Effect.SATURATION_STEP_SPECIAL;

    if (brightnessValue < Effect.BRIGHTNESS_MIN) {
      brightnessValue = Effect.BRIGHTNESS_MIN;
    } else if (brightnessValue > Effect.BRIGHTNESS_MAX) {
      brightnessValue = Math.round(Effect.BRIGHTNESS_MAX);
    }

    return `filter: brightness(${brightnessValue})`;
  };

  const setOriginal = () => '';

  const saturationFilterMap = new Map([
    ["effects__preview--chrome", setGrayscale],
    ["effects__preview--sepia", setSepia],
    ["effects__preview--marvin", setInvert],
    ["effects__preview--phobos", setBlur],
    ["effects__preview--heat", setBrightness],
    ["effects__preview--none", setOriginal],
  ]);

  const getSaturation = (saturationKey) => saturationFilterMap.get(saturationKey);

  const onMouseMove = (moveEvt) => {
    moveEvt.preventDefault();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords.x = moveEvt.clientX;
    startCoords.y = moveEvt.clientY;

    setNewPinPosition(shift);
  };

  const setNewPinPosition = (shift) => {
    const sliderLineLength = getComputedStyle(sliderLine).width.replace('px', '');
    const currentPinPosition = sliderPin.offsetLeft - shift.x;

    let newPinPosition = 0;
    if (currentPinPosition >= sliderLineLength) {
      newPinPosition = sliderLineLength;
    } else if (currentPinPosition <= SLIDER_MIN_VALUE) {
      newPinPosition = SLIDER_MIN_VALUE;
    } else {
      newPinPosition = currentPinPosition;
    }

    const newPositionRounded = newPinPosition * 100 / sliderLineLength;

    sliderPin.style.left = `${newPositionRounded}%`;
    sliderDepth.style.width = `${Math.round(newPositionRounded)}%`;
    sliderlInput.value = Math.round(newPositionRounded);

    changeSaturation(sliderlInput.value);
  };

  const changeSaturation = (saturationValue) => {
    const [saturationKey] = Array.from(imgUpload.classList);
    imgUpload.style = getSaturation(saturationKey)(saturationValue);
  };

  const onMouseUp = (evt) => {
    evt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  const onSliderPinMouseDown = (evt) => {
    evt.preventDefault();

    startCoords.x = evt.clientX;
    startCoords.y = evt.clientY;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const renderDefaultSlider = () => {
    sliderPin.style.left = `${SLIDER_MAX_VALUE}%`;
    sliderDepth.style.width = `${SLIDER_MAX_VALUE}%`;
    sliderlInput.value = `${SLIDER_MAX_VALUE}`;
  };

  sliderPin.addEventListener('mousedown', onSliderPinMouseDown);

  window.slider = {
    renderDefaultSlider
  };
})();
