const fs = require('fs');
const csv = require('csv-parser');
const { insertMovie } = require('../models/movieModel');

/**
 * Service to load data from a CSV file and insert it into the database.
 * 
 * @returns {Promise} - Resolves once the CSV has been processed.
 */
const loadCSV = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(process.env.CSV_FILE_PATH || "data/movielist.csv")
      .pipe(csv({ separator: ';' }))
      .on('data', (row) => {
        insertMovie(row);
      })
      .on('end', () => resolve())
      .on('error', (error) => reject(error)); 
  });
};

module.exports = loadCSV;
