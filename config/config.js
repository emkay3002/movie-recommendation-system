//create database connection in this file

const mongoose = require("mongoose");

const connect = mongoose.connect(
  "mongodb+srv://emkay:1234@cluster0.vqvzh.mongodb.net/movie-recommendation-systemdb"
);

//check connection
connect
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.log("Error connecting to the database", err);
  });

//create user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//create user model/collection
const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
