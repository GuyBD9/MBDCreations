-- This schema defines the structure of the 'works' table.
CREATE TABLE IF NOT EXISTS Works (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  subtitle TEXT,
  description TEXT,
  materials TEXT,
  dimensions TEXT,
  price REAL,
  imageUrl TEXT,
  category TEXT DEFAULT 'object',
  is_featured BOOLEAN DEFAULT 0,
  
  -- For limited drops
  is_drop BOOLEAN DEFAULT 0,
  drop_start_at DATETIME,
  drop_end_at DATETIME,
  limit_qty INTEGER,

  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- This trigger automatically updates the 'updated_at' timestamp when a row is changed.
CREATE TRIGGER IF NOT EXISTS set_timestamp
BEFORE UPDATE ON works
FOR EACH ROW
BEGIN
  UPDATE works
  SET updated_at = CURRENT_TIMESTAMP
  WHERE id = old.id;
END;