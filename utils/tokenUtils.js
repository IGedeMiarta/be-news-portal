import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' }); // Access token expires in 5 minutes
};

export const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' }); // Refresh token expires in 1 days
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};