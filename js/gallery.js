import { renderThumbnails } from './thumbnailGenerator';
import { showBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId); //находим id картинки и передаем в функции отрисовки большого img
    showBigPicture(picture);
  });
  renderThumbnails(pictures, container);
};

export { renderGallery };
