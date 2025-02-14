'use client';
import { MovieCredits, movieCreditsSchema } from '@/models/movieCredits';
import { useQuery } from '@tanstack/react-query';

export function useMovieCredits(id: string) {
  return useQuery<MovieCredits>({
    queryKey: ['movie/credits', id],
    queryFn: async () => {
      const res = await fetch(`/api/movies/${id}/credits`);
      const data = await res.json();
      return movieCreditsSchema.parse(data);
    },
    refetchOnWindowFocus: false,
  });
}
