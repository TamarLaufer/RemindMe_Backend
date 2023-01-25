const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },

    phoneNumber: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    groupsList: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
