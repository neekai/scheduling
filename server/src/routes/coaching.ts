import { Router } from 'express'
import { Op } from 'sequelize';
import moment from 'moment';
import { body } from 'express-validator';
import isAuthorized from '../middleware/isAuthorized';
import { CustomError } from '../util/customErrors';
import { Slot } from '../models';
import coachController from '../controllers/coachController';


const router = Router();

// in production we will have jwt to make sure user is authenticated and authorized to perform actions

// view a completed session
router.get('/:coachId/slots/completed/:slotId', isAuthorized, coachController.getCompletedSession)

//view completed sessions
router.get('/:coachId/slots/completed', isAuthorized, coachController.getCompletedSessions);

// view upcoming booked slots
router.get('/:coachId/appointments', isAuthorized, coachController.getUpComingBookedSlots)

// create slot
router.post('/:coachId/slots', isAuthorized, [
    body().custom(async (value, { req }) => {
        const { startTime, endTime, userId: coachId } = req.body;

        if (!moment(startTime, moment.ISO_8601, true).isValid() || !moment(endTime, moment.ISO_8601, true).isValid()) {
            throw new CustomError('Invalid Date Format', 'CreateSlotError', 422);  
        };

        const startMoment = moment(startTime);
        const endMoment = moment(endTime);

        if (endMoment.diff(startMoment, 'hours') !== 2) {
            throw new CustomError('Slot duration must be 2 hours', 'CreateSlotError', 422);  
        };

        const tomorrow = moment().add(1, 'days').startOf('day').hours(8);

        if (!startMoment.isSameOrAfter(tomorrow)) {
            throw new CustomError('startTime must be after 8am tomorrow', 'CreateSlotError', 422); 
        };

        const workStart = moment(startMoment).hours(8).startOf('hour');
        const workEnd = moment(startMoment).hours(18).startOf('hour');

        if (!startMoment.isBetween(workStart, workEnd, undefined, '[]') || !endMoment.isBetween(workStart, workEnd, undefined, '[]')) {
            throw new CustomError('Slot must be within work hours (8am - 6pm)', 'CreateSlotError', 422);
        };

        const existingSlots = await Slot.findAll({
            where: {
                coachId,
                [Op.or]: [
                    {
                        startTime: {
                            [Op.lt]: endMoment.toDate()
                        },
                        endTime: {
                            [Op.gt]: startMoment.toDate()
                        }
                    }
                ]
            }
        });

        if (existingSlots.length > 0) {
            console.log('existing slots', existingSlots)
            throw new CustomError('Slot overlaps with existing slots', 'CreateSlotError', 409);
        }


        req.startMoment = startMoment;
        req.endMoment = endMoment;

        return true;
    })
],
coachController.createSlot
)

// update or create feedback
router.put('/:coachId/:slotId/feedback',
    [
        body('rating')
        .isNumeric().withMessage('Rating must be a number')
        .isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
    ],
    coachController.createFeedback
);

// lands on coach home page to view upcoming slots
router.get('/:coachId', isAuthorized, coachController.getUpComingOpenSlots);

export default router;
      

