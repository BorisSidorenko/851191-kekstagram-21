'use strict';

(() => {
  const GET_URL = 'https://21.javascript.pages.academy/kekstagram/data';
  const TIMEOUT_MS = 10000;

  const StatusCode = {
    OK: 200
  };

  const onLoadComplete = (xhr, onLoad, onError) => () => {
    if (xhr.status === StatusCode.OK) {
      onLoad(xhr.response);
    } else {
      onError(`Статус ответа: ${xhr.status} ${xhr.statusText}`);
    }
  };

  const onFail = (onError) => () => onError('Произошла ошибка соединения');

  const onTimeout = (xhr, onError) => () => onError(`Запрос не успел выполниться за ${xhr.timeout}мс`);

  const load = (onLoad, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_MS;

    xhr.addEventListener('load', onLoadComplete(xhr, onLoad, onError));

    xhr.addEventListener('error', onFail(onError));

    xhr.addEventListener('timeout', onTimeout(xhr, onError));

    xhr.open('GET', GET_URL);
    xhr.send();
  };

  window.backend = {
    load
  };
})();
