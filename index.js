var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var access_key = '11eb106338b230089048c0bd799c7925';

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', function(socket){
  io.emit('user connected', 'Somedboy has join the room.');
  socket.on('chat message',function(msg){
    io.emit('chat message',msg);
  }); 
  
  socket.on('user',function(user){
    console.log(user);
  });

  socket.on('ip',function(ip){
    var ip2 = ip;
    io.emit('ip',ip2,access_key);
  })

  socket.on('disconnect',function(){
    io.emit('user disconnect', 'Somedboy has left the room.');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});