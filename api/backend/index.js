const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const http = require('http'); 

require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'your_secret_key',
    resave: true,
    saveUninitialized: true
}));

// app.use(express.static(path.join(__dirname, 'public')));

let calculatorRoute = require('./routes/calculator');
app.use('/', calculatorRoute);

const server = http.createServer(app); 
const io = require('socket.io')(server,{
    cors : {
        origin : ['http://127.0.0.1:5500']
    }
}); 

io.on('connection', (socket) => {
    console.log('A user connected' , socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    socket.on('sendMessage', (value) => {
        console.log(value)
        console.log('Received test event from client');

        socket.broadcast.emit('recieve_message', value);
    });
});

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log('Server running at ' + process.env.base_url);
});
