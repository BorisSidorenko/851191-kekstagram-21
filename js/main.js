'use strict';

const Photo = {
  LIKES_COUNT_MIN: 15,
  LIKES_COUNT_MAX: 200,
  COMMENTS_COUNT_MIN: 0,
  COMMENTS_COUNT_MAX: 6,
  URL_TEMPLATE: 'photos/.jpg',
  IMG_NAMES: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
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

const pictureTemplate = document.querySelector('#picture').content;
const picturesContainer = document.querySelector('.pictures');

const getRandomArrValue = (arrLength) => Math.floor(Math.random() * arrLength);

const getRandomNumberMaxToMin = (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min);

const getImgPath = (template, namesArr, isUnique = false) => {
  const position = template.indexOf('.');
  const name = namesArr[getRandomArrValue(namesArr.length)];
  const path = template.substring(0, position) + name + template.substring(position);

  if (isUnique) {
    namesArr.splice(namesArr.indexOf(name), 1);
  }

  return path;
};

const getPhotoPath = (number) => `photos/${number}.jpg`;

const getAvatarPath = (number) => `img/avatar-${number}.svg`;

const getCommentator = () => ({
    avatar: getAvatarPath(Commentator.AVATAR_NUMBER_MAX, Commentator.AVATAR_NUMBER_MIN),
    message: Commentator.MESSAGES[getRandomArrValue(Commentator.MESSAGES.length)],
    name: Commentator.NAMES[getRandomArrValue(Commentator.NAMES.length)]
});

const getCommentators = (count) => new Array(count).fill(undefined).map(getCommentator);

const getPhoto = () => ({
  url: getImgPath(Photo.URL_TEMPLATE, Photo.IMG_NAMES, true),
  description: '',
  likes: getRandomNumberMaxToMin(Photo.LIKES_COUNT_MAX, Photo.LIKES_COUNT_MIN),
  comments: getCommentators(getRandomNumberMaxToMin(Photo.COMMENTS_COUNT_MAX))
});

const getPhotos = (count) => new Array(count).fill(undefined).map(getPhoto);

const addPhotoToFragment = (fragment) => (photo) => fragment.appendChild(renderPicture(photo));

const createPictureFragment = () => {
  const pictureFragment = document.createDocumentFragment();

  getPhotos(Photo.IMG_COUNT_MAX).forEach(addPhotoToFragment(pictureFragment));

  return pictureFragment;
};

const renderPicture = (photo) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = photo.url;
  pictureElement.querySelector('.picture__likes').textContent = photo.likes;
  pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;

  return pictureElement;
};

picturesContainer.appendChild(createPictureFragment());
