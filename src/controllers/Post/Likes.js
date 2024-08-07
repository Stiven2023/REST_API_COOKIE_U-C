// * Importar el modelo de publicación
import PostModel from "../../models/Post.js";

// * Importar el módulo jsonwebtoken para la autenticación JWT
import jwt from "jsonwebtoken";

// * Importar el modelo de usuario
import User from "../../models/User.js";

// * Importar la configuración
import config from "../../config.js";

// * Definir la clase LikeController para manejar los likes
class LikeController {
  // * Método para obtener todos los likes de una publicación
  static async getAll(request, response) {
    const { postId } = request.params;
    const post = await PostModel.findById(postId);
    response.json(post.likes);
  }

  // * Método para obtener mis likes
  static async getMyLikePosts(request, response) {
    const token = request.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;

    //* Verifica si hay un token
    if (!token) {
      return response.status(401).json({ error: "No token provided" });
    }

    const user = User.findById(userId).populate("likes");

    //* Verifica si el usuario existe
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    const myLikes = user.likes;

    response.json(myLikes);
  }

  // * Método para crear un nuevo like
  static async create(request, response) {
    const token = request.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;

    const { postId } = request.params;
    const like = {
      userId: userId,
    };

    try {
      const post = await PostModel.findById(postId);

      // ? Verifica si el usuario ya ha dado like al post
      const validateLike = post.likes.find((like) =>
        like.userId.equals(userId)
      );
      if (validateLike) {
        return response
          .status(400)
          .json({ Error: "You have already liked this post" });
      }

      // * Agregar el like a la publicación y guardar
      post.likes.push(like);
      await post.save();

      // * Guardar el like también en el usuario correspondiente
      const user = await User.findById(userId);
      user.likes.push(post._id);
      await user.save();

      //* Emitar una respuesta socket del like
      request.io.emit("like", {
        action: "like",
        post: post,
        like: like,
      });

      // * Devolver una respuesta exitosa
      response.json({ Message: "Resource created successfully" });
    } catch (error) {
      // ! Manejar errores y devolver un error 500 con detalles
      response
        .status(500)
        .json({ Error: "Failed to create resource", Details: error });
    }
  }

  // * Método para eliminar un like
  static async delete(request, response) {
    const { id } = request.params;
    const { postId } = request.params;

    try {
      const post = await PostModel.findById(postId);

      // ? Verifica si el like existe en el post
      const deleteLike = post.likes.find((like) => like._id.equals(id));
      if (!deleteLike) {
        return response
          .status(404)
          .json({ Error: "Like not found in the post" });
      }

      // * Eliminar el like de la publicación y guardar
      post.likes = post.likes.filter((like) => !like._id.equals(id));
      await post.save();

      // * Eliminar el like del usuario correspondiente
      const user = await User.findById(deleteLike.userId);
      user.likes = user.likes.filter((postId) => !postId.equals(post._id));
      await user.save();

      //* Emitar una respuesta socket del like
      request.io.emit("like", {
        action: "unlike",
        post: post,
        like: deleteLike,
      });

      response.json({
        Message: "Resource deleted successfully",
        like: deleteLike,
      });
    } catch (error) {
      // ! Manejar errores y devolver un error 500 con detalles
      response.status(500).json({
        Error: "Failed to delete resource",
        Details: error,
      });
    }
  }
}

// * Exportar el controlador de likes
export default LikeController;
