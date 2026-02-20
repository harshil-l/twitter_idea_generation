export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface Home {
  id: string;
  name: string;
  address?: string;
  type: 'HOUSE' | 'APARTMENT' | 'CONDO' | 'TOWNHOUSE' | 'OTHER';
  yearBuilt?: number;
  squareFootage?: number;
  bedrooms?: number;
  bathrooms?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  _count?: {
    appliances: number;
    maintenanceTasks: number;
    incidents: number;
    projects: number;
  };
}

export interface Appliance {
  id: string;
  name: string;
  category: 'HEATING' | 'COOLING' | 'KITCHEN' | 'LAUNDRY' | 'ELECTRICAL' | 'PLUMBING' | 'OTHER';
  brand?: string;
  model?: string;
  serialNumber?: string;
  purchaseDate?: string;
  warrantyExpiry?: string;
  installationDate?: string;
  location?: string;
  energyRating?: string;
  notes?: string;
  isActive: boolean;
  photoUrl?: string;
  createdAt: string;
  updatedAt: string;
  homeId: string;
}

export interface MaintenanceTask {
  id: string;
  title: string;
  description?: string;
  scheduledDate: string;
  completedAt?: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  category: 'ROUTINE' | 'SEASONAL' | 'REPAIR' | 'INSPECTION' | 'CLEANING' | 'OTHER';
  estimatedDuration?: number;
  cost?: number;
  actualCost?: number;
  notes?: string;
  isRecurring: boolean;
  recurringInterval?: 'WEEKLY' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  homeId?: string;
  applianceId?: string;
  home?: { id: string; name: string };
  appliance?: { id: string; name: string };
}

export interface Incident {
  id: string;
  title: string;
  description?: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED';
  cost?: number;
  reportedAt: string;
  resolvedAt?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  homeId?: string;
  applianceId?: string;
  home?: { id: string; name: string };
  appliance?: { id: string; name: string };
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'PLANNING' | 'IN_PROGRESS' | 'COMPLETED' | 'ON_HOLD' | 'CANCELLED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  budget?: number;
  actualCost?: number;
  startDate?: string;
  targetCompletionDate?: string;
  actualCompletionDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  homeId: string;
  home?: { id: string; name: string };
}

export interface Vendor {
  id: string;
  name: string;
  category: 'PLUMBER' | 'ELECTRICIAN' | 'HVAC' | 'GENERAL_CONTRACTOR' | 'APPLIANCE_REPAIR' | 'LANDSCAPING' | 'CLEANING' | 'OTHER';
  phone?: string;
  email?: string;
  address?: string;
  website?: string;
  notes?: string;
  rating?: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
}

export interface DashboardStats {
  totalHomes: number;
  totalAppliances: number;
  pendingTasks: number;
  overdueItems: number;
  upcomingTasks: MaintenanceTask[];
  recentIncidents: Incident[];
  costSummary: {
    thisMonth: number;
    thisYear: number;
  };
}
