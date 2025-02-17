'use client';
import { MovieCard } from '@/components/movies/MovieCard';
import { MovieCardPlaceholder } from '@/components/movies/MovieCardPlaceholder';
import { Search } from '@/components/ui/search';
import { useSearchMovies } from '@/hooks/useSearchMovies';
import { Fragment, use, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string>>;
}) {
  const { q } = use(searchParams);
  const { data, isPending, error, fetchNextPage, hasNextPage } = useSearchMovies(q);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (hasNextPage && inView && !isPending) {
      fetchNextPage();
    }
  }, [hasNextPage, fetchNextPage, inView, isPending]);

  return (
    <div className="container mx-auto flex flex-col justify-start lg:flex-row">
      <div className="p-4 lg:basis-1/3">
        <div className="sticky top-15 flex flex-col gap-4 py-4">
          <h2 className="text-primary text-3xl font-bold">
            Search &quot;
            <em
              className="text-foreground inline-block max-w-80 truncate align-bottom font-medium"
              title={q}
            >
              {q}
            </em>
            &quot;
          </h2>

          <Search
            placeholder="search"
            className="text-md lg:text-md w-full"
            autoFocus={true}
            initialValue={q}
          />

          {!isPending && (
            <p className="text-md truncate text-center">
              {data?.pages[0]?.total_results || 'No'} results
            </p>
          )}

          {error && (
            <div className="text-center">
              <b className="text-destructive">Something went wrong</b>
              <p>Refresh the page or try again later.</p>
            </div>
          )}
        </div>
      </div>
      <div className="flex h-full w-full flex-1 basis-2/3 px-2 py-4">
        <div className="relative flex w-full flex-col gap-4 lg:mx-8">
          {data?.pages.map((data) => (
            <Fragment key={data.page}>
              {data.results.map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
            </Fragment>
          ))}
          {(isPending || hasNextPage) && (
            <>
              <MovieCardPlaceholder ref={ref} />
              <MovieCardPlaceholder />
              <MovieCardPlaceholder />
            </>
          )}
          {!isPending && !hasNextPage && <hr />}
        </div>
      </div>
    </div>
  );
}
