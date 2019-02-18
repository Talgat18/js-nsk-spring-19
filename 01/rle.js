/**
 * Напишите функцию rle(input), реализующую примитивное RLE-сжатие входящей строки input.
 * Подробнее об RLE: https://ru.wikipedia.org/wiki/Кодирование_длин_серий
 *
 * Входящая строка сооттветствует regex паттерну /^[A-Z]+$/
 *
 * Пример:
 * rle('AAAB') === 'A3B'
 * rle('BCCDDDEEEE') === 'BC2D3E4'
 *
 * Больше примеров в тестах.
 *
 * @param  {string} input
 * @return {string}
 */
export function rle(input) {
  const rleing = (ch, num) => {
    let rleNum = '';

    rleNum += num > 1 ? num.toString() : '';

    return ch + rleNum;
  };

  let count = 0;

  let char = '';

  let result = '';

  input.split('').forEach(el => {
    count += 1;
    if (el === char) {
      return;
    }
    if (char !== '') {
      result += rleing(char, count);
    }
    char = el;
    count = 0;
  });
  result += rleing(char, count + 1);

  return result;
}
