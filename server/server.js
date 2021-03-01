//lib
const express = require("express");
const { createServer } = require("http");

//initializase
const app = express();
const server = createServer(app);

//middleware
app.use(express.static("client"));

//socket
const io = require("socket.io")(server);

const info = [
  {
    id: 1,
    description: "Welcom to my chat",
    nickname: "EyderDev"
  }
];

io.on("connection", (socket) => {
  console.log(`El usuario con ip:${socket.handshake.address} se ha conectado!`);
  socket.emit("messages", info);

  io.on("disconnect", () => {
    console.log(
      `El usuario con ip:${socket.handshake.address} se ha desconectado!`
    );
  });

  socket.on("chatM", (message) => {
    info.push(message);

    io.sockets.emit("messages", info);
  });
});

//server
app.get("/", (req, res) => {
  res.status(200).send("<h1>Working</h1>");
});

server.listen({ port: null }, () => {
  console.log(`Server runnig on https://n0wld.sse.codesandbox.io/`);
});
