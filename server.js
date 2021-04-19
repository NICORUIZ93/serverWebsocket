var express = require("express");
var app = express();

const fs = require("fs");
const path = require("path");

const cors = require("cors");

var server = require("http").createServer(
  {
    key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
  },
  app
);
var io = require("socket.io")(server);

var messages = 0;

app.use(cors());
app.use(express.static(__dirname + "/public"));

server.listen(3000, () => {
  console.log("servidor activo");
});

io.on("connection", function (socket) {
  console.log("Un cliente se ha conectado: " + socket.id);

  setInterval(() => {
    socket.emit("envio", messages);
  }, 1000);

  socket.on("disconnect", () => {
    console.log("El usuario se ha desconectado: " + socket.id);
    messages = 0;
  });
});

setInterval(() => {
  messages++;
}, 1000);
