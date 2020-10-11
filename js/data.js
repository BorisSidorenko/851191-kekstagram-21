'use strict';

(() => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content;

  let loadedPhotos = [];

  const getPhoto = (path) => loadedPhotos.find((photo) => photo.url.includes(path));

  const addPhotoToFragment = (fragment) => (photo) => fragment.appendChild(renderPicture(photo));

  const renderPicture = ({url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const picturePath = url;

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture').dataset.path = picturePath;

    return pictureElement;
  };

  const successHandler = (photos) => {
    loadedPhotos = photos;
    const pictureFragment = document.createDocumentFragment();
    loadedPhotos.forEach(addPhotoToFragment(pictureFragment));
    picturesContainer.appendChild(pictureFragment);
  };

  const errorHandler = (errorMessage) => {
    var element = document.createElement('div');

    element.style.position = 'absolute';
    element.style.top = '25px';
    element.style.left = '245px';
    element.style.right = '245px';
    element.style.zIndex = 1;
    element.style.textAlign = 'center';
    element.style.backgroundColor = 'tomato';
    element.style.fontSize = '15px';

    element.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', element);
  };

  window.backend.load(successHandler, errorHandler);

  window.data = {
    getPhoto
  };
})();
