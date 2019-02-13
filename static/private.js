/**
 * Data Logic
 */


var time;
var selectedRoom;
var availableRooms;

$(function () {
	var socket = io('http://localhost:8000', {
		// path: '/browser-sync/socket.io',
		// reconnection: false,
		// forceNew: false
	});
	//Setup

	socket.on('connect', function () {
		console.log(socket.id);

		socket.emit('BACK -> SERVER get rooms')

		setStatus(true)
	})


	// Reconnects on disconnection
	socket.on('disconnect', function () {
		// socket.connect();
		setStatus(false)
	});


	socket.on('SERVER -> BACK send rooms', function (data) {
		listRooms(data)
	});

	socket.on('SERVER -> BACK current slide state', function (data) {
		var text = JSON.parse(data)
		fillInputs(text)

		colorChangeInput(text)
	})






	function fillInputs(data) {

		for (var key in data) {
			// skip loop if the property is from prototype
			if (!data.hasOwnProperty(key)) continue;

			var obj = data[key];
			for (var prop in obj) {
				// skip loop if the property is from prototype
				if (!obj.hasOwnProperty(prop)) continue;

				// your code
				// console.log(prop + " = " + obj[prop], "back");
				$("input[name='" + prop + "'").val(obj[prop])
			}
		}


	}

	$('#updateTextButton').click(function () {

		if ($('#allRooms').is(':checked')) {
			socket.emit('BACK -> SERVER update all rooms', updateTextBack())
		} else {
			selectedRoom
			socket.emit('BACK -> SERVER update text', selectedRoom, updateTextBack())
		}

		resetInput()

	})



	function updateTextBack() {
		let head, sub;

		head = $("input[name='head'").val()
		sub = $("input[name='sub'").val()

		var data = {
			"text": {
				"head": head,
				"sub": sub
			}
		}
		return JSON.stringify(data)
	}



	function listRooms(data) {
		availableRooms = JSON.parse(data)

		let add = `<div class="preview-wrapper" id="addRoom">
								<div class="frame-wrapper add-room">
									+
								</div>
							</div>`

		let emptyRoom = `<div class="preview-wrapper" id="emptyRoom">
											<div class="frame-wrapper add-room" id="roomName">Unbenannt</div>
											<input class="form-control" type="text" id="roomNameInput"/>
										</div>`

		var els = [];
		for (let item of availableRooms.rooms) {
			var el = $(`<div class="preview-wrapper" id="roomPreview" title="` + item + `"> <div class="frame-wrapper">
					<iframe src="` + item + `?frame=true" class="preview-frame" ></iframe> </div> <p id="roomName">` + item + `</p></div>`)
			els.push(el)
		}
		$('#previews').empty()

		$('#previews').append(els)
		$('#previews').append(add)

		$('#addRoom').on('click', '.frame-wrapper', function () {
			$(emptyRoom).insertBefore('#addRoom')
		})
	}



	// $('#roomSelect').change(function (el) {
	// 	selectedRoom = $('#roomSelect').val()
	// 	$('#frame').attr('src', '/' + selectedRoom + '?frame=true')
	// 	console.log(selectedRoom);

	// 	joinRoom(selectedRoom)

	// })



	$('#allRooms').change(function () {
		if ($('#allRooms').is(':checked')) {
			$('#roomSelect').attr('disabled', true)
		} else {
			$('#roomSelect').attr('disabled', false)

		}
	})

	function chooseScreen(room) {
		$('#frame').attr('src', '/' + room + '?frame=true')
		console.log(room);

		selectedRoom = room
		joinRoom(room)
	}


	function joinRoom(room) {
		socket.emit('join', room)
	}









	/**
	 * MAIN PREVIEW
	 */

	let h = $('#wrap').height() / 1080
	$('#frame').css('transform', 'scale(' + h + ')')

	$(window).resize(function () {
		h = $('#wrap').height() / 1080
		$('#frame').css('transform', 'scale(' + h + ')')
	})




	/**
	 * ROOM PREVIEWS
	 */

	$('#previews').on('click', '#roomPreview', function (e) {
		$(this).addClass('selected')
		console.log(e);

		chooseScreen(e.currentTarget.title)
	})


	$('#previews').on('keyup', '#roomNameInput', function (e) {
		var inputValue = $(this).val();
		$('#roomNameInput').siblings('#roomName').text(inputValue)

		if (e.keyCode == 13) {
			updateRoomList(inputValue)
			$(this).remove()
		}
	})

	function updateRoomList(data) {
		var currentRooms = availableRooms;

		if (currentRooms.rooms.includes(data)) {
			var i = currentRooms.rooms.indexOf(data)
			currentRooms.rooms[i] = data;
			socket.emit('BACK -> SERVER add room', JSON.stringify(currentRooms))
		} else {
			currentRooms.rooms.push(data)
			socket.emit('BACK -> SERVER add room', JSON.stringify(currentRooms))
		}
	}


	/**
	 * Input Color Change
	 */

	function colorChangeInput(data) {
		var prev = data.text;
		$("#headInput, #subInput").keyup(function (e) {
			var currentValue = $(this).val();
			if (currentValue != prev[e.currentTarget.name]) {
				$(this).addClass('changed')
			} else {
				$(this).removeClass('changed')

			}
		})
	}

	function resetInput() {
		$("#headInput, #subInput").removeClass('changed')
	}


	/**
	 * 
	 * @param {boolean} connected connected or not
	 */
	function setStatus(connected) {
		if (connected) {
			$('#status').addClass('connected')
			$('#status').removeClass('disconnected')

			$('#status #connection').html('Connected')

		} else {
			$('#status').addClass('disconnected')
			$('#status').removeClass('connected')

			$('#status #connection').html('Disconnected')
		}
	}






	/** 
	 * OLD SCRIPTS
	 */


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