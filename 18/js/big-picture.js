const bigPictureElement = document.querySelector('.big-picture');
const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentListElement = bigPictureElement.querySelector('.social__comments');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');
const cancelButtonElement = bigPictureElement.querySelector('.big-picture__cancel');
const bodyElement = document.querySelector('body');
const commentTemplateElement = document.querySelector('#comment').content.querySelector('.social__comment');
const COMMENTS_PER_PAGE = 5;
let commentsShown = 0; //количество уже показанных комментариев.
let currentComments = []; //текущий список комментариев изображения.

const isEscapeKey = (evt) => evt.key === 'Escape';

const createComment = ({ avatar, name, message }) => {
  const comment = commentTemplateElement.cloneNode(true);

  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = (comments) => {
  commentsShown = 0;
  currentComments = comments;
  commentListElement.innerHTML = '';
  loadMoreComments();
};

const hideBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPicture();
  }
}

const onCancelButtonClick = () => {
  hideBigPicture();
};

const renderPictureDetails = ({ url, likes, description }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showBigPicture = (data) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentsLoaderElement.classList.remove('hidden');
  commentCountElement.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);

  renderPictureDetails(data);
  renderComments(data.comments);
};

function loadMoreComments () {
  const fragment = document.createDocumentFragment(); //создаем фрагмент для комментариев
  const commentsToShow = currentComments.slice(commentsShown, commentsShown + COMMENTS_PER_PAGE); //Начальный индекс (commentsShown): Указывает на индекс первого//Конечный индекс (commentsShown + COMMENTS_PER_PAGE): Указывает на индекс, до которого нужно выбрать комментарии.

  commentsToShow.forEach((item) => {
    const comment = createComment(item);
    fragment.append(comment);
  });

  commentListElement.append(fragment);
  commentsShown += commentsToShow.length;
  updateCommentCount();

  if (commentsShown >= currentComments.length) {
    commentsLoaderElement.classList.add('hidden');
  } else {
    commentsLoaderElement.classList.remove('hidden');
  }
}

function updateCommentCount () {
  commentCountElement.textContent = `${commentsShown} из ${currentComments.length} комментариев`;
}

cancelButtonElement.addEventListener('click', onCancelButtonClick);
commentsLoaderElement.addEventListener('click', loadMoreComments);

export { showBigPicture };
