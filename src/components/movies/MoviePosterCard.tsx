import Image from 'next/image';
import { Movie } from '@/models/movie';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

export function MoviePosterCard({
  movie,
  width = 200,
  height = 300,
  className,
}: {
  movie: Movie | undefined | null;
  width: number;
  height: number;
  className?: string;
}) {
  const wh = useMemo(() => ({ width: `${width}px`, height: `${height}px` }), [width, height]);

  return (
    <div
      className={cn(
        'bg-muted text-muted-foreground flex max-h-auto max-w-full items-center justify-center text-center',
        className,
      )}
      style={wh}
    >
      {movie?.poster_path || movie?.backdrop_path ? (
        <Image
          src={movie.poster_path ?? movie.backdrop_path ?? ''}
          alt={`poster of ${movie.title}`}
          width={width}
          height={height}
          className="object-cover"
          style={wh}
        />
      ) : (
        <em className="m-1">{movie?.title}</em>
      )}
    </div>
  );
}
