import config from "config";

export function isAdmin(req, res, next) {
  if (!config.get("requiresAuth")) return next();
  //401 Unauthorized (We use it when someone wants to access authorized content without token)
  //403 Forbidden (Someone uses a valid token, but still cannot access(for example: not admin))
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");
  next();
}
