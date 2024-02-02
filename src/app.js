import { configEnv } from "#configs/env.config.js";

import connectDB from "#configs/db/db.config.js";
import httpServer from "#configs/server/http.config.js";
import socketServer from "#configs/server/socket.config.js";

const PORT = configEnv.PORT;
const DB_USER = configEnv.DB_USER;
const DB_PASSWORD = configEnv.DB_PASS;
const DB_NAME = configEnv.DB_NAME;
const DB_CLUSTER = configEnv.DB_CLUSTER;

const URL_MONGO = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

const initializeServer = async () => {
  try {
    await connectDB(URL_MONGO);

    socketServer;

    httpServer.listen(PORT, () => {
      console.log(`[Server]: Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

initializeServer();
