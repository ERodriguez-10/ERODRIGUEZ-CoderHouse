import { configEnv } from "#configs/env.config.js";

import { loggerMiddleware } from "#middlewares/loggerMiddleware.js";

import cartRouter from "#routes/carts.routes.js";
import messageRouter from "#routes/messages.routes.js";
import productRouter from "#routes/products.routes.js";
import viewRouter from "#routes/view.routes.js";
import authRouter from "#routes/auth.routes.js";
import mockRouter from "#routes/mock.routes.js";

import __dirname from "../../utils.js";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import handlebars from "express-handlebars";
import compression from "express-compression";

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../../docs/swaggerSpecs.js";

const expressApp = express();

const corsOptions = {
  origin: "http://127.0.0.1:8080",
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  allowedHeaders:
    "Content-Type, Authorization, X-Request-With, Accept, Origin, Access-Control-Allow-Headers",
  credentials: true,
};

expressApp.use(cors(corsOptions));

expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

expressApp.use(cookieParser(configEnv.COOKIE_SECRET));

expressApp.use(loggerMiddleware);

expressApp.use(
  compression({
    brotli: {
      enabled: true,
      zlib: {},
    },
  })
);

expressApp.use("/", viewRouter);
expressApp.use("/api/v1/", mockRouter);
expressApp.use("/api/v1/auth", authRouter);
expressApp.use("/api/v1/cart", cartRouter);
expressApp.use("/api/v1/chat", messageRouter);
expressApp.use("/api/v1/product", productRouter);

expressApp.use(
  "/api/v1/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: {
      operationsSorter: "method",
    },
  })
);

expressApp.engine(
  "handlebars",
  handlebars.engine({
    extname: "handlebars",
    defaultLayout: "main",
  })
);

expressApp.set("view engine", "handlebars");
expressApp.set("views", `${__dirname}/views`);
expressApp.use(express.static(__dirname + "/public"));

export default expressApp;
