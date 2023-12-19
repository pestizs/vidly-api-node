import bcrypt from "bcrypt";
import Joi from "joi";
import passComplexity from "joi-password-complexity";
import { User } from "../models/user.js";
import express from "express";
const router = express.Router();

//POST request
router.post("/", async (req, res) => {
  const { error } = validateAuth(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  //Making Json Web Tokens
  const token = user.generateAuthToken();

  res.send(token);
});

function validateAuth(req) {
  const complexityOptions = {
    min: 6,
    max: 20,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 6,
  };
  const joiSchema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: passComplexity(complexityOptions),
  });
  return joiSchema.validate(req);
}

export { router as authenticate };
