import express from 'express';
import {
    getAllUsers,
    getFollowers,
    getFollowing,
    getFriends,
    getUsersById,
    getUsersByUsername,
    searchUsers,
    deleteUser,
    updateStatus,
    updateUser,
    followUser,
    unfollowUser,
    addFriend,
    removeFriend,
    changeRole, createUser
  } from '../../controllers/User/user.controller.js';
import { verifyToken, isUser, isAdmin, isModeratorOrAdmin } from '../../middlewares/authJwt.js';

const router = express.Router();

// Admin
router.delete('/:userId', [verifyToken, isAdmin], deleteUser);
router.put('/changeRole', [verifyToken, isAdmin], changeRole);

// Moder or Admin
router.get('/', [verifyToken], getAllUsers);
router.post('/searchByUsername', [verifyToken, isModeratorOrAdmin], getUsersByUsername);
router.put('/:userId', [verifyToken, isModeratorOrAdmin], updateUser);
router.put('/status/:userId', [verifyToken, isModeratorOrAdmin], updateStatus);


// User
router.get('/:userId', [verifyToken], getUsersById);
router.post('/follow/:userId', [verifyToken, isUser], followUser)
router.post('/unfollow/:userId', [verifyToken, isUser], unfollowUser)
router.get('/followers/:userId', [verifyToken, isUser], getFollowers)
router.get('/following/:userId', [verifyToken, isUser], getFollowing)
router.post('/addFriend/:userId', [verifyToken, isUser], addFriend)
router.post('/removeFriend/:userId', [verifyToken, isUser], removeFriend)
router.get('/friends/:userId', [verifyToken, isUser], getFriends)
router.post('/search', [verifyToken, isUser], searchUsers)

router.post('/test', createUser)

export default router;