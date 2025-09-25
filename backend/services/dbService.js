// backend/services/dbService.js
import Database from 'better-sqlite3';

// Use the correct, consistent database file name and path.
const db = new Database('./database/main.db');

export const worksService = {
  getAllWorks: () => {
    // This will now correctly find the 'works' table.
    const stmt = db.prepare('SELECT * FROM works ORDER BY created_at DESC');
    return stmt.all();
  },

  getWorkById: (id) => {
    const stmt = db.prepare('SELECT * FROM works WHERE id = ?');
    return stmt.get(id);
  },
};