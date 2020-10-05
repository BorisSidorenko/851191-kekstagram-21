'use strict';

(() =>{
  const picturesContainer = document.querySelector('.pictures');

  picturesContainer.appendChild(window.data.loadPhotos());
})();
