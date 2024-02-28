import { configEnv } from "#configs/env.config.js";

import errorMiddleware from "../../middlewares/error.middleware.js";

import cartRouter from "#routes/carts.routes.js";
import messageRouter from "#routes/messages.routes.js";
import productRouter from "#routes/products.routes.js";
import viewRouter from "#routes/view.routes.js";
import authRouter from "#routes/auth.routes.js";
import mockRouter from "#routes/mock.routes.js";

import __dirname from "../../utils.js";

import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import cors from "cors";

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

//expressApp.use(errorMiddleware);

expressApp.use("/", viewRouter);
expressApp.use("/api/", mockRouter);
expressApp.use("/api/auth", authRouter);
expressApp.use("/api/carts", cartRouter);
expressApp.use("/api/messages", messageRouter);
expressApp.use("/api/products", productRouter);

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
