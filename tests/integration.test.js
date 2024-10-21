const request = require('supertest');
const app = require('../app');
const fs = require('fs');
const csv = require('csv-parser');
const { initDB } = require('../src/config/database');
const { loadCSV } = require('../src/services/csvService');

describe('API Integration Test - Data Consistency with CSV', () => {
  beforeAll(async () => {
    initDB();
    await loadCSV();
  });

  it('should return results that match the original CSV data', async () => {
    // Parse the CSV file to extract the expected producers and their win years
    const expectedResults = [];
    await new Promise((resolve, reject) => {
      fs.createReadStream(process.env.CSV_FILE_PATH || "data/movielist.csv")
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
          if (row.winner === 'yes') {
            const producers = row.producers.split(/,| and /).map(p => p.trim()).filter(p => p !== "");
            producers.forEach(producer => {
              expectedResults.push({
                producer,
                year: parseInt(row.year),
              });
            });
          }
        })
        .on('end', resolve)
        .on('error', reject);
    });

    // Send a GET request to the API endpoint
    const response = await request(app).get('/api/producers/awards');
    expect(response.statusCode).toBe(200);

    // Extract the min and max results from the response
    const { min, max } = response.body;

    // Define the expected output based on the CSV data analysis
    const expectedMin = {
      producer: "Joel Silver",
      interval: 1,
      previousWin: 1990,
      followingWin: 1991
    };
    const expectedMax = {
      producer: "Matthew Vaughn",
      interval: 13,
      previousWin: 2002,
      followingWin: 2015
    };

    // Check if the 'min' result contains the expected minimum interval producer
    expect(min).toContainEqual(expectedMin);

    // Check if the 'max' result contains the expected maximum interval producer
    expect(max).toContainEqual(expectedMax);
  });
});
