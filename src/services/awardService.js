const { db } = require('../config/database');

/**
 * Service to calculate the producer award intervals.
 * It queries the producer_intervals view to find the producer with the longest and shortest intervals between awards.
 * 
 * @returns {Object} - Object containing 'min' and 'max' intervals for producers.
 */
const calculateProducersInterval = () => {

  const maxQuery = `
    SELECT producers, MAX(interval) AS maxInterval
    FROM producer_intervals
    GROUP BY producers
    ORDER BY maxInterval DESC
  `;

  const minQuery = `
    SELECT producers, count(*) AS minInterval
    FROM producer_intervals
    GROUP BY producers
    ORDER BY minInterval ASC
  `;

  const maxResult = db.prepare(maxQuery).all(); 
  const minResult = db.prepare(minQuery).all(); 

  return {
    min: [minResult], 
    max: [maxResult] 
  };
};

module.exports = { calculateProducersInterval };
