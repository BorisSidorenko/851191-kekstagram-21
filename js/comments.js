'use strict';

const COMMENTS_TO_SHOW_COUNT = 5;

const bigPicture = document.querySelector('.big-picture');
const commentElementTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');

let allComments = [];
let shownComments = [];
let commentsLoaderClickCounter = 1;

const renderComments = (arrComments) => {
  const socialComments = bigPicture.querySelector('.social__comments');
  const commentsFragment = document.createDocumentFragment();

  arrComments.forEach((commentator) => addCommentToFragment(commentsFragment, commentator));

  socialComments.innerHTML = ``;
  socialComments.appendChild(commentsFragment);
};

const getCommentsToShow = (comments) => comments.slice(0, COMMENTS_TO_SHOW_COUNT * commentsLoaderClickCounter);

const updateOutOfCommentsCount = (newCount) => {
  const [count] = socialCommentsCount.innerHTML.split(` `);
  socialCommentsCount.innerHTML = socialCommentsCount.innerHTML.replace(count, newCount);
};

const onCommentsLoaderClick = () => {
  commentsLoaderClickCounter++;
  shownComments = getCommentsToShow(allComments);

  if (shownComments.length === allComments.length) {
    disableLastCommentsLoader();
  }

  renderComments(shownComments);
  updateOutOfCommentsCount(shownComments.length);
};

const enableCommentsLoader = (comments) => {
  if (comments.length > COMMENTS_TO_SHOW_COUNT) {
    disableLastCommentsLoader();

    socialCommentsCount.classList.remove('hidden');
    commentsLoaderButton.classList.remove('hidden');
    commentsLoaderButton.addEventListener('click', onCommentsLoaderClick);
  } else {
    socialCommentsCount.classList.add('hidden');
    commentsLoaderButton.classList.add('hidden');
  }
};

const disableLastCommentsLoader = () => {
  commentsLoaderClickCounter = 1;
  commentsLoaderButton.classList.add('hidden');
  commentsLoaderButton.removeEventListener('click', onCommentsLoaderClick);
};

const rendenderPhotoAndComments = ({url, description, likes, comments}) => {
  allComments = comments;
  shownComments = getCommentsToShow(allComments);
  updateOutOfCommentsCount(shownComments.length);

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  renderComments(shownComments);
  bigPicture.querySelector('.social__caption').textContent = description;

  enableCommentsLoader(allComments);
};

const addCommentToFragment = (fragment, {avatar, name, message}) => {
  const commentElement = commentElementTemplate.cloneNode(true);

  commentElement.querySelector('img').src = avatar;
  commentElement.querySelector('img').alt = name;
  commentElement.querySelector('.social__text').textContent = message;

  fragment.appendChild(commentElement);
};

window.comments = {
  rendenderPhotoAndComments
};
