import multer from 'multer';
import Chat from '../../models/Chat.js';
import User from '../../models/User.js';
import Jwt from 'jsonwebtoken';
import config from '../../config.js';
import mongoose from "mongoose"
import { io } from '../../index.js';
import { uploadImage } from '../../cloudinary.js';
import fs from 'fs-extra';

const storage = multer.memoryStorage();
const upload = multer({ storage });

const createChat = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = Jwt.verify(token, config.secret);
    const userId = new mongoose.Types.ObjectId(decoded.id);

    // Parsear los usuarios del cuerpo de la solicitud
    const users = req.body.users ? JSON.parse(req.body.users) : [];
    const name = req.body.name || '';

    console.log("Received data:", {
      users,
      name,
      group: req.body.group,
      image: req.files?.image
    });

    // Inicializar la URL de la imagen como cadena vacía
    let imageUrl = '';

    // Verificar si existe una imagen para subir
    if (req.files?.image) {
      try {
        const result = await uploadImage(req.files.image.tempFilePath);
        imageUrl = result.secure_url;
        console.log("Image uploaded:", result);
        await fs.unlink(req.files.image.tempFilePath); // Eliminar el archivo temporal
      } catch (imageError) {
        console.error("Image upload failed:", imageError);
        return res.status(500).json({ error: 'Failed to upload image' });
      }
    }

    // Manejo de `group`, si se envía como parte de la solicitud
    let group = req.body.group ? JSON.parse(req.body.group) : null;

    // Validar que `users` sea un array
    if (!Array.isArray(users)) {
      return res.status(400).json({ error: 'Users must be an array' });
    }

    // Si se trata de un chat de grupo
    if (group) {
      console.log("Group data before processing:", group);

      // Añadir el creador a la lista de admins
      group.admins = [userId.toString()];

      // Añadir el creador a la lista de participantes si no está ya
      if (!group.participants.includes(userId.toString())) {
        group.participants.push(userId.toString());
      }

      const newChat = new Chat({
        name: name || '',
        group: {
          image: imageUrl || '', // Usar la URL de la imagen si existe
          admins: group.admins.map(id => new mongoose.Types.ObjectId(id)),
          participants: group.participants.map(id => new mongoose.Types.ObjectId(id)),
        },
        creatorId: userId,
        users: group.participants.map(id => new mongoose.Types.ObjectId(id)),
      });

      await newChat.save();

      // Actualizar los usuarios con el nuevo chat
      await User.updateMany(
        { _id: { $in: group.participants.map(id => new mongoose.Types.ObjectId(id)) } },
        { $push: { chats: newChat._id } }
      );

      console.log("New chat created:", newChat);

      io.emit('newChat', newChat); // Emitir el evento del nuevo chat
      return res.status(201).json(newChat);
    } else {
      // Validaciones para chats individuales
      if (name && users.length < 3) {
        return res.status(400).json({ error: 'At least three users are required to create a named chat' });
      }

      if (!name && users.length !== 2) {
        return res.status(400).json({ error: 'Exactly two users are required to create a chat' });
      }

      if (!users.includes(userId.toString())) {
        return res.status(400).json({ error: 'User ID must be one of the participants' });
      }

      const userObjectIds = users.map(id => new mongoose.Types.ObjectId(id));

      // Verificar que todos los usuarios existen
      const participants = await User.find({ _id: { $in: userObjectIds } }, 'username');
      if (participants.length !== users.length) {
        return res.status(404).json({ error: 'One or more users not found' });
      }

      const usernames = participants.map(user => user.username);
      const chatName = name || usernames.join(', ');

      // Verificar si ya existe un chat con los mismos participantes
      const existingChat = await Chat.findOne({
        name: chatName,
        users: { $all: userObjectIds },
      });

      if (existingChat) {
        return res.status(400).json({ error: 'A chat with the same name and participants already exists' });
      }

      // Crear un nuevo chat
      const newChat = new Chat({
        name: chatName,
        users: userObjectIds,
        creatorId: userId,
      });

      await newChat.save();

      // Actualizar los usuarios con el nuevo chat
      await User.updateMany(
        { _id: { $in: userObjectIds } },
        { $push: { chats: newChat._id } }
      );

      io.emit('newChat', newChat); // Emitir el evento del nuevo chat
      return res.status(201).json(newChat);
    }
  } catch (error) {
    console.error("Error creating chat:", error);
    return res.status(500).json({ error: 'Internal Server Error', errorMessage: error.message });
  }
};

const getAllChats = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const decoded = Jwt.verify(token, config.secret);
    const userId = decoded.id;

    const chats = await Chat.find({
      users: userId,
      $or: [
        { "deleted.by": { $ne: userId } },
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
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = Jwt.verify(token, config.secret);
    const userId = new mongoose.Types.ObjectId(decoded.id);

    console.log("Decoded token:", decoded);

    const chatId = req.params.chatId;
    const { name, users, group: groupData } = req.body;

    console.log("Request body:", { name, users, groupData });

    const chat = await Chat.findById(chatId);
    if (!chat) {
      return res.status(404).json({ error: 'Chat not found' });
    }

    // Verificar si el usuario es miembro del chat
    if (!chat.users.includes(userId.toString())) {
      return res.status(403).json({ error: 'You are not a member of this chat' });
    }

    // Actualizar el nombre del chat
    if (name) {
      chat.name = name;
    }

    // Actualizar los usuarios si se proporcionan
    if (Array.isArray(users)) {
      chat.users = users.map(id => new mongoose.Types.ObjectId(id));
    }

    // Procesar el campo group
    if (groupData) {
      const group = JSON.parse(groupData);  // Deserializar el campo group
      const { image, admins, participants } = group;

      console.log("Group data parsed:", { image, admins, participants });

      // Subir y actualizar la imagen del grupo si se proporciona
      if (req.files?.image) {
        const imageFile = req.files.image;
        console.log("Received image file:", imageFile);

        const result = await uploadImage(imageFile.tempFilePath);  // Función de subida de imagen
        chat.group.image = result.secure_url;
        console.log("Image upload result:", result);
      }

      // Actualizar admins si se proporcionan
      if (Array.isArray(admins) && admins.length > 0) {
        chat.group.admins = admins.includes(userId.toString()) ? admins : [...admins, userId.toString()];
      }

      // Actualizar participants si se proporcionan
      if (Array.isArray(participants) && participants.length > 0) {
        chat.group.participants = participants.includes(userId.toString()) ? participants : [...participants, userId.toString()];
        chat.users = chat.group.participants.map(id => new mongoose.Types.ObjectId(id));
      }
    }

    // Guardar los cambios
    await chat.save();

    // Emitir evento de actualización de chat
    io.to(chatId).emit('updateChat', {
      chatId: chat._id,
      name: chat.name,
      users: chat.users,
      group: chat.group
    });

    // Respuesta exitosa
    res.status(200).json({
      message: 'Chat updated successfully',
      chat: { chatId: chat._id, name: chat.name, users: chat.users, group: chat.group }
    });
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
      await Chat.findByIdAndDelete(chatId);
      io.emit('chatDeleted', chatId);
      return res.json({ message: 'Chat deleted successfully' });
    } else {
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