const assert = require('assert');
Object.freeze(assert);
const make = require('make.js');

describe('sumOfOther function', () => {
  it('Test 1', () => {
    const sum = function sum(a, b) {
      return a + b;
    };
    assert.deepEqual(make(15)(34, 21, 666)(41)(sum), 777);
  });

  it('Test 2', () => {
    const minus = function minus(a, b) {
      return a - b;
    };
    assert.deepEqual(make(1)(2, 3, 4)(5)(minus), -13);
  });

  it('Test 3', () => {
    const multiply = function multiply(a, b) {
      return a * b;
    };
    assert.deepEqual(make(1)(2, 50)(5, 100, 11)(multiply), 550000);
  });

  it('Test 4', () => {
    const multiply = function multiply(a, b) {
      return a * b;
    };
    assert.deepEqual(make(1)(2, 50)(5, 100, 11)(multiply, 0, -543, 11), 550000);
  });
});
