import { Router } from "express";
import MessageController from "../controllers/mongo/message.controller.js";

const MessageInstance = new MessageController();

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
