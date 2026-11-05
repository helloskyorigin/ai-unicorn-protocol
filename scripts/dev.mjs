import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
// Also accepts the managed preview's Vite-style host/strictPort arguments.
const args = process.argv.slice(2);
const index = args.indexOf('--port');
const port = index >= 0 ? args[index + 1] : process.env.PORT || '3000';
if (!/^\d{2,5}$/.test(port)) throw new Error('A numeric development port is required');
const bin = fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url));
const child = spawn(process.execPath, [bin, 'dev', '--hostname', '0.0.0.0', '--port', port], { stdio: 'inherit' });
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => child.kill(signal));
child.on('exit', code => process.exit(code || 0));
