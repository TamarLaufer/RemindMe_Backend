const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const childSchema = new Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },

    address: String,
    group: { type: Schema.Types.ObjectId, ref: "Group" },
    parentPhone: {
      type: String,
      require: true,
    },
    parent2Phone: String,
    isArrived: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const Child = mongoose.model("Child", childSchema);

module.exports = Child;
