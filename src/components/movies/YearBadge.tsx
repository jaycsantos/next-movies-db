import { Movie } from '@/models/movie';
import { Badge } from '../ui/badge';

export function YearBadge({ movie }: { movie: Movie | undefined | null }) {
  if (!movie?.release_date) return <></>;

  return <Badge variant="outline">{movie.release_date.substring(0, 4)}</Badge>;
}
