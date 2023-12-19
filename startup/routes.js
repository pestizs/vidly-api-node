import express from "express";
import helmet from "helmet";
import cors from "cors";
import { users } from "../routes/users.js";
import { authenticate } from "../routes/auth.js";
import { genres } from "../routes/genres.js";
import { movies } from "../routes/movies.js";
import { rentals } from "../routes/rentals.js";
import { customers } from "../routes/customers.js";
import { home } from "../routes/home.js";
import { logger } from "../middleware/logger.js";

export default function Routes(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(helmet());

  app.use(cors());

  //Routers
  app.use("/api/users", users);
  app.use("/api/auth", authenticate);
  app.use("/api/genres", genres);
  app.use("/api/movies", movies);
  app.use("/api/rentals", rentals);
  app.use("/api/customers", customers);
  app.use("/", home);

  // Logger middleware as an error handler
  app.use(logger);
}
