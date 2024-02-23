import program from "#utils/process.js";

import dotenv from "dotenv";

let enviroment = program.opts().mode;

dotenv.config({
  path: enviroment === "prod" ? "./.env.production" : "./.env.development",
});

export const configEnv = {
  PERSISTANCE: program.opts().persist,
  URL: process.env.URL,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  DB_USER: process.env.DB_USER,
  DB_PASS: process.env.DB_PASS,
  DB_NAME: process.env.DB_NAME,
  DB_CLUSTER: process.env.DB_CLUSTER,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_SECRET: process.env.GITHUB_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_SECRET: process.env.GOOGLE_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  MAIL_USER: process.env.MAIL_USER,
  MAIL_PASSWORD: process.env.MAIL_PASSWORD,
};
