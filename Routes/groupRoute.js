const express = require("express");
const router = express.Router();
const Group = require("../models/group");
const Child = require("../models/child");

router.get("/", (req, res) => {
  Group.find()
    .then((result) => {
      res.status(200);
      res.send(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/add-group", (req, res) => {
  const group = new Group(req.body);
  group
    .save()
    .then((result) => {
      res.send(result);
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/delete-group/:id", (req, res) => {
  const id = req.params.id;
  Group.findByIdAndDelete(id)
    .then((result) => {
      Child.deleteMany({ _id: { $in: result.childrenList } }).then(
        (resChildren) => {
          res.send(resChildren);
          console.log("resChildren", resChildren);
        }
      );
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
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

module.exports = router;
