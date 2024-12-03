const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const AuthRouter = require("./routes/AuthRouter");
const ProductRouter = require("./routes/ProductRouter");
const { ensureAuthenticated } = require("./middlewares/Auth");

require("dotenv").config();
require("./config/config"); //db connection
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(bodyParser.json());
app.use(cors());
app.use("/auth", AuthRouter);
app.use("/products", ProductRouter);

//added for debugging
app.get("/products", ensureAuthenticated, (req, res) => {
  console.log("Authorization Header:", req.headers.authorization);
});

//set ejs as a view engine
//app.set("view engine", "ejs");

//static folder path for css
//app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
