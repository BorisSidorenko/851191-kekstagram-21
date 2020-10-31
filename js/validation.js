'use strict';

const Hashtag = {
  MIN_LENGTH: 2,
  MAX_LENGTH: 20,
  MAX_COUNT: 5,
  REGEX: /^#[а-яА-яa-zA-Z0-9]*$/
};

const HashtagValidationMessage = {
  FIRST_LETTER_INVALID: `Хэштег должен начинаться с #`,
  SPECIAL_CHARACTER: `Хэштег не должен содержать спецсимволы - #, @, $ и т. п.`
};

const uploadForm = document.querySelector(`.img-upload__form`);
const uploadPanel = uploadForm.querySelector(`.img-upload__overlay`);
const hashtagInput = uploadPanel.querySelector(`.text__hashtags`);

const getHashtagTooShortMessage = (hashtag) => `Ещё минимум ${Hashtag.MIN_LENGTH - hashtag.length} симв.`;

const getHashtagTooLongMessage = (hashtag) => `Удалите лишние ${hashtag.length - Hashtag.MAX_LENGTH} симв.`;

const getTooManyHashtagsMessage = () => `Можно ввести только ${Hashtag.MAX_COUNT} хэштегов`;

const getHashtagDuplicateMessage = (hashtag) => `Вы ввели ${hashtag} хэштег более одного раза`;

window.validation = {
  setHashtagValidationMessage: (hashtag, index, hashtags) => {
    const [firstLetter] = hashtag;

    if (!firstLetter) {
      hashtagInput.setCustomValidity(``);
    } else if (firstLetter !== `#`) {
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
      hashtagInput.setCustomValidity(``);
    }

    if (!hashtagInput.reportValidity()) {
      hashtagInput.style.outlineColor = `tomato`;
    } else {
      hashtagInput.style.outlineColor = `black`;
    }
  }
};
