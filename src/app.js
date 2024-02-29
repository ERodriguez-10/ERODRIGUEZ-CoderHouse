import { configEnv } from "#configs/env.config.js";

import httpServer from "#configs/server/http.config.js";
import socketServer from "#configs/server/socket.config.js";
import tests from "../tests/index.js";
import logger from "#utils/logger.js";

const PORT = configEnv.PORT;

const initializeServer = async () => {
  try {
    socketServer;

    httpServer.listen(PORT, () => {
      logger.info(`[Server] - Server is running on port ${PORT}`);

      if (configEnv.TESTS === true) {
        tests();
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

initializeServer();
