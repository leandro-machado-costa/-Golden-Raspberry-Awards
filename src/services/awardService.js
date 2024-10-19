const { db } = require('../config/database');

/**
 * Service to calculate the producer award intervals.
 * It queries the producers' wins, calculates the intervals, and finds the max and min intervals.
 * 
 * @returns {Object} - Object containing 'min' and 'max' intervals for producers.
 */
const calculateProducersInterval = () => {
  // Query to get the producers and their win years, calculating the intervals between wins
  const query = `
    WITH ProducerWins AS (
      SELECT 
        p.name AS producer,
        m.year,
        LAG(m.year) OVER (PARTITION BY p.id ORDER BY m.year) AS previousWin
      FROM 
        producers p
      JOIN 
        movie_producers mp ON p.id = mp.producer_id
      JOIN 
        movies m ON mp.movie_id = m.id
      WHERE 
        m.winner = 'yes'
    )
    SELECT 
      producer,
      (year - previousWin) AS interval,
      previousWin,
      year AS followingWin
    FROM 
      ProducerWins
    WHERE 
      previousWin IS NOT NULL;
  `;

  const intervals = db.prepare(query).all();

  const maxInterval = Math.max(...intervals.map(i => i.interval));
  const minInterval = Math.min(...intervals.map(i => i.interval));

  const maxResults = intervals.filter(i => i.interval === maxInterval);
  const minResults = intervals.filter(i => i.interval === minInterval);

  return {
    min: minResults.map(result => ({
      producer: result.producer,
      interval: result.interval,
      previousWin: result.previousWin,
      followingWin: result.followingWin
    })),
    max: maxResults.map(result => ({
      producer: result.producer,
      interval: result.interval,
      previousWin: result.previousWin,
      followingWin: result.followingWin
    }))
  };
};

module.exports = { calculateProducersInterval };
