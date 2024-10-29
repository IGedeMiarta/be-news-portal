import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import {createCategory, deleteCategoryById, getAllCategories, getCategoriesById, updateCategoryById} from '../controllers/categoryController.js';
import {categoryValidator} from '../middleware/validators.js';

const protectedRouter = Router();
protectedRouter.use(authenticate); // Apply authentication middleware to this router

protectedRouter.get('/', getAllCategories);
protectedRouter.get('/:id', getCategoriesById);
protectedRouter.post('/',categoryValidator, createCategory);
protectedRouter.put('/:id',categoryValidator, updateCategoryById);
protectedRouter.delete('/:id', deleteCategoryById);



export default protectedRouter;