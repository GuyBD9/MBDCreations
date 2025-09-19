# MBDCreations

Monorepo with Next.js frontend and Express/SQLite backend.

## Frontend
- Dev: `cd frontend && npm install && npm run dev` (http://localhost:3000)
- ENV: `NEXT_PUBLIC_API_BASE` defaults to `http://localhost:4000`

## Backend
- Dev: `cd backend && npm install && npm run dev` (http://localhost:4000)
- SQLite DB file auto-created under `/database`

## API
- GET /api/health
- GET /api/products
- GET /api/products/:id
- POST /api/admin/products
- PUT  /api/admin/products/:id
- DELETE /api/admin/products/:id
- POST /api/orders
