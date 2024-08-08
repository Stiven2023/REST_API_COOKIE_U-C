import express from 'express';
import {getAllStories, getStoryById, getAllMyStories, createStory, deleteStory} from '../../controllers/User/stories.controller.js';
import { verifyToken, isUser } from '../../middlewares/authJwt.js';
const router = express.Router();

router.post('/', [verifyToken, isUser], createStory);
router.delete('/:storyId', [verifyToken, isUser], deleteStory);
router.get('/my', [verifyToken, isUser], getAllMyStories);
router.get('/', [verifyToken, isUser], getAllStories);
router.get('/:storyId', [verifyToken, isUser], getStoryById);

export default router;