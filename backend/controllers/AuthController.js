const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const { name } = require("ejs");

const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }
    const newUser = new userModel({ username, password, email });
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201).json({ message: "User created", success: true });
  } catch (err) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("Login attempt with username:", username); // Log the username

    const user = await userModel.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res
        .status(403)
        .json({ message: "Authentication Failed", success: false });
    }

    console.log("User found:", user.username);

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    console.log("Password comparison result:", isPasswordEqual); // Log the comparison result

    if (!isPasswordEqual) {
      console.log("Password does not match");
      return res
        .status(403)
        .json({ message: "Authentication Failed", success: false });
    }

    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({
      message: "Login successful",
      success: true,
      jwtToken,
      username: user.username,
    });
  } catch (err) {
    console.error("Error during login:", err); // Log the full error
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

module.exports = {
  signup,
  login,
};
