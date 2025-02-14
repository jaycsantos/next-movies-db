'use client';

import { useRouter } from 'next/navigation';
import { CornerDownLeft, SearchIcon } from 'lucide-react';
import { Button } from './button';
import { Card, CardHeader } from './card';
import Kbd from './kbd';
import { cn } from '@/lib/utils';
import { FormEvent, useState } from 'react';

type SearchProps = {
  initialValue?: string;
  className?: string;
  placeholder?: string;
  autoFocus?: boolean;
  id?: string;
};

export function Search({ initialValue = '', className, placeholder, autoFocus, id }: SearchProps) {
  const [search, setSearch] = useState(initialValue);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams({ q: search });
    router.push(`/movies/search?${query}`);
  };

  return (
    <Card
      className={cn('relative text-xl shadow-none focus-within:outline md:text-2xl', className)}
    >
      <form onSubmit={handleSubmit}>
        <CardHeader className="flex flex-row items-center justify-center space-y-0 px-2 py-0 outline-none [&:focus-within>*+button]:visible [&>*+button]:invisible">
          <SearchIcon />
          <input
            type="text"
            id={id}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-md px-1 py-4 font-semibold focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            autoFocus={autoFocus}
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            aria-label="Submit"
            className="text-muted-foreground hover:text-primary cursor-pointer hover:bg-transparent"
          >
            <Kbd render={<CornerDownLeft />} />
          </Button>
        </CardHeader>
      </form>
    </Card>
  );
}
