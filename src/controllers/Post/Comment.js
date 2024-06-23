import PostModel from "../../models/Post.js";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import config from "../../config.js";

class commentController {
  static async read(request, response) {
    try {
      const { postId } = request.params;
      const post = await PostModel.findById(postId).select("comments");

      if (!post) {
        return response.status(404).json({ error: "Post not found" });
      }

      response.json(post.comments);
    } catch (error) {
      response
        .status(500)
        .json({ error: "Failed to retrieve comments", details: error.message });
    }
  }

  static async create(request, response) {
    try {
      console.log("Creating... Comment");

      const token = request.headers["x-access-token"];
      if (!token) {
        return response.status(401).json({ error: "No token provided" });
      }

      const decoded = jwt.verify(token, config.secret);
      const userId = decoded.id;
      const { content } = request.body;

      if (!content) {
        return response.status(400).json({ error: "Content is required" });
      }

      const { postId } = request.params;

      const user = await User.findById(userId);
      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }

      const post = await PostModel.findById(postId);
      if (!post) {
        return response.status(404).json({ error: "Post not found" });
      }

      const comment = {
        content,
        userId,
      };

      post.comments.push(comment);
      await post.save();
      response.json({ message: "Comment created successfully", comment });
    } catch (error) {
      response
        .status(500)
        .json({ error: "Failed to create comment", details: error.message });
    }
  }

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

      if (
        comment.userId.toString() !== userId &&
        !["admin", "moderator"].includes(user.role)
      ) {
        return response.status(403).json({ error: "Unauthorized" });
      }

      comment.remove();
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
