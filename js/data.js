'use strict';

const picturesContainer = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`).content;
const filter = document.querySelector(`.img-filters`);

let loadedPhotos = [];

const getPhoto = (path) => loadedPhotos.find((photo) => photo.url.includes(path));

const addPhotoToFragment = (fragment) => (photo) => fragment.appendChild(renderPicture(photo));

const renderPicture = ({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  const picturePath = url;

  pictureElement.querySelector(`.picture__img`).src = url;
  pictureElement.querySelector(`.picture__likes`).textContent = likes;
  pictureElement.querySelector(`.picture__comments`).textContent = comments.length;
  pictureElement.querySelector(`.picture`).dataset.path = picturePath;

  return pictureElement;
};

const renderPhotos = (photos) => {
  const pictureFragment = document.createDocumentFragment();
  photos.forEach(addPhotoToFragment(pictureFragment));
  picturesContainer.appendChild(pictureFragment);
};

const updatePhotos = (evt) => {
  window.filter.applyFilter(evt, loadedPhotos);
};

window.filter.filterChangeHandler(window.debounce((evt) => {
  updatePhotos(evt);
}));

const successHandler = (photos) => {
  loadedPhotos = photos;
  renderPhotos(loadedPhotos);
  filter.classList.remove(`img-filters--inactive`);
};

const errorHandler = (errorMessage) => {
  const element = document.createElement(`div`);

  element.style.position = `absolute`;
  element.style.top = `25px`;
  element.style.left = `245px`;
  element.style.right = `245px`;
  element.style.zIndex = 1;
  element.style.textAlign = `center`;
  element.style.backgroundColor = `tomato`;
  element.style.fontSize = `15px`;

  element.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, element);
};

window.backend.load(successHandler, errorHandler);

window.data = {
  getPhoto,
  renderPhotos
};
