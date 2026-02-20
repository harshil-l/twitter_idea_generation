import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';
import { z } from 'zod';

const router = express.Router();
const prisma = new PrismaClient();

// Validation schemas
const createApplianceSchema = z.object({
  name: z.string().min(1, 'Appliance name is required'),
  homeId: z.string().min(1, 'Home ID is required'),
  category: z.string().default('OTHER'),
  brand: z.string().optional(),
  model: z.string().optional(),
  serialNumber: z.string().optional(),
  purchaseDate: z.string().transform(str => str ? new Date(str) : undefined).optional(),
  warrantyExpiry: z.string().transform(str => str ? new Date(str) : undefined).optional(),
  installationDate: z.string().transform(str => str ? new Date(str) : undefined).optional(),
  location: z.string().optional(),
  energyRating: z.string().optional(),
  notes: z.string().optional(),
  isActive: z.boolean().default(true)
});

const updateApplianceSchema = createApplianceSchema.partial().omit({ homeId: true });

// Get all appliances for a home
router.get('/home/:homeId', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const homeId = req.params.homeId;

    // Verify user owns the home
    const home = await prisma.home.findFirst({
      where: { id: homeId, userId }
    });

    if (!home) {
      return res.status(404).json({ success: false, error: 'Home not found' });
    }

    const appliances = await prisma.appliance.findMany({
      where: { homeId },
      orderBy: { name: 'asc' }
    });

    res.json({ success: true, data: appliances });
  } catch (error) {
    console.error('Error fetching appliances:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch appliances' });
  }
});

// Get single appliance
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const applianceId = req.params.id;

    const appliance = await prisma.appliance.findFirst({
      where: { 
        id: applianceId,
        home: { userId }
      },
      include: {
        home: true
      }
    });

    if (!appliance) {
      return res.status(404).json({ success: false, error: 'Appliance not found' });
    }

    res.json({ success: true, data: appliance });
  } catch (error) {
    console.error('Error fetching appliance:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch appliance' });
  }
});

// Create new appliance
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const validatedData = createApplianceSchema.parse(req.body);

    // Verify user owns the home
    const home = await prisma.home.findFirst({
      where: { id: validatedData.homeId, userId }
    });

    if (!home) {
      return res.status(404).json({ success: false, error: 'Home not found' });
    }

    const appliance = await prisma.appliance.create({
      data: validatedData,
      include: {
        home: true
      }
    });

    res.status(201).json({ success: true, data: appliance });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed',
        details: error.errors 
      });
    }
    console.error('Error creating appliance:', error);
    res.status(500).json({ success: false, error: 'Failed to create appliance' });
  }
});

// Update appliance
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const applianceId = req.params.id;
    const validatedData = updateApplianceSchema.parse(req.body);

    // Check if appliance exists and belongs to user
    const existingAppliance = await prisma.appliance.findFirst({
      where: { 
        id: applianceId,
        home: { userId }
      }
    });

    if (!existingAppliance) {
      return res.status(404).json({ success: false, error: 'Appliance not found' });
    }

    const appliance = await prisma.appliance.update({
      where: { id: applianceId },
      data: validatedData,
      include: {
        home: true
      }
    });

    res.json({ success: true, data: appliance });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        success: false, 
        error: 'Validation failed',
        details: error.errors 
      });
    }
    console.error('Error updating appliance:', error);
    res.status(500).json({ success: false, error: 'Failed to update appliance' });
  }
});

// Delete appliance
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const applianceId = req.params.id;

    // Check if appliance exists and belongs to user
    const existingAppliance = await prisma.appliance.findFirst({
      where: { 
        id: applianceId,
        home: { userId }
      }
    });

    if (!existingAppliance) {
      return res.status(404).json({ success: false, error: 'Appliance not found' });
    }

    await prisma.appliance.delete({
      where: { id: applianceId }
    });

    res.json({ success: true, message: 'Appliance deleted successfully' });
  } catch (error) {
    console.error('Error deleting appliance:', error);
    res.status(500).json({ success: false, error: 'Failed to delete appliance' });
  }
});

export default router;