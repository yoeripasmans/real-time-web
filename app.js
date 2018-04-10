var express = require('express');
var compression = require('compression');
var controllers = require('./controllers');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(compression());

app.use('/', controllers);

io.on('connection', function(socket) {
	console.log(io.engine.clientsCount);
    console.log('a user connected');
    socket.on('playsound', function(sound) {
        socket.broadcast.emit('playsound', sound);
    });
	socket.on('mousedown', function(index) {
        socket.broadcast.emit('mousedown', index);
    });
	socket.on('mouseup', function(index) {
        socket.broadcast.emit('mouseup', index);
    });
});

http.listen(3000, function() {
    console.log('server is running on port 3000');
});
