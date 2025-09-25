// backend/routes/works.js
import express from 'express';
import { worksController } from '../controllers/worksController.js';

const router = express.Router();

// GET /api/works
router.get('/', worksController.getAll);

// GET /api/works/:id
router.get('/:id', worksController.getById);

export default router;