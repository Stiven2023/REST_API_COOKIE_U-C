import Chat from '../../models/Chat.js';
import Message from '../../models/Message.js';
import User from '../../models/User.js';
import { io } from '../../index.js';
import config from '../../config.js';
import Jwt from "jsonwebtoken";

const createChat = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = Jwt.verify(token, config.secret);
    const userId = decoded.id;

    const { users, name } = req.body;

    if (name) {
      if (users.length < 3) {
        return res.status(400).json({ error: 'At least three users are required to create a named chat' });
      }
    } else {
      if (users.length !== 2) {
        return res.status(400).json({ error: 'Exactly two users are required to create a chat' });
      }
    }

    if (!users.includes(userId)) {
      return res.status(400).json({ error: 'User ID must be one of the participants' });
    }

    const participants = await User.find({ _id: { $in: users } }, 'username');
    if (participants.length !== users.length) {
      return res.status(404).json({ error: 'One or more users not found' });
    }

    const usernames = participants.map(user => user.username);

    const chatName = name || usernames.join(', ');

    const existingChat = await Chat.findOne({
      name: chatName,
      participants: { $all: users }
    });

    if (existingChat) {
      return res.status(400).json({ error: 'A chat with the same name and participants already exists' });
    }

    const newChat = new Chat({
      name: chatName,
      participants: users,
      users: users
    });

    await newChat.save();

    await User.updateMany(
      { _id: { $in: users } },
      { $push: { chats: newChat._id } }
    );

    io.emit('newChat', newChat);
    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
}

const getAllChats = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = Jwt.verify(token, config.secret);
    const userId = decoded.id;

    const chats = await Chat.find({ users: userId })

    res.json(chats);
  } catch (error) {
    console.error("Error getting all chats:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

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
}

const updateChat = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = Jwt.verify(token, config.secret);
    const userId = decoded.id;

    const chatId = req.params.chatId;
    const { name } = req.body;

    const chat = await Chat.findById(chatId);

    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    if (!chat.users.includes(userId)) {
      return res.status(403).json({ error: 'You are not a member of this chat' });
    }

    if (chat.users.length < 3) {
      return res.status(403).json({ error: 'This chat does not allow editing unless it has at least 3 participants' });
    }

    chat.name = name;
    await chat.save();

    res.status(200).json({ message: 'Chat name updated successfully' });
  } catch (error) {
    console.error("Error updating chat:", error);
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
}

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

    if (!chat.users.includes(userId)) {
      return res.status(403).json({ error: 'You are not authorized to delete this chat' });
    }

    await Chat.findByIdAndDelete(chatId);

    io.emit('chatDeleted', chatId);

    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error("Error deleting chat:", error);
    res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
}

const getAllChatsForCharts = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: Token missing' });
    }

    const decoded = Jwt.verify(token, config.secret);

    const chats = await Chat.find()
      .select('_id createdAt');

    let allMessages = [];

    for (let i = 0; i < chats.length; i++) {
      const chatId = chats[i]._id;

      const messages = await Message.find({ chat: chatId })
        .select('createdAt')

      allMessages = allMessages.concat(messages.map(message => ({
        createdAt: message.createdAt,
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
export { createChat, joinChat, updateChat, deleteChat, getAllChats, getChatById, getAllChatsForCharts }