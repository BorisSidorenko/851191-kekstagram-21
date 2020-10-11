
'use strict';

(() =>{
  const picturesContainer = document.querySelector('.pictures');

  picturesContainer.appendChild(window.data.loadPhotos());

  picturesContainer.addEventListener('click', window.preview.onPreviewClick);
  picturesContainer.addEventListener('keydown', window.preview.onPreviewEnterPress);
})();
