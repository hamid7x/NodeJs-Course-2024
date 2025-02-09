const Author = require("../models/Author");
const Book = require("../models/Book");

const createAuthor = async (req, res) => {
    try{
        const author = new Author(req.body);
        await author.save();
        res.status(201).json({success: true, author})
    }catch (error) {
        console.log("error in createAuthor controller:->", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
      }
}

const createBook = async (req, res) => {
    try{
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({success: true, book})
    }catch (error) {
        console.log("error in createBook controller:->", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
      }
}
const getBookWithAuthor = async (req, res) => {
    try{
        const book = await Book.findById(req.params.id).populate('author');
        res.status(201).json({success: true, book})
    }catch (error) {
        console.log("error in getBookWithAuthor controller:->", error.message);
        res.status(500).json({ success: false, message: "Internal server error." });
      }
}

module.exports= {
    createAuthor,
    createBook,
    getBookWithAuthor
}