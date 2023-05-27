// array of integers, checks if there is increasing or decreasing fibonnaci sequence with min (default 3)
export function getFibonacciFromLine(mineLine, min) {
  // console.log('mineLine', mineLine);
  let countOfPreviousFibos = 0;
  let i = 0;
  // eslint-disable-next-line no-unused-vars
  for (const [key, value] of Object.entries(mineLine)) {
    const a = mineLine[i] ? Object.values(mineLine[i])?.[0] : undefined;
    const b = mineLine[i+1] ? Object.values(mineLine[i+1])?.[0] : undefined;
    const c = mineLine[i+2] ? Object.values(mineLine[i+2])?.[0] : undefined;
    // console.log('mineLine counts', [a, b, c]);

    // min - 2 because:
    // a + b === c ... 1
    // b + c === d ... 2
    // c + d === e ... 3
    // d + e === f ... 4 but that means a..f => 6 chars involved
    if ( countOfPreviousFibos === min - 2) {
      // console.log(`${min} values in Fibonacci's row...`);
      const indexes = [];
      for (let index=i+1; index > (i-min+1); --index) {
        indexes.push(mineLine[index]);
      }
      return { res: true, indexes: indexes };
    }
    if (a + b === c ) {
      ++countOfPreviousFibos;
    } else {
      countOfPreviousFibos = 0;
    }
    if ( countOfPreviousFibos > 0 ) {
      // console.log('countOfPreviousFibos', [countOfPreviousFibos, a, b, c]);
    }
    ++i;
  }

  return { res: false, indexes: []};
}
