

/**
 *
 * , checks if there is increasing or decreasing fibonnaci sequence with min
 * 2 checks of fibonaccis sequence:
 * 1. no 2 zeros next to each other
 * 2. a + b = c
 *
 * @param   whatsit  The whatsit to use (or whatever).
 * @returns object, { res: bool, indexes: indexes }
 */

export function getFibonacciFromLine(mineLine, min) {
  let countOfPreviousFibos = 0;
  for (let i = 0; i < Object.keys(mineLine).length; i++) {
    const a = mineLine[i] ? mineLine[i][Object.keys(mineLine[i])].val : undefined;
    const b = mineLine[i + 1] ? mineLine[i + 1][Object.keys(mineLine[i + 1])].val : undefined;
    const c = mineLine[i + 2] ? mineLine[i + 2][Object.keys(mineLine[i + 2])].val : undefined;

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
      continue;
    }
    if (a + b === c) {
      ++countOfPreviousFibos;
    } else {
      countOfPreviousFibos = 0;
    }
  }

  return { res: false, indexes: []};
}
