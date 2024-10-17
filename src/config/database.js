const sqlite3 = require('better-sqlite3');
const db = new sqlite3(process.env.DATABASE_URL || ':memory:'); // In-memory database by default

/**
 * Initializes the database and creates the movies table if it doesn't exist.
 */
const initDB = () => {
  db.exec(`
    CREATE TABLE IF NOT EXISTS movies (
      year INTEGER,
      title TEXT,
      studios TEXT,
      producers TEXT,
      winner TEXT
    );
  `);
};

module.exports = { db, initDB };