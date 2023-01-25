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
      console.log(result);
    })
    .catch((error) => {
      if (error.code == 11000) {
        next(new Error("DUP_NAME"));
      } else {
        next(new Error("INTERNAL_ERROR"));
      }
    });
});

module.exports = router;
