"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var Schema = _mongoose["default"].Schema;
var MessageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: [{
    type: String
  }],
  mediaUrl: {
    public_id: String,
    secure_url: String
  }
}, {
  timestamps: true,
  versionKey: false
});
var Message = _mongoose["default"].model('Message', MessageSchema);
var _default = exports["default"] = Message;