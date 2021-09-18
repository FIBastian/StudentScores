const express = require('express')
const router = express.Router();
const studentRoute = require("./students.routes");
const scoreRoute = require("./score.route");
const authRoute = require("./authRoute")

router.use("/students", studentRoute);
router.use("/score", scoreRoute);
router.use("/auth", authRoute);

module.exports = router;