import { useMovieCredits } from '@/hooks/useMovieCredits';
import { MovieCredits, movieCreditsSchema } from '@/models/movieCredits';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { ReactNode } from 'react';

global.fetch = jest.fn();

describe('useMovieCredits', () => {
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

  it('should fetch movie credits successfully', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockMovieCredits),
    });

    const { result } = renderHook(() => useMovieCredits('123'), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(movieCreditsSchema.parse(mockMovieCredits));
    expect(global.fetch).toHaveBeenCalledWith('/api/movies/123/credits');
  });

  it('should handle error when fetching movie credits fails', async () => {
    const error = new Error('Failed to fetch');
    (global.fetch as jest.Mock).mockRejectedValueOnce(error);

    const { result } = renderHook(() => useMovieCredits('123'), { wrapper });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});

const mockMovieCredits: MovieCredits = {
  id: 123,
  cast: [
    {
      adult: false,
      gender: 1,
      id: 1,
      known_for_department: 'Acting',
      name: 'John Doe',
      popularity: 10.5,
      cast_id: 1,
      character: 'Character 1',
      credit_id: 'xyz123',
      order: 1,
      profile_path: '/path/to/profile.jpg',
    },
  ],
  crew: [
    {
      id: 2,
      name: 'Jane Smith',
      job: 'Director',
      profile_path: '/path/to/profile2.jpg',
      adult: false,
      gender: 1,
      known_for_department: 'Directing',
      popularity: 8.5,
      credit_id: 'abc456',
      department: 'Directing',
    },
  ],
};
