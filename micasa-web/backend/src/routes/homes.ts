import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

// Validation schemas
const createHomeSchema = z.object({
  name: z.string().min(1, 'Home name is required'),
  address: z.string().optional(),
  type: z.string().default('HOUSE'),
  yearBuilt: z.number().optional(),
  squareFootage: z.number().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  description: z.string().optional()
});

const updateHomeSchema = createHomeSchema.partial();

// Get all user's homes
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).userId;
    
    const homes = await prisma.home.findMany({
      where: { userId },
      include: {
        _count: {
          select: {
            appliances: true,
            maintenanceTasks: true,
            incidents: true,
            projects: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, data: homes });
  } catch (error) {
    console.error('Error fetching homes:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch homes' });
  }
});

// Get single home
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const homeId = req.params.id;

    const home = await prisma.home.findFirst({
      where: { id: homeId, userId },
      include: {
        appliances: {
          orderBy: { name: 'asc' }
        },
        maintenanceTasks: {
          orderBy: { scheduledDate: 'desc' },
          take: 10
        },
        incidents: {
          orderBy: { reportedAt: 'desc' },
          take: 5
        },
        projects: {
          orderBy: { createdAt: 'desc' },
          take: 5
        }
      }
    });

    if (!home) {
      return res.status(404).json({ success: false, error: 'Home not found' });
    }

    res.json({ success: true, data: home });
  } catch (error) {
    console.error('Error fetching home:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch home' });
  }
});

// Create new home
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const validatedData = createHomeSchema.parse(req.body);

    const home = await prisma.home.create({
      data: {
        ...validatedData,
        userId
      }
    });

    res.status(201).json({ success: true, data: home });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed',
        details: error.errors 
      });
    }
    console.error('Error creating home:', error);
    res.status(500).json({ success: false, error: 'Failed to create home' });
  }
});

// Update home
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const homeId = req.params.id;
    const validatedData = updateHomeSchema.parse(req.body);

    // Check if home exists and belongs to user
    const existingHome = await prisma.home.findFirst({
      where: { id: homeId, userId }
    });

    if (!existingHome) {
      return res.status(404).json({ success: false, error: 'Home not found' });
    }

    const home = await prisma.home.update({
      where: { id: homeId },
      data: validatedData
    });

    res.json({ success: true, data: home });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed',
        details: error.errors 
      });
    }
    console.error('Error updating home:', error);
    res.status(500).json({ success: false, error: 'Failed to update home' });
  }
});

// Delete home
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const homeId = req.params.id;

    // Check if home exists and belongs to user
    const existingHome = await prisma.home.findFirst({
      where: { id: homeId, userId }
    });

    if (!existingHome) {
      return res.status(404).json({ success: false, error: 'Home not found' });
    }

    await prisma.home.delete({
      where: { id: homeId }
    });

    res.json({ success: true, message: 'Home deleted successfully' });
  } catch (error) {
    console.error('Error deleting home:', error);
    res.status(500).json({ success: false, error: 'Failed to delete home' });
  }
});

export default router;