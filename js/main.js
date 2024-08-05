import { getPhoto } from './data.js';
// console.log(getPhoto);
import { renderGallery } from './gallery.js';
import './form_utils.js';
import './scale.js';

renderGallery(getPhoto);
