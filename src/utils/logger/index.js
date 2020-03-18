const winston = require("winston")
const config = require("config")

const FILE_LEVEL = config.has("logger.file.level")
    ? config.get("logger.file.level")
    : "info";

const FILE_NAME = config.has("logger.file.path")
    ? config.get("logger.file.path")
    : "/tmp/musii-user-microservice.log";

const CONSOLE_LEVEL = config.has("logger.console.level")
    ? config.get("logger.console.level")
    : "info";

const transports = [
    new winston.transports.File({
        level: FILE_LEVEL,
        filename: FILE_NAME,
        handleExceptions: true,
        format: winston.format.json(),
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
    }),
    new winston.transports.Console({
        level: CONSOLE_LEVEL,
        handleExceptions: true,
        format:
            process.env.NODE_ENV === "production"
                ? winston.format.combine(winston.format.simple())
                : winston.format.combine(
                      winston.format.colorize(),
                      winston.format.simple()
                  )
    })
];

const logger = new winston.createLogger({
    transports,
    exitOnError: false
})

module.exports = logger