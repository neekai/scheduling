import { Op } from "sequelize";
import { Request, Response, NextFunction } from "express"
import { Slot, User } from "../models"
import { Role } from "../util/constants"
import { CustomError } from "../util/customErrors";
import getOffset from "../util/getOffset";

const getAllAvailableSlots = async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const offset = getOffset(Number(page), Number(limit));

        // earliest bookable time is 8am next day
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(8, 0, 0, 0);

        const coachesWithAvailability = await User.findAndCountAll({
            where: { role: Role.Coach },
            include: [{
                association: 'coachSlots',
                where: { 
                    isBooked: false,
                    startTime: {
                        [Op.gte]: nextDay
                    } 
                },
                limit: Number(limit),
                order: [['startTime', 'ASC']]
            }],
            limit: Number(limit),
            offset,
        });
        res.status(200).json(coachesWithAvailability);
    } catch (err) {
        next(err);
    };
};

const getCoachAvailableSlots = async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const offset = getOffset(Number(page), Number(limit));
        const coachId = req.params.coachId;
        // earliest bookable time is 8am next day
        const nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        nextDay.setHours(8, 0, 0, 0);

        const coachAvailability = await Slot.findAndCountAll({
            where: {
                coachId: coachId,
                isBooked: false,
                startTime: {
                    [Op.gte]: nextDay 
                },
            },
            order: [['startTime', 'ASC']],
            limit: Number(limit),
            offset,
        });

        res.status(200).json(coachAvailability);
    } catch (err) {
        next(err);
    };
}

const getUpcomingAppointments = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // not doing pagination here because I am not expecting a student to have too many appointments
        const studentId: number = Number(req.params.studentId);
        const student = await User.findByPk(studentId);
        if (!student) throw new CustomError('Student not found', 'GetUpcomingAppointmentsError', 404);

        const userAppointments = await student.getBookedSlots({
            where: {
                isBooked: true,
                completed: false,
            },
            order: [['startTime', 'ASC']],
        });

        res.status(200).json(userAppointments)
    } catch (err) {
        next(err);
    }
};

const getSlot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const slotId: string = req.params.slotId;

        const slot = await Slot.findByPk(parseInt(slotId));

        if (!slot) throw new CustomError('Slot not found', 'GetSlotError', 404);
        if (slot.isBooked) throw new CustomError('Slot is already booked', 'GetSlotError', 401);

        res.status(200).json({ slot });

    } catch (err) {
        next(err);
    };
};

const reserveSlot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const studentId: number = Number(req.params.studentId);
        const slotId: number = Number(req.params.slotId);

        const slot = await Slot.findByPk(slotId);

        if (!slot) throw new CustomError('Slot not found', 'ReserveSlotError', 404);
        if (slot.isBooked) throw new CustomError('Slot is already booked', 'ReserveSlotError', 401);

        const { startTime, endTime } = slot;

        const student = await User.findByPk(studentId, {
            include: [
                {
                    association: 'bookedSlots',
                    where: {
                        [Op.or]: [
                            {   
                                startTime: {
                                    [Op.lt]: new Date(endTime)
                                },
                                endTime: {
                                    [Op.gt]: new Date(startTime)
                                },
                            }
                        ]
                    }
                }
            ]
        });

        if (student?.bookedSlots && student?.bookedSlots?.length >= 1) {
            throw new CustomError('Overlapping appointment', 'ReserveSlotError', 409)
        }


        slot.studentId = studentId;
        slot.isBooked = true;

        await slot.save();

        res.status(201).redirect(`/learning/${studentId}/appointments`);

    } catch (err) {
        next(err);
    };
};

export default { getAllAvailableSlots, getUpcomingAppointments, getCoachAvailableSlots, getSlot, reserveSlot };