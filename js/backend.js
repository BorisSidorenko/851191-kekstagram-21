'use strict';

const GET_URL = `https://21.javascript.pages.academy/kekstagram/data`;
const SEND_URL = `https://21.javascript.pages.academy/kekstagram`;
const TIMEOUT_MS = 10000;

const StatusCode = {
  OK: 200
};

const generateTextError = (code, text) => `Статус ответа: ${code} ${text}`;

const onLoadComplete = (xhr, onLoad, onError) => () => {
  if (xhr.status === StatusCode.OK) {
    onLoad(xhr.response);
  } else {
    onError(generateTextError(xhr.status, xhr.statusText));
  }
};

const onFail = (onError) => () => onError(`Произошла ошибка соединения`);

const onTimeout = (xhr, onError) => () => onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);

const getNewXhr = () => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT_MS;
  return xhr;
};

const load = (onLoad, onError) => {
  const xhr = getNewXhr();

  xhr.addEventListener(`load`, onLoadComplete(xhr, onLoad, onError));

  xhr.addEventListener(`error`, onFail(onError));

  xhr.addEventListener(`timeout`, onTimeout(xhr, onError));

  xhr.open(`GET`, GET_URL);
  xhr.send();
};

const save = (data, onLoad, onError) => {
  const xhr = getNewXhr();

  xhr.addEventListener(`load`, onLoadComplete(xhr, onLoad, onError));

  xhr.open(`POST`, SEND_URL);
  xhr.send(data);
};

window.backend = {
  load,
  save
};
