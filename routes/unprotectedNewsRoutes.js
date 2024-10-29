import { Router } from 'express';

import { getAllNews, getNewsById, getNewsBySlug } from '../controllers/newsController.js';

export const router = Router();

router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.get('/find/:slug', getNewsBySlug);

export default router;