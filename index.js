'use strict';
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serveStatic = require('serve-static');

app.use(express.static('static'));
app.use(express.static('public'));

app.get('/admin', function (req, res) {
	app.use(express.static('private'));
	res.sendFile(__dirname + '/private/index.html');
});

const PORT = process.env.PORT || 8000;

http.listen(PORT, function () {
	console.log(`listening on http://localhost:${PORT}`);
});

// get all custom created rooms
function findRooms() {
	var availableRooms = [];
	var rooms = io.sockets.adapter.rooms;
	if (rooms) {
		for (var room in rooms) {
			if (!rooms[room].sockets.hasOwnProperty(room)) {
				availableRooms.push(room);
			}
		}
	}
	return availableRooms;
}

io.on('connection', function (socket) {
	/**
	 * 
	 * CREATE ROOM
	 * 
	 * creates rooms for clients
	 * 
	 */

	socket.on('create', function (room) {
		socket.join(room);
		console.log(room + ' created');

		socket.broadcast.emit('update rooms', findRooms());
	});


	/**
	 * 
	 * INIT EMIT
	 * 
	 * gets all current states fom front end 
	 * 
	 */

	socket.on('req current', function () {
		console.log('req current');
		io.emit('req current');
	});

	socket.on('send current', function (msg) {
		console.log('send current');
		io.emit('send current', msg);
	});


	/**
	 * 
	 * TEXT EMIT 
	 * 
	 * sends all texts from all input fields at once in one emit
	 * 
	 */

	socket.on('text', function (data) {
		io.emit('text', data);
	})

	socket.on('text response', function (data) {
		io.emit('text response', data);
	})


	/**
	 * 
	 * MEDIA EMIT
	 * 
	 * sends which media needs to be shown
	 * 
	 */

	socket.on('media', function (data) {
		console.log('media');
		io.emit('media', data);
	});


	/**
	 * 
	 * COUNTDOWN EMIT
	 * 
	 * starts and stops countdown
	 * sends response to back end if started
	 * 
	 */

	socket.on('countdown', function (msg) {
		console.log('countdown: ' + msg);
		io.emit('countdown', msg);
	});

	socket.on('clear countdown', function () {
		console.log('clear countdown!');
		io.emit('clear countdown');
	});

	socket.on('countdown res', function (msg) {
		console.log('countdown res: ' + msg);
		io.emit('countdown res', msg);
	});


});