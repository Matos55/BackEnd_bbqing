const users = [];

// Join user to chat
function userJoin(id, username, room) {
    const user = { id, username, room };
    users.push(user);

    return user;
}

// Get current user
function getCurrentUser(id) {
    return users.find(user => user.id === id);
}

// User leaves chat
function userLeave(id) {
    const index = users.findIndex( user => user.id === id); // if it does not find, returns with a negative one

    // return the array by removing the user with the INDEX whose id === users.id
    if(index !== -1) {
        return users.splice(index, 1)[0];  // we put [0] to select the only object USER inside that ARRAY, in order to speed up coding on templates|html by just calling the properties from the object itself.
    };
}

// Get room users
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
};