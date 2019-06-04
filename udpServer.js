var udp = require('dgram');

// --------------------creating a udp server --------------------

// creating a udp server
var server = udp.createSocket('udp4');

// emits when any error occurs
server.on('error',function(error){
  console.log('Sever: Error: ' + error);
  server.close();
});

// emits on new datagram msg
server.on('message',function(msg,info){
  console.log('Sever: Data received from client : ' + msg.toString());
  console.log('Sever: Received %d bytes from %s:%d\n',msg.length, info.address, info.port);

//sending msg
server.send(msg,info.port,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Sever: Data sent !!!');
  }

});

});

//emits when socket is ready and listening for datagram msgs
server.on('listening',function(){
  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Sever: Server is listening at port' + port);
  console.log('Sever: Server ip :' + ipaddr);
  console.log('Sever: Server is IP4/IP6 : ' + family);
});

//emits after the socket is closed using socket.close();
server.on('close',function(){
  console.log('Sever: Socket is closed !');
});

server.bind(2222);

setTimeout(function(){
    server.close();
},8000);

// -------------------- udp client ----------------

var buffer = require('buffer');

// creating a client socket
var client = udp.createSocket('udp4');

//buffer msg
var data = Buffer.from('Ochoa Client');

client.on('message',function(msg,info){
  console.log('Client: Data received from server : ' + msg.toString());
  console.log('Client: Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});

//sending msg
client.send(data,2222,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Client: Data sent !!!');
  }
});

var data1 = Buffer.from('Hello ');
var data2 = Buffer.from('World');

//sending multiple msg
client.send([data1,data2],2222,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Client: Data sent !!!');
  }
});