'use strict';

const IMAGES_COUNT = 25;
const LIKES_COUNT_MIN = 15;
const LIKES_COUNT_MAX = 200;

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

const getRandomAvatar = () => {
  const position = Commentator.AVATAR_PATH_TEMPLATE.indexOf('.');

  const avatarPath = Commentator.AVATAR_PATH_TEMPLATE.substring(0, position)
    + getRandomNumber(Commentator.AVATAR_NUMBER_MIN, Commentator.AVATAR_NUMBER_MAX)
    + Commentator.AVATAR_PATH_TEMPLATE.substring(position);

  return avatarPath;
};

const getCommentator = () => {
  const objCommentator = {
    avatar: getRandomAvatar(),
    message: getRandomArrValue(Commentator.MESSAGES),
    name: getRandomArrValue(Commentator.NAMES)
  };

  return objCommentator;
};

console.log(getCommentator());
