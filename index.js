var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/admin', function(req, res){
  res.sendFile(__dirname + '/private/index.html');
});


io.on('connection', function (socket) {
  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});