'use client';
import useUpComingMovies from '@/hooks/useUpComingMovies';
import { MoviePosterCard } from './MoviePosterCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../ui/carousel';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import Link from 'next/link';

export function UpComingMovies({ className }: { className?: string }) {
  const { data, isPending, error, refetch } = useUpComingMovies();

  return (
    <div className={cn('flex w-full flex-col justify-end gap-4 px-10', className)}>
      <h2 className="text-xl">Upcoming Movies</h2>
      <Carousel
        className="relative w-full"
        opts={{
          align: 'start',
          loop: true,
        }}
        aria-disabled={isPending}
      >
        {error && (
          <div className="bg-background/80 absolute top-0 right-0 bottom-0 left-0 z-10 grid place-items-center">
            <p className="text-destructive flex flex-col gap-2 text-center">
              Something went wrong
              <br />
              <Button onClick={() => refetch()} variant={'secondary'}>
                Retry
              </Button>
            </p>
          </div>
        )}
        <CarouselContent className="*:sm:basis-1/3 *:md:basis-1/4 *:lg:basis-1/5 *:xl:basis-1/7">
          {isPending
            ? Array.from({ length: 7 })
                .map(() => null)
                .map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="bg-muted h-[240px] w-[160px]" />
                  </CarouselItem>
                ))
            : data?.results.map((movie, index) => (
                <CarouselItem key={movie?.id ?? index}>
                  {
                    <Link href={`/movies/${movie.id}`} title={movie.title}>
                      <MoviePosterCard movie={movie} width={160} height={240} className="mx-auto" />
                    </Link>
                  }
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious disabled={isPending} />
        <CarouselNext disabled={isPending} />
      </Carousel>
    </div>
  );
}
