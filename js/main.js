'use strict';

const picturesContainer = document.querySelector(`.pictures`);

picturesContainer.addEventListener(`click`, window.preview.onClick);
picturesContainer.addEventListener(`keydown`, window.preview.onEnterPress);
