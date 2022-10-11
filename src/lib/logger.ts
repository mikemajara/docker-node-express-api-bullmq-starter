import winston, { format, transports } from "winston";
const { combine, timestamp, printf, prettyPrint } = format;

// Remember to set environment variables in .env
// not sure why .env.local is not working

const myFormat = printf(({ level, message, timestamp }) => {
  return `[${level}] ${timestamp}: ${message}`;
});

const logger = winston.createLogger({
  level: "debug",
  format: combine(winston.format.colorize(), timestamp(), myFormat),
  // defaultMeta: { service: "user-service" },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
// if (process.env.NODE_ENV !== "production" || true) {
//   logger.info(`NODE_ENV: ${process.env.NODE_ENV}`);
//   logger.add(
//     new winston.transports.Console({
//       format: combine(winston.format.simple(), timestamp()),
//     })
//   );
// }

// logger.error("error");
// logger.warn("warn");
// logger.info("info");
// logger.debug("debug");
// logger.silly("silly");

export { logger };
