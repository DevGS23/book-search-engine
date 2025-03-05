import express from 'express';
import userRoutes from './user-routes.js'; // Ensure .js extension is included
const router = express.Router();
// Define API routes
router.use('/users', userRoutes);
export default router;
