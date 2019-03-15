const { reduceRight, is, find, reject, filter, all } = require('ramda');

const existy = x => x != null;
const truthy = x => x !== 0 && x !== false && existy(x);

console.log(truthy(1));

const value = reduceRight((acc, value) => acc - value, 0, [1, 2, 3, 4]);
console.log(value);
const numbers = find(is(String), ['a', 123, 'b']);
console.log(numbers);
const numberArray = filter(is(Number), [123, 123, 'finch']);
console.log(numberArray);
const isNumbers = all(is(Number), [1, 123, 12, 123]);
console.log(isNumbers);
