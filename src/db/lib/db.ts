import mongoose from "mongoose";
import { Chat } from "../models/Chat";
import { Message } from "../models/Message";
import { connectToDatabase } from "./mongodb";
import { ObjectId } from "mongodb";

export const createChat = async (title: string, userId: string, modelName: string) => {
  await connectToDatabase();
  const newChat = new Chat({ title, userId, modelName });
  return await newChat.save();
};

export const getChat = async (chatId: string, userId: string) => {
  await connectToDatabase();
  const chat = await Chat.findOne({ _id: chatId, userId });
  return chat;
};

export const getChats = async (userId: string) => {
  await connectToDatabase();
  const chats = await Chat.find({ userId }).sort({ createdAt: -1 });
  return chats;
};

export const createMessage = async (chatId: string, content: string, role: string) => {
  const newMessage = new Message({ chatId, content, role });
  return await newMessage.save();
};

export const getMessagesByChatId = async (chatId: string) => {
  await connectToDatabase();
  // const chat_id = new ObjectId(chatId)
  const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
  return messages;
};