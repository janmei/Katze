var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serveStatic = require('serve-static');

app.use(express.static('static'));
app.use(express.static('public'));


app.get('/admin', function (req, res) {
  res.sendFile(__dirname + '/private/index.html');
});


io.on('connection', function (socket) {

  socket.on('head text', function (msg) {
    console.log('text: ' + msg);
    io.emit('head text', msg);
  });

  socket.on('head res', function (msg) {
    console.log('res: ' + msg);
    io.emit('head res', msg);
  });

  socket.on('sub text', function (msg) {
    console.log('text: ' + msg);
    io.emit('sub text', msg);
  });

  socket.on('sub res', function (msg) {
    console.log('res: ' + msg);
    io.emit('sub res', msg);
  });

  socket.on('countdown', function (msg) {
    console.log('countdown: ' + msg);
    io.emit('countdown', msg);
  })

  socket.on('clear countdown', function () {
    console.log('clear countdown: ');
    io.emit('clear countdown');
  })
  socket.on('countdown res', function (msg) {
    console.log('countdown res: ' + msg);
    io.emit('countdown res', msg);
  })

  socket.on('timeTable', function () {
    console.log('timeTable');
    io.emit('timeTable');
  })

  socket.on('team', function (msg) {
    console.log('team: ' + msg);
    io.emit('team', msg)

  })
});

http.listen(80, function () {
  console.log('listening on http://localhost:80');
});