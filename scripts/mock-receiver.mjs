import http from 'node:http';

const PORT = 8787;
const seenIds = new Set();

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function sendJson(res, status, obj, includeCors = true) {
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    ...(includeCors ? corsHeaders : {}),
  };
  res.writeHead(status, headers);
  res.end(JSON.stringify(obj));
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://localhost:${PORT}`);
  const scenario = url.searchParams.get('scenario') || 'ok';

  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (req.method === 'GET') {
    sendJson(res, 200, { ok: true, service: 'marriage-bureau-receiver', scenario });
    return;
  }

  if (req.method !== 'POST') {
    sendJson(res, 405, { ok: false, error: 'method_not_allowed' });
    return;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8');

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    console.log('[mock-receiver] bad_json');
    sendJson(res, 200, { ok: false, error: 'bad_json' });
    return;
  }

  const answeredCount = payload.answers ? Object.keys(payload.answers).length : 0;
  console.log(
    `[mock-receiver] scenario=${scenario} id=${payload.id} hp="${payload.hp || ''}" elapsedMs=${payload.elapsedMs} answers=${answeredCount} pdfBytes=${payload.pdf ? Math.floor((payload.pdf.length * 3) / 4) : 0} photoBytes=${payload.photo ? Math.floor((payload.photo.length * 3) / 4) : 0}`
  );

  if (payload.hp) {
    sendJson(res, 200, { ok: true, id: 'MB-IGNORED' });
    return;
  }

  if (scenario === 'slow') {
    await new Promise((r) => setTimeout(r, 8000));
  }

  if (scenario === 'fail') {
    res.writeHead(500, corsHeaders);
    res.end('Internal Server Error');
    return;
  }

  if (scenario === 'unreadable') {
    // Deliberately omit CORS headers so browser fetch cannot read the response
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, id: payload.id }));
    return;
  }

  if (scenario === 'unauthorized') {
    sendJson(res, 200, { ok: false, error: 'unauthorized' });
    return;
  }

  if (scenario === 'too_many') {
    sendJson(res, 200, { ok: false, error: 'too_many' });
    return;
  }

  if (scenario === 'validation') {
    sendJson(res, 200, {
      ok: false,
      error: 'validation',
      field: 'p_birthSDate',
      message: 'Registration is for adults, 18 or older.',
    });
    return;
  }

  // Default / ok / slow
  if (seenIds.has(payload.id)) {
    sendJson(res, 200, { ok: true, id: payload.id, duplicate: true });
    return;
  }
  seenIds.add(payload.id);
  sendJson(res, 200, { ok: true, id: payload.id });
});

server.listen(PORT, () => {
  console.log(`Mock Marriage Bureau receiver listening on http://localhost:${PORT}/exec`);
  console.log('Scenarios: ?scenario=ok | slow | fail | unauthorized | too_many | validation | unreadable');
});

