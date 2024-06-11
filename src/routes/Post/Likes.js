import { Router, response } from "express";
import LikesController from "../../controllers/Post/Likes.js";

const routerLike = Router();

// routerLike.get("/", () => {
//   response.json([{ message: "Welcome to Likes" }]);
// });

routerLike.get("/:postId/likes", LikesController.read); //* read the likes
routerLike.post("/:postId/likes", LikesController.create); //* create a like
routerLike.delete("/:postId/likes/:id", LikesController.delete); //* Delete a like

export default routerLike;
