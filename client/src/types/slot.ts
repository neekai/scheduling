import { User } from './user';
import { FeedbackType } from './feedback';

export interface SlotType {
    id: number;
    startTime: Date;
    endTime: Date;
    isBooked: boolean;
    completed: boolean;
    coachId: number;
}

export interface Appointment extends SlotType {
    student?: User;
    coach?: User;
};

export interface CompletedSessionType extends Appointment {
    Feedback?: FeedbackType;
};