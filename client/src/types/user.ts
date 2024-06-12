import { SlotType } from "./slot";

export interface User {
    name: string;
    id: number;
    role: 'student' | 'coach';
    phoneNumber: string;
};

export interface UserContextType {
    user: User | null;
    switchUser: (useUser: 'student' | 'coach') => Promise<User>;
}


export interface CoachType extends User {
    id: number;
    name: string;
    phoneNumber: string;
    coachSlots: SlotType[];
}
