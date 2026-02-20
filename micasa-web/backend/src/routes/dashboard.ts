import express from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();
const prisma = new PrismaClient();

// Get dashboard overview
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).userId;

    // Get homes count
    const homesCount = await prisma.home.count({
      where: { userId }
    });

    // Get appliances count
    const appliancesCount = await prisma.appliance.count({
      where: { home: { userId } }
    });

    // Get pending maintenance tasks
    const pendingTasks = await prisma.maintenanceTask.count({
      where: {
        home: { userId },
        status: 'PENDING'
      }
    });

    // Get overdue tasks
    const overdueTasks = await prisma.maintenanceTask.count({
      where: {
        home: { userId },
        status: 'PENDING',
        scheduledDate: {
          lt: new Date()
        }
      }
    });

    // Get recent maintenance tasks
    const recentTasks = await prisma.maintenanceTask.findMany({
      where: {
        home: { userId }
      },
      include: {
        home: {
          select: { name: true }
        }
      },
      orderBy: { scheduledDate: 'desc' },
      take: 5
    });

    // Get upcoming tasks
    const upcomingTasks = await prisma.maintenanceTask.findMany({
      where: {
        home: { userId },
        status: 'PENDING',
        scheduledDate: {
          gte: new Date(),
          lte: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Next 7 days
        }
      },
      include: {
        home: {
          select: { name: true }
        }
      },
      orderBy: { scheduledDate: 'asc' },
      take: 5
    });

    // Get recent incidents
    const recentIncidents = await prisma.incident.findMany({
      where: {
        home: { userId }
      },
      include: {
        home: {
          select: { name: true }
        }
      },
      orderBy: { reportedAt: 'desc' },
      take: 5
    });

    res.json({
      success: true,
      data: {
        stats: {
          homesCount,
          appliancesCount,
          pendingTasks,
          overdueTasks
        },
        recentTasks: recentTasks.map(task => ({
          ...task,
          homeName: task.home?.name
        })),
        upcomingTasks: upcomingTasks.map(task => ({
          ...task,
          homeName: task.home?.name
        })),
        recentIncidents: recentIncidents.map(incident => ({
          ...incident,
          homeName: incident.home?.name
        }))
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch dashboard data' });
  }
});

// Get maintenance calendar data
router.get('/calendar', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const { month, year } = req.query;

    const startDate = new Date(parseInt(year as string), parseInt(month as string) - 1, 1);
    const endDate = new Date(parseInt(year as string), parseInt(month as string), 0);

    const tasks = await prisma.maintenanceTask.findMany({
      where: {
        home: { userId },
        scheduledDate: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        home: {
          select: { name: true }
        }
      }
    });

    res.json({ success: true, data: tasks });
  } catch (error) {
    console.error('Error fetching calendar data:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch calendar data' });
  }
});

export default router;
