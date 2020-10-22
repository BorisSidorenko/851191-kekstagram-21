'use strict';

(() => {
  const COMMENTS_TO_SHOW_COUNT = 5;

  const bigPicture = document.querySelector('.big-picture');
  const commentElementTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);
  const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
  const commentsLoaderButton = bigPicture.querySelector('.comments-loader');

  let allComments = [];
  let shownComments = [];

  const renderComments = (arrComments) => {
    const socialComments = bigPicture.querySelector('.social__comments');
    const commentsFragment = document.createDocumentFragment();

    arrComments.forEach((commentator) => addCommentToFragment(commentsFragment, commentator));

    socialComments.innerHTML = ``;
    socialComments.appendChild(commentsFragment);
  };

  const removeDefaultComments = () => {
    Array.from(bigPicture.querySelectorAll('.social__comment')).forEach((element) => element.remove());
  };

  const getFirstNComments = (comments) => comments.slice(0, COMMENTS_TO_SHOW_COUNT);

  const appendComments = () => {
    shownComments = shownComments.concat(allComments.slice(shownComments.length, shownComments.length + COMMENTS_TO_SHOW_COUNT));

    if (shownComments.length === allComments.length) {
      disableCommentsLoader();
    }

    renderComments(shownComments);
  };

  const onCommentsLoaderClick = appendComments;

  const enableCommentsLoader = (comments) => {
    if (comments.length > COMMENTS_TO_SHOW_COUNT) {
      socialCommentsCount.classList.remove('hidden');
      commentsLoaderButton.classList.remove('hidden');
      commentsLoaderButton.addEventListener('click', onCommentsLoaderClick);
    } else {
      socialCommentsCount.classList.add('hidden');
    }
  };

  const disableCommentsLoader = () => {
    commentsLoaderButton.classList.add('hidden');
    commentsLoaderButton.removeEventListener('click', onCommentsLoaderClick);
  };

  const rendenderPhotoAndComments = ({url, description, likes, comments}) => {
    allComments = comments;
    shownComments = getFirstNComments(comments);

    bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.comments-count').textContent = comments.length;
    renderComments(shownComments);
    bigPicture.querySelector('.social__caption').textContent = description;
  };

  const addCommentToFragment = (fragment, {avatar, name, message}) => {
    const commentElement = commentElementTemplate.cloneNode(true);
    commentElement.querySelector('img').src = avatar;
    commentElement.querySelector('img').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    fragment.appendChild(commentElement);
  };

  window.comments = {
    removeDefaultComments,
    enableCommentsLoader,
    rendenderPhotoAndComments,
    disableCommentsLoader
  };
})();
