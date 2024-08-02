const express = require("express");
const router = express.Router();
const userController = require("../controllers/usercontroller");

router.post("/sign-up", userController.registerUser);
router.post("/sign-in", userController.loginUser);
router.post("/voiceChart", userController.voiceChart)


module.exports = router;