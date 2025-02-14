import { FilmIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-30 w-full">
      <div className="container mx-auto flex flex-row p-2">
        <div className="flex items-center">
          <h1 className="ml-2 text-2xl font-bold">
            <Link href="/">
              <FilmIcon size={32} className="mr-2 inline align-bottom" />
              TheMovies
            </Link>
          </h1>
        </div>
        <div className="flex-1"></div>
      </div>
    </header>
  );
}
