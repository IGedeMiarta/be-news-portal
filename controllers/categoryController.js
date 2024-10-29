import NewsCategory from "../models/NewsCategory.js";
import { errorResponse, successResponse } from "../utils/responseUtils.js";

export const getAllCategories = async (req, res) => {
  try {
    const categories = await NewsCategory.findAll();
    return successResponse(res, "Get All Categories", categories);
  } catch (err) {
    return errorResponse(res, "Error while fetching categories", err);
  }
};

export const getCategoriesById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await NewsCategory.findByPk(id);
    if (!category) {
      return errorResponse(res, "Category not found", null);
    }
    return successResponse(res, `Category by id: ${id}`, category);
  } catch (err) {
    return errorResponse(res, "Error while fetching category", err);
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await NewsCategory.create({ name });
    return successResponse(res, "Category created successfully", category);
  } catch (err) {
    return errorResponse(res, "Error while creating category", err);
  }
};

export const updateCategoryById = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await NewsCategory.findByPk(id);
    if (!category) {
      return errorResponse(res, "Category not found", null);
    }
    await category.update({ name });
    return successResponse(res, "Category updated successfully", category);
  } catch (err) {
    return errorResponse(res, "Error while updating category", err);
  }
};

export const deleteCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await NewsCategory.findByPk(id);
    if (!category) {
      return errorResponse(res, "Category not found", null);
    }
    await category.destroy();
    return successResponse(res, "Category deleted successfully", null);
  } catch (err) {
    return errorResponse(res, "Error while deleting category", err);
  }
};
