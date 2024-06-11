import { Router } from 'express'
import AuthController from '../controllers/authController'

const router = Router();

// fake login
// just using this to get user information

router.get('/:userId', AuthController.getUser);

export default router;