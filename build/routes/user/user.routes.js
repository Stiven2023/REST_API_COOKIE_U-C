"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = require("../../controllers/User/user.controller.js");
var _authJwt = require("../../middlewares/authJwt.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// Admin
router["delete"]('/:userId', [_authJwt.verifyToken, _authJwt.isAdmin], _userController.deleteUser);
router.put('/changeRole', [_authJwt.verifyToken, _authJwt.isAdmin], _userController.changeRole);

// Moder or Admin
router.get('/', [_authJwt.verifyToken], _userController.getAllUsers);
router.post('/searchByUsername', [_authJwt.verifyToken, _authJwt.isModeratorOrAdmin], _userController.getUsersByUsername);
router.put('/:userId', [_authJwt.verifyToken, _authJwt.isModeratorOrAdmin], _userController.updateUser);
router.put('/status/:userId', [_authJwt.verifyToken, _authJwt.isModeratorOrAdmin], _userController.updateStatus);

// User
router.get('/:userId', [_authJwt.verifyToken], _userController.getUsersById);
router.post('/follow/:userId', [_authJwt.verifyToken, _authJwt.isUser], _userController.followUser);
router.post('/unfollow/:userId', [_authJwt.verifyToken, _authJwt.isUser], _userController.unfollowUser);
router.get('/followers/:userId', [_authJwt.verifyToken, _authJwt.isUser], _userController.getFollowers);
router.get('/following/:userId', [_authJwt.verifyToken, _authJwt.isUser], _userController.getFollowing);
router.post('/addFriend/:userId', [_authJwt.verifyToken, _authJwt.isUser], _userController.addFriend);
router.post('/removeFriend/:userId', [_authJwt.verifyToken, _authJwt.isUser], _userController.removeFriend);
router.get('/friends/:userId', [_authJwt.verifyToken, _authJwt.isUser], _userController.getFriends);
router.post('/search', [_authJwt.verifyToken, _authJwt.isUser], _userController.searchUsers);
router.post('/test', _userController.createUser);
var _default = exports["default"] = router;