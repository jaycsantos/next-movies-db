'use client';
import { movieListSchema } from '@/models/movie';
import { useQuery } from '@tanstack/react-query';

export default function useUpComingMovies() {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ['upcoming'],
    queryFn: () =>
      fetch('/api/movies/upcoming')
        .then((res) => res.json())
        .then((data) => movieListSchema.parse(data)),
    refetchOnWindowFocus: false,
  });

  return { data, isPending, error, refetch };
}
