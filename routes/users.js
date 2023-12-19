import _ from "lodash";
import bcrypt from "bcrypt";
import { User, validateUser } from "../models/user.js";
import { auth } from "../middleware/auth.js";
import express from "express";
const router = express.Router();

/* //GET request
router.get('/', async (req, res) => {
    const users = await User.find().sort('title');
    res.send(users);
}); */

//GET request
//With authorization middleware
router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  res.send(user);
});

//POST request
router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(404).send("User with this email already exist!");

  //using lodash to pick elements from req. body
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  //using bcrypt to hash passwords
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  //Making a Json Web Token
  const token = user.generateAuthToken();
  //setting response headers
  //using lodash to pick elements from an objects, in this case user
  //and its returning a new object with the picked elements in it
  res
    .header("x-auth-token", token)
    .header("Access-Control-Allow-Origin", "*")
    .header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, x-auth-token"
    )
    .header("Access-Control-Expose-Headers", "x-auth-token")
    .send(_.pick(user, ["_id", "name", "email"]));
});

export { router as users };
