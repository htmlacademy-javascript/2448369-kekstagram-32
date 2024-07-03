function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// function getRandomInteger1(min, max) {
//   const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
//   const upper = max === Infinity ? Number.MAX_SAFE_INTEGER : Math.floor(Math.max(Math.abs(min), Math.abs(max)));
//   const result = Math.random() * (upper - lower + 1) + lower;

//   return Math.floor(result);
// }

function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      // console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const messages = [
  'Всё отлично!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'В целом всё неплохо. Но не всё.'
];

const NAMES = [
  'Саркастик Петрович',
  'Иннокентий Многословов',
  'Евлампий Незамолкающий',
  'Философ Иванов',
  'Борис Глаголевич',
  'Пафнутий Блаблаблаев',
];


const generateCommentId = createRandomIdFromRangeGenerator(1, 100000); //бесконечность?

function getRandomComments(messages) {
  const numberOfComments = getRandomInteger(1, 2); // случайное количество комментариев (1 или 2)
  const comments = [];

  while (comments.length < numberOfComments) {
    const randomIndex = getRandomInteger(0, messages.length - 1);
    const randomCommentText = messages[randomIndex];

    if (!comments.includes(randomCommentText)) {
      comments.push(randomCommentText);
    }
  }

  return comments;
}

const randomComment = () => {
  const authorID = getRandomInteger(1, 6);

  return {
    id: generateCommentId(),
    avatar:  `img/avatar-${authorID}.svg`,
    messages: getRandomComments(messages),
    name: NAMES[authorID - 1]
  };
};

// console.log(randomComment);

const COMMENTS = Array.from({length: 30}, randomComment);
// console.log(COMMENTS);

//Каждый объект массива — описание фотографии, опубликованной пользователем.
const captions = [
  'Наслаждаясь прекрасным днем.',
  'Отличные воспоминания!',
  'Время, проведенное с пользой.',
  'Один из тех моментов...',
  'Жизнь в движении.',
  'Еще один замечательный день.',
  'Просто наслаждаюсь моментом.',
  'Так много эмоций в одной фотографии.',
  'Прекрасное место, прекрасные люди.',
  'Вот это да!',
  'Сегодняшний день был великолепен.',
  'Простые радости жизни.',
  'Удивительное приключение.',
  'Запомнится надолго.',
  'Открывая новые горизонты.',
  'Время с близкими — бесценно.',
  'Так здорово быть здесь!',
  'Маленькие моменты счастья.',
  'Мечты становятся реальностью.',
  'Прекрасные виды и хорошее настроение.',
  'Один день из жизни.',
  'Всегда в движении.',
  'Отличный способ провести время.',
  'Всегда с улыбкой.',
  'Эти моменты бесценны.'
];

const generatePhotoID = createRandomIdFromRangeGenerator(1, 25);
function getCaption() {
  const captionIndex = getRandomInteger(0, captions.length - 1);
  return captions[captionIndex];
}


const photoDescription = () => {
  const id = generatePhotoID();
  const numberOfPhotoComments = getRandomInteger(0,30);
  const photoComments = [];

  for (let i = 0; i < numberOfPhotoComments; i++) {
    const randomIndex = getRandomInteger(0, COMMENTS.length - 1);
    photoComments.push(COMMENTS[randomIndex]);
  }

  return {
    id: id,
    url: `photos/${id}.svg`,
    description: getCaption(),
    likes: getRandomInteger(15, 200),
    comments: photoComments
  };
};

// console.log(photoDescription);

const photoDescriptions = Array.from({length: 25}, photoDescription);
console.log(photoDescriptions);
