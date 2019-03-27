const {
  reduceRight,
  is,
  find,
  reject,
  filter,
  all,
  sortBy,
  prop,
  toLower,
  compose,
  descend,
  ascend,
  sort,
  sortWith,
  toPairs,
  fromPairs,
  pick,
  map,
  pluck,
  range,
  always
} = require('ramda');

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

const sortByAge = descend(prop('age'));
const sortByNameAge = sortWith([ascend(prop('name')), descend(prop('age'))]);

const alice = {
  name: 'ALICE',
  age: 101,
  address: 'wuhan'
};
const bob = {
  name: 'Bob',
  age: 10,
  address: 'beijing'
};
const clara = {
  name: 'clara',
  age: 314.159,
  address: 'shenzhen'
};
const people = [clara, bob, alice];

const sortPeople = sort(sortByAge, people);
const sortAge = sortByNameAge(people);

console.log(sortAge);

const obj = {
  a: 1,
  b: 2,
  c: 3
};

const pair = toPairs(obj).map(pair => [pair[0].toUpperCase(), pair[1] + 1]);
resultObj = fromPairs(pair);
console.log(resultObj);

const pickObject = pick(['name']);
const pluckName = pluck('name');

// const names = map(pickObject, people);
const names = pluckName(people);
console.log('names', names);

function complement(PRED) {
  return function() {
    return !PRED.apply(null, Array.from(arguments));
  };
}

function isEven(n) {
  return n % 2 === 0;
}

const isOdd = complement(isEven);
console.log(isOdd(1));
console.log(isOdd(3));

function repeatedly(time, fn) {
  return map(fn, range(0, time));
}

// 函数式编程的思想之一: 尽量用函数 不要使用值
const list = repeatedly(5, () => 5);
console.log(list);

// 三个参数 一个用来做一些action 一些用来判断
function iterateUntil(fn, check, init) {
  var ret = [];
  var result = fn(init);

  while (check(result)) {
    ret.push(result);
    result = fn(result);
  }

  return ret;
}

const result = iterateUntil(n => n + n, n => n <= 2014, 1);
console.log(result);

function checker() {
  var validators = Array.from(arguments);

  return function(obj) {
    return validators.reduce((errs, check) => {
      if (check(obj)) {
        return errs;
      } else {
        errs.push(check.message);
        return errs;
      }
    }, []);
  };
}

var fail = always(false);
fail.message = 'i am fail';
var pass = checker(fail, always(true));
console.log(pass({}));

// 包装检验函数
function validator(message, fn) {
  var f = function() {
    console.log(arguments);
    return fn.apply(fn, arguments);
  };

  f['message'] = message;
  return f;
}

const check1 = validator('i am ojbk', always(false));
console.log(check1.message);
