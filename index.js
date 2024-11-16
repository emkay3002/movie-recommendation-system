const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs"); //replace string with 'bycrypt' only if this doesnt work
const userModel = require("./config/config");

const app = express();

//convert data into json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//set ejs as a view engine
app.set("view engine", "ejs");

//static folder path for css
app.use(express.static("public"));

//parameters are route and callback function
//render login page
app.get("/login", (req, res) => {
  res.render("login");
});

//render register/signup page
app.get("/signup", (req, res) => {
  res.render("signup");
});

//register user
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  //check if user already exists in the databae
  const existingUser = await userModel.findOne({ name: data.name });
  if (existingUser) {
    res.send("User already exists");
  }

  const userData = await userModel.insertMany(data);
  console.log(userData);
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
