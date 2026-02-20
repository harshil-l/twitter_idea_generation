import { Request } from 'express';

// MiCasa Web Backend Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface AuthRequest extends Request {
  userId?: string;
}

export interface JwtPayload {
  userId: string;
  email: string;
}

export interface MaintenanceReminder {
  id: string;
  title: string;
  dueDate: Date;
  overdue: boolean;
  priority: string;
  appliance?: string;
}

export interface DashboardStats {
  totalAppliances: number;
  overdueMaintenances: number;
  openIncidents: number;
  activeProjects: number;
  monthlySpending: number;
  upcomingTasks: MaintenanceReminder[];
}

export interface AIMaintenanceResponse {
  suggestions: string[];
  frequency: string;
  priority: string;
  estimatedCost: number;
  tips: string[];
}
