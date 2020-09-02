const express=require('express')
const path=require('path');
const app=express();
const http=require('http')
const socketio=require('socket.io')
const messageFormat=require('./utils/message');
const {userJoin, getCurrentUser,userLeave,getRoomUsers}=require('./utils/users');

const server=http.createServer(app);

const io=socketio(server);

let Chatbot='Chatting Bot';
//Set Static folder
app.use(express.static(path.join(__dirname,'public')));

//Runs when client connects
io.on('connection',socket=>{
    

    socket.on('joinRoom',({username,room})=>{
        const user=userJoin(socket.id,username,room)
        
        socket.join(user.room)



        //Welcome current user
        socket.emit('message',messageFormat(Chatbot,'Welcome to the Chat App'));

        //Broadcast when a user connects
        socket.broadcast.to(user.room).emit('message',messageFormat(Chatbot,`${user.username} has joined the chat`))

        //Send users and room info
        io.to(user.room).emit('roomusers',{users:getRoomUsers(user.room)})

    });
    // Listen for chatMessage
    socket.on('chatMessage',(msg)=>{
        const user=getCurrentUser(socket.id)
        io.to(user.room).emit('message',messageFormat(user.username,msg))
    });

     //when a user disconnects
     socket.on('disconnect',()=>{
         const user=userLeave(socket.id);

         if(user){
            io.to(user.room).emit('message',messageFormat(Chatbot,`${user.username} has disconnected`))
         }
    })
})



//Listening to the server
const PORT=process.env.PORT||3000;

server.listen(PORT,()=>{
    console.log(`Listening to the Server at ${PORT}`);
})