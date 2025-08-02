import { Router } from 'express';
import { signup, signin, getProfile } from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = Router();

// POST /api/auth/signup - Register new user
router.post('/signup', signup);

// POST /api/auth/signin - Login user
router.post('/signin', signin);

// GET /api/auth/profile - Get user profile (protected)
router.get('/profile', auth, getProfile);

export { router as authRoutes }; 