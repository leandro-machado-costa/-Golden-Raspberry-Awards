const { db } = require('../config/database');

/**
 * Inserts a movie into the movies table.
 * @param {Object} movie - Movie object containing year, title, studios, producers, and winner status.
 */
const insertMovie = (movie) => {
  const producers = movie.producers
  .split(/,| and /) 
  .map(producer => producer.trim())
  .filter(producer => producer !== "");
  
  producers.forEach(producer => {
    const stmt = db.prepare('INSERT INTO movies (year, title, studios, producers, winner) VALUES (?, ?, ?, ?, ?)');
    stmt.run(movie.year, movie.title, movie.studios, producer, movie.winner);
  });
};

/**
 * Retrieves all winning movies.
 * @returns {Array} - List of movies that won an award.
 */
const getWinningMovies = () => {
  return db.prepare("SELECT * FROM movies WHERE winner = 'yes'").all();
};

module.exports = { insertMovie, getWinningMovies };