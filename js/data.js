'use strict';

(() => {
  const Photo = {
    LIKES_COUNT_MIN: 15,
    LIKES_COUNT_MAX: 200,
    COMMENTS_COUNT_MAX: 10,
    URL_TEMPLATE: 'photos/.jpg',
    IMG_COUNT_MAX: 25
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

  const getPhotoPath = (name) => `photos/${name}.jpg`;

  const getAvatarPath = (name) => `img/avatar-${name}.svg`;

  const getCommentator = () => ({
    avatar: getAvatarPath(window.utils.getRandomNumberMaxToMin(Commentator.AVATAR_NUMBER_MAX, Commentator.AVATAR_NUMBER_MIN)),
    message: Commentator.MESSAGES[window.utils.getRandomNumberMaxToMin(Commentator.MESSAGES.length - 1)],
    name: Commentator.NAMES[window.utils.getRandomNumberMaxToMin(Commentator.NAMES.length - 1)]
  });

  const getPhoto = (index) => ({
    url: getPhotoPath(index + 1),
    description: '',
    likes: window.utils.getRandomNumberMaxToMin(Photo.LIKES_COUNT_MAX, Photo.LIKES_COUNT_MIN),
    comments: getCommentators(window.utils.getRandomNumberMaxToMin(Photo.COMMENTS_COUNT_MAX))
  });

  const getCommentators = (count) => new Array(count).fill(undefined).map(getCommentator);

  const getPhotos = (count) => new Array(count).fill(undefined).map((element, index) => getPhoto(index));

  const addPhotoToFragment = (fragment) => (photo) => fragment.appendChild(renderPicture(photo));

  const renderPicture = ({url, likes, comments}) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;

    return pictureElement;
  };

  window.data = {
    loadPhotos: () => {
      const pictureFragment = document.createDocumentFragment();

      getPhotos(Photo.IMG_COUNT_MAX).forEach(addPhotoToFragment(pictureFragment));

      return pictureFragment;
    }
  };
})();
