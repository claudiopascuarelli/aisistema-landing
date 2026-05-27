import server from '../dist/server/server.js';

export default async function handler(req, res) {
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const url = new URL(req.url, `${protocol}://${host}`);

  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (value != null) {
      headers.set(key, Array.isArray(value) ? value.join(', ') : String(value));
    }
  }

  let body = null;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const chunks = [];
    for await (const chunk of req) {
      chunks.push(chunk);
    }
    body = Buffer.concat(chunks);
  }

  const webRequest = new Request(url.toString(), {
    method: req.method,
    headers,
    body,
  });

  const response = await server.fetch(webRequest);

  res.status(response.status);
  for (const [key, value] of response.headers.entries()) {
    if (key.toLowerCase() !== 'content-encoding') {
      res.setHeader(key, value);
    }
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  res.end(buffer);
}
