describe('sumOfOther function', () => {
  it('Test 1', () => {
    assert.deepEqual(sumOfOther([2, 3, 4, 1]), [8, 7, 6, 9]);
  });

  it('Test 2', () => {
    assert.deepEqual(sumOfOther([0, -3, 4, -1]), [0, 3, -4, 1]);
  });

  it('Test 3', () => {
    assert.deepEqual(sumOfOther([-1, 0, 0, 0]), [0, -1, -1, -1]);
  });

  it('Test 4', () => {
    assert.deepEqual(sumOfOther([99, -999, 9999, -9999]), [-999, 99, -10899, 9099]);
  });

    it('Test 5', () => {
    assert.deepEqual(sumOfOther([4.83, 1.83, 0, 3.33]), [-1.5, 1.5, 3.33, 0]);
  });
});
