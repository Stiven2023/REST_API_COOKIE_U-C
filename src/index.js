import http from "http";
import { Server as SocketServer } from 'socket.io';
import app from './app.js';

const PORT = 3001;

const server = http.createServer(app);

export const io = new SocketServer(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
