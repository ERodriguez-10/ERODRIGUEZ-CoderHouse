import { Router } from "express";
import MessageDAO from "../dao/mongo/message.dao.js";

const MessageInstance = new MessageDAO();

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
  try {
    const messageData = await MessageInstance.getMessages();
    res.status(200).json({ messagesList: messageData });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

messageRouter.post("/", async (req, res) => {
  const messageReq = req.body;

  try {
    const messageCreated = await MessageInstance.addMessage(messageReq);
    res.status(201).json({
      message: "Message succesfully created",
      messageCreated: messageCreated,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default messageRouter;
