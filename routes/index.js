const express = require('express')
const router = express.Router();
const student = require("./students.routes");

router.use("/students", student);

module.exports = router;