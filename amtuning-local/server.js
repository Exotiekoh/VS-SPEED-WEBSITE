const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression for faster loading
app.use(compression());

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist'), {
  maxAge: '1d', // Cache for 1 day
  etag: true
}));

// Handle client-side routing - send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔════════════════════════════════════════╗
║   VS SPEED - vsspeed.io Server         ║
╠════════════════════════════════════════╣
║  Status: ONLINE ✅                      ║
║  Port: ${PORT}                             ║
║                                        ║
║  Access URLs:                          ║
║  - http://localhost:${PORT}                ║
║  - http://vsspeed.io:${PORT}               ║
║  - http://[your-ip]:${PORT}                ║
║                                        ║
║  Press Ctrl+C to stop                  ║
╚════════════════════════════════════════╝
  `);
});
