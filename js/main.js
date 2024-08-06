// main.js
import { renderGallery } from './gallery.js';
import './form_utils.js';
import './scale.js';
import { setFormSubmit, openUploadInput, closeUploadInput } from './form_utils.js';
import { getData } from './api.js';
import { showAlert, showDataError } from './util.js';

getData()
  .then((pictures) => {
    renderGallery(pictures);
  })
  .catch(() => {
    showDataError();
  });

setFormSubmit(closeUploadInput);
