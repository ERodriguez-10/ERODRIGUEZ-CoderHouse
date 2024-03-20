import winston from "winston";

import { configEnv } from "#configs/env.config.js";

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "cyan",
    error: "red",
    warning: "yellow",
    info: "green",
    http: "white",
    debug: "blue",
  },
};

const devLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
    }),
    new winston.transports.File({
      filename: "logs/dev/combined.log",
      level: "info",
    }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.colorize({ colors: customLevelsOptions.colors }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/dev/exceptions.log" }),
  ],
});

const prodLogger = winston.createLogger({
  levels: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({
      filename: "logs/prod/error.log",
      level: "error",
    }),
    new winston.transports.File({ filename: "logs/prod/combined.log" }),
  ],
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.colorize({ colors: customLevelsOptions.colors }),
    winston.format.printf(
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/prod/exceptions.log" }),
  ],
});

let logger;

if (configEnv.MODE === "dev") {
  logger = devLogger;
} else {
  logger = prodLogger;
}

export default logger;
