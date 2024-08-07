import { resetScale } from './scale';
import { setEffect, resetSlider } from './effects';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const publishButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};
const uploadImg = document.querySelector('.img-upload__input[type=file]');
const preview = document.querySelector('.img-upload__preview img');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const bodyElement = document.body;
const uploadImgCancel = uploadOverlay.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const publishButton = form.querySelector('.img-upload__submit');

uploadImg.addEventListener('change', () => {
  openUploadInput();
  const file = uploadImg.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

function openUploadInput() {
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
  updatePublishButton(); // Обновляем состояние кнопки при открытии модального окна
  setEffect();
}

const isEscapeKey = (evt) => evt.key === 'Escape';

const closeUploadInput = () => {
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetForm();
  resetScale();
  resetSlider();
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    if (document.activeElement === hashtagField || document.activeElement === commentField) {
      evt.stopPropagation(); // Предотвращает выполнение обработчиков событий
      return;
    }
    evt.preventDefault();
    closeUploadInput();
  }
}

function resetForm() {
  uploadImg.value = '';
  form.reset();
  preview.src = '';
  updatePublishButton();
}

uploadImgCancel.addEventListener('click', closeUploadInput);

// -> Валидация комментов

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error',
});

function validateComment(value) {
  return value.length <= 140;
}

pristine.addValidator(commentField, validateComment);

// -> Валидация хэштегов

function validateHashtags(value) {
  if (!value) {
    return true; // Хэштеги необязательны
  }

  const hashtags = value.trim().split(/\s+/); //.split(/\s+/):Разделяет строку на массив

  if (hashtags.length > 5) {
    return false; // нельзя указать больше пяти хэштегов
  }

  const hashtagPattern = /^#[a-za-яё0-9]{1,19}$/i;
  const uniqueHashtags = new Set();

  for (const hashtag of hashtags) {
    if (hashtag.length > 20) {
      return false; // Максимум 20 символов
    }
    if (!hashtagPattern.test(hashtag)) {
      return false; // Хэштег должен начинаться с # и содержать только буквы и цифры
    }
    if (uniqueHashtags.has(hashtag.toLowerCase())) {
      return false; // Один и тот же хэштег не может быть использован дважды
    }
    uniqueHashtags.add(hashtag.toLowerCase());
  }

  return true;
}

function getHashtagErrorMessage(value) {
  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > 5) {
    return 'Нельзя указать больше пяти хэштегов';
  }

  const hashtagPattern = /^#[a-za-яё0-9]{1,19}$/i;
  const uniqueHashtags = new Set();

  for (const hashtag of hashtags) {
    if (hashtag.length > 20) {
      return 'Максимум 20 символов';
    }
    if (!hashtagPattern.test(hashtag)) {
      return 'Хэштег должен начинаться с # и содержать только буквы и цифры';
    }
    if (uniqueHashtags.has(hashtag.toLowerCase())) {
      return 'Один и тот же хэштег не может быть использован дважды';
    }
    uniqueHashtags.add(hashtag.toLowerCase());
  }

  // return 'Некорректный хэштег';
}

pristine.addValidator(hashtagField, validateHashtags, getHashtagErrorMessage);

const blockPublishButton = () => {
  publishButton.disabled = true;
  publishButton.textContent = publishButtonText.SENDING;
};

const unblockPublishButton = () => {
  publishButton.disabled = false;
  publishButton.textContent = publishButtonText.IDLE;
};

const showSuccessMessage = () => {
  const template = document.querySelector('#success').content;
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  const successButton = document.querySelector('.success__button');
  const successElement = document.querySelector('.success');

  const removeMessage = () => {
    successElement.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscKeyDown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage();
    }
  }

  function onOutsideClick (evt) {
    if (!evt.target.closest('.success__inner')) {
      removeMessage();
    }
  }

  successButton.addEventListener('click', removeMessage);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};

const showErrorMessage = () => {
  const template = document.querySelector('#error').content;
  const messageElement = template.cloneNode(true);
  document.body.append(messageElement);

  const errorButton = document.querySelector('.error__button');
  const errorElement = document.querySelector('.error');

  const removeMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  };

  function onEscKeyDown (evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      removeMessage();
    }
  }

  function onOutsideClick (evt) {
    if (!evt.target.closest('.error__inner')) {
      removeMessage();
    }
  }

  errorButton.addEventListener('click', removeMessage);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};


const setFormSubmit = (onSuccess) => {
  form.addEventListener('submit', async (evt) => { // async & await добавила после лайва
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockPublishButton();
      await sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          showSuccessMessage();
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(unblockPublishButton);
    }
  });
};
// Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать, если форма заполнена не по правилам.
function updatePublishButton() {
  const isValid = pristine.validate();
  if (isValid) {
    publishButton.removeAttribute('disabled');
  } else {
    publishButton.setAttribute('disabled', true);
  }
}

hashtagField.addEventListener('input', updatePublishButton);
commentField.addEventListener('input', updatePublishButton);

export { setFormSubmit, openUploadInput, closeUploadInput };
