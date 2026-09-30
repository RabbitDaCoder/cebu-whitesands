const winston = require("winston");

const isProd = process.env.NODE_ENV === "production";

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    isProd
      ? winston.format.json()
      : winston.format.combine(winston.format.colorize(), winston.format.simple()),
  ),
  defaultMeta: {
    service: process.env.PROJECT_ID || "cebu-whitesand-resort-api",
  },
  transports: [new winston.transports.Console()],
});

module.exports = logger;
