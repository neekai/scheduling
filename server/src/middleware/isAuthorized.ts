import { Response, NextFunction } from 'express';
import { CustomError } from '../util/customErrors';
import checkUserRole from '../util/checkUserRole';
import { CustomRequest } from '../types';



const isAuthorized = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const role = req.userRole;
    try {
        const userId: string | undefined = req.body.userId || req.params.studentId || req.params.coachId;
        // console.log('isAuthorized userId', req.params.userId);
        if (!role || !userId) throw new CustomError('User or role not found', 'user or role not found', 401);
        await checkUserRole(userId, role);
        next();
    } catch(err) {
        next(err);
    };
};

export default isAuthorized;
