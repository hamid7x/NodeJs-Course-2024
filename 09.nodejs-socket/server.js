const express = require('express');
const http = require('http');
const app = express();
const socketIo = require('socket.io');


const server = http.createServer(app);

//initialize the socket 
const io = socketIo(server);


app.use(express.static('public'));