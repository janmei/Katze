/**
 * Data Logic
 */


var time;
var selectedRoom;

$(function () {
	var socket = io('http://localhost:8000', {
		// path: '/browser-sync/socket.io',
		reconnection: false,
		forceNew: false
	});
	//Setup

	socket.on('connect', function () {
		console.log(socket.id);

		socket.emit('get rooms')
	})


	// Reconnects on disconnection
	socket.on('disconnect', function () {
		socket.connect();
	});


	socket.on('send rooms', function (data) {
		console.log(data);
		listRooms(data)
	});



	function joinRoom(room) {
		socket.emit('join', room)
	}


	function listRooms(data) {
		var els = [];
		for (let item of data) {
			var el = $('<option value="' + item + '">' + item + '</option>')
			els.push(el)
		}
		$('#roomSelect').empty()
		$('#roomSelect').append(els)
	}

	$('#roomSelect').change(function (el) {
		selectedRoom = $('#roomSelect').val()
		joinRoom(selectedRoom)
	})















	// gets teams from group.json
	$.getJSON('../group.json', function (data) {
		$.each(data.groups, function (key, val) {
			var rowId = '#' + key;
			$('#timeBody').append('<tr id=' + key + '>');
			$(rowId)
				.append('<th scope="row">' + val.semester + '</th>')
				.attr('id', key);
			$(rowId).append('<td>' + val.teamName + '</td>');
			$(rowId).append('<td>' + val.members + '</td>');
			$(
				'<td><button type="submit" class="btn btn-danger" id="team" data-team="' +
				key +
				'">Show</button></td>'
			).appendTo(rowId);
		});
	});


	function isEmpty(el) {
		return !$.trim(el.html());
	}


	function countdown(minutes, secs) {
		var seconds = secs || 60;
		var mins = minutes;

		function tick() {
			var current_minutes = mins - 1;
			seconds--;

			$('.count').html(
				current_minutes.toString() +
				':' +
				(seconds < 10 ? '0' : '') +
				String(seconds)
			);
			if (seconds > 0) {
				time = setTimeout(tick, 1000);
			} else {
				if (mins > 1) {
					countdown(mins - 1);
				}
			}
		}
		tick();
	}
});


/**
 * Layout functions
 */

$(function () {
	let s = $('#wrap').width() / 1920
	$('#frame').css('transform', 'scale(' + s + ')')
	$(window).resize(function () {
		let s = $('#wrap').width() / 1920
		$('#frame').css('transform', 'scale(' + s + ')')
	})

})