"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _MessageController = require("../../controllers/Chat/MessageController.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post('/:chatId/messages', _MessageController.createMessage);
router.get('/:chatId/messages', _MessageController.getAllMessages);
router.get('/:chatId/messages/:messageId', _MessageController.getMessageById);
router.put('/:chatId/messages/:messageId', _MessageController.updateMessage);
router["delete"]('/:chatId/messages/:messageId', _MessageController.deleteMessage);
var _default = exports["default"] = router;