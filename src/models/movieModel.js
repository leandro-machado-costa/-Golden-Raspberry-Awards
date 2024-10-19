const { db } = require('../config/database');

/**
 * Inserts a movie into the movies table.
 * @param {Object} movie - Movie object containing year, title, studios, producers, and winner status.
 */
const insertMovie = (movie) => {


  const movieStmt = db.prepare('INSERT INTO movies (year, title, studios, winner) VALUES (?, ?, ?, ?)');
  const movieResult = movieStmt.run(movie.year, movie.title, movie.studios, movie.winner);
  const movieId = movieResult.lastInsertRowid;

  const producers = movie.producers
    .split(/,| and /)  // Split producers by comma or " and "
    .map(producer => producer.trim())
    .filter(producer => producer !== "");

  producers.forEach(producer => {

    const existingProducer = db.prepare('SELECT id FROM producers WHERE name = ?').get(producer);

    let producerId;
    if (existingProducer) {

      producerId = existingProducer.id;
    } else {
      const producerStmt = db.prepare('INSERT INTO producers (name) VALUES (?)');
      const producerResult = producerStmt.run(producer);
      producerId = producerResult.lastInsertRowid;
    }

    const relationshipStmt = db.prepare('INSERT INTO movie_producers (movie_id, producer_id) VALUES (?, ?)');
    relationshipStmt.run(movieId, producerId);
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