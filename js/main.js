'use strict';

const picturesContainer = document.querySelector('.pictures');

picturesContainer.addEventListener('click', window.preview.onPreviewClick);
picturesContainer.addEventListener('keydown', window.preview.onPreviewEnterPress);
