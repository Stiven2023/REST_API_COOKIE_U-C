"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _Post = _interopRequireDefault(require("../../controllers/Post/Post.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var postRoutes = (0, _express.Router)();

//* Post
postRoutes.get("/", _Post["default"].getAll); //* Recover all post
postRoutes.get("/my", _Post["default"].getMyPosts); //* Recover my posts
postRoutes.get("/analytics", _Post["default"].getPlatformAnalytics); //* Get post analytics
postRoutes.get("/analytics/:userId", _Post["default"].getPostAnalytics); //* Get post analytics

postRoutes.get("/save", _Post["default"].getMySavedPosts); //* Recover my saved posts
postRoutes.post("/save/:postId", _Post["default"].savePost); //* Save post
postRoutes["delete"]("/save/:postId", _Post["default"].deleteSavedPost);
postRoutes.get("/users-with-posts", _Post["default"].getAllUsersWithPosts); //* Recover all users with their posts

postRoutes.post("/", _Post["default"].create); //* Create new post
postRoutes.get("/:id", _Post["default"].getById); //* Recover unique post
postRoutes["delete"]("/:id", _Post["default"]["delete"]); //* Delete a post
var _default = exports["default"] = postRoutes;