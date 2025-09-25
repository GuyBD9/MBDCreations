const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

const dbPath = path.join(__dirname, '..', 'database', 'mbdcreations.sqlite');
const db = new Database(dbPath);

db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  price INTEGER,
  stock INTEGER DEFAULT 0,
  images TEXT,
  drop_start_at TEXT,
  drop_end_at TEXT,
  is_limited INTEGER DEFAULT 0,
  limit_qty INTEGER,
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

const ensureColumn = (table, column, definition) => {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all();
  if (!columns.some((col) => col.name === column)) {
    db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
  }
};

ensureColumn('products', 'drop_start_at', 'TEXT');
ensureColumn('products', 'drop_end_at', 'TEXT');
ensureColumn('products', 'is_limited', 'INTEGER DEFAULT 0');
ensureColumn('products', 'limit_qty', 'INTEGER');

const countRow = db.prepare('SELECT COUNT(*) AS count FROM products').get();
if (countRow.count === 0) {
  const seedProduct = {
    title: 'Aureate Vessel',
    description: 'Hand-lathed brass vessel with matte lacquer interior.',
    price: 32000,
    stock: 6,
    images: JSON.stringify([
      'https://images.unsplash.com/photo-1520975682031-0f3c583eac91?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.0.3',
    ]),
    dropStartAt: new Date(Date.now() + 1000 * 60 * 60 * 36).toISOString(),
    dropEndAt: new Date(Date.now() + 1000 * 60 * 60 * 72).toISOString(),
    isLimited: 1,
    limitQty: 40,
  };

  db.prepare(
    `INSERT INTO products (title, description, price, stock, images, drop_start_at, drop_end_at, is_limited, limit_qty)
     VALUES (@title, @description, @price, @stock, @images, @dropStartAt, @dropEndAt, @isLimited, @limitQty)`
  ).run(seedProduct);
} else {
  const existing = db.prepare('SELECT id, images FROM products ORDER BY id ASC LIMIT 1').get();
  if (existing) {
    const needsImages = !existing.images || existing.images === '[]';
    if (needsImages) {
      db.prepare(
        `UPDATE products
         SET images = ?,
             drop_start_at = COALESCE(drop_start_at, ?),
             drop_end_at = COALESCE(drop_end_at, ?),
             is_limited = COALESCE(is_limited, 1),
             limit_qty = COALESCE(limit_qty, 40)
         WHERE id = ?`
      ).run(
        JSON.stringify([
          'https://images.unsplash.com/photo-1520975682031-0f3c583eac91?auto=format&fit=crop&w=1600&q=80&ixlib=rb-4.0.3',
        ]),
        new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        new Date(Date.now() + 1000 * 60 * 60 * 60).toISOString(),
        existing.id
      );
    }
  }
}

function parseJson(value, fallback) {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return fallback;
  try {
    return JSON.parse(value);
  } catch (_) {
    return fallback;
  }
}

function mapProduct(row) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    price: row.price,
    stock: row.stock,
    images: parseJson(row.images, []),
    dropStartAt: row.drop_start_at,
    dropEndAt: row.drop_end_at,
    isLimited: typeof row.is_limited === 'number' ? Boolean(row.is_limited) : Boolean(Number(row.is_limited)),
    limitQty: row.limit_qty,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function normalizeImagesForStorage(images) {
  if (Array.isArray(images)) {
    return JSON.stringify(images);
  }
  if (typeof images === 'string') {
    return images;
  }
  return JSON.stringify([]);
}

const wrap = (handler) => (req, res, next) => {
  try {
    handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.get(
  '/api/products',
  wrap((_req, res) => {
    const rows = db.prepare('SELECT * FROM products ORDER BY id DESC').all();
    res.json(rows.map(mapProduct));
  })
);

app.get(
  '/api/products/:id',
  wrap((req, res) => {
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(mapProduct(row));
  })
);

app.post(
  '/api/admin/products',
  wrap((req, res) => {
    const {
      title,
      description = '',
      price = 0,
      stock = 0,
      images = [],
      dropStartAt = null,
      dropEndAt = null,
      isLimited = false,
      limitQty = null,
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'title is required' });
    }

    const info = db
      .prepare(
        `INSERT INTO products (title, description, price, stock, images, drop_start_at, drop_end_at, is_limited, limit_qty)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        title,
        description,
        price,
        stock,
        normalizeImagesForStorage(images),
        dropStartAt,
        dropEndAt,
        isLimited ? 1 : 0,
        limitQty
      );

    res.status(201).json({ id: info.lastInsertRowid });
  })
);

app.put(
  '/api/admin/products/:id',
  wrap((req, res) => {
    const { id } = req.params;
    const updates = [];
    const values = [];

    const allowedFields = {
      title: (value) => value,
      description: (value) => value,
      price: (value) => value,
      stock: (value) => value,
      images: (value) => normalizeImagesForStorage(value),
      dropStartAt: (value) => value,
      dropEndAt: (value) => value,
      isLimited: (value) => (value ? 1 : 0),
      limitQty: (value) => value,
    };

    Object.entries(allowedFields).forEach(([key, transform]) => {
      if (Object.prototype.hasOwnProperty.call(req.body, key)) {
        const column = key
          .replace('dropStartAt', 'drop_start_at')
          .replace('dropEndAt', 'drop_end_at')
          .replace('isLimited', 'is_limited')
          .replace('limitQty', 'limit_qty');
        updates.push(`${column} = ?`);
        values.push(transform(req.body[key]));
      }
    });

    if (updates.length === 0) {
      return res.status(400).json({ error: 'No updatable fields provided' });
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const statement = db.prepare(`UPDATE products SET ${updates.join(', ')} WHERE id = ?`);
    const result = statement.run(...values);

    res.json({ updated: result.changes });
  })
);

app.delete(
  '/api/admin/products/:id',
  wrap((req, res) => {
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    res.json({ deleted: result.changes });
  })
);

app.post(
  '/api/orders',
  wrap((req, res) => {
    const { items } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'items must be a non-empty array' });
    }

    const productStmt = db.prepare('SELECT id, title, price, stock FROM products WHERE id = ?');
    let total = 0;

    for (const item of items) {
      const qty = Number(item?.qty ?? 0);
      if (!item?.id || !Number.isInteger(qty) || qty <= 0) {
        return res.status(400).json({ error: 'Each item requires id and qty > 0' });
      }
      const product = productStmt.get(item.id);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.id} not found` });
      }
      if (product.stock < qty) {
        return res.status(409).json({ error: `Insufficient stock for ${product.title}` });
      }
      total += product.price * qty;
    }

    const order = db.prepare('INSERT INTO orders (items, total) VALUES (?, ?)').run(JSON.stringify(items), total);
    res.status(201).json({ orderId: order.lastInsertRowid, total });
  })
);

app.use((err, _req, res, _next) => {
  console.error('Internal error', err);
  res.status(500).json({ error: 'Internal Error' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API ready on http://localhost:${PORT}`);
});
