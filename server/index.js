const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); //The ionic server
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let server = app.listen(3001);
let io = require('socket.io').listen(server);

let users = {},
    availableUsers = [],
    contacts = [
    {
        userName: 'Sarvesh M',
        email: 'sarvesh.m@gmail.com',
        profileLink: './images/user-icon.png'
    },
    {
        userName: 'James Bond',
        email: 'james.bond@gmail.com',
        profileLink: 'http://nicesnippets.com/demo/man01.png'
    },
    {
        userName: 'Steve Bonds',
        email: 'steve.bond@gmail.com',
        profileLink: 'http://nicesnippets.com/demo/man02.png'
    },
    {
        userName: 'Jasmin',
        email: 'jasmin.bond@gmail.com',
        profileLink: 'http://nicesnippets.com/demo/man03.png'
    },
    {
        userName: 'Jacks Bond',
        email: 'jacks.bond@gmail.com',
        profileLink: 'http://nicesnippets.com/demo/man04.png'
    }
];

io.on('connection', function(socket){
    io.emit('contactlist', contacts);

    socket.on('login', function(data){
        if(availableUsers.indexOf(data.userId) >= 0) {
            io.emit('userAlreadyLoggedIn', {user: data.userId, id: socket.id});
        } else {
            availableUsers.push(data.userId);
            // saving userId to array with socket ID
            users[socket.id] = data.userId;
            io.emit('loginUsers', availableUsers);
        }
    });

    socket.on('disconnect', function(){
        console.log('user ' + users[socket.id] + ' disconnected');
        // remove saved socket from users object
        availableUsers.splice(availableUsers.indexOf(users[socket.id]), 1);
        delete users[socket.id];
    });
    socket.on('chat message', function(msg){
        io.emit(msg.destinationUser, msg);
    });
});