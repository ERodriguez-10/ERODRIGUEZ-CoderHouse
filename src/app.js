import { configEnv } from "#configs/env.config.js";

import httpServer from "#configs/server/http.config.js";
import socketServer from "#configs/server/socket.config.js";
import tests from "../tests/index.js";

const PORT = configEnv.PORT;

const initializeServer = async () => {
  try {
    socketServer;

    httpServer.listen(PORT, () => {
      console.log(`[Server]: Server is running on port ${PORT}`);

      if (configEnv.TESTS === true) {
        tests();
      }
    });
  } catch (error) {
    console.log(error);
  }
};

initializeServer();
