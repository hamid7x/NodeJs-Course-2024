require("dotenv").config();
const express = require("express");
const connectToDB = require("./database/db");
const productRouter = require('./routes/product.routes');
const bookRouter = require('./routes/book.routes');
const app = express();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());

//connect mongodb;
connectToDB();


//routes
app.use("/api/products/",productRouter)
app.use("/api/books/",bookRouter)
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
