import { configEnv } from "#configs/env.config.js";

import httpServer from "#configs/server/http.config.js";
import socketServer from "#configs/server/socket.config.js";

const PORT = configEnv.PORT;

const initializeServer = async () => {
  try {
    socketServer;

    httpServer.listen(PORT, () => {
      console.log(`[Server]: Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

initializeServer();
