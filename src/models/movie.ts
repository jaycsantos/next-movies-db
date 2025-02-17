import urlJoin from 'proper-url-join';
import { z } from 'zod';

export const movieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z
    .string()
    .optional()
    .nullable()
    .transform((v) => (v ? urlJoin('https://image.tmdb.org/t/p/w1280', v) : undefined)),
  belongs_to_collection: z
    .object({
      id: z.number(),
      name: z.string(),
      poster_path: z.string().optional().nullable(),
      backdrop_path: z.string().optional().nullable(),
    })
    .optional()
    .nullable(),
  budget: z.number().optional().nullable(),
  genre_ids: z.array(z.number()).optional().nullable(),
  genres: z
    .array(z.object({ id: z.number(), name: z.string() }))
    .optional()
    .nullable(),
  homepage: z.string().optional().nullable(),
  id: z.number(),
  imdb_id: z.string().optional().nullable(),
  origin_country: z.array(z.string()).optional().nullable(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number().optional().nullable(),
  poster_path: z
    .string()
    .optional()
    .nullable()
    .transform((v) => (v ? urlJoin('https://image.tmdb.org/t/p/w342', v) : undefined)),
  production_companies: z
    .array(
      z.object({
        id: z.number(),
        logo_path: z.string().optional().nullable(),
        name: z.string(),
        origin_country: z.string(),
      }),
    )
    .optional()
    .nullable(),
  production_countries: z
    .array(
      z.object({
        iso_3166_1: z.string(),
        name: z.string(),
      }),
    )
    .optional()
    .nullable(),
  release_date: z.string().optional().nullable(),
  revenue: z.number().optional().nullable(),
  runtime: z.number().optional().nullable(),
  spoken_languages: z
    .array(
      z.object({
        english_name: z.string(),
        iso_639_1: z.string(),
        name: z.string(),
      }),
    )
    .optional()
    .nullable(),
  status: z.string().optional().nullable(),
  tagline: z.string().optional().nullable(),
  title: z.string(),
  video: z.boolean().optional().nullable(),
  vote_average: z.number().optional().nullable(),
  vote_count: z.number().optional().nullable(),
});

export type Movie = z.infer<typeof movieSchema>;

export const movieListSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
  total_results: z.number(),
  results: z.array(movieSchema),
});

export type MoviesResult = z.infer<typeof movieListSchema>;
