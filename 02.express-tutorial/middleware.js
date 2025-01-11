const express = require('express');
const app = express();

const middlewareFunction = (req, res, next) => {
    console.log('this middleware will exicute every time.')
    next();
}


app.use(middlewareFunction)
app.get('/',(req, res)=>{
    res.send('home page');
})

app.get('/about', (req, res)=> {
    res.send('about page');
})

app.listen(3000,(req, res)=>{
    console.log(`server runing on port 3000`);
})