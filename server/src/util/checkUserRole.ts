import { User } from "../models";
import { CustomError } from "./customErrors";
import { Role } from "./constants";

const checkUserRole = async (userId: string, role: Role): Promise<boolean> => {
    try {
        const user = await User.findByPk(Number(userId));

        if (!user) throw new CustomError('User not found', 'UserRoleValidationError', 401);

        if (user.role !== role) {
            const error = new CustomError(`User is not a ${role}`, 'UserRoleValidationError', 403);
            error.statusCode 
        };
        return true;

    } catch (err) {
        if (err instanceof CustomError && err.name === 'UserRoleValidationError') {
            throw err;
        } else {
            console.error('Error checking user role:', err);
            throw err;
        }
    }
}

export default checkUserRole;
