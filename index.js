'use strict';
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
	// path: '/browser-sync/socket.io'
});
var serveStatic = require('serve-static');
var fs = require('fs')
var room;
app.use(express.static('static'));
app.use(express.static('public'));

app.get('/admin', function (req, res) {
	app.use(express.static('private'));
	res.sendFile(__dirname + '/private/index.html');
});

app.get('/:room', function (req, res) {
	res.sendFile(__dirname + '/public/index.html');
	room = req.params.room
})



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


var path = require('path'),
	fs = require('fs');

function fromDir(startPath, filter, callback) {

	//console.log('Starting from dir '+startPath+'/');

	if (!fs.existsSync(startPath)) {
		console.log("no dir ", startPath);
		return;
	}

	var files = fs.readdirSync(startPath);
	for (var i = 0; i < files.length; i++) {
		var filename = path.join(files[i]);
		if (filter.test(filename)) {
			callback(filename.slice(0, -5));
		}
	};
};

var rooms = ['main', 'second', 'third'];


io.on('connection', function (socket) {

	console.log(socket.id +'-------' + room);

	if(room != 'undefined'){
		socket.join(room)
	}

	fromDir('rooms/', /\.json$/, function (filename) {
		// console.log(filename);

	});

	socket.on('disconnect', function () {
		socket.broadcast.emit('send rooms', findRooms());
	})


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

		// socket.broadcast.emit('send rooms', findRooms());

		var content = '[{"text": {"head": "hello world!"}}]';
		var encoding = "utf8";

		// fs.writeFile('./rooms/' + room + '.json', content, encoding, (err) => {
		// 	if (err) throw err;

		// 	console.log("The file was succesfully saved!");
		// });
	});

	socket.on('get rooms', function () {
		// socket.emit('send rooms', findRooms());
		var s = io.sockets.adapter.rooms
		socket.emit('send rooms', s);
	})

	socket.on('join', function (room) {
		socket.join(room)

	})


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