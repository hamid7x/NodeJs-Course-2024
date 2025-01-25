const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "book title is required."],
    trim: true,
    maxLength: [100, "book title cannot be more than 100 character."],
  },
  author: {
    type: String,
    required: [true, "author name is required."],
  },
  year: {
    type: Number,
    required: [true, "Publication year is required."],
    min: [1000, "Year be at least 1000"],
    max: [new Date().getFullYear(), "Year cannot be in the future."],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
