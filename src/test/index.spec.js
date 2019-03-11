const splitStr = require('./index');

test('split demo1', () => {
    expect(splitStr()).toBe(undefined);
})

test('split demo1', () => {
    expect(splitStr('hello')).toBe('hello');
})

test('split demo2', () => {
    expect(splitStr('hellohellohellohellohello')).toBe('hellohellohellohello<br>hello');
})

test('split demo4', () => {
    expect(splitStr('hellohellohellohellohellohellohellohello')).toBe('hellohellohellohello<br>hellohellohellohello');
})