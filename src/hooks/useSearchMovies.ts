'use client';
import { movieListSchema, MoviesResult } from '@/models/movie';
import {
  DefaultError,
  InfiniteData,
  keepPreviousData,
  QueryKey,
  useInfiniteQuery,
} from '@tanstack/react-query';

export function useSearchMovies(q: string) {
  const infQuery = useInfiniteQuery<
    MoviesResult,
    DefaultError,
    InfiniteData<MoviesResult>,
    QueryKey,
    number
  >({
    queryKey: ['search', q],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const query = new URLSearchParams({ q, page: pageParam.toString() });
      const res = await fetch(`/api/movies/search?${query}`);
      const data = await res.json();
      try {
        return movieListSchema.parse(data);
      } catch (e) {
        console.error(e);
        throw e;
      }
    },
    refetchOnWindowFocus: false,
    initialPageParam: 1,
    placeholderData: keepPreviousData,
    getNextPageParam: (result) => (result.page < result.total_pages ? result.page + 1 : null),
  });

  return infQuery;
}
