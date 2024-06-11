import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import { createRoles } from './libs/initialSetup.js';

// ROUTES IMPORTS
import authRoutes from './routes/user/auth.routes.js';
import userRoutes from './routes/user/user.routes.js';
import profileRoutes from './routes/user/profile.routes.js';
import chatRoutes from './routes/chat/ChatRoutes.js';
import messageRoutes from './routes/chat/MessageRoutes.js';
import routerPost from './routes/Post/Post.js';
import routerLike from './routes/Post/Likes.js';
import routerComment from './routes/Post/Comments.js';



// SERVER INITIALIZATION
const app = express();
const server = http.createServer(app);
createRoles();

export const io = new SocketServer(server, {
  cors: {
    origin: '*', // Permitir todas las solicitudes de origen
    methods: ["GET", "POST"],
  }
});

app.set('pkg', pkg);

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: './tmp'
}));

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

// Socket server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor socket corriendo en el puerto ${PORT}`);
});

// ROUTES
app.get('/', (req, res) => {
  res.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);

app.use('/api/chat', chatRoutes);
app.use('/api/chat/messages', messageRoutes);

app.use('/api/posts', routerPost)
app.use('/api/posts', routerLike)
app.use('/api/posts', routerComment)


export default app;
