// //описываю эффекты
// //нахожу все нужные элементы
// //устанавливаю какой по умолчанию будет эффект
// //инициализирую слайдер библиотеки
// //создаю слайдер с такими параметрами от эффектов
// //прописываю функцию которая применяет стилм к выбранному фильтру
// //прописываю, что если выбран none, то слайдер скрывается

const EFFECTS = {
  none: { style: 'none', step: 0.1, unit: '', min: 0, max: 1 },
  chrome: { style: 'grayscale', step: 0.1, unit: '', min: 0, max: 1 },
  sepia: { style: 'sepia', step: 0.1, unit: '', min: 0, max: 1 },
  marvin: { style: 'invert', step: 1, unit: '%', min: 0, max: 100 },
  phobos: { style: 'blur', step: 0.1, unit: 'px', min: 0, max: 3 },
  heat: { style: 'brightness', step: 0.1, unit: '', min: 1, max: 3 }
};

const uploadForm = document.querySelector('.img-upload__form');
const imgElement = uploadForm.querySelector('.img-upload__preview img');
const effectsElement = uploadForm.querySelector('.effects');
const effectLevelInput = uploadForm.querySelector('.effect-level__value');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const sliderElement = uploadForm.querySelector('.effect-level__slider');

let chosenEffect = EFFECTS.none;

// Инициализируем слайдер
const createSlider = ({ min, max, step }) => {
  noUiSlider.create(sliderElement, {
    start: max,
    range: {
      min: min,
      max: max
    },
    step: step,
    format: {
      to: (value) => Number(value),
      from: (value) => Number(value),
    }
  });
  sliderElement.noUiSlider.on('update', onSliderUpdate);
  hideSlider(); // Скрыть слайдер по умолчанию
};

// применение стиля к выбранному фильтру
const applyEffect = (effect, value) => {
  if (effect === 'none') {
    imgElement.style.filter = '';
  } else {
    imgElement.style.filter = `${effect.style}(${value}${effect.unit})`;
  }
};

// Обновление слайдера
function onSliderUpdate () {
  const value = sliderElement.noUiSlider.get();
  effectLevelInput.value = value;
  applyEffect(chosenEffect, value);
}

// Обработчик изменения эффекта
const onEffectsChange = (evt) => {
  const itemEffect = evt.target.closest('input[type="radio"]');

  if (itemEffect) {
    const effectName = itemEffect.value;
    chosenEffect = EFFECTS[effectName];

    if (effectName === 'none') {
      hideSlider();
      imgElement.style.filter = '';
    } else {
      showSlider();
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: chosenEffect.min,
          max: chosenEffect.max
        },
        start: chosenEffect.max,
        step: chosenEffect.step
      });
    }
  }
};

function hideSlider () {
  sliderContainer.classList.add('hidden');
}

function showSlider () {
  sliderContainer.classList.remove('hidden');
}

// Устанавливаем эффект по умолчанию
const setEffect = () => {
  createSlider(EFFECTS.none);
  effectsElement.addEventListener('change', onEffectsChange);
};

// Сбрасываем слайдер
const resetSlider = () => {
  sliderElement.noUiSlider.destroy();
  imgElement.style.filter = '';
  chosenEffect = EFFECTS.none;
  effectsElement.removeEventListener('change', onEffectsChange);
};

export { setEffect, resetSlider };
