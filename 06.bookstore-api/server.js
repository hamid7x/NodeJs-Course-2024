const express = require("express");
const connectToDB = require("./database/db");
const bookRouter = require('./routes/book.router');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT;


//connect to our DB
connectToDB();

//middlewares
app.use(express.json());

//routes
app.use('/api/books/',bookRouter)

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})







