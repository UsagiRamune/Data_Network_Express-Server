const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController');

const validateScore = require('../middleware/validateScore');

router.get('/:id', playerController.getPlayerById);
router.post('/score', validateScore, playerController.submitScore);

module.exports = router;