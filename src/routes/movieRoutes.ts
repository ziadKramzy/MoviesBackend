import { Router } from 'express';
import {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  getMovieStats
} from '../controllers/movieController';
import { auth } from '../middleware/auth';

const router = Router();

// All movie routes require authentication
router.use(auth);

// GET /api/movies - Get all movies with pagination and search
router.get('/', getMovies);

// GET /api/movies/stats - Get movie statistics
router.get('/stats', getMovieStats);

// GET /api/movies/:id - Get movie by ID
router.get('/:id', getMovieById);

// POST /api/movies - Create new movie
router.post('/', createMovie);

// PUT /api/movies/:id - Update movie
router.put('/:id', updateMovie);

// DELETE /api/movies/:id - Delete movie
router.delete('/:id', deleteMovie);

export { router as movieRoutes }; 