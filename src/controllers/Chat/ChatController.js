import multer from 'multer';
import Chat from '../../models/Chat.js';
import User from '../../models/User.js';
import Jwt from 'jsonwebtoken';
import config from '../../config.js';
import mongoose from "mongoose"
import { io } from '../../index.js';
import { uploadImage } from '../../cloudinary.js';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const createChat = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = Jwt.verify(token, config.secret);
    const userId = new mongoose.Types.ObjectId(decoded.id);

    const users = req.body.users ? JSON.parse(req.body.users) : [];
    const name = req.body.name || '';
    let group = req.body.group ? JSON.parse(req.body.group) : null;

    if (!Array.isArray(users)) {
      return res.status(400).json({ error: 'Users must be an array' });
    }

    if (group) {
      let imageUrl = '';

      if (req.file?.path) {
        const result = await uploadImage(req.file.path);
        imageUrl = result.secure_url;
      }

      group.admins = [userId.toString()];

      if (!group.participants.includes(userId.toString())) {
        group.participants.push(userId.toString());
      }

      const newChat = new Chat({
        name: name || '',
        group: {
          image: imageUrl || '',
          admins: group.admins.map(id => new mongoose.Types.ObjectId(id)),
          participants: group.participants.map(id => new mongoose.Types.ObjectId(id)),
        },
        creatorId: userId,
        users: group.participants.map(id => new mongoose.Types.ObjectId(id)),
      });

      await newChat.save();

      await User.updateMany(
        { _id: { $in: group.participants.map(id => new mongoose.Types.ObjectId(id)) } },
        { $push: { chats: newChat._id } }
      );

      console.log(newChat)

      io.emit('newChat', newChat);
      res.status(201).json(newChat);
    } else {
      if (name) {
        if (users.length < 3) {
          return res.status(400).json({ error: 'At least three users are required to create a named chat' });
        }
      } else {
        if (users.length !== 2) {
          return res.status(400).json({ error: 'Exactly two users are required to create a chat' });
        }
      }

      if (!users.includes(userId.toString())) {
        return res.status(400).json({ error: 'User ID must be one of the participants' });
      }

      const userObjectIds = users.map(id => new mongoose.Types.ObjectId(id));
      const participants = await User.find({ _id: { $in: userObjectIds } }, 'username');
      if (participants.length !== users.length) {
        return res.status(404).json({ error: 'One or more users not found' });
      }

      const usernames = participants.map(user => user.username);
      const chatName = name || usernames.join(', ');

      const existingChat = await Chat.findOne({
        name: chatName,
        users: { $all: userObjectIds },
      });

      if (existingChat) {
        return res.status(400).json({ error: 'A chat with the same name and participants already exists' });
      }

      const newChat = new Chat({
        name: chatName,
        users: userObjectIds,
        creatorId: userId,
      });

      await newChat.save();

      await User.updateMany(
        { _id: { $in: userObjectIds } },
        { $push: { chats: newChat._id } }
      );

      io.emit('newChat', newChat);
      res.status(201).json(newChat);
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
};


const getAllChats = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = Jwt.verify(token, config.secret);
    const userId = decoded.id;

    // Encuentra todos los chats donde el usuario es parte, pero que no han sido marcados como eliminados por ese usuario
    const chats = await Chat.find({
      users: userId,
      $or: [
        { "deleted.by": { $ne: userId } }, // El chat no ha sido eliminado por el usuario
      ]
    });

    res.json(chats);
  } catch (error) {
    console.error("Error getting all chats:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const joinChat = async (req, res) => {
  try {
    const userId = req.userId;
    const chatId = req.params.chatid;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const chat = await Chat.findById(chatId).populate('messages');
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    const userInChat = chat.users.includes(userId);
    if (!userInChat) {
      return res.status(403).json({ error: 'User is not a member of this chat' });
    }

    io.emit('userJoined', { chatId, userId });

    res.status(200).json({ message: 'Joined chat successfully', chat });
  } catch (error) {
    console.error("Error joining chat:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getChatById = async (req, res) => {
  try {
    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }
    const chatWithMessages = await Chat.findById(chatId).populate('messages');
    res.json(chatWithMessages);
  } catch (error) {
    console.error("Error getting chat by ID:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateChat = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = Jwt.verify(token, config.secret);
    const userId = decoded.id;

    const chatId = req.params.chatId;
    const { name, users, group } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    if (!chat.users.includes(userId)) {
      return res.status(403).json({ error: 'You are not a member of this chat' });
    }

    if (name) {
      chat.name = name;
    }

    if (Array.isArray(users)) {
      chat.users = users;
    }

    if (group && Object.keys(group).length > 0) {
      const { image, admins, participants } = group;

      if (image) {
        const result = await uploadImageChatGroup(image);
        chat.group.image = result.secure_url;
      }

      if (Array.isArray(admins) && admins.length > 0) {
        chat.group.admins = admins.includes(userId) ? admins : [...admins, userId];
      }

      if (Array.isArray(participants) && participants.length > 0) {
        chat.group.participants = participants.includes(userId) ? participants : [...participants, userId];
        chat.users = chat.group.participants;
      }
    }

    await chat.save();

    io.to(chatId).emit('updateChat', {
      chatId: chat._id,
      name: chat.name,
      users: chat.users,
      group: chat.group
    });

    res.status(200).json({ message: 'Chat updated successfully', chat: { chatId: chat._id, name: chat.name, users: chat.users, group: chat.group } });
  } catch (error) {
    console.error("Error updating chat:", error);
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
};

const deleteChat = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = Jwt.verify(token, config.secret);
    const userId = decoded.id;

    const chatId = req.params.id;
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    const isCreator = chat.creatorId === userId;
    const isAdmin = chat.group?.admins?.includes(userId);

    if (isCreator || isAdmin) {
      // Elimina el chat si el usuario es el creador o un administrador
      await Chat.findByIdAndDelete(chatId);
      io.emit('chatDeleted', chatId);
      return res.json({ message: 'Chat deleted successfully' });
    } else {
      // Marca el chat como eliminado para el usuario, pero no lo borra completamente
      chat.deleted = { by: userId, at: new Date() };
      await chat.save();
      return res.json({ message: 'Chat deleted for you' });
    }
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
};


const getAllChatsForCharts = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    const decoded = Jwt.verify(token, config.secret);

    const chats = await Chat.find().select('_id messages createdAt');

    let allMessages = [];

    for (let i = 0; i < chats.length; i++) {
      const chat = chats[i];
      const chatId = chat._id;

      const messages = await Message.find({ _id: { $in: chat.messages } }).select('createdAt');
      console.log("Messages for chat " + chatId + ":", messages);

      allMessages = allMessages.concat(messages.map(message => ({
        createdAt: message.createdAt,
        chat: chatId,
      })));
    }

    res.json({
      totalChats: chats.length,
      chats: chats.map(chat => ({
        _id: chat._id,
        createdAt: chat.createdAt,
        messages: allMessages.filter(message => message.chat.toString() === chat._id.toString())
      }))
    });
  } catch (error) {
    console.error("Error getting all chats for charts:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { createChat, joinChat, updateChat, deleteChat, getAllChats, getChatById, getAllChatsForCharts };