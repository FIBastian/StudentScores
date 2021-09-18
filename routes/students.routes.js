const express = require('express');
const router = express.Router();
const student = require('../controllers/studentController');
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const uploadCloud = require("../middleware/uploadCloud");

router.post('/student',auth, upload("photo"), student.postStudents)
router.get('/student', student.getStudents)
router.put('/student/:id', student.updateStudents)
router.delete('/student/:id', student.deleteStudents)

module.exports = router