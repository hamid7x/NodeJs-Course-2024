const http = require('http');

const server = http.createServer((req, res)=>{
    console.log(req)
    res.send('hello form server side')
})


server.listen(8080, ()=>{
    console.log('listening to server on port 8080')
})