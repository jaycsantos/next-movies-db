import { Footer } from '@/components/Footer';
import { UpComingMovies } from '@/components/movies/UpComingMovies';
import { Search } from '@/components/ui/search';

export default function Home() {
  return (
    <div className="flex h-dvh w-full flex-col items-center">
      {/* <Header /> */}
      <main className="container flex flex-1 flex-col items-center gap-8 p-2">
        <div className="flex min-h-[40dvh] flex-col items-center justify-end">
          <h1 className="text-center text-4xl font-bold">
            The Movies,{' '}
            <span className="inline-block break-inside-avoid text-2xl font-normal">
              that movie database
            </span>
          </h1>
        </div>
        <div className="flex min-w-full flex-row space-x-4 md:min-w-[480px]">
          <Search placeholder="Search" className="w-full" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
