import { Router, response } from "express";
import LikesController from "../../controllers/Post/Likes.js";

const likeRoutes = Router();

// likeRoutes.get("/", () => {
//   response.json([{ message: "Welcome to Likes" }]);
// });

likeRoutes.get("/:postId/likes", LikesController.getAll); //* read the likes
likeRoutes.get("/:postId/mylikes", LikesController.getMyLikePosts); //* read my likes
likeRoutes.post("/:postId/likes", LikesController.create); //* create a like
likeRoutes.delete("/:postId/likes/:id", LikesController.delete); //* Delete a like

export default likeRoutes;
