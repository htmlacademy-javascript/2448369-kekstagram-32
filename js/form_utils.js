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
  if (isEscapeKey(evt) && !document.activeElement.classList.contains('text__hashtags')) {
    evt.preventDefault();
    closeUploadInput();
  }
}

function resetForm() {
  uploadImg.value = ''; // Сбрасываем значение поля выбора файла
  document.querySelector('#upload-select-image').reset(); // Сбрасываем все значения полей формы
}

uploadImgCancel.addEventListener('click', closeUploadInput);

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

pristine.addValidator(hashtagField, (value) => {
  if (!value) {
    return true; // Хэштеги необязательны
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > 5) {
    return false; // нельзя указать больше пяти хэштегов
  }

  const hashtagPattern = /^#[a-za-яё0-9]{1,19}$/i;
  const uniqueHashtags = new Set();

  for (let hashtag of hashtags) {
    if (!hashtagPattern.test(hashtag)) {
      return false; // валидация каждого хэштега по условиям
    }
    if (uniqueHashtags.has(hashtag.toLowerCase())) {
      return false; // один и тот же хэштег не может быть использован дважды
    }
    uniqueHashtags.add(hashtag.toLowerCase());
  }

  return true;
}, 'Некорректный хэштег. Хэштег должен начинаться с символа # и содержать только буквы и цифры, максимум 20 символов, и не может повторяться.');

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    // Отправка формы
    form.submit();
  }
});
