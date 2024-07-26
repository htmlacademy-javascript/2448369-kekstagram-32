// module5-task2 Делу — время

const timeToMinutes = (time) => { //преобразует время в количество минут от начала суток
  const [hours, minutes] = time.split(':').map(Number); //[hours, minutes]: Синтаксис деструктуризации массива. Он присваивает первую часть массива переменной hours, а вторую часть — переменной minutes. Таким образом, после выполнения этой строки кода hours будет равно '08', а minutes будет равно '05'.
  //.map(Number): Метод map создает новый массив, вызывая функцию Number для каждого элемента массива. Эта функция преобразует строки '08' и '05' в числа 8 и 5 соответственно. В результате массив становится [8, 5].
  return hours * 60 + minutes;
};

const checkMeetingDuration = (workdayStart, workdayEnd, meetingStart, meetingDuration) => {
  const workdayStartMinutes = timeToMinutes(workdayStart);
  const workdayEndMinutes = timeToMinutes(workdayEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  if (meetingStartMinutes >= workdayStartMinutes && meetingEndMinutes <= workdayEndMinutes) {
    // console.log('Время встречи забронировано');
    return true;
  }
  // console.log('Выберите другое время встречи');
  return false;
};

checkMeetingDuration('08:00', '17:30', '14:00', 90);
checkMeetingDuration('8:0', '10:0', '8:0', 120);
checkMeetingDuration('08:00', '14:30', '14:00', 90);
checkMeetingDuration('14:00', '17:30', '08:0', 90);
checkMeetingDuration('8:00', '17:30', '08:00', 900);

// Функция для проверки длины строки.

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength('train to write functions', 30);

// console.log(checkStringLength('train to write functions', 30));
// console.log(checkStringLength('train to write functions', 5));
// console.log(checkStringLength('functions', 2));

// Функция для проверки, является ли строка палиндромом.
function isPalindrome(str) {
  let normalizedStr = str.replace(/\s/g, '');
  normalizedStr = normalizedStr.toLowerCase();

  let left = 0;
  let right = normalizedStr.length - 1;

  while (left < right) {
    if (normalizedStr[left] !== normalizedStr[right]) {
      return false; // Если символы не совпадают, строка не палиндром
    }
    left++;
    right--;
  }
  return true; // Если все символы совпали, палиндром
}

isPalindrome('Anna');

// console.log(isPalindrome('Anna'));
// console.log(isPalindrome('Baidikova'));
// console.log(isPalindrome('Лёша на полке клопа нашёл '));

// Дополнительное задание
function returnNumbers(input) {
  const string = input.toString();
  let result = '';

  for (let i = 0; i < string.length; i++) {
    if (string[i] >= '0' && string[i] <= '9') {
      result += string[i];
    }
  }
  const number = parseInt(result, 10);

  if (Number.isNaN(number)) {
    return NaN;
  }

  return number;

}

returnNumbers('i am 77 y.o.');

// console.log(returnNumbers('2023 год'));
// console.log(returnNumbers('1 кефир, 0.5 батона'));
// console.log(returnNumbers('а я томат'));


