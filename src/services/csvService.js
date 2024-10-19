const fs = require('fs');
const csv = require('csv-parser');
const { insertMovie } = require('../models/movieModel');

function getCSVFilePath() {
  return process.env.CSV_FILE_PATH || "data/movielist.csv";
}

function processRow(row) {
  insertMovie(row);
}

function createCSVStream(filePath) {
  return fs.createReadStream(filePath).pipe(csv({ separator: ';' }));
}

function handleCSVStream(stream) {
  return new Promise((resolve, reject) => {
    stream
      .on('data', (row) => processRow(row))
      .on('end', () => resolve())
      .on('error', (error) => reject(error));
  });
}

const loadCSV = () => {
  const filePath = getCSVFilePath();
  const stream = createCSVStream(filePath);
  return handleCSVStream(stream);
};

module.exports = { loadCSV };
