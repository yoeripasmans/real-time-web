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
    socket.on('mouseup', function(index) {
        socket.broadcast.emit('mouseup', index);
    });
	io.sockets.emit('totalUsers', {count: io.engine.clientsCount});

    //Disconnect
    socket.on('disconnect', function(data) {
        //added this below
        io.sockets.emit('totalUsers', {count: io.engine.clientsCount});
    });

});

http.listen(process.env.PORT || 3000, function() {
    console.log('server is running on port 3000');
});
