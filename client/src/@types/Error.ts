export interface ErrorResponse {
  statusCode: number;
  message: string;
  success: boolean;
  errors?: string[];
}
