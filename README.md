This is a [Next.js](https://nextjs.org) project.

## Getting Started

### Set the [TMDB](https://developer.themoviedb.org/docs) API Key

Rename `.env.example` to `.env.local` and replace with your api token.

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Using Custom Hooks

### `useUpComingMovies`

Fetches the list of upcoming movies.

**Usage:**

```typescript
import useUpComingMovies from '@/hooks/useUpComingMovies';

const { data, isPending, error, refetch } = useUpComingMovies();
```

### `useSearchMovies`

Searches for movies based on a query.

**Parameters:**

- `q` (string): The search query.

**Usage:**

```typescript
import { useSearchMovies } from '@/hooks/useSearchMovies';

const { data, isPending, error, fetchNextPage } = useSearchMovies('search query');
```

### `useMovie`

Fetches details of a specific movie by ID.

**Parameters:**

- `id` (string): The ID of the movie.

**Usage:**

```typescript
import { useMovie } from '@/hooks/useMovie';

const { data, isPending, error } = useMovie('movieId');
```

### `useMovieCredits`

Fetches the credits (cast and crew) of a specific movie by ID.

**Parameters:**

- `id` (string): The ID of the movie.

**Usage:**

```typescript
import { useMovieCredits } from '@/hooks/useMovieCredits';

const { data, isPending, error } = useMovieCredits('movieId');
```

## API Documentation

### Upcoming Movies

**Endpoint:** `/api/movies/upcoming`

**Method:** `GET`

**Parameters:** None

**Response:**

```json
{
  "results": [
    {
      "id": 123,
      "title": "Movie Title",
      "release_date": "2023-12-01"
      // ...other movie details...
    }
    // ...more movies...
  ]
}
```

### Search Movies

**Endpoint:** `/api/movies/search`

**Method:** `GET`

**Parameters:**

- `q` (string): The search query.
- `page` (number, optional): The page number (default is 1).

**Response:**

```json
{
  "results": [
    {
      "id": 123,
      "title": "Movie Title",
      "release_date": "2023-12-01"
      // ...other movie details...
    }
    // ...more movies...
  ]
}
```

### Movie Details

**Endpoint:** `/api/movies/[id]`

**Method:** `GET`

**Parameters:**

- `id` (number): The ID of the movie.

**Response:**

```json
{
  "id": 123,
  "title": "Movie Title",
  "release_date": "2023-12-01"
  // ...other movie details...
}
```

### Movie Credits

**Endpoint:** `/api/movies/[id]/credits`

**Method:** `GET`

**Parameters:**

- `id` (number): The ID of the movie.

**Response:**

```json
{
  "id": 123,
  "cast": [
    {
      "id": 456,
      "name": "Actor Name",
      "character": "Character Name"
      // ...other cast details...
    }
    // ...more cast members...
  ],
  "crew": [
    {
      "id": 789,
      "name": "Crew Member Name",
      "job": "Job Title"
      // ...other crew details...
    }
    // ...more crew members...
  ]
}
```
