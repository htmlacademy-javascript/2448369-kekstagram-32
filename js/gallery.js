import { renderThumbnails } from './thumbnailGenerator';
import { showBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');
const imgFilters = document.querySelector('.img-filters');

const removeThumbnails = () => {
  const thumbnails = container.querySelectorAll('.picture');
  thumbnails.forEach((thumbnail) => thumbnail.remove());
};

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }

    evt.preventDefault();
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId); // находим id картинки и передаем в функции отрисовки большого img
    showBigPicture(picture);
  });

  renderThumbnails(pictures, container);
  imgFilters.classList.remove('img-filters--inactive'); // открываем блок фильтров
};

export { renderGallery, removeThumbnails };
