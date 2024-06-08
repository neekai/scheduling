import { Router } from 'express'
import isAuthorized from '../middleware/isAuthorized';

const router = Router();


// view a completed session
router.get('/:coachId/slots/completed/:slotId')

//view completed sessions
router.get('/:coachId/slots/completed')

// view booked slots
router.get('/:coachId/appointments')

// create slot
router.post('/:coachId/slots')

// create feedback
router.post('/:coachId/:slotId/feedback');

// lands on coach home page to view upcoming slots
router.get('/:coachId', isAuthorized)

export default router;
      

