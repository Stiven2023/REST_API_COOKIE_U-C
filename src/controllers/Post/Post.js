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

// * Importar la librería de fechas
import moment from "moment";

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
  /**
   * @method getAll
   * @description Obtiene todas las publicaciones con la información del usuario.
   * @param {Object} req - La solicitud HTTP
   * @param {Object} res - La respuesta HTTP
   * @returns {Object} - Lista de publicaciones con detalles del usuario
   */
  static async getAll(req, res) {
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

      // ! Asignar cada publicación a su respectivo usuario
      posts.forEach((post) => {
        post.user = userMap[post.userId] || {}; // Añadir usuario si existe
      });

      // * Devolver las publicaciones con la información de usuario
      res.json(posts);
    } catch (error) {
      // ! Manejar errores y devolver un error 500 con detalles
      res
        .status(500)
        .json({ Error: "Failed to read resources", Details: error });
    }
  }

  /**
   * @method getById
   * @description Obtiene una publicación específica por ID.
   * @param {Object} req - La solicitud HTTP
   * @param {Object} res - La respuesta HTTP
   * @returns {Object} - Información de la publicación
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const post = await PostModel.findById(id).lean();
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ Error: "Resource not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ Error: "Failed to read unique resource", Details: error });
    }
  }

  /**
   * @method getMyPosts
   * @description Obtiene todas las publicaciones del usuario autenticado.
   * @param {Object} req - La solicitud HTTP
   * @param {Object} res - La respuesta HTTP
   * @returns {Object} - Lista de publicaciones del usuario
   */
  static async getMyPosts(req, res) {
    try {
      const token = req.headers["x-access-token"];
      const decoded = jwt.verify(token, config.secret);
      const userId = decoded.id;

      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }

      const user = await User.findById(userId);

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const myPosts = user.posts;
      res.json(myPosts);
    } catch (error) {
      res
        .status(500)
        .json({ Error: "Failed to read resources", Details: error });
    }
  }

  /**
   * @method getMySavedPosts
   * @description Obtiene todas las publicaciones guardadas del usuario autenticado.
   * @param {Object} req - La solicitud HTTP
   * @param {Object} res - La respuesta HTTP
   * @returns {Object} - Lista de publicaciones guardadas del usuario
   */
  static async getMySavedPosts(req, res) {
    try {
      const token = req.headers["x-access-token"];
      const decoded = jwt.verify(token, config.secret);
      const userId = decoded.id;

      if (!token) {
        return res.status(401).json({ error: "No token provided" });
      }

      const user = await User.findById(userId).populate('savedPosts');

      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const mySavedPosts = user.savedPosts;
      res.json(mySavedPosts);
    } catch (error) {
      res
        .status(500)
        .json({ Error: "Failed to read resources", Details: error });
    }
  }

  /**
   * @method savePost
   * @description Guarda una publicación en la lista de publicaciones guardadas del usuario autenticado.
   * @param {Object} req - La solicitud HTTP
   * @param {Object} res - La respuesta HTTP
   * @returns {Object} - Mensaje de éxito o error
   */
  static async savePost(req, res) {
    const { postId } = req.params;
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (user.savedPosts.includes(postId)) {
      return res.status(409).json({ error: "Post already saved" });
    }

    try {
      user.savedPosts.push(postId);
      await user.save();
      res.json({ message: "Post saved successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ Error: "Failed to read resources", Details: error });
    }
  }

  /**
   * @method deleteSavedPost
   * @description Elimina una publicación de la lista de publicaciones guardadas del usuario autenticado.
   * @param {Object} req - La solicitud HTTP
   * @param {Object} res - La respuesta HTTP
   * @returns {Object} - Mensaje de éxito o error
   */
  static async deleteSavedPost(req, res) {
    const { postId } = req.params;
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;

    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const post = await PostModel.findById(postId);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    try {
      user.savedPosts.pull(postId);
      await user.save();
      res.json({ message: "Post deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ Error: "Failed to read resources", Details: error });
    }
  }

  /**
   * @method create
   * @description Crea una nueva publicación y la asocia al usuario autenticado.
   * @param {Object} req - La solicitud HTTP
   * @param {Object} res - La respuesta HTTP
   * @returns {Object} - Publicación creada o mensaje de error
   */
  static async create(req, res) {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (!req.body.content && !req.files?.image) {
      return res.status(400).json({ error: "Content and image are required" });
    }

    const postData = {
      userId: userId,
      content: req.body.content,
    };

    try {
      const post = new PostModel(postData);

      if (req.files?.image) {
        const result = await uploadImage(req.files.image.tempFilePath);
        post.mediaUrl = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
        post.image = result.secure_url;
        await fs.unlink(req.files.image.tempFilePath);
      } else {
        post.mediaUrl = null;
      }

      user.posts.push(post);
      await user.save();
      await post.save();

      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  /**
   * @method delete
   * @description Elimina una publicación si el usuario es el propietario o tiene permisos de administrador o moderador.
   * @param {Object} req - La solicitud HTTP
   * @param {Object} res - La respuesta HTTP
   * @returns {Object} - Mensaje de éxito o error
   */
  static async delete(req, res) {
    const { id } = req.params;

    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (
      post.userId.toString() !== userId &&
      user.role !== "admin" &&
      user.role !== "moderator"
    ) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post" });
    }

    try {
      await PostModel.findByIdAndDelete(id);
      res.json({ Message: "Resource deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ Error: "Failed to delete resource", Details: error });
    }
  }

  /**
   * @method getAllUsersWithPosts
   * @description Obtiene todos los usuarios con sus publicaciones. Incluye detalles de la publicación como comentarios.
   * @param {Object} req - La solicitud HTTP
   * @param {Object} res - La respuesta HTTP
   * @returns {Object} - Información detallada de usuarios y sus publicaciones
   */
  static async getAllUsersWithPosts(req, res) {
    try {
      const users = await User.find({})
        .populate({
          path: "posts",
          populate: {
            path: "comments",
            select: "content emoji userId createdAt",
          },
        })
        .lean();

      const usersWithPosts = users.map((user) => ({
        id: user._id || null, // ID del usuario
        username: user.username || "No username", // Nombre de usuario
        email: user.email || "No email", // Correo electrónico del usuario
        role: user.role || "No role", // Rol del usuario
        status: user.status || "No status", // Estado del usuario
        fullname: user.fullname || "No fullname", // Nombre completo del usuario
        image: user.image?.secure_url || null, // URL de la imagen del usuario (null si no está disponible)
        posts: user.posts.map((post) => ({
          id: post._id || null, // ID de la publicación
          content: post.content || "No content", // Contenido de la publicación
          mediaUrl: post.mediaUrl || null, // URL del medio asociado a la publicación (null si no está disponible)
          image: post.image || null, // Imagen asociada a la publicación (null si no está disponible)
          comments: post.comments || [], // Comentarios de la publicación
          createdAt: post.createdAt || "No creation date", // Fecha de creación de la publicación
        })),
      }));

      res.json(usersWithPosts);
    } catch (error) {
      res
        .status(500)
        .json({ Error: "Failed to read resources", Details: error });
    }
  }

  /**
   * @method getPostAnalytics
   * @description Obtiene datos para generar gráficos específicos sobre los posts de un usuario.
   * @param {Object} req - La solicitud HTTP
   * @param {Object} res - La respuesta HTTP
   * @returns {Object} - Datos necesarios para gráficos sobre los posts del usuario
   */
  static async getPostAnalytics(req, res) {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ Error: "User ID is required" });
    }

    if (!decoded) {
      return res.status(401).json({ Error: "Invalid token" });
    }

    try {
      // Obtener el usuario y sus posts
      const user = await User.findById(userId)
        .populate({
          path: "posts",
          populate: {
            path: "comments",
            select: "content emoji userId createdAt",
          },
        })
        .lean();

      if (!user) {
        return res.status(404).json({ Error: "User not found" });
      }

      const posts = user.posts;

      if (!posts || posts.length === 0) {
        return res.status(404).json({ Error: "No posts found for this user" });
      }

      // Gráfico 1: Número de posts por rango de tiempo
      const postsByMonth = posts.reduce((acc, post) => {
        const month = moment(post.createdAt).format("YYYY-MM");
        if (!acc[month]) acc[month] = 0;
        acc[month]++;
        return acc;
      }, {});

      // Gráfico 2: Distribución de comentarios por publicación
      const commentsDistribution = posts.map((post) => ({
        postId: post._id,
        numberOfComments: post.comments.length,
      }));

      // Gráfico 3: Promedio de comentarios y likes por publicación
      const commentsAndLikesAverage = posts.reduce(
        (acc, post) => {
          acc.totalComments += post.comments.length;
          acc.totalLikes += post.likes.length; // Asegúrate de que `post.likes` existe en el modelo
          acc.totalPosts++;
          return acc;
        },
        {
          totalComments: 0,
          totalLikes: 0,
          totalPosts: 0,
        }
      );

      if (commentsAndLikesAverage.totalPosts > 0) {
        commentsAndLikesAverage.averageComments =
          commentsAndLikesAverage.totalComments /
          commentsAndLikesAverage.totalPosts;
        commentsAndLikesAverage.averageLikes =
          commentsAndLikesAverage.totalLikes /
          commentsAndLikesAverage.totalPosts;
      } else {
        commentsAndLikesAverage.averageComments = 0;
        commentsAndLikesAverage.averageLikes = 0;
      }

      // Devolver los datos para los gráficos
      res.json({
        postsByMonth,
        commentsDistribution,
        commentsAndLikesAverage,
      });
    } catch (error) {
      res.status(500).json({
        Error: "Failed to retrieve analytics",
        Details: error.message,
      });
    }
  }
  /**
   * @method getPlatformAnalytics
   * @description Obtiene datos analíticos de toda la plataforma sobre las publicaciones.
   * @param {Object} req - La solicitud HTTP
   * @param {Object} res - La respuesta HTTP
   * @returns {Object} - Datos analíticos de las publicaciones en la plataforma
   */
  static async getPlatformAnalytics(req, res) {
    try {
      // Obtener todas las publicaciones
      const posts = await PostModel.find({}).populate("comments").lean();

      // Calcular el número total de publicaciones por mes
      const postsByMonth = {};
      posts.forEach((post) => {
        const month = moment(post.createdAt).format("YYYY-MM");
        postsByMonth[month] = (postsByMonth[month] || 0) + 1;
      });

      // Calcular la distribución de comentarios por publicación
      const commentsDistribution = posts.map((post) => ({
        postId: post._id,
        numberOfComments: post.comments.length,
      }));

      // Calcular el promedio de comentarios y likes por publicación
      const totalPosts = posts.length;
      const totalComments = posts.reduce(
        (sum, post) => sum + post.comments.length,
        0
      );

      // Asegúrate de que 'likes' sea un número y no una cadena o un objeto
      const totalLikes = posts.reduce(
        (sum, post) => sum + (Number(post.likes) || 0),
        0
      );

      const averageComments = totalPosts > 0 ? totalComments / totalPosts : 0;
      const averageLikes = totalPosts > 0 ? totalLikes / totalPosts : 0;

      const commentsAndLikesAverage = {
        totalComments,
        totalLikes,
        totalPosts,
        averageComments,
        averageLikes,
      };

      // Devolver los datos analíticos
      res.json({
        postsByMonth,
        commentsDistribution,
        commentsAndLikesAverage,
      });
    } catch (error) {
      // Manejar errores y devolver un mensaje de error
      res.status(500).json({
        Error: "Failed to retrieve platform analytics",
        Details: error.message,
      });
    }
  }
  /**
   * @method getPlatformStats
   * @description Obtiene la cantidad total de posts, comentarios, likes y posts guardados de todos los usuarios.
   * @param {Object} req - La solicitud HTTP
   * @param {Object} res - La respuesta HTTP
   * @returns {Object} - Estadísticas de posts, comentarios, likes y posts guardados
   */
  static async getPlatformStats(req, res) {
    try {
      // Obtener todas las publicaciones
      const posts = await PostModel.find({}).populate("comments").lean();

      // Obtener todos los usuarios
      const users = await User.find({}).populate("savedPosts").lean();

      // Calcular el número total de publicaciones
      const totalPosts = posts.length;

      // Calcular el número total de comentarios
      const totalComments = posts.reduce(
        (sum, post) => sum + (post.comments ? post.comments.length : 0),
        0
      );

      // Calcular el número total de likes
      const totalLikes = posts.reduce(
        (sum, post) => sum + (post.likes ? post.likes.length : 0),
        0
      );

      // Calcular el número total de posts guardados
      const totalSavedPosts = users.reduce(
        (sum, user) => sum + (user.savedPosts ? user.savedPosts.length : 0),
        0
      );

      // Devolver los datos
      res.json({
        totalPosts,
        totalComments,
        totalLikes,
        totalSavedPosts,
      });
    } catch (error) {
      // Manejar errores y devolver un mensaje de error
      res.status(500).json({
        Error: "Failed to retrieve platform statistics",
        Details: error.message,
      });
    }
  }
}

// * Exportar el controlador de publicaciones
export default PostController;
