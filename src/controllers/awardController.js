const { calculateProducersInterval } = require('../services/awardService');

/**
 * Controller to handle the API request for producer award intervals.
 * Fetches data from the service layer and returns it as a JSON response.
 */
const getProducerIntervals = (req, res, next) => {
  try {
    const result = calculateProducersInterval();
    res.status(200).json(result); 
  } catch (error) {
    next(error); 
  }
};

module.exports = { getProducerIntervals };
