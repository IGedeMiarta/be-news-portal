import jwt from "jsonwebtoken";
import {
  forbiddenResponse,
  unauthorizedResponse,
} from "../utils/responseUtils.js";
import User from "../models/User.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) return unauthorizedResponse(res, "Unauthorized"); // Unauthorized

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return forbiddenResponse(res, "Token Expired"); // Forbidden
    const LoginUser = User.findByPk(user.id);
    if (LoginUser.refreshToken === null) return unauthorizedResponse(res, "Unauthorized"); // Unauthorized
    req.user = LoginUser;
    
    next();
  });
};
