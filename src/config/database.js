const sqlite3 = require('better-sqlite3');
const db = new sqlite3(process.env.DATABASE_URL || ':memory:');

/**
 * Initializes the database and creates the movies table if it doesn't exist.
 */
const initDB = () => {

  db.exec(`
    CREATE TABLE movies (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  year INTEGER NOT NULL,
  studios TEXT,
  winner TEXT);`);

  db.exec(`
  CREATE TABLE producers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL);`);

  db.exec(`
  CREATE TABLE movie_producers (
  movie_id INTEGER,
  producer_id INTEGER,
  FOREIGN KEY (movie_id) REFERENCES movies(id),
  FOREIGN KEY (producer_id) REFERENCES producers(id));`);
};

module.exports = {
  db,
  initDB,
};