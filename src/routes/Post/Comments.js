import { Router, response } from "express";
import commentsController from "../../controllers/Post/Comment.js";

const routerComment = Router();

// * Comments
routerComment.get("/", () => {
  response.json({ message: "Welcome to comments" });
});

routerComment.get("/:postId/comments", commentsController.read); //* read the comments
routerComment.post("/:postId/comments", commentsController.create); //* create a comment
routerComment.delete("/:postId/comments/:id", commentsController.delete); //* Delete a post

export default routerComment;
