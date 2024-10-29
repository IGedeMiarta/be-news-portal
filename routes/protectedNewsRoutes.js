import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { createNews, getAllNews, getNewsBySlug, getNewsById, updateNewsById, deleteNewsById } from '../controllers/newsController.js';
import { newsValidator } from '../middleware/validators.js'

const protectedRouter = Router();
protectedRouter.use(authenticate);



protectedRouter.post('/',newsValidator, createNews);
protectedRouter.put('/:id',newsValidator, updateNewsById);
protectedRouter.delete('/:id', deleteNewsById);



export default protectedRouter;