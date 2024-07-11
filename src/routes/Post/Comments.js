import { Router, response } from "express";
import commentsController from "../../controllers/Post/Comment.js";

const commentRoutes = Router();

// * Comments
commentRoutes.get("/", () => {
  response.json({ message: "Welcome to comments" });
});

commentRoutes.get("/:postId/comments", commentsController.getAll); //* read the comments
commentRoutes.post("/:postId/comments", commentsController.create); //* create a comment
commentRoutes.delete("/:postId/comments/:id", commentsController.delete); //* Delete a post

export default commentRoutes;
