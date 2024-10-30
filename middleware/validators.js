import { check, validationResult } from "express-validator";
import { errorResponse } from "../utils/responseUtils.js";
import User from "../models/User.js";
import NewsCategory from "../models/NewsCategory.js";


export const registerValidator = [
  check("email")
    // unique email validation can be done here
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) {
        throw new Error("Email already exists");
      }
      return true;
    })
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),

  check("password_confirmation")
    .notEmpty()
    .withMessage("Password confirmation is required")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password confirmation does not match password");
      }
      return true;
    }),
  check("role").optional().isIn(["admin", "user"]).withMessage("Invalid role"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, "Validation error", errors.array());
    }
    next();
  },
];

export const loginValidator = [
  check("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .notEmpty()
    .withMessage("Email is required"),
  check("password").notEmpty().withMessage("Password is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, "Validation error", errors.array());
    }
    next();
  },
];

export const refreshTokenValidator = [
  check("refresh_token").notEmpty().withMessage("Refresh token is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, "Validation error", errors.array());
    }
    next();
  },
];

export const categoryValidator = [
  check("name").notEmpty().withMessage("Name is required"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, "Validation error", errors.array());
    }
    next();
  },
];

export const newsValidator = [
  check("title").notEmpty().withMessage("Title is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("categoryId")
    .notEmpty()
    .withMessage("Category ID is required")
    .custom(async (value) => {
      const category = await NewsCategory.findByPk(value);
      if (!category) {
        console.log(category);
        
        throw new Error("Category ID does not exist");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errorResponse(res, "Validation error", errors.array());
    }
    next();
  },
];
