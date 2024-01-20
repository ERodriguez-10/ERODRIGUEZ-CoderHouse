import { Router } from "express";
import { getMessages, addMessage } from "#controllers/chat/index.js";

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
  try {
    const messageData = await getMessages();
    res.status(200).json({ messagesList: messageData });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

messageRouter.post("/", async (req, res) => {
  const messageReq = req.body;

  try {
    const messageCreated = await addMessage(messageReq);
    res.status(201).json({
      message: "Message succesfully created",
      messageCreated: messageCreated,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default messageRouter;
