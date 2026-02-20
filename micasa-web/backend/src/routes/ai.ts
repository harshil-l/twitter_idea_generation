import express from 'express';
import { authenticateToken } from '../middleware/auth';
import { getAIRecommendations } from '../services/aiService';

const router = express.Router();

// Get AI recommendations for maintenance
router.get('/recommendations/:homeId', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).userId;
    const homeId = req.params.homeId;

    const recommendations = await getAIRecommendations(userId, homeId);
    res.json({ success: true, data: recommendations });
  } catch (error) {
    console.error('Error getting AI recommendations:', error);
    res.status(500).json({ success: false, error: 'Failed to get AI recommendations' });
  }
});

export default router;
