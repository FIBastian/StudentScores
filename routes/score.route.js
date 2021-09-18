const express = require('express');
const router = express.Router();
const scores = require('../controllers/scoreController');
const auth = require("../middleware/auth");


router.post('/score', auth, scores.postScore)
router.get('/score/:id', scores.getScore)
router.put('/score/:id', scores.updateScore)
router.delete('/score/:id', scores.deleteScore)

module.exports = router