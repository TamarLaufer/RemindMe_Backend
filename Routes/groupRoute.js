const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const Child = require("../models/child");
const User = require("../models/user");

router.get("/", (req, res) => {
  Group.find()
    .then((result) => {
      res.status(200);
      res.send(result);
      // console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/add-group", (req, res) => {
  const group = new Group(req.body);
  group
    .save()
    .then((groupRes) => {
      console.log(groupRes);
      User.findOne({ _id: groupRes.user }).then((resUser) => {
        console.log(resUser);
        resUser.groupsList.push(groupRes._id);
        resUser.save().then((savedUser) => {
          res.send(groupRes);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/delete-group/:id", (req, res) => {
  const id = req.params.id;
  Group.findOne({ _id: id })
    .then((result) => {
      if (!result) {
        res.status(404).send();
        return;
      }
      Child.deleteMany({ _id: { $in: result.childrenList } }).then(
        (resChildren) => {
          res.send(resChildren);
          User.findOne({ _id: result.user })
            .then((resUser) => {
              resUser.groupsList = resUser.groupsList.filter(
                (groupId) => groupId.toString() !== id.toString()
              );
              resUser
                .save()
                .then((savedResp) => {
                  console.log("deleteGroup", savedResp);
                  Group.findByIdAndDelete(id).then((resGroupDel) => {
                    console.log("resGroupDel", resGroupDel);
                  });
                })
                .catch((err) => {
                  res.send(err);
                });
            })
            .catch((err) => {
              res.send(err);
            });
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

router.patch("/update-group/:id", (req, res) => {
  const id = req.params.id;
  const update = req.body;
  Group.findOne({ _id: id })
    .then((result) => {
      result.groupName = update.groupName;
      result.assistantName = update.assistantName;
      result.childrenList = update.childrenList;
      result.save().then((savedRes) => {
        res.send(savedRes);
        console.log(savedRes);
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get all groups in a specipic user with userId:
router.get("/:userId", (req, res) => {
  Group.find({ user: req.params.userId })
    .then((result) => {
      console.log(result);
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
