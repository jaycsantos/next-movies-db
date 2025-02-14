import { z } from 'zod';
import { parseSearchParams } from 'zod-search-params';
import { api, extractHeader } from '../..';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const params = parseSearchParams(schema, searchParams)!;

  const query = new URLSearchParams({
    query: params.q,
    include_adult: 'false',
    page: params.page.toString(),
  });

  return await api(`/search/movie?${query}`, {
    headers: extractHeader(req.headers, ['if-none-match']),
    next: { revalidate: 3600 }, // 1hr
  });
}

const schema = z.object({
  q: z.string(),
  page: z.number().gte(1).optional().default(1),
});
