const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const users = {};
// router.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("user", (username) => {
    users[socket.id] = username;
    socket.broadcast.emit("user-joined", username);
  });
  socket.on("send", (msg) => {
    socket.broadcast.emit("receive", { msg: msg, username: users[socket.id] });
  });
  socket.on("disconnect", (msg) => {
    socket.broadcast.emit("left", users[socket.id]);
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});

// app.use("/.netlify/functions/index", router);
// module.exports.handler = serverless(app);
