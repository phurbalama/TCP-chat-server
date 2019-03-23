"use strict";
const net = require("net"); // net is node.js built in TCP library

let sockets= []; //creating socket array where data will be stored\

const server = net.createServer();   //creating a server
const connectionError = function(err) { //function to throw error
    throw err;
};
const connectionListener = function (socket) {
    const connectionEnd = function () {
        console.log("client discconected");
    };
    socket.on("end",connectionEnd);
    console.log("client connected");
    socket.write("Welcome to Phurba Server " + "\n");
    socket.setEncoding('utf8');
    sockets.push(socket);
    
    socket.on('data',function(data){
        console.log(data);
        

    let client = sockets.length;
    for( let i = 0;i<client; i++){
        if(sockets[i]===socket) continue;
        sockets[i].write(data);
    }
    });
   socket.on('end',function(){
       sockets.splice(sockets.indexOf(socket,1));
    });
}

const connectionStart = function() {
    
    console.log("server has started");
};
server.on("error",connectionError);
server.on("connection",connectionListener);
server.on("listening",connectionStart);

server.listen(8000); // server will listen to port 3013