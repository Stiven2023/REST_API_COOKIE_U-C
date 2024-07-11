// * Importar el modelo de publicación
import PostModel from "../../models/Post.js";

// * Importar multer para la gestión de archivos
import multer from "multer";

// * Importar path para la gestión de rutas de archivos
import path from "path";

// * Importar fs para operaciones de sistema de archivos
import fs from "fs/promises";

// * Importar el modelo de usuario
import User from "../../models/User.js";

// * Importar la configuración
import config from "../../config.js";

// * Importar jsonwebtoken para la autenticación JWT
import jwt from "jsonwebtoken";

// * Importar la función de carga de imágenes desde cloudinary
import { uploadImage } from "../../cloudinary.js";

// * Configurar el almacenamiento de multer en disco
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

// * Configurar multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

// * Definir la clase PostController para manejar las publicaciones
class PostController {
  // * Método para obtener todas las publicaciones
  static async getAll(request, response) {
    try {
      // ! Leer todas las publicaciones de la base de datos
      const posts = await PostModel.find({}).lean();

      // ! Obtener los IDs de usuario de cada publicación
      const userIds = posts.map((post) => post.userId);

      // ! Buscar los usuarios correspondientes y obtener ciertos campos
      const users = await User.find(
        { _id: { $in: userIds } },
        "username fullname image"
      ).lean();

      // ! Crear un mapa de usuarios por ID
      const userMap = {};
      users.forEach((user) => (userMap[user._id] = user));

      // ! Asignar cada publicación a su respectivo usuario y eliminar el campo userId
      posts.forEach((post) => {
        post.user = userMap[post.userId];
        delete post.userId;
      });

      // * Devolver las publicaciones con la información de usuario
      response.json(posts);
    } catch (error) {
      // ! Manejar errores y devolver un error 500 con detalles
      response
        .status(500)
        .json({ Error: "Failed to read resources", Details: error });
    }
  }

  // * Método para obtener una publicación por ID
  static async getById(request, response) {
    // ? Leer un recurso único
    const { id } = request.params;
    PostModel.findById(id)
      .then((post) => {
        if (post) {
          response.json(post);
        } else {
          response.status(404).json({ Error: "Resource not found" });
        }
      })
      .catch((error) => {
        response
          .status(500)
          .json({ Error: "Failed to read unique resource", Details: error });
      });
  }
  // * Método para obtener mis publicaciones
  static async getMyPosts(request, response) {
    try {
      // ? Obtener mis publicaciones
      const token = request.headers["x-access-token"];
      const decoded = jwt.verify(token, config.secret);
      const userId = decoded.id;

      // ? verificar si hay un token
      if (!token) {
        return response.status(401).json({ error: "No token provided" });
      }

      const user = await User.findById(userId);

      // ? Verificar si el usuario existe
      if (!user) {
        return response.status(401).json({ error: "User not found" });
      }

      const myPosts = user.posts;
      console.log(user.posts);
      response.json(myPosts);
    } catch (error) {
      // ! Manejar errores y devolver un error 500 con detalles
      response
        .status(500)
        .json({ Error: "Failed to read resources", Details: error });
    }
  }

  static async getMySavedPosts(request, response) {
    try {
      // ? Obtener mis publicaciones
      const token = request.headers["x-access-token"];
      const decoded = jwt.verify(token, config.secret);
      const userId = decoded.id;

      // ? verificar si hay un token
      if (!token) {
        return response.status(401).json({ error: "No token provided" });
      }

      const user = User.findById(userId); 

      // ? Verificar si el usuario existe
      if (!user) {
        return response.status(401).json({ error: "User not found" });
      } 

      const mySavedPosts = user.savedPosts;

      response.json(mySavedPosts);
    } catch (error) {
      // ! Manejar errores y devolver un error 500 con detalles
      response
        .status(500)
        .json({ Error: "Failed to read resources", Details: error });
    }
  }
  // * Método para agregar a save una publicación
  static async savePost(request, response) {
    const { postId } = request.params;
    const token = request.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;

    // ? verificar si hay un token
    if (!token) {
      return response.status(401).json({ error: "No token provided" });
    }

    const user = await User.findById(userId);

    // ? Verificar si el usuario existe
    if (!user) {  
      return response.status(401).json({ error: "User not found" });
    } 

    const post = await PostModel.findById(postId);

    // ? Verificar si la publicación existe
    if (!post) {
      return response.status(404).json({ error: "Post not found" });
    }
    
    // ? Verificar si el usuario ya ha guardado la publicación
    if (user.savedPosts.includes(post)) {
      return response.status(409).json({ error: "Post already saved" });
    }
    try {
      user.savedPosts.push(post);
      await user.save();
      response.json({ message: "Post saved successfully" });
      
    } catch (error) {
      // ! Manejar errores y devolver un error 500 con detalles
      response
        .status(500)
        .json({ Error: "Failed to read resources", Details: error });
      
    }

  }
  // * Método para eliminar una publicación guardada
  static async deleteSavedPost(request, response) {
    const { postId } = request.params;
    const token = request.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;

    // ? verificar si hay un token
    if (!token) {
      return response.status(401).json({ error: "No token provided" });
    }

    const user = await User.findById(userId);

    // ? Verificar si el usuario existe
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    const post = await PostModel.findById(postId);

    // ? Verificar si la publicación existe
    if (!post) {
      return response.status(404).json({ error: "Post not found" });
    }

    // ? Verificar si el usuario ya ha guardado la publicación
    if (!user.savedPosts.includes(post)) {
      return response.status(409).json({ error: "Post not saved" });
    }
    try {
      user.savedPosts.pull(post);
      await user.save();
      response.json({ message: "Post deleted successfully" });
    } catch (error) {
      // ! Manejar errores y devolver un error 500 con detalles
      response
        .status(500)
        .json({ Error: "Failed to read resources", Details: error });
    }
  }
  // * Método para crear una nueva publicación
  static async create(request, response) {
    // ! Obtener el token de la cabecera de la solicitud
    const token = request.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;

    // ! Buscar el usuario por ID
    const user = await User.findById(userId);

    // ! Verificar si el usuario existe
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    // * Crear los datos de la publicación
    const postData = {
      userId: userId,
      content: request.body.content,
    };

    try {
      // * Crear una nueva instancia de la publicación
      const post = new PostModel(postData);

      // ? Subir la imagen si existe en la solicitud
      if (request.files?.image) {
        const result = await uploadImage(request.files.image.tempFilePath);
        post.mediaUrl = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
        post.image = result.secure_url;
        await fs.unlink(request.files.image.tempFilePath);
      } else {
        post.mediaUrl = null;
      }

      // * Agregar la publicación al usuario y guardar ambos
      user.posts.push(post);
      await user.save();
      console.log(user.posts);
      await post.save();

      // * Devolver la publicación creada
      response.status(201).json(post);
    } catch (error) {
      // ! Manejar errores y devolver un error 500 con detalles
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }

  // * Método para eliminar una publicación
  static async delete(request, response) {
    const { id } = request.params;

    // ! Obtener el token de la cabecera de la solicitud
    const token = request.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;

    // ! Buscar el usuario por ID
    const user = await User.findById(userId);

    // ! Verificar si el usuario existe
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    try {
      // ! Buscar la publicación por ID
      const post = await PostModel.findById(id);

      // ! Verificar si la publicación existe
      if (!post) {
        return response.status(404).json({ error: "Post not found" });
      }

      // ! Verificar si el usuario está autorizado para eliminar la publicación
      if (
        post.userId !== userId &&
        !(user.role === "admin" || user.role === "moderator")
      ) {
        return response.status(401).json({ error: "Unauthorized" });
      }

      // * Eliminar la publicación y devolver un mensaje de éxito
      PostModel.findByIdAndDelete(id)
        .then(() => {
          response.json({ Message: "Resource deleted successfully" });
        })
        .catch((error) => {
          response
            .status(500)
            .json({ Error: "Failed to delete resource", Details: error });
        });
    } catch (error) {
      // ! Manejar errores y devolver un error 500 con detalles
      response
        .status(500)
        .json({ Error: "Failed to delete resource", Details: error });
    }
  }
}

// * Exportar el controlador de publicaciones
export default PostController;
