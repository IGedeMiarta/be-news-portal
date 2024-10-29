import { Router } from 'express';
import { login, refreshToken, register } from '../controllers/authController.js';
import { loginValidator, refreshTokenValidator, registerValidator } from '../middleware/validators.js';

const router = Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.post('/refresh-token', refreshTokenValidator, refreshToken);

export default router;
