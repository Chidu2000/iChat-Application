const socket = io('http://localhost:8000');

// Get DOM varibales in respective JS varibales
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

// audio will play upon receiving messages
var audio  = new Audio('ting.mp3')

// function which will append event info to the container
const append = (message,position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
}


// ask for the name of the user , and let the server know
const name = prompt('enter your name to join the iChat app');
socket.emit('new-user-joined', name);

// if new user joins, receive the event from the server
socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})

// if server sends some data from a user , receive it
socket.on('receive',data=>{
    append(`${data.message}:${data.user}`,'left');
})

// if a user leaves the chat , append the info to the container
socket.on('left',name=>{
    append(`${name} left the chat`,'right');
})


// if form gets submitted , send the message to the server
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You:${message}`,'right');
    socket.emit('send',message);
    messageInput.value = ''
})


