var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users_nick = 1  ;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var usernick = 'user'+ users_nick;
  io.emit('usernick',usernick);
  io.emit('user connected', usernick+' has join the room.');
  socket.on('chat message',function(msg){
    io.emit('chat message',usernick+': '+msg);
  }); 
  users_nick++;
  socket.on('disconnect',function(){
    io.emit('user disconnect', usernick+' has left the room.');
    users_nick--;
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});