const express = require('express');
const router = express.Router();
const scores = require('../controllers/scoreController');
const auth = require("../middleware/auth");


router.post('/', auth, scores.postScore)
router.get('/', scores.getScore)
router.get('/:id', scores.getOne)
router.put('/:id', auth, scores.updateScore)
router.delete('/:id', auth, scores.deleteScore)

module.exports = router