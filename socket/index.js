const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const onlyAddUniqueUser = (userId, socketId) => {
  //add only the unique user id everytime the client connect
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

//if somebody disconnects from socket server

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

//when connect
io.on("connection", (socket) => {
  console.log("a user connected");
  //to send the message to whole app and every user
  //currently connected to the apps
  // io.emit("Welcome", "hello this is scoket server");

  //now after every connection take userid and socketid to send message to
  //individuall user to take this it should be send from client first

  //taking something from client
  socket.on("sendUser", (userId) => {
    onlyAddUniqueUser(userId, socket.id);
    //send users to all online clients
    io.emit("getUsers", users);
  });

  //send and get messages

  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = users.find((user) => user.userId === receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("User disconnected");
    removeUser(socket.id);
    //to see this disconnected user in effect at the client
    io.emit("getUsers", users);
  });
});
