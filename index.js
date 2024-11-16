const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs"); //replace string with 'bycrypt' only if this doesnt work
const userModel = require("./config/config");
const app = express();

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

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
