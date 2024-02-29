import userModel from "#models/user.model.js";

import mongoose from "mongoose";

import logger from "#utils/logger.js";

const connectDB = (URL) =>
  mongoose.connect(URL).then(() => {
    userModel.syncIndexes();
    logger.info("[Server] - Database connected.");
  });

export default connectDB;
