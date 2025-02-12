import urljoin from 'url-join';

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
  options = Object.assign(
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
    options ?? {},
  );

  const res = await fetch(urljoin(API_URL, path), options);

  const data = await res.json();
  return { data, status: res.status, statusText: res.statusText };
}
