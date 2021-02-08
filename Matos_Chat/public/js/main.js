const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from URL 
// Notes 1: Qs.parse(location.search) ===> gives us the query selectors from the url 
// Notes 2: ignoreQueryPrefix ===> is to avoid reading|passing extra characters:      ?...&email=matos@gmail.com => email: matos@gmail.com     
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});
// console.log(username, room);


const socket = io(); // call the "harbor" (parent/server) IO in the HTML

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users);

})

// Message from server
socket.on('message', message => {
    console.log(message);

    // output with vanilla javascript
    outputMessage(message);

    // scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent reload page on form submit

    // const matos1 = e.target.elements;
    // console.log(matos1); 

    // const matos2 = e.target.elements.msgg;
    // console.log(matos2); 

    // Get message text
    const msg = e.target.elements.msg.value  // seleciona o 'valor' do id 'msg' pertencente ao 'elemento' do 'target'

    // Emit message to server
    socket.emit('chatMessage', msg)

    // Clear input
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();

})

// Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
       ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputUsers(users) {
    userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`; // we put '' to merge all </li>
}