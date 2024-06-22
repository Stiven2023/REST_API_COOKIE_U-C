import { PostSchemaZod } from "../../ZodSchemes/PostSchema.js";
import PostModel from "../../models/Post.js";
import multer from "multer";
import path from "path";
import { uploadImage } from "../../cloudinary.js";
import fs from "fs/promises";
import User from '../../models/User.js';
import config from '../../config.js'


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
    //* Read resources
    PostModel.find({})
      .then((posts) => {
        response.json(posts);
      })
      .catch((error) => {
        response
          .status(500)
          .json({ Error: "Failed to read resources", Details: error });
      });
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

    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;
    const user = await User.findById(userId);

    //* Check if user exists
    if (!user) {
      return response.status(401).json({ error: 'User not found' });
    }
    //* Create resources with image upload
    upload.single("image")(request, response, async (err) => {
      if (err) {
        return response
          .status(400)
          .json({ Error: "Failed to upload image", Details: err });
      }
      const postData = request.body;
      const validationResult = PostSchemaZod.safeParse(postData);
      if (validationResult.success) {
        if (request.file) {
          const result = await uploadImagePost(request.file.path);
          postData.image = result.secure_url;

          try {
            await fs.unlink(request.file.path);
            console.log("Temporary image deleted successfully");
          } catch (err) {
            console.error("Failed to delete temporary image", err);
          }
        } else {
          postData.image = null;
        }
        const newPost = new PostModel(postData);

        newPost
          .save()
          .then(() => {
            response
              .status(201)
              .json({ Message: "Resource created successfully" });
          })
          .catch((error) => {
            response
              .status(500)
              .json({ Error: "Failed to create resource", Details: error });
          });
      } else {
        return response
          .status(400)
          .json({ Error: "Invalid data", Details: validationResult.error });
      }
    });
  }
  static async delete(request, response) {

    const { id } = request.params;
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, config.secret);
    const userId = decoded.id;
    const user = await User.findById(userId);
    const post = await PostModel.findById(id);

    //* Check if user exists

    if (!user) {
      return response.status(401).json({ error: 'User not found' });
    }

    //* Check if post exists

    if (!post) {
      return response.status(404).json({ error: 'Post not found' });
    }

    //* Check if user is authorized

    if(post.user.id !== userId || user.role !== 'admin' && user.role !== 'moderator') {
      return response.status(401).json({ error: 'Unauthorized' });
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