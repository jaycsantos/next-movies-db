import { Movie } from '@/models/movie';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader } from '../ui/card';
import { RatingBadge } from './RatingBadge';
import { YearBadge } from './YearBadge';

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movies/${movie.id}`} className="w-full">
      <Card className="flex h-[152px] flex-row items-start">
        <div className="bg-muted h-[150px] w-[100px] overflow-clip rounded-xl">
          {movie.poster_path && (
            <Image
              src={movie.poster_path}
              alt={movie.title}
              width={100}
              height={150}
              className="h-[150px] w-[100px] rounded-xl object-cover"
            />
          )}
        </div>
        <CardHeader className="flex flex-1 items-start gap-2 p-4">
          <div className="flex flex-row gap-2">
            <YearBadge movie={movie} />
            <RatingBadge movie={movie} />
          </div>
          <h3
            className="text-primary line-clamp-1 text-lg font-bold md:text-xl"
            title={movie.title}
          >
            {movie.title}{' '}
          </h3>
          <p className="line-clamp-2 flex-1" title={movie.overview}>
            {movie.overview}
          </p>
        </CardHeader>
      </Card>
    </Link>
  );
}
