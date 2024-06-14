import http from "http";
import { Server as SocketServer } from 'socket.io';
import app from './app.js';

const PORT = 3001;

// Create the server
const server = http.createServer(app);

// Initialize Socket.IO server
export const io = new SocketServer(server);

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
    console.log(`Socket ${socket.id} joined room ${roomId}`);
  });

  socket.on('message', (message) => {
    console.log('Message received:', message);
    io.to(message.roomId).emit('message', {
      body: message.body,
      from: socket.id.slice(6),
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
