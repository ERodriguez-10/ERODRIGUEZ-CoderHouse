import expressApp from "#configs/server/express.config.js";

import { createServer } from "node:http";

const httpServer = createServer(expressApp);

export default httpServer;
