import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// verify with jwt and token
export const verifyUserToken = (req, res, next) => {
  // get token
  const token = req.cookies.access_token;
  // confirm if token is valid
  if (!token) return next(errorHandler(401, "Your are not authenticated."));
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(401, "Token not valid!"));
    req.user = user;
    next();
  });
};
