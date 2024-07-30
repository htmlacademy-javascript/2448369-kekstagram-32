const uploadImg = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const uploadImgCancel = uploadOverlay.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

uploadImg.addEventListener('change', () => {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
});

const isEscapeKey = (evt) => evt.key === 'Escape';

const closeUploadInput = () => {
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadInput();
  }
}

function resetForm () {
  uploadImg.value = ''; // Сбрасываем значение поля выбора файла
  document.querySelector('#upload-select-image').reset(); // Сбрасываем все значения полей формы
}

uploadImgCancel.addEventListener('click', closeUploadInput);

