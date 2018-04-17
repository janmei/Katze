var time;

// gets teams from group.json 
$(function () {
  //Setup
  $('#delete-sub').hide();


  $.getJSON("../group.json", function (data) {

    $.each(data.groups, function (key, val) {
      var rowId = '#' + key;
      $('#timeBody').append('<tr id=' + key + '>')
      $(rowId).append('<th scope="row">' + val.semester + '</th>').attr('id', key);
      $(rowId).append('<td>' + val.teamName + '</td>');
      $(rowId).append('<td>' + val.members + '</td>');
      $(
        '<td><button type="submit" class="btn btn-danger" id="team" data-team="' + key +
        '">Team anzeigen</button></td>'
      ).appendTo(rowId);
    });


  });

  var socket = io();
  $('#text-input').submit(function () {
    if ($('#inHead').val() != "") {
      socket.emit('head text', $('#inHead').val());
    }
    if ($('#inSub').val() != "") {
      socket.emit('sub text', $('#inSub').val());
    }
    if ($('#inCount').val() != "") {
      socket.emit('countdown', $('#inCount').val());
    }
    $('#inHead').val('');
    $('#inSub').val('');
    $('#inCount').attr('disabled', false)
    $('#inHead').attr('disabled', false)

    return false;
  });

  $('#inHead').bind('input', function () {
    $('#inCount').attr('disabled', true)
    if ($('#inHead').val() === "") {
      $('#inCount').attr('disabled', false)
    }
  });

  $('#inCount').bind('input', function () {
    $('#inHead').attr('disabled', true)
    if ($('#inCount').val() === "") {
      $('#inHead').attr('disabled', false)
    }
  });

  $('#countdown').submit(function () {
    socket.emit('countdown', $('#inCount').val());
    return false;
  })

  $('#timeTable').click(function () {
    socket.emit('timeTable');
    return false;
  })

  $('body').on('click', '#team', function () {
    socket.emit('team', $(this).data('team'));
    return false;
  })

  $('#delete-all').click(function () {
    socket.emit('head text', '');
    socket.emit('sub text', '');
    $('#delete-head').hide();
    $('#delete-sub').hide();
  })

  $('input[name="preset"]').click(function () {
    if ($('#if-preset').prop('checked') === true) {
      $('#inHead').val('interactive future');
      $('#inSub').val(' ');
    } else if ($('#break-preset').prop('checked') === true) {
      $('#inHead').val('Pause');
      $('#inSub').val('Gleich geht’s weiter!');
    }
  })

  socket.on('head res', function (msg) {
    clearTimeout(time);
    $('.head').text(msg)

    if (!isEmpty($('.head'))) {
      $('#delete-head').show();
    }
  })

  socket.on('sub res', function (msg) {
    $('.sub').text(msg)
    if (!isEmpty($('.sub'))) {
      $('#delete-sub').show();
    }
  })

  socket.on('countdown res', function (msg) {
    clearTimeout(time);
    countdown(msg)
  })

  function isEmpty(el) {
    return !$.trim(el.html())
  }

  $('#delete-head').click(function () {
    socket.emit('head text', '');
    $('#delete-head').hide();
  })

  $('#delete-sub').click(function () {
    socket.emit('sub text', '');
    $('#delete-sub').hide();
  })

  $('#linkTime').click(function () {
    $('#time').show();
    $('#text').hide();
    $('#linkText').removeClass('active')
    $(this).addClass('active')
  })

  $('#linkText').click(function () {
    $('#text').show();
    $('#time').hide();
    $('#linkTime').removeClass('active')
    $(this).addClass('active')
  })

  function countdown(minutes) {

    var seconds = 60;
    var mins = minutes

    function tick() {

      var current_minutes = mins - 1
      seconds--;

      $('.head').html(current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds));
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