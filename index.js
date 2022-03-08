const express = require('express');

const app = express();
const socket =require('socket.io');

let server = app.listen(4000,function(){
    console.log("Server is running on port : 4000")
})

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})

/***-----socket setup-------- */
let io = socket(server);
io.on("connection",(socket)=>{
    socket.on("chat",(data)=>{
        io.sockets.emit("chat",data)
    });
    socket.on("typing",(name)=>{
       socket.broadcast.emit("typing",name); 
    })
})