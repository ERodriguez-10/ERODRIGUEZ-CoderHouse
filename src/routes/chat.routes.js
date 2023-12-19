import { Router } from "express";
import ChatDAO from "../dao/mongo/chat.dao.js";

const ChatsInstance = new ChatDAO();

const chatRouter = Router();

chatRouter.get("/", async (req, res) => {
  try {
    const listOfChats = await ChatsInstance.getChats();
    res.status(200).json({ listOfChats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

chatRouter.post("/", async (req, res) => {
  const chatObject = req.body;

  try {
    const chatCreated = await ChatsInstance.addChat(chatObject);
    res.status(201).json({
      message: "Chat succesfully created",
      chatCreated,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default chatRouter;
