const express = require("express");
const router = express.Router();
const User = require("../models/user");
let bcrypt = require("bcryptjs");

router.post("/", (req, res) => {
  const { userName, password } = req.body;
  User.findOne({ userName })
    .then((resUser) => {
      console.log(resUser);
      if (bcrypt.compare(password, resUser.password)) {
        console.log("it is compare");
        res.status(200).json({ succses: true });
      } else {
        res.json({
          status: "error",
          error: "invalid user name or password",
        });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
