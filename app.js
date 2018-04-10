var express = require('express');
var compression = require('compression');
var controllers = require('./controllers');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var ss = require('socket.io-stream');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(compression());

app.use('/', controllers);

io.on('connection', function(socket) {
    console.log('a user connected');
    socket.on('play sound', function(sound) {
        socket.broadcast.emit('play sound', sound);
    });
});

http.listen(3000, function() {
    console.log('server is running on port 3000');
});
