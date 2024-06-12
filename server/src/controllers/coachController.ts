import { Op } from "sequelize";
import { Request, Response, NextFunction } from "express";
import { validationResult } from 'express-validator'
import { CustomError } from "../util/customErrors";
import { Slot, User, Feedback } from "../models";
import getOffset from "../util/getOffset";
import { Role } from "../util/constants";
import moment from 'moment';
import { CustomCreateSlotRequest } from "../types";

const getUpComingOpenSlots = async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const offset = getOffset(Number(page), Number(limit));

        const coachId: number = Number(req.params.coachId);
        // const coach = await User.findByPk(coachId);

        // if (!coach) throw new CustomError('Coach not found', 'GetUpComingBookedSlotsError', 404);

        // const upcomingSlots = await coach.getBookedSlots({
        //     where: {
        //         startTime: {
        //             [Op.gte]: new Date()
        //         },
        //     },
        //     limit: Number(limit),
        //     offset,
        //     order: [['startTime', 'ASC']]
        // })

        const upcomingOpenSlots = await Slot.findAndCountAll({
            where: {
                coachId,
                isBooked: false,
                startTime: {
                    [Op.gte]: Date.now()
                } 
            },
            attributes: ['id', 'startTime', 'endTime'],
            order: [['startTime', 'ASC']],
            limit: Number(limit),
            offset
        });

        res.status(200).json(upcomingOpenSlots);
    } catch (err) {
        next(err);
    };
};

const getUpComingBookedSlots = async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        if (!req.params.coachId) throw new CustomError('Coach Id not provided', 'GetUpComingBookedSlotsError', 400);


        const offset = getOffset(Number(page), Number(limit));

        const coachId: number = Number(req.params.coachId);


        const upcomingBookedSlots = await Slot.findAndCountAll({
            where: {
                coachId,
                isBooked: true,
                completed: false,
                startTime: {
                    [Op.gte]: Date.now()
                }
            },
            include: [{
                association: Role.Student,
                attributes: ['name', 'phoneNumber']
            }],
            order: [['startTime', 'ASC']],
            limit: Number(limit),
            offset
        });

        res.status(200).json(upcomingBookedSlots);
    } catch (err) {
        next(err);
    };
};

const getCompletedSessions = async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const offset = getOffset(Number(page), Number(limit));
        const coachId: number = Number(req.params.coachId);
        // const coach = await User.findByPk(coachId);

        // if (!coach) throw new CustomError('Coach not found', 'GetCompletedSessionsError', 404);

        // const completedSessions = await coach.getBookedSlots({
        //     where: {
        //         isBooked: true,
        //         completed: true,
        //     },
        //     limit: Number(limit),
        //     offset,
        //     order: [['startTime', 'DESC']]
        // });

        const completedSessions = await Slot.findAndCountAll({
            where: {
                coachId,
                isBooked: true,
                completed: true,
            },
            include: [
                {
                    association: Role.Student,
                    attributes: ['name', 'phoneNumber']
                }, 
                {
                    model: Feedback,
                    attributes: ['rating', 'notes']
                }
            ],
            order: [['startTime', 'DESC']],
            limit: Number(limit),
            offset
        });

        res.status(200).json(completedSessions)

    } catch (err) {
        next(err)
    }
};

const getCompletedSession = async (req: Request, res: Response, next:NextFunction) => {
    try {
        if (!req.params.slotId) throw new CustomError('No Slot Id Provided', 'GetCompletedSessionError', 400);
        const slotId = Number(req.params.slotId);
        // const coachId = req.params.coachId;
        // if (!slotId || !coachId) throw new CustomError('No Coach or Slot Id provided', 'GetCompletedSessionError', 400);

        // const coach = await User.findByPk(coachId);

        // if (!coach) throw new CustomError('No Coach Found', 'GetCompletedSessionError', 404);

        // const completedSession = await coach.getBookedSlots({
        //     where: {
        //         id: slotId,
        //         completed: true
        //     }
        // });

        const completedSession = await Slot.findOne({
            where: {
                id: slotId,
                completed: true
            },
            include: [
                {
                    association: Role.Student,
                    attributes: ['name', 'phoneNumber']
                },
                {
                    model: Feedback,
                    attributes: ['rating', 'notes']
                }
            ],
        });

        if (!completedSession) throw new CustomError('Completed Session Not Found', 'GetCompletedSessionError', 404);

        res.status(200).json(completedSession);



    } catch (err) {
        next(err);
    }
};

const createFeedback = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const slotId = req.params.slotId;
        if (!slotId) throw new CustomError('No Slot Id Found', 'CreateFeedbackError', 400);

        const slot = await Slot.findByPk(slotId);

        if (!slot) throw new CustomError('No Slot Found', 'CreateFeedbackError', 400);

        const { rating, notes } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new CustomError('Validation Failed', 'CreateFeedbackError', 422, errors.array());
            throw error;
        };

        const [feedback, created] = await Feedback.findOrCreate({
            where: { slotId: slotId },
            defaults: { rating, notes }
        });

        if (!created) {
            feedback.rating = rating;
            feedback.notes = notes;
            await feedback.save();
        };

        // const feedback = await Feedback.create({
        //     rating,
        //     notes
        // });

        // await slot.setFeedback(feedback);

        res.status(created ? 201: 200).json({ feedback, message: "Feedback created successfully" });

    } catch (err) {
        next(err);
    };
};

const createSlot = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.body.userId) throw new CustomError('No User Id Provided', 'CreateSlotError', 400);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            const error = new CustomError('Validation Failed', 'CreateSlotError', 422, errors.array());
            console.log('error data', error.data)
            throw error;
        };
        
        const coachId = Number(req.body.userId);
        const { startMoment, endMoment } = req as CustomCreateSlotRequest;

        const newSlot = await Slot.create({
            coachId: coachId,
            startTime: startMoment.toDate(),
            endTime: endMoment.toDate()
        });

        res.status(201).send(newSlot);

    } catch (err) {
        next(err);
    };
};

export default {
    createSlot,
    createFeedback,
    getCompletedSession,
    getCompletedSessions,
    getUpComingBookedSlots,
    getUpComingOpenSlots,
}




