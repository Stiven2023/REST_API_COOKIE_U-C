"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _ChatController = require("../../controllers/Chat/ChatController.js");
var _authJwt = require("../../middlewares/authJwt.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var routerChat = _express["default"].Router();
routerChat.post('/', _ChatController.createChat);
routerChat.get('/', _ChatController.getAllChats);
routerChat.get('/charts', _authJwt.verifyToken, _ChatController.getAllChatsForCharts);
routerChat.post('/:chatid', _authJwt.verifyToken, _ChatController.joinChat);
routerChat.get('/:id', _ChatController.getChatById);
routerChat.put('/:chatId', _ChatController.updateChat);
routerChat["delete"]('/:id', _ChatController.deleteChat);
var _default = exports["default"] = routerChat;