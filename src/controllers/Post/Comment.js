// * Importar el modelo de publicación
import PostModel from "../../models/Post.js";

// * Importar el módulo jsonwebtoken para la autenticación JWT
import jwt from "jsonwebtoken";

// * Importar el modelo de usuario
import User from "../../models/User.js";

// * Importar la configuración
import config from "../../config.js";

// * Definir la clase commentController para manejar los comentarios
class commentController {
  // * Método para obtener todos los comentarios de una publicación
  static async getAll(request, response) {
    try {
      // ! Obtener el ID de la publicación de los parámetros de la solicitud
      const { postId } = request.params;
      // ! Buscar la publicación por ID y seleccionar solo los comentarios
      const post = await PostModel.findById(postId).select("comments");

      // ? Si la publicación no se encuentra, devolver un error 404
      if (!post) {
        return response.status(404).json({ error: "Post not found" });
      }

      // ! Obtener los IDs de los usuarios que hicieron comentarios
      const userIds = post.comments.map((comment) => comment.userId);

      // ! Buscar los usuarios correspondientes y obtener ciertos campos
      const users = await User.find(
        { _id: { $in: userIds } },
        "username fullname image"
      ).lean();

      // ! Crear un mapa de usuarios por ID
      const userMap = {};
      users.forEach((user) => (userMap[user._id] = user));

      // * Combinar los comentarios con los datos de los usuarios
      const commentsWithUserData = post.comments.map((comment) => ({
        _id: comment._id,
        content: comment.content,
        emoji: comment.emoji || "none", // * Asegurarse de que el emoji está incluido
        createdAt: comment.createdAt,
        user: userMap[comment.userId],
      }));

      // * Devolver los comentarios con los datos de los usuarios
      response.json(commentsWithUserData);
    } catch (error) {
      // ! Manejar errores y devolver un error 500 con detalles
      response
        .status(500)
        .json({ error: "Failed to retrieve comments", details: error.message });
    }
  }

  // * Método para crear un nuevo comentario
  static async create(request, response) {
    try {
      console.log("Creating... Comment");

      // ! Obtener el token de la cabecera de la solicitud
      const token = request.headers["x-access-token"];
      if (!token) {
        return response.status(401).json({ error: "No token provided" });
      }

      // ! Verificar el token y obtener el ID del usuario
      const decoded = jwt.verify(token, config.secret);
      const userId = decoded.id;
      const { content, emoji = "none" } = request.body; // * Asegurarse de que el emoji está incluido

      // ? Verificar que el contenido no esté vacío
      if (!content) {
        return response.status(400).json({ error: "Content is required" });
      }

      // ! Obtener el ID de la publicación de los parámetros de la solicitud
      const { postId } = request.params;

      // ! Buscar el usuario por ID
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      // ! Buscar la publicación por ID
      const post = await PostModel.findById(postId);
      if (!post) {
        return response.status(404).json({ error: "Post not found" });
      }

      // * Crear un nuevo comentario
      const comment = {
        content,
        emoji,
        userId,
      };

      // * Agregar el comentario a la publicación y guardar
      post.comments.push(comment);
      await post.save();
      response.json({ message: "Comment created successfully", comment });
    } catch (error) {
      // ! Manejar errores y devolver un error 500 con detalles
      response
        .status(500)
        .json({ error: "Failed to create comment", details: error.message });
    }
  }

  // * Método para eliminar un comentario
  static async delete(request, response) {
    try {
      // ! Obtener el token de la cabecera de la solicitud
      const token = request.headers["x-access-token"];
      if (!token) {
        return response.status(401).json({ error: "No token provided" });
      }

      // ! Verificar el token y obtener el ID del usuario
      const decoded = jwt.verify(token, config.secret);
      const userId = decoded.id;
      const { postId, id: commentId } = request.params;

      // ! Buscar el usuario por ID
      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      // ! Buscar la publicación por ID
      const post = await PostModel.findById(postId);
      if (!post) {
        return response.status(404).json({ error: "Post not found" });
      }

      // ! Buscar el comentario por ID dentro de la publicación
      const comment = post.comments.id(commentId);
      if (!comment) {
        return response.status(404).json({ error: "Comment not found" });
      }

      // ? Verificar que el usuario tenga permiso para eliminar el comentario
      if (
        comment.userId.toString() !== userId &&
        !["admin", "moderator"].includes(user.role)
      ) {
        return response.status(403).json({ error: "Unauthorized" });
      }

      // * Eliminar el comentario y guardar la publicación
      comment.remove();
      await post.save();
      response.json({ message: "Comment deleted successfully", comment });
    } catch (error) {
      // ! Manejar errores y devolver un error 500 con detalles
      response
        .status(500)
        .json({ error: "Failed to delete comment", details: error.message });
    }
  }
}

// * Exportar el controlador de comentarios
export default commentController;
