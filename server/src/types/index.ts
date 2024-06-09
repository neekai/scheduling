import { Request } from 'express';
import { Role } from '../util/constants';
import moment from 'moment';

// Define a custom interface that extends the default Request interface
export interface CustomRequest extends Request {
  userRole?: Role; // Assuming Role is an enum type
};

export interface CustomCreateSlotRequest extends Request {
  startMoment: moment.Moment;
  endMoment: moment.Moment;
}