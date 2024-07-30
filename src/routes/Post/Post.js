import { Router } from "express";
import PostController from "../../controllers/Post/Post.js";

const postRoutes = Router();

//* Post
postRoutes.get("/", PostController.getAll); //* Recover all post
postRoutes.get("/my", PostController.getMyPosts); //* Recover my posts
postRoutes.get("/analytics", PostController.getPlatformAnalytics); //* Get post analytics
postRoutes.get("/analytics/:userId", PostController.getPostAnalytics); //* Get post analytics

postRoutes.get("/stats-platform", PostController.getPlatformStats);

postRoutes.get("/save", PostController.getMySavedPosts); //* Recover my saved posts
postRoutes.post("/save/:postId", PostController.savePost); //* Save post
postRoutes.delete("/save/:postId", PostController.deleteSavedPost);

postRoutes.get("/users-with-posts", PostController.getAllUsersWithPosts); //* Recover all users with their posts

postRoutes.post("/", PostController.create); //* Create new post
postRoutes.get("/:id", PostController.getById); //* Recover unique post
postRoutes.delete("/:id", PostController.delete); //* Delete a post


export default postRoutes;
