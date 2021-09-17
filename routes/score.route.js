const express = require('express');
const router = express.Router();
const scores = require('../controllers/scoreController');

router.post('/score', scores.postScore)
router.get('/score/:id', scores.getScore)
router.put('/score/:id', scores.updateScore)
router.delete('/score/:id', scores.deleteScore)

module.exports = router