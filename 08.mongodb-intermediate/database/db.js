const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected successfully.");
  } catch (error) {
    console.log("failed to connect mongodb:", error.message);
  }
};

module.exports = connectToDB;
