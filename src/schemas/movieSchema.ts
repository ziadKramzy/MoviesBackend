import { z } from 'zod';

export const createMovieSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title too long'),
  type: z.enum(['Movie', 'TV Show'], {
    errorMap: () => ({ message: 'Type must be either Movie or TV Show' })
  }),
  director: z.string().min(1, 'Director is required').max(255, 'Director name too long'),
  budget: z.number().positive('Budget must be positive'),
  location: z.string().min(1, 'Location is required').max(255, 'Location too long'),
  duration: z.number().int().positive('Duration must be a positive integer'),
  year: z.number().int().min(1900, 'Year must be at least 1900').max(new Date().getFullYear() + 10, 'Year cannot be in the future'),
  description: z.string().optional(),
  image: z.string().optional()
});

export const updateMovieSchema = createMovieSchema.partial();

export const movieIdSchema = z.object({
  id: z.string().min(1, 'Movie ID is required')
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  search: z.string().optional(),
  type: z.enum(['Movie', 'TV Show']).optional()
});

export type CreateMovieInput = z.infer<typeof createMovieSchema>;
export type UpdateMovieInput = z.infer<typeof updateMovieSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>; 