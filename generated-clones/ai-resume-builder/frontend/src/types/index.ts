// Frontend TypeScript definitions
export interface Feature {
  name: string;
  description: string;
  isActive: boolean;
}

export interface DashboardStats {
  totalItems: number;
  activeItems: number;
  completedItems: number;
}
