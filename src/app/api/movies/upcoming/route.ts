import { api } from '../..';

// export const dynamic = 'auto';

export async function GET() {
  const query = new URLSearchParams({
    include_adult: 'false',
    include_video: 'false',
    page: '1',
    // sort_by: 'popularity.desc',
  });

  const { data, status, statusText } = await api(`/movie/upcoming?${query}`, {
    next: { revalidate: 43200 }, // 12hrs
  });

  return Response.json(data, { status, statusText });
}
