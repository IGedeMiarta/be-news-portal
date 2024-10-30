import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { createNews, getAllNews, getNewsBySlug, getNewsById, updateNewsById, deleteNewsById } from '../controllers/newsController.js';
import { newsValidator } from '../middleware/validators.js'

const protectedRouter = Router();
protectedRouter.use(authenticate);


/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create a new news item
 *     tags:
 *       - News Management
 *     description: Add a new news item to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Event Announcement"
 *                 description: "Title of the news item"
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *                 description: "ID of the category for the news item"
 *               description:
 *                 type: string
 *                 example: "Detailed description of the news content."
 *                 description: "Content or body of the news item"
 *     responses:
 *       201:
 *         description: News item created successfully
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
 *                   example: "News item created successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "New Event Announcement"
 *                     categoryId:
 *                       type: integer
 *                       example: 1
 *                     description:
 *                       type: string
 *                       example: "Detailed description of the news content."
 *       400:
 *         description: Bad request, validation error
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
 *                   example: "Validation error"
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
protectedRouter.post('/', newsValidator, createNews);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Update a news item by ID
 *     tags:
 *       - News Management
 *     description: Update an existing news item by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the news item to be updated
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated News Title"
 *                 description: "Updated title of the news item"
 *               categoryId:
 *                 type: integer
 *                 example: 2
 *                 description: "Updated ID of the category for the news item"
 *               description:
 *                 type: string
 *                 example: "Updated description of the news content."
 *                 description: "Updated content or body of the news item"
 *     responses:
 *       200:
 *         description: News item updated successfully
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
 *                   example: "News item updated successfully"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: "Updated News Title"
 *                     categoryId:
 *                       type: integer
 *                       example: 2
 *                     description:
 *                       type: string
 *                       example: "Updated description of the news content."
 *       400:
 *         description: Bad request, validation error
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
 *                   example: "Validation error"
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
protectedRouter.put('/:id', newsValidator, updateNewsById);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete a news item by ID
 *     tags:
 *       - News Management
 *     description: Delete an existing news item by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the news item to be deleted
 *     responses:
 *       200:
 *         description: News item deleted successfully
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
 *                   example: "News item deleted successfully"
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
protectedRouter.delete('/:id', deleteNewsById);



export default protectedRouter;