const request = require('supertest');

const main = require('./build/main.js');

describe('Test example', () => {
  it('Should return correct data', async () => {
    const result = await main.multiply([1, 2, 3, 4], 2);
    expect(result).toEqual([2, 4, 6, 8]);
  });
});