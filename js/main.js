'use strict';

const Photo = {
  LIKES_COUNT_MIN: 15,
  LIKES_COUNT_MAX: 200,
  COMMENTS_COUNT_MIN: 1,
  COMMENT_COUNT_MAX: 6,
  URL_TEMPLATE: 'photos/.jpg',
  IMG_INDEX_MIN: 1,
  IMG_INDEX_MAX: 25,
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

const getRandomArrValue = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const getImgPath = (template, min, max) => {
  const position = template.indexOf('.');

  const path = template.substring(0, position) + getRandomNumber(min, max) + template.substring(position);

  return path;
};

const getCommentator = (count) => {
  const commentatorsArr = [];

  for (let i = 0; i < count; i++) {
    const objCommentator = {
      avatar: getImgPath(Commentator.AVATAR_PATH_TEMPLATE, Commentator.AVATAR_NUMBER_MIN, Commentator.AVATAR_NUMBER_MAX),
      message: getRandomArrValue(Commentator.MESSAGES),
      name: getRandomArrValue(Commentator.NAMES)
    };

    commentatorsArr.push(objCommentator);
  }

  return commentatorsArr;
};

const getPhoto = () => {
  const photo = {
    url: getImgPath(Photo.URL_TEMPLATE, Photo.IMG_INDEX_MIN, Photo.IMG_INDEX_MAX),
    description: '',
    likes: getRandomNumber(Photo.LIKES_COUNT_MIN, Photo.LIKES_COUNT_MAX),
    comments: getCommentator(getRandomNumber(Photo.COMMENTS_COUNT_MIN, Photo.COMMENT_COUNT_MAX))
  };

  return photo;
};

