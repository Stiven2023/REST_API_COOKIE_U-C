import { Router, response } from "express";
import PostController from "../../controllers/Post/Post.js";

const postRoutes = Router();

//* Post
postRoutes.get("/", PostController.getAll); //* Recover all post
postRoutes.get("/:id", PostController.getById); //* Recover unique post
postRoutes.get("/my", PostController.getMyPosts); //* Recover my posts
postRoutes.get("/saved", PostController.getMySavedPosts); //* Recover my saved posts

postRoutes.post("/save/:id", PostController.savePost); //* Save a post
postRoutes.post("/", PostController.create); //* Create new post

postRoutes.delete("/:id", PostController.delete); //* Delete a post
postRoutes.delete("/save/:id", PostController.deleteSavedPost); //* Delete a saved post

export default postRoutes;
