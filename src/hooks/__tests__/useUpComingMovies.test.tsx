import useUpComingMovies from '@/hooks/useUpComingMovies';
import { movieListSchema, MoviesResult } from '@/models/movie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';

// Mock fetch globally
global.fetch = jest.fn();

describe('useUpComingMovies', () => {
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

  it('should fetch upcoming movies successfully', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: async () => mockMovies,
    });

    const { result } = renderHook(() => useUpComingMovies(), { wrapper });

    expect(result.current.isPending).toBe(true);

    await waitFor(() => {
      expect(result.current.data).toEqual(movieListSchema.parse(mockMovies));
    });

    expect(fetch).toHaveBeenCalledWith('/api/movies/upcoming');
  });

  it('should handle error when fetch fails', async () => {
    const error = new Error('Failed to fetch');
    (fetch as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useUpComingMovies(), { wrapper });

    await waitFor(() => {
      expect(result.current.error).toBe(error);
    });
  });

  it('should show loading state', () => {
    (fetch as jest.Mock).mockImplementationOnce(
      () => new Promise(() => {}), // Never resolves
    );

    const { result } = renderHook(() => useUpComingMovies(), { wrapper });

    expect(result.current.isPending).toBe(true);
  });
});

const mockMovies: MoviesResult = {
  page: 1,
  total_pages: 1,
  total_results: 2,
  results: [
    {
      id: 1,
      title: 'Movie 1',
      release_date: '2023-12-01',
      adult: false,
      original_language: 'en',
      original_title: 'Movie 1',
      overview: 'Overview 1',
      // ...other movie properties
    },
    {
      id: 2,
      title: 'Movie 2',
      release_date: '2023-12-15',
      adult: false,
      original_language: 'en',
      original_title: 'Movie 2',
      overview: 'Overview 2',
      // ...other movie properties
    },
  ],
};
