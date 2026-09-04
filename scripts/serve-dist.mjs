import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)), 'dist');
const mimeTypes = {
    '.css': 'text/css',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.map': 'application/json'
};

createServer(async (request, response) => {
    const pathname = new URL(request.url, 'http://localhost').pathname;
    const requestedPath = pathname === '/' ? '/index.html' : pathname;
    const filePath = normalize(join(root, requestedPath));

    if (!filePath.startsWith(root)) {
        response.writeHead(403);
        response.end('Forbidden');
        return;
    }

    try {
        const file = await readFile(filePath);
        response.writeHead(200, {
            'Content-Type': mimeTypes[extname(filePath)] || 'application/octet-stream'
        });
        response.end(file);
    } catch {
        response.writeHead(404);
        response.end('Not found');
    }
}).listen(1234, () => {
    console.log('Aplicacao disponivel em http://localhost:1234');
});