app = require('./utils/app');

//configurations of nessecary modules
var http = require('http');

var server = http
.createServer(app)
.listen((process.env.PORT || 5000), function(){
	console.log('Node server is listening on port %d', this.address().port);
});

io = require('socket.io').listen(server);

io.on('connection', function(socket){
	socket.on('connected', function(macAddress){
		io.emit(macAddress, 'connected');
	});

	socket.on('disconnected', function(macAddress){
		io.emit(macAddress, 'disconnected');
	})
});

require('./controllers');