const express = require("express");
const router = express.Router();
let bcrypt = require("bcryptjs");
const User = require("../models/user");

router.post("/", async (req, res, next) => {
  const {
    userName,
    password: plainTextPassword,
    phoneNumber,
    email,
    groupsList,
  } = req.body;
  const password = await bcrypt.hash(plainTextPassword, 10);
  User.create({
    userName,
    password,
    phoneNumber,
    email,
    groupsList,
  })
    .then((result) => {
      res.send(result);
      console.log("result", result);
    })
    .catch((error) => {
      // res.status(301)
        // console.log('error', error);
        res.send(error);
    });
});

module.exports = router;
