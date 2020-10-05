'use strict';

(() => {
  const KeyCode = {
    ESC_CODE: 'Escape'
  };

  window.util = {
    isEscEvent: (evt, action) => {
      if (evt.key === KeyCode.ESC_CODE) {
        action();
      }
    },
    getRandomNumberMaxToMin: (max, min = 0) => Math.floor(Math.random() * (max - min + 1) + min)
  };
})();
