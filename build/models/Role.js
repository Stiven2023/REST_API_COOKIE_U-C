"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ROLES = void 0;
var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ROLES = exports.ROLES = ["user", "admin", "moderator"];
var roleSchema = new _mongoose["default"].Schema({
  name: String
}, {
  versionKey: false
});
var _default = exports["default"] = _mongoose["default"].model("Role", roleSchema);