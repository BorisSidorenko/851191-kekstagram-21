'use strict';

(() => {
  const Photo = {
    LIKES_COUNT_MIN: 15,
    LIKES_COUNT_MAX: 200,
    COMMENTS_COUNT_MAX: 10,
    URL_TEMPLATE: 'photos/.jpg'
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

  const getPhotoPath = (number) => `photos/${number}.jpg`;

  const getAvatarPath = (number) => `img/avatar-${number}.svg`;

  const getCommentator = () => ({
    avatar: getAvatarPath(window.util.getRandomNumberMaxToMin(Commentator.AVATAR_NUMBER_MAX, Commentator.AVATAR_NUMBER_MIN)),
    message: Commentator.MESSAGES[window.util.getRandomNumberMaxToMin(Commentator.MESSAGES.length - 1)],
    name: Commentator.NAMES[window.util.getRandomNumberMaxToMin(Commentator.NAMES.length - 1)]
  });

  const getPhoto = (index) => ({
    url: getPhotoPath(index + 1),
    description: '',
    likes: window.util.getRandomNumberMaxToMin(Photo.LIKES_COUNT_MAX, Photo.LIKES_COUNT_MIN),
    comments: window.data.getCommentators(window.util.getRandomNumberMaxToMin(Photo.COMMENTS_COUNT_MAX))
  });

  window.data = {
    getCommentators: (count) => new Array(count).fill(undefined).map(getCommentator),
    getPhotos: (count) => new Array(count).fill(undefined).map((element, index) => getPhoto(index))
  };
})();
