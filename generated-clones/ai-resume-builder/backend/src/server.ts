import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ApiResponse, HealthStatus } from './types';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check with TypeScript info
app.get('/api/health', (req: Request, res: Response<HealthStatus>) => {
  res.json({ 
    status: 'OK', 
    service: 'AI Resume Builder TypeScript API',
    version: '1.0.0',
    typescript: true,
    timestamp: new Date().toISOString()
  });
});

// Demo endpoint
app.get('/api/demo', (req: Request, res: Response<ApiResponse>) => {
  res.json({
    success: true,
    message: 'TypeScript AI Resume Builder API is running!',
    data: {
      features: ['AI writing', 'Templates', 'PDF export', 'ATS optimization'],
      typeScript: true,
      typeSafe: true
    }
  });
});


// AI writing endpoint (TypeScript)
app.get('/api/aiwriting', (req: Request, res: Response<ApiResponse>) => {
  res.json({
    success: true,
    message: 'Type-safe AI writing endpoint',
    data: { feature: 'AI writing', typescript: true }
  });
});
// Templates endpoint (TypeScript)
app.get('/api/templates', (req: Request, res: Response<ApiResponse>) => {
  res.json({
    success: true,
    message: 'Type-safe Templates endpoint',
    data: { feature: 'Templates', typescript: true }
  });
});
// PDF export endpoint (TypeScript)
app.get('/api/pdfexport', (req: Request, res: Response<ApiResponse>) => {
  res.json({
    success: true,
    message: 'Type-safe PDF export endpoint',
    data: { feature: 'PDF export', typescript: true }
  });
});
// ATS optimization endpoint (TypeScript)
app.get('/api/atsoptimization', (req: Request, res: Response<ApiResponse>) => {
  res.json({
    success: true,
    message: 'Type-safe ATS optimization endpoint',
    data: { feature: 'ATS optimization', typescript: true }
  });
});

// Error handler
app.use((req: Request, res: Response<ApiResponse>) => {
  res.status(404).json({ 
    success: false,
    error: 'Route not found',
    message: 'TypeScript API endpoint not found'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AI Resume Builder TypeScript API running on port ${PORT}`);
  console.log(`💪 Full TypeScript type safety enabled`);
});