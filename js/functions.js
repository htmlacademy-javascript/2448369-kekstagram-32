function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength ('train to write functions', 30);

// console.log(checkStringLength('train to write functions', 30));
// console.log(checkStringLength('train to write functions', 5));
// console.log(checkStringLength('functions', 2));

function isPalindrome (str) {
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

isPalindrome ('Anna');

// console.log(isPalindrome('Anna'));
// console.log(isPalindrome('Baidikova'));
// console.log(isPalindrome('Лёша на полке клопа нашёл '));


function returnNumbers (input) {
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
