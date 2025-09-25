// backend/seed.js
import Database from 'better-sqlite3';
import fs from 'fs'; // Import the file system module

// Define paths
const DB_PATH = './database/main.db';
const SCHEMA_PATH = './database/schema.sql';

// Connect to the database
const db = new Database(DB_PATH);

function seed() {
  try {
    console.log('Applying schema...');
    // Read and execute the schema file to ensure tables exist
    const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
    db.exec(schema);
    console.log('Schema applied successfully.');

    console.log('Seeding data...');
    const insertStmt = db.prepare(`
      INSERT INTO works (title, slug, subtitle, description, materials, dimensions, price, imageUrl, is_featured, is_drop, drop_start_at)
      VALUES (@title, @slug, @subtitle, @description, @materials, @dimensions, @price, @imageUrl, @is_featured, @is_drop, @drop_start_at)
    `);

    const works = [
      {
        title: 'Vessel of Light',
        slug: 'vessel-of-light',
        subtitle: 'Sculptural Table Lamp',
        description: 'A study in form and shadow, crafted from a single block of Hebron marble.',
        materials: 'Hebron Marble, Brass, LED',
        dimensions: 'H: 38cm, W: 22cm',
        price: 1800.00,
        imageUrl: 'https://picsum.photos/seed/vessel/1200/1600',
        is_featured: 1,
        is_drop: 1,
        drop_start_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: 'Continuum',
        slug: 'continuum',
        subtitle: 'Wall Sculpture',
        description: 'An exploration of texture and continuity from reclaimed Israeli olive wood.',
        materials: 'Olive Wood, Steel Mount',
        dimensions: 'H: 120cm, W: 40cm',
        price: 2500.00,
        imageUrl: 'https://picsum.photos/seed/continuum/1200/900',
        is_featured: 0,
        is_drop: 0,
        drop_start_at: null
      },
      {
        title: 'Terra Stool',
        slug: 'terra-stool',
        subtitle: 'Hand-formed Ceramic Stool',
        description: 'A functional object that doubles as a sculptural statement.',
        materials: 'Galilean Clay, Glaze',
        dimensions: 'H: 45cm, Diameter: 35cm',
        price: 950.00,
        imageUrl: 'https://picsum.photos/seed/terra/1200/900',
        is_featured: 0,
        is_drop: 0,
        drop_start_at: null
      }
    ];

    // Transaction to insert all data
    const insertMany = db.transaction((items) => {
      db.exec('DELETE FROM works'); // Clear the table first
      for (const item of items) insertStmt.run(item);
    });

    insertMany(works);
    console.log('Seeding complete.');
    
  } catch (err) {
    console.error('Seeding failed:', err.message);
  } finally {
    db.close();
    console.log('Database connection closed.');
  }
}

seed();