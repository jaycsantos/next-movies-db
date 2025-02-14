'use client';
import { Movie, movieSchema } from '@/models/movie';
import { useQuery } from '@tanstack/react-query';

export function useMovie(id: string) {
  return useQuery<Movie>({
    queryKey: ['movie', id],
    queryFn: async () => {
      const res = await fetch(`/api/movies/${id}`);
      const data = await res.json();
      return movieSchema.parse(data);
    },
    refetchOnWindowFocus: false,
  });
}
