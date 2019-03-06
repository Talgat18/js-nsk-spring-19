/**
 * Напишите функцию sum(x), вычисляющую суммы подобным образом:
 * sum() === 0
 * sum(1)(2)() === 3
 * sum(1)(2)(3)() === 6
 *
 * Возможно чуть более понятная нотация для любителей функциональщины:
 * sum :: Number -> sum
 * sum :: void -> Number
 *
 * @param {*} x число или undefined
 * @returns а это уже сами решите
 */
export function sum(x) {
  if (x === undefined) {
    return 0;
  }

  let result = x;

  return function summy(y) {
    if (y !== undefined) {
      result += y;
    }
    return y === undefined ? result : summy;
  };
}
