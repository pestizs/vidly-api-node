import express from "express";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router.get("/", auth, (req, res) => {
  res.render("index", { title: "My Vidly App", message: "Welcome to Vidly!" });
});

export { router as home };
