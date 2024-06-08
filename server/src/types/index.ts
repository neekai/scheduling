import { Request } from 'express';
import { Role } from '../util/constants';

// Define a custom interface that extends the default Request interface
export interface CustomRequest extends Request {
  userRole?: Role; // Assuming Role is an enum type
}