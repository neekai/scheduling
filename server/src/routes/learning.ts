import { Router } from 'express'
import isAuthorized from '../middleware/isAuthorized';
import studentController from '../controllers/studentController';

const router = Router();



router.get('/:studentId/reserve/:slotId', isAuthorized, studentController.getSlot);

router.patch('/:studentId/reserve/:slotId', isAuthorized, studentController.reserveSlot);

// view coach's availability
router.get('/:studentId/:coachId/availability', isAuthorized, studentController.getCoachAvailableSlots)

// view booked slots
router.get('/:studentId/appointments', isAuthorized, studentController.getAppointments);

// lands on home page and views all available slots for all coaches
router.get('/:studentId', isAuthorized, studentController.getAllAvailableSlots);

export default router;
      

