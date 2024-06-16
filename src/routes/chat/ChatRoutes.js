import express from 'express';
import { createChat, getAllChats, getChatById, updateChat, deleteChat, joinChat } from '../../controllers/Chat/ChatController.js';
import { verifyToken } from '../../middlewares/authJwt.js';

const routerChat = express.Router();

routerChat.post('/', createChat);
routerChat.get('/', getAllChats);
routerChat.post('/:chatid', verifyToken, joinChat);
routerChat.get('/:id', getChatById); 
routerChat.put('/:chatId', updateChat);
routerChat.delete('/:id', deleteChat); 

export default routerChat;
