const express = require("express");
const router = express.Router();

// Controllers
const {
  generatePassword,
  verifyPassword
} = require("../controllers/auth");

router.route("/generate").post(generatePassword);

router.route("/verify").post(verifyPassword);

module.exports = router;
