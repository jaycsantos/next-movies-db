import { api, extractHeader } from '../..';

// export const dynamic = 'auto';

export async function GET(req: NextRequest) {
  const query = new URLSearchParams({
    include_adult: 'false',
    include_video: 'false',
    page: '1',
    // sort_by: 'popularity.desc',
  });

  return await api(`/movie/upcoming?${query}`, {
    headers: extractHeader(req.headers, ['if-none-match']),
    next: { revalidate: 43200 }, // 12hrs
  });
}
