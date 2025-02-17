import { useMovie } from '@/hooks/useMovie';
import { Movie, movieSchema } from '@/models/movie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';

// Mock fetch globally
global.fetch = jest.fn();

describe('useMovie', () => {
  const wrapper = ({ children }: { children: ReactNode }) => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should fetch movie successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockMovie,
    });

    const { result } = renderHook(() => useMovie(`${mockMovie.id}`), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(movieSchema.parse(mockMovie));
    expect(fetch).toHaveBeenCalledWith(`/api/movies/${mockMovie.id}`);
  });

  it('should handle error when fetch fails', async () => {
    const error = new Error('Failed to fetch');
    (fetch as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useMovie('1'), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });

  it('should show loading state', () => {
    (fetch as jest.Mock).mockImplementationOnce(
      () => new Promise(() => {}), // Never resolves
    );

    const { result } = renderHook(() => useMovie('1'), { wrapper });

    expect(result.current.isLoading).toBe(true);
  });
});

const mockMovie: Movie = {
  adult: false,
  backdrop_path: '/test.jpg',
  belongs_to_collection: {
    id: 77816,
    name: 'Kung Fu Panda Collection',
    poster_path: '/xoYc0RYKSc3xC4S9OpPZxKocKtj.jpg',
    backdrop_path: '/2nbtv33hEk2CTnuMhTGZgsFdi3K.jpg',
  },
  budget: 80000000,
  genres: [
    {
      id: 16,
      name: 'Animation',
    },
    {
      id: 10751,
      name: 'Family',
    },
    {
      id: 28,
      name: 'Action',
    },
    {
      id: 35,
      name: 'Comedy',
    },
  ],
  homepage: 'https://www.dreamworks.com/movies/kung-fu-panda-4',
  id: 1011985,
  imdb_id: 'tt21692408',
  origin_country: ['US'],
  original_language: 'en',
  original_title: 'Kung Fu Panda 4',
  overview:
    'Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.',
  popularity: 191.133,
  poster_path: '/nqXsAaQsKw2gKpkfhIgjXNDRqg7.jpg',
  production_companies: [
    {
      id: 521,
      logo_path: '/3BPX5VGBov8SDqTV7wC1L1xShAS.png',
      name: 'DreamWorks Animation',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '2024-03-02',
  revenue: 548040835,
  runtime: 94,
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
  ],
  status: 'Released',
  tagline: '',
  title: 'Kung Fu Panda 4',
  video: false,
  vote_average: 7.081,
  vote_count: 2949,
};
