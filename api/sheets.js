export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const targetUrl = String(req.query.url || '').trim();

      if (!targetUrl) {
        return res.status(400).json({ ok: false, error: 'Missing url' });
      }

      const upstream = await fetch(targetUrl, {
        method: 'GET',
        redirect: 'follow',
      });

      const text = await upstream.text();

      return res
        .status(upstream.ok ? 200 : upstream.status)
        .setHeader('Content-Type', 'application/json; charset=utf-8')
        .send(text);
    }

    if (req.method === 'POST') {
      const { url, key, value } = req.body || {};
      const targetUrl = String(url || '').trim();

      if (!targetUrl) {
        return res.status(400).json({ ok: false, error: 'Missing url' });
      }

      const upstream = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({ key, value }),
        redirect: 'follow',
      });

      const text = await upstream.text();

      return res
        .status(upstream.ok ? 200 : upstream.status)
        .setHeader('Content-Type', 'application/json; charset=utf-8')
        .send(text);
    }

    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown proxy error',
    });
  }
}
