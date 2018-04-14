var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serveStatic = require('serve-static');

app.use(express.static('static'));
app.use(express.static('public'));


app.get('/admin/text', function (req, res) {
  res.sendFile(__dirname + '/private/text.html');
});

app.get('/admin/time', function (req, res) {
  res.sendFile(__dirname + '/private/time.html');
});

app.get('/admin', function (req, res) {
  res.redirect('/admin/text');
});


io.on('connection', function (socket) {
  socket.on('head text', function (msg) {
    console.log('text: ' + msg);
    io.emit('head text', msg);
  });

  socket.on('sub text', function (msg) {
    console.log('text: ' + msg);
    io.emit('sub text', msg);
  });

  socket.on('countdown', function (msg) {
    console.log('countdown: ' + msg);
    io.emit('countdown', msg);
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

http.listen(3000, function () {
  console.log('listening on http://localhost:3000');
});