"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _Comment = _interopRequireDefault(require("../../controllers/Post/Comment.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var commentRoutes = (0, _express.Router)();

// * Comments
commentRoutes.get("/", function () {
  _express.response.json({
    message: "Welcome to comments"
  });
});
commentRoutes.get("/:postId/comments", _Comment["default"].getAll); //* read the comments
commentRoutes.post("/:postId/comments", _Comment["default"].create); //* create a comment
commentRoutes["delete"]("/:postId/comments/:id", _Comment["default"]["delete"]); //* Delete a post
var _default = exports["default"] = commentRoutes;