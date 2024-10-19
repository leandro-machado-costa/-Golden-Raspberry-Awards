const { calculateProducersInterval } = require('../src/services/awardService');

// Mock the database configuration to simulate the return of interval data
jest.mock('../src/config/database', () => ({
  db: {
    prepare: jest.fn().mockReturnValue({
      // Simulate the 'all' method returning an array of interval data for different producers
      all: jest.fn(() => [
        { producer: 'Producer A', interval: 1, previousWin: 2000, followingWin: 2001 },
        { producer: 'Producer B', interval: 5, previousWin: 1990, followingWin: 1995 },
        { producer: 'Producer C', interval: 10, previousWin: 1980, followingWin: 1990 },
      ]),
    }),
  },
}));

describe('Producer Award Interval Calculations', () => {
  // Test case to verify that the correct min and max intervals are returned
  it('should return the correct min and max intervals', () => {
    // Call the function to calculate producer intervals
    const result = calculateProducersInterval();

    // Verify that the 'min' interval is correct
    expect(result.min).toEqual([
      { producer: 'Producer A', interval: 1, previousWin: 2000, followingWin: 2001 },
    ]);

    // Verify that the 'max' interval is correct
    expect(result.max).toEqual([
      { producer: 'Producer C', interval: 10, previousWin: 1980, followingWin: 1990 },
    ]);
  });
});
