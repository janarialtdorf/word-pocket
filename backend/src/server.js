import app from './app.js';
import cors from 'cors';

app.use(cors({ origin: 'http://localhost:5173' }));

app.get('/items', (req, res) => {
  res.json([]);
});

app.use((err, req, res, next) => {
  console.error('SERVER ERROR:', err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server töötab pordil http://localhost:${PORT}`);
});

server.on('error', (error) => {
  console.error('Server error:', error);
});

server.on('close', () => {
  console.log('Server was closed');
});