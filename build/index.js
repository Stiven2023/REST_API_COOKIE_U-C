"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.io = void 0;
var _http = _interopRequireDefault(require("http"));
var _socket = require("socket.io");
var _app = _interopRequireDefault(require("./app.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var PORT = 3001;
var server = _http["default"].createServer(_app["default"]);

// Configuración de CORS para Socket.io
var io = exports.io = new _socket.Server(server, {
  cors: {
    origin: "*",
    // Permite cualquier origen
    methods: ["GET", "POST"],
    credentials: true
  }
});
io.on("connection", function (socket) {
  console.log("New client connected:", socket.id);
  socket.on("joinRoom", function (roomId) {
    socket.join(roomId);
    console.log("Socket ".concat(socket.id, " joined room ").concat(roomId));
  });
  socket.on("disconnect", function () {
    console.log("Client disconnected:", socket.id);
  });
});
server.listen(PORT, function () {
  console.log("Servidor corriendo en el puerto ".concat(PORT));
});