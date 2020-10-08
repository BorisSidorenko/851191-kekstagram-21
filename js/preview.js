'use strict';

(() => {
  const bigPicture = document.querySelector('.big-picture');
  const closePictureButton = bigPicture.querySelector('.cancel');
  const commentElementTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);

  const renderComments = (arrComments) => {
    const commentsFragment = document.createDocumentFragment();

    arrComments.forEach((commentator) => addCommentToFragment(commentsFragment, commentator));

    return commentsFragment;
  };

  const removeDefaultComments = () => {
    Array.from(bigPicture.querySelectorAll('.social__comment')).forEach((element) => element.remove());
  };

  const hideCommentsCounter = () => document.querySelector('.social__comment-count').classList.add('hidden');

  const hideCommentsLoader = () => document.querySelector('.comments-loader').classList.add('hidden');

  const rendenderPhotoAndComments = ({url, description, likes, comments}) => {
    bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    bigPicture.querySelector('.social__comments').appendChild(renderComments(comments));
    bigPicture.querySelector('.social__caption').textContent = description;
  };

  const hideBigPicture = () => {
    document.body.classList.toggle('modal-open');
    bigPicture.classList.toggle('hidden');
    document.removeEventListener('keydown', onBigPictureEscPress);
    closePictureButton.removeEventListener('click', onClosePictureButtonClick);
  };

  const onBigPictureEscPress = (evt) => window.utils.isEscEvent(evt, hideBigPicture);

  const onPreviewEnterPress = (evt) => window.utils.isEnterEvent(evt, showBigPicture);

  const onClosePictureButtonClick = hideBigPicture;

  const showBigPicture = (evt) => {
    const pictureNumber = evt.target.dataset.number ? evt.target.dataset.number : evt.target.parentElement.dataset.number;
    if (pictureNumber) {
      removeDefaultComments();
      rendenderPhotoAndComments(window.data.loadPhoto(parseInt(pictureNumber, 10)));

      hideCommentsCounter();
      hideCommentsLoader();

      document.activeElement.blur();

      document.body.classList.toggle('modal-open');
      bigPicture.classList.toggle('hidden');
      document.addEventListener('keydown', onBigPictureEscPress);
      closePictureButton.addEventListener('click', onClosePictureButtonClick);
    }
  };

  const addCommentToFragment = (fragment, {avatar, name, message}) => {
    const commentElement = commentElementTemplate.cloneNode(true);
    commentElement.querySelector('img').src = avatar;
    commentElement.querySelector('img').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    fragment.appendChild(commentElement);
  };

  window.preview = {
    onPictureClick: showBigPicture,
    onPictureEnterPress: onPreviewEnterPress
  };
})();
