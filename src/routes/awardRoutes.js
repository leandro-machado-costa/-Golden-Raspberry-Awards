const express = require('express');
const { getProducerIntervals } = require('../controllers/awardController');

const router = express.Router();

/**
 * @swagger
 * /api/producers/awards:
 *   get:
 *     summary: Get producers with the longest and shortest award intervals
 *     description: Retrieves the producers with the maximum and minimum intervals between awards.
 *     tags:
 *       - Awards
 *     responses:
 *       200:
 *         description: Producers interval data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 min:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       producer:
 *                         type: string
 *                         example: "Producer 1"
 *                       interval:
 *                         type: integer
 *                         example: 1
 *                       previousWin:
 *                         type: integer
 *                         example: 2008
 *                       year:
 *                         type: integer
 *                         example: 2009
 *                 max:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       producer:
 *                         type: string
 *                         example: "Producer 2"
 *                       interval:
 *                         type: integer
 *                         example: 10
 *                       previousWin:
 *                         type: integer
 *                         example: 2000
 *                       year:
 *                         type: integer
 *                         example: 2010
 *       500:
 *         description: Error retrieving producer intervals.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get('/producers/awards', getProducerIntervals);

module.exports = router;
