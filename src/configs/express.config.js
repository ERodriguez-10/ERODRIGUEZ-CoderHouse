/* ========= START IMPORTS SECTION ========= */

import cartRouter from "#routes/carts.routes.js";
import messageRouter from "#routes/messages.routes.js";
import productRouter from "#routes/products.routes.js";
import viewRouter from "#routes/view.routes.js";
import sessionRouter from "#routes/sessions.routes.js";
import authRouter from "#routes/auth.routes.js";

import __dirname from "../utils.js";

import express from "express";
import handlebars from "express-handlebars";

/* ========= END IMPORTS SECTION ========= */

const expressApp = express();

expressApp.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});

expressApp.use(express.json());
expressApp.use(express.urlencoded({ extended: true }));

expressApp.use("/", viewRouter);
expressApp.use("/auth", authRouter);
expressApp.use("/api/carts", cartRouter);
expressApp.use("/api/messages", messageRouter);
expressApp.use("/api/sessions", sessionRouter);
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
