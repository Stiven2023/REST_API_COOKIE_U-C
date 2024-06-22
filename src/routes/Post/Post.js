import { Router, response } from "express";
import PostController from "../../controllers/Post/Post.js";

const postRoutes = Router();

//* Post
postRoutes.get("/", PostController.read); //* Recover all post
postRoutes.post("/", PostController.create); //* Create new post
postRoutes.get("/:id", PostController.readUnique); //* Recover unique post
postRoutes.delete("/:id", PostController.delete); //* Delete a post

export default postRoutes;
