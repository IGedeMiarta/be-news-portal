import { Router } from 'express';

import { getAllNews, getNewsById, getNewsBySlug, searchNews } from '../controllers/newsController.js';

export const router = Router();
/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get all news
 *     tags:
 *       - News
 *     description: Fetch all news items from the database
 *     responses:
 *       200:
 *         description: A list of news items
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 message:
 *                   type: string
 *                   example: "News fetched successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Breaking News Title"
 *                       content:
 *                         type: string
 *                         example: "Content of the breaking news..."
 *                       published_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T12:00:00Z"
 *                       author:
 *                         type: string
 *                         example: "Author Name"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/', getAllNews);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get news item by ID
 *     tags:
 *       - News
 *     description: Retrieve a single news item by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the news item to retrieve
 *     responses:
 *       200:
 *         description: A news item object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "News Title"
 *                     categoryId:
 *                       type: integer
 *                       example: 2
 *                     description:
 *                       type: string
 *                       example: "Detailed description of the news."
 *       404:
 *         description: News item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "News item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */

router.get('/:id', getNewsById);

/**
 * @swagger
 * /news/find/{slug}:
 *   get:
 *     summary: Get news item by slug
 *     tags:
 *       - News
 *     description: Retrieve a single news item by its slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the news item to retrieve
 *     responses:
 *       200:
 *         description: A news item object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "News Title"
 *                     categoryId:
 *                       type: integer
 *                       example: 2
 *                     description:
 *                       type: string
 *                       example: "Detailed description of the news."
 *       404:
 *         description: News item not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "News item not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/find/:slug', getNewsBySlug);

/**
 * @swagger
 * /news/search/{search}:
 *   get:
 *     summary: Search news items
 *     tags:
 *       - News
 *     description: Search for news items by a keyword
 *     parameters:
 *       - in: path
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: Keyword to search for in news titles or descriptions
 *     responses:
 *       200:
 *         description: A list of news items that match the search criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "success"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "News Title"
 *                       categoryId:
 *                         type: integer
 *                         example: 2
 *                       description:
 *                         type: string
 *                         example: "Detailed description of the news."
 *       404:
 *         description: No news items found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "No news items found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "error"
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
router.get('/search/:search',searchNews);

export default router;