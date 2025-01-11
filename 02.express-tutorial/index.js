const express = require('express');
const app = express();

app.get('/',(req, res)=>{
    res.send("welcome to home page")
})

app.get('/products',(req, res)=>{
    const products = [
        {
            id: 1, 
            name: 'product 1'
        },
        {
            id: 2, 
            name: 'product 2'
        },
        {
            id: 3, 
            name: 'product 3'
        },
    ]

    res.json(products)
})

app.get('/products/:id', (req, res)=>{
    const {id} = req.params;

    res.send(`product ${id} details`)
})

const port = 3000
app.listen(port, ()=>{
    console.log(`app runing on port ${port}`);
})