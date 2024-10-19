const { calculateProducersInterval } = require('../src/services/awardService');

jest.mock('../src/config/database', () => ({
  db: {
    prepare: jest.fn().mockReturnValue({
      all: jest.fn(() => [
        { producer: 'Producer A', interval: 1, previousWin: 2000, followingWin: 2001 },
        { producer: 'Producer B', interval: 5, previousWin: 1990, followingWin: 1995 },
        { producer: 'Producer C', interval: 10, previousWin: 1980, followingWin: 1990 },
      ]),
    }),
  },
}));

describe('Producer Award Interval Calculations', () => {
  it('should return the correct min and max intervals', () => {
    const result = calculateProducersInterval();

    expect(result.min).toEqual([
      { producer: 'Producer A', interval: 1, previousWin: 2000, followingWin: 2001 },
    ]);

    expect(result.max).toEqual([
      { producer: 'Producer C', interval: 10, previousWin: 1980, followingWin: 1990 },
    ]);
  });
});
