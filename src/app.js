import "#configs/env.config.js";

import connectDB from "#configs/db/db.config.js";
import httpServer from "#configs/server/http.config.js";
import socketServer from "#configs/server/socket.config.js";

const PORT = process.env.PORT || 8080;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const DB_CLUSTER = process.env.DB_CLUSTER;

const URL_MONGO = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

const initializeServer = async () => {
  try {
    await connectDB(URL_MONGO);

    socketServer.attach(httpServer);

    httpServer.listen(PORT, () => {
      console.log(`[Server]: Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

initializeServer();
