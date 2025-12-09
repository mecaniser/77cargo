import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    // Custom plugin to serve static files from frontend directory
    {
      name: 'serve-static-files',
      configureServer(server) {
        server.middlewares.use('/static', (req, res, next) => {
          const filePath = path.join(__dirname, 'frontend', req.url.replace('/static', ''));
          
          // Check if file exists
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            try {
              // Set appropriate content type
              const ext = path.extname(filePath);
              const contentTypes = {
                '.js': 'application/javascript',
                '.css': 'text/css',
                '.html': 'text/html',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.svg': 'image/svg+xml',
              };
              res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream');
              
              // Send file
              const fileContent = fs.readFileSync(filePath);
              res.end(fileContent);
            } catch (err) {
              console.error('Error serving file:', err);
              res.statusCode = 500;
              res.end('Error serving file');
            }
          } else {
            // File not found, continue to proxy
            next();
          }
        });
      },
    },
  ],
  root: './frontend',
  publicDir: false,
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    fs: {
      allow: ['..']
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      // Fallback proxy for /static if file not found locally
      '/static': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Proxy error:', err);
          });
        },
      },
    },
  },
});

