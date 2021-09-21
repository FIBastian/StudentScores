const express = require('express');
const router = express.Router();
const student = require('../controllers/studentController');
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const uploadCloud = require("../middleware/uploadCloud");

router.post('/', auth, upload("photo"), student.postStudents)
router.get('/', student.getStudents)
router.get('/:id', student.getStudent)
router.put('/:id', auth, student.updateStudents)
router.delete('/:id', auth, student.deleteStudents)

module.exports = router