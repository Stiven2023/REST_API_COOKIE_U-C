"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _Likes = _interopRequireDefault(require("../../controllers/Post/Likes.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var likeRoutes = (0, _express.Router)();

// likeRoutes.get("/", () => {
//   response.json([{ message: "Welcome to Likes" }]);
// });

likeRoutes.get("/:postId/likes", _Likes["default"].getAll); //* read the likes
likeRoutes.get("/:postId/mylikes", _Likes["default"].getMyLikePosts); //* read my likes
likeRoutes.post("/:postId/likes", _Likes["default"].create); //* create a like
likeRoutes["delete"]("/:postId/likes/:id", _Likes["default"]["delete"]); //* Delete a like
var _default = exports["default"] = likeRoutes;