import { Movie } from '@/models/movie';
import { Badge } from '../ui/badge';
import { StarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function RatingBadge({
  movie,
  className,
}: {
  movie: Movie | undefined | null;
  className?: string;
}) {
  if (!movie) return <></>;

  return (
    <Badge variant="outline" className={cn('border-none', className)}>
      <StarIcon
        className={cn(
          'inline align-bottom',
          movie.vote_count ? 'text-yellow-400' : 'text-muted-foreground',
        )}
      />
      {movie.vote_count && movie.vote_average
        ? `${movie.vote_average.toFixed(1)} (${movie.vote_count})`
        : 'No rating'}
    </Badge>
  );
}
