import { Op } from "sequelize";
import { Request, Response, NextFunction } from "express";
import { CustomError } from "../util/customErrors";
import { Slot, User } from "../models";

const getUpComingSlots = async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const offset = (Number(page) - 1) * Number(limit);

        const coachId: number = Number(req.params.coachId);
        const upcomingSlots = await Slot.findAndCountAll({
            where: {
                coachId,
                startTime: {
                    [Op.gte]: new Date()
                },
            },
            limit: Number(limit),
            offset,
        });
        res.status(200).json(upcomingSlots);
    } catch (err) {
        next(err);
    };
};

const getUpComingBookedSlots = async (req: Request, res: Response, next: NextFunction) => {
    const { page = 1, limit = 10 } = req.query;

    try {
        const offset = (Number(page) - 1) * Number(limit);

        const coachId: number = Number(req.params.coachId);
        const coach = await User.findByPk(coachId);

        if (!coach) throw new CustomError('Coach not found', 'GetUpComingBookedSlotsError', 404);

        const upcomingBookedSlots = await coach.getBookedSlots({
            where: {
                isBooked: true,
                startTime: {
                    [Op.gte]: new Date()
                },
            },
            limit: Number(limit),
            offset
        })

        res.status(200).json(upcomingBookedSlots);
    } catch (err) {
        next(err);
    };
};

