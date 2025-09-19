// server.js
const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dbFile = path.join(__dirname, '..', 'database', 'mbdcreations.sqlite');
const db = new Database(dbFile);

// schema
db.exec(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER,
  stock INTEGER DEFAULT 0,
  images TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  items TEXT NOT NULL,
  total INTEGER NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

// seed (if empty)
const rowCount = db.prepare('SELECT COUNT(*) AS c FROM products').get().c;
if (rowCount === 0) {
  db.prepare(`
    INSERT INTO products (title, description, price, stock, images)
    VALUES (@title, @description, @price, @stock, @images)
  `).run({
    title: 'Sample Cup',
    description: 'Hand-crafted artistic cup.',
    price: 12000, // stored in cents
    stock: 5,
    images: JSON.stringify([])
  });
}

// routes
app.get('/api/health', (_, res) => res.json({ ok: true }));

app.get('/api/products', (_, res) => {
  const rows = db.prepare('SELECT * FROM products ORDER BY id DESC').all();
  res.json(rows);
});

app.get('/api/products/:id', (req, res) => {
  const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'Not found' });
  res.json(row);
});

// admin (no auth for MVP)
app.post('/api/admin/products', (req, res) => {
  const { title, description = '', price = 0, stock = 0, images = [] } = req.body;
  if (!title) return res.status(400).json({ error: 'title is required' });
  const info = db.prepare(`
    INSERT INTO products (title, description, price, stock, images)
    VALUES (?, ?, ?, ?, ?)
  `).run(title, description, price, stock, JSON.stringify(images));
  res.json({ id: info.lastInsertRowid });
});

app.put('/api/admin/products/:id', (req, res) => {
  const { title, description, price, stock, images } = req.body;
  const info = db.prepare(`
    UPDATE products
    SET title = COALESCE(?, title),
        description = COALESCE(?, description),
        price = COALESCE(?, price),
        stock = COALESCE(?, stock),
        images = COALESCE(?, images),
        updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    title ?? null,
    description ?? null,
    price ?? null,
    stock ?? null,
    images ? JSON.stringify(images) : null,
    req.params.id
  );
  res.json({ updated: info.changes });
});

app.delete('/api/admin/products/:id', (req, res) => {
  const info = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  res.json({ deleted: info.changes });
});

// orders (demo)
app.post('/api/orders', (req, res) => {
  const { items = [] } = req.body;
  const total = items.reduce((sum, it) => sum + (it.price * it.qty), 0);
  const info = db.prepare('INSERT INTO orders (items, total) VALUES (?, ?)').run(JSON.stringify(items), total);
  res.json({ orderId: info.lastInsertRowid });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API ready on http://localhost:${PORT}`));