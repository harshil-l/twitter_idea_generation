import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

// Basic maintenance route for now
router.get('/', authenticateToken, async (req, res) => {
  res.json({ success: true, message: 'Maintenance routes working' });
});

export default router;
