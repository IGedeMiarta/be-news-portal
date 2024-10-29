import jwt from "jsonwebtoken";
import {
  forbiddenResponse,
  unauthorizedResponse,
} from "../utils/responseUtils.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Get token from "Bearer TOKEN" format

  if (!token) return unauthorizedResponse(res, "Unauthorized"); // Unauthorized

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return forbiddenResponse(res, "Token Expired"); // Forbidden
    req.user = user; // Save user info to request
    next();
  });
};
