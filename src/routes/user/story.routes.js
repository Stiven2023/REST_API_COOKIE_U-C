import express from 'express';
import { getAllStories, getStoryById, getAllMyStories, createStory, deleteStory, viewStory, getViewStory } from '../../controllers/User/stories.controller.js';
import { verifyToken, isUser } from '../../middlewares/authJwt.js';
const router = express.Router();

router.post('/', [verifyToken], createStory);
router.delete('/:storyId', [verifyToken], deleteStory);
router.get('/my', [verifyToken], getAllMyStories);
router.get('/', [verifyToken], getAllStories);
router.get('/:storyId', [verifyToken], getStoryById);
router.post('/:storyId/view', [verifyToken], viewStory);
router.get('/:storyId/view', [verifyToken], getViewStory);

export default router;