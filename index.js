'use strict';
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http, {
	// path: '/browser-sync/socket.io'
});
var fs = require('fs');
var encoding = "utf8";

var room;

var availableRooms

// EXPRESS SETTINGS
app.use(express.static('static'));
app.use(express.static('public'));

app.get('/admin', function (req, res) {
	app.use(express.static('private'));
	res.sendFile(__dirname + '/private/index.html');
});

app.get('/:room', function (req, res) {
	room = req.params.room
	availableRooms = JSON.parse(getRooms())

	if (availableRooms.rooms.includes(room)) {
		res.sendFile(__dirname + '/public/index.html');
	} else {
		res.sendFile(__dirname + '/public/empty.html');
	}
})




function getRooms() {
	var data = fs.readFileSync('./rooms/config.json', encoding, (err, data) => {
		if (err) throw err;
		return data;
	})
	return data;
}

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


io.on('connection', function (socket) {

	if (room == undefined) {
		return
	}
	socket.join(room)

	/**
	 * create JSON Files for State Sharing
	 */

	if (fs.existsSync('./rooms/' + room + '.json')) {
		socket.emit('SERVER -> ALL', getCurrentSlideState(room))
	} else {
		var content = '{"text": {"head": "hello world!"}}';

		fs.writeFile('./rooms/' + room + '.json', content, encoding, (err) => {
			if (err) throw err;

			console.log("The file was succesfully saved!");
		});
	}


	/**
	 * Create CONFIG or Emit it
	 */

	if (fs.existsSync('./rooms/config.json')) {
		socket.emit('SERVER -> BACK send rooms', getRooms())

	} else {
		var content = '{"rooms": []}';
		fs.writeFile('./rooms/config.json', content, encoding, (err) => {
			if (err) throw err;

			console.log("The file was succesfully saved!");
		});
	}



	socket.on('disconnect', function () {
		// socket.broadcast.emit('SERVER -> BACK send rooms', findRooms());
	})


	/**
	 * 
	 * CREATE ROOM
	 * 
	 * creates rooms for clients
	 * 
	 */

	socket.on('BACK -> SERVER get rooms', function () {
		socket.emit('SERVER -> BACK send rooms', getRooms());
	})

	socket.on('join', function (room) {
		socket.join(room)
		console.log(socket.id, 'joined', room);

		socket.emit('SERVER -> BACK current slide state', getCurrentSlideState(room))
	})

	function getCurrentSlideState(roomId) {
		if (roomId == undefined || roomId === '') {
			return
		}
		var data = fs.readFileSync('./rooms/' + roomId + '.json', encoding, (err, data) => {
			if (err) throw err;
			return data;
		})
		return data;
	}

	fs.watch('./rooms/', (eventType, filename) => {
		console.log(`event type is: ${eventType}`);
		if (filename) {
			console.log(`filename provided: ${filename}`);
			socket.to(room).emit('SERVER -> BACK current slide state', getCurrentSlideState(room))

		} else {
			console.log('filename not provided');
		}
	});

	function updateFile(room, data) {
		if (Array.isArray(room)) {
			var rooms = room;
			for (var room of rooms) {
				fs.writeFile('./rooms/' + room + '.json', data, encoding, (err) => {
					if (err) throw err;

					console.log("The file was succesfully saved!");
				});
			}
		} else {
			fs.writeFile('./rooms/' + room + '.json', data, encoding, (err) => {
				if (err) throw err;

				console.log("The file was succesfully saved!");
			});
		}
	}

	socket.on('BACK -> SERVER add room', function (data) {

		fs.writeFile('./rooms/config.json', data, encoding, (err) => {
			if (err) throw err;

			console.log("The file was succesfully saved!");
		});
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

	socket.on('BACK -> SERVER update text', function (room, data) {

		console.log(room, data);

		updateFile(room, data)
		socket.to(room).emit('SERVER -> ROOM update text', room, data)


	})

	socket.on('ROOM -> SERVER get data', function (room) {
		socket.emit('SERVER -> ROOM update text', room, getCurrentSlideState(room))
	})

	socket.on('BACK -> SERVER update all rooms', function (data) {
		let rooms = getRooms()
		updateFile(rooms, data)

		socket.broadcast.emit('SERVER -> ROOM update text', "all", data)
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