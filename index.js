const express = require("express");
const app = express();
//const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");
const ProductRouter = require("./routes/ProductRouter");
//const bcrypt = require("bcryptjs"); //replace string with 'bycrypt' only if this doesnt work
//const userModel = require("./models/User");
//const signupValidation = require("./middlewares/AuthValidation");
require("dotenv").config();
require("./config/config"); //db connection
const PORT = process.env.port || 5000;
//convert data into json format
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);
//set ejs as a view engine
//app.set("view engine", "ejs");

//static folder path for css
//app.use(express.static("public"));

//parameters are route and callback function
//render login page
// app.get("/login", (req, res) => {
//   res.render("login");
// });

//render register/signup page
// app.get("/signup", (req, res) => {
//   res.render("signup");
// });

//register user
// app.post("/signup", async (req, res) => {
//   const data = {
//     name: req.body.username,
//     password: req.body.password,
//   };

//   //check if user already exists in the databae
//   const existingUser = await userModel.findOne({ name: data.name });
//   if (existingUser) {
//     res.send("User already exists");
//   } else {
//     //hash the password
//     const saltRounds = 10; //number of salt rounds for bcrypt
//     const hashedPassword = await bcrypt.hash(data.password, saltRounds);
//     //replace hash password with original password
//     data.password = hashedPassword;

//     const userData = await userModel.insertMany(data);
//     console.log(userData);
//   }
// });

// //user login code
// app.post("/login", async (req, res) => {
//   try {
//     const check = await userModel.findOne({ name: req.body.username });
//     if (!check) {
//       res.send("User not found");
//     }
//     //comapre the hash pass from the database with plain text
//     const compare = await bcrypt.compare(req.body.password, check.password);
//     if (compare) {
//       res.render("home");
//     } else {
//       req.send("Incorrect password");
//     }
//   } catch {
//     res.send("User not found");
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
