import urlJoin from 'proper-url-join';
import { z } from 'zod';

export const movieCastSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string().optional().nullable(),
  popularity: z.number(),
  profile_path: z
    .string()
    .optional()
    .nullable()
    .transform((v) => (v ? urlJoin('https://image.tmdb.org/t/p/w185', v) : undefined)),
  cast_id: z.number(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
});

export const movieCrewSchema = z.object({
  adult: z.boolean(),
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string().optional().nullable(),
  popularity: z.number(),
  profile_path: z
    .string()
    .optional()
    .nullable()
    .transform((v) => (v ? urlJoin('https://image.tmdb.org/t/p/w185', v) : undefined)),
  credit_id: z.string(),
  department: z.string(),
  job: z.string(),
});

export const movieCreditsSchema = z.object({
  id: z.number(),
  cast: z.array(movieCastSchema),
  crew: z.array(movieCrewSchema),
});

export type MovieCast = z.infer<typeof movieCastSchema>;
export type MovieCrew = z.infer<typeof movieCrewSchema>;
export type MovieCredits = z.infer<typeof movieCreditsSchema>;
