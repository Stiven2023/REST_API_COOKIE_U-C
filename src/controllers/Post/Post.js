import PostModel from "../../models/Post.js";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import User from "../../models/User.js";
import config from "../../config.js";
import jwt from "jsonwebtoken";
import { uploadImage } from "../../cloudinary.js";

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

const upload = multer({ storage: storage });

class PostController {
  // Todo: Post Actions
  static async read(request, response) {
    try {
      const posts = await PostModel.find({}).lean();

      const userIds = posts.map((post) => post.userId);

      const users = await User.find(
        { _id: { $in: userIds } },
        "username fullname image"
      ).lean();

      const userMap = {};
      users.forEach((user) => (userMap[user._id] = user));

      posts.forEach((post) => {
        post.user = userMap[post.userId];
        delete post.userId;
      });

      response.json(posts);
    } catch (error) {
      response
        .status(500)
        .json({ Error: "Failed to read resources", Details: error });
    }
  }

  static async readUnique(request, response) {
    //* Read unique resource
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
  static async create(request, response) {
    console.log("Creating... Post");

    const token = request.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;
    const user = await User.findById(userId);

    console.log(decoded);

    //* Check if user exists
    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    console.log(user);
    //* Create resources with image upload
    const postData = {
      userId: userId,
      content: request.body.content,
    };

    try {
      const post = new PostModel(postData);

      if (request.files?.image) {
        const result = await uploadImage(request.files.image.tempFilePath);
        console.log(`Result upload: ${result}`);
        post.mediaUrl = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
        post.image = result.secure_url;
        await fs.unlink(request.files.image.tempFilePath);
      } else {
        post.mediaUrl = null;
      }

      user.posts.push(post._id);
      await user.save();
      console.log(post);

      await post.save().then(() => {
        response.status(201).json(post);
      });
    } catch (error) {
      return response.status(500).json({ error: "Internal Server Error" });
    }
  }
  static async delete(request, response) {
    const { id } = request.params;
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;
    const user = await User.findById(userId);
    const post = await PostModel.findById(id);

    //* Check if user exists

    if (!user) {
      return response.status(401).json({ error: "User not found" });
    }

    //* Check if post exists

    if (!post) {
      return response.status(404).json({ error: "Post not found" });
    }

    //* Check if user is authorized

    if (
      post.user.id !== userId ||
      (user.role !== "admin" && user.role !== "moderator")
    ) {
      return response.status(401).json({ error: "Unauthorized" });
    }

    //* Delete resources
    PostModel.findByIdAndDelete(id)
      .then(() => {
        response.json({ Message: "Resource deleted successfully" });
      })
      .catch((error) => {
        response
          .status(500)
          .json({ Error: "Failed to delete resource", Details: error });
      });
  }
}

export default PostController;
