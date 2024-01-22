/* ========= START IMPORTS SECTION ========= */

import userModel from "#models/user.js";

import mongoose from "mongoose";

/* ========= END IMPORTS SECTION ========= */

const connectDB = (URL) =>
  mongoose.connect(URL).then(() => {
    userModel.syncIndexes();
    console.log("[Server]: Database connected.");
  });

export default connectDB;
