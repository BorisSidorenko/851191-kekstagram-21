'use strict';

const Photo = {
  LIKES_COUNT_MIN: 15,
  LIKES_COUNT_MAX: 200,
  COMMENTS_COUNT_MIN: 0,
  COMMENTS_COUNT_MAX: 10,
  URL_TEMPLATE: 'photos/.jpg',
  IMG_COUNT_MAX: 25,
  IMG_COUNT_MIN: 1
};

const Commentator = {
  NAMES: [
    'Алексей',
    'Таня',
    'Сеня',
    'Вовка',
    'Катерина',
    'Настя',
    'Колян',
    'Шурик',
    'Константин',
    'Надя',
    'Мария',
    'Ольга'
  ],
  MESSAGES: [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ],
  AVATAR_PATH_TEMPLATE: 'img/avatar-.svg',
  AVATAR_NUMBER_MIN: 1,
  AVATAR_NUMBER_MAX: 6
};

const Scale = {
  IMG_SCALE_DEFAULT: 100,
  IMG_SCALE_MAX: 100,
  IMG_SCALE_MIN: 25,
  IMG_SCALE_STEP: 25
};

const Effect = {
  SATURATION_MAX: 100,
  SATURATION_STEP: 1,
  SATURATION_STEP_SPECIAL: 33,
  LEVEL_PIN_POSITION: 100,
  LEVEL_DEPTH_WIDTH: 100,
  LEVEL_VALUE: 100
};

const Hashtag = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
  MAX_COUNT: 5,
  REGEX: /^#[a-zA-Z0-9]*$/
};

const HashtagValidationMessage = {
  FIRST_LETTER_INVALID: 'Хэштег должен начинаться с #',
  SPECIAL_CHARACTER: 'Хэштег не должен содержать спецсимволы - #, @, $ и т. п.'
};

const body = document.body;

const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');
const commentElementTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);

const uploadPanel = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const uploadFileInput = document.querySelector('#upload-file');
const uploadCancelButton = document.querySelector('#upload-cancel');

const scaleControlSmall = document.querySelector('.scale__control--smaller');
const scaleControlBig = document.querySelector('.scale__control--bigger');
const currentScale = document.querySelector('.scale__control--value');
currentScale.value = `${Scale.IMG_SCALE_DEFAULT}%`;

const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUpload = imgUploadPreview.querySelector('img');
const effectLevel = document.querySelector('.effect-level');
const effectLevelPin = effectLevel.querySelector('.effect-level__pin');
const effectLevelDepth = effectLevel.querySelector('.effect-level__depth');
const effectLevelValue = effectLevel.querySelector('.effect-level__value');

const hashtagInput = uploadForm.querySelector('.text__hashtags');

const getRandomNumberMaxToMin = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

const getPhotoPath = (number) => `photos/${number}.jpg`;

const getAvatarPath = (number) => `img/avatar-${number}.svg`;

const getCommentator = () => ({
  avatar: getAvatarPath(getRandomNumberMaxToMin(Commentator.AVATAR_NUMBER_MAX, Commentator.AVATAR_NUMBER_MIN)),
  message: Commentator.MESSAGES[getRandomNumberMaxToMin(Commentator.MESSAGES.length - 1)],
  name: Commentator.NAMES[getRandomNumberMaxToMin(Commentator.NAMES.length - 1)]
});

const getCommentators = (count) => new Array(count).fill(undefined).map(getCommentator);

const getPhoto = (index) => ({
  url: getPhotoPath(index + 1),
  description: '',
  likes: getRandomNumberMaxToMin(Photo.LIKES_COUNT_MAX, Photo.LIKES_COUNT_MIN),
  comments: getCommentators(getRandomNumberMaxToMin(Photo.COMMENTS_COUNT_MAX))
});

const getPhotos = (count) => new Array(count).fill(undefined).map((element, index) => getPhoto(index));

const addPhotoToFragment = (fragment) => (photo) => fragment.appendChild(renderPicture(photo));

const createPictureFragment = () => {
  const pictureFragment = document.createDocumentFragment();

  getPhotos(Photo.IMG_COUNT_MAX).forEach(addPhotoToFragment(pictureFragment));

  return pictureFragment;
};

const renderPicture = ({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

const hideCommentsCounter = () => document.querySelector('.social__comment-count').classList.add('hidden');

const hideCommentsLoader = () => document.querySelector('.comments-loader').classList.add('hidden');

const renderComments = (arrComments) => {
  const commentsFragment = document.createDocumentFragment();

  arrComments.forEach((commentator) => addCommentToFragment(commentsFragment, commentator));

  return commentsFragment;
};

const addCommentToFragment = (fragment, {avatar, name, message}) => {
  const commentElement = commentElementTemplate.cloneNode(true);
  commentElement.querySelector('img').src = avatar;
  commentElement.querySelector('img').alt = name;
  commentElement.querySelector('.social__text').textContent = message;
  fragment.appendChild(commentElement);
};

const removeDefaultComments = () => {
  Array.from(bigPicture.querySelectorAll('.social__comment')).forEach((element) => element.remove());
};

const rendenderPhotoAndComments = ({url, description, likes, comments}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__comments').appendChild(renderComments(comments));
  bigPicture.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (photo) => {
  removeDefaultComments();
  rendenderPhotoAndComments(photo);

  hideCommentsCounter();
  hideCommentsLoader();

  body.classList.toggle('modal-open');
  bigPicture.classList.toggle('hidden');
};

picturesContainer.appendChild(createPictureFragment());

const onEditPanelEscPress = (evt) => {
  if (evt.key === 'Escape' && document.activeElement !== hashtagInput) {
    closeEditPanel();
  }
};

const openEditPanel = () => {
  body.classList.toggle('modal-open');
  uploadPanel.classList.toggle('hidden');
  effectLevel.classList.toggle('hidden');

  document.addEventListener('keydown', onEditPanelEscPress);
  uploadCancelButton.addEventListener('click', onUploadCancelClick);
};

const closeEditPanel = () => {
  body.classList.toggle('modal-open');
  uploadPanel.classList.toggle('hidden');
  uploadFileInput.value = '';

  document.removeEventListener('keydown', onEditPanelEscPress);
  uploadCancelButton.removeEventListener('click', onUploadCancelClick);
};

const onUploadCancelClick = closeEditPanel;

const onUploadFileInputChange = openEditPanel;

uploadFileInput.addEventListener('change', onUploadFileInputChange);

const subtractScaleInput = () => {
  const scale = parseInt(currentScale.value.replace('%', ''), 10);
  return scale - Scale.IMG_SCALE_STEP < Scale.IMG_SCALE_MIN ? Scale.IMG_SCALE_MIN : scale - Scale.IMG_SCALE_STEP;
};

const addScaleInput = () => {
  const scale = parseInt(currentScale.value.replace('%', ''), 10);
  return scale + Scale.IMG_SCALE_STEP > Scale.IMG_SCALE_MAX ? Scale.IMG_SCALE_MAX : scale + Scale.IMG_SCALE_STEP;
};

const onScaleDown = () => {
  const scaleInputValue = subtractScaleInput();
  currentScale.value = `${scaleInputValue}%`;
  imgUploadPreview.style.transform = `scale(${scaleInputValue / Scale.IMG_SCALE_MAX})`;
};

const onScaleUp = () => {
  const scaleInputValue = addScaleInput();
  currentScale.value = `${scaleInputValue}%`;
  imgUploadPreview.style.transform = `scale(${scaleInputValue / Scale.IMG_SCALE_MAX})`;
};

scaleControlSmall.addEventListener('click', onScaleDown);

scaleControlBig.addEventListener('click', onScaleUp);

const renderDefaultSlider = () => {
  effectLevelPin.style.left = `${Effect.LEVEL_PIN_POSITION}%`;
  effectLevelDepth.style.width = `${Effect.LEVEL_DEPTH_WIDTH}%`;
  effectLevelValue.value = `${Effect.LEVEL_VALUE}`;
};

const onEffectChange = (evt) => {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    if (imgUpload.classList.length !== 0) {
      imgUpload.classList.remove(Array.from(imgUpload.classList));
    }

    imgUpload.classList.add(`effects__preview--${evt.target.value}`);
    imgUpload.style = '';
    renderDefaultSlider();

    if (imgUpload.classList.contains('effects__preview--none')) {
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');
    }
  }
};

uploadForm.addEventListener('change', onEffectChange);

const setGrayscale = () => `filter: grayscale(${effectLevelValue.value / Effect.SATURATION_MAX})`;
const setSepia = () => `filter: sepia(${effectLevelValue.value / Effect.SATURATION_MAX})`;
const setInvert = () => `filter: invert(${effectLevelValue.value}%)`;
const setBlur = () => `filter: blur(${Math.round(effectLevelValue.value / Effect.SATURATION_STEP_SPECIAL)}px)`;
const setBrightness = () => `filter: brightness(${Math.round(effectLevelValue.value / Effect.SATURATION_STEP_SPECIAL)})`;
const setOriginal = () => '';

const saturationFilterMap = new Map();
saturationFilterMap.set("effects__preview--chrome", setGrayscale());
saturationFilterMap.set("effects__preview--sepia", setSepia());
saturationFilterMap.set("effects__preview--marvin", setInvert());
saturationFilterMap.set("effects__preview--phobos", setBlur());
saturationFilterMap.set("effects__preview--heat", setBrightness());
saturationFilterMap.set("effects__preview--none", setOriginal());

const onSaturationChange = () => {
  const [saturationKey] = Array.from(imgUpload.classList);
  imgUpload.style = saturationFilterMap.get(saturationKey);
};

effectLevelPin.addEventListener('mouseup', onSaturationChange);

const getHashtagTooShortMessage = (hashtag) => `Ещё минимум ${Hashtag.MIN_LENGTH - hashtag.length} симв.`;

const getHashtagTooLongMessage = (hashtag) => `Удалите лишние ${hashtag.length - Hashtag.MAX_LENGTH} симв.`;

const getTooManyHashtagsMessage = () => `Можно ввести только ${Hashtag.MAX_COUNT} хэштегов`;

const getHashtagDuplicateMessage = (hashtag) => `Вы ввели ${hashtag} хэштег более одного раза`;

const setHashtagValidationMessage = (hashtag, index, hashtags) => {
  const [firstLetter] = hashtag;
  if (firstLetter !== '' && firstLetter !== '#') {
    hashtagInput.setCustomValidity(HashtagValidationMessage.FIRST_LETTER_INVALID);
  } else if (hashtag.length < Hashtag.MIN_LENGTH) {
    hashtagInput.setCustomValidity(getHashtagTooShortMessage(hashtag));
  } else if (hashtag.length > Hashtag.MAX_LENGTH) {
    hashtagInput.setCustomValidity(getHashtagTooLongMessage(hashtag));
  } else if (!Hashtag.REGEX.test(hashtag)) {
    hashtagInput.setCustomValidity(HashtagValidationMessage.SPECIAL_CHARACTER);
  } else if (index >= Hashtag.MAX_COUNT) {
    hashtagInput.setCustomValidity(getTooManyHashtagsMessage());
  } else if (hashtags.some((element, innerIndex) => element.toLowerCase() === hashtag.toLowerCase() && element[innerIndex] !== hashtag[index])) {
    hashtagInput.setCustomValidity(getHashtagDuplicateMessage(hashtag));
  } else {
    hashtagInput.setCustomValidity('');
  }

  hashtagInput.reportValidity();
};

const onHashtagInput = () => {
  const hashtags = hashtagInput.value.split(' ');

  hashtags.forEach((hashtag, index, arr) => setHashtagValidationMessage(hashtag, index, arr));
};

hashtagInput.addEventListener('input', onHashtagInput);
