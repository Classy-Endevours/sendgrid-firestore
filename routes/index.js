const express = require("express");
const { get, save } = require("../controller/user");
const router = express.Router();

router.get('/user', get)
router.post('/user/save', save)

router.get("/", function (req, res, next) {
  res
    .status(200)
    .send("Welcome to the firestore and sendgrid starter project!");
});

module.exports = router;
