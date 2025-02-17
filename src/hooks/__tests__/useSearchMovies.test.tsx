import { useSearchMovies } from '@/hooks/useSearchMovies';
import { MoviesResult, movieListSchema } from '@/models/movie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';

// Mock fetch globally
global.fetch = jest.fn();

describe('useSearchMovies', () => {
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

  it('should fetch movies successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockMoviesResult,
    });

    const { result } = renderHook(() => useSearchMovies('Kung Fu Panda'), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.pages[0]).toEqual(movieListSchema.parse(mockMoviesResult));
    expect(fetch).toHaveBeenCalledWith('/api/movies/search?q=Kung+Fu+Panda&page=1');
  });

  it('should handle error when fetch fails', async () => {
    const error = new Error('Failed to fetch');
    (fetch as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useSearchMovies('Kung Fu Panda'), { wrapper });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });
  });

  it('should show loading state', () => {
    (fetch as jest.Mock).mockImplementationOnce(
      () => new Promise(() => {}), // Never resolves
    );

    const { result } = renderHook(() => useSearchMovies('Kung Fu Panda'), { wrapper });

    expect(result.current.isLoading).toBe(true);
  });
});

const mockMoviesResult: MoviesResult = {
  page: 1,
  results: [
    {
      id: 1011985,
      title: 'Kung Fu Panda 4',
      original_title: 'Kung Fu Panda 4',
      original_language: 'en',
      adult: false,
      overview:
        'Po is gearing up to become the spiritual leader of his Valley of Peace, but also needs someone to take his place as Dragon Warrior. As such, he will train a new kung fu practitioner for the spot and will encounter a villain called the Chameleon who conjures villains from the past.',
      release_date: '2024-03-02',
      poster_path: '/nqXsAaQsKw2gKpkfhIgjXNDRqg7.jpg',
      vote_average: 7.081,
      vote_count: 2949,
    },
  ],
  total_pages: 1,
  total_results: 1,
};
