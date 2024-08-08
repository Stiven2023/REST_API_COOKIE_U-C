"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authController = require("../../controllers/User/auth.controller.js");
var _verifySingup = _interopRequireDefault(require("../../middlewares/verifySingup.js"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();
router.post('/signup', _verifySingup["default"], _authController.signup);
router.post('/signin', _authController.signin);
router.post('/logout', _authController.logout);
router.post('/recover', _authController.codeRecoverPassword);
router.post('/validate', _authController.validateCode);
router.post('/changePassword', _authController.changePassword);
var _default = exports["default"] = router;