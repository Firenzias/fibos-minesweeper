import _ from 'lodash';

// array of integers, checks if there is increasing or decreasing fibonnaci sequence with min
// 2 checks of fibonaccis sequence:
// 1. no 2 zeros next to each other
// 2. a + b = c
export function getFibonacciFromLine(mineLine, min) {
  let countOfPreviousFibos = 0;
  let i = 0;
  // eslint-disable-next-line no-unused-vars
  for (const [key, value] of Object.entries(mineLine)) {
    const a = !_.isEmpty(mineLine[i]) ? Object.values(mineLine[i])[0] : undefined;
    const b = !_.isEmpty(mineLine[i + 1]) ? Object.values(mineLine[i + 1])[0] : undefined;
    const c = !_.isEmpty(mineLine[i + 2]) ? Object.values(mineLine[i + 2])[0] : undefined;

    // min - 2 because:
    // a + b === c ... 1
    // b + c === d ... 2
    // c + d === e ... 3
    // d + e === f ... 4 but that means a..f => 6 chars involved
    if (countOfPreviousFibos === min - 2) {
      // console.log(`${min} values in Fibonacci's row...`);
      const indexes = [];
      for (let index = i; index > (i - min); --index) {
        indexes.push(mineLine[index + 1]);
      }
      return { res: true, indexes: indexes };
    }
    if (a + b === 0) {
      countOfPreviousFibos = 0;
      ++i;
      continue;
    }
    if (a + b === c) {
      ++countOfPreviousFibos;
    } else {
      countOfPreviousFibos = 0;
    }
    ++i;
  }

  return { res: false, indexes: []};
}
