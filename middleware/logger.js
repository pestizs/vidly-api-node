import winston from "winston";
import winstonMongoDB from "winston-mongodb";

//Logging errors in console, and seperate file for routes
const log = winston.createLogger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logfile.log" }),
    new winstonMongoDB.MongoDB({
      db: "mongodb://127.0.0.1/genres-project",
      options: { useNewUrlParser: true, useUnifiedTopology: true },
      collection: "logs",
      //level: "error", // Log only errors to MongoDB
    }),
  ],
});

export function logger(err, req, res, next) {
  //error, warn, info, verbose, debug, silly
  log.error(err.mesage, err);
  res.status(500).send("Something failed.");
}

//cant solve the problem: not logging errors in seperate file
export function handleExceptions() {
  process.on("unhandledRejection", (ex) => {
    log.error("Unhandled Rejection:", ex);
  });
}
