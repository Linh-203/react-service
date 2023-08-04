import express from 'express';
import { users } from '../controllers/auth';
const router = express.Router();
//signup router
router.post('/signup', users.signupUser);
//login router
router.post('/login', users.loginUser);
router.get('/token', users.getToken);
router.delete('/token', users.clearToken);
export default router;
