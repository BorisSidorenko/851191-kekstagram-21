'use strict';

(() => {
  const uploadForm = document.querySelector('.img-upload__form');
  const uploadPanel = uploadForm.querySelector('.img-upload__overlay');
  const imgUploadPreview = uploadPanel.querySelector('.img-upload__preview');
  const imgUpload = imgUploadPreview.querySelector('img');

  const effectLevel = uploadPanel.querySelector('.effect-level');

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

  window.effect = {
    onEffectChange
  };
})();
