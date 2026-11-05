import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { resolve, join, extname, sep } from 'node:path';

// Local production preview of the static export. No API or payment logic.
const root = resolve('out');
const portIndex = process.argv.indexOf('--port');
const port = Number(portIndex >= 0 ? process.argv[portIndex + 1] : process.env.PORT || 3000);
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8', '.pdf': 'application/pdf', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.woff2': 'font/woff2' };
await stat(join(root, 'index.html')).catch(() => { throw new Error('Run npm run build before npm start.'); });
createServer(async (req, res) => {
  if (!['GET', 'HEAD'].includes(req.method || '')) { res.writeHead(405); return res.end(); }
  try {
    const pathname = decodeURIComponent(new URL(req.url || '/', 'http://localhost').pathname);
    let file = resolve(root, `.${pathname}`);
    if (file !== root && !file.startsWith(root + sep)) { res.writeHead(403); return res.end(); }
    let info = await stat(file).catch(() => null);
    if (info?.isDirectory()) { file = join(file, 'index.html'); info = await stat(file).catch(() => null); }
    if (!info?.isFile() && !extname(pathname)) { file = resolve(root, `.${pathname}.html`); info = await stat(file).catch(() => null); }
    if (!info?.isFile()) { res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }); return createReadStream(join(root, '404.html')).pipe(res); }
    const headers = { 'Content-Type': mime[extname(file)] || 'application/octet-stream', 'Content-Length': info.size, 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'strict-origin-when-cross-origin', 'X-Frame-Options': 'SAMEORIGIN' };
    if (extname(file) === '.pdf') headers['Content-Disposition'] = 'attachment; filename="The_AI_Unicorn_Protocol_2027_Free_Preview.pdf"';
    res.writeHead(200, headers);
    if (req.method === 'HEAD') return res.end();
    createReadStream(file).pipe(res);
  } catch { res.writeHead(400); res.end('Bad request'); }
}).listen(port, '0.0.0.0', () => console.log(`Static production preview: http://localhost:${port}`));
