const express = require('express');
const path = require('path');

const app = express();

app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, "views"))

const products = [
    {
        id: 1,
        label: "product 1"
    },
    {
        id: 2,
        label: "product 2"
    },
    {
        id: 3,
        label: "product 3"
    },
    {
        id: 4,
        label: "product 4"
    },

]

app.get('/',(req, res)=>{
    res.render('home', {title: 'home', products: products})
})

app.get('/about',(req, res)=>{
    res.render('about', {title: 'aobut page'})
})


app.listen(3000, ()=>{
    console.log('server runing on port 3000')
})

