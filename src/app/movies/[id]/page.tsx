'use client';
import { MoviePosterCard } from '@/components/movies/MoviePosterCard';
import { RatingBadge } from '@/components/movies/RatingBadge';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useMovie } from '@/hooks/useMovie';
import { useMovieCredits } from '@/hooks/useMovieCredits';
import { quickDateFormat, runtimeFormat } from '@/lib/date';
import { cn } from '@/lib/utils';
import { Movie } from '@/models/movie';
import { MovieCast, MovieCrew } from '@/models/movieCredits';
import Image from 'next/image';
import { ReactNode, use, useMemo } from 'react';

export default function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: movie, isPending, error } = useMovie(id);

  // const movie = null as Movie | null;
  // const isPending = true;

  return (
    <div className={cn('flex flex-col', isPending && 'content-pending')}>
      <div className="min-h-200 bg-black">
        {movie?.backdrop_path && (
          <div
            className="container mx-auto flex h-200 bg-cover bg-center"
            style={{ backgroundImage: `url(${movie.backdrop_path})` }}
          >
            <div className="h-full w-full bg-linear-to-r from-black via-black/50 to-black" />
          </div>
        )}
      </div>
      <div className="to-background from-background/70 -mb-80 -translate-y-80 bg-linear-to-b to-[calc(var(--spacing)*80)] p-4">
        <div className="container mx-auto flex flex-col gap-8">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex flex-col gap-4 md:max-w-[300px]">
              <MoviePosterCard
                width={300}
                height={450}
                movie={movie}
                className={cn('mx-auto -mb-[225px] -translate-y-1/2', !isPending && 'shadow-2xl')}
              />
              <MetaDetails movie={movie} />
            </div>
            <div className="flex flex-1 flex-col items-start justify-start gap-4">
              <h2 className="content mx-2 my-4 text-5xl font-bold empty:h-9 empty:opacity-30">
                {movie?.title}
              </h2>
              <Card className="w-full">
                <CardContent className="flex flex-col gap-4 p-6">
                  <h3 className="text-2xl [.content-pending_&]:invisible">Summary</h3>
                  <p className="content">{movie?.overview}</p>
                </CardContent>
                {movie && <Credits id={movie.id.toString()} />}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetaDetails({ movie }: { movie?: Movie }) {
  const releaseDateStr = useMemo(() => {
    if (movie?.release_date) {
      return quickDateFormat(movie.release_date);
    }
    return null;
  }, [movie?.release_date]);

  return (
    <Card className="md:bg-background bg-trasparent border-0 shadow-none md:border-1 md:shadow-2xl">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-x-1 gap-y-4 [&>span]:text-right [.content-pending_&>strong]:invisible">
          <strong>Rating:</strong>
          <span className="content">
            <RatingBadge movie={movie} className="p-0 text-lg [&>svg]:size-5" />
          </span>
          <strong>Release Date:</strong>
          <span className="content">{releaseDateStr}</span>
          <strong>Runtime:</strong>
          <span className="content">
            {movie && (movie.runtime ? runtimeFormat(movie.runtime) : 'unknown')}
          </span>
          <strong>Genres:</strong>
          <span className="content gap-2">
            {movie?.genres &&
              movie.genres.map((genre) => (
                <Badge key={genre.id} className="mb-1 ml-1 inline-block">
                  {genre.name}
                </Badge>
              ))}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

function Credits({ id }: { id: string }) {
  const { data, isPending, error } = useMovieCredits(id);

  if (isPending || error) {
    return (
      <CardContent className="content-pending relative p-6">
        <span className="content mb-4 block h-7 w-1/3 min-w-1/3 text-2xl"></span>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Person key={i} />
          ))}
        </div>
        {error && (
          <div className="absolute inset-0 top-1/2 text-center">
            <b className="text-destructive">Something went wrong</b>
            <p>Refresh the page or try again later.</p>
          </div>
        )}
      </CardContent>
    );
  }

  return (
    <>
      {data?.cast.length && (
        <CardContent className="border-t-1 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <h3 className="text-2xl sm:col-span-2 md:col-span-1 lg:col-span-2">Starring</h3>
            <CreditPeople
              limit={12}
              people={data?.cast ?? []}
              subtitle={(person) => <>as {person.character}</>}
            />
          </div>
        </CardContent>
      )}
      {data?.cast.length && (
        <CardContent className="border-t-1 p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <h3 className="text-2xl sm:col-span-2 md:col-span-1 lg:col-span-2">Crew</h3>
            <CreditPeople
              limit={12}
              people={data?.crew ?? []}
              subtitle={(person) => <>{person.job}</>}
            />
          </div>
        </CardContent>
      )}
    </>
  );
}

function CreditPeople<T extends MovieCast | MovieCrew>({
  people,
  limit,
  subtitle,
}: {
  people: T[];
  limit?: number;
  subtitle: (person: T) => ReactNode;
}) {
  // const [expanded, setExpanded] = useState(!limit);

  return (
    <>
      {people.slice(0, !limit ? undefined : (limit ?? 12)).map((person) => (
        <Person key={person.credit_id} person={person} subtitle={subtitle} />
      ))}
    </>
  );
}

function Person<T extends MovieCast | MovieCrew>({
  person,
  subtitle,
}: {
  person?: T | null;
  subtitle?: (person: T) => ReactNode;
}) {
  return (
    <div className="flex flex-row items-center gap-2">
      {person?.profile_path ? (
        <Image
          src={person.profile_path}
          alt={person.name}
          width={80}
          height={120}
          className="h-[80px] w-[80px] shrink-0 rounded-full object-cover"
        />
      ) : (
        <div className="bg-muted h-[80px] w-[80px] rounded-full" />
      )}
      <div className="flex flex-1 flex-col justify-center">
        <h4 className="content text-lg font-bold empty:mb-2 empty:h-5">{person?.name}</h4>
        <span className="content">{person && subtitle && subtitle(person)}</span>
      </div>
    </div>
  );
}
