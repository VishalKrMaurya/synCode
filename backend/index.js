const axios = require('axios');
const express = require('express');
const http = require('http');
const { version } = require('os');
const {Server} = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*",
    },
});

const rooms = new Map();

io.on("connection",(socket)=>{
    //console.log(socket);
    // console.log('A new User Connected', socket.id);
    let currentRoom = null;
    let currentUser = null;

    socket.on("join",({roomId, userName})=>{
        if(currentRoom){
            socket.leave(currentRoom);
            rooms.get(currentRoom).delete(currentUser);
            io.to(currentRoom).emit("userJoined", Array.from(rooms.get(currentRoom)));
        }

        currentRoom = roomId;
        currentUser = userName;

        socket.join(roomId)

        if(!rooms.has(roomId)){
            rooms.set(roomId, new Set());
        }

        rooms.get(roomId).add(userName);

        io.to(roomId).emit("userJoined",  Array.from(rooms.get(currentRoom)));

        // console.log(`${userName} joined in room ${roomId}`);

    });

    socket.on("codeChange",({roomId, code})=>{
        socket.to(roomId).emit("codeUpdate",code);
    });

    socket.on("leaveRoom",()=>{
        if(currentRoom && currentUser){
            rooms.get(currentRoom).delete(currentUser);
            io.to(currentRoom).emit("userJoined",  Array.from(rooms.get(currentRoom)));

            socket.leave(currentRoom)

            currentRoom=null;
            currentUser=null;
        }
    });

    socket.on("typing",({roomId, userName})=>{
        socket.to(roomId).emit("userTyping",userName);
    })

    socket.on("languageChange",({roomId, language})=>{
        io.to(roomId).emit("languageUpdate", language);
    })

    socket.on("compilerCode", async({code, roomId, language, version})=>{
        if(rooms.has(roomId)){
            const room = rooms.get(roomId);
            const response = await axios.post("https://emkc.org/api/v2/piston/execute",
            {
                language,
                version,
                files:[
                    {
                        content: code
                    },
                ]
            })

            room.output = response.data.run.output;
            io.to(roomId).emit("codeResponse",response.data);
        }
    })

    socket.on("disconnect",()=>{
        if(currentRoom && currentUser){
            rooms.get(currentRoom).delete(currentUser);
            io.to(currentRoom).emit("userJoined",  Array.from(rooms.get(currentRoom)));
        }

        // console.log("USER Disconnected");
    })
})

const port = process.env.PORT || 5000;

server.listen(port, ()=>{
    console.log('server is running on port', port);
})