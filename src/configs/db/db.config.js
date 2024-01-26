import userModel from "#models/user.model.js";

import mongoose from "mongoose";

const connectDB = (URL) =>
  mongoose.connect(URL).then(() => {
    userModel.syncIndexes();
    console.log("[Server]: Database connected.");
  });

export default connectDB;
