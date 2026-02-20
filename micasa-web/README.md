# 🏠 MiCasa Web - Home Maintenance Tracker

A comprehensive web application for tracking home maintenance tasks, appliances, incidents, and projects with AI-powered recommendations.

## ✨ Features

- **🏡 Home Management**: Track multiple homes with detailed information
- **🔧 Appliance Registry**: Manage all home appliances with warranties, manuals, and maintenance history  
- **📅 Maintenance Scheduling**: Plan and track preventive and corrective maintenance tasks
- **🚨 Incident Tracking**: Log and monitor home incidents and repairs
- **📋 Project Management**: Organize home improvement projects
- **👥 Vendor Directory**: Maintain contact info for contractors and service providers
- **📄 Document Storage**: Store warranties, manuals, receipts, and photos
- **🤖 AI Recommendations**: Get intelligent maintenance suggestions and cost estimates
- **📱 Responsive Design**: Works on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Backend
- **Node.js** with **Express.js**
- **TypeScript** for type safety
- **Prisma** ORM with **SQLite** database
- **JWT** authentication
- **OpenAI API** for AI recommendations
- **Multer** for file uploads
- **Zod** for validation

### Frontend  
- **Next.js 14** with **React 18**
- **TypeScript** throughout
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Hook Form** for forms

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd micasa-web
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npx prisma generate
   npx prisma db push
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend  
   npm install
   ```

4. **Environment Setup**
   
   Create `backend/.env`:
   ```env
   DATABASE_URL="file:./micasa.db"
   JWT_SECRET="your-super-secret-jwt-key"
   FRONTEND_URL="http://localhost:3000"
   PORT=5000
   NODE_ENV=development
   # Optional: Add your OpenAI API key for AI features
   # OPENAI_API_KEY=your-openai-api-key
   ```

### Running the Application

1. **Start Backend** (Terminal 1)
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend** (Terminal 2)  
   ```bash
   cd frontend
   npm run dev
   ```

3. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Health Check: http://localhost:5000/api/health

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user  
- `GET /api/auth/me` - Get current user

### Core Endpoints
- `GET|POST /api/homes` - Manage homes
- `GET|POST /api/appliances` - Manage appliances
- `GET|POST /api/maintenance` - Maintenance tasks
- `GET|POST /api/incidents` - Track incidents
- `GET|POST /api/projects` - Home projects
- `GET|POST /api/vendors` - Service providers
- `GET|POST /api/documents` - File management
- `GET /api/dashboard` - Dashboard overview
- `GET /api/ai/recommendations/:homeId` - AI suggestions

## 🤖 AI Features

MiCasa includes AI-powered features that help with:

- **Maintenance Suggestions**: Get appliance-specific maintenance recommendations
- **Cost Estimates**: AI-powered cost predictions for maintenance tasks
- **Seasonal Reminders**: Automatic seasonal maintenance task suggestions  
- **Troubleshooting Help**: Get advice for common appliance issues
- **Spending Analysis**: Insights into maintenance spending patterns

*Note: AI features require an OpenAI API key. The app works fully without it using fallback data.*

## 🏗️ Development

### Database Schema
The app uses Prisma with SQLite for local development. Key models:
- `User` - User accounts
- `Home` - Properties managed by users
- `Appliance` - Home appliances and equipment
- `MaintenanceTask` - Scheduled and completed maintenance
- `Incident` - Problems and repair records
- `Project` - Home improvement projects
- `Vendor` - Service provider contacts
- `Document` - File attachments and photos

### Build for Production
```bash
# Backend
cd backend
npm run build
npm start

# Frontend  
cd frontend
npm run build
npm start
```

## 🚀 Deployment

### Backend Deployment
1. Build the TypeScript: `npm run build`
2. Set production environment variables
3. Run database migrations: `npx prisma db push`
4. Start the server: `npm start`

### Frontend Deployment
1. Build the app: `npm run build`  
2. Deploy static files or run `npm start` for SSR

### Environment Variables (Production)
```env
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-strong-jwt-secret"
FRONTEND_URL="https://your-domain.com"
OPENAI_API_KEY="your-openai-key" # optional
NODE_ENV=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable  
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🐛 Issues & Support

Please use GitHub Issues for bug reports and feature requests.

---

**MiCasa** - Your intelligent home maintenance companion 🏠✨
