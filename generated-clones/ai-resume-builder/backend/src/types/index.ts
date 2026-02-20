// Backend TypeScript definitions
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface HealthStatus {
  status: string;
  service: string;
  version: string;
  typescript: boolean;
  timestamp: string;
}