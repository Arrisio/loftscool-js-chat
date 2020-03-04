const app = require('express')();
const cors = require('cors');
app.use(cors());
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');

const
    users = JSON.parse(fs.readFileSync('users.json')),
    userConnections = {},
    messages = [];

app.get('/users/', function (req, res) {
    res.json(users)
});

app.get('/messages/', function (req, res) {
    res.json(
        messages
            .filter(message => (message.from === req.query.user|| message.to === req.query.user))
            .sort((m1, m2) => m1.timestamp > m2.timestamp ? 1 : -1)
)
});

io.on('connection', function (socket) {
    socket.on('registerConnection', data => {
        socket.userId = data.userId;
        userConnections[data.userId] = socket;
    });

    socket.on('initMsg', data => {
        data.timestamp = Date.now();
        messages.push(data);
        console.log(data);
        userConnections[data.from].emit('confirmMsg', data);
        socketTo = userConnections[data.to];
        if (socketTo) {
            socketTo.emit('newMsg', data)
        }
        ;
    });

    socket.on('disconnect', () => {
        console.log('a user disconnected to default', socket.userId);
        delete userConnections[socket.userId];
    })
});


http.listen(3000, function () {
    console.log('listening on *: 3000');
});