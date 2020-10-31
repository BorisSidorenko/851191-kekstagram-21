'use strict';

const picturesContainer = document.querySelector(`.pictures`);

picturesContainer.addEventListener(`click`, window.preview.onPictureClick);
picturesContainer.addEventListener(`keydown`, window.preview.onPictureEnterPress);
