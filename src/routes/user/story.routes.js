import express from 'express';
import {getAllStories, getStoryById, getAllMyStories, createStory, deleteStory} from '../../controllers/User/stories.controller.js';
import { verifyToken, isUser } from '../../middlewares/authJwt.js';
const router = express.Router();

router.get('/', [verifyToken, isUser], getAllStories);
router.get('/:storyId/get', [verifyToken, isUser], getStoryById);
router.get('/my/get', [verifyToken, isUser], getAllMyStories);
router.post('/', [verifyToken, isUser], createStory);
router.delete('/:storyId', [verifyToken, isUser], deleteStory);

export default router;