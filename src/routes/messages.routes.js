import {
  getMessagesController,
  addMessageController,
} from "#controllers/chat.controller.js";

import { Router } from "express";

const messageRouter = Router();

messageRouter.get("/", getMessagesController);

messageRouter.post("/", addMessageController);

export default messageRouter;
