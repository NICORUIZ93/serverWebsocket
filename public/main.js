var socket = io.connect("http://localhost:3000", { forceNew: true });
socket.on("envio", function (data) {
  document.getElementById("mensaje").innerHTML = data;
  console.log(data);
});
