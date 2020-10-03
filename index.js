let express = require("express");
let socket = require("socket.io");

// App setup
let app = express();
let server = app.listen(4000, function () {
  console.log("Server is up and running on port 4000...");
});

// Static files
app.use(express.static("public"));

// Socket setup & pass server
let io = socket(server);
io.on("connection", (socket) => {
  console.log("socket connection with User : ", socket.id);

  socket.on("disconnect", () => {
    console.log(`user : ${socket.id} disconnected`);
  });
  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
});
