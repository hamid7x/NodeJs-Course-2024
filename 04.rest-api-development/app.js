const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;

const books = [
    {
        id: 1,
        label: "book 1"
    },
    {
        id: 2,
        label: "book 2"
    },
    {
        id: 3,
        label: "book 3"
    },
    {
        id: 4,
        label: "book 4"
    },

]

app.get('/',(req, res)=>{
    res.send('welcome to our books store api.');
})

//get all books.
app.get('/books',(req, res)=>{
    res.json(books);
})

app.get('/books/:id',(req, res)=>{
    const {id} = req.params;
    console.log(id)
    const book = books.find((book)=>book.id === parseInt(id));
    console.log(book)
    res.json(book)
})

app.listen(port,()=>{
    console.log(`server runing on port ${port}`)
})

