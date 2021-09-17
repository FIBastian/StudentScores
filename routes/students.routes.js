const express = require('express');
const router = express.Router();
const student = require('../controllers/studentController');

router.post('/student', student.postStudents)
router.get('/student/:id', student.getStudents)
router.put('/student/:id', student.updateStudents)
router.delete('/student/:id', student.deleteStudents)

module.exports = router