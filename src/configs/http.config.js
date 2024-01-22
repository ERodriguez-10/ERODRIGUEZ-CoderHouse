/* ========= START IMPORTS SECTION ========= */

import expressApp from "#configs/express.config.js";

import { createServer } from "node:http";

/* ========= END IMPORTS SECTION ========= */

const httpServer = createServer(expressApp);

export default httpServer;
