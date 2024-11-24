const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//create user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

//create user model/collection
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
