'use strict';

(() => {
  const main = document.querySelector('main');
  const uploadForm = document.querySelector('.img-upload__form');
  const uploadPanel = uploadForm.querySelector('.img-upload__overlay');
  const successFragment = document.querySelector('#success').content;
  const successPanelFragment = successFragment.querySelector('.success');

  let successPanel;
  let successButton;

  const showSuccessPanel = () => {
    successPanel = successPanelFragment.cloneNode(true);
    successButton = successPanel.querySelector('.success__button');

    main.appendChild(successPanel);

    successButton.addEventListener('click', onSuccessButtonClick);
    successPanel.addEventListener('click', onSuccessPanelClick);
    document.addEventListener('keydown', onSuccessPanelEscPress);
  };

  const removeSuccessPanel = () => {
    main.removeChild(successPanel);
    successButton.removeEventListener('click', onSuccessButtonClick);
    successPanel.removeEventListener('click', onSuccessPanelClick);
    document.removeEventListener('keydown', onSuccessPanelEscPress);
  };

  const onSuccessButtonClick = removeSuccessPanel;

  const onSuccessPanelClick = (evt) => {
    if (evt.target.className === successPanel.className) {
      removeSuccessPanel();
    }
  };

  const onSuccessPanelEscPress = (evt) => {
    window.utils.isEscEvent(evt, removeSuccessPanel);
  };

  const successHandler = () => {
    uploadPanel.classList.add('hidden');
    window.effect.setDefaultEffect();
    uploadForm.reset();
    showSuccessPanel();
  };

  window.success = {
    successHandler
  };
})();
