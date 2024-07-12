import { Router, response } from "express";
import PostController from "../../controllers/Post/Post.js";

const postRoutes = Router();

//* Post
postRoutes.get("/", PostController.getAll); //* Recover all post
postRoutes.get("/my", PostController.getMyPosts); //* Recover my posts

postRoutes.get("/save", PostController.getMySavedPosts); //* Recover my saved posts
postRoutes.post("/save/:postId", PostController.savePost); //* Save post
postRoutes.delete("/save/:postId", PostController.deleteSavedPost);

postRoutes.post("/", PostController.create); //* Create new post
postRoutes.get("/:id", PostController.getById); //* Recover unique post
postRoutes.delete("/:id", PostController.delete); //* Delete a post

export default postRoutes;
