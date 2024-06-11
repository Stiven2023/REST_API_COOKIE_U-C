import PostModel from "../../models/Post.js";
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';
import config from '../../config.js'


// Todo: Comments Actions
class commentController {
  static async read(request, response) {
    const { postId } = request.params;

    const post = await PostModel.findById(postId);
    response.json(post.comments);
  }
  static async create(request, response) {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;
    const { postId } = request.params;
    const comment = request.body;

    //* verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return response
        .status(404)
        .json({ Error: "User not found", Details: error });
    }
    //* verify post exists
    const post = await PostModel.findById(postId);
    if (!post) {
      return response
        .status(404)
        .json({ Error: "Post not found", Details: error });
    }

    //* Create Resource "Like" for this update in the collection Post in field Likes

    try {
      const post = await PostModel.findById(postId);
      post.comments.push(comment);
      await post.save();
      response.json({ Message: "Resource created successfully", comment });
    } catch (error) {
      response
        .status(500)
        .json({ Error: "Failed to create resource", Details: error });
    }
  }
  static async delete(request, response) {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;
    const { postId } = request.params;
    const { id } = request.params;

    //* verify user exists
    const user = await User.findById(userId);
    if (!user) {
      return response
        .status(404)
        .json({ Error: "User not found", Details: error });
    }
    //* verify post exists
    const post = await PostModel.findById(postId);
    if (!post) {
      return response
        .status(404)
        .json({ Error: "Post not found", Details: error });
    }
    //* Check if user is authorized
    if (posst.user.id !== userId || user.role !== 'admin' && user.role !== 'moderator') {
      return response
        .status(401)
        .json({ Error: "Unauthorized", Details: error });
    }


    //! Delete resource
    try {
      const post = await PostModel.findById(postId);
      const deleteComment = post.comments.find((comment) => comment.id === id);
      post.comments = post.comments.filter((comment) => comment.id !== id);
      await post.save();
      response.json({
        Message: "Resource deleted successfully",
        resource: deleteComment,
      });
    } catch (error) {
      response.status(500).json({
        Error: "Failed create resource",
        Datails: error,
      });
    }
  }
}

export default commentController;
