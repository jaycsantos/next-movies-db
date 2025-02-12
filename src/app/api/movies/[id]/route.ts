import { z } from 'zod';
import { api } from '../..';
import { NextRequest } from 'next/server';

export const dynamic = 'auto';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = z.string().parse(params.id);

  const { data, status, statusText } = await api(`/movie/${id}`, {
    next: { revalidate: 96400 }, // 1 day
  });

  return Response.json(data, { status, statusText });
}
