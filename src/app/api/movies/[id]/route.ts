import { z } from 'zod';
import { api, extractHeader } from '../..';
import { NextRequest } from 'next/server';

export const dynamic = 'auto';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const id = z.number().parse(parseInt((await params).id));

  return await api(`/movie/${id}`, {
    headers: extractHeader(req.headers, ['if-none-match']),
    // next: { revalidate: 22385 },
  });
}
