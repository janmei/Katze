var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var serveStatic = require('serve-static');

app.use(express.static('static'))

app.get('/admin', function(req, res){
  res.sendFile(__dirname + '/private/index.html');
});


io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});


  app.use(express.static('public'));


http.listen(3000, function(){
  console.log('listening on *:3000');
});