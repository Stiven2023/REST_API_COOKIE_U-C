"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _profileController = require("../../controllers/User/profile.controller.js");
var _authJwt = require("../../middlewares/authJwt.js");
var router = (0, _express.Router)();
router.get('/', [_authJwt.verifyToken, _authJwt.isUser], _profileController.getProfile);
router.put('/', [_authJwt.verifyToken], _profileController.updateProfile);
router.put('/change-password', [_authJwt.verifyToken, _authJwt.isUser], _profileController.changePassword);
var _default = exports["default"] = router;