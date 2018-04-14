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

  socket.on('sub text', function (msg) {
    console.log('text: ' + msg);
    io.emit('sub text', msg);
  });

  socket.on('countdown', function (msg) {
    console.log('countdown: ' + msg);
    io.emit('countdown', msg);
  })
});

http.listen(3000, function () {
  console.log('listening on http://localhost:3000');
});