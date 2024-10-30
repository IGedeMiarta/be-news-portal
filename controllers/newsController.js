import slugify from "slugify";
import News from "../models/News.js";
import NewsCategory from "../models/NewsCategory.js";
import { errorResponse, successResponse } from "../utils/responseUtils.js";
import { Op } from "sequelize";

export const getAllNews = async (req, res) => {
  try {
    const news = await News.findAll({ include: NewsCategory });
    return successResponse(res, "Get All News", news);
  } catch (err) {
    return errorResponse(res, "Error while fetching news", err);
  }
};

export const getNewsById = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await News.findByPk(id, { include: NewsCategory });
    if (!news) {
      return errorResponse(res, "News not found", null);
    }
    return successResponse(res, `News by id: ${id}`, news);
  } catch (err) {
    return errorResponse(res, "Error while fetching news", err);
  }
};

export const getNewsBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const news = await News.findOne({ where: { slug } });
    if (!news) {
      return errorResponse(res, "News not found", null);
    }
    return successResponse(res, `News by slug: ${slug}`, news);
  } catch (err) {
    return errorResponse(res, "Error while fetching news", err);
  }
};

export const createNews = async (req, res) => {
  const { title, description, categoryId } = req.body;

  try {
    const news = await News.create({
      title,
      slug: slugify(title, { lower: true }),
      description,
      categoryId,
    });

    return successResponse(res, "News created successfully", news);
  } catch (err) {
    return errorResponse(res, "Error while creating news", err);
  }
};

export const updateNewsById = async (req, res) => {
  const { id } = req.params;
  const { title, description, categoryId } = req.body;
  try {
    const news = await News.findByPk(id);
    if (!news) {
      return errorResponse(res, "News not found", null);
    }
    await news.update({
      title,
      slug: slugify(title, { lower: true }),
      description,
      categoryId,
    });
    return successResponse(res, "News updated successfully", news);
  } catch (err) {
    return errorResponse(res, "Error while updating news", err);
  }
};

export const updateNewsBySlug = async (req, res) => {
  const { slug } = req.params;
  const { title, description, categoryId } = req.body;
  try {
    const news = await News.findOne({ where: { slug } });
    if (!news) {
      return errorResponse(res, "News not found", null);
    }
    await news.update({
      title,
      description,
      categoryId,
    });
    return successResponse(res, "News updated successfully", news);
  } catch (err) {
    return errorResponse(res, "Error while updating news", err);
  }
};

export const deleteNewsById = async (req, res) => {
  const { id } = req.params;
  try {
    const news = await News.findByPk(id);
    if (!news) {
      return errorResponse(res, "News not found", null);
    }
    await news.destroy();
    return successResponse(res, "News deleted successfully", null);
  } catch (err) {
    return errorResponse(res, "Error while deleting news", err);
  }
};

export const deleteNewsBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    const news = await News.findOne({ where: { slug } });
    if (!news) {
      return errorResponse(res, "News not found", null);
    }
    await news.destroy();
    return successResponse(res, "News deleted successfully", null);
  } catch (err) {
    return errorResponse(res, "Error while deleting news", err);
  }
};

export const searchNews = async (req, res) => {
  const { search } = req.params;
  
  try {
    const news = await News.findAll({
      where: {
        title: {
          [Op.like]: `%${search}%`,
        },
      },
    });
    return successResponse(res, `Search results of: ${search}`, news);
  } catch (err) {
    return errorResponse(res, "Error while searching news", err);
  }
};
