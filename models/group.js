const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const groupSchema = new Schema(
  {
    groupName: {
      type: String,
      require: true,
    },
    assistantName: String,
    childrenList: [{ type: Schema.Types.ObjectId, ref: "Child" }],
  },
  { timestamps: true }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
