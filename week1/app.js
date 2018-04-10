var express = require('express');
var compression = require('compression');
var controllers = require('./controllers');
var app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static('public'));
app.use(compression());

app.use('/', controllers);

app.listen(3000, function() {
	console.log('server is running on port 3000');
});
