import PostModel from "../../models/Post.js";
import { likeSchemaZod } from "../../ZodSchemes/PostSchema.js";
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js'


// Todo: Like Actions
class LikeController {
  static async read(request, response) {
    const { postId } = request.params;
    const post = await PostModel.findById(postId);
    response.json(post.likes);
  }
  static async create(request, response) {

    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;

    const { postId } = request.params;
    const like = request.body;

    //! Validate Data
    const validationResult = likeSchemaZod.safeParse(like);

    if (validationResult.success) {
      try {
        //* Create Resource "Like" for this update in the collection Post in field Likes
        const post = await PostModel.findById(postId);

        //* validate if a user has already created a like for a post, if they liked it they cannot create a like again

        const validateLike = post.likes.find((like) => like.userId === like.userId);
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
    } else {
      return response
        .status(400)
        .json({ Error: "Invalid data", Details: validationResult.error });
    }
  }
  static async delete(request, response) {
    const { id } = request.params;
    const { postId } = request.params;
    //! Delete resource
    try {
      const post = await PostModel.findById(postId);
      const deleteLike = post.likes.find((like) => like.id === id);
      post.likes = post.likes.filter((like) => like.id !== id);
      await post.save();
      response.json({
        Message: "Resource deleted successfully",
        like: deleteLike,
      });
    } catch (error) {
      response.status(500).json({
        Error: "Failed delete resource",
        Datails: error,
      });
    }
  }
}

export default LikeController;
