'use strict';

const inputUpload = document.querySelector('#upload-file');
const previewContainer = document.querySelector('.img-upload__preview');
const preview = previewContainer.querySelector('img');

const acceptedTypes = inputUpload.accept.split(',');
const previewDefaultSrc = preview.src;

const onFileLoad = (evt) => preview.src = evt.target.result;

const onInputUploadChange = () => {
  const [file] = inputUpload.files;

  const isTypeAllowed = acceptedTypes.some((type) => type.trim() === file.type);

  if (isTypeAllowed) {
    const reader = new FileReader();

    reader.addEventListener('load', onFileLoad);

    reader.readAsDataURL(file);
  } else {
    preview.src = previewDefaultSrc;
  }
};

inputUpload.addEventListener('change', onInputUploadChange);
