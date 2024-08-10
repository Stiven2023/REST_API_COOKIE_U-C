import express from 'express';
import { getAllStories, getStoryById, getAllMyStories, createStory, deleteStory, viewStory, getViewStory } from '../../controllers/User/stories.controller.js';
import { verifyToken, isUser } from '../../middlewares/authJwt.js';
const router = express.Router();

router.post('/', [verifyToken, isUser], createStory);
router.delete('/:storyId', [verifyToken, isUser], deleteStory);
router.get('/my', [verifyToken, isUser], getAllMyStories);
router.get('/', [verifyToken, isUser], getAllStories);
router.get('/:storyId', [verifyToken, isUser], getStoryById);
router.post('/:storyId/view', [verifyToken, isUser], viewStory);
router.get('/:storyId/view', [verifyToken, isUser], getViewStory);

export default router;