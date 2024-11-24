require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("../models/User");

const validateAndFixUsers = async () => {
  try {
    // Ensure MONGO_URI is properly loaded
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    // Connect to MongoDB
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");

    // Use the correct model (userModel)
    const users = await userModel.find(); // Changed User to userModel
    for (const user of users) {
      if (!user.email) {
        user.email = `default_${user.name}@example.com`; // Changed username to name based on your schema
        await user.save();
        console.log(`Updated user: ${user.name}`); // Changed username to name
      }
    }

    console.log("All users have been validated and fixed.");
  } catch (error) {
    console.error("Error during validation:", error);
  } finally {
    mongoose.connection.close();
  }
};

validateAndFixUsers();
