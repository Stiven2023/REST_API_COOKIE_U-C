import express from "express";
import morgan from "morgan";
import fileUpload from "express-fileupload";
import cors from "cors";
import connectDB from "./database.js";

import { createRoles } from "./libs/initialSetup.js";

import authRoutes from "./routes/user/auth.routes.js";
import userRoutes from "./routes/user/user.routes.js";
import profileRoutes from "./routes/user/profile.routes.js";
import chatRoutes from "./routes/chat/ChatRoutes.js";
import messageRoutes from "./routes/chat/MessageRoutes.js";
import postRoutes from "./routes/Post/Post.js";
import commentRoutes from "./routes/Post/Comments.js";
import likeRoutes from "./routes/Post/Likes.js";

connectDB();

const app = express();
createRoles();

// Configura CORS para permitir cualquier origen
app.use(
  cors({
    origin: "*", 
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./tmp",
  })
);

// Rutas
app.get("/", (req, res) => {
  res.json({
    message: "API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/chat/messages", messageRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/posts", commentRoutes);
app.use("/api/posts", likeRoutes);

export default app;
