import express from 'express';
import { getAllUsers, getFollowers, getFollowing, getFriends, getUsersById, getUsersByUsername, searchUsers, deleteUser, updateStatus, updateUser, followUser, unfollowUser, addFriend, removeFriend, changeRole, userVerified } from '../../controllers/User/user.controller.js';
import { verifyToken, isUser, isAdmin, isModeratorOrAdmin } from '../../middlewares/authJwt.js';

const router = express.Router();

// Admin
router.delete('/:userId', [verifyToken, isAdmin], deleteUser);
router.put('/role/:userId', [verifyToken, isAdmin], changeRole);
router.put('/verified/:userId', [verifyToken, isAdmin], userVerified);

// Moder or Admin
router.get('/', [verifyToken], getAllUsers);
router.post('/searchByUsername', [verifyToken, isModeratorOrAdmin], getUsersByUsername);
router.put('/:userId', [verifyToken, isModeratorOrAdmin], updateUser);
router.put('/status/:userId', [verifyToken, isModeratorOrAdmin], updateStatus);


// User
router.get('/:userId', [verifyToken], getUsersById);
router.post('/follow/:userId', [verifyToken], followUser)
router.post('/unfollow/:userId', [verifyToken], unfollowUser)
router.get('/followers/:userId', [verifyToken], getFollowers)
router.get('/following/:userId', [verifyToken], getFollowing)
router.post('/addFriend/:userId', [verifyToken], addFriend)
router.post('/removeFriend/:userId', [verifyToken], removeFriend)
router.get('/friends/:userId', [verifyToken], getFriends)
router.post('/search', [verifyToken], searchUsers)

export default router;
