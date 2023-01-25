const express = require("express");
let bcrypt = require("bcryptjs");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  const user = User.findOne({ userName }).lean();
  if (!user) {
    return res.json({
      status: "error",
      error: "invalid user name or password",
    });
  }
  if (await bcrypt.compare(password, user.password)) {
    res.json({ status: "ok", data: "" });
  }
  res.json({
    status: "error",
    error: "invalid user name or password",
  });
});

module.exports = router;
