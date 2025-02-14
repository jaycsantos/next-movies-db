import urlJoin from 'url-join';
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

// {
//   "adult": false,
//   "backdrop_path": "/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
//   "belongs_to_collection": {
//     "id": 77816,
//     "name": "Kung Fu Panda Collection",
//     "poster_path": "/xoYc0RYKSc3xC4S9OpPZxKocKtj.jpg",
//     "backdrop_path": "/2nbtv33hEk2CTnuMhTGZgsFdi3K.jpg"
//   },
//   "budget": 80000000,
//   "genres": [
//     {
//       "id": 16,
//       "name": "Animation"
//     },
//     {
//       "id": 10751,
//       "name": "Family"
//     },
//     {
//       "id": 28,
//       "name": "Action"
//     },
//     {
//       "id": 35,
//       "name": "Comedy"
//     }
//   ],
//   "homepage": "https://www.dreamworks.com/movies/kung-fu-panda-4",
//   "id": 1011985,
//   "imdb_id": "tt21692408",
//   "origin_country": [
//     "US"
//   ],
//   "original_language": "en",
//   "original_title": "Kung Fu Panda 4",
//   "overview": "Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.",
//   "popularity": 191.133,
//   "poster_path": "/nqXsAaQsKw2gKpkfhIgjXNDRqg7.jpg",
//   "production_companies": [
//     {
//       "id": 521,
//       "logo_path": "/3BPX5VGBov8SDqTV7wC1L1xShAS.png",
//       "name": "DreamWorks Animation",
//       "origin_country": "US"
//     }
//   ],
//   "production_countries": [
//     {
//       "iso_3166_1": "US",
//       "name": "United States of America"
//     }
//   ],
//   "release_date": "2024-03-02",
//   "revenue": 548040835,
//   "runtime": 94,
//   "spoken_languages": [
//     {
//       "english_name": "English",
//       "iso_639_1": "en",
//       "name": "English"
//     }
//   ],
//   "status": "Released",
//   "tagline": "",
//   "title": "Kung Fu Panda 4",
//   "video": false,
//   "vote_average": 7.081,
//   "vote_count": 2949
// }
