import urljoin from 'proper-url-join';

const API_URL =
  process.env.API_URL ??
  (() => {
    throw new Error('API_URL is not defined');
  })();
const API_TOKEN =
  process.env.API_TOKEN ??
  (() => {
    throw new Error('API_TOKEN is not defined');
  })();

export async function api(path: string, options?: RequestInit) {
  options = Object.assign({}, options ?? {}, {
    headers: Object.assign(
      {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      options?.headers ?? {},
    ),
  });

  const res = await fetch(urljoin(API_URL, path), options);
  const init = {
    status: res.status,
    statusText: res.statusText,
    headers: extractHeader(res.headers, ['cache-control', 'etag']),
  };
  return res.ok ? Response.json(await res.json(), init) : new Response(null, init);
}

export function extractHeader(headers: Headers, keys: Array<string>): Record<string, string> {
  return keys.reduce(
    (acc, key) => {
      const value = headers.get(key);
      if (value) acc[key] = value;
      return acc;
    },
    <Record<string, string>>{},
  );
}
