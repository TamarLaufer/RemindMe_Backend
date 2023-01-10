const express = require("express");
const { default: mongoose } = require("mongoose");

const router = express.Router();
const Child = require("../models/child");
const Group = require("../models/group");

//Get all children from all groups together::
router.get("/", (req, res) => {
  Child.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Get all childrern in a specipic group with groupId:
router.get("/:groupId", (req, res) => {
  console.log(req.params);
  Child.find({ group: req.params.groupId })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/add-child", (req, res) => {
  const child = new Child(req.body);
  child
    .save()
    .then((childRes) => {
      Group.findOne({ _id: childRes.group }).then((groupRes) => {
        groupRes.childrenList.push(childRes._id);
        groupRes.save().then((savedGroup) => {
          res.send(childRes);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Delete child by ID:
router.delete("/delete-child/:id", (req, res) => {
  const id = req.params.id;
  Child.findOne({ _id: id })
    .then((result) => {
      if (result.group !== null) {
        Group.findOne({ _id: result.group }).then((resGroup) => {
          resGroup.childrenList = resGroup.childrenList.filter(
            (childId) => childId.toString() !== id.toString()
          );
          resGroup.save().then((savedResp) => {
            console.log("deleteChild", savedResp);
          });
        });
      }
      console.log("log result", result);
    })
    .catch((err) => {
      console.log(err);
    });
  Child.findByIdAndDelete(id).then((deletedChild) => {
    console.log("deletedChild", deletedChild);
    res.send(deletedChild);
  });
});

router.patch("/update-child/:id", (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const options = { new: true };
  removeChildFromGroup(id);
  addChildToGroup(update.group, id);
  Child.findByIdAndUpdate(id, update, options)
    .then((result) => {
      res.send(result);
      console.log("edit result", result);
    })
    .catch((err) => {
      console.log(err);
    });
});

const removeChildFromGroup = (id) => {
  Child.findOne({ _id: id })
    .then((child) => {
      Group.findOne({ _id: child.group }).then((groupRes) => {
        groupRes.childrenList = groupRes.childrenList.filter(
          (childId) => childId.toString() !== id.toString()
        );
        groupRes.save().then((resu) => {
          console.log("remove", resu);
        });
      });
      // res.send(child);
    })
    .catch((err) => {
      console.log(err);
    });
};

const addChildToGroup = (groupId, childId) => {
  Group.findOne({ _id: groupId }).then((groupRes) => {
    groupRes.childrenList.push(childId);
    groupRes.save().then((res) => {
      console.log("add");
    });
  });
};

module.exports = router;
