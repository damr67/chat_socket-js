var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var access_key = '11eb106338b230089048c0bd799c7925';
var userdata = {
  "damr67":[
    {"ip":"186.94.55.7","type":"ipv4","continent_code":"SA","continent_name":"South America",
    "country_code":"VE","country_name":"Venezuela","region_code":"O",
    "region_name":"Nueva Esparta","city":"Porlamar","zip":null,"latitude":10.95,
    "longitude":-63.85,"location":{"geoname_id":3629965,"capital":"Caracas",
    "languages":[{"code":"es","name":"Spanish","native":"Espa\u00f1ol"}],
    "country_flag":"http:\/\/assets.ipstack.com\/flags\/ve.svg",
    "country_flag_emoji":"\ud83c\uddfb\ud83c\uddea",
    "country_flag_emoji_unicode":"U+1F1FB U+1F1EA",
    "calling_code":"58","is_eu":false}}
  ]
  
}



  

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Conecction Stablished.
io.on('connection', function(socket){
    //Get ip and sending back to client to get extra api data.
    socket.on('ip',function(ip){
      var ip2 = ip;
      io.emit('ip',ip2,access_key);
    })

    socket.on('ip data',function(json){
      console.log(json.ip+'%'+json.country_name+'%'+json.location.capital);
      userdata['damr67'].push(json);
      console.log(userdata['damr67']);
    });

    io.emit('user connected', 'Somedboy has join the room.');

    //receiving client msg
    socket.on('chat message',function(msg){
      //Broadcasting message to all clients.
      io.emit('chat message',msg);
    }); 
    
    //Getting username
    socket.on('user',function(user){
      console.log(user);
    });

    //user disconnecting
    socket.on('disconnect',function(){
      io.emit('user disconnect', 'Somedboy has left the room.');
    });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});