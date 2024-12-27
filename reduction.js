const reductions = (array, reducer, init) => {
  const values = [init];
  array.reduce((x, y) => { const value = reducer(x, y); values.push(value); return value }, init)
  return values;
}

reductions([1, 2, 3, 4], (a, b) => a + b, 0)
reductions([1, 2, 3, 4], (a, b) => Math.max(a, b), 0)


const stringMap = (string, mapper) => [...string].map(mapper).join("");
const repeatTwice = x => x.repeat(2)
stringMap("abc", repeatTwice);

const stringFilter = (string, predicate) => [...string].filter(predicate).join("");
