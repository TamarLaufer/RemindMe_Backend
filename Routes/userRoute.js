const express = require("express");

const router = express.Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  User.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/add-user", (req, res) => {
  const user = new User(req.body);
  user
    .save()
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// router.post("/add-user", (req, res) => {
//   const user = new User(req.body);
//   user
//     .save()
//     .then((userRes) => {
//       Group.findOne({ _id: userRes.group }).then((groupRes) => {
//         groupRes.childrenList.push(childRes._id);
//         groupRes.save().then((savedGroup) => {
//           res.send(childRes);
//         });
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

router.get("/add-user", (req, res) => {
  const user = new User();
  const body = req.body;

  //   user
  //     .save()
  // .then((result) => {
  //   res.send(result);
  // })
  // .catch((err) => {
  //   console.log(err);
  // });
});

module.exports = router;
