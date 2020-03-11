const app = require('express')();
const cors = require('cors');
app.use(cors());
const http = require('http').Server(app);
const io = require('socket.io')(http);

const
    connectedUsers = {},
    messages = [];

app.get('/users/', function (req, res) {
    res.json(connectedUsers)
});


app.get('/messages/', function (req, res) {
    res.json(
        messages
            .filter(message => (
                (message.from === req.query.user1 && message.to === req.query.user2) ||
                (message.from === req.query.user2 && message.to === req.query.user1)
            ))
            .sort((m1, m2) => m1.timestamp < m2.timestamp ? 1 : -1)
    )
});

io.on('connection', function (socket) {

    socket.on('registerConnection', data => {
        const login = data.login;
        socket.login = login;
        data['socketId'] = socket.id;
        data['status'] = true;
        if (!data.photo) data['photo'] = "images/default-photo.png";
        connectedUsers[login] = data;
        io.sockets.emit('updateUser', data);
        console.log('user connected', login)
    });

    socket.on('initMsg', data => {
        data.timestamp = Date.now();
        messages.unshift(data);
        socket.emit('confirmMsg', data);
        console.log(data);
        const socketIdTo = connectedUsers[data.to].socketId;
        if (socketIdTo && socketIdTo !== socket.id) {
            io.to(socketIdTo).emit('newMsg', data)
        }
    });

    socket.on('updateUserPhoto', data => {
        if (!data.photo) data['photo'] = "images/default-photo.png";
        connectedUsers[socket.login]['photo'] = data.photo;
        io.sockets.emit('updateUser', connectedUsers[socket.login]);
    });

    socket.on('disconnect', () => {
        userData = connectedUsers[socket.login];
        if (!userData) return;
        userData.status = false;
        io.sockets.emit('updateUser', userData);
        console.log('a user disconnected to default', socket.login);
        console.log('renaining connections', connectedUsers);
    })
});


http.listen(3000, function () {
    console.log('listening on *: 3000');
});