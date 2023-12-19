import jwt from "jsonwebtoken";
import config from "config";

export function auth(req, res, next) {
  if (!config.get("requiresAuth")) return next();

  const token = (req.header = req.header("x-auth-token"));
  if (!token) return res.status(401).send("Access denied. No token provided.");
  //In middleware functions we either terminate the request reesponse lifecycle(catch)
  //Or pass control to thte next() middleware function
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
}
