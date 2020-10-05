'use strict';

(() =>{
  const IMG_COUNT_MAX = 25;

  const pictureTemplate = document.querySelector('#picture').content;
  const picturesContainer = document.querySelector('.pictures');

  const addPhotoToFragment = (fragment) => (photo) => fragment.appendChild(renderPicture(photo));

  const createPictureFragment = () => {
    const pictureFragment = document.createDocumentFragment();

    window.data.getPhotos(IMG_COUNT_MAX).forEach(addPhotoToFragment(pictureFragment));

    return pictureFragment;
  };

  const renderPicture = ({url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    return pictureElement;
  };

  picturesContainer.appendChild(createPictureFragment());
})();
