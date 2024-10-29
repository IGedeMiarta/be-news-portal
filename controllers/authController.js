import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/responseUtils.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/tokenUtils.js";

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log({ email, password });
  
  const user = await User.findOne({ where: { email } });
  console.log(user);
  
  if (!user || !(await bcrypt.compare(password, user.password))){
    return errorResponse(res, "Invalid credentials");
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  const token = { accessToken, refreshToken };

 
  return successResponse(res, "Login successful", { token });
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
    return errorResponse(res, "Error While creating user", err);
  }
};


export const refreshToken = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) return errorResponse(res, "Refresh token is required");

  const verifyToken = verifyRefreshToken(refresh_token);
  if (!verifyToken) return errorResponse(res, "Invalid token");

  const accessToken = generateAccessToken(verifyToken);

  return successResponse(res, "Refresh token successful", { accessToken });
  
}