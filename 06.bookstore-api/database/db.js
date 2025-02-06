const mongoose = require('mongoose');

const connectToDB = async () => {
  try{
    // await mongoose.connect("mongodb+srv://hamidkaamouch123:NxflPyP7DSLPuhCw@cluster0.wcbtt.mongodb.net/");
    await mongoose.connect("mongodb://localhost:27017/bookManagement")
    console.log("MongoDB is connected successfully ✅😁")
  }catch(e){
    console.error("MongoDB connection Failed ❌😢,",e.message);
    process.exit(1);
  }
};

module.exports = connectToDB;