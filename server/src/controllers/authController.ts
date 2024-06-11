import { Request, Response, NextFunction } from "express";
import { User } from "../models";
import { CustomError } from "../util/customErrors";
import { Role } from "../util/constants";

const getUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.params.userId) throw new CustomError('No user Id Provided', 'GetUserError', 400);

        const userId = Number(req.params.userId);

        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'phoneNumber', 'role']
        });

        if (!user) throw new CustomError('User Not Found', 'GetUserError', 404);

        res.status(200).json(user);

    } catch(err) {
        next(err);
    }
};

export default { getUser };