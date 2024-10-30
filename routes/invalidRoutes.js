import { Router } from 'express';
import { methodNotAllowedResponse, notFoundResponse } from '../utils/responseUtils.js';

const router = Router();

// Handle 404 errors (route not found)
router.use((req, res, next) => {
    notFoundResponse(res, "Route not found");
});

// Handle 405 errors (method not allowed)
router.use((err, req, res, next) => {
  if (err.status === 405) {
    return methodNotAllowedResponse(res, "Method not allowed");
  } else {
    next(err);
  }
});


export default router;
