import { configEnv } from "#configs/env.config.js";
import userModel from "#models/user.model.js";

import mongoose from "mongoose";

const DB_USER = configEnv.DB_USER;
const DB_PASSWORD = configEnv.DB_PASS;
const DB_NAME = configEnv.DB_NAME;
const DB_CLUSTER = configEnv.DB_CLUSTER;

const URL_MONGO = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

export default class MongoSingleton {
  static #instance;

  constructor() {
    this.#connectMongoDB();
  }

  static getInstance() {
    if (this.#instance) {
      console.log("[ERROR] Already exist a connection to MongoDB");
    } else {
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }

  #connectMongoDB = async () => {
    try {
      await mongoose.connect(URL_MONGO).then(() => {
        userModel.syncIndexes();
        console.log("[Server]: MongoDB connected.");
      });
    } catch (error) {
      console.log("[ERROR] Connection to MongoDB failed: " + error);
      process.exit();
    }
  };
}
