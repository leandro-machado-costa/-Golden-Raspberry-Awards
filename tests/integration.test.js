const request = require('supertest');
const app = require('../app');
const { initDB } = require('../src/config/database');
const { loadCSV } = require('../src/services/csvService');

describe('API Integration Test', () => {
  // Initialize the database and load CSV data before running any tests
  beforeAll(async () => {
    initDB(); // Initialize the database

    await loadCSV(); // Load the CSV data into the database
  });

  // Test case to verify the API returns the correct status code and award intervals
  it('should return 200 status code and correct min/max award intervals', async () => {
    // Send a GET request to the /api/producers/awards endpoint
    const response = await request(app).get('/api/producers/awards');

    // Check if the status code is 200 (OK)
    expect(response.statusCode).toBe(200);

    // Check if the response body contains 'min' and 'max' properties
    expect(response.body).toHaveProperty('min');
    expect(response.body).toHaveProperty('max');

    // Ensure 'min' and 'max' are arrays
    expect(Array.isArray(response.body.min)).toBe(true);
    expect(Array.isArray(response.body.max)).toBe(true);

    // If 'min' array is not empty, check that the first item has the correct properties
    if (response.body.min.length > 0) {
      expect(response.body.min[0]).toHaveProperty('producer');
      expect(response.body.min[0]).toHaveProperty('interval');
      expect(response.body.min[0]).toHaveProperty('previousWin');
      expect(response.body.min[0]).toHaveProperty('followingWin');
    }

    // If 'max' array is not empty, check that the first item has the correct properties
    if (response.body.max.length > 0) {
      expect(response.body.max[0]).toHaveProperty('producer');
      expect(response.body.max[0]).toHaveProperty('interval');
      expect(response.body.max[0]).toHaveProperty('previousWin');
      expect(response.body.max[0]).toHaveProperty('followingWin');
    }
  });
});
