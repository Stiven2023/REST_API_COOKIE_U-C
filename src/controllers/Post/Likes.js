import PostModel from "../../models/Post.js";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import config from "../../config.js";
import mongoose from "mongoose";

class LikeController {
  static async read(request, response) {
    const { postId } = request.params;
    const post = await PostModel.findById(postId);
    response.json(post.likes);
  }
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

      // Verifica si el usuario ya ha dado like al post
      const validateLike = post.likes.find((like) => like.equals(userId));
      if (validateLike) {
        return response
          .status(400)
          .json({ Error: "You have already liked this post" });
      }

      post.likes.push(like);
      await post.save();
      response.json({ Message: "Resource created successfully" });
    } catch (error) {
      response
        .status(500)
        .json({ Error: "Failed to create resource", Details: error });
    }
  }
  static async delete(request, response) {
    const { id } = request.params;
    const { postId } = request.params;

    try {
      const post = await PostModel.findById(postId);

      // Verifica si el like existe en el post
      const deleteLike = post.likes.find((like) => like.id === id);
      if (!deleteLike) {
        return response
          .status(404)
          .json({ Error: "Like not found in the post" });
      }

      post.likes = post.likes.filter((like) => like.id !== id);
      await post.save();
      response.json({
        Message: "Resource deleted successfully",
        like: deleteLike,
      });
    } catch (error) {
      response.status(500).json({
        Error: "Failed to delete resource",
        Details: error,
      });
    }
  }
}

export default LikeController;
