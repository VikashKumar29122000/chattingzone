const socket=io()
const chatForm=document.querySelector('.input-chat')
const chatMessages =document.querySelector('.chat-message')


//Setting up the room Name
let a=document.URL.split('Room=');
let b=document.getElementById('Room');
if(a[1]==='Cpp'){
    b.innerHTML='C++';
    room='C++';
}
else{
    b.innerHTML=a[1];
    room=a[1];
}
document.getElementById('title').innerHTML=`${room}: Chats`;
//----------------------------------------------------------

//Setting up the username
a=document.URL.lastIndexOf('Username=',);
b=document.URL.lastIndexOf('Room=')

let FullName=document.URL.slice(a+9,b-1)
let name=FullName.split('+');
const MessageSender=name.join(' ');
username=MessageSender;
//-------------------------------------------------------------//

//Join Chatroom
socket.emit('joinRoom',{username,room});
//--------------------------------------------------
// get room and users
socket.on('roomusers',(users)=>{
    outputUsers(users.users);
})
//-----------------------------------------------------------------------
//Message
socket.on('message',message=>{

    outputMessage(message)

    //Scroll Down fixing we need to pass this property to the container having overflow auto
    chatMessages.scrollTop=chatMessages.scrollHeight;
});
//---------------------------------------------------------------------
// socket.on('connection',mess=>console.log(mess))

//Mesage submit

chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();


    //get message Text
    const msg=e.target.elements.msg.value;

    //Emitting a message to the serrver
    socket.emit('chatMessage',msg)

    //clearing the text
    e.target.elements.msg.value='';
    e.target.elements.msg.focus();
    
})
//--------------------------------------------------------------------------------------------------
//Output messages to the dom

function outputMessage(message){
    const divSender= document.createElement('div');
    const divReciever= document.createElement('div');

    divSender.classList.add('each-chat-sender');
    divReciever.classList.add('each-chat-reciever');
    if(message.username==='Chatting Bot'){
        divSender.innerHTML=`<span class="message-sender">${message.username}</span>
        <span class="message-time ">${message.time}</span>
        <h6 class="message ">${message.message}</h6>`;
        document.querySelector('.container-whole-chat').appendChild(divSender);
    }
    else if(message.username===MessageSender){
        divReciever.innerHTML=`<span class="message-reciever">${MessageSender}</span>
        <span class="message-time">${message.time}</span>
        <h6 class="chat-reciever">${message.message}</h6>`;
        document.querySelector('.container-whole-chat').appendChild(divReciever);
    }
    else{
        divSender.innerHTML=`<span class="message-sender">${message.username}</span>
        <span class="message-time ">${message.time}</span>
        <h6 class="message">${message.message}</h6>`;
        document.querySelector('.container-whole-chat').appendChild(divSender);


    }
}
//------------------------------------------------------------------------
//outputs current users int the chat

function outputUsers(users){
    let userlist=document.querySelector('.current-room')
    userlist.innerHTML=`
        ${users.map(user=>`<li class="room-name">${user.username}</li>`).join('')}
    `;
    
}

//-------------------------------------------------------------------------------------------

