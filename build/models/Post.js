"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var commentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  emoji: {
    type: String,
    "enum": ['none', 'ungry', 'happy', 'sad'],
    "default": 'none'
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var likeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var postSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  mediaUrl: {
    public_id: String,
    secure_url: String
  },
  image: {
    type: String,
    required: false
  },
  asybilityImage: {
    type: String,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  likes: [likeSchema],
  comments: [commentSchema]
}, {
  timestamps: true
});
var Post = _mongoose["default"].model("Post", postSchema);
var _default = exports["default"] = Post;