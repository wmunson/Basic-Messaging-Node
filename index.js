var express = require('express');
var app = express();
var port = 3700;
var jade = require('jade');
var path = require('path').join(__dirname);
// console.log(path.join(__dirname))

var http = require('http').Server(app);

app.set('views', path + '/tpl');
app.set('view engine', 'jade');

app.engine('jade', jade.__express);


app.get('/', function(req, res){
	res.render("page");
});

app.use(express.static(path + '/public'));

////////////   plain app function w/ http(i think) 
// app.listen(port, function(){
// 	console.log('listening on *:'+port);
// });

/////  socket.io listening 
var io = require('socket.io').listen(app.listen(port, function(){
	console.log('listening on *:'+port);
	})
);

io.sockets.on('connection', function(socket){
	socket.emit('message', {message: 'welcome to the chat room!'});
	socket.on('send', function(data){
		io.sockets.emit('message', data);
	});
});

/////// http listening for port(im confused)
// http.listen(port, function(){
// 	console.log('listening on *:'+port);
// })