let rooms = [];

// Functionality related to room management
// For now, there's no functionality to remove a room. They'll just wipe when Heroku resets.

// Generates a new room and returns its ID
const makeNewRoom = (roomName) => {
    
    let id = rooms.length;
    
    // store data
    let obj = {
        name: roomName,
        history: [],
    }
    rooms.push(obj);
    
    return id;
}

// Returns list of rooms
// In the interest of saving a bit of bandwidth, only grabs the name and message count
const getRoomData = () => {
    let list = [];
    
    // grab the data from rooms
    for(let i = 0; i < rooms.length; ++i) {
        let r = rooms[i];
        list.push({
            name: r.name,
            count: r.history.length,
            id: i,
        });
    }
    
    return list;
}

// Functionality related to messages in a specific room
// Called when a client sends a new message.
// Returns the status code to be returned by the server.
const saveMessage = (roomID, message) => {
    if(roomID < 0 || roomID >= rooms.length) return 400;
    
    
    
}


// Gets all messages from a given room in array format.
// If room ID is bad, returns null.
// If room exists but is empty, returns [].
const getMessages = (roomID) => {
    if(roomID < 0 || roomID >= rooms.length) return null;
    
    return rooms[roomID].history;
}

module.exports = {
    makeNewRoom,
    getRoomData,
    saveMessage,
    getMessages,
}