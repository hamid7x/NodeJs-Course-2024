const Book = require("../models/Book");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({}).select("-_id title author");
    if (!books.length > 0)
      return res
        .status(404)
        .json({ success: false, message: "no books found in database!" });

    res
      .status(200)
      .json({
        success: true,
        message: "books fetched successfully.",
        books: books,
      });
  } catch (e) {
    console.log(`error in getAllBook:-> `, e.message);
  }
};
const getSingleBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book)
      return res
        .status(404)
        .json({ success: false, message: "book not found!" });

    res
      .status(200)
      .json({ success: true, message: "book found successfuly.", book: book });
  } catch (e) {
    console.log(`error in getSingleBookById:-> `, e.message);
    res.status(500).json({ success: false, error: "internal server error" });
  }
};
const addNewBook = async (req, res) => {
  try {
    const {title, author, year} = req.body;
    if(!title || !author || !year) return res.status(400).json({success: false, message: "please provide all fields."});
    
    const newBook = new Book({
        title,
        author, 
        year
    });

    await newBook.save();

    res
      .status(201)
      .json({
        success: true,
        message: "book created successfuly.",
        book: newBook,
      });
  } catch (e) {
    console.log(`error in addNewBook:-> `, e.message);
  }
};
const updateBook = async (req, res) => {
  try {
    const productId = req.params.id;
    const updatedBookData = req.body;

    const book = await Book.findById(productId);
    if (!book)
      return res.status(201).json({ success: true, message: "book not found" });

    const updatedBook = await Book.findByIdAndUpdate(
      productId,
      updatedBookData,
      { new: true }
    );
    res
      .status(200)
      .json({
        success: true,
        message: "book updated succssfully",
        data: updatedBook,
      });
  } catch (e) {
    console.log(`error in updateBook:-> `, e.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
const deleteBook = async (req, res) => {
  try {
    const productId = req.params.id;
    const book = await Book.findById(productId);
    if (!book)
      return res.status(201).josn({ success: true, message: "book not found" });

    const deletedBook = await Book.findByIdAndDelete(productId);
    res
      .status(200)
      .json({
        success: true,
        message: "book deleted successfully.",
        book: deletedBook,
      });
  } catch (e) {
    console.log(`error in deleteBook:-> `, e.message);
  }
};

module.exports = {
  getAllBooks,
  getSingleBookById,
  addNewBook,
  updateBook,
  deleteBook,
};
