const rooms = [];

// Functionality related to room management
// For now, there's no functionality to remove a room. They'll just wipe when Heroku resets.

// Generates a new room and returns its ID
const makeNewRoom = (roomName) => {
  const id = rooms.length;

  // store data
  const obj = {
    name: roomName,
    history: [],
  };
  rooms.push(obj);

  return id;
};

// Returns list of rooms
// In the interest of saving a bit of bandwidth, only grabs the name and message count
const getRoomData = () => {
  const list = [];

  // grab the data from rooms
  for (let i = 0; i < rooms.length; ++i) {
    const r = rooms[i];
    list.push({
      name: r.name,
      count: r.history.length,
      id: i,
    });
  }

  return list;
};

const getRoomName = (roomID) => {
  if (roomID < 0 || roomID >= rooms.length) return null;

  return {
    name: rooms[roomID].name,
  };
};

// Functionality related to messages in a specific room
// Called when a client sends a new message.
// Returns the status code to be returned by the server.
const saveMessage = (roomID, messageObject) => {
  if (roomID < 0 || roomID >= rooms.length) return 400;

  rooms[roomID].history.push(messageObject);

  return 201;
};

// Gets all *new* messages from a given room in array format.
// The client tells the server where to start using simple indexing.
// Server determines if any new messages should be sent back.
// If room ID is bad, returns null.
// If room exists but is empty, returns [].
const getNewMessages = (roomID, messagesSeen) => {
  if (roomID < 0 || roomID >= rooms.length) return null;

  let indexStart = messagesSeen;

  if (indexStart <= -1) {
    indexStart = 0;
  }

  const messageList = [];
  const log = rooms[roomID].history;
  for (let i = indexStart; i < log.length; ++i) {
    const message = log[i];
    messageList.push(message);
  }
  return messageList;
};

module.exports = {
  makeNewRoom,
  getRoomData,
  saveMessage,
  getNewMessages,
  getRoomName,
};
