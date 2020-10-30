'use strict';

const bigPicture = document.querySelector(`.big-picture`);
const closePictureButton = bigPicture.querySelector(`.cancel`);

const hideBigPicture = () => {
  document.body.classList.toggle(`modal-open`);
  bigPicture.classList.toggle(`hidden`);

  document.removeEventListener(`keydown`, onBigPictureEscPress);
  closePictureButton.removeEventListener(`click`, onClosePictureButtonClick);
};

const onBigPictureEscPress = (evt) => window.utils.isEscEvent(evt, hideBigPicture);

const onPreviewEnterPress = (evt) => window.utils.isEnterEvent(evt, showBigPicture);

const onClosePictureButtonClick = hideBigPicture;

const showBigPicture = (evt) => {
  const picturePath = evt.target.dataset.path ? evt.target.dataset.path : evt.target.parentElement.dataset.path;

  if (picturePath) {
    const photo = window.data.getPhoto(picturePath);

    window.comments.rendenderPhotoAndComments(photo);

    document.activeElement.blur();

    document.body.classList.toggle(`modal-open`);
    bigPicture.classList.toggle(`hidden`);
    document.addEventListener(`keydown`, onBigPictureEscPress);
    closePictureButton.addEventListener(`click`, onClosePictureButtonClick);
  }
};

const onPreviewClick = showBigPicture;

window.preview = {
  onPreviewClick,
  onPreviewEnterPress
};
