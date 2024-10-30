import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/responseUtils.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenUtils.js";
import TokenBlacklist from "../models/TokenBlacklist.js"; // Assuming a model to store invalidated tokens

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return errorResponse(res, "Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Save refresh token in user's record
  user.refreshToken = refreshToken;
  await user.save();

  return successResponse(res, "Login successful", {
    token: { accessToken, refreshToken },
  });
};

export const register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const user = await User.create({
      email,
      password: await bcrypt.hash(password, 10),
      role: role || "user",
    });
    return successResponse(res, "User created successfully", user);
  } catch (err) {
    return errorResponse(res, "Error while creating user", err);
  }
};

export const refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return errorResponse(res, "Refresh token is required");

  const user = await User.findOne({ where: { refreshToken: refreshToken } });
  if (!user) return errorResponse(res, "Invalid token");

  const verifyToken = verifyRefreshToken(refreshToken);
  if (!verifyToken) return errorResponse(res, "Invalid token");

  const accessToken = generateAccessToken(verifyToken);

  return successResponse(res, "Refresh token successful", { accessToken });
};

export const logout = async (req, res) => {
  const accessToken = req.headers["authorization"]?.split(" ")[1];

  if (!accessToken) {
    return errorResponse(res, "Access token is required");
  }

  // Verify and decode the access token to get the user info
  let decoded;
  try {
    decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  } catch (err) {
    return errorResponse(res, "Invalid or expired access token");
  }

  // Blacklist the access token
  await TokenBlacklist.create({
    token: accessToken,
    expires_at: new Date(decoded.exp * 1000),
  });

  // Optionally, also remove the user's refresh token from the database
  const user = await User.findByPk(decoded.id);
  if (user) {
    await user.update({ refreshToken: null });
  }

  return successResponse(res, "Logout successful");
};
