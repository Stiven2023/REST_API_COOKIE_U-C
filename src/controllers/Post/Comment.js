import PostModel from "../../models/Post.js";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import config from "../../config.js";
import { io } from "../../index.js";
import { uploadImageComment } from "../../cloudinary.js";
import multer from "multer";
import path from "path";
// * Importar fs para operaciones de sistema de archivos
import fs from "fs/promises";


// Configurar el almacenamiento de multer en disco
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./temp");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

/**
 * Controlador para manejar los comentarios.
 */
class commentController {
  /**
   * Obtiene todos los comentarios de una publicación.
   *
   * @param {Object} request - El objeto de solicitud.
   * @param {Object} response - El objeto de respuesta.
   * @returns {void}
   */
  static async getAll(request, response) {
    try {
      const { postId } = request.params;
      const post = await PostModel.findById(postId).select("comments");

      if (!post) {
        return response.status(404).json({ error: "Post not found" });
      }

      const userIds = post.comments.map((comment) => comment.userId);
      const users = await User.find(
        { _id: { $in: userIds } },
        "username fullname image"
      ).lean();

      const userMap = {};
      users.forEach((user) => (userMap[user._id] = user));

      const commentsWithUserData = post.comments.map((comment) => ({
        _id: comment._id,
        content: comment.content,
        emoji: comment.emoji || "none",
        createdAt: comment.createdAt,
        image: comment.image,
        user: userMap[comment.userId],
      }));

      response.json(commentsWithUserData);
    } catch (error) {
      response
        .status(500)
        .json({ error: "Failed to retrieve comments", details: error.message });
    }
  }

  /**
   * Crea un nuevo comentario en una publicación.
   *
   * @param {Object} request - El objeto de solicitud. Debe incluir un token de autenticación en los encabezados y los datos del comentario en el cuerpo de la solicitud.
   * @param {Object} response - El objeto de respuesta.
   * @returns {void}
   */
  static async create(request, response) {
    const token = request.headers["x-access-token"];
    if (!token) {
      return response.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;
    const { content, emoji = "none" } = request.body;

    if (!content && !request.files?.image) {
      return response
        .status(400)
        .json({ error: "Content or image is required" });
    }

    const { postId } = request.params;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      const post = await PostModel.findById(postId);
      if (!post) {
        return response.status(404).json({ error: "Post not found" });
      }

      let imageData = null;
      if (request.files?.image) {
        const result = await uploadImageComment(
          request.files.image.tempFilePath
        );
        imageData = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
        await fs.unlink(request.files.image.tempFilePath);
      }

      const comment = {
        content,
        emoji,
        userId,
        createdAt: new Date(),
        image: imageData ? imageData : null,
      };

      post.comments.push(comment);
      await post.save();

      const commentWithUserData = {
        _id: comment._id,
        content: comment.content,
        emoji: comment.emoji,
        createdAt: comment.createdAt,
        image: comment.image,
        user: {
          _id: user._id,
          username: user.username,
          fullname: user.fullname,
          image: user.image,
        },
      };

      io.emit("comment:new", { postId, comment: commentWithUserData });

      response.json({
        message: "Comment created successfully",
        comment: commentWithUserData,
      });
    } catch (error) {
      response
        .status(500)
        .json({ error: "Failed to create comment", details: error.message });
    }
  }

  /**
   * Elimina un comentario de una publicación.
   *
   * @param {Object} request - El objeto de solicitud. Debe incluir un token de autenticación en los encabezados y los IDs del post y comentario en los parámetros de la solicitud.
   * @param {Object} response - El objeto de respuesta.
   * @returns {void}
   */
  static async delete(request, response) {
    try {
      const token = request.headers["x-access-token"];
      if (!token) {
        return response.status(401).json({ error: "No token provided" });
      }

      const decoded = jwt.verify(token, config.secret);
      const userId = decoded.id;
      const { postId, id: commentId } = request.params;

      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      const post = await PostModel.findById(postId);
      if (!post) {
        return response.status(404).json({ error: "Post not found" });
      }

      const comment = post.comments.id(commentId);
      if (!comment) {
        return response.status(404).json({ error: "Comment not found" });
      }

      post.comments.pull(commentId);
      io.emit("comment:delete", { postId, commentId });

      await post.save();
      response.json({ message: "Comment deleted successfully", comment });
    } catch (error) {
      response
        .status(500)
        .json({ error: "Failed to delete comment", details: error.message });
    }
  }
}

export default commentController;
