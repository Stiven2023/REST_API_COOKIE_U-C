import express from 'express';
import { createChat, getAllChats, getChatById, updateChat, deleteChat, joinChat, getAllChatsForCharts } from '../../controllers/Chat/ChatController.js';
import { verifyToken } from '../../middlewares/authJwt.js';

const routerChat = express.Router();

routerChat.post('/', createChat);
routerChat.get('/', getAllChats);
routerChat.get('/charts', verifyToken, getAllChatsForCharts);
routerChat.post('/:chatid', verifyToken, joinChat);
routerChat.get('/:id', getChatById); 
routerChat.put('/:chatId', updateChat);
routerChat.delete('/:id', deleteChat); 

export default routerChat;
