import { chatServices } from "#services/chat/index.services.js";

const getMessagesController = async (req, res) => {
  try {
    const messageData = await chatServices.getMessages();
    res.status(200).json({ messagesList: messageData });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const addMessageController = async (req, res) => {
  const messageReq = req.body;

  try {
    const messageCreated = await chatServices.addMessage(messageReq);
    res.status(201).json({
      message: "Message succesfully created",
      messageCreated: messageCreated,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getMessagesController, addMessageController };
