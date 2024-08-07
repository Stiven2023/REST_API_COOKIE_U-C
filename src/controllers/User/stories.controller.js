import Story from '../../models/Story.js';
import User from '../../models/User.js';
import Notification from '../../models/Notification.js';
import { io } from '../../index.js';
import config from '../../config.js';
import Jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import { uploadImage } from "../../cloudinary.js";

const getAllStories = async (req, res) => { // Obtiene todas las historias de los usuarios que sigues o tienes como amigos
 try {
  const token = req.headers['x-access-token'];
  const decoded = Jwt.verify(token, config.secret);
  const userId = decoded.id;

  const user = await User.findById(userId);

  const followingIds = user.following;
  const friendsIds = user.friends;

  const stories = await Story.find({ $or: [{ userId: { $in: [...followingIds, ...friendsIds] } }] }).populate('userId');

  res.json(stories);
 } catch (error) {
  console.error("Error getting all stories:", error);
  res.status(500).json({ error: 'Internal Server Error' });
 }
}

const getStoryById = async (req, res) => { // Obtiene una historia específica por ID ✅
 try {
  const token = req.headers['x-access-token'];
  const decoded = Jwt.verify(token, config.secret);
  const userId = decoded.id;
  const { storyId } = req.params;

  const user = await User.findById(userId);

  const story = await Story.findById(storyId).populate('userId');

  res.json(story);

 } catch (error) {
  console.error("Error getting story by ID:", error);
  res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
 }
}

const getAllMyStories = async (req, res) => { // Obtiene todas las historias que tienes creadas ✅
 try {
  const token = req.headers['x-access-token'];
  const decoded = Jwt.verify(token, config.secret);
  const userId = decoded.id;

  const stories = await Story.find({ userId: userId }).populate('userId');

  res.status(200).json(stories);
 } catch (error) {
  console.error("Error getting all stories:", error);
  res.status(500).json({ error: 'Internal Server Error' });
 }
}

const createStory = async (req, res) => { // Crea una nueva historia ✅
 try {
  const token = req.headers['x-access-token'];
  const decoded = Jwt.verify(token, config.secret);
  const userId = decoded.id;

  const { content } = req.body;

  const user = await User.findById(userId);

  if (!user) {
   return res.status(401).json({ error: 'User not found' });
  }

  const story = new Story({
   userId,
   content,
  });

  if (req.files?.image) {
   const result = await uploadImage(req.files.image.tempFilePath);
   story.image = {
    public_id: result.public_id,
    secure_url: result.secure_url,
   };
   await fs.unlink(req.files.image.tempFilePath);
  }

  await story.save();
  await user.storys.push(story._id);
  await user.save();

  const followingIds = user.following;
  const friendsIds = user.friends;

  const notification = new Notification({
   userId: userId,
   message: `${user.fullname} created a new story.`,
   actionId: story._id,
  })

  const updateNotifications = [...followingIds, ...friendsIds].map(async (recipientId) => {
   if (recipientId.toString() !== userId) {
    return User.findByIdAndUpdate(
     recipientId,
     { $push: { notifications: notification._id } },
     { new: true }
    );
   }
  });

  await Promise.all(updateNotifications);

  io.emit('storyCreated', story);
  res.status(201).json(story);
 } catch (error) {
  console.error("Error creating story:", error);
  res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
 }
}

const deleteStory = async (req, res) => { // Elimina una historia ✅
 try {
  const token = req.headers['x-access-token'];
  const decoded = Jwt.verify(token, config.secret);
  const userId = decoded.id;
  const { storyId } = req.params;

  const user = await User.findById(userId);

  if (!user) {
   return res.status(401).json({ error: 'User not found' });
  }

  const story = await Story.findById(storyId);

  if (!story) {
   return res.status(404).json({ error: 'Story not found' });
  }

  if (story.userId.toString() !== userId) {
   return res.status(403).json({ error: 'User is not authorized to delete this story' });
  }

  await Story.findByIdAndDelete(storyId);

  io.emit('storyDeleted', storyId);
  res.json({ message: 'Story deleted successfully' });
 } catch (error) {
  console.error("Error deleting story:", error);
  res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
 }
}

export { getAllStories, getStoryById, getAllMyStories, createStory, deleteStory };