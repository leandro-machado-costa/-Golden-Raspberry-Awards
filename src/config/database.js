const sqlite3 = require('better-sqlite3');
const db = new sqlite3(process.env.DATABASE_URL || ':memory:');

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

  db.exec(`
CREATE VIEW IF NOT EXISTS producer_intervals AS
WITH ProducerWins AS (
  SELECT
    producers,
    year,
    LAG(year) OVER (PARTITION BY producers ORDER BY year) AS previousWin
  FROM movies
  WHERE winner = 'yes'
)
SELECT
  producers,
  (year - previousWin) AS interval,
  previousWin,
  year
FROM ProducerWins
WHERE previousWin IS NOT NULL;

  `);
  
};

module.exports = { db, initDB };