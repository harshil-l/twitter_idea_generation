const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    service: 'AI Resume Builder API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    features: ['AI writing', 'Templates', 'PDF export', 'ATS optimization']
  });
});

// Feature endpoints

// AI writing API
app.get('/api/aiwriting', (req, res) => {
  res.json({ 
    feature: 'AI writing',
    status: 'Available',
    description: 'AI writing functionality endpoint',
    endpoints: [
      'GET /api/aiwriting - Get ai writing data',
      'POST /api/aiwriting - Create new ai writing',
      'PUT /api/aiwriting/:id - Update ai writing',
      'DELETE /api/aiwriting/:id - Delete ai writing'
    ]
  });
});

app.post('/api/aiwriting', (req, res) => {
  res.status(201).json({
    message: 'AI writing created successfully',
    data: req.body,
    id: Math.floor(Math.random() * 1000)
  });
});
// Templates API
app.get('/api/templates', (req, res) => {
  res.json({ 
    feature: 'Templates',
    status: 'Available',
    description: 'Templates functionality endpoint',
    endpoints: [
      'GET /api/templates - Get templates data',
      'POST /api/templates - Create new templates',
      'PUT /api/templates/:id - Update templates',
      'DELETE /api/templates/:id - Delete templates'
    ]
  });
});

app.post('/api/templates', (req, res) => {
  res.status(201).json({
    message: 'Templates created successfully',
    data: req.body,
    id: Math.floor(Math.random() * 1000)
  });
});
// PDF export API
app.get('/api/pdfexport', (req, res) => {
  res.json({ 
    feature: 'PDF export',
    status: 'Available',
    description: 'PDF export functionality endpoint',
    endpoints: [
      'GET /api/pdfexport - Get pdf export data',
      'POST /api/pdfexport - Create new pdf export',
      'PUT /api/pdfexport/:id - Update pdf export',
      'DELETE /api/pdfexport/:id - Delete pdf export'
    ]
  });
});

app.post('/api/pdfexport', (req, res) => {
  res.status(201).json({
    message: 'PDF export created successfully',
    data: req.body,
    id: Math.floor(Math.random() * 1000)
  });
});
// ATS optimization API
app.get('/api/atsoptimization', (req, res) => {
  res.json({ 
    feature: 'ATS optimization',
    status: 'Available',
    description: 'ATS optimization functionality endpoint',
    endpoints: [
      'GET /api/atsoptimization - Get ats optimization data',
      'POST /api/atsoptimization - Create new ats optimization',
      'PUT /api/atsoptimization/:id - Update ats optimization',
      'DELETE /api/atsoptimization/:id - Delete ats optimization'
    ]
  });
});

app.post('/api/atsoptimization', (req, res) => {
  res.status(201).json({
    message: 'ATS optimization created successfully',
    data: req.body,
    id: Math.floor(Math.random() * 1000)
  });
});

// Demo data endpoint
app.get('/api/demo-data', (req, res) => {
  res.json({
    message: 'Welcome to AI Resume Builder API!',
    features: ['AI writing', 'Templates', 'PDF export', 'ATS optimization'],
    sampleData: {
      users: 1250,
      projects: 89,
      active: true,
      category: 'productivity',
      version: '1.0.0'
    },
    endpoints: {
      health: '/api/health',
      demo: '/api/demo-data',
      features: ['/api/aiwriting', '/api/templates', '/api/pdfexport', '/api/atsoptimization']
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    available: '/api/health, /api/demo-data'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 AI Resume Builder API running on port ${PORT}`);
  console.log(`📊 Features: AI writing, Templates, PDF export, ATS optimization`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});