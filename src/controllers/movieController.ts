import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { 
  createMovieSchema, 
  updateMovieSchema, 
  movieIdSchema, 
  paginationSchema,
  CreateMovieInput,
  UpdateMovieInput,
  PaginationInput
} from '../schemas/movieSchema';

export const createMovie = async (req: Request, res: Response) => {
  try {
    const validatedData = createMovieSchema.parse(req.body);
    
    const movie = await prisma.movie.create({
      data: {
        ...validatedData,
        userId: req.user!.id // Connect movie to authenticated user
      }
    });

    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (error) {
    throw error;
  }
};

export const getMovies = async (req: Request, res: Response) => {
  try {
    const { page, limit, search, type }: PaginationInput = paginationSchema.parse(req.query);
    
    const skip = (page - 1) * limit;
    
    // Build where clause - only show user's own movies
    const where: any = {
      userId: req.user!.id // Only show movies for authenticated user
    };
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { director: { contains: search } },
        { location: { contains: search } }
      ];
    }
    
    if (type) {
      where.type = type;
    }

    const [movies, total] = await Promise.all([
      prisma.movie.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.movie.count({ where })
    ]);

    const totalPages = Math.ceil(total / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    res.json({
      success: true,
      data: movies,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage,
        hasPrevPage
      }
    });
  } catch (error) {
    throw error;
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const { id } = movieIdSchema.parse(req.params);
    
    const movie = await prisma.movie.findFirst({
      where: { 
        id,
        userId: req.user!.id // Only allow access to user's own movies
      }
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }

    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    throw error;
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = movieIdSchema.parse(req.params);
    const validatedData = updateMovieSchema.parse(req.body);
    
    // Check if movie belongs to user
    const existingMovie = await prisma.movie.findFirst({
      where: { 
        id,
        userId: req.user!.id
      }
    });

    if (!existingMovie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }
    
    const movie = await prisma.movie.update({
      where: { id },
      data: validatedData
    });

    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    throw error;
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = movieIdSchema.parse(req.params);
    
    // Check if movie belongs to user
    const existingMovie = await prisma.movie.findFirst({
      where: { 
        id,
        userId: req.user!.id
      }
    });

    if (!existingMovie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }
    
    await prisma.movie.delete({
      where: { id }
    });

    res.json({
      success: true,
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    throw error;
  }
};

export const getMovieStats = async (req: Request, res: Response) => {
  try {
    const [totalMovies, totalTVShows, totalBudget, avgBudget] = await Promise.all([
      prisma.movie.count({ where: { type: 'Movie', userId: req.user!.id } }),
      prisma.movie.count({ where: { type: 'TV Show', userId: req.user!.id } }),
      prisma.movie.aggregate({
        where: { userId: req.user!.id },
        _sum: { budget: true }
      }),
      prisma.movie.aggregate({
        where: { userId: req.user!.id },
        _avg: { budget: true }
      })
    ]);

    res.json({
      success: true,
      data: {
        totalMovies,
        totalTVShows,
        totalBudget: totalBudget._sum.budget || 0,
        avgBudget: avgBudget._avg.budget || 0
      }
    });
  } catch (error) {
    throw error;
  }
}; 